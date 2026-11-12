const quiz = document.querySelector('#quiz');
const boxes = [...quiz.querySelectorAll('input')];
const storeKey = 'engr202-midterm-practice-v1-hw' + quiz.dataset.hw;
function load() {
  try { return JSON.parse(localStorage.getItem(storeKey)) || {}; }
  catch { return {}; }
}
const state = load();
function save() {
  try { localStorage.setItem(storeKey, JSON.stringify(state)); }
  catch { /* The current page remains usable with storage disabled. */ }
}
const progress = document.querySelector('#progress');
function updateProgress() {
  progress.textContent = boxes.filter(box => box.value.trim()).length + ' / ' + boxes.length + ' filled';
}
for (const box of boxes) {
  box.value = state.answers?.[box.id] ?? '';
  box.addEventListener('input', () => {
    state.answers ??= {};
    state.answers[box.id] = box.value;
    const result = document.getElementById(box.id + '-result');
    result.textContent = '';
    box.removeAttribute('aria-invalid');
    save();
    updateProgress();
  });
}
updateProgress();

const timer = document.querySelector('#timer');
const start = document.querySelector('#start');
function tick() {
  const remaining = state.started ? Math.max(0, Math.ceil((state.started + 7200000 - Date.now()) / 1000)) : 7200;
  const hh = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const mm = String(Math.floor(remaining / 60) % 60).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  timer.textContent = hh + ':' + mm + ':' + ss;
  start.disabled = Boolean(state.started);
  start.textContent = remaining === 0 ? 'Time is up' : state.started ? 'Timer running' : 'Start timer';
}
start.addEventListener('click', () => {
  if (!state.started) state.started = Date.now();
  save();
  tick();
});
tick();
setInterval(tick, 500);

const normalize = text => text.toLowerCase().trim().replaceAll('−','-').replace(/\s+/g,' ');
function matches(value, expected) {
  const entered = normalize(value);
  if (typeof expected === 'string') return expected.split('|').some(option => entered === normalize(option));
  const tokens = entered.replace(/[()°]/g,'').replaceAll('∠',',').split(',').map(token=>token.trim());
  const values = Array.isArray(expected) ? expected : [expected];
  return tokens.length === values.length && tokens.every((token,i) => {
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/.test(token)) return false;
    return Math.abs(Number(token) - values[i]) <= Math.max(0.0001, Math.abs(values[i]) * 0.006);
  });
}
quiz.addEventListener('submit', event => {
  event.preventDefault();
  let correct = 0;
  for (const box of boxes) {
    const result = document.getElementById(box.id + '-result');
    if (!box.value.trim()) {
      result.textContent = 'Blank';
      result.className = 'feedback';
      box.removeAttribute('aria-invalid');
      continue;
    }
    const ok = matches(box.value, JSON.parse(box.dataset.answer));
    correct += Number(ok);
    result.textContent = ok ? 'Correct' : 'Check your answer';
    result.className = 'feedback ' + (ok ? 'right' : 'wrong');
    box.setAttribute('aria-invalid', String(!ok));
  }
  document.querySelector('#result').textContent = correct + ' of ' + boxes.length + ' answers correct. Paper work is self-graded.';
  document.querySelector('#key').hidden = false;
});
