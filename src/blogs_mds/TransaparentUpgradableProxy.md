```markdown
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

## How Proxies Help

- Maintain existing storage (count value remains 5)
- Allow logic upgrades (change increment behavior)
- Keep same contract address

## Understanding Delegatecall

Delegatecall enables borrowing functionality from another contract:

```solidity
contract A {
    uint256 public primaryValue;
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