'use strict';
const $ = id => document.getElementById(id);
const MODE=document.body.dataset.mode;
const KEY='engr103-'+MODE+'-v1';

let questions=[], current=1, drafts={}, worker=null, busy=false;
try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); if(saved&&typeof saved==='object'&&!Array.isArray(saved)) drafts=saved; } catch {}
function qNow(){return questions.find(q=>q.id===current);}
function draft(q){return drafts[q.id]||{code:q.starter,stdin:q.input,done:false,files:{}};}
function save(){const q=qNow();if(!q)return;drafts[q.id]={...draft(q),code:$('code').value,stdin:$('stdin').value,done:$('done').checked};try{localStorage.setItem(KEY,JSON.stringify(drafts));$('save-status').textContent='Saved on this browser';}catch{$('save-status').textContent='Storage full/unavailable — export drafts';}updateNav();}
function visible(){return questions.filter(q=>$('filter').value==='all'||q.group===$('filter').value);}
function updateNav(){const nav=$('numbers');nav.replaceChildren();for(const q of visible()){const b=document.createElement('button');b.textContent=String(q.id).padStart(2,'0');b.title=q.group+' · '+q.title;b.setAttribute('aria-label','Question '+q.id+': '+q.title);b.setAttribute('aria-current',String(q.id===current));b.classList.toggle('complete',!!draft(q).done);b.onclick=()=>go(q.id);nav.append(b);}const n=questions.filter(q=>draft(q).done).length;$('completed').textContent=n;$('progress').value=n;}
function download(name,body,type='text/plain'){const u=URL.createObjectURL(new Blob([body],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
function go(id){save();stop(false);current=id;$('filter').value=qNow().group;history.replaceState(null,'','#'+(qNow().key||'q'+id));render();}
function render(){const q=qNow(),d=draft(q);$('meta').textContent=`Question ${String(q.id).padStart(2,'0')} / ${questions.length} · ${q.group} · ${q.source}`;$('title').textContent=q.title;$('prompt').textContent=q.prompt;$('given').textContent=q.given;$('hint').textContent=q.hint;$('check').textContent=q.check;$('code').value=d.code;$('stdin').value=d.stdin;$('done').checked=!!d.done;$('source').replaceChildren();const a=document.createElement('a');a.href=q.reference||'https://drive.google.com/file/d/1JmssP5f-iI7XS3zTsd9fR7c8vVa-BXQ9/view';a.target='_blank';a.rel='noopener';a.textContent=q.blank?'查看原排序题与完整需求':'老师 HW4 原题';$('source').append(a);
$('notes').textContent=q.notes||'';$('before').textContent=q.before||'';$('after').textContent=q.after||'';$('snippet').hidden=!q.blank;$('before').hidden=!q.blank;$('after').hidden=!q.blank;
$('answer').textContent=q.blank?q.answer:q.solution;$('reference-code').textContent=q.ica?ICA_REFS[q.ica]:q.solution;
$('reference-title').textContent=q.ica?'ICA4_'+q.ica+' · 根据课堂题目编写的参考示例（非教师发布代码）':'原完整程序参考';
$('expected-wrap').hidden=!q.preview;if(q.preview){$('expected').src=q.preview;$('expected-link').href=q.preview;}
$('run').textContent=q.blank?'▶ 检查填空并运行完整程序':'▶ Run Python';
$('datasets').replaceChildren();for(const [name,body] of Object.entries(q.csv||{})){const b=document.createElement('button');b.className='dataset';b.textContent='↓ '+name;b.onclick=()=>download(name,body,'text/csv');$('datasets').append(b);const p=document.createElement('pre');p.className='csvpreview';p.textContent=body;$('datasets').append(p);}$('uploaded').textContent=Object.keys(d.files||{}).length?'Uploaded CSVs: '+Object.keys(d.files).join(', '):'';$('output').textContent='Output will appear here.';$('plots').replaceChildren();$('runtime-status').textContent='Run your code to see output and figures. Self-checks are available on the left.';const list=visible(),i=list.findIndex(x=>x.id===q.id);$('prev').disabled=i<=0;$('next').disabled=i===list.length-1;$('position').textContent=(i+1)+' / '+list.length;for(const detail of $('question').querySelectorAll('details'))detail.open=false;updateNav();}
function running(value){busy=value;$('run').disabled=value;$('stop').disabled=!value;}
function stop(announce=true){if(worker){worker.terminate();worker=null;}running(false);if(announce)$('runtime-status').textContent='Stopped. Your code is saved; next run reloads Python.';}
function appendOutput(text){const out=$('output');out.textContent+=(out.textContent.length>120000?'':text+'\n');out.scrollTop=out.scrollHeight;}
function run(){if(busy)return;if(qNow().blank&&!$('code').value.trim()){alert('先在填空区域填写代码。');return;}save();$('output').textContent='';$('plots').replaceChildren();running(true);$('runtime-status').textContent='Starting Python…';if(!worker){worker=new Worker('runner-worker.js');worker.onmessage=({data:m})=>{if(m.type==='status')$('runtime-status').textContent=m.text;if(m.type==='started')$('runtime-status').textContent='Running / loading required packages…';if(['stdout','stderr','error'].includes(m.type))appendOutput(m.text);if(m.type==='image'){const img=document.createElement('img');img.src='data:image/png;base64,'+m.preview;img.alt='Figure from your code for question '+current;const a=document.createElement('a');a.href='data:'+m.mime+';base64,'+m.data;a.download=m.filename;a.textContent='↓ Download '+m.filename;$('plots').append(img,a);}if(m.type==='done'||m.type==='error'){running(false);$('runtime-status').textContent=m.type==='done'?'Finished. Compare output and plots with the requirements.':'Run failed. Read the error above; if Python failed to load, check your internet connection and retry.';}};worker.onerror=e=>{appendOutput(e.message||'Python worker could not load.');stop(false);$('runtime-status').textContent='Python could not load. Check your internet connection and retry.';};}const q=qNow(),d=draft(q);const files=Object.entries({...q.csv,...d.files}).map(([name,content])=>({name,content}));worker.postMessage({code:assembledCode(),stdin:$('stdin').value,files});}
$('code').addEventListener('input',save);$('stdin').addEventListener('input',save);$('done').addEventListener('change',save);
$('code').addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const t=e.target,a=t.selectionStart,b=t.selectionEnd;t.setRangeText('    ',a,b,'end');save();}if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();run();}});
$('run').onclick=run;$('stop').onclick=()=>stop();
$('prev').onclick=()=>{const v=visible(),i=v.findIndex(q=>q.id===current);if(i>0)go(v[i-1].id);};$('next').onclick=()=>{const v=visible(),i=v.findIndex(q=>q.id===current);if(i<v.length-1)go(v[i+1].id);};
$('filter').onchange=()=>{const v=visible();if(!v.some(q=>q.id===current))go(v[0].id);else render();};
$('download').onclick=()=>{save();download('ENGR103_practice_Q'+String(current).padStart(2,'0')+'.py',assembledCode(false));};
$('reset').onclick=()=>{if(confirm('Replace this question’s code and input with the starter? Export first if you want a backup.')){$('code').value=qNow().starter;$('stdin').value=qNow().input;save();}};
$('export').onclick=()=>{save();download('ENGR103_'+MODE+'_drafts.json',JSON.stringify({version:1,drafts},null,2),'application/json');};
$('import').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;const data=JSON.parse(await f.text());if(data.version!==1||!data.drafts||typeof data.drafts!=='object')throw Error('Unrecognized draft file');const imported={};for(const q of questions){const d=data.drafts[q.id];if(!d)continue;if(typeof d.code!=='string'||typeof d.stdin!=='string')throw Error('Invalid question draft');const files={};for(const [n,c] of Object.entries(d.files||{})){if(!/^[^/\\\0]+\.csv$/i.test(n)||typeof c!=='string')throw Error('Invalid CSV entry');files[n]=c;}imported[q.id]={code:d.code,stdin:d.stdin,done:!!d.done,files};}if(confirm('Import these drafts? Matching questions will replace their current drafts.')){drafts={...drafts,...imported};localStorage.setItem(KEY,JSON.stringify(drafts));stop(false);render();}}catch(err){alert('Import failed: '+err.message);}finally{e.target.value='';}};
$('upload').onchange=async e=>{const q=qNow(),d=draft(q);try{for(const f of e.target.files){if(!f.name.toLowerCase().endsWith('.csv')||f.size>2*1024*1024)throw Error('Choose CSV files under 2 MB each.');d.files={...d.files,[f.name]:await f.text()};}drafts[q.id]=d;save();$('uploaded').textContent='Uploaded CSVs: '+Object.keys(d.files||{}).join(', ');}catch(err){alert(err.message);}finally{e.target.value='';}};
$('print').onclick=()=>{save();const w=window.open('','_blank');if(!w){alert('Allow a popup to print the questions.');return;}w.document.write('<!doctype html><html><head><title>ENGR103 coding practice</title><style>body{font:14px/1.6 sans-serif;max-width:850px;margin:30px auto}article{break-inside:avoid;border-bottom:1px solid #ccc;padding:16px 0}pre{white-space:pre-wrap}</style></head><body><h1>ENGR 103 · 编程与填空</h1><p>Original coding practice questions</p></body></html>');w.document.close();for(const q of questions){const a=w.document.createElement('article');for(const [tag,text] of [['h2',`Q${q.id}. ${q.title}`],['p',q.group+' · '+q.source],['p',q.prompt],['p',q.given],...Object.entries(q.csv||{}).map(([n,c])=>['pre',n+'\n'+c])]){const el=w.document.createElement(tag);el.textContent=text;a.append(el);}w.document.body.append(a);}w.focus();w.print();};
window.addEventListener('beforeunload',save);
window.addEventListener('hashchange',()=>{const found=questions.find(q=>(q.key||'q'+q.id)===location.hash.slice(1));if(found&&found.id!==current)go(found.id);});
fetch('questions.json?v=20261023-1').then(r=>{if(!r.ok)throw Error('Question data unavailable');return r.json();}).then(data=>{questions=data;const id=Number(location.hash.replace('#q',''));const keyed=questions.find(q=>q.key===location.hash.slice(1));current=keyed?keyed.id:questions.some(q=>q.id===id)?id:1;const groups=[...new Set(questions.map(q=>q.group))];$('filter').replaceChildren();for(const name of groups){const o=document.createElement('option');o.value=name;o.textContent=name;$('filter').append(o);}$('filter').value=qNow().group;render();}).catch(e=>{$('load-error').textContent='Could not load questions. Please reload. '+e.message;$('run').disabled=true;});

