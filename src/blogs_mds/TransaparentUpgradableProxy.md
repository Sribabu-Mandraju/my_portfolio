# Transparent Upgradable Proxy Contracts

## The Need for Proxy Contracts

In blockchain, smart contracts are immutable after deployment. Proxy contracts enable upgrading contract logic while preserving data.

**Example Problem:**
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

---
In blockchain if smart contract once deployed we cannot update the functionality of the contract becuase they are immutable by nature , to upgrade functionality of the contract we have redeploy the contract and there will be no data persist in that newly deployed contract . so in order to persist data even after upgrading a smart contract we will use proxy contracts 
## what are proxy contracts ?
proxy contract is the contract in which we store data but to perform functionalities on data we will depend on another contracts which are called implementation contracts 
in simple we will borrom the code of another smart contract and use that code login to perform any operations on our data . so in order to understand proxy contract we have to understand delegate call .
---
## How Proxies Help

- Maintain existing storage (count value remains 5)
- Allow logic upgrades (change increment behavior)
- Keep same contract address

## Understanding Delegatecall

Delegatecall enables borrowing functionality from another contract:

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

in final contract A look like 
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

```

- if we notice the variable name in contract A differ from variable name in contract B which stores our primaryVariable but while using delegate call we should focus on variable's storage slot not the name or identifier of the variable 

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