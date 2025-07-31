# Transparent Upgradable Proxy Contracts

Transparent Upgradable proxy is a one of the most used proxy pattern to implement proxy contracts . In simple in transparent we have two main contracts proxyAdmin.sol and TransparentUpgradeableProxy.sol . TransparentUpgradeableProxy.sol handles delegate calls through delegate call this contract is used to delegatecall the implementaion contract and proxyAdmin.sol is the contract which have the access to upgrade address of the implementation contract

## The Need for Proxy Contracts

In blockchain, smart contracts are immutable after deployment. Proxy contracts enable upgrading contract logic while preserving data.

```solidity
// Initial Version
contract VersionOne {
    uint256 public count;

    function increment() public {
        count = count + 1;
    }
}

// Want to upgrade to:
contract VersionTwo {
    uint256 public count;

    function increment() public {
        count = count + 2;  // New logic
    }
}
```

In blockchain, if a smart contract is once deployed we cannot update its functionality because they are immutable by nature. To upgrade a contract's functionality, we have to redeploy it, but the newly deployed contract won't have the previous data. Proxy contracts solve this by allowing data persistence across upgrades.

## What are Proxy Contracts?

A proxy contract stores data but delegates functionality to implementation contracts. In simple terms, it borrows code from another smart contract to perform operations on its own data. Understanding proxy contracts requires understanding delegatecall.

---

## Understanding Delegatecall

delegatecall enables borrowing functionality from another contract:

```solidity
contract A {
    uint256 public primaryValueInContractA;
}

contract B {
    uint256 public primaryValueInContractB;

    function setPrimaryValue(uint256 _val) public {
        primaryValueInContractB = _val;
    }
}

// Using delegatecall in Contract A:
function delegateCallSetValue(address targetContract, uint256 _value) public {
    (bool success, ) = targetContract.delegatecall(
        abi.encodeWithSignature("setPrimaryValue(uint256)", _value)
    );
    require(success, "Call failed");
}
```

Final contracts look like:

```solidity
contract A {
    uint256 public primaryValueInContractA;

    function delegateCallSetValue(address targetContract, uint256 _value) public {
        (bool success, ) = targetContract.delegatecall(
            abi.encodeWithSignature("setPrimaryValue(uint256)", _value)
        );
        require(success, "Call failed");
    }
}

contract B {
    uint256 public primaryValueInContractB;

    function setPrimaryValue(uint256 _val) public {
        primaryValueInContractB = _val;
    }
}
```

Key points:

- Variable names differ between contracts (primaryValueInContractA vs primaryValueInContractB)
- delegatecall works based on storage slots, not variable names
- Both variables occupy slot 0 in their respective contracts
- setPrimaryValue in Contract B modifies slot 0, which affects Contract A's storage when called via delegatecall

We can access storage slot values using inline assembly:

```solidity
function getPrimaryValueSlot() public view returns (uint256 value) {
    assembly {
        // Load the value from storage slot 0 (the first variable in storage)
        value := sload(0)
    }
}
```

---

## Transparent Proxy Implementation

Key components:

1. Proxy contract (stores data and implementation address)
2. Implementation contract (contains logic)
3. Upgrade mechanism

##TransparentUpgradeableProxy.sol

