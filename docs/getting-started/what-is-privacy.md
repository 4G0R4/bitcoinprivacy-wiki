---
description: Learn what Bitcoin privacy means, why Bitcoin is pseudonymous rather than anonymous, and how links between identity, addresses, UTXOs, and activity are created.
---

# What Is Bitcoin Privacy?

The previous page explained why privacy matters. This page explains **what Bitcoin privacy actually means**.

Bitcoin privacy is not one single setting you turn on. It is the practice of controlling which pieces of information are linked together.

In Bitcoin, the most important question is usually:

> Who can connect this transaction, address, or coin to a real person or identity?

---

## Bitcoin Is Pseudonymous, Not Anonymous

Bitcoin does not put your legal name inside a transaction. A Bitcoin [address](../glossary.md#address) looks like a random string:

```text
bc1qelem0ann687r2e9jax542lja7q8cu8s35h96pc
```

There is no name, phone number, passport number, or home address written inside that address.

But that does **not** mean Bitcoin is anonymous.

!!! warning "Pseudonymous Means 'Name Hidden, Activity Visible'"

    Bitcoin is better described as **pseudonymous**.

    Your real name is not automatically shown, but your activity can still be watched and linked together. If one address becomes connected to you, other addresses and transactions may become connected to you too.

A simple way to think about it:

- **Anonymous:** nobody can tell who you are
- **Pseudonymous:** you use identifiers that are not your real name, but those identifiers can still build a history

Bitcoin addresses are like public usernames for money. If a username is ever linked to you, the history attached to that username becomes easier to understand.

---

## Privacy Means Breaking Unwanted Links

Bitcoin privacy is mostly about preventing unwanted links.

A **link** is a connection between two pieces of information.

Examples:

- Your name is linked to a Bitcoin address
- Two addresses are linked to the same wallet
- A payment is linked to your employer
- A donation address is linked to your public identity
- Several coins are linked together in one transaction
- Your wallet activity is linked to your IP address

The fewer unwanted links you create, the harder it is for someone to build a clear picture of your financial life.

!!! tip "The Goal Is Selective Disclosure"

    Good privacy does not mean hiding everything from everyone.

    It means revealing only what is necessary. If you pay someone, they need to know they were paid. They do not need to learn your savings balance, your other payments, or your full wallet history.

---

## The Four Main Things That Get Linked

Most Bitcoin privacy problems come from links between four things:

<div class="grid cards" markdown>

-   :material-account:{ .lg .middle } __Identity__

    ---

    Your real name, public username, business, phone number, email address, social profile, or anything else that points to you.

-   :material-wallet:{ .lg .middle } __Wallet Activity__

    ---

    The addresses, balances, transactions, and coins that your wallet controls.

-   :material-server-network:{ .lg .middle } __Network Activity__

    ---

    Your IP address, wallet server connections, block explorer searches, and transaction broadcasts.

-   :material-clock-outline:{ .lg .middle } __Context__

    ---

    Timing, amounts, invoices, labels, public posts, messages, or real-world events that help explain a transaction.

</div>

Bitcoin privacy means keeping these categories separated when they do not need to be connected.

---

## A Simple Example

Imagine you receive bitcoin to a fresh address from a friend.

That address is not automatically tied to your real name. But links can appear later:

1. You reuse the same address for another payment
2. You post that address on social media
3. You spend coins from that address together with coins from another source
4. You look up the address on a public block explorer from your normal browser
5. You send from that wallet to a service that knows your identity

Each step adds more clues. One clue may not reveal much. Many clues together can reveal a lot.

??? info "Why Small Clues Matter"

    Bitcoin privacy often fails through combination.

    A single address, a single IP address, or a single payment amount may not prove much by itself. But when several clues point in the same direction, the picture becomes clearer.

---

## Bitcoin Privacy Is About Context

A Bitcoin transaction is just data. It shows inputs, outputs, amounts, and timing.

Privacy leaks happen when that data gains context.

For example:

| Context added | What it can reveal |
|---|---|
| A reused address | Payments belong to the same receiver |
| A public donation page | Payments are connected to a public project |
| An exchange withdrawal | Coins started from an identity-linked account |
| A wallet server query | Which addresses a wallet is interested in |
| A payment amount | Which output is likely the real payment |
| A social media post | A real person may be connected to an address |

This is why Bitcoin privacy is not only about the blockchain. It is also about how you receive, spend, connect, post, label, and talk about bitcoin.

---

## Privacy Is a Skill

Bitcoin privacy is not hopeless, but it is not automatic either.

You do not need to learn everything at once. Start with the basic idea:

> Do not create unnecessary links.

Then learn the practical habits one by one:

1. Use fresh addresses
2. Keep different sources of bitcoin separate
3. Understand [UTXOs](../glossary.md#utxo)
4. Use wallets with good privacy features
5. Run your own [node](../glossary.md#node) when ready
6. Learn privacy tools before using them with large amounts

Each habit reduces the amount of information you leak.

---

## What Comes Next

Now that you understand what Bitcoin privacy means, the next step is to think about your own situation.

A public donation page, a long-term savings wallet, and everyday spending all have different privacy needs. A simple [threat model](threat-modeling.md) helps you decide what matters most.

[Threat Modeling →](threat-modeling.md)
