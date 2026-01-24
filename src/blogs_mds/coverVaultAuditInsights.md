# Cover MetaVault - Audit Insights

In this blog, I share my audit insights on the OpenCover Insured Vault protocol hosted on Sherlock. I explored the protocol in depth, breaking it down function by function to understand its core functionality, behavior, and design decisions. This write-up focuses on how the protocol works internally, the assumptions it makes, and the key mechanisms that are critical from a security and correctness perspective.

## Protocol Overview

Cover MetaVault is an ERC-4626 compatible vault that implements asynchronous deposit and redemption operations through an epoch-based settlement system. The protocol extends standard vault functionality with:

- **Asynchronous Operations**: Deposits and redemptions are processed in batches during settlement periods
- **Epoch-Based Settlement**: Operations are grouped into epochs and settled by keepers
- **Premium Streaming**: Continuous fee collection mechanism that reduces share value over time
- **Role-Based Access Control**: Segregated permissions for different operational roles (Owner, Manager, Keeper, Guardian)
- **Upgradeability**: UUPS proxy pattern for protocol upgrades

The vault acts as a wrapper around an underlying ERC-4626 vault, providing additional risk management and operational features while maintaining compatibility with existing DeFi infrastructure.

---

## Core Functions Analysis

### requestDeposit(assets, controller, owner) → requestId

**Purpose**: Initiates an asynchronous deposit request

**Key Requirements**:
- `controller` and `owner` must be the same (security requirement)
- `assets` must be greater than or equal to `minimumRequestAssets`
- No fee-on-transfer or rebasing tokens allowed (validated by balance difference check)

**Process Flow**:
1. Transfer assets from owner to vault
2. Call `_syncEpoch(controller)` to convert any pending assets from previous epochs to claimable shares
3. Add assets to `depositStorage.pendingAssets` and `totalPendingAssets`
4. Return `DEPOSIT_REQUEST_ID` (always 0 - all deposits are aggregated)

**Sync Formula Used**:
$$\text{sharesToAssign} = \left\lfloor \frac{\text{pendingAssets} \times \text{epochTotalShares}}{\text{epochTotalAssets}} \right\rfloor$$

---

### cancelDepositRequest(requestId, controller, owner) → assets

**Purpose**: Synchronously cancels a pending deposit request

**Key Points**:
- `requestId` must always be 0 (deposits are aggregated)
- Only cancels assets that haven't been settled yet
- Refunds all pending assets for the controller in the current epoch
- Immediate refund within the same transaction

---

### deposit(assets, receiver, controller) → shares

**Purpose**: Claims shares by specifying the exact amount of assets to consume

**Process**: 
- Calls internal `_claimDeposit(assets, receiver, controller)`
- Consumes assets from claimable shares and transfers corresponding shares to receiver
- Uses floor rounding when converting assets to shares

---

### mint(shares, receiver, controller) → assets

**Purpose**: Claims exact number of shares and returns assets consumed

**Process**:
- Calls internal `_claimMint(shares, receiver, controller)` 
- Transfers exact shares to receiver and returns assets consumed
- Uses ceiling rounding when converting shares to assets

---

### Key Difference: deposit() vs mint()

| Aspect | deposit() | mint() |
|--------|-----------|---------|
| **Input** | Assets amount to consume | Shares amount to claim |
| **Output** | Shares received | Assets consumed |
| **Rounding** | Floor (favors vault) | Ceiling (favors user) |
| **Use Case** | "I want to spend X assets" | "I want exactly Y shares" |

**Critical Insight**: This rounding difference creates the double conversion rounding vulnerability where `deposit()` may fail due to dust while `mint()` succeeds.

---

### requestRedeem(shares, controller, owner) → requestId

**Purpose**: Initiates asynchronous redemption of shares for assets

**Process Flow**:
1. Transfer shares from owner to vault contract
2. Generate unique `requestId` (incremented counter)
3. Add shares to `redeemStorage.pendingShares`  
4. Store request details with timestamp

**Important**: Unlike deposits, each redemption gets a unique ID and can be cancelled individually.

---

### cancelRedeemRequest(requestId, controller, receiver) → shares

**Purpose**: Synchronously cancels a specific redemption request

**Requirements**:
- Request must not be settled yet
- Immediate refund of shares to receiver

---

### redeem(shares, receiver, controller) → assets

**Purpose**: Claims assets from settled redemption requests

**Process**:
- Claims up to the specified shares amount from `claimableShares`
- Calls `_claimRedeem(assets, shares, receiver, controller)`
- Returns actual assets received

---

### withdraw(assets, receiver, controller) → shares

**Purpose**: Claims exact assets amount from settled redemptions

