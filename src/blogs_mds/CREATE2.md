
# Understanding CREATE2 with a Uniswap-V2-Style Factory & Pair (Hands-On)

While learning Uniswap V2 internals, I wanted to **understand CREATE2 properly instead of memorizing it**.  
So I built a **minimal Factory + Pair setup** that mirrors the Uniswap V2 design decisions:

- Deterministic contract addresses
- No constructor arguments
- One pair per token combination
- Ability to precompute the deployed address

This blog walks through the **exact code**, explains *why each part exists*, and connects it to **real Uniswap V2 concepts**.

---

## Why CREATE2?

`CREATE2` allows us to **precompute a contract address before deployment**.

The address is derived from:

- Factory (deployer) address
- Salt
- Init code hash (creation bytecode)
- A fixed `0xff` prefix

Because of this:
- The same inputs → same address
- Same logic works across different networks
- Duplicate deployments can be prevented cleanly

---

## Pair Contract (No Constructor Arguments)

```solidity
contract Pair {
    address token1;
    address token2;

    bool isInitialised;

    constructor() {} // avoid constructor args to get static hash_init easy to compile

    function initialise(address _token1,address _token2) public {
        require(!isInitialised,"already initialised"); // initialise values only once 
        token1 = _token1;
        token2 = _token2;
        isInitialised = true;
    }

    function getPairTokenAddresses() public view returns (address, address) {
        return (token1, token2);
    }
}
```



-----
### Why no constructor arguments?

This follows **Uniswap V2’s exact pattern**.

If constructor arguments were used:

* Init code hash would depend on runtime values
* Router / Factory would not have a constant `INIT_CODE_HASH`
* Precomputing addresses becomes fragile

Instead:

* The contract is deployed with static bytecode
* Tokens are set using a one-time `initialise()` call
* This keeps CREATE2 deterministic and safe

---

## Factory Contract – Deploying with CREATE2

```solidity
contract Factory {

    function deploy(
        bytes memory bytecode,
        bytes32 _salt,
        address _tok1,
        address _tok2
    ) public returns (address pair) {
        assembly {
            pair := create2(
                0,
                add(bytecode, 32),
                mload(bytecode),
                _salt
            )
        }

        Pair(pair).initialise(_tok1,_tok2); // initialising instead of constructor
        return pair;
    }
}
```
---

### What happens here?

* `create2` deploys the contract at a deterministic address
* Same `bytecode + salt + factory` → same address
* If the address already exists → deployment reverts
* This guarantees **only one Pair per token combination**

---

## Salt Generation (Prevent Duplicate Pairs)

```solidity
function getSalt(address _tok1, address _tok2) public pure returns (bytes32) {
    (address token0, address token1) =
        _tok1 < _tok2 ? (_tok1, _tok2) : (_tok2, _tok1);

    return keccak256(abi.encode(token0, token1));
}
```

### Why sorting tokens?

Without sorting:

* `(A, B)` and `(B, A)` would produce different salts
* That would allow two different Pair contracts

Sorting ensures:

* One unique salt per token pair
* Same invariant Uniswap V2 enforces

---

## Getting Pair Creation Bytecode

```solidity
function getByteCode() public pure returns (bytes memory) {
    bytes memory bytecode = type(Pair).creationCode;
    return bytecode;
}
```

This is the **init (creation) code**, not runtime code.

This value is:

* Hashed during CREATE2 address calculation
* Constant across deployments
* Equivalent to Uniswap’s `INIT_CODE_HASH`

---

## Precomputing the Pair Address

```solidity
function getComputedAddress(address _tok1, address _tok2)
    public
    view
    returns (address)
{
    bytes32 hash = keccak256(
        abi.encodePacked(
            bytes1(0xff),
            address(this),
            getSalt(_tok1, _tok2),
            keccak256(getByteCode())
        )
    );

    return address(uint160(uint256(hash)));
}
```

This exactly follows the **CREATE2 address formula**:

```
address = keccak256(
  0xff ++ factory ++ salt ++ keccak256(init_code)
)[12:]
```

This allows:

* Knowing the Pair address before deployment
* Frontends, bots, and indexers to compute addresses off-chain
* Same address logic across networks

---

## Testing with Foundry

### Deploying a Pair

```solidity
function test_deploy_pair_contract() public {
    bytes32 _salt = _fact.getSalt(_token1,_token2);
    bytes memory bytecode = type(Pair).creationCode;

    address pairContract =
        _fact.deploy(bytecode,_salt,_token1, _token2);

    _pair = Pair(pairContract);
}
```

### Verifying Computed Address

```solidity
function testExpectedDeployedAddress() public PairDeployed {
    address expectedAddress =
        _fact.getComputedAddress(_token1, _token2);

    assertEq(address(_pair), expectedAddress);
}
```

This confirms:

* CREATE2 calculation is correct
* Deployment matches the precomputed address

---

## Preventing Redeployment with Same Pair

```solidity
function test_Try_to_redploy_contract_with_same_pair()
    public
    PairDeployed
{
    bytes32 _salt = _fact.getSalt(_token1,_token2);
    bytes memory bytecode = type(Pair).creationCode;

    vm.expectRevert();
    _fact.deploy(bytecode,_salt,_token1, _token2);
}
```

Why it reverts:

* CREATE2 cannot deploy to an address that already has code
* Same salt + bytecode → same address
* This is exactly how Uniswap enforces **one pair per token pair**

---

## Key Takeaways

* CREATE2 enables deterministic deployments
* Avoiding constructor args keeps init code hash constant
* Sorting tokens in salt is critical
* Initialisation pattern is safer than constructors here
* Same design principles power Uniswap V2

This small project helped me understand **why Uniswap V2 is designed the way it is**, instead of just copying patterns blindly.

---

---

## Complete Source Code

All the contracts, tests, and experiments shown in this blog are available in my GitHub repository.

👉 **GitHub Repository:**  
https://github.com/Sribabu-Mandraju/CREATE2

Feel free to explore the code, run the tests, or fork the repository and play around with CREATE2 yourself.

If you’re learning Uniswap V2 internals or deterministic deployments, this repo should be a good hands-on reference.
