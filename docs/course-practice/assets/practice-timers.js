(() => {
  const host = document.createElement('aside');
  host.setAttribute('aria-label', 'Practice timers');
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        position: fixed;
        inset: auto max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) auto;
        max-width: calc(100vw - 24px);
        z-index: 900;
        color: #172630;
        font: 14px/1.4 system-ui, sans-serif;
      }
      details {
        background: #fff;
        border: 1px solid #a7b5bf;
        border-radius: 10px;
        box-shadow: 0 3px 14px #152c4226;
      }
      summary { cursor: pointer; padding: 9px 12px; font-weight: 650; }
      .timers {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
        gap: 12px;
        width: min(260px, calc(100vw - 50px));
        padding: 0 12px 12px;
      }
      h2 { font-size: 14px; margin: 0; }
      .clock { display: block; font-size: 24px; font-weight: 650; }
      .clock, .summary-clocks { font-variant-numeric: tabular-nums; }
      button {
        font: inherit;
        color: #18384c;
        background: #f4f7fa;
        border: 1px solid #8a9aa5;
        border-radius: 5px;
        padding: 4px 7px;
        cursor: pointer;
      }
      button:disabled { cursor: default; opacity: .55; }
      button:focus-visible, summary:focus-visible { outline: 2px solid #086996; outline-offset: 2px; }
      .status { display: block; font-size: 12px; }
      @media print { :host { display: none; } }
    </style>
    <details>
      <summary>Timers <span class="summary-clocks" aria-hidden="true"></span></summary>
      <div class="timers">
        <section aria-labelledby="countdown-title">
          <h2 id="countdown-title">60-minute countdown</h2>
          <span class="clock" role="timer" aria-label="Time remaining">60:00</span>
          <button type="button" class="toggle">Start</button>
          <button type="button" class="reset">Reset</button>
          <span class="status" role="status"></span>
        </section>
        <section aria-labelledby="stopwatch-title">
          <h2 id="stopwatch-title">Stopwatch</h2>
          <span class="clock" role="timer" aria-label="Elapsed time">00:00</span>
          <button type="button" class="toggle">Start</button>
          <button type="button" class="reset">Reset</button>
          <span class="status" role="status"></span>
        </section>
      </div>
    </details>`;
  document.body.append(host);

  const duration = 60 * 60 * 1000;
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const storageKey = 'zhihu-practice-timers:' + path;
  const initialState = {
    countdown: { remaining: duration, endsAt: null },
    stopwatch: { startedAt: null, elapsed: null },
  };
  const countdownPanel = shadow.querySelector('[aria-labelledby="countdown-title"]');
  const stopwatchPanel = shadow.querySelector('[aria-labelledby="stopwatch-title"]');
  const summary = shadow.querySelector('.summary-clocks');

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved?.countdown && saved?.stopwatch) return saved;
    } catch {
      // Timers still run within this page if storage is unavailable.
    }
    return initialState;
  }

  let state = readState();

  function saveState(next) {
    state = next;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch {
      // Keep the current page state.
    }
    render();
  }

  function remaining(now) {
    const { endsAt, remaining } = state.countdown;
    return endsAt === null ? remaining : Math.max(0, endsAt - now);
  }

  function elapsed(now) {
    const { startedAt, elapsed } = state.stopwatch;
    return startedAt === null ? (elapsed ?? 0) : Math.max(0, now - startedAt);
  }

  function format(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    return minutes + ':' + String(seconds % 60).padStart(2, '0');
  }

  function setText(element, value) {
    if (element.textContent !== value) element.textContent = value;
  }

  function renderPanel(panel, clock, action, disabled, status) {
    setText(panel.querySelector('.clock'), clock);
    const toggle = panel.querySelector('.toggle');
    setText(toggle, action);
    toggle.disabled = disabled;
    setText(panel.querySelector('.status'), status);
  }

  function render() {
    const now = Date.now();
    const left = Math.ceil(remaining(now) / 1000);
    const countdown = format(left);
    const stopwatch = format(Math.floor(elapsed(now) / 1000));
    const finished = state.stopwatch.elapsed !== null;
    renderPanel(countdownPanel, countdown, state.countdown.endsAt === null || left === 0 ? 'Start' : 'Pause', left === 0, left === 0 ? 'Time’s up' : '');
    renderPanel(stopwatchPanel, stopwatch, state.stopwatch.startedAt === null ? 'Start' : 'Finish', finished, finished ? 'Elapsed: ' + stopwatch : '');
    setText(summary, ' · ' + countdown + ' / ' + stopwatch);
  }

  countdownPanel.querySelector('.toggle').addEventListener('click', () => {
    const now = Date.now();
    const left = remaining(now);
    if (left <= 0) return;
    const endsAt = state.countdown.endsAt === null ? now + left : null;
    saveState({ ...state, countdown: { remaining: left, endsAt } });
  });
  countdownPanel.querySelector('.reset').addEventListener('click', () => {
    saveState({ ...state, countdown: initialState.countdown });
  });
  stopwatchPanel.querySelector('.toggle').addEventListener('click', () => {
    if (state.stopwatch.elapsed !== null) return;
    const now = Date.now();
    const stopwatch = state.stopwatch.startedAt === null
      ? { startedAt: now, elapsed: null }
      : { startedAt: null, elapsed: elapsed(now) };
    saveState({ ...state, stopwatch });
  });
  stopwatchPanel.querySelector('.reset').addEventListener('click', () => {
    saveState({ ...state, stopwatch: initialState.stopwatch });
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      state = readState();
      render();
    }
  });
  setInterval(render, 250);
  render();
})();