**Process**:
- Claims exactly the specified assets amount
- Calls `_claimRedeem(assets, shares, receiver, controller)`
- Returns shares consumed

---

### settle(expectedPendingAssets, redeemRequestIds)

**Purpose**: Core settlement function that processes pending deposits and redemptions

**Key Operations**:

1. **Validation**:
   - Verify `expectedPendingAssets` matches actual pending assets
   - Check all redemption request IDs are valid and unsettled

2. **Deposit Settlement**:
   ```solidity
   if (pendingAssetsTotal != 0) {
       uint256 newEpochShares = _convertToShares(pendingAssetsTotal, Math.Rounding.Floor);
       assert(newEpochShares >= pendingAssetsTotal); // Share price never > 1
       
       _mint(address(this), newEpochShares); // Pre-mint shares for claimability
       
       // Record epoch allocation
       epochStorage.totalShares = newEpochShares;
       epochStorage.totalAssets = pendingAssetsTotal;
   }
   ```

3. **Redemption Settlement**:
   - Mark redemption requests as settled
   - Add redeemed shares to `totalClaimableRedeemShares`
   - Reserve corresponding assets for redemption claims

4. **Epoch Management**:
   - Increment current epoch
   - Stream premium (if enabled) 
   - Reset pending counters

---

### Premium Streaming Mechanism

**Purpose**: Continuous fee collection that gradually reduces vault share value

**Key Functions**:

#### _streamPremium()
- Calculates premium to collect since last update
- Formula: `premium = (totalAssets * premiumRateBps * timeElapsed) / (SECONDS_IN_YEAR * BASIS_POINTS)`
- Reduces `totalTrackedAssets` by premium amount
- Transfers collected premium to `premiumCollector`

#### setPremiumRate(newRateBps)
- Allows manager to update premium rate
- Streams any pending premium before updating rate
- Rate capped at `maxPremiumRateBps`

**Economic Impact**:
- Share value decreases over time as premium is collected
- Creates continuous revenue stream for the protocol
- Users' share purchasing power diminishes if they don't claim promptly

---

### _syncEpoch(controller)

**Purpose**: Synchronizes controller's deposit state with current epoch

**Process**:
1. Check if controller's `lastSyncedEpoch < currentEpoch`
2. If controller has pending assets from previous epoch:
   - Retrieve epoch allocation data (`epochTotalShares`, `epochTotalAssets`)
   - Calculate shares to assign using pro-rata formula
   - Add calculated shares to `claimableShares`
   - Clear `pendingAssets`
3. Update `lastSyncedEpoch` to `currentEpoch`

**Critical Assertions**:
```solidity
assert(epochTotalAssets != 0 && epochTotalShares != 0); // Prevent division by zero
assert(sharesToAssign >= pendingAssets); // Share price ≤ 1
assert(sharesToAssign <= epochTotalShares); // Don't over-allocate
```

---

## Mathematical Formulas

### Asset ↔ Share Conversions

**Assets to Shares (Floor Rounding)**:
$$\text{shares} = \left\lfloor \frac{\text{assets} \times (\text{totalSupply} + 10^{\text{decimalsOffset}})}{\text{totalAssets} + 1} \right\rfloor$$

**Shares to Assets (Floor/Ceiling Rounding)**:
$$\text{assets} = \text{round}\left(\frac{\text{shares} \times (\text{totalAssets} + 1)}{\text{totalSupply} + 10^{\text{decimalsOffset}}}\right)$$

Where: $\text{decimalsOffset} = \text{shareDecimals} - \text{assetDecimals}$ (typically 0)

### Epoch Share Allocation

**Pro-rata Share Assignment**:
$$\text{sharesToAssign} = \left\lfloor \frac{\text{pendingAssets} \times \text{epochTotalShares}}{\text{epochTotalAssets}} \right\rfloor$$

### Premium Calculation

**Time-based Premium Streaming**:
$$\text{premium} = \frac{\text{totalAssets} \times \text{premiumRateBps} \times \text{timeElapsed}}{\text{SECONDS\_IN\_YEAR} \times 10000}$$

Where:
- `premiumRateBps`: Annual premium rate in basis points
- `timeElapsed`: Seconds since last premium collection
- `SECONDS_IN_YEAR`: 31,557,600 (365.25 days)

### Key Invariants

1. **Share Price Bound**: $\frac{\text{totalAssets}}{\text{totalSupply}} \leq 1$
2. **Settlement Coverage**: $\text{settledAssets} \geq \text{totalClaimableRedeemAssets}$
3. **Asset Conservation**: $\text{totalTrackedAssets} = \text{pendingAssets} + \text{settledAssets}$