/* English Gym v2.3 — minimalist navigation layer.
   Rearranges existing DOM; all original engines and synced learning state are retained. */
(function(){
'use strict';
let view='today',practice='',ready=false;
const $id=id=>document.getElementById(id);
const titles={smart:'口說 9 分鐘',reading:'閱讀 10 分鐘',recall:'片語回想',gym:'English Gym',ielts:'IELTS 題型'};
const notes={smart:'先講、修一點、再講一次',reading:'短篇故事與理解',recall:'複習已存下的片語',gym:'聽寫、跟讀與自由口說',ielts:'聽、說、讀、寫專項練習'};
function el(tag,cls,html){const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n}
function move(node,target){if(node&&target&&node.parentElement!==target)target.appendChild(node)}
function group(k){return $id('simpleGroup-'+k)}
function setView(next){
 if(!ready)return;
 view=next;
 ['today','lesson','practice','progress','settings'].forEach(k=>{const n=$id('simple-'+k);if(n)n.hidden=k!==view});
 document.querySelectorAll('.simple-nav [data-view]').forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('is-active',active);b.setAttribute('aria-current',active?'page':'false')});
 $id('simple-nav').hidden=view==='lesson';
 if(next==='practice')showPractice();
 if(next==='lesson'&&typeof c1Render==='function')c1Render();
 refresh();window.scrollTo({top:0,behavior:'auto'});
}
function showPractice(k){
 if(k)practice=k;
 const menu=$id('simplePracticeMenu'),active=$id('simplePracticeActive');
 if(!menu||!active)return;
 menu.hidden=!!practice;active.hidden=!practice;
 for(const name of Object.keys(titles))group(name).hidden=name!==practice;
 $id('simplePracticeTitle').textContent=titles[practice]||'練習';
}
function choosePractice(k){if(!titles[k])return;setView('practice');showPractice(k);window.scrollTo({top:0,behavior:'auto'})}
function countWeek(){
 if(typeof hWeekDates!=='function'||typeof hDateKey!=='function')return 0;
 const a=st.habit?.activities||{};
 return hWeekDates().filter(d=>Object.values(a[hDateKey(d)]||{}).some(Boolean)).length;
}
function refresh(){
 if(!ready)return;
 const completed=typeof c1Count==='function'?c1Count():0;
 const total=16,all=completed>=total;
 const next=typeof c1NextNum==='function'?c1NextNum():1;
 const names=['閱讀','聽力','口說','寫作'];
 const skill=names[(next-1)%4];
 const title=$id('simpleTodayTitle');
 if(!title)return;
 title.textContent=all?'C1 延伸練習':`第 ${next} 堂・${skill}`;
 $id('simpleTodaySub').textContent=all?'完成 16 堂橋接課程，接下來輪流練習四項技能。':'B2 → C1 橋接主線｜今天只做下一堂';
 $id('simpleCount').textContent=all?'16/16':`${completed}/16`;
 $id('simpleBar').style.width=(completed/total*100)+'%';
 $id('simpleWeek').textContent=countWeek()+' 天';
 $id('simpleStart').textContent=all?'開始延伸練習':'開始這堂課';
}
function moveDynamic(){
 const c=$id('c1SchoolHome');if(c)move(c,$id('simpleLessonContent'));
 for(const id of ['ieltsHome','ieltsBox'])move($id(id),group('ielts'));
 refresh();
}
function create(){
 if(ready||!$id('appRoot'))return;
 const app=$id('appRoot');
 document.body.classList.add('simple-ui');
 const subtitle=document.querySelector('.top .small');if(subtitle)subtitle.textContent='你的英文學習路線';
 const nav=el('nav','simple-nav');nav.id='simple-nav';nav.setAttribute('aria-label','主要導覽');
 nav.innerHTML='<button data-view="today">今天</button><button data-view="practice">練習</button><button data-view="progress">進度</button><button data-view="settings" aria-label="設定">設定</button>';
 app.prepend(nav);
 for(const name of ['today','lesson','practice','progress','settings']){
   const section=el('section','simple-screen');section.id='simple-'+name;section.hidden=name!=='today';app.appendChild(section);
 }
 $id('simple-today').innerHTML=`<div class="simple-hero"><div class="simple-kicker">下一步</div><h2 id="simpleTodayTitle">載入中…</h2><p id="simpleTodaySub">B2 → C1 橋接主線</p><div class="simple-progress-meta"><span>課程進度</span><strong id="simpleCount">0/16</strong></div><div class="simple-track" aria-label="課程進度"><div id="simpleBar"></div></div><button class="primary simple-primary" id="simpleStart" type="button">開始這堂課</button><p class="simple-micro">約 20–30 分鐘。只做下一步，不需要選教材。</p></div><div class="simple-week"><span>本週有練習</span><b id="simpleWeek">0 天</b></div><button class="simple-text-link" id="simpleQuick" type="button">今天只有 5 分鐘？做精簡版</button>`;
 $id('simple-lesson').innerHTML='<button type="button" class="simple-back" id="simpleLessonBack">← 返回今天</button><div id="simpleLessonContent"></div>';
 const pr=$id('simple-practice');
 const menu=el('div','simple-menu');menu.id='simplePracticeMenu';
 menu.innerHTML='<div class="simple-section-title"><h2>想練哪一項？</h2><p>挑一個就好，不用全部做。</p></div>'+Object.keys(titles).map(k=>`<button class="simple-choice" data-practice="${k}" type="button"><span class="simple-choice-copy"><b>${titles[k]}</b><small>${notes[k]}</small></span><span aria-hidden="true">›</span></button>`).join('');
 const active=el('div','simple-active');active.id='simplePracticeActive';active.hidden=true;
 active.innerHTML='<button type="button" class="simple-back" id="simplePracticeBack">← 全部練習</button><h2 id="simplePracticeTitle"></h2><div id="simplePracticeSlots"></div>';
 pr.append(menu,active);
 for(const k of Object.keys(titles)){const g=el('div','simple-practice-group');g.id='simpleGroup-'+k;g.hidden=true;$id('simplePracticeSlots').appendChild(g)}
 $id('simple-progress').innerHTML='<div class="simple-section-title"><h2>學習進度</h2><p>看累積，不追連勝天數。</p></div>';
 $id('simple-settings').innerHTML='<div class="simple-section-title"><h2>設定與安全</h2><p>帳號、同步與備份集中在這裡。</p></div>';
 move($id('habitPanel'),$id('simple-progress'));
 move($id('ss9Home'),group('smart'));move($id('ss9Box'),group('smart'));
 move(document.querySelector('.readingCard'),group('reading'));move($id('reading10Box'),group('reading'));
 move($id('phraseRecallHome'),group('recall'));move($id('phraseRecallBox'),group('recall'));
 move(document.querySelector('.mode')?.closest('.card'),group('gym'));
 move($id('area')?.closest('.card'),group('gym'));
 move($id('weekDone')?.closest('.card'),$id('simple-progress'));
 move($id('weakness')?.closest('.card'),$id('simple-progress'));
 move(document.querySelector('.costguard'),$id('simple-settings'));
 const passwordCard=$id('newPassword')?.closest('.card');move(passwordCard,$id('simple-settings'));
 [...app.children].filter(n=>n.classList?.contains('card')).forEach(n=>move(n,$id('simple-settings')));
 move($id('installBtn'),$id('simple-settings'));
 nav.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{practice='';setView(b.dataset.view)}));
 menu.querySelectorAll('[data-practice]').forEach(b=>b.addEventListener('click',()=>choosePractice(b.dataset.practice)));
 $id('simplePracticeBack').addEventListener('click',()=>{practice='';showPractice()});
 $id('simpleStart').addEventListener('click',()=>{moveDynamic();setView('lesson')});
 $id('simpleLessonBack').addEventListener('click',()=>setView('today'));
 $id('simpleQuick').addEventListener('click',()=>{choosePractice('gym');if(typeof hStartGym5==='function')hStartGym5()});
 ready=true;
 moveDynamic();refresh();setView('today');
 const ob=new MutationObserver(()=>moveDynamic());
 ob.observe($id('simple-progress'),{childList:true});
 ob.observe(group('recall'),{childList:true});
 const originalDash=window.dash;
 if(typeof originalDash==='function')window.dash=function(...args){const r=originalDash(...args);refresh();return r};
 const originalSave=window.save;
 if(typeof originalSave==='function')window.save=async function(...args){const r=await originalSave(...args);refresh();return r};
 window.addEventListener('focus',refresh);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',create,{once:true});else create();
})();
