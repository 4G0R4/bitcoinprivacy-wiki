---
description: Live Ashigaru Whirlpool statistics showing current poolsize, unspent postmix, unmixed premix, cycle counts, and TX0 counts from Whirlpool.Observer.
---

# Ashigaru Whirlpool Stats

---
<div data-whirlpool-stats-widget></div>
---

## What This Page Shows

This page uses live data from [Whirlpool.Observer](https://whirlpool.observer/), an open-source scanner for Ashigaru Whirlpool activity on Bitcoin's public ledger.

The widget is a compact overview of current Whirlpool liquidity. It shows:

- Total BTC currently in Whirlpool
- Unspent Whirlpool postmix BTC
- Unmixed premix BTC waiting to mix
- Total UTXOs currently in Whirlpool
- CoinJoin cycle counts
- TX0 counts and exited premix counts by pool

---

## Why Poolsize Is Used

Older Whirlpool dashboards often focused on entered capacity. That can be misleading because it counts bitcoin that entered Whirlpool in the past even if those UTXOs later left their pool denomination.

Whirlpool.Observer uses current poolsize instead:

```text
poolsize = unspent Whirlpool postmix + unmixed premix
```

This gives a better view of the bitcoin currently sitting in Whirlpool pools.

---

## Key Terms

### Unspent Whirlpool Postmix

Bitcoin that has completed at least one Whirlpool CoinJoin and remains unspent in its pool denomination.

### Unmixed Premix

Bitcoin created by a TX0 that is still waiting to enter its first Whirlpool CoinJoin cycle.

### TX0

A TX0 is the preparation transaction before Whirlpool. It splits bitcoin into premix outputs and pays the coordinator fee.

Whirlpool.Observer detects strict TX0s by looking for:

- One zero-sat OP_RETURN output
- One coordinator-fee output worth 5% of the pool denomination
- 1 to 20 premix outputs
- Equal premix output values
- Premix outputs matching the pool denomination plus a small miner-fee extra

### Exited Premix

A premix output that was spent somewhere other than a strict Whirlpool cycle. Once this happens, it no longer counts as waiting-to-mix liquidity.

---

## Active Pools

| Pool | Denomination | Entry fee |
|---|---:|---:|
| 0.025 BTC Pool | 0.025 BTC | 0.00125 BTC |
| 0.25 BTC Pool | 0.25 BTC | 0.0125 BTC |

---

## How Whirlpool.Observer Tracks Activity

Whirlpool.Observer scans raw Bitcoin blocks in order.

For each block it checks whether transactions match strict Whirlpool or TX0 structures. It also follows known Whirlpool postmix outputs forward through time.

A transaction can extend the tracked postmix set only if it spends a tracked Whirlpool UTXO from the correct pool's lineage. This prevents unrelated 5-input, 5-output transactions from inflating the active Whirlpool set.

---

## Why This Matters

Current poolsize is not the same as lifetime usage. It is a live liquidity measure.

```text
current poolsize = unspent Whirlpool postmix + unmixed premix
```

This keeps the stats useful without overstating active Whirlpool postmix liquidity.

---

## Related Reading

- [Whirlpool](../techniques/coinjoin/whirlpool.md) — How Whirlpool CoinJoin works and how to handle post-mix UTXOs
- [Whirlpool Boltzmann Analysis](../analysis/whirlpool.md) — Entropy and link probability analysis of a Whirlpool transaction
- [Post-Mix Best Practices](../techniques/post-mix.md) — How to avoid destroying CoinJoin privacy after mixing
- [Whirlpool.Observer](https://whirlpool.observer/) — Live Ashigaru Whirlpool poolsize, cycle, TX0, and chart data
