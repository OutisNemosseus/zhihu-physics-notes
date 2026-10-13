import * as monaco from 'monaco-editor/editor/editor.api';
import 'monaco-editor/languages/definitions/python/register';
import 'monaco-editor/editor/contrib/semanticTokens/browser/documentSemanticTokens';
import 'monaco-editor/editor/contrib/hover/browser/hoverContribution';
import 'monaco-editor/editor/contrib/suggest/browser/suggestController';
import 'monaco-editor/editor/contrib/find/browser/findController';
import EditorWorker from 'monaco-editor/editor/editor.worker?worker';
import { PythonLanguageService } from './lsp.js';
import './style.css';

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };
const $ = (id) => document.getElementById(id);
const storageKey = 'tong-su-python-editor-v1';
const example = `import heapq
from dataclasses import dataclass


@dataclass
class Task:
    name: str
    priority: int


def ordered_tasks(tasks: list[Task]) -> list[str]:
    heap: list[tuple[int, str]] = []
    for task in tasks:
        heapq.heappush(heap, (task.priority, task.name))

    result: list[str] = []
    while heap:
        priority, name = heapq.heappop(heap)
        result.append(name)
    return result


tasks = [Task("Python", 2), Task("Circuits", 1), Task("Math", 3)]
print(ordered_tasks(tasks))
`;
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { /* Start with the example if storage is unavailable. */ }
$('filename').value = saved.filename || 'main.py';
$('stdin').value = saved.stdin || '';
$('fallback').value = typeof saved.code === 'string' ? saved.code : example;

monaco.editor.defineTheme('tong-dark', {
  base: 'vs-dark', inherit: true,
  rules: [
    { token: '', foreground: 'D4D4D4' },
    { token: 'keyword', foreground: 'C586C0' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'number', foreground: 'B5CEA8' },
    { token: 'comment', foreground: '7FA665' },
    { token: 'variable', foreground: '9CDCFE' },
    { token: 'parameter', foreground: '9CDCFE' },
    { token: 'selfParameter', foreground: '9CDCFE' },
    { token: 'clsParameter', foreground: '9CDCFE' },
    { token: 'property', foreground: '9CDCFE' },
    { token: 'function', foreground: 'DCDCAA' },
    { token: 'method', foreground: 'DCDCAA' },
    { token: 'class', foreground: '4EC9B0' },
    { token: 'type', foreground: '4EC9B0' },
    { token: 'typeParameter', foreground: '4EC9B0' },
    { token: 'namespace', foreground: '4EC9B0' },
    { token: 'decorator', foreground: 'DCDCAA' },
    { token: 'variable.readonly', foreground: '4FC1FF' },
    { token: 'enumMember', foreground: '4FC1FF' },
  ],
  colors: { 'editor.background': '#1e1e1e', 'editor.foreground': '#d4d4d4', 'editorLineNumber.foreground': '#858585', 'editorLineNumber.activeForeground': '#eeeeee', 'editor.selectionBackground': '#264f78' },
});

let editor;
try {
  const model = monaco.editor.createModel($('fallback').value, 'python', monaco.Uri.parse('file:///src/main.py'));
  editor = monaco.editor.create($('editor'), {
    model, theme: 'tong-dark', automaticLayout: true,
    fontSize: 15, lineHeight: 24, fontFamily: 'Consolas, "SFMono-Regular", Menlo, monospace',
    padding: { top: 16, bottom: 16 }, minimap: { enabled: false },
    scrollBeyondLastLine: false, tabSize: 4, insertSpaces: true,
    bracketPairColorization: { enabled: true },
    'semanticHighlighting.enabled': true,
    quickSuggestions: false, suggestOnTriggerCharacters: false,
    wordBasedSuggestions: 'off', inlineSuggest: { enabled: false },
  });
} catch (error) {
  $('fallback').style.display = 'block';
  $('editor').style.display = 'none';
  $('analysis-status').textContent = '● 编辑器加载失败，仍可编辑和运行';
  console.error(error);
}
const getCode = () => editor ? editor.getValue() : $('fallback').value;
const setCode = (text) => { if (editor) editor.setValue(text); else $('fallback').value = text; persist(); };

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ code: getCode(), filename: $('filename').value, stdin: $('stdin').value }));
    $('save-status').textContent = '已自动保存';
  } catch { $('save-status').textContent = '无法自动保存，请下载 .py'; }
}