```solidity
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.2.0) (proxy/transparent/TransparentUpgradeableProxy.sol)

pragma solidity ^0.8.22;

import {ERC1967Utils} from "../ERC1967/ERC1967Utils.sol";
import {ERC1967Proxy} from "../ERC1967/ERC1967Proxy.sol";
import {IERC1967} from "../../interfaces/IERC1967.sol";
import {ProxyAdmin} from "./ProxyAdmin.sol";

/**
 * @dev Interface for {TransparentUpgradeableProxy}. In order to implement transparency, {TransparentUpgradeableProxy}
 * does not implement this interface directly, and its upgradeability mechanism is implemented by an internal dispatch
 * mechanism. The compiler is unaware that these functions are implemented by {TransparentUpgradeableProxy} and will not
 * include them in the ABI so this interface must be used to interact with it.
 */
interface ITransparentUpgradeableProxy is IERC1967 {
    /// @dev See {UUPSUpgradeable-upgradeToAndCall}
    function upgradeToAndCall(address newImplementation, bytes calldata data) external payable;
}

/**
 * @dev This contract implements a proxy that is upgradeable through an associated {ProxyAdmin} instance.
 *
 * To avoid https://medium.com/nomic-labs-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357[proxy selector
 * clashing], which can potentially be used in an attack, this contract uses the
 * https://blog.openzeppelin.com/the-transparent-proxy-pattern/[transparent proxy pattern]. This pattern implies two
 * things that go hand in hand:
 *
 * 1. If any account other than the admin calls the proxy, the call will be forwarded to the implementation, even if
 * that call matches the {ITransparentUpgradeableProxy-upgradeToAndCall} function exposed by the proxy itself.
 * 2. If the admin calls the proxy, it can call the `upgradeToAndCall` function but any other call won't be forwarded to
 * the implementation. If the admin tries to call a function on the implementation it will fail with an error indicating
 * the proxy admin cannot fallback to the target implementation.
 *
 * These properties mean that the admin account can only be used for upgrading the proxy, so it's best if it's a
 * dedicated account that is not used for anything else. This will avoid headaches due to sudden errors when trying to
 * call a function from the proxy implementation. For this reason, the proxy deploys an instance of {ProxyAdmin} and
 * allows upgrades only if they come through it. You should think of the `ProxyAdmin` instance as the administrative
 * interface of the proxy, including the ability to change who can trigger upgrades by transferring ownership.
 *
 * NOTE: The real interface of this proxy is that defined in `ITransparentUpgradeableProxy`. This contract does not
 * inherit from that interface, and instead `upgradeToAndCall` is implicitly implemented using a custom dispatch
 * mechanism in `_fallback`. Consequently, the compiler will not produce an ABI for this contract. This is necessary to
 * fully implement transparency without decoding reverts caused by selector clashes between the proxy and the
 * implementation.
 *
 * NOTE: This proxy does not inherit from {Context} deliberately. The {ProxyAdmin} of this contract won't send a
 * meta-transaction in any way, and any other meta-transaction setup should be made in the implementation contract.
 *
 * IMPORTANT: This contract avoids unnecessary storage reads by setting the admin only during construction as an
 * immutable variable, preventing any changes thereafter. However, the admin slot defined in ERC-1967 can still be
 * overwritten by the implementation logic pointed to by this proxy. In such cases, the contract may end up in an
 * undesirable state where the admin slot is different from the actual admin. Relying on the value of the admin slot
 * is generally fine if the implementation is trusted.
 *
 * WARNING: It is not recommended to extend this contract to add additional external functions. If you do so, the
 * compiler will not check that there are no selector conflicts, due to the note above. A selector clash between any new
 * function and the functions declared in {ITransparentUpgradeableProxy} will be resolved in favor of the new one. This
 * could render the `upgradeToAndCall` function inaccessible, preventing upgradeability and compromising transparency.
 */
contract TransparentUpgradeableProxy is ERC1967Proxy {
    // An immutable address for the admin to avoid unnecessary SLOADs before each call
    // at the expense of removing the ability to change the admin once it's set.
    // This is acceptable if the admin is always a ProxyAdmin instance or similar contract
    // with its own ability to transfer the permissions to another account.
    address private immutable _admin;

    /**
     * @dev The proxy caller is the current admin, and can't fallback to the proxy target.
     */
    error ProxyDeniedAdminAccess();

    /**
     * @dev Initializes an upgradeable proxy managed by an instance of a {ProxyAdmin} with an `initialOwner`,
     * backed by the implementation at `_logic`, and optionally initialized with `_data` as explained in
     * {ERC1967Proxy-constructor}.
     */
    constructor(address _logic, address initialOwner, bytes memory _data) payable ERC1967Proxy(_logic, _data) {
        _admin = address(new ProxyAdmin(initialOwner));
        // Set the storage value and emit an event for ERC-1967 compatibility
        ERC1967Utils.changeAdmin(_proxyAdmin());
    }

    /**
     * @dev Returns the admin of this proxy.
     */
    function _proxyAdmin() internal view virtual returns (address) {
        return _admin;
    }

    /**
     * @dev If caller is the admin process the call internally, otherwise transparently fallback to the proxy behavior.
     */
    function _fallback() internal virtual override {
        if (msg.sender == _proxyAdmin()) {
            if (msg.sig != ITransparentUpgradeableProxy.upgradeToAndCall.selector) {
                revert ProxyDeniedAdminAccess();
            } else {
                _dispatchUpgradeToAndCall();
            }
        } else {
            super._fallback();
        }
    }

    /**
     * @dev Upgrade the implementation of the proxy. See {ERC1967Utils-upgradeToAndCall}.
     *
     * Requirements:
     *
     * - If `data` is empty, `msg.value` must be zero.
     */
    function _dispatchUpgradeToAndCall() private {
        (address newImplementation, bytes memory data) = abi.decode(msg.data[4:], (address, bytes));
        ERC1967Utils.upgradeToAndCall(newImplementation, data);
    }
}


```

