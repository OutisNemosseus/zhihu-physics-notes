const saveStatus = document.querySelector('#save-status');
for (const question of document.querySelectorAll('[data-question]')) {
  for (const input of question.querySelectorAll('[data-blank]')) {
    const key = 'engr202-midterm1-redo-' + question.dataset.question + '-' + input.dataset.blank;
    try { input.value = localStorage.getItem(key) || ''; }
    catch { saveStatus.textContent = '浏览器存储不可用。'; }
    input.addEventListener('input', () => {
      try {
        localStorage.setItem(key, input.value);
        saveStatus.textContent = '作答已保存在当前浏览器。';
      } catch {
        saveStatus.textContent = '浏览器存储不可用。';
      }
    });
  }
}

{
  const duration = 60 * 60 * 1000;
  const timerKey = 'engr202-midterm1-timer';
  const clock = document.querySelector('#timer-clock');
  const toggle = document.querySelector('#timer-toggle');
  const reset = document.querySelector('#timer-reset');
  const message = document.querySelector('#timer-message');

  function readTimer() {
    try {
      const saved = JSON.parse(localStorage.getItem(timerKey));
      if (saved && Number.isFinite(saved.remaining) && saved.remaining >= 0 &&
          saved.remaining <= duration && (saved.deadline === null || Number.isFinite(saved.deadline))) {
        return saved;
      }
    } catch {
      // Keep the timer usable when browser storage is unavailable.
    }
    return { remaining: duration, deadline: null };
  }

  let timer = readTimer();

  function remainingTime() {
    return timer.deadline === null ? timer.remaining : Math.max(0, timer.deadline - Date.now());
  }

  function renderTimer() {
    const seconds = Math.ceil(remainingTime() / 1000);
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainder = String(seconds % 60).padStart(2, '0');
    const running = timer.deadline !== null && seconds > 0;
    clock.textContent = minutes + ':' + remainder;
    toggle.textContent = running ? '暂停' : '开始';
    toggle.disabled = seconds === 0;
    message.textContent = seconds === 0 ? '时间到' : '';
  }

  function setTimer(next) {
    timer = next;
    try { localStorage.setItem(timerKey, JSON.stringify(timer)); }
    catch {
      // The timer continues in the current page.
    }
    renderTimer();
  }

  toggle.addEventListener('click', () => {
    const remaining = remainingTime();
    if (remaining === 0) {
      renderTimer();
      return;
    }
    const deadline = timer.deadline === null ? Date.now() + remaining : null;
    setTimer({ remaining, deadline });
  });
  reset.addEventListener('click', () => setTimer({ remaining: duration, deadline: null }));
  window.addEventListener('storage', event => {
    if (event.key === timerKey) {
      timer = readTimer();
      renderTimer();
    }
  });
  setInterval(renderTimer, 250);
  renderTimer();
}

{
  const timerKey = 'engr202-midterm1-stopwatch';
  const clock = document.querySelector('#stopwatch-clock');
  const toggle = document.querySelector('#stopwatch-toggle');
  const reset = document.querySelector('#stopwatch-reset');
  const message = document.querySelector('#stopwatch-message');
  const initialTimer = { startedAt: null, elapsed: null };

  function readTimer() {
    try {
      const saved = JSON.parse(localStorage.getItem(timerKey));
      if (saved && (saved.startedAt === null || Number.isFinite(saved.startedAt)) &&
          (saved.elapsed === null || (Number.isFinite(saved.elapsed) && saved.elapsed >= 0))) {
        return saved;
      }
    } catch {
      // Keep the timer usable when browser storage is unavailable.
    }
    return initialTimer;
  }

  let timer = readTimer();

  function elapsedTime() {
    return timer.startedAt === null ? (timer.elapsed ?? 0) : Math.max(0, Date.now() - timer.startedAt);
  }

  function renderTimer() {
    const seconds = Math.floor(elapsedTime() / 1000);
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainder = String(seconds % 60).padStart(2, '0');
    const time = minutes + ':' + remainder;
    clock.textContent = time;
    toggle.textContent = timer.startedAt === null ? '开始' : '结束';
    toggle.disabled = timer.elapsed !== null;
    const result = timer.elapsed === null ? '' : '本次用时 ' + time;
    if (message.textContent !== result) message.textContent = result;
  }

  function setTimer(next) {
    timer = next;
    try { localStorage.setItem(timerKey, JSON.stringify(timer)); }
    catch {
      // The timer continues in the current page.
    }
    renderTimer();
  }

  toggle.addEventListener('click', () => {
    if (timer.elapsed !== null) return;
    setTimer(timer.startedAt === null
      ? { startedAt: Date.now(), elapsed: null }
      : { startedAt: null, elapsed: elapsedTime() });
  });
  reset.addEventListener('click', () => setTimer(initialTimer));
  window.addEventListener('storage', event => {
    if (event.key === timerKey) {
      timer = readTimer();
      renderTimer();
    }
  });
  setInterval(renderTimer, 250);
  renderTimer();
}