let languageService;
let providers = [];
let changeTimer;
let tokenListeners = new Set();
let languageGeneration = 0;
let starting = false;
let analysisFailed = false;

function status(text, state = '') {
  $('analysis-status').textContent = text;
  $('analysis-status').className = `status ${state}`;
}

function displayDiagnostics(diagnostics) {
  const model = editor?.getModel();
  if (model) monaco.editor.setModelMarkers(model, 'basedpyright', diagnostics.map((d) => ({
    startLineNumber: d.range.start.line + 1, startColumn: d.range.start.character + 1,
    endLineNumber: d.range.end.line + 1, endColumn: d.range.end.character + 1,
    message: d.message, source: 'basedpyright',
    severity: d.severity === 1 ? monaco.MarkerSeverity.Error : d.severity === 2 ? monaco.MarkerSeverity.Warning : monaco.MarkerSeverity.Info,
    code: typeof d.code === 'string' ? d.code : undefined,
    tags: d.tags?.filter((tag) => tag === 1 || tag === 2),
  })));
  $('problem-count').textContent = diagnostics.length;
  $('problems').replaceChildren();
  if (!diagnostics.length) {
    const li = document.createElement('li'); li.className = 'empty'; li.textContent = '未发现问题。'; $('problems').append(li);
  }
  for (const diagnostic of diagnostics) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const severity = document.createElement('span');
    severity.className = diagnostic.severity === 1 ? 'severity' : 'severity warning';
    severity.textContent = diagnostic.severity === 1 ? '错误' : diagnostic.severity === 2 ? '警告' : '提示';
    const message = document.createElement('span'); message.textContent = diagnostic.message;
    const location = document.createElement('span'); location.className = 'location';
    location.textContent = `第 ${diagnostic.range.start.line + 1} 行 · 第 ${diagnostic.range.start.character + 1} 列`;
    button.append(severity, message, location);
    button.addEventListener('click', () => {
      editor?.setPosition({ lineNumber: diagnostic.range.start.line + 1, column: diagnostic.range.start.character + 1 });
      editor?.revealLineInCenter(diagnostic.range.start.line + 1); editor?.focus();
    });
    li.append(button); $('problems').append(li);
  }
}

const toPosition = (position) => ({ line: position.lineNumber - 1, character: position.column - 1 });
const toRange = (range) => ({ startLineNumber: range.start.line + 1, startColumn: range.start.character + 1, endLineNumber: range.end.line + 1, endColumn: range.end.character + 1 });
const markdown = (value) => typeof value === 'string' ? { value } : value?.language ? { value: `\`\`\`${value.language}\n${value.value}\n\`\`\`` } : { value: value?.value || '' };
const completionKinds = [null, 'Text', 'Method', 'Function', 'Constructor', 'Field', 'Variable', 'Class', 'Interface', 'Module', 'Property', 'Unit', 'Value', 'Enum', 'Keyword', 'Snippet', 'Color', 'File', 'Reference', 'Folder', 'EnumMember', 'Constant', 'Struct', 'Event', 'Operator', 'TypeParameter'];

