for (const article of document.querySelectorAll('article')) {
  const inputs = [...article.querySelectorAll('input')];
  const status = article.querySelector('[role=status]');
  const key = 'engr103-hw7-fill-v1-' + article.id;
  function save() {
    try { localStorage.setItem(key, JSON.stringify(inputs.map(input => input.value))); } catch {}
  }
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved)) inputs.forEach((input, i) => { input.value = saved[i] || ''; });
  } catch {}
  for (const input of inputs) {
    input.oninput = () => {
      input.removeAttribute('aria-invalid');
      status.textContent = '';
      save();
    };
  }
  article.querySelector('[data-check]').onclick = () => {
    const wrong = [];
    inputs.forEach((input, i) => {
      const expected = input.dataset.answer;
      const answer = input.value.trim().replace(/\s*-\s*/g, ' - ');
      const valid = answer === expected;
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid) wrong.push(i + 1);
    });
    status.textContent = wrong.length ? '再检查第 ' + wrong.join('、') + ' 空。' : '全部正确。';
  };
  article.querySelector('[data-reset]').onclick = () => {
    inputs.forEach(input => { input.value = ''; input.removeAttribute('aria-invalid'); });
    status.textContent = '';
    save();
    inputs[0].focus();
  };
}
