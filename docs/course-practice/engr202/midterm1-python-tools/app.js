import {tools,presets,matrixDefaults,questionNotes} from './programs.js';
const $=id=>document.getElementById(id);
let current=tools[0], currentQ=null, values={}, worker=null, ready=false, busy=false, timer=null, generation=0, queued=null;
const labels={wave:'频率／周期',phasor:'相量转换',complex:'复数运算',rlc:'RLC 阻抗',load:'阻抗与功率',divider:'分压',node:'节点 KCL',matrix2:'2×2 矩阵',matrix3:'3×3 矩阵',thevenin:'戴维南',power:'瞬时／平均功率',rms:'RMS',scope:'延时与相位'};
for(const t of tools){const b=document.createElement('button');b.type='button';b.dataset.tool=t.id;b.append(document.createTextNode(t.title));const sub=document.createElement('span');sub.textContent=t.qs;b.append(sub);b.onclick=()=>select(t.id);$('tool-nav').append(b);}
for(let n=1;n<=35;n++){const option=document.createElement('option');option.value=n;option.textContent=`Q${n} · ${labels[presets[n].id]}`;$('question').append(option);}
function status(text,error=false){$('status').textContent=text;$('status').className=error?'error':'';}
function dirty(){if(!busy){$('output').textContent='参数或代码已修改；点击“计算”更新结果。';status('等待重新计算。');}}
function input(key,label,value){const el=document.createElement('input');el.type='text';el.value=value;el.dataset.key=key;el.id='in-'+key;el.setAttribute('aria-label',label);el.autocomplete='off';el.addEventListener('input',dirty);return el;}
function select(id,q=null){
 if(busy) stop('已切换工具，停止上一次运算。');
 current=tools.find(t=>t.id===id);currentQ=q;values=Object.fromEntries(current.fields.map(([k,l,v])=>[k,v]));
 Object.assign(values,matrixDefaults[id]||{},q?presets[q].values:{});
 $('fields').replaceChildren();$('matrix').replaceChildren();
 for(const [key,label] of current.fields){const l=document.createElement('label');l.htmlFor='in-'+key;l.textContent=label;l.append(input(key,label,values[key]));$('fields').append(l);}
 if(current.matrix){
  const n=current.matrix,table=document.createElement('table'),caption=table.createCaption();caption.textContent='A · x = b：每行对应一个方程';
  const h=table.createTHead().insertRow();
  for(let c=1;c<=n+1;c++){const th=document.createElement('th');th.textContent=c<=n?'x'+c+' 系数':'右端 b';h.append(th);}
  const body=table.createTBody();for(let r=1;r<=n;r++){const row=body.insertRow();for(let c=1;c<=n+1;c++){const key=c<=n?'a'+r+c:'b'+r;row.insertCell().append(input(key,`第 ${r} 行 ${c<=n?'x'+c+' 系数':'右端'}`,values[key]));}}$('matrix').append(table);
 }
 $('title').textContent=current.title;$('topic').textContent=current.qs;$('note').textContent=current.note;
 $('q-note').hidden=!(q&&questionNotes[q]);$('q-note').textContent=q?questionNotes[q]||'':'';
 $('code').value=current.code;$('output').textContent='等待计算。修改输入后，点击“计算”。';
 $('question').value=q||'';$('question-link').href='../midterm1-study-guide-35/'+(q?'#q'+String(q).padStart(2,'0'):'');
 for(const b of $('tool-nav').children){const active=b.dataset.tool===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
 status(ready?'Python 已就绪，点击“计算”。':'首次计算会加载 Python 环境，需要联网；之后复用同一个环境。');
 history.replaceState(null,'',q?'#q'+q:'#'+id);
}
function setBusy(b){busy=b;$('run').disabled=b;$('stop').disabled=!b;for(const el of document.querySelectorAll('#form input,#code'))el.disabled=b;}
function release(){clearTimeout(timer);generation++;worker?.terminate();worker=null;ready=false;queued=null;setBusy(false);}
function stop(text='已停止，可重新计算。'){release();$('output').textContent=text;status(text);}
function fail(text){release();$('output').textContent=text;status('本次计算未完成。修改输入或检查网络后重试。',true);}
function execute(){clearTimeout(timer);status('Python 正在计算…');timer=setTimeout(()=>fail('计算超过 15 秒，已停止。'),15000);worker.postMessage({type:'run',...queued});}
function run(){
 if(busy)return;
 const inputs=Object.fromEntries([...document.querySelectorAll('#form input')].map(el=>[el.dataset.key,el.value]));
 if(Object.values(inputs).some(v=>!v.trim())){fail('请填写所有输入框。');return;}
 queued={inputs,code:$('code').value};$('output').textContent='正在计算，等待本次结果…';setBusy(true);
 if(ready){execute();return;}
 const g=++generation;status('正在加载 Python / WebAssembly，首次可能需要几十秒…');timer=setTimeout(()=>fail('加载超过 120 秒。请检查网络后重试。'),120000);
 try{worker=new Worker(new URL('./worker.js',import.meta.url));worker.onmessage=({data})=>{
  if(g!==generation)return;
  if(data.type==='ready'){ready=true;execute();}
  else if(data.type==='done'){clearTimeout(timer);$('output').textContent=data.output;setBusy(false);status('计算完成 · Python WebAssembly');}
  else if(data.type==='error'){const loaded=ready;clearTimeout(timer);if(!loaded)release();else setBusy(false);$('output').textContent=data.message;status(loaded?'输入或代码有误，请修改后重试。':'Python 加载失败，请检查网络后重试。',true);}
 };worker.onerror=e=>fail(e.message||'运行环境启动失败。');worker.postMessage({type:'init'});}catch(e){fail(String(e));}
}
$('load-question').onclick=()=>{const n=Number($('question').value);if(n)select(presets[n].id,n);};
$('question').onchange=()=>{const n=Number($('question').value);if(n)select(presets[n].id,n);};
$('run').onclick=run;$('form').onsubmit=e=>{e.preventDefault();run();};$('stop').onclick=()=>stop();$('reset').onclick=()=>select(current.id,currentQ);
$('code').oninput=dirty;$('code').onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();run();}};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('output').textContent);status('已复制结果。');}catch{status('复制失败，请选中结果手动复制。',true);}};
$('download').onclick=async()=>{try{const res=await fetch('engine.py');if(!res.ok)throw Error('辅助函数读取失败');const helpers=await res.text();const fields=Object.fromEntries([...document.querySelectorAll('#form input')].map(el=>[el.dataset.key,el.value]));const code=helpers+'\n\n# Input values\nimport json\nd = {k: num(v) for k, v in json.loads('+JSON.stringify(JSON.stringify(fields))+').items()}\n\n'+$('code').value+'\n';const url=URL.createObjectURL(new Blob([code],{type:'text/x-python'}));const a=document.createElement('a');a.href=url;a.download='engr202-'+current.id+'.py';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){status(String(e),true);}};
window.addEventListener('pagehide',release);
const hash=location.hash.slice(1),n=/^q\d+$/.test(hash)?Number(hash.slice(1)):0;
if(n>=1&&n<=35)select(presets[n].id,n);else select(tools.some(t=>t.id===hash)?hash:'rlc');
