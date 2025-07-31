Here's your content formatted for better readability while maintaining all the original information:

---

# Transparent Upgradable Proxy Contracts

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

A proxy contract stores data but delegates functionality to implementation contracts. In simple terms, it borrows code from another smart contract to perform operations on its own data. Understanding proxy contracts requires understanding `delegatecall`.

---

## Understanding Delegatecall

`delegatecall` enables borrowing functionality from another contract:

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
- `delegatecall` works based on storage slots, not variable names
- Both variables occupy slot 0 in their respective contracts
- `setPrimaryValue` in Contract B modifies slot 0, which affects Contract A's storage when called via `delegatecall`

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

```solidity
// Basic Proxy Structure
contract Proxy {
    address public implementation;
    
    function upgradeTo(address newImplementation) external {
        implementation = newImplementation;
    }
    
    fallback() external {
        // delegatecall to implementation
    }
}
```