import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {grade,shuffled,validOrder,move} from '../docs/course-practice/engr103/hw-ica-134-practice/order-core.js';
const bank=JSON.parse(await readFile(new URL('../docs/course-practice/engr103/hw-ica-134-practice/questions.json',import.meta.url),'utf8'));
assert.equal(bank.programs.length,21);
for(const p of bank.programs){assert.equal(p.mcq.length,5);assert.equal(p.tasks.length,3);for(const q of p.mcq){assert.equal(new Set(q.choices).size,4);assert(q.answer>=0&&q.answer<4);assert(q.explanation);}for(const q of p.tasks){const ids=q.blocks.map(b=>b.id);assert.equal(new Set(ids).size,ids.length);for(const b of q.blocks)for(const need of b.needs)assert(ids.includes(need));assert(grade(q,ids).ok,q.id);assert(!grade(q,shuffled(q)).ok,q.id);assert(!validOrder(q,ids.slice(1)));const remaining=[...q.blocks],alt=[];while(remaining.length){const next=remaining.filter(b=>b.needs.every(n=>alt.includes(n))).at(-1);assert(next,'Dependency cycle');alt.push(next.id);remaining.splice(remaining.indexOf(next),1);}assert(grade(q,alt).ok);assert.deepEqual(move(ids,ids[0],ids.length-1),ids.slice(1).concat(ids[0]));}}
console.log('21 programs, 105 MCQs, 63 ordering tasks: dependency and grading checks passed.');
