// Run the actual browser language-server bundle through Node's worker_threads.
// This validates its worker boot protocol and LSP behavior without a browser.
import { parentPort, workerData, MessagePort, MessageChannel } from 'node:worker_threads';
import { readFile } from 'node:fs/promises';
import { runInThisContext } from 'node:vm';

globalThis.self = globalThis;
globalThis.MessagePort = MessagePort;
globalThis.MessageChannel = MessageChannel;
globalThis.location = { href: `file://${workerData.script}`, protocol: 'file:' };
let onmessage;
let onmessageWrapper;
Object.defineProperty(globalThis, 'onmessage', {
  get: () => onmessage,
  set: (listener) => {
    if (onmessageWrapper) parentPort.off('message', onmessageWrapper);
    onmessage = listener;
    onmessageWrapper = listener ? (data) => listener({ data }) : undefined;
    if (onmessageWrapper) parentPort.on('message', onmessageWrapper);
  },
});
const listeners = new Map();
globalThis.addEventListener = (type, listener) => {
  if (type !== 'message') return;
  const wrapped = (data) => listener({ data });
  listeners.set(listener, wrapped);
  parentPort.on('message', wrapped);
};
globalThis.removeEventListener = (type, listener) => {
  if (type === 'message' && listeners.has(listener)) parentPort.off('message', listeners.get(listener));
};
globalThis.postMessage = (data, transfer = []) => parentPort.postMessage(data, transfer);
globalThis.close = () => process.exit(0);
runInThisContext(await readFile(workerData.script, 'utf8'), { filename: workerData.script });
