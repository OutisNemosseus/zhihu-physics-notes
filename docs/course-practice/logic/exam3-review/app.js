const $=s=>document.querySelector(s);const cats=['加法与乘法','容斥与补集','排列与组合','限制排列','重复对象','隔板法','二项式定理'];const key='mth231-exam3-v1';let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch{}function save(){try{localStorage.setItem(key,JSON.stringify(saved))}catch{$('#status').textContent='浏览器未允许保存，请保留当前页面。'}}
const files=[['Study Guide',119532084],['Review Problems',119532048],['Review Key',119532082],['Activity 8f',119532044],['Activity 8f Key',119532085]];const url=id=>`https://canvas.oregonstate.edu/courses/2063729/files/${id}?wrap=1`;const names={all:'全部练习',unseen:'只做未做题',guide:'复习指南',review:'全部复习题',extra:'全部额外练习',marked:'错题本',history:'历史错题',retry:'第二遍 · 只做错题'};const nav=[['guide','复习指南'],['all','全部练习'],['unseen','只做未做题'],['review','全部复习题'],['extra','全部额外练习'],['marked','错题本'],['retry','第二遍 · 只做错题'],['history','历史错题'],...cats.map(c=>[c,c])];$('#nav').innerHTML=nav.map(([id,name],i)=>`${i===8?'<hr>':''}<a href="#${encodeURIComponent(id)}" data-route="${id}">${name}${cats.includes(id)?` <small>${QUESTIONS.filter(q=>q.cat===id).length}</small>`:''}</a>`).join('');
function progress(){let n=0;for(const q of QUESTIONS)q.parts.forEach((_,i)=>{if((saved[`${q.set}-${q.n}-${i}`]||'').trim())n++});$('#progress').textContent=`已填写 ${n} / 56 个小问`;}
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function guide(){return `<div class="panel"><span class="tag">Sections 6.1, 6.3–6.5</span><h2>从这六个问题开始判断</h2><div class="checklist">${['What is the pool of candidates at each step? 每一步从哪些对象中选择？','Is the number of choices independent of earlier choices? 前面的选择会不会改变后面的数量？','Does order matter? 顺序重要吗？','Can an object be selected more than once? 允许重复选择吗？','Are the objects distinguishable? 对象能区分吗？','Would a complement or inclusion–exclusion be easier? 用补集或容斥是否更简单？'].map((x,i)=>`<label><input type="checkbox" data-check="guide-${i}" ${saved['guide-'+i]?'checked':''}> ${x}</label>`).join('')}</div></div><div class="panel"><h2>Counting techniques · 十条复习要点</h2><table><tr><th>方法</th><th>公式与条件</th></tr>${[['Product rule','n₁n₂：分步骤完成，每一步的选择数固定。'],['Sum rule','n₁+n₂：互斥的不同情况。'],['Subtraction / inclusion–exclusion','|A∪B| = |A| + |B| − |A∩B|'],['Division rule','n/d：每个最终结果恰好对应 d 个已计数对象。'],['Permutations','P(n,r)=n!/(n−r)!：有序、不重复。'],['Combinations','C(n,r)=n!/[r!(n−r)!]：无序、不重复。'],['Binomial theorem','(x+y)ⁿ = Σ C(n,k)xⁿ⁻ᵏyᵏ；(ax+by)ⁿ 中 xˡyᵏ 的系数为 C(n,k)aˡbᵏ（l+k=n）。'],['Ordered selection with repetition','nʳ：有序、允许重复。'],['Combinations with repetition','C(n+r−1,r)=C(n+r−1,n−1)：无序、允许重复。'],['Indistinguishable objects','n!/(n₁!n₂!…nₖ!)：相同对象排列。']].map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table></div><div class="panel"><h2>老师指定的课本练习</h2><p>6.1: 7, 10, 11, 25, 27, 33, 43<br>6.3: 11, 15, 21, 26, 29, 35<br>6.4: 6, 9<br>6.5: 5, 6, 7, 13, 15 (all variables nonnegative), 32, 33</p><p>指南仅列出课本题号，未附题干；本网页完整收录随附的两套练习题。老师另提醒复习 Written Homework 的例题。</p></div><div class="panel"><h2>五份原始资料</h2><div class="sources">${files.map(([n,id])=>`<a href="${url(id)}" target="_blank" rel="noopener">${n} ↗</a>`).join('')}</div><p>网页统一数学排版并修正明显拼写错误。Activity 8f 的答案已对照官方文本；Review 的网页解答为独立复算，未转录手写答案。两份官方 Key 均保留原始链接供核对。</p><p>考试页显示：17 题 / 50 分钟 / 40 分。禁止计算器、笔记和书本。完整套题不是 17 题模拟卷；计时可自行调整。</p></div>`}
const mcKey='mth231-exam3-mcq-v1';let mc={records:{},retryIds:[],retryStarted:null};try{const x=JSON.parse(localStorage.getItem(mcKey)||'null');if(x&&x.records)mc=x}catch{}const flat=QUESTIONS.flatMap(q=>q.parts.map((pt,i)=>({q,pt,i,id:`${q.set}-${q.n}-${i}`})));const byId=Object.fromEntries(flat.map(x=>[x.id,x]));let picks={};
let lang=saved.language||'en';if(new URLSearchParams(location.search).get('lang')==='zh')lang='zh';$('#language').value=lang;function rec(id){return mc.records[id]||{history:[],pending:false}}
function persistMC(){try{localStorage.setItem(mcKey,JSON.stringify(mc))}catch{$('#status').textContent='无法保存；请立即导出 JSON 备份。'}}
function routeNow(){return decodeURIComponent(location.hash.slice(1)||'all')}
function refreshCounts(){let done=flat.filter(x=>rec(x.id).history.length).length;let wrong=flat.filter(x=>rec(x.id).pending).length;let ever=flat.filter(x=>rec(x.id).history.some(h=>!h.correct)).length;$('#progress').textContent=`已答 ${done}/${flat.length} · 未做 ${flat.length-done} · 待重做 ${wrong} · 历史错题 ${ever}`;$('#wrongcount').textContent=wrong;}
function lastVisible(id){const h=rec(id).history;const last=h[h.length-1];return routeNow()==='retry'&&(!last||last.at<mc.retryStarted)?null:last;}
function card(x){const {q,pt,i,id}=x;const last=lastVisible(id);const chosen=picks[id]??last?.choice;return `<article id="card-${id}"><div class="meta"><b>${lang==='zh'?(q.set==='review'?'考试复习题':'额外练习 8f'):(q.set==='review'?'REVIEW':'ACTIVITY 8F')} / ${q.n}${q.parts.length>1?' ('+String.fromCharCode(97+i)+')':''}</b><span class="tag">${q.cat}</span><a href="${url(q.set==='review'?119532048:119532044)}" target="_blank" rel="noopener">原题 ↗</a></div>${(lang==='zh'?q.stemZh:q.stem)?`<p class="stem">${lang==='zh'?q.stemZh:q.stem}</p>`:''}<p class="question">${lang==='zh'?pt.qZh:pt.q}</p><fieldset><legend>选择一个答案</legend>${pt.options.map((o,j)=>`<label class="option ${last?(j===pt.correct?'right':j===last.choice?'wrong':''):''}"><input type="radio" name="${id}" value="${j}" ${chosen===j?'checked':''}><b>${'ABCD'[j]}.</b> <span>${esc(o)}</span></label>`).join('')}</fieldset><button data-grade="${id}">提交本题</button><span class="feedback" role="status">${last?(last.correct?'✓ 正确'+(routeNow()==='retry'?' · 已移出待重做':''):'✗ 答错 · 已保存到错题本'):''}</span><details><summary>展开答案与中文解析</summary><div class="answer"><b>正确选项 ${'ABCD'[pt.correct]}</b><div class="formula">${pt.a}</div><p class="why">${pt.why}</p><a href="${url(q.set==='review'?119532082:119532085)}" target="_blank" rel="noopener">老师原始 Key ↗</a></div></details><details><summary>草稿 / 旧版填写记录</summary><label for="note-${id}">解题过程</label><textarea id="note-${id}" data-answer="${id}">${esc(saved[id]||'')}</textarea></details>${rec(id).history.length?`<small>已作答 ${rec(id).history.length} 次 · 历史错误 ${rec(id).history.filter(h=>!h.correct).length} 次</small>`:''}</article>`;}
const shuffleButton = document.createElement('button');
shuffleButton.type = 'button';
shuffleButton.textContent = '打乱题目顺序';
$('#retry').before(shuffleButton);

