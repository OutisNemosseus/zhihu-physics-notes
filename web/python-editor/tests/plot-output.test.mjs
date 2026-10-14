import test from 'node:test';
import assert from 'node:assert/strict';
import { PlotOutput } from '../plot-output.js';

class Element {
  constructor() { this.children = []; this.attributes = {}; this.classes = new Set(); this.classList = { toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) }; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
}
test('image preview and named download share bytes; switching tabs and clear release URLs', async () => {
  const created = [], revoked = [];
  const container = new Element(), panel = new Element(), consolePane = new Element(), layout = new Element();
  const output = new PlotOutput({ container, panel, consolePane, layout, document: { createElement: () => new Element() }, urls: { createObjectURL: (blob) => { created.push(blob); return `blob:${created.length}`; }, revokeObjectURL: (url) => revoked.push(url) } });
  const data = Buffer.from('actual image data').toString('base64');
  output.add({ filename: 'q04.png', mime: 'image/png', data, preview: data });
  assert.equal(created.length, 1);
  assert.equal(await created[0].text(), 'actual image data');
  assert.equal(panel.hidden, false);
  assert.ok(layout.classes.has('showing-plots'));
  const [image, caption] = container.children[0].children;
  assert.equal(image.src, 'blob:1');
  assert.equal(caption.children[1].download, 'q04.png');
  assert.equal(caption.children[1].href, image.src);
  output.updateVisibility('problems'); assert.equal(panel.hidden, true);
  output.updateVisibility('output'); assert.equal(panel.hidden, false);
  output.reset(); assert.deepEqual(revoked, ['blob:1']); assert.equal(container.children.length, 0); assert.equal(panel.hidden, true);
});
