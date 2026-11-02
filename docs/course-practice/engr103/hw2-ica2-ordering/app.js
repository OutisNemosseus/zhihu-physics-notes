import{validOrder,grade,shuffled,move,codeFor}from './order-core.js';
const $=id=>document.getElementById(id),KEY='engr103-hw2-ica2-ordering-v1';
let data,all=[],current='',programId='hw2-1',records={},dragId=null,drop=null;
try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');if(v&&typeof v==='object'&&!Array.isArray(v))records=v;}catch{}

const lectureFiles={L01:'1VM-JZEguL3XpiIi2FI-H912gXmmbkGz0',L02:'1-Ah1XbD2dm0Nq_W1Ogai5HkSe7byVhIL'};
const slideRules=[
 [/import numpy/, 'L01',58,'导入 NumPy'],
 [/np\.array\(/, 'L02',25,'创建数组'],
 [/np\.arange\(/, 'L02',28,'按步长创建数组'],
 [/np\.linspace\(/, 'L02',29,'按点数创建数组'],
 [/np\.meshgrid\(/, 'L02',31,'meshgrid 网格'],
 [/np\.(deg2rad|radians|sin|cos)\(/, 'L02',58,'弧度转换与三角函数'],
 [/np\.round\(/, 'L02',59,'round 数值取舍'],
 [/np\.pi\b/, 'L01',59,'圆周率常量'],
 [/\.shape|\.size/, 'L02',40,'数组形状与元素个数'],
 [/\.reshape\(/, 'L02',30,'reshape 改变形状'],
 [/np\.column_stack\(/, 'L02',49,'column_stack 按列拼接'],
 [/np\.concatenate\(/, 'L02',48,'concatenate 拼接数组'],
 [/np\.vstack\(/, 'L02',49,'vstack 纵向拼接'],
 [/\w\[[^\]\n]*:/, 'L02',36,'数组切片'],
 [/\w\[[^\]\n]+\]/, 'L02',33,'数组索引'],
 [/np\.linalg\.solve\(/, 'L02',80,'线性方程组完整示例'],
 [/ @ |np\.matmul\(/, 'L02',61,'矩阵乘法核对'],
 [/np\.allclose\(/, 'L02',80,'代回核对的思路（allclose 为数值比较写法）'],
 [/input\(/, 'L01',43,'input 输入'],
 [/int\(/, 'L01',45,'整数输入转换'],
 [/print\(/, 'L01',50,'print 输出'],
 [/print\(f["']/, 'L01',54,'f-string 格式化输出'],
 [/rng\.permutation\(/, 'L02',66,'随机排列（PPT 使用 random.permutation）'],
 [/rng\.integers\(/, 'L02',66,'随机整数（PPT 使用 random.randint）'],
 [/np\.random\.default_rng\(/, 'L02',65,'随机数基础（本块使用 Generator 接口）'],
 [/np\.fromstring\(/, 'L02',25,'数组创建基础（本块用 fromstring 转换输入）'],
 [/\*|\/|\+| - /, 'L02',71,'数组逐元素运算'],
 [/\*\*| % |\/\//, 'L01',15,'乘方、取余与整除']
];
function slideLinksFor(code){const refs=slideRules.filter(([pattern])=>pattern.test(code)).map(([,lecture,page,topic])=>({label:lecture+' 第'+page+'页 · '+topic,url:'https://drive.google.com/file/d/'+lectureFiles[lecture]+'/view#page='+page}));if(!refs.length)refs.push({label:'L01 第12页 · 变量赋值',url:'https://drive.google.com/file/d/'+lectureFiles.L01+'/view#page=12'});return refs;}
function appendSlideLinks(body,code){const links=document.createElement('div');links.className='block-label';links.style.marginTop='10px';links.style.display='flex';links.style.flexWrap='wrap';links.style.gap='5px 12px';links.setAttribute('aria-label','本代码块对应教师课件');for(const ref of slideLinksFor(code)){const a=document.createElement('a');a.href=ref.url;a.textContent=ref.label+' ↗';a.target='_blank';a.rel='noopener';links.append(a);}body.append(links);}

function item(){return all.find(q=>q.id===current);}
function rec(q){if(!records[q.id]||!validOrder(q,records[q.id].order))records[q.id]={order:shuffled(q),checked:null,solved:false};return records[q.id];}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(records));$('save').textContent='排序已保存到当前浏览器。';}catch{$('save').textContent='保存失败，请导出记录备份。';}}
function queue(){return all.filter(q=>$('scope').value==='all'||q.program===programId);}
function go(id){const q=all.find(q=>q.id===id);if(!q)return;current=id;programId=q.program;history.replaceState(null,'','#'+id);render();}
function nav(){const solved=all.filter(q=>rec(q).solved).length;$('solved').textContent=solved;$('progress').value=solved;$('programs').replaceChildren();for(const p of data.programs){const button=document.createElement('button');button.className='program'+(p.id===programId?' active':'');const name=document.createElement('strong');name.textContent=p.name;const topic=document.createElement('small');topic.textContent=p.topic;const count=document.createElement('small');count.textContent='已完成 '+p.tasks.filter(q=>rec(q).solved).length+'/5';button.append(name,topic,count);button.onclick=()=>{programId=p.id;$('scope').value='current';go(p.tasks[0].id);};$('programs').append(button);}$('numbers').replaceChildren();for(const q of queue()){const button=document.createElement('button');button.textContent=$('scope').value==='all'?q.number:q.local;button.setAttribute('aria-label',q.programName+' 排序题 '+q.local);button.setAttribute('aria-current',String(q.id===current));button.classList.toggle('solved',rec(q).solved);button.onclick=()=>go(q.id);$('numbers').append(button);}}
function reorder(id,target){const q=item(),r=rec(q);r.order=move(r.order,id,target);r.checked=null;r.solved=false;persist();renderBlocks();nav();renderFeedback();}
function clearDrop(){for(const el of $('blocks').children)el.classList.remove('drop-before','drop-after','dragging');drop=null;}
function renderBlocks(){const q=item(),r=rec(q);$('blocks').replaceChildren();for(const [i,id]of r.order.entries()){const block=q.blocks.find(b=>b.id===id);const card=document.createElement('div');card.className='block';card.dataset.id=id;const handle=document.createElement('span');handle.className='handle';handle.textContent='⠿';handle.draggable=false;handle.style.touchAction="none";handle.tabIndex=0;handle.setAttribute('role','button');handle.setAttribute('aria-label','拖动 '+block.label+'；Alt 加上下方向键移动');handle.addEventListener('keydown',e=>{if(e.altKey&&['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();reorder(id,i+(e.key==='ArrowUp'?-1:1));focusHandle(id);}});handle.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();dragId=id;handle.setPointerCapture(e.pointerId);card.classList.add('dragging');});handle.addEventListener('pointermove',e=>{if(dragId!==id)return;const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('.block');if(!target||!$('blocks').contains(target))return;const rect=target.getBoundingClientRect();const after=e.clientY>rect.top+rect.height/2;for(const el of $('blocks').children)el.classList.remove('drop-before','drop-after');target.classList.add(after?'drop-after':'drop-before');drop={targetId:target.dataset.id,after};if(e.clientY<65)window.scrollBy(0,-12);else if(e.clientY>innerHeight-65)window.scrollBy(0,12);});handle.addEventListener('pointerup',()=>{const source=dragId,where=drop;dragId=null;clearDrop();if(source&&where&&source!==where.targetId){const other=rec(item()).order.filter(x=>x!==source);reorder(source,other.indexOf(where.targetId)+(where.after?1:0));focusHandle(source);}});handle.addEventListener('pointercancel',()=>{dragId=null;clearDrop();});handle.addEventListener('dragstart',e=>{dragId=id;e.dataTransfer.setData('text/plain',id);e.dataTransfer.effectAllowed='move';card.classList.add('dragging');});handle.addEventListener('dragend',()=>{clearDrop();dragId=null;});const body=document.createElement('div');const label=document.createElement('div');label.className='block-label';label.textContent='位置 '+(i+1)+' · '+block.label;const pre=document.createElement('pre');pre.textContent=block.code;body.append(label,pre);appendSlideLinks(body,block.code);const arrows=document.createElement('div');arrows.className='arrows';for(const [symbol,delta]of [['↑',-1],['↓',1]]){const button=document.createElement('button');button.textContent=symbol;button.disabled=i+delta<0||i+delta>=r.order.length;button.setAttribute('aria-label',(delta<0?'上移 ':'下移 ')+block.label);button.onclick=()=>{reorder(id,i+delta);focusHandle(id);};arrows.append(button);}card.append(handle,body,arrows);card.addEventListener('dragover',e=>{if(!dragId)return;e.preventDefault();e.dataTransfer.dropEffect='move';const after=e.clientY>card.getBoundingClientRect().top+card.getBoundingClientRect().height/2;for(const el of $('blocks').children)el.classList.remove('drop-before','drop-after');card.classList.add(after?'drop-after':'drop-before');drop={targetId:id,after};});card.addEventListener('drop',e=>{e.preventDefault();if(!dragId||!drop)return;const source=dragId;const other=rec(item()).order.filter(x=>x!==source);if(drop.targetId!==source){const index=other.indexOf(drop.targetId)+(drop.after?1:0);reorder(source,index);}dragId=null;clearDrop();});$('blocks').append(card);}}
function focusHandle(id){const el=Array.from($('blocks').children).find(e=>e.dataset.id===id);el?.querySelector('.handle')?.focus({preventScroll:true});}
function renderFeedback(){const q=item(),r=rec(q),f=$('feedback');f.replaceChildren();f.hidden=r.checked===null;if(r.checked===null)return;const result=grade(q,r.order);f.classList.toggle('success',result.ok);const h=document.createElement('h3');h.textContent=result.ok?'顺序正确':'还有步骤需要调整';f.append(h);const text=document.createElement('p');text.textContent=result.ok?'满足本题的全部依赖和输出顺序。独立步骤的不同排列也可以通过。':'下面只列出需要修正的先后关系；可继续拖动后再次检查。';f.append(text);if(!result.ok){const ul=document.createElement('ul');for(const edge of result.violations.slice(0,4)){const li=document.createElement('li');li.textContent='“'+q.blocks.find(b=>b.id===edge.before).label+'”需要在“'+q.blocks.find(b=>b.id===edge.after).label+'”之前。';ul.append(li);}f.append(ul);}}
function render(){const q=item(),r=rec(q);nav();$('meta').textContent=q.programName+' · 第 '+q.local+' / 5 题 · 总题号 '+q.number+' / 40';$('title').textContent=q.title;$('requirements').replaceChildren();for(const req of q.requirements){const li=document.createElement('li');li.textContent=req;$('requirements').append(li);}$('hint').textContent=q.hint;$('reference').open=false;$('reference-code').textContent=codeFor(q,q.blocks.map(b=>b.id));renderBlocks();renderFeedback();const list=queue(),i=list.findIndex(x=>x.id===q.id);$('prev').disabled=i<=0;$('next').disabled=i>=list.length-1;persist();}
$('scope').onchange=render;$('check').onclick=()=>{const q=item(),r=rec(q);r.checked=true;r.solved=grade(q,r.order).ok;persist();renderFeedback();nav();};
$('shuffle').onclick=()=>{if(confirm('重新打乱当前题，并清除当前题的完成标记？')){records[current]={order:shuffled(item(),Date.now()),checked:null,solved:false};persist();render();}};
$('prev').onclick=()=>{const qs=queue(),i=qs.findIndex(q=>q.id===current);if(i>0)go(qs[i-1].id);};$('next').onclick=()=>{const qs=queue(),i=qs.findIndex(q=>q.id===current);if(i<qs.length-1)go(qs[i+1].id);};
function download(filename,content,type){const u=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=u;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
$('download').onclick=()=>download(item().id+'.py',codeFor(item(),rec(item()).order),'text/plain');$('export').onclick=()=>download('ENGR103_ordering_progress.json',JSON.stringify({version:1,records},null,2),'application/json');
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(all.some(q=>q.id===id))go(id);});
fetch('questions.json').then(r=>{if(!r.ok)throw Error('无法加载题库');return r.json();}).then(d=>{data=d;for(const p of data.programs)for(const q of p.tasks)all.push({...q,program:p.id,programName:p.name});const id=location.hash.slice(1);go(all.some(q=>q.id===id)?id:all[0].id);}).catch(e=>{$('error').textContent=e.message+'，请刷新页面。';});

