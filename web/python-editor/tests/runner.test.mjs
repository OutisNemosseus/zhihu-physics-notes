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

test('preloaded Q01/Q07 and uploaded CSVs are readable and generate downloadable plots', { timeout: 120000 }, async () => {
  const {q01Code,q07Code}=await import('../csv-workspace.js');
  const messages=[];
  const scope={self:{postMessage:(message)=>messages.push(message)},importScripts:()=>{},loadPyodide:(options)=>loadPyodide({...options,indexURL:fileURLToPath(new URL('../node_modules/pyodide/',import.meta.url))})};
  runInNewContext(await readFile(new URL('../runner-worker.js',import.meta.url),'utf8'),scope);
  const files=await Promise.all(['batch19-engr103-q01-threshold.csv','batch19-engr103-q07-transistors.csv'].map(async name=>({name,content:await readFile(new URL('../data/'+name,import.meta.url),'utf8')})));
  async function run(code,extra=[]){messages.length=0;await scope.self.onmessage({data:{code,stdin:'',files:[...files,...extra]}});assert.equal(messages.at(-1).type,'done',messages.at(-1).text);assert(!messages.some(m=>m.type==='stderr'&&m.text.includes('图像导出失败')));return messages.filter(m=>m.type==='image');}
  const q01=await run(q01Code + '\nplt.plot(data[:, 0], data[:, 1])\nplt.savefig("threshold-voltage-fit.png", dpi=300)\nplt.show()\n');assert.equal(q01.length,1);assert.equal(q01[0].filename,'threshold-voltage-fit.png');
  assert.equal(Buffer.from(q01[0].data,'base64').readUInt32BE(16),1920);
  const q07=await run(q07Code + '\ncount, year = data[:, 0], data[:, 1]\nb, a = np.polyfit(year - 1983, np.log(count), 1)\nplt.plot(year, np.exp(a + b * (year - 1983)))\nplt.yscale("log")\nplt.savefig("transistor-count-fit.png", dpi=200)\nplt.show()\nprint("ln(count)", a, b)\n');assert.equal(q07.length,1);assert.equal(q07[0].filename,'transistor-count-fit.png');
  assert(messages.some(m=>m.type==='stdout'&&m.text.includes('ln(count)')));
  await run('import numpy as np\na=np.loadtxt("my data.csv",delimiter=",",skiprows=1)\nprint(a.shape)\nprint(a[:, 1].sum())',[{name:'my data.csv',content:'x,y\n1,2\n3,4\n'}]);
  assert(messages.some(m=>m.type==='stdout'&&m.text==='(2, 2)'));assert(messages.some(m=>m.type==='stdout'&&m.text==='6.0'));
});