async function startAnalysis() {
  if (!editor || starting) return;
  starting = true; analysisFailed = false;
  const generation = ++languageGeneration;
  clearTimeout(changeTimer);
  providers.forEach((provider) => provider.dispose()); providers = [];
  tokenListeners.clear(); languageService?.dispose();
  status('● 正在加载 basedpyright…', 'loading');
  const service = new PythonLanguageService(new URL(/* @vite-ignore */ '../basedpyright/pyright.worker.js', import.meta.url), {
    onDiagnostics: (diagnostics) => { if (generation === languageGeneration && !analysisFailed) displayDiagnostics(diagnostics); },
    onError: (error) => { if (generation === languageGeneration) { analysisFailed = true; status('● 分析失败 · 点击重试', 'error'); console.error(error); } },
  });
  languageService = service;
  try {
    await service.start(getCode());
    service.change(getCode());
    // Confirm the server actually returns semantic tokens before marking ready.
    const initialTokens = await service.tokens();
    if (!initialTokens || !Array.isArray(initialTokens.data)) throw new Error('Python semantic tokens are unavailable');
    if (generation !== languageGeneration) return;
    providers.push(monaco.languages.registerDocumentSemanticTokensProvider('python', {
      getLegend: () => service.legend,
      onDidChange: (listener) => { tokenListeners.add(listener); return { dispose: () => tokenListeners.delete(listener) }; },
      provideDocumentSemanticTokens: async (model, _lastResultId, token) => {
        service.change(model.getValue());
        const version = model.getVersionId();
        try {
          const result = await service.tokens();
          if (token.isCancellationRequested || version !== model.getVersionId() || !result) return null;
          return { data: new Uint32Array(result.data), resultId: result.resultId };
        } catch (error) { if (!service.disposed) console.error(error); return null; }
      },
      releaseDocumentSemanticTokens: () => {},
    }));
    providers.push(monaco.languages.registerHoverProvider('python', {
      provideHover: async (model, position, token) => {
        service.change(model.getValue());
        const version = model.getVersionId();
        try {
          const result = await service.hover(toPosition(position));
          if (!result || token.isCancellationRequested || version !== model.getVersionId()) return null;
          return { contents: (Array.isArray(result.contents) ? result.contents : [result.contents]).map(markdown), range: result.range ? toRange(result.range) : undefined };
        } catch { return null; }
      },
    }));
    providers.push(monaco.languages.registerCompletionItemProvider('python', {
      triggerCharacters: ['.'],
      provideCompletionItems: async (model, position, _context, token) => {
        service.change(model.getValue());
        const version = model.getVersionId();
        try {
          const result = await service.completions(toPosition(position));
          if (token.isCancellationRequested || version !== model.getVersionId()) return { suggestions: [] };
          const word = model.getWordUntilPosition(position);
          const defaultRange = { startLineNumber: position.lineNumber, startColumn: word.startColumn, endLineNumber: position.lineNumber, endColumn: word.endColumn };
          return { incomplete: result?.isIncomplete || false, suggestions: (Array.isArray(result) ? result : result?.items || []).map((item) => ({
            label: item.label, detail: item.detail, documentation: item.documentation ? markdown(item.documentation) : undefined,
            kind: monaco.languages.CompletionItemKind[completionKinds[item.kind]] ?? monaco.languages.CompletionItemKind.Text,
            insertText: item.textEdit?.newText || item.insertText || item.label,
            range: item.textEdit?.range ? toRange(item.textEdit.range) : item.textEdit?.replace ? { insert: toRange(item.textEdit.insert), replace: toRange(item.textEdit.replace) } : defaultRange,
            sortText: item.sortText, filterText: item.filterText,
          })) };
        } catch { return { suggestions: [] }; }
      },
    }));
    status('● basedpyright 已就绪 · 语义高亮开启');
    tokenListeners.forEach((listener) => listener());
  } catch (error) {
    if (generation === languageGeneration) {
      analysisFailed = true; status('● 分析失败 · 点击重试', 'error');
      $('problems').replaceChildren();
      const li = document.createElement('li'); li.className = 'empty';
      li.textContent = 'Python 分析器未能加载。点击底部状态重试；代码仍可编辑、下载和运行。'; $('problems').append(li);
      service.dispose(); console.error(error);
    }
  } finally { starting = false; }
}

