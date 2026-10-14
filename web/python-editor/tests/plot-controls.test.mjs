import test from 'node:test';
import assert from 'node:assert/strict';
import { findPlotCalls, readPlotArgument, changePlotArgument, renderPlotControls } from '../plot-controls.js';
const code = `# plt.title("fake")\nprint("plt.xlabel('fake')")\nplt.title("Threshold voltage (VT) Testing",\n          fontsize=20, fontweight="bold", pad=10, color="blue")\nplt.xlabel("Time (t) [sec]", labelpad=4, loc="center",\n           fontsize=15, fontweight="semibold", color="blue")\nplt.ylabel("Threshold voltage (VT) [Volts]", labelpad=4, loc="center",\n           fontsize=15, fontweight="semibold", color="blue")\nplt.legend()\nplt.grid(color="blue")\nplt.tight_layout()\nplt.savefig("threshold-voltage-fit.png", dpi=300)\nplt.show()`;
test('plot settings detect real calls, preserve unrelated code, and update the selected argument', () => {
  const calls = findPlotCalls(code);
  assert.deepEqual(calls.map((c) => c.name), ['title','xlabel','ylabel','legend','grid']);
  assert.equal(readPlotArgument(calls[0], 'fontsize', 12), 20);
  assert.equal(readPlotArgument(calls[0], '$text', ''), 'Threshold voltage (VT) Testing');
  const updated = changePlotArgument(code, 0, 'fontsize', 21);
  assert.equal(readPlotArgument(findPlotCalls(updated)[0], 'fontsize', 12), 21);
  assert.ok(updated.includes('plt.savefig("threshold-voltage-fit.png", dpi=300)'));
  assert.ok(updated.endsWith('plt.show()'));
  const green = changePlotArgument(updated, 4, 'color', 'green');
  assert.ok(green.includes('plt.grid(color="green")'));
  assert.equal(readPlotArgument(findPlotCalls(green)[1], 'color', ''), 'blue');
  const label = changePlotArgument('plt.title(label="Old", fontsize=20)', 0, '$text', 'New');
  assert.equal(label, 'plt.title(label="New", fontsize=20)');
  assert.equal(readPlotArgument(findPlotCalls('plt.title(name, fontsize=size)')[0], 'fontsize', 12), null);
  assert.equal(changePlotArgument('plt.xlabel("t")', 0, 'fontsize', 18), 'plt.xlabel("t", fontsize=18)');
});
class Element {
  constructor() { this.children=[]; this.events={}; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children=nodes; }
  setAttribute() {}
  addEventListener(event, fn) { this.events[event]=fn; }
  checkValidity() { return true; }
}
test('font-size +/- and color dropdown edit Python directly', () => {
  const container = new Element(), changes=[];
  renderPlotControls({container,code,onChange:(...args)=>changes.push(args),document:{createElement:()=>new Element()}});
  const title = container.children[0];
  const sizeRow = title.children.find((row)=>row.children[0]?.textContent==='字号');
  const plus = sizeRow.children[1].children[2]; plus.events.click();
  assert.deepEqual(changes.pop(),[0,'fontsize',21]);
  const colorRow=title.children.find((row)=>row.children[0]?.textContent==='颜色');
  const select=colorRow.children[1].children[0];select.value='yellow';select.events.change();
  assert.deepEqual(changes.pop(),[0,'color','yellow']);
});