Key Point :

- In "TransparentUpgradeableProxy" the main feature of it is "admin of ProxyAdmin.sol" can only call the "upgradeToAndCall" , he cannot call the functions of the Implementation contract through proxy contract delegate call .
- For every call of proxy contract it will check whether the msg.sender is admin or not if it is admin he can only able to call.if msg.sender is admin and msg.sender is not calling upgradeToAndCall function then the transaction will revert 
- If msg.sender is not admin of the ProxyAdmin then it will goes to the else block and exhicute delegate call to the implementation contract

```solidity
 if (msg.sender == _proxyAdmin()) {
    if (msg.sig != ITransparentUpgradeableProxy.upgradeToAndCall.selector) {
        revert ProxyDeniedAdminAccess();
    } else {
        _dispatchUpgradeToAndCall();
    }
} else {
    super._fallback();
}
```

## ProxyAdmin.sol

```solidity

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.2.0) (proxy/transparent/ProxyAdmin.sol)

pragma solidity ^0.8.22;

import {ITransparentUpgradeableProxy} from "./TransparentUpgradeableProxy.sol";
import {Ownable} from "../../access/Ownable.sol";

/**
 * @dev This is an auxiliary contract meant to be assigned as the admin of a {TransparentUpgradeableProxy}. For an
 * explanation of why you would want to use this see the documentation for {TransparentUpgradeableProxy}.
 */
contract ProxyAdmin is Ownable {
    /**
     * @dev The version of the upgrade interface of the contract. If this getter is missing, both `upgrade(address,address)`
     * and `upgradeAndCall(address,address,bytes)` are present, and `upgrade` must be used if no function should be called,
     * while `upgradeAndCall` will invoke the `receive` function if the third argument is the empty byte string.
     * If the getter returns `"5.0.0"`, only `upgradeAndCall(address,address,bytes)` is present, and the third argument must
     * be the empty byte string if no function should be called, making it impossible to invoke the `receive` function
     * during an upgrade.
     */
    string public constant UPGRADE_INTERFACE_VERSION = "5.0.0";

    /**
     * @dev Sets the initial owner who can perform upgrades.
     */
    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Upgrades `proxy` to `implementation` and calls a function on the new implementation.
     * See {TransparentUpgradeableProxy-_dispatchUpgradeToAndCall}.
     *
     * Requirements:
     *
     * - This contract must be the admin of `proxy`.
     * - If `data` is empty, `msg.value` must be zero.
     */
    function upgradeAndCall(
        ITransparentUpgradeableProxy proxy,
        address implementation,
        bytes memory data
    ) public payable virtual onlyOwner {
        proxy.upgradeToAndCall{value: msg.value}(implementation, data);
    }
}

```

---

## Our inherited ProxyContract.sol

In this contract we will inherit the TransparentUpgradeableProxy .

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

interface IProxyAdminGetter {
    function getProxyAdmin() external view returns (address);
    function getImplementationAddress() external view returns (address);
}

contract ProxyContract is TransparentUpgradeableProxy, IProxyAdminGetter {
    constructor(
        address _logic,
        address initialOwner,   // owner of the ProxyAdmin.sol contract who can can upgrade address of the implementation contract
        bytes memory _data
    ) TransparentUpgradeableProxy(_logic, initialOwner, _data) {}

    function getProxyAdmin() public view returns (address) {
        return _proxyAdmin();
    }

    function getImplementationAddress() external view returns (address) {
        return _implementation();
    }

    receive() external payable {
        _fallback();
    }
}

```

