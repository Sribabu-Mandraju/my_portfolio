# Proxies in Solidity

## What are Proxies?

Smart contracts are **immutable** once deployed to the blockchain. This means that once a contract is deployed, its code cannot be changed or updated.

In traditional **Web2** applications, we can easily update business logic by deploying new code. However, in **Web3**, this is not possible because smart contracts are immutable by nature—once deployed on-chain, the logic cannot be modified.

If we want to change the business logic or fix bugs, we must deploy a **new smart contract**. The major problem is that the **data stored in the old smart contract cannot be easily reused or migrated**, which creates serious limitations for upgradable systems.

To overcome this issue, Solidity introduces a design pattern known as **proxy contracts**. Proxies allow us to **separate data storage from business logic**, enabling us to upgrade the logic contract while keeping the **same data and contract address** intact.

---

## Prerequisites

Before diving into this blog, you should be familiar with:

- Solidity basics
- How the EVM stores data (storage slots)
- How `delegatecall` works

---

## What is a Proxy? (Simple Explanation)

In simple terms, a proxy is a smart contract that **executes logic from another smart contract while using its own storage (variables)**.

Think of it like this:

- **Proxy Contract** = The "shell" that holds your data and forwards function calls
- **Implementation Contract** = The "brain" that contains the actual business logic

The proxy forwards all function calls to the implementation contract using `delegatecall`, which executes the implementation's code in the context of the proxy's storage.

---

## Proxy Contract Implementation

Here's a simple proxy contract implementation:

```solidity
contract Proxy {
    // Random storage slot to store implementation contract address
    // This avoids storage collisions with the implementation contract
    bytes32 private constant IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    uint256 public number;

    constructor(address _implementation) {
        // Store the implementation address in the designated storage slot
        assembly {
            sstore(IMPLEMENTATION_SLOT, _implementation)
        }
    }

    // Function to change the implementation contract address (upgrade logic)
    function setImplementation(address _newImplementation) public {
        assembly {
            sstore(IMPLEMENTATION_SLOT, _newImplementation)
        }
    }

    // Fallback function that forwards all calls to the implementation contract
    fallback(bytes calldata data) external returns (bytes memory) {
        address impl;
        assembly {
            impl := sload(IMPLEMENTATION_SLOT)
        }

        (bool success, bytes memory result) = impl.delegatecall(data);
        require(success, "delegatecall failed");
        return result;
    }
}
```

### Key Components Explained

#### `IMPLEMENTATION_SLOT`

A special (random) storage slot used to store the address of the implementation contract. We use a random slot to avoid storage collisions with variables in the implementation contract.

#### `uint256 public number`

This variable occupies the **first storage slot (slot 0)** of the proxy contract. This is where the actual data is stored.

#### `fallback` Function

In Solidity, when you call a function that doesn't exist in a contract, the call is forwarded to the **fallback function**. The fallback function is a special function that handles unknown function calls.

Inside the fallback function, the proxy:

1. Retrieves the implementation contract address from storage
2. Uses `delegatecall` to execute the implementation's code
3. Returns the result

**Important**: `delegatecall` executes the implementation's code in the context of the proxy's storage, meaning all state changes happen in the proxy contract, not the implementation contract.

---

## Implementation Contracts

Let's create two implementation contracts with different logic:

```solidity
contract ImplementationA {
    uint256 number;

    function increment() public {
        // Increment logic: increases value by 1
        number += 1;
    }
}

contract ImplementationB {
    uint256 number;

    function increment() public {
        // Increment logic: increases value by 2
        number += 2;
    }
}
```

### Implementation Details

- **ImplementationA**: Contains logic where the `increment` function increases `number` by **1**.
- **ImplementationB**: Contains logic where the `increment` function increases `number` by **2**.

Initially, the proxy contract is deployed with **ImplementationA** as its logic contract.

---

## How Function Calls Work

The proxy contract does not directly define the `increment` function. Instead, we call the function using the implementation's interface but pass the **proxy contract address**:

```solidity
ImplementationA(address(proxy_contract)).increment();
```

