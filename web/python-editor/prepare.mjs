import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('node_modules/browser-basedpyright');
const target = resolve('public/basedpyright');
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(`${source}/dist`, target, { recursive: true });
for (const name of await readdir(target)) {
  if (name.endsWith('.map')) await rm(`${target}/${name}`);
}
// Preserve the upstream license with the deployed browser bundle.
for (const name of await readdir(source)) {
  if (/^licen[cs]e/i.test(name)) await cp(`${source}/${name}`, `${target}/${name}`);
}
await writeFile('public/version.json', JSON.stringify({ monaco: '0.57.0', basedpyright: '1.40.2' }));
await mkdir('public/licenses', { recursive: true });
for (const name of ['LICENSE', 'ThirdPartyNotices.txt']) {
  await cp(`node_modules/monaco-editor/${name}`, `public/licenses/monaco-${name}`);
}
