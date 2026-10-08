/* English Gym v1.7 — Low-pressure C1 track.
   Goal: sustainable progress, not daily pressure.
   Main textbook: University of Sussex Develop Your English.
   4 sessions/week, ~30 min/session, no make-up debt.
   No paid APIs. Progress lives inside the existing private state object. */
const C1_SUSSEX='https://openpress.sussex.ac.uk/developyourenglish/';
const C1_BBC='https://bbclearningenglish.org/programme/upper-intermediate-course';
const C1_PLAN=[
 {day:1,pages:'PDF 29–30',title:'SDG12 + Key Vocabulary + Introduction',main:'00–20｜讀 PDF 29–30，只抓大意。最多圈 3 個想用的 phrase。',output:'20–30｜關掉課本，用英文回答：What is a circular economy? 30–60 秒即可。'},
 {day:2,pages:'PDF 31–32',title:'Reading 前段',main:'00–20｜讀 PDF 31–32：Before you read + collocations + skim reading。',output:'20–30｜寫 3 個 bullet points：problem / who is affected / one useful phrase。'},
 {day:3,pages:'PDF 33–35',title:'Reading 後段 + Summary',main:'00–20｜讀 PDF 33–35，完成 Reading 後半。',output:'20–30｜不用看原文說 45 秒：What are the innovators doing with plastic waste?'},
 {day:4,pages:'PDF 35–36',title:'Function: Causality',main:'00–20｜只學 3 個：cause / result in / give rise to。',output:'20–30｜自己造 3 句並說出來。'},
 {day:5,pages:'PDF 36–37',title:'Data Visualisation',main:'00–20｜看 Plastic waste to chemicals，先弄懂流程。',output:'20–30｜只口頭描述流程，不寫 IELTS Task 1。'},
 {day:6,pages:'PDF 37–38',title:'Pronunciation + Listening Prep',main:'00–15｜挑 5 個四音節字：聽→說→再聽。',output:'15–30｜先看 Listening 題目，預測內容；今天不必完整聽完。'},
 {day:7,pages:'PDF 38–40',title:'Listening',main:'00–10｜先看題目。10–20｜完整聽一次，只抓 main idea。',output:'20–30｜再聽一次，只找 3 個關鍵資訊。'},
 {day:8,pages:'PDF 40–41',title:'Vocabulary + Check-in',main:'00–20｜做 Vocabulary / crossword，最多留下 5 個詞。',output:'20–30｜檢討：這 8 次完成幾次？30 分鐘是否剛好？哪種任務最耗能？'}
];

function c1State(){
  if(!st.curriculum)st.curriculum={completed:{},notes:{},unit:1};
  if(!st.curriculum.completed)st.curriculum.completed={};
  return st.curriculum;
}
function c1Next(){
  const s=c1State();
  for(const x of C1_PLAN) if(!s.completed[x.day]) return x;
  return C1_PLAN[C1_PLAN.length-1];
}
function c1Count(){return C1_PLAN.filter(x=>c1State().completed[x.day]).length}
function c1Inject(){
  if(document.getElementById('c1SchoolHome')){c1Render();return}
  const css=document.createElement('style');
  css.textContent=`.c1Card{border:2px solid #d8ddce}.c1Today{background:var(--soft);border-radius:14px;padding:14px}.c1Bar{height:10px;background:#e7e8e2;border-radius:999px;overflow:hidden}.c1Bar>i{display:block;height:100%;background:#222}.c1Links{display:flex;gap:8px;flex-wrap:wrap}.c1Links a{display:inline-block;border:1px solid var(--line);padding:9px 12px;border-radius:10px;color:inherit;text-decoration:none;background:#fff}.c1Done{text-decoration:line-through;opacity:.65}`;
  document.head.appendChild(css);
  const home=document.createElement('div');home.id='c1SchoolHome';home.className='card c1Card';
  const anchor=document.getElementById('habitPanel');
  anchor.insertAdjacentElement('afterend',home);c1Render();
}
function c1Render(){
  const el=document.getElementById('c1SchoolHome');if(!el)return;
  const s=c1State(),x=c1Next(),count=c1Count(),allDone=count>=C1_PLAN.length,pct=Math.round(count/C1_PLAN.length*100);
  el.innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:flex-start">
      <div><span class="pill">v1.7・低壓 C1</span><h2 style="margin:8px 0 4px">📘 下一堂正課｜${allDone?'Unit 1 這階段完成':'Session '+x.day+'/8'}</h2><p class="small" style="margin:0">每週約 4 次、每次 30 分鐘。沒有補課債；休息日不算落後。</p></div>
      <div class="metric miniMetric"><span class="small">目前進度</span><b>${count}/8</b><span class="small">sessions</span></div>
    </div>
    <div class="c1Bar" style="margin:12px 0"><i style="width:${pct}%"></i></div>
    <div class="c1Today">
      <div class="row"><span class="pill">${esc(x.pages)}</span><span class="pill">約 30 分鐘</span></div>
      <h3 style="margin-bottom:8px">${esc(x.title)}</h3>
      <p><b>主課本：</b>${esc(x.main)}</p>
      <p><b>輸出：</b>${esc(x.output)}</p>
      <div class="c1Links"><a href="${C1_SUSSEX}" target="_blank" rel="noopener">📖 Sussex 官方課本</a><a href="${C1_BBC}" target="_blank" rel="noopener">🎧 BBC（有餘力再看）</a></div>
    </div>
    <div class="row" style="margin-top:12px">
      <button class="primary" onclick="c1CompleteToday()" ${allDone?'disabled':''}>${allDone?'這階段完成':'✅ 完成這一堂'}</button>
      <button onclick="c1ShowPlan()">看 8 堂課表</button>
    </div>
    <div id="c1PlanBox" class="hidden"></div>
    <p class="small" style="margin-bottom:0">最低版本：只讀 10 分鐘＋說 1 句英文也算出現。狀態差就停，不補、不追。</p>`;
}
function c1ShowPlan(){
  const box=document.getElementById('c1PlanBox');if(!box)return;
  const s=c1State();box.classList.toggle('hidden');if(box.classList.contains('hidden'))return;
  box.innerHTML='<div class="stack" style="margin-top:12px">'+C1_PLAN.map(x=>`<div class="tip ${s.completed[x.day]?'c1Done':''}"><b>Session ${x.day}｜${esc(x.title)}</b><br><span class="small">${esc(x.pages)}・約 30 分鐘</span></div>`).join('')+'</div>';
}
async function c1CompleteToday(){
  const s=c1State(),x=c1Next();s.completed[x.day]=true;s.lastCompleted=new Date().toISOString();
  await save();if(typeof hMark==='function')await hMark('course');c1Render();
  if(typeof hToast==='function')hToast('📘 今天夠了。完成就停，不補更多。');
}
window.addEventListener('load',()=>setTimeout(c1Inject,600));
setTimeout(c1Inject,850);
