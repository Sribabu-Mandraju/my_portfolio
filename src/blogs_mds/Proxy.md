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
```

 In the above code it calls increment logic of implementation A , but the value not reflect in imp1 contract it reflects in the proxy contract
 
 ```solidity
     // we call proxy contract by using implementation interface
    function test_proxy() public {
        uint256 numberValueBeforeCall = proxy_contract.number(); // reading values directly from proxy contract

        
        ImplementationA(address(proxy_contract)).increment();

        uint256 numberValueAfterCall = proxy_contract.number();

        assertEq(numberValueAfterCall,numberValueBeforeCall + 1); // increment by 1
    }

 ```
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

  In above test proxy contract uses `ImplementationA` logic so it is increments the value of number in proxy contract by `1` 
  ```solidity
    function test_proxy_with_new_implementation_logic() public {
        // changing implementation contract address in proxy;
        proxy_contract.setImplementation(address(imp2));  // new logic that increments by 2

        uint256 numberValueBeforeCall = proxy_contract.number(); // reading values directly from proxy contract

        ImplementationB(address(proxy_contract)).increment();

        uint256 numberValueAfterCall = proxy_contract.number();

        assertEq(numberValueAfterCall,numberValueBeforeCall + 2); // increment by 2
    }
  ```
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

  In above test case we modified implementation logic of proxy contract to the address of  `ImplementationB` which have logic of increment value of number in proxy contract by `2` 

 
