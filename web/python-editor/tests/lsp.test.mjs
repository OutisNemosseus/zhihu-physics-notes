import test from 'node:test';
import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import { PythonLanguageService } from '../lsp.js';

function createWorker(script, options) {
  const worker = new Worker(new URL('./browser-worker.mjs', import.meta.url), { ...options, workerData: { script } });
  return {
    addEventListener: (type, listener) => worker.on(type, (data) => listener(type === 'message' ? { data } : { message: data.message })),
    postMessage: (data, transfer = []) => worker.postMessage(data, transfer),
    terminate: () => worker.terminate(),
  };
}

function decodeTokens(result, legend, source) {
  const lines = source.split('\n');
  let line = 0; let character = 0;
  const tokens = [];
  for (let i = 0; i < result.data.length; i += 5) {
    const [deltaLine, deltaStart, length, type] = result.data.slice(i, i + 4);
    line += deltaLine;
    character = deltaLine ? deltaStart : character + deltaStart;
    tokens.push({ name: lines[line].slice(character, character + length), type: legend.tokenTypes[type] });
  }
  return tokens;
}

test('real browser basedpyright provides semantic types, hover and updated diagnostics', { timeout: 90000 }, async (t) => {
  let diagnostics = [];
  let diagnosticResolve;
  const diagnosticsReady = new Promise((resolve) => { diagnosticResolve = resolve; });
  const service = new PythonLanguageService(fileURLToPath(new URL('../node_modules/browser-basedpyright/dist/pyright.worker.js', import.meta.url)), {
    createWorker,
    onDiagnostics: (value, version) => { diagnostics = value; if (version === 2 && value.length) diagnosticResolve(value); },
    onError: (error) => console.error('WORKER ERROR', error),
  });
  t.after(() => service.dispose());
  const code = 'class Counter:\n    def increment(self, amount: int) -> int:\n        return amount + 1\n\ncounter = Counter()\nresult = counter.increment(3)\nprint(result)\n';
  await service.start(code);
  const result = await service.tokens();
  assert.ok(result.data.length > 0, 'real semantic tokens must be returned');
  const tokens = decodeTokens(result, service.legend, code);
  for (const [name, type] of [['Counter', 'class'], ['increment', 'method'], ['amount', 'parameter'], ['counter', 'variable'], ['print', 'function']]) {
    assert.ok(tokens.some((token) => token.name === name && token.type === type), `${name} must be classified as ${type}`);
  }
  const hover = await service.hover({ line: 5, character: 20 });
  assert.ok(JSON.stringify(hover).includes('increment'), 'function hover must describe its signature');
  service.change('def answer() -> int:\n    return "wrong type"\n\nresult = answer()\n');
  const changedTokens = await service.tokens();
  assert.ok(decodeTokens(changedTokens, service.legend, service.text).some((token) => token.name === 'answer' && token.type === 'function'));
  const timeout = setTimeout(() => diagnosticResolve(diagnostics), 12000);
  const changedDiagnostics = await diagnosticsReady;
  clearTimeout(timeout);
  assert.ok(changedDiagnostics.some((diagnostic) => diagnostic.severity === 1 && diagnostic.message.includes('int')), 'type error must produce a diagnostic after editing');
  assert.ok(service.workers.length >= 2, 'background analysis must use the worker boot protocol');
  assert.equal(service.pending.size, 0);
});
