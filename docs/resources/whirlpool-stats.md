---
description: Live Ashigaru Whirlpool statistics showing total BTC entered, pool cycle counts, and pool share data from whirlpoolstats.xyz.
---

# Ashigaru Whirlpool Stats

---
<div data-whirlpool-stats-widget></div>
---

### What Is a Whirlpool Pool?

A Whirlpool pool is a fixed-denomination CoinJoin pool. Each pool groups users who are mixing the same output size, so their outputs look identical on-chain.

Ashigaru Whirlpool currently has two active pools:

| Pool | Output size |
|---|---:|
| 0.025 BTC pool | 2,500,000 sats |
| 0.25 BTC pool | 25,000,000 sats |

### What Does "Entered" Mean?

"Entered" means the amount of bitcoin that has entered Ashigaru Whirlpool through a Tx0 transaction.

A [Tx0](../glossary.md#tx0) is the preparation transaction that splits a user's deposit into premix outputs matching a Whirlpool pool denomination. Those premix outputs can then enter actual Whirlpool CoinJoin cycles.

### What Is a Cycle?

A cycle refers to an actual Whirlpool CoinJoin transaction that happens after Tx0.

In a cycle, premixers and remixers participate in a fixed-denomination CoinJoin. The result is a set of equal-value outputs where outside observers cannot reliably determine which input funded which output.

### What Does Share Mean?

Share means how much of the total bitcoin entered into Ashigaru Whirlpool came from each pool.

For example, if the 25 million sat pool has 80% share, that means 80% of all BTC that entered Ashigaru Whirlpool entered through the 0.25 BTC pool, while the rest entered through the 0.025 BTC pool.

---

## Related Reading

- [Whirlpool](../techniques/coinjoin/whirlpool.md) — How Whirlpool CoinJoin works and how to handle post-mix UTXOs
- [Whirlpool Boltzmann Analysis](../analysis/whirlpool.md) — Entropy and link probability analysis of a Whirlpool transaction
- [Post-Mix Best Practices](../techniques/post-mix.md) — How to avoid destroying CoinJoin privacy after mixing
- [WhirlpoolStats.xyz](https://www.whirlpoolstats.xyz/) — All Whirlpool Stats data is sourced from here directly in your browser, live.
