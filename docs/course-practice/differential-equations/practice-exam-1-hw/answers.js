(()=>{'use strict';
const cards=[...document.querySelectorAll('#practice .question')];
const status=document.getElementById('export-status');
function plain(e){return e.textContent.trim().replace(/\n[ \t]+/g,'\n');}
function text(card){const field=card.querySelector('textarea');return [card.querySelector('h2').textContent,plain(card.querySelector('.source-note')),plain(card.querySelector('.prompt')),'','我的作答：',field.value||'（尚未填写）','','完成标记：'+(card.querySelector('[data-done]').getAttribute('aria-pressed')==='true'?'已完成':'未完成'),'复习标记：'+(card.querySelector('[data-review]').getAttribute('aria-pressed')==='true'?'待复习':'无')].join('\n');}
function download(list,name){try{const body=['LBCC MTH256 · HW-based Practice Exam 1','导出时间：'+new Date().toISOString(),'题目为原创作业变式；以下为个人作答，不含参考答案。','',...list.map(text)].join('\n\n');const url=URL.createObjectURL(new Blob(['\ufeff'+body],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.hidden=true;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);status.textContent='已生成下载：'+name;}catch(e){status.textContent='下载未成功，请复制作答后保存。';}}
const current=()=>cards.find(c=>!c.hidden)||cards[0];
document.getElementById('download-current').addEventListener('click',()=>{const c=current();download([c],'MTH256-practice-exam-1-'+c.id+'-answers.txt');});
document.getElementById('download-all').addEventListener('click',()=>download(cards,'MTH256-practice-exam-1-all-answers.txt'));
document.querySelectorAll('[data-download]').forEach(b=>b.addEventListener('click',()=>{const c=document.getElementById(b.dataset.download);download([c],'MTH256-practice-exam-1-'+c.id+'-answers.txt');}));
})();