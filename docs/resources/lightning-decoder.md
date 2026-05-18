---
description: Decode a BOLT11 Lightning invoice, LNURL, or Lightning Address in your browser and inspect the fields it reveals.
---

# Lightning Decoder

Lightning invoices can reveal more information than many people expect. A normal BOLT11 invoice can include the receiver's [node ID](../glossary.md#node-id), amount, description, expiry, payment hash, and sometimes routing hints for private channels.

This page provides a simple browser-side decoder for one payment request at a time.

!!! warning "Learning Demo Only"

    This tool is provided for learning, experimentation, and quick manual checks. It is not the official Lightning Decoder website.

    For production use or sensitive invoices, prefer the official [lightningdecoder.com](https://lightningdecoder.com/) project, or run its [open-source code](https://github.com/andrerfneves/lightning-decoder) yourself.

!!! tip "Runs in Your Browser"

    BOLT11 invoice decoding, LNURL decoding, and Lightning Address endpoint construction happen client-side in your browser.

    The tool does not broadcast payments and does not contact an lnproxy relay.

---

## Decoder

Paste a BOLT11 invoice, LNURL, or Lightning Address below.

<div class="lightning-decoder-widget" data-lightning-decoder-widget>
  <div class="ld-panel ld-single-card">
    <div class="ld-panel__topline">
      <span class="ld-step">1</span>
      <h3>Decode a payment request</h3>
    </div>
    <p class="ld-note">Paste a BOLT11 invoice, LNURL, or Lightning Address. LNURLs are decoded into their underlying URL. Lightning Addresses are shown as their standard LNURL-pay endpoint.</p>
    <textarea class="ld-input ld-single-input" placeholder="lnbc..., lightning:lnbc..., lnurl..., or name@example.com" spellcheck="false"></textarea>
    <button class="ld-button ld-decode-single" type="button">Decode</button>
    <div class="ld-output ld-single-output"></div>
  </div>
</div>

---

## What This Tool Shows

For a BOLT11 invoice, the decoder can show:

| Field | Why it matters |
|---|---|
| Payment hash | The hash used to lock the payment to a preimage. |
| Payee node key | Can reveal the receiver's Lightning node. |
| Description | May reveal payment context. |
| Amount | Reveals how much is being requested if the invoice is amount-specific. |
| Expiry | Shows the invoice validity window. |
| Routing hints | Can reveal private channel information or channel-adjacent metadata. |

The highlighted invoice view shows where important fields sit inside the raw invoice string. It is inspired by the visual approach used by the [lnproxy.org](https://lnproxy.org/) web UI, where important parts of the invoice are marked directly in the invoice text.

---

## How to Use It

1. Paste a BOLT11 invoice, LNURL, or Lightning Address into the decoder box.
2. Click **Decode**.
3. Review the decoded fields.
4. If it is a BOLT11 invoice, expand the highlighted full invoice view to see where key fields sit inside the invoice string.

---

## Privacy Notes

- BOLT11, LNURL, and Lightning Address endpoint construction happen in your browser.
- The tool does not broadcast payments.
- Lightning Address inspection only constructs the standard endpoint URL. It does not fetch that endpoint.
- If you paste invoices into a website you do not trust, that website could log them. Use local tools for highly sensitive invoices.

---

## Credits

This page is based on ideas and open-source code from [Lightning Decoder](https://lightningdecoder.com/), the original Lightning invoice, LNURL, and Lightning Address decoder. Source code: [andrerfneves/lightning-decoder](https://github.com/andrerfneves/lightning-decoder).

The highlighted invoice display is also inspired by the static [lnproxy.org](https://lnproxy.org/) web UI. Source code: [lnproxy/lnproxy-webui2](https://github.com/lnproxy/lnproxy-webui2).

---

## Related Pages

- [lnproxy Invoice Decoder](lnproxy-invoice-decoder.md)
- [Lightning Privacy](../lightning/privacy.md)
- [lnproxy](../lightning/lnproxy.md)
- [BOLT12 Offers](../lightning/bolt12.md)

---

## References

- [Lightning Decoder](https://lightningdecoder.com/) — Official Lightning decoder utility
- [Lightning Decoder GitHub repository](https://github.com/andrerfneves/lightning-decoder) — MIT-licensed source project
- [lnproxy web UI source](https://github.com/lnproxy/lnproxy-webui2) — Static lnproxy web UI and invoice highlighting approach
