import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { loadPyodide } from 'pyodide';

test('real Python runtime handles stdin, output, errors and fresh globals', { timeout: 60000 }, async () => {
  const messages = [];
  const scope = {
    self: { postMessage: (data) => messages.push(data) },
    importScripts: () => {},
    // Use the exact deployed runtime version from npm, avoiding CDN in CI.
    loadPyodide: (options) => loadPyodide({ ...options, indexURL: fileURLToPath(new URL('../node_modules/pyodide/', import.meta.url)) }),
  };
  runInNewContext(await readFile(new URL('../runner-worker.js', import.meta.url), 'utf8'), scope);
  await scope.self.onmessage({ data: { code: 'name = input()\nprint("Hello " + name)\n', stdin: 'Tong' } });
  assert.ok(messages.some((message) => message.type === 'stdout' && message.text === 'Hello Tong'));
  assert.equal(messages.at(-1).type, 'done');
  messages.length = 0;
  await scope.self.onmessage({ data: { code: 'print(name)', stdin: '' } });
  assert.equal(messages.at(-1).type, 'error');
  assert.ok(messages.at(-1).text.includes('NameError'), 'each run must use a fresh namespace');
  messages.length = 0;
  await scope.self.onmessage({ data: { code: 'import heapq\nheap = [3, 1, 2]\nheapq.heapify(heap)\nprint(heapq.heappop(heap))', stdin: '' } });
  assert.ok(messages.some((message) => message.type === 'stdout' && message.text === '1'));
  assert.equal(messages.at(-1).type, 'done');
});