function assembledCode(check=true){
 const q=qNow(),code=$('code').value;
 if(!q.blank)return code;
 let full=(q.prefix?q.prefix+'\n\n':'')+code+(q.suffix?'\n\n'+q.suffix:'')+'\n';
 if(check)full+='\nimport ast as _blank_ast\n'+
  'assert ('+q.check+'), "样例计算检查未通过，请检查填空与输入。"\n'+
  '_same = _blank_ast.dump(_blank_ast.parse('+JSON.stringify(code)+')) == _blank_ast.dump(_blank_ast.parse('+JSON.stringify(q.answer)+'))\n'+
  'print("样例计算检查通过。")\n'+
  'print("填空与参考实现的语法结构一致。" if _same else "你的实现与参考写法不同；不直接判错，请对照题目、输出和图像确认。")\n';
 return full;
}
async function copyText(text){try{await navigator.clipboard.writeText(text);$('copy-status').textContent='已复制';}catch{$('copy-status').textContent='复制不可用，请选中代码手动复制。';}}
$('copy-answer').onclick=()=>copyText($('answer').textContent);
$('copy-reference').onclick=()=>copyText($('reference-code').textContent);
$('copy-full').onclick=()=>copyText(assembledCode(false));
$('reference-download').onclick=()=>download(qNow().ica?'ICA4_'+qNow().ica+'_reference.py':'program_reference.py',$('reference-code').textContent);