function shuffleQuestions() {
  const current = orderedQuestions();
  const visible = new Set(Array.from(document.querySelectorAll('#content article'), el => el.id.slice(5)));
  const before = current.filter(item => visible.has(item.id));
  if (before.length < 2) return;
  const shuffled = before.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.every((item, i) => item === before[i])) shuffled.push(shuffled.shift());
  let index = 0;
  saved.questionOrder = current.map(item => visible.has(item.id) ? shuffled[index++].id : item.id);
  save();
  render();
}
function orderedQuestions() {
  if (!Array.isArray(saved.questionOrder)) return flat;
  const ids = new Set(saved.questionOrder);
  return [...ids].filter(id => Object.hasOwn(byId, id)).map(id => byId[id])
    .concat(flat.filter(item => !ids.has(item.id)));
}
shuffleButton.onclick = shuffleQuestions;
function render(){const route=routeNow();$('#title').textContent=names[route]||route;document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.dataset.route===route));shuffleButton.hidden=route==='guide';if(route==='guide'){$('#subtitle').textContent='范围、计数方法与五份原始资料';$('#content').innerHTML=guide();}else{let list=orderedQuestions().filter(x=>route==='all'||(route==='unseen'&&!rec(x.id).history.length)||x.q.set===route||x.q.cat===route||(route==='marked'&&rec(x.id).pending)||(route==='history'&&rec(x.id).history.some(h=>!h.correct))||(route==='retry'&&mc.retryIds.includes(x.id)));shuffleButton.disabled=list.length<2;shuffleButton.textContent=route==='unseen'?'打乱未做题':'打乱题目顺序';$('#subtitle').textContent=`${list.length} 道单选题 · C(n,r) = 组合，P(n,r) = 排列，F(n) = n!，^ = 幂`;$('#content').innerHTML=(route==='retry'?'<div class="panel">第二遍只做错题：本轮题目固定，提交前隐藏上次选项和判分。答对会移出待重做，历史记录继续保留。</div>':'')+list.map(card).join('')+(list.length?'':route==='unseen'?'<div class="panel">全部题目都已提交，可以到错题本复习。</div>':'<div class="panel">这里暂时没有题目。答错的题会自动进入错题本；点击「开始第二遍」即可重做。</div>');}refreshCounts();}
function grade(id,choice){if(!Number.isInteger(choice)||choice<0||choice>3)return;const pt=byId[id].pt;const r=rec(id);r.history.push({choice,correct:choice===pt.correct,at:Date.now()});r.pending=choice!==pt.correct;mc.records[id]=r;delete picks[id];persistMC();}
$('#content').addEventListener('change',e=>{if(e.target.type==='radio')picks[e.target.name]=Number(e.target.value);if(e.target.dataset.check){saved[e.target.dataset.check]=e.target.checked;save()}});
$('#content').addEventListener('input',e=>{if(e.target.dataset.answer){saved[e.target.dataset.answer]=e.target.value;save()}});
$('#content').addEventListener('click',e=>{const button=e.target.closest('[data-grade]');if(!button)return;const id=button.dataset.grade;const cardEl=button.closest('article');const checked=cardEl.querySelector('input:checked');if(!checked){cardEl.querySelector('.feedback').textContent='请先选择一个答案。';return}grade(id,Number(checked.value));if(routeNow()==='unseen'){
  const correct=rec(id).history.at(-1).correct;
  render();
  $('#status').textContent=correct?'✓ 正确，已移出未做题。':'✗ 答错，已移入错题本。';
}else{cardEl.outerHTML=card(byId[id]);refreshCounts();}});
$('#retry').onclick=()=>{const ids=flat.filter(x=>rec(x.id).pending).map(x=>x.id);if(!ids.length){$('#status').textContent='暂无待重做错题。';return}mc.retryIds=ids;mc.retryStarted=Date.now();picks={};persistMC();if(location.hash==='#retry')render();else location.hash='retry';};
function exportRows(){return flat.filter(x=>rec(x.id).history.some(h=>!h.correct)).map(x=>({id:x.id,source:x.q.set,number:x.q.n,part:x.i+1,category:x.q.cat,stem:lang==='zh'?x.q.stemZh:x.q.stem,question:lang==='zh'?x.pt.qZh:x.pt.q,options:x.pt.options,correctOption:'ABCD'[x.pt.correct],answer:x.pt.a,explanation:x.pt.why,pending:rec(x.id).pending,history:rec(x.id).history,note:saved[x.id]||''}));}
function download(name,text,mime){const link=document.createElement('a');const u=URL.createObjectURL(new Blob([text],{type:mime}));link.href=u;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
$('#export-json').onclick=()=>{download('MTH231_Exam3_Wrong_Questions.json',JSON.stringify({schema:'mth231-exam3-wrong-v1',exportedAt:new Date().toISOString(),questions:exportRows()},null,2),'application/json');$('#status').textContent='已导出错题 JSON，可在此页面导入。';};
$('#export-csv').onclick=()=>{const rows=[['ID','分类','题干','问题','A','B','C','D','正确选项','答案','解析','待重做','最近选项','错误次数','笔记'],...exportRows().map(x=>[x.id,x.category,x.stem,x.question,...x.options,x.correctOption,x.answer,x.explanation,x.pending?'是':'否','ABCD'[x.history.at(-1).choice],x.history.filter(h=>!h.correct).length,x.note])];const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/^[=+\-@]/,"'$&").replaceAll('"','""')+'"').join(',')).join('\r\n');download('MTH231_Exam3_Wrong_Questions.csv','\ufeff'+csv,'text/csv;charset=utf-8');};
const backupButton = document.createElement('button');
backupButton.textContent = '保存做题进度';
$('#export-json').before(backupButton);
const importInput = $('#import');
importInput.parentElement.firstChild.textContent = '导入进度或错题 JSON ';
backupButton.onclick = () => {
  const questions = flat.filter(x => rec(x.id).history.length || saved[x.id]).map(({id}) => ({
    id, history: rec(id).history, note: saved[id] || ''
  }));
  download('MTH231_Exam3_Progress.json', JSON.stringify({
    schema: 'mth231-exam3-progress-v1', questions, order: orderedQuestions().map(x => x.id)
  }, null, 2), 'application/json');
  $('#status').textContent = '已导出做题记录、草稿和题目顺序。';
};
importInput.onchange = async () => {
  const file = importInput.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const full = data.schema === 'mth231-exam3-progress-v1';
    if ((!full && data.schema !== 'mth231-exam3-wrong-v1') || !Array.isArray(data.questions)) throw Error();
    const records = {...mc.records};
    const notes = {};
    for (const row of data.questions) {
      if (!Object.hasOwn(byId, row.id) || !Array.isArray(row.history)) throw Error();
      const merged = new Map((records[row.id]?.history || []).map(h => [h.at + ':' + h.choice, h]));
      for (const h of row.history) {
        if (!Number.isInteger(h.choice) || h.choice < 0 || h.choice > 3 || !Number.isFinite(h.at) || h.at <= 0) throw Error();
        merged.set(h.at + ':' + h.choice, {at:h.at, choice:h.choice, correct:h.choice === byId[row.id].pt.correct});
      }
      const history = [...merged.values()].sort((a,b) => a.at-b.at);
      records[row.id] = {history, pending: history.at(-1)?.correct === false};
      if (typeof row.note === 'string' && !saved[row.id]) notes[row.id] = row.note;
    }
    if (full && Array.isArray(data.order)) saved.questionOrder = data.order.filter(id => Object.hasOwn(byId,id));
    mc.records = records;
    Object.assign(saved, notes);
    picks = {};
    save();
    persistMC();
    render();
    $('#status').textContent = '已合并记录，未做题和错题本已更新。';
  } catch {
    $('#status').textContent = '导入失败，请选择此题库导出的进度或错题 JSON。';
  } finally {
    importInput.value = '';
  }
};
$('#language').onchange=e=>{lang=e.target.value;saved.language=lang;save();render();};window.addEventListener('hashchange',render);render();

const timerStatus = document.createElement('span');
timerStatus.setAttribute('role','status');
$('#status').before(timerStatus);
let clock=saved.clock||{elapsed:0,running:false,start:0,limit:3000};$('#minutes').value=clock.limit/60;function seconds(){return clock.elapsed+(clock.running?(Date.now()-clock.start)/1000:0)}function fmt(n){n=Math.max(0,Math.floor(n));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}function tick(){let t=seconds();$('#elapsed').textContent=fmt(t);$('#remaining').textContent=fmt(clock.limit-t);$('#start').textContent=clock.running?'暂停':'开始';timerStatus.textContent=t>=clock.limit?'时间到 · 可继续练习':''}function saveClock(){saved.clock=clock;save();tick()}$('#start').onclick=()=>{if(clock.running){clock.elapsed=seconds();clock.running=false}else{clock.start=Date.now();clock.running=true}saveClock()};$('#reset').onclick=()=>{clock={elapsed:0,running:false,start:0,limit:(Number($('#minutes').value)||50)*60};saveClock()};$('#minutes').onchange=()=>{let m=Math.max(1,Math.min(999,Number($('#minutes').value)||50));$('#minutes').value=m;clock.limit=m*60;saveClock()};setInterval(tick,250);tick();
