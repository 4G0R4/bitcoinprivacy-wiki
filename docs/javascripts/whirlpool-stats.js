(function () {
  const SOURCE_URL = "https://www.whirlpoolstats.xyz/";

  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const parseNumber = (value) => Number(String(value || "").replace(/,/g, ""));
  const formatBtcNumber = (value) => Number.isFinite(value) ? value.toFixed(3) : "—";
  const formatPercent = (part, whole) => {
    if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return "—";
    return `${((part / whole) * 100).toFixed(2)}%`;
  };

  const fetchText = async (url) => {
    const response = await fetch(url, { method: "GET", cache: "no-store", mode: "cors" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  };

  const formatUpdated = (value) => {
    const text = normalize(value);
    const match = text.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s+UTC,\s+(.+)$/i);
    if (!match) return text;

    const hour24 = Number(match[1]);
    const minutes = match[2];
    const suffix = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;
    return `Updated ${hour12}:${minutes} ${suffix} UTC, ${match[3]}`;
  };

  const parseWhirlpoolStats = (html) => {
    const state = {};
    const doc = new DOMParser().parseFromString(html, "text/html");
    const totalText = normalize(doc.querySelector(".total-section p")?.textContent);
    const poolSections = [...doc.querySelectorAll(".pool-section")];

    state.totalEntered = parseNumber(totalText.replace(/\s*BTC$/i, ""));

    for (const section of poolSections) {
      const poolTitle = normalize(section.querySelector(".pool-header h2")?.textContent);
      const stats = [...section.querySelectorAll(".pool-stat")].reduce((acc, row) => {
        const spans = row.querySelectorAll("span");
        const label = normalize(spans[0]?.textContent);
        const value = normalize(spans[1]?.textContent);
        acc[label] = value;
        return acc;
      }, {});

      if (poolTitle.includes("0.025")) {
        state.smallEntered = parseNumber(String(stats["Total BTC Entered"] || "").replace(/\s*BTC$/i, ""));
        state.smallCycles = parseNumber(stats["Cycles"]);
      }

      if (poolTitle.includes("0.25")) {
        state.largeEntered = parseNumber(String(stats["Total BTC Entered"] || "").replace(/\s*BTC$/i, ""));
        state.largeCycles = parseNumber(stats["Cycles"]);
      }
    }

    const bodyText = normalize(doc.body ? doc.body.textContent || "" : html);
    state.lastUpdated = formatUpdated((bodyText.match(/Last Updated\s+(.+?)\s+Block Range/) || [])[1]);
    state.blockRange = normalize((bodyText.match(/Block Range\s+([0-9,]+\s+-\s+[0-9,]+)/) || [])[1]);

    if (![state.totalEntered, state.smallEntered, state.largeEntered, state.smallCycles, state.largeCycles].every(Number.isFinite)) {
      throw new Error("Could not parse whirlpoolstats.xyz pool totals");
    }

    return state;
  };

  const widgetMarkup = (compact) => `
    <div class="whirlpool-stats-error" data-whirlpool-error hidden>
      Stats couldn't be fetched. Please reload. If the problem persists, open an issue at <a href="https://github.com/vibrant-btc/bitcoinprivacy-wiki/issues">github.com/vibrant-btc/bitcoinprivacy-wiki/issues</a>.
    </div>

    <div class="whirlpool-stats-content" data-whirlpool-content hidden>
      <div class="whirlpool-topline">
        <span>Block range: <span data-whirlpool-block-range>—</span></span>
        <span class="whirlpool-updated" data-whirlpool-last-updated>Loading Whirlpool stats...</span>
      </div>

      <section class="whirlpool-section" aria-label="Ashigaru Whirlpool pool breakdown">
        <div class="whirlpool-section-heading">
          <div class="whirlpool-heading-copy">
            <p class="whirlpool-kicker">Ashigaru Whirlpool</p>
            <h2>
              <span class="whirlpool-title-desktop">Pool breakdown</span>
              <span class="whirlpool-title-mobile">Ashigaru Whirlpool Stats</span>
            </h2>
          </div>
          <div class="whirlpool-total-inline">
            <span>Total BTC entered</span>
            <strong data-whirlpool-total-entered>—</strong>
          </div>
        </div>

        <div class="whirlpool-breakdown-layout">
          <figure class="whirlpool-donut-wrap">
            <svg class="whirlpool-donut" viewBox="0 0 120 120" role="img" aria-label="Ashigaru Whirlpool pool share chart">
              <circle class="whirlpool-donut-bg" cx="60" cy="60" r="42" pathLength="100"></circle>
              <circle class="whirlpool-donut-segment whirlpool-donut-small" data-whirlpool-donut-small cx="60" cy="60" r="42" pathLength="100">
                <title>0.025 BTC pool</title>
              </circle>
              <circle class="whirlpool-donut-segment whirlpool-donut-large" data-whirlpool-donut-large cx="60" cy="60" r="42" pathLength="100">
                <title>0.25 BTC pool</title>
              </circle>
              <circle class="whirlpool-donut-hole" cx="60" cy="60" r="26"></circle>
            </svg>
          </figure>

          <div class="whirlpool-table-wrap">
            <table class="whirlpool-pool-table">
              <thead>
                <tr>
                  <th>Pool (BTC)</th>
                  <th>Entered (BTC)</th>
                  <th>Cycles</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                <tr data-pool="small">
                  <td><span class="whirlpool-pool-name"><span class="whirlpool-swatch whirlpool-swatch-small"></span>0.025</span></td>
                  <td data-whirlpool-small-entered>—</td>
                  <td data-whirlpool-small-cycles>—</td>
                  <td data-whirlpool-small-share>—</td>
                </tr>
                <tr data-pool="large">
                  <td><span class="whirlpool-pool-name"><span class="whirlpool-swatch whirlpool-swatch-large"></span>0.25</span></td>
                  <td data-whirlpool-large-entered>—</td>
                  <td data-whirlpool-large-cycles>—</td>
                  <td data-whirlpool-large-share>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      ${compact ? "" : '<p class="whirlpool-footer">Source: <a href="https://www.whirlpoolstats.xyz/">whirlpoolstats.xyz</a>.</p>'}
    </div>
  `;

  const setText = (root, selector, value) => {
    const element = root.querySelector(selector);
    if (element) element.textContent = value || "—";
  };

  const ensureMarkup = (root) => {
    if (root.querySelector("[data-whirlpool-content]") || root.querySelector("[data-whirlpool-error]")) return;
    root.classList.add("whirlpool-stats-widget");
    if (root.dataset.whirlpoolCompact === "true") root.classList.add("whirlpool-stats-widget--compact");
    root.innerHTML = widgetMarkup(root.dataset.whirlpoolCompact === "true");
  };

  const renderWidget = (root, state) => {
    const smallShare = state.smallEntered / state.totalEntered * 100;
    const largeShare = state.largeEntered / state.totalEntered * 100;
    const safeSmallShare = Math.max(0, Math.min(100, smallShare));
    const safeLargeShare = Math.max(0, Math.min(100, largeShare));

    setText(root, "[data-whirlpool-total-entered]", `${formatBtcNumber(state.totalEntered)} BTC`);
    setText(root, "[data-whirlpool-small-entered]", formatBtcNumber(state.smallEntered));
    setText(root, "[data-whirlpool-small-cycles]", String(state.smallCycles));
    setText(root, "[data-whirlpool-small-share]", formatPercent(state.smallEntered, state.totalEntered));
    setText(root, "[data-whirlpool-large-entered]", formatBtcNumber(state.largeEntered));
    setText(root, "[data-whirlpool-large-cycles]", String(state.largeCycles));
    setText(root, "[data-whirlpool-large-share]", formatPercent(state.largeEntered, state.totalEntered));
    setText(root, "[data-whirlpool-last-updated]", state.lastUpdated || "Updated time unavailable");
    setText(root, "[data-whirlpool-block-range]", state.blockRange);

    const smallSegment = root.querySelector("[data-whirlpool-donut-small]");
    const largeSegment = root.querySelector("[data-whirlpool-donut-large]");

    if (smallSegment) {
      smallSegment.style.strokeDasharray = `${safeSmallShare} ${100 - safeSmallShare}`;
      smallSegment.style.strokeDashoffset = "0";
      const title = smallSegment.querySelector("title");
      if (title) title.textContent = `0.025 BTC pool: ${formatBtcNumber(state.smallEntered)} BTC (${formatPercent(state.smallEntered, state.totalEntered)})`;
    }

    if (largeSegment) {
      largeSegment.style.strokeDasharray = `${safeLargeShare} ${100 - safeLargeShare}`;
      largeSegment.style.strokeDashoffset = String(-safeSmallShare);
      const title = largeSegment.querySelector("title");
      if (title) title.textContent = `0.25 BTC pool: ${formatBtcNumber(state.largeEntered)} BTC (${formatPercent(state.largeEntered, state.totalEntered)})`;
    }

    const errorBox = root.querySelector("[data-whirlpool-error]");
    const content = root.querySelector("[data-whirlpool-content]");
    if (errorBox) errorBox.hidden = true;
    if (content) content.hidden = false;
  };

  const failWidget = (root) => {
    const content = root.querySelector("[data-whirlpool-content]");
    const errorBox = root.querySelector("[data-whirlpool-error]");
    if (content) content.hidden = true;
    if (errorBox) errorBox.hidden = false;
  };

  const initWhirlpoolStats = async () => {
    const widgets = [...document.querySelectorAll("[data-whirlpool-stats-widget]")]
      .filter((widget) => widget.dataset.initialized !== "true");

    if (!widgets.length) return;

    widgets.forEach((widget) => {
      widget.dataset.initialized = "true";
      ensureMarkup(widget);
    });

    try {
      const html = await fetchText(SOURCE_URL);
      const state = parseWhirlpoolStats(html);
      widgets.forEach((widget) => renderWidget(widget, state));
    } catch (error) {
      console.warn("Whirlpool stats widget failed:", error);
      widgets.forEach(failWidget);
    }
  };

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initWhirlpoolStats);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhirlpoolStats);
  } else {
    initWhirlpoolStats();
  }
})();