**Important**: The above code calls the increment logic from ImplementationA, but the value change is reflected in the **proxy contract's storage**, not in the ImplementationA contract. This is because `delegatecall` executes code in the context of the proxy's storage.

### Example: Testing with ImplementationA

```solidity
// We call the proxy contract using the implementation interface
function test_proxy() public {
    uint256 numberValueBeforeCall = proxy_contract.number(); // Reading value directly from proxy contract

    ImplementationA(address(proxy_contract)).increment();

    uint256 numberValueAfterCall = proxy_contract.number();

    assertEq(numberValueAfterCall, numberValueBeforeCall + 1); // Increment by 1
}
```

**Trace Output:**

```solidity
[38431] TestProxy::test_proxy()
  ├─ [2402] Proxy::number() [staticcall]
  │   └─ ← [Return] 0
  ├─ [25689] Proxy::fallback()
  │   ├─ [20431] ImplementationA::increment() [delegatecall]
  │   │   ├─  storage changes:
  │   │   │   @ 0: 0 → 1
  │   │   └─ ← [Stop]
  │   └─ ← [Return]
  ├─ [402] Proxy::number() [staticcall]
  │   └─ ← [Return] 1
  ├─ [0] VM::assertEq(1, 1) [staticcall]
  │   └─ ← [Return]
  ├─  storage changes:
  │   @ 0: 0 → 1
  └─ ← [Stop]
```

In the above test, the proxy contract uses `ImplementationA` logic, so it increments the value of `number` in the proxy contract by **1**.

### Example: Upgrading to ImplementationB

```solidity
function test_proxy_with_new_implementation_logic() public {
    // Changing the implementation contract address in the proxy
    proxy_contract.setImplementation(address(imp2)); // New logic that increments by 2

    uint256 numberValueBeforeCall = proxy_contract.number(); // Reading value directly from proxy contract

    ImplementationB(address(proxy_contract)).increment();

    uint256 numberValueAfterCall = proxy_contract.number();

    assertEq(numberValueAfterCall, numberValueBeforeCall + 2); // Increment by 2
}
```

**Trace Output:**

```solidity
[44690] TestProxy::test_proxy_with_new_implementation_logic()
  ├─ [5455] Proxy::setImplementation(ImplementationB: [0x2e234DAe75C793f67A35089C9d99245E1C58470b])
  │   ├─  storage changes:
  │   │   @ 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc: 0x0000000000000000000000005615deb798bb3e4dfa0139dfa1b3d433cc23b72f → 0x0000000000000000000000002e234dae75c793f67a35089c9d99245e1c58470b
  │   └─ ← [Stop]
  ├─ [2402] Proxy::number() [staticcall]
  │   └─ ← [Return] 0
  ├─ [23689] Proxy::fallback()
  │   ├─ [20431] ImplementationB::increment() [delegatecall]
  │   │   ├─  storage changes:
  │   │   │   @ 0: 0 → 2
  │   │   └─ ← [Stop]
  │   └─ ← [Return]
  ├─ [402] Proxy::number() [staticcall]
  │   └─ ← [Return] 2
  ├─ [0] VM::assertEq(2, 2) [staticcall]
  │   └─ ← [Return]
  ├─  storage changes:
  │   @ 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc: 0x0000000000000000000000005615deb798bb3e4dfa0139dfa1b3d433cc23b72f → 0x0000000000000000000000002e234dae75c793f67a35089c9d99245e1c58470b
  │   @ 0: 0 → 2
  └─ ← [Stop]
```

In the above test case, we modified the implementation logic of the proxy contract to point to `ImplementationB`, which has logic to increment the value of `number` in the proxy contract by **2**.

---

## Key Takeaways

1. **Proxy contracts** separate storage from logic, allowing upgrades while maintaining the same address and data.
2. **`delegatecall`** executes implementation code in the proxy's storage context.
3. **Storage slots** must be carefully managed to avoid collisions between proxy and implementation contracts.
4. **Upgrading** is as simple as changing the implementation address stored in the proxy.

This pattern is fundamental to building upgradable smart contracts in Solidity while maintaining data persistence and the same contract address.
