---
description: Wrap a BOLT11 invoice with lnproxy, decode the original and wrapped invoices in your browser, and verify the payment hash before sharing the proxy invoice.
---

# lnproxy Invoice Decoder

[lnproxy](../lightning/lnproxy.md) can wrap a Lightning invoice so the payer sees the proxy node instead of your node. This page provides a small browser-side demo tool for wrapping an invoice through a clearnet lnproxy relay and checking the result.

!!! warning "Learning Demo Only"

    This tool is for learning, experimentation, and a visualizer of hash verification. It is not the official lnproxy web interface.

    For acutal LNproxy use, use [lnproxy.org](https://lnproxy.org/).

!!! tip "What Runs Locally"

    Invoice decoding and payment-hash comparison happen in your browser.

    The wrapping step contacts the selected lnproxy relay because a relay must create the proxy invoice. That request is explicit and only happens when you click **Wrap with lnproxy**.

---

## Demo Tool

Paste your original BOLT11 invoice, optionally choose a relay, then wrap it. The tool automatically decodes the original and wrapped invoices and checks whether the payment hash matches.

<div class="lightning-decoder-widget" data-lightning-decoder-widget>
  <a id="lnproxy-demo-tool"></a>

  <div class="ld-lnproxy-card">
    <div class="ld-panel__topline">
      <span class="ld-step">1</span>
      <h3>Wrap invoice</h3>
    </div>
    <p class="ld-note">Paste the original invoice. The relay returns a wrapped invoice that should preserve the same payment hash.</p>

    <label class="ld-label" for="ld-lnproxy-relay">lnproxy relay</label>
    <input class="ld-text-input ld-lnproxy-relay" id="ld-lnproxy-relay" list="ld-relay-list" placeholder="Random default relay" autocomplete="off">
    <datalist class="ld-relay-list" id="ld-relay-list"></datalist>

    <label class="ld-label" for="ld-lnproxy-invoice">Invoice to wrap</label>
    <textarea class="ld-input ld-lnproxy-invoice" id="ld-lnproxy-invoice" placeholder="Paste your original lnbc invoice here" spellcheck="false"></textarea>

    <details class="ld-advanced">
      <summary>Advanced options</summary>
      <div class="ld-advanced__grid">
        <div>
          <label class="ld-label" for="ld-lnproxy-description">Requested description</label>
          <input class="ld-text-input ld-lnproxy-description" id="ld-lnproxy-description" type="text" placeholder="Optional custom description">
        </div>
        <div>
          <label class="ld-label" for="ld-lnproxy-routing">Routing budget in sats</label>
          <input class="ld-text-input ld-lnproxy-routing" id="ld-lnproxy-routing" type="number" min="0" step="1" placeholder="Optional">
        </div>
      </div>
    </details>

    <div class="ld-action-row">
      <button class="ld-button ld-wrap-button" type="button">Wrap with lnproxy</button>
      <span class="ld-wrap-status"></span>
    </div>

    <div class="ld-lnproxy-output"></div>
  </div>

  <div class="ld-grid ld-grid--verification">
    <div class="ld-panel ld-panel--original">
      <div class="ld-panel__topline">
        <span class="ld-step">2</span>
        <h3>Original invoice</h3>
      </div>
      <p class="ld-note">The original invoice appears here after wrapping.</p>
      <div class="ld-output ld-original-output">
        <div class="ld-empty-state">Wrap an invoice to show the original invoice with highlighted fields.</div>
      </div>
    </div>

    <div class="ld-panel ld-panel--wrapped">
      <div class="ld-panel__topline">
        <span class="ld-step">3</span>
        <h3>Wrapped invoice</h3>
      </div>
      <p class="ld-note">The wrapped invoice returned by the relay appears here.</p>
      <div class="ld-output ld-wrapped-output">
        <div class="ld-empty-state">Wrap an invoice to show the proxy invoice with highlighted fields.</div>
      </div>
    </div>
  </div>

  <div class="ld-compare-card">
    <div class="ld-panel__topline">
      <span class="ld-step">4</span>
      <h3>Verify payment hash</h3>
    </div>
    <p class="ld-note">A matching payment hash means the wrapped invoice is tied to the same preimage as the original invoice.</p>
    <div class="ld-compare-slot">
      <div class="ld-empty-state">Wrap an invoice to compare payment hashes.</div>
    </div>
  </div>
</div>

---

## How to Use It

1. Paste your original BOLT11 invoice into **Invoice to wrap**.
2. Optionally choose a relay. If you leave it blank, the tool chooses one of the built-in clearnet relays.
3. Optionally set a description or routing budget.
4. Click **Wrap with lnproxy**.
5. Check the original and wrapped invoice highlights.
6. Read the **Verify payment hash** result.
7. If the checks pass, copy the wrapped invoice or open it in your wallet.

A good lnproxy wrapper should show:

- **Payment hash: Match**
- **Destination: Proxied**
- Wrapped amount same or higher than the original

---

## What the Highlighted Invoice Shows

The highlighted invoice view marks key parts of the invoice string:

| Highlight | Meaning |
|---|---|
| Payment hash | The hash that should match between the original and wrapped invoice |
| Description | The human-readable invoice description, when present |
| Signature / destination | The signature area used here as a practical destination-change check |
| Amount prefix | The invoice amount encoded near the start of the invoice |

The payment hash is the most important check. If it does not match, do not use the wrapped invoice as a replacement for the original.

---

## Credits

This page is based on open-source code from [lnproxy.org](https://lnproxy.org/).

The invoice decoding are also based on code from [Lightning Decoder](https://lightningdecoder.com/) and [andrerfneves/lightning-decoder](https://github.com/andrerfneves/lightning-decoder).

---

## Related Pages

- [Lightning Decoder](lightning-decoder.md)
- [lnproxy](../lightning/lnproxy.md)
- [Lightning Privacy](../lightning/privacy.md)
- [BOLT12 Offers](../lightning/bolt12.md)
