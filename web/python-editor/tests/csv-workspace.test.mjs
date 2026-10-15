import test from 'node:test';
import assert from 'node:assert/strict';
import { CsvWorkspace } from '../csv-workspace.js';
test('dataset tabs retain separate code and make preset and uploaded filenames available', () => {
  const workspace = new CsvWorkspace({ q01:'x,y\n1,2',q07:'count,year\n10,2000',initialCode:'print("scratch")' });
  assert.equal(workspace.activeId,'scratch');
  workspace.select('q01');workspace.saveCode('print("edited Q01")');
  workspace.select('q07');assert(workspace.active.code.includes('batch19-engr103-q07-transistors.csv'));assert(!workspace.active.code.includes('plt.plot'));
  workspace.select('q01');assert.equal(workspace.active.code,'print("edited Q01")');
  const id=workspace.addFile('my measurements (1).csv','time,V\n1,2\n2,3');workspace.select(id);
  assert(workspace.active.code.includes('"my measurements (1).csv"'));
  assert.equal(workspace.files().length,3);
  assert.throws(()=>workspace.addFile('../bad.csv','a,b'));
  const saved=workspace.snapshot();const restored=new CsvWorkspace({q01:'x,y',q07:'count,year',saved,initialCode:'scratch'});
  restored.select('q01');assert.equal(restored.active.code,'print("edited Q01")');
});
