import * as monaco from 'monaco-editor/editor/editor.api';
import { exercises, questions } from './hw-practice-data.js';
import { PlotOutput } from './plot-output.js';

const sortedIds = Object.keys(exercises).sort((a, b) => {
  const order = id => Number(id.match(/\d+/)[0]) * 100 + (id.startsWith('hw') ? 0 : 10) + Number(id.split('-')[1]);
  return order(a) - order(b);
});
const formatId = id => id.replace(/(hw|ica)(\d+)-(\d+)/, (_, kind, group, part) => kind.toUpperCase() + ' ' + group + '.' + part);
const key = 'engr103-interactive-hw-v1';
let progress = {};
try { progress = JSON.parse(localStorage.getItem(key)) || {}; } catch {}
const save = () => { try { localStorage.setItem(key, JSON.stringify(progress)); } catch {} };
function node(tag, value, css) {
  const el = document.createElement(tag);
  if (value !== undefined) el.textContent = value;
  if (css) el.className = css;
  return el;
}
function button(label, action) {
  const b = node('button', label);
  b.type = 'button';
  b.onclick = action;
  return b;
}
function shuffled(list) {
  const result = [...list];
  for (let i=result.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  if (result.length>1 && result.every((item, i)=>item===list[i])) result.push(result.shift());
  return result;
}
function colorize(pre, code) {
  pre.textContent = code;
  monaco.editor.colorize(code, 'python', { tabSize: 4 }).then(html=>{
    if (pre.isConnected) pre.innerHTML = html;
  }).catch(()=>{});
}
export function practicePanel() {
  const root = node('section', undefined, 'practice-panel');
  root.innerHTML = `<h2>HW 选择题与代码排序</h2>
<div class="modes"><button type="button" data-mode="mc">HW 选择题 · 50 道</button><button type="button" data-mode="order">Python 代码排序</button></div>
<div class="practice-tools"><label>题目 <select class="picker"></select></label><label class="filter-label">筛选 <select class="filter"><option value="all">全部</option><option value="new">未做</option><option value="wrong">错题</option></select></label><button class="shuffle-set">打乱题序</button><button class="export-wrong">导出错题</button></div>
<p class="tally"></p><div class="exercise-body"></div><div class="runtime"><div class="run-tools"></div><p class="feedback" role="status"></p><p class="run-status" role="status"></p><pre class="stdout"></pre><div class="plot-panel" hidden><div class="plots"></div></div></div>
<div class="paging"></div>`;
  const get = s => root.querySelector(s);
  const picker=get('.picker'), filter=get('.filter'), body=get('.exercise-body'), tools=get('.run-tools');
  const feedback=get('.feedback'), status=get('.run-status'), stdout=get('.stdout');
  const plot = new PlotOutput({container:get('.plots'),panel:get('.plot-panel'),consolePane:get('.runtime'),layout:root});
  let mode='mc', week, active, ids=[], customOrder, worker, busy=false, currentAnimation;
  let blockOrder=[], choice=null, runButton, stopButton, question, exercise;
  const byId=new Map(questions.map(q=>[q.id,q]));
  function stopWorker() {
    if(worker) worker.terminate();
    worker=null; busy=false;
  }
  function resetOutput() {
    if(busy) stopWorker();
    if(currentAnimation) URL.revokeObjectURL(currentAnimation);
    currentAnimation=null; plot.reset(); feedback.textContent=''; status.textContent=''; stdout.textContent='';
    if(runButton) runButton.disabled=false;
    if(stopButton) stopButton.disabled=true;
  }
  function grade(){
    if(choice===null){feedback.textContent='请先选择一段代码。';return false;}
    const correct=choice===0;
    progress[question.id]={choice,correct};
    save(); tally();
    feedback.textContent=(correct?'答对了。':'这段代码没有完成题目指定的步骤。')+question.why;
    return true;
  }
  function run() {
    if(busy || (mode==='mc' && choice===null)){if(!busy)feedback.textContent='请先选择一段代码。';return;}
    resetOutput();
    const blocks=mode==='mc'?[...exercise.blocks]:blockOrder.map(i=>exercise.blocks[i]);
    if(mode==='mc'){
      grade();
      blocks[question.block]=blocks[question.block].replace(question.options[0],()=>question.options[choice]);
    }
    const code=[exercise.preamble,...blocks].filter(Boolean).join('\n');
    busy=true;runButton.disabled=true;stopButton.disabled=false;status.textContent='正在启动 Python…';
    if(!worker) worker=new Worker(new URL('./runner-worker.js',import.meta.url));
    worker.onmessage=({data})=>{
      switch(data.type){
      case 'status': status.textContent=data.text;break;
      case 'started': status.textContent='正在执行当前代码…';break;
      case 'image': plot.add(data);break;
      case 'animation': {
        plot.reset();
        currentAnimation=URL.createObjectURL(new Blob([data.bytes],{type:'image/gif'}));
        const img=node('img');img.src=currentAnimation;img.alt='当前代码生成的 GIF 动画';
        const a=node('a','下载 GIF');a.href=currentAnimation;a.download=exercise.gif;
        get('.plots').append(img,a);get('.plot-panel').hidden=false;break;
      }
      case 'stdout': case 'stderr': stdout.textContent+=data.text+'\n';break;
      case 'error': stdout.textContent+=data.text; finish('运行出错。');break;
      case 'done': finish('运行完成。');break;
      }
    };
    worker.onerror=e=>{stopWorker();finish('Python 无法启动。'+e.message);};
    worker.postMessage({code,files:exercise.files||[],exerciseRun:true,gif:exercise.gif,excel:exercise.excel});
  }
  function finish(message){busy=false;runButton.disabled=false;stopButton.disabled=true;status.textContent=message;}
  function mcView(){
    const layout=node('div',undefined,'qa-layout'), left=node('section'),right=node('aside',undefined,'reference');
    left.append(node('p',question.id+' · '+formatId(question.hw),'eyeline'),node('h3',question.prompt));
    const optionOrder=question.layout;
    for(const [pos,index] of optionOrder.entries()){
      const label=node('label',undefined,'choice');
      const radio=node('input');radio.type='radio';radio.name='hw-answer';radio.checked=index===choice;
      radio.onchange=()=>{resetOutput();choice=index;};
      const pre=node('pre',question.options[index]);
      label.append(radio,node('strong',String.fromCharCode(65+pos)),pre);left.append(label);
    }
    const src=exercises[question.ref];
    right.append(node('h3','ICA Reference'),node('p',formatId(question.ref)+' · '+src.title),node('small','按 ICA 作业要求整理的参考片段'));
    const code=node('pre',undefined,'reference-code');
    right.append(code);colorize(code,src.blocks[question.step]);
    const a=node('a','Canvas · ICA 原题 ↗');
    a.href=question.source;a.target='_blank';a.rel='noopener';right.append(a);
    layout.append(left,right);body.append(layout);
    tools.append(button('检查答案',grade));
  }
  function orderView(){
    body.append(node('h3',formatId(active)+' · '+exercise.title),node('p','把代码块拖成执行顺序，也可用上下箭头调整。Run 会按屏幕上的顺序执行。'));
    if(exercise.preamble){
      const details=node('details');details.append(node('summary','已提供的起始代码'),node('pre',exercise.preamble));body.append(details);
    }
    const list=node('ol',undefined,'block-list');body.append(list);
    let dragged=null;
    function move(from,to){
      if(from===to||from<0||to<0||to>=blockOrder.length)return;
      resetOutput();blockOrder.splice(to,0,blockOrder.splice(from,1)[0]);drawBlocks();
      list.children[to].focus();
    }
    function drawBlocks(){
      list.replaceChildren();
      blockOrder.forEach((id,i)=>{
        const row=node('li');row.tabIndex=-1;row.draggable=true;
        row.ondragstart=e=>{dragged=i;e.dataTransfer.setData('text/plain',String(i));};
        row.ondragend=()=>{dragged=null;};
        row.ondragover=e=>{if(dragged!==null)e.preventDefault();};
        row.ondrop=e=>{e.preventDefault();if(dragged!==null)move(dragged,i);dragged=null;};
        row.append(node('pre',exercise.blocks[id]));
        for(const [delta,label] of [[-1,'↑'],[1,'↓']]){
          const b=button(label,()=>move(i,i+delta));b.disabled=i+delta<0||i+delta>=blockOrder.length;
          b.setAttribute('aria-label',(delta<0?'上移':'下移')+'第 '+(i+1)+' 块');row.append(b);
        }
        list.append(row);
      });
    }
    drawBlocks();
    tools.append(button('重新打乱代码',()=>{resetOutput();blockOrder=shuffled(blockOrder);drawBlocks();}));
  }
  function tally(){
    const scope=questions.filter(q=>week==='all'||Number(q.hw.match(/\d+/)[0])===week);
    const done=scope.filter(q=>progress[q.id]);
    get('.tally').textContent=mode==='mc'?'本组 '+scope.length+' 题 · 已做 '+done.length+' · 错题 '+done.filter(q=>!progress[q.id].correct).length:'本组 '+ids.length+' 道代码排序题';
  }
  function show(){
    resetOutput();body.replaceChildren();tools.replaceChildren();get('.paging').replaceChildren();tally();
    if(!active){body.append(node('p','当前筛选下没有题目。'));return;}
    picker.value=active;
    if(mode==='mc'){question=byId.get(active);exercise=exercises[question.hw];choice=progress[active]?.choice??null;mcView();}
    else {exercise=exercises[active];blockOrder=shuffled(exercise.blocks.map((_,i)=>i));orderView();}
    runButton=button('▶ Run · 运行代码',run);runButton.className='run';
    stopButton=button('停止',()=>{stopWorker();finish('已停止。');});stopButton.disabled=true;
    tools.append(runButton,stopButton);
    for(const [d,label] of [[-1,'上一题'],[1,'下一题']]){
      const i=ids.indexOf(active)+d; const b=button(label,()=>{active=ids[i];show();});b.disabled=i<0||i>=ids.length;get('.paging').append(b);
    }
  }
  function refresh(){
    const scope=id=>week==='all'||Number(id.match(/\d+/)[0])===week;
    ids=mode==='order'?sortedIds.filter(scope):(customOrder||questions.map(q=>q.id)).filter(id=>scope(byId.get(id).hw)&&(filter.value==='all'||(filter.value==='new'?!progress[id]:progress[id]?.correct===false)));
    picker.replaceChildren(...ids.map(id=>{const opt=node('option',mode==='mc'?id+' · '+formatId(byId.get(id).hw)+' · '+exercises[byId.get(id).hw].title:formatId(id)+' · '+exercises[id].title);opt.value=id;return opt;}));
    active=ids.includes(active)?active:ids[0];
    for(const b of root.querySelectorAll('[data-mode]'))b.setAttribute('aria-pressed',String(b.dataset.mode===mode));
    for(const s of ['.filter-label','.shuffle-set','.export-wrong'])get(s).hidden=mode==='order';
    show();
  }
  for(const b of root.querySelectorAll('[data-mode]'))b.onclick=()=>{mode=b.dataset.mode;refresh();};
  picker.onchange=()=>{active=picker.value;show();};
  filter.onchange=refresh;
  get('.shuffle-set').onclick=()=>{customOrder=shuffled(questions.map(q=>q.id));active=null;refresh();};
  get('.export-wrong').onclick=()=>{
    const records=questions.filter(q=>progress[q.id]?.correct===false);
    if(!records.length){feedback.textContent='当前没有错题。';return;}
    const text=records.map(q=>[q.id+' · '+formatId(q.hw),q.prompt,'你的选择 '+q.options[progress[q.id].choice],'参考答案 '+q.options[0],q.why].join('\n')).join('\n\n');
    const a=node('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download='ENGR103-HW5-9-review.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  };
  return {root,setWeek(value){week=value;refresh();}};
}
