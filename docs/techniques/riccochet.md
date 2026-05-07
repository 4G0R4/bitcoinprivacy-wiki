---
description: Learn how Riccochet adds transactional distance between post-mix UTXOs and final destinations with 5-hop self-payments (hop 0 through hop 4)
---

# Riccochet

[Riccochet](../glossary.md#riccochet) is a privacy technique that adds "transactional distance" between your post-mix [UTXOs](../glossary.md#utxo) and their final destination. It does this by routing your bitcoin through several intermediate addresses before it reaches the recipient.

---

## What Is Riccochet?

Riccochet creates a chain of 5 transactions (hop 0 through hop 4):

``` mermaid
graph LR
    A[Hop 0: Origin] --> B[Hop 1]
    B --> C[Hop 2]
    C --> D[Hop 3]
    D --> E[Hop 4: Destination]
```

!!! tip "The Key Idea"

    Each hop is a new transaction with its own inputs and outputs. This makes it much harder for chain analysis to trace the funds back to the original post-mix UTXO.

    Think of it like bouncing a ball off several walls before it reaches its target. Each bounce adds distance and makes it harder to trace the original trajectory.

---

## Understanding Riccochet

> A premium tool that adds extra hops of history to your transaction. Stump blacklists and help guard against unjust third-party account closures.

Riccochet is a technique where you create several self-payments to your own fresh addresses to simulate a change of ownership of your bitcoin before the final spend. Unlike Ashigaru's other spending tools inherited from Samourai Wallet, Riccochet does not aim for prospective anonymity; instead, it provides a form of retrospective anonymity. In practice, Riccochet blurs properties that could compromise the fungibility of a Bitcoin UTXO.

For example, if you perform a coinjoin, your postmix coin will be identifiable as having passed through a coinjoin. Chain-analysis tools can detect coinjoin patterns and tag coins that exit them. Coinjoins break historical links, but their presence is still detectable - like encrypted text: you can't read it, but it's easy to see that encryption was applied.

That coinjoin-tagged coin label can affect fungibility. Regulated entities, for example exchanges, may refuse coinjoin-sourced UTXOs, ask for explanations, or even freeze accounts or funds.

Riccochet addresses this by inserting five successive transactions (hop 0 through hop 4), with four self-payments to new addresses you control, then sending to the final destination, for example an exchange. The goal is to create distance between the original coinjoin and the final spend. This makes chain-analysis tools more likely to consider a change of ownership has occurred post-coinjoin, discouraging them from taking action against the sender.

You might ask why chain-analysis tools don't simply look beyond four hops. In practice, these companies face an optimization dilemma: they must choose a threshold for number of hops after which they assume a change of ownership likely occurred and ignore older links. Raising that threshold increases false positives exponentially - wrongly flagging people as coinjoin participants when someone else did the coinjoin earlier in the chain. Too many false positives push users to competitors and threaten long-term viability. As a result, raising the threshold is challenging; four hops is often enough to defeat their heuristics in many cases.

!!! warning "Use Riccochet Pragmatically"

    Ideally, do not send coinjoin-sourced coins to regulated entities. If you must, for example urgent fiat liquidation, Riccochet can help reduce misclassification risks.

!!! info "Riccochet Is a Pragmatic Tool"

    Riccochet is a pragmatic, retrospective privacy tool. It does not guarantee acceptance by any third party, but it commonly reduces friction with blacklist heuristics.

---

## How Riccochet Works in Ashigaru

Riccochet is simply sending bitcoin to yourself; you can simulate it manually without any specialized tool. Ashigaru, a fork of Samourai Wallet, offers a streamlined, automated Riccochet that produces clean results.

- **Service cost:** Riccochet on Ashigaru charges 100,000 sats for service fees, plus mining fees.
- **Practical use:** Best suited for larger transfers where the fee overhead is proportionally reasonable.

!!! warning "Cost Consideration"

    Because Riccochet costs 100,000 sats plus mining fees, it's recommended for significant amounts rather than small spends.

Ashigaru offers two Riccochet variants:

=== "Staggered Delivery (Reinforced Riccochet)"

    - Distributes the 100,000-sat service fee across hops 1-4 in randomized amounts
    - Ensures each transaction is broadcast at a distinct time and confirms in a different block
    - Maximizes the appearance of ownership change for better resistance to chain analysis
    - Slower, but preferred when you're not in a hurry

=== "Classic Riccochet"

    - Executes quickly, broadcasting transactions within a short interval
    - Offers less privacy and resistance to analysis than staggered delivery
    - Use for urgent sends only

!!! tip "Choose Staggered for Best Privacy"

    Choose "staggered delivery" for best privacy; choose "Classic" only if you need speed.

---

## How to Do a Riccochet in Ashigaru

1. **Start a Send**: Tap `+` → `Send`, select the account to spend from
2. **Fill Transaction Details**: Enter the amount to send, enter the final destination address, check the `Riccochet` option
3. **Choose Riccochet Mode**: Select `Classic` (faster, lower privacy) or `Staggered Delivery` (slower, higher privacy)
4. **Review and Fee Management**: On the summary screen, review all details, adjust miner fees according to current market conditions
5. **Broadcast**: Slide the green arrow to sign and broadcast the Riccochet sequence
6. **Wait**: Riccochet will automatically manage the sequence of hops. If you chose staggered delivery, allow time for each hop to confirm in a separate block.
7. **Confirm Success**: Wait for final delivery confirmation

---

## Why Riccochet Is Powerful

=== "Breaking the Link"

    After a CoinJoin, your post-mix UTXOs are private but still traceable backward through the CoinJoin. Riccochet adds multiple hops between the post-mix and the final destination, making it much harder to trace.

=== "Adding Time Distance"

    The 5 transactions (especially in Staggered mode) take time to confirm. This temporal distance makes it harder to link the origin to the destination.

---

## Riccochet Best Practices

<div class="grid cards" markdown>

-   :material-shuffle:{ .lg .middle } __Use After Whirlpool__

    ---

    Riccochet is designed to be used after Whirlpool CoinJoin. It adds an extra layer of privacy to your post-mix spending.

-   :material-incognito:{ .lg .middle } __Use Tor__

    ---

    Always route Riccochet through Tor. Samourai Wallet supports this natively.

-   :material-clock:{ .lg .middle } __Be Patient__

    ---

    Riccochet takes time because 5 transactions need to confirm. Do not rush it.

-   :material-hand-back-right-off:{ .lg .middle } __Use One Post-Mix UTXO__

    ---

    Each Riccochet should use only one post-mix UTXO. Never combine post-mix outputs.

</div>

---

## Common Riccochet Mistakes

=== "Using Riccochet for Non-Post-Mix UTXOs"

    Riccochet is designed for post-mix spending. For regular spending, use PayJoin or Stonewall.

=== "Combining Post-Mix UTXOs"

    Never spend more than one post-mix UTXO in a Riccochet. This re-links your mixed outputs.

!!! info "Riccochet Guide"

    An excellent guide on using Riccochet in Ashigaru Wallet from [Loïc Morel](https://github.com/LoicPandul) can be found linked [here](https://planb.academy/en/tutorials/privacy/on-chain/ashigaru-ricochet-e0bb1afe-becd-44a6-a940-88a463756589).

    A prerequisite to using Riccochet is having Ashigaru Wallet installed securely, [here](https://planb.academy/en/tutorials/wallet/mobile/ashigaru-9f903b55-2e55-4b06-9627-80f8e178158f) is another written guide from Loïc on this topic, If you prefer a video format [here](https://www.youtube.com/watch?v=aykJ4eP-Veo) is a video from [BTC Sessions](https://x.com/BTCsessions).


## Further reading

- [Riccochet Analysis](../analysis/riccochet.md) - Riccochet deep dive and examples
