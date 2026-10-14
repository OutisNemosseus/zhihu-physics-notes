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

test('real Pyodide displays saved, shown and implicit figures and clears old plots', { timeout: 120000 }, async () => {
  const messages = [];
  const scope = {
    self: { postMessage: (data) => messages.push(data) },
    importScripts: () => {},
    loadPyodide: (options) => loadPyodide({ ...options, indexURL: fileURLToPath(new URL('../node_modules/pyodide/', import.meta.url)) }),
  };
  runInNewContext(await readFile(new URL('../runner-worker.js', import.meta.url), 'utf8'), scope);
  async function run(code) {
    messages.length = 0;
    await scope.self.onmessage({ data: { code, stdin: '' } });
    assert.equal(messages.at(-1).type, 'done', messages.at(-1).text);
    assert.ok(!messages.some((m) => m.type === 'stderr' && m.text.includes('图像导出失败')));
    return messages.filter((m) => m.type === 'image');
  }
  const images = await run(await readFile(new URL('./fixtures/q04.py', import.meta.url), 'utf8'));
  assert.equal(images.length, 1, 'savefig and end-of-run must not duplicate the same figure');
  assert.equal(images[0].filename, 'q04.png');
  assert.equal(images[0].mime, 'image/png');
  const png = Buffer.from(images[0].data, 'base64');
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 768);
  assert.equal(png.readUInt32BE(20), 576);
  assert.ok(messages.some((m) => m.type === 'stdout' && m.text.includes('5.0 10.0 20.0 0.5 0.25 0.5 1.0')));
  assert.equal((await run('import matplotlib.pyplot as plt\nplt.plot([1, 2], [3, 4])\nplt.show()\nplt.close("all")')).length, 1, 'show must preserve a figure before close');
  assert.equal((await run('import matplotlib.pyplot as plt\nplt.figure()\nplt.plot([1, 2])\nplt.figure()\nplt.plot([3, 4])')).length, 2);
  assert.equal((await run('print("no plots")')).length, 0, 'previous figures must not leak into a new run');
  const svg = await run('import matplotlib.pyplot as plt\nplt.plot([1, 2])\nplt.savefig("vector.svg")\nplt.close("all")');
  assert.equal(svg.length, 1);
  assert.equal(svg[0].filename, 'vector.svg');
  assert.equal(svg[0].mime, 'image/svg+xml');
  assert.ok(Buffer.from(svg[0].data, 'base64').toString().includes('<svg'));
  assert.equal(Buffer.from(svg[0].preview, 'base64').subarray(1, 4).toString(), 'PNG');
});
