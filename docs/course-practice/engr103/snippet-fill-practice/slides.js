'use strict';
(()=>{
const el=id=>document.getElementById(id),deck=el('deck');
let opened=false,playing=false,answer=false,left=15,deadline=0,timer=null,anchor=null,direction=1,started=false,focusBefore=null;
const seconds=()=>Number(el(answer?'deck-review':'deck-think').value);
function items(){if(!anchor)return [];const s=el('deck-scope').value;return questions.filter(q=>s==='all'||(s==='single'?q.id===anchor.id:s==='hw4'?q.source.startsWith('hw4-'):q.group===anchor.group));}
function status(){if(playing)left=Math.max(0,(deadline-performance.now())/1000);el('deck-status').textContent=(answer?'查看答案':'思考填空')+' · '+Math.ceil(left)+'秒'+(playing?'':' · 已暂停');el('deck-play').textContent=playing?'暂停':'继续播放';}
function pause(){if(playing)left=Math.max(0,(deadline-performance.now())/1000);playing=false;clearInterval(timer);timer=null;status();}
function play(){if(!opened)return;if(left<=0)left=seconds();playing=true;deadline=performance.now()+left*1000;clearInterval(timer);timer=setInterval(tick,200);status();}
function paint(){const q=qNow(),v=items();el('deck-group').textContent=q.group;el('deck-heading').textContent=q.title;el('deck-prompt').textContent=q.prompt;el('deck-before').textContent=q.before||'';el('deck-after').textContent=q.after||'';el('deck-answer').textContent=q.answer;el('deck-answer').hidden=!answer;el('deck-input').hidden=answer;el('deck-phase').textContent=answer?'参考实现':'填入缺失实现';el('deck-hint').textContent=q.hint||'';el('deck-hint').hidden=!answer;el('deck-position').textContent=(v.findIndex(x=>x.id===current)+1)+' / '+v.length+' · 全库题号 '+q.id;el('deck-flip').textContent=answer?'返回填空':'显示答案';status();}
function flip(){answer=!answer;left=seconds();if(playing)deadline=performance.now()+left*1000;paint();}
function move(step,auto=false){const v=items();if(!v.length)return;let i=v.findIndex(q=>q.id===current);if(auto&&el('deck-order').value==='bounce'){if(v.length>1){if(i+direction>=v.length||i+direction<0)direction=-direction;step=direction;}else step=0;}go(v[(i+step+v.length)%v.length].id);}
function tick(){status();if(left>0)return;if(!answer)flip();else move(1,true);}
function open(){if(opened||!questions.length)return;save();stop(false);anchor=qNow();focusBefore=document.activeElement;opened=true;answer=false;direction=1;left=seconds();el('deck-input').value='';deck.showModal();document.body.classList.add('deck-open');paint();play();el('deck-play').focus();}
function close(){if(!opened)return;pause();opened=false;deck.close();document.body.classList.remove('deck-open');if(document.fullscreenElement===deck)document.exitFullscreen().catch(()=>{});focusBefore?.focus();}
el('start-slides').onclick=open;el('deck-exit').onclick=close;deck.addEventListener('cancel',e=>{e.preventDefault();close();});
el('deck-play').onclick=()=>playing?pause():play();el('deck-flip').onclick=flip;el('deck-prev').onclick=()=>move(-1);el('deck-next').onclick=()=>move(1);
el('deck-input').oninput=()=>{pause();el('code').value=el('deck-input').value;save();};
el('deck-scope').onchange=()=>{direction=1;const v=items();if(!v.some(q=>q.id===current))go(v[0].id);else{answer=false;left=seconds();if(playing)deadline=performance.now()+left*1000;paint();}};
for(const id of ['deck-think','deck-review'])el(id).onchange=()=>{left=seconds();if(playing)deadline=performance.now()+left*1000;status();};
el('deck-order').onchange=()=>{direction=1;};
el('deck-fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await deck.requestFullscreen();}catch{el('deck-status').textContent='浏览器不支持全屏，可继续在窗口内播放。';}};
deck.addEventListener('keydown',e=>{if(e.target.matches('textarea,input,select'))return;if(e.key===' '){e.preventDefault();playing?pause():play();}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key.toLowerCase()==='a'){e.preventDefault();flip();}});
document.addEventListener('visibilitychange',()=>{if(opened&&document.hidden)pause();});
function ready(){if(opened){answer=false;left=seconds();el('deck-input').value='';if(playing)deadline=performance.now()+left*1000;paint();}else if(!started&&new URLSearchParams(location.search).get('slides')==='1'){started=true;open();}}
window.addEventListener('practice-rendered',ready);if(questions.length)ready();
})();
