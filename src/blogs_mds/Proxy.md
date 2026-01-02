# Proxies in Solidity

## What are Proxies?

In general, smart contracts are **immutable** once they are deployed.

In traditional **Web2**, we can easily change business logic by simply updating the code. However, in **Web3**, this is not possible because smart contracts are immutable by nature—once they are deployed on-chain, the logic cannot be modified.

If we want to change the business logic or fix bugs, we must deploy a **new smart contract**. But the major problem is that the **data stored in the old smart contract cannot be reused or migrated easily**, which creates serious limitations.

To overcome this issue, Solidity introduces a new methodology known as **proxy contracts**. Proxies allow us to **separate data storage from business logic**, enabling us to upgrade the logic contract while keeping the **same data and contract address** intact.

---

## Prerequisites to Understand This Blog

- Solidity basics  
- How the EVM stores data (storage slots)  
- How `delegatecall` works  

---

## What is a Proxy (Simple Explanation)

In simple terms, proxies can be explained as smart contracts that **execute logic from another smart contract while using their own storage (variables)**.

---

## Proxy Contract

```javascript

contract Proxy {
    // random slote to store implementation contract address to avoid storage collisions 
    bytes32 private constant IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    uint256 public number;

    constructor(address _implementation) {

        // storing implementation address in the storage slot of IMPLEMENTATION_SLOT
        assembly {
            sstore(IMPLEMENTATION_SLOT, _implementation)
        }
    }

    // to change implementation contract address to change business logic 
    function setImplementation(address _newImplementation) public {
        assembly {
            sstore(IMPLEMENTATION_SLOT, _newImplementation)
        }
    }


    
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
The above code is a **simple version of a proxy contract**.

- #### IMPLEMENTATION_SLOT
  A special (random) storage slot used to store the address of the implementation contract where the business logic exists.

- #### uint256 public number
  This variable occupies the **first storage slot (slot 0)** of the proxy contract.

In smart contracts, when we call a **function selector that does not exist** in the contract, the call is forwarded to the **fallback function**.  
The fallback function is a special function in Solidity.

Inside the fallback function, the proxy calls the implementation contract using **`delegatecall`**, which is a low-level call.

---

## Implementation Contracts (A & B)

```solidity
contract ImplementationA {
    uint256 number;

    function increment() public {
        // increment logic : it increments value by 1;
        number += 1;
    }
}


contract ImplementationB {
    uint256 number;

    function increment() public {
        // increment logic : it increments value by 2;
        number += 2;
    }
}
```

- **ImplementationA**  
  Contains logic where the `increment` function increases `number` by **1**.

- **ImplementationB**  
  Contains logic where the `increment` function increases `number` by **2**.

Initially, the proxy contract is deployed with **ImplementationA** as its logic contract.

---

## How Function Calls Work

The proxy contract does not directly define the `increment` function.

Instead, we call the function using the implementation’s ABI but pass the **proxy contract address**:

```solidity
ImplementationA(address(proxy_contract)).increment();
