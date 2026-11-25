import * as monaco from 'monaco-editor/editor/editor.api';
import 'monaco-editor/languages/definitions/python/register';
import EditorWorker from 'monaco-editor/editor/editor.worker?worker';
import { pairs, weeks, figures } from './compare-data.js';
import './compare.css';

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };
const comparison = document.querySelector('#comparison');
const handles = [];
let visibleWeek;

function element(tag, content, className) {
  const el = document.createElement(tag);
  if (content) el.textContent = content;
  if (className) el.className = className;
  return el;
}

const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (!isIntersecting) continue;
    observer.unobserve(target);
    const {code, stage} = target.dataset;
    const model = monaco.editor.createModel(code, 'python');
    const editor = monaco.editor.create(target, {
      model, theme: 'vs-dark', readOnly: true, domReadOnly: true,
      ariaLabel: target.getAttribute('aria-label'),
      automaticLayout: true, fontSize: 13, lineHeight: 20,
      minimap: {enabled: false}, folding: false, glyphMargin: false,
      lineNumbers: 'off', lineDecorationsWidth: 7, lineNumbersMinChars: 0,
      renderLineHighlight: 'none', scrollBeyondLastLine: false,
      scrollbar: {vertical: 'hidden', horizontalScrollbarSize: 9, alwaysConsumeMouseWheel: false},
      padding: {top: 3, bottom: 3},
    });
    editor.createDecorationsCollection([{
      range: new monaco.Range(1, 1, model.getLineCount(), 1),
      options: {isWholeLine: true, className: 'match-' + stage},
    }]);
    target.querySelector('pre').remove();
    handles.push({editor, model});
  }
}, {rootMargin: '250px'});

function renderPair([week, ica, hw, explanation, stages]) {
  const card = element('article', '', 'pair');
  const table = document.createElement('table');
  const caption = table.createCaption();
  const heading = (ica.split(' · ')[0] + ' ↔ ' + hw.split(' · ')[0]);
  caption.append(element('h3', heading), element('p', explanation));
  const head = table.createTHead().insertRow();
  for (const label of [ica, hw]) {
    const th = element('th', label.split(' · ')[0] + ' 代码');
    th.scope = 'col';
    th.append(element('span', label.split(' · ')[1]));
    head.append(th);
  }
  const body = table.createTBody();
  for (const [stage, [label, left, right]] of stages.entries()) {
    const row = body.insertRow();
    const height = 16 + 20 * Math.max(left.split('\n').length, right.split('\n').length);
    for (const [index, code] of [left, right].entries()) {
      const cell = row.insertCell();
      const pane = element('div', '', 'code code-' + stage);
      pane.setAttribute('aria-label', (index === 0 ? 'ICA ' : 'HW ') + label);
      pane.style.height = height + 'px';
      pane.dataset.code = code;
      pane.dataset.stage = stage;
      pane.append(element('pre', code));
      cell.append(element('span', label, 'stage stage-' + stage), pane);
      observer.observe(pane);
    }
  }
  const pairFigures = [ica, hw].map(label => figures[label.split(' · ')[0]]);
  if (pairFigures.some(Boolean)) {
    const originals = body.insertRow();
    for (const source of pairFigures) {
      const cell = originals.insertCell();
      if (!source) continue;
      const figure = element('figure', '', 'figures');
      const img = element('img');
      img.src = source.path;
      img.alt = source.alt;
      img.loading = 'lazy';
      const anchor = element('a');
      anchor.href = source.path;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.append(img);
      figure.append(anchor, element('figcaption', source.caption));
      cell.append(figure);
    }
  }
  card.append(table);
  return card;
}

function render(week) {
  if (week === visibleWeek) return;
  visibleWeek = week;
  observer.disconnect();
  for (const {editor, model} of handles.splice(0)) {
    editor.dispose();
    model.dispose();
  }
  comparison.replaceChildren();
  for (const [num, topic, sources] of weeks) {
    if (week !== 'all' && num !== week) continue;
    const group = element('section', '', 'week');
    const header = element('header', '', 'heading');
    const links = element('p');
    for (const [name, url] of sources) {
      if (links.childNodes.length) links.append(' · ');
      const anchor = element('a', name);
      anchor.href = url;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      links.append(anchor);
    }
    header.append(element('h2', '第 ' + num + ' 组 · ' + topic), links);
    group.append(header, ...pairs.filter(item => item[0] === num).map(renderPair));
    comparison.append(group);
  }
}

function receiveWeek(value) {
  if (value === 'all' || weeks.some(([num]) => num === value)) render(value);
}

window.addEventListener('message', event => {
  if (event.origin === location.origin && event.source === window.parent && event.data?.type === 'engr103-week') {
    receiveWeek(event.data.week);
  }
});
const requested = new URLSearchParams(location.search).get('week');
receiveWeek(requested === 'all' ? 'all' : Number(requested) || 5);
if (visibleWeek === undefined) render(5);
if (window.parent !== window) {
  new ResizeObserver(() => {
    window.parent.postMessage({type: 'engr103-height', height: comparison.offsetHeight}, location.origin);
  }).observe(comparison);
  window.parent.postMessage({type: 'engr103-ready'}, location.origin);
}