function codeChanged() {
  persist();
  if (languageService?.legend && !languageService.disposed) {
    languageService.change(getCode());
    clearTimeout(changeTimer);
    changeTimer = setTimeout(() => tokenListeners.forEach((listener) => listener()), 180);
  }
}
editor?.onDidChangeModelContent(codeChanged);
$('fallback').addEventListener('input', codeChanged);
editor?.onDidChangeCursorPosition(({ position }) => { $('cursor').textContent = `Ln ${position.lineNumber}, Col ${position.column}`; });
editor?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
$('analysis-status').addEventListener('click', startAnalysis);
$('autocomplete').addEventListener('change', () => editor?.updateOptions({ quickSuggestions: $('autocomplete').checked, suggestOnTriggerCharacters: $('autocomplete').checked }));
$('filename').addEventListener('input', persist);
$('stdin').addEventListener('input', persist);

function selectTab(name) {
  for (const tab of ['output', 'problems']) {
    $(`${tab}-tab`).setAttribute('aria-selected', String(tab === name));
    $(`${tab}-panel`).hidden = tab !== name;
  }
}
$('output-tab').addEventListener('click', () => selectTab('output'));
$('problems-tab').addEventListener('click', () => selectTab('problems'));
$('clear').addEventListener('click', () => { $('output').textContent = ''; });
$('reset').addEventListener('click', () => { if (window.confirm('恢复示例会替换当前代码。继续？')) setCode(example); });
$('open').addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', async () => {
  const file = $('file-input').files[0]; if (!file) return;
  if (file.size > 1024 * 1024) { alert('请选择小于 1 MB 的 Python 文件。'); return; }
  $('filename').value = file.name; setCode(await file.text()); $('file-input').value = '';
});
$('save').addEventListener('click', () => {
  let filename = $('filename').value.trim() || 'main.py';
  if (!/\.pyi?$/.test(filename)) filename += '.py';
  const url = URL.createObjectURL(new Blob([getCode()], { type: 'text/x-python;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(getCode()); $('copy').textContent = '已复制';
    setTimeout(() => { $('copy').textContent = '复制'; }, 1200);
  } catch { editor?.focus(); editor?.trigger('copy', 'editor.action.selectAll'); $('copy').textContent = '请按 Ctrl / ⌘ + C'; }
});

let runner;
let running = false;
let hasOutput = false;
function appendOutput(text) {
  hasOutput = true;
  if ($('output').textContent.length > 150000) return;
  $('output').textContent += `${text}\n`;
  $('output-panel').scrollTop = $('output-panel').scrollHeight;
}
function finishRun() { running = false; $('run').disabled = false; $('stop').disabled = true; $('run').textContent = '▶ 运行'; }
function runCode() {
  if (running) return;
  persist(); selectTab('output'); running = true; hasOutput = false;
  $('output').textContent = ''; $('run').disabled = true; $('stop').disabled = false; $('run').textContent = '运行中…';
  if (!runner) {
    runner = new Worker(new URL('./runner-worker.js', import.meta.url));
    runner.addEventListener('message', ({ data }) => {
      if (data.type === 'status') $('output').textContent = `${data.text}\n`;
      if (data.type === 'started') $('output').textContent = '';
      if (data.type === 'stdout' || data.type === 'stderr') appendOutput(data.text);
      if (data.type === 'error') { appendOutput(data.text); finishRun(); }
      if (data.type === 'done') { if (!hasOutput) appendOutput('(运行完成，无输出)'); finishRun(); }
    });
    runner.addEventListener('error', (error) => { appendOutput(`Python 加载或运行失败：${error.message}`); runner?.terminate(); runner = null; finishRun(); });
  }
  runner.postMessage({ code: getCode(), stdin: $('stdin').value });
}
$('run').disabled = false;
$('run').addEventListener('click', runCode);
$('stop').addEventListener('click', () => { runner?.terminate(); runner = null; appendOutput('已停止运行。'); finishRun(); });
window.addEventListener('beforeunload', () => { persist(); languageService?.dispose(); runner?.terminate(); });
startAnalysis();
