/* English Gym v1.6 — C1 School Year / Sussex textbook track.
   Main textbook: University of Sussex Develop Your English.
   BBC Upper-intermediate is a short supplement, not a 30-minute main lesson.
   No paid APIs. Progress lives inside the existing private state object. */
const C1_START='2026-10-05';
const C1_SUSSEX='https://openpress.sussex.ac.uk/developyourenglish/';
const C1_BBC='https://bbclearningenglish.org/programme/upper-intermediate-course';
const C1_BBC_U1='https://bbclearningenglish.org/lesson/upper-intermediate-course-course-upper-intermediate-unit-1';
const C1_PLAN=[
 {day:1,pages:'PDF 29–30',title:'Unit 1｜SDG12 + Key Vocabulary + Introduction',main:'讀 PDF 29–30：先抓 SDG12 大意，再做 Key Vocabulary。最多留下 3 個真的想用的 chunk。',output:'BBC Unit 1 約 5–10 分鐘＋English Gym 15 分鐘；最後 5 分鐘回答：What is a circular economy?',bbc:C1_BBC_U1},
 {day:2,pages:'PDF 31–33',title:'Unit 1｜Reading ①',main:'讀 PDF 31–33：Before you read、collocations、skim reading，開始正文。不要逐字翻譯，只查阻礙理解的字。',output:'關掉課本，用英文說 45–60 秒：What problem are the innovators trying to solve?'},
 {day:3,pages:'PDF 34–35',title:'Unit 1｜Reading ② + Summary',main:'讀 PDF 34–35：完成文章後半與 detail questions。',output:'寫 3 個 bullet points：problem / solution / why it matters，再不用原句講成 60 秒；立刻 retry 一次。'},
 {day:4,pages:'PDF 35–36',title:'Unit 1｜Function: Causality',main:'讀 PDF 35–36：整理 cause / result in / give rise to / consequence 等因果表達，只選 3 個最想用的。',output:'BBC Upper-intermediate 1 個短課（5–10 分鐘）＋用至少 2 個因果句型回答：Why is plastic waste difficult to solve?',bbc:C1_BBC},
 {day:5,pages:'PDF 36–37',title:'Unit 1｜Data Visualisation',main:'讀 PDF 36–37：Plastic waste to chemicals。先說整體流程，再看細節。',output:'寫 5–7 句 mini Task 1：1 句 overview＋2–3 個重要步驟；朗讀一次。'},
 {day:6,pages:'PDF 37–38',title:'Unit 1｜Pronunciation + Listening Prep',main:'讀 PDF 37–38：4-syllable word stress。挑 8 個字，聽→說→再聽。',output:'做 English Gym 15 分鐘＋5 分鐘 retry；今天只修 1 個發音或句型問題。'},
 {day:7,pages:'複習 PDF 29–38',title:'Week 1 Review｜不開新課',main:'不看課本，回想本週最多 8 個 phrase / ideas；再回課本檢查忘掉的部分。',output:'Speaking 60–90 秒：What have I learned about plastic waste and the circular economy? Retry 一次。'},
 {day:8,pages:'PDF 38–40',title:'Unit 1｜Listening ①',main:'先讀題預測；第一次完整聽約 6 分鐘，只抓 main idea，不暫停；第二次做 detail task。',output:'用自己的話說 45–60 秒：What is the difference between a linear and circular economy?'},
 {day:9,pages:'PDF 38–40',title:'Unit 1｜Listening ② + Listening Gap',main:'再聽一次，只針對昨天聽不懂的部分；對 transcript 時找 3 個「認識但耳朵沒聽出來」的 chunk。',output:'每個 chunk shadowing 3 次＋Phrase Recall 3。'},
 {day:10,pages:'PDF 40–41',title:'Unit 1｜Vocabulary + Crossword',main:'讀 PDF 40–41：Responsible consumption & production vocabulary，完成 crossword。',output:'BBC 1 個短課＋IELTS/English Gym Speaking：刻意用 2 個本 Unit 新詞。',bbc:C1_BBC},
 {day:11,pages:'PDF 41–42',title:'Unit 1｜Writing Plan + Draft',main:'讀 PDF 41–42 Writing。先列 opening / 2–3 main points / local example / conclusion。',output:'寫 120–150 words 初稿；只檢查每段 clear point 與因果連接。'},
 {day:12,pages:'PDF 41–42',title:'Unit 1｜Writing Rewrite',main:'把昨天文章擴成約 180–220 words，先寫完，不要邊寫邊修。',output:'用 ChatGPT / Write & Improve 批改，只抓 2 個最重要問題，再重寫最弱的一段。'},
 {day:13,pages:'PDF 42–43',title:'Unit 1｜Speaking: Local Context',main:'讀 PDF 42–43：Speaking – In your local context。選 2 題，不用全部。',output:'每題講 60–90 秒，錄音；第二次只改善一件事。最後整理 Unit 1 最有用的 5 個 chunks。'},
 {day:14,pages:'PDF 29–43',title:'Unit 1 完成｜Mini Checkpoint',main:'快速翻完整 Unit 1；不看課本寫 8 個還記得的字／片語／概念。',output:'Speaking 90 秒＋Writing 80–100 words：What was the most useful thing I learned in Unit 1? Reading/Listening/Speaking/Writing 各自評 1–5。'}
];

function c1State(){
  if(!st.curriculum)st.curriculum={start:C1_START,completed:{},notes:{},unit:1};
  if(!st.curriculum.completed)st.curriculum.completed={};
  return st.curriculum;
}
function c1LocalDate(){
  const d=new Date(),y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function c1DayForDate(){
  const a=new Date(C1_START+'T12:00:00'),b=new Date(c1LocalDate()+'T12:00:00');
  const n=Math.floor((b-a)/86400000)+1;
  return Math.max(1,Math.min(14,n));
}
function c1Item(day=c1DayForDate()){return C1_PLAN[Math.max(0,Math.min(13,day-1))]}
function c1Count(){return Object.values(c1State().completed).filter(Boolean).length}
function c1Inject(){
  if(document.getElementById('c1SchoolHome')){c1Render();return}
  const css=document.createElement('style');
  css.textContent=`.c1Card{border:2px solid #d8ddce}.c1Today{background:var(--soft);border-radius:14px;padding:14px}.c1Bar{height:10px;background:#e7e8e2;border-radius:999px;overflow:hidden}.c1Bar>i{display:block;height:100%;background:#222}.c1Links{display:flex;gap:8px;flex-wrap:wrap}.c1Links a{display:inline-block;border:1px solid var(--line);padding:9px 12px;border-radius:10px;color:inherit;text-decoration:none;background:#fff}.c1Done{text-decoration:line-through;opacity:.65}`;
  document.head.appendChild(css);
  const home=document.createElement('div');home.id='c1SchoolHome';home.className='card c1Card';
  const anchor=document.getElementById('habitPanel');
  anchor.insertAdjacentElement('afterend',home);
  c1Render();
}
function c1Render(){
  const el=document.getElementById('c1SchoolHome');if(!el)return;
  const s=c1State(),day=c1DayForDate(),x=c1Item(day),done=!!s.completed[day],count=c1Count();
  const pct=Math.round(count/14*100);
  el.innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:flex-start">
      <div><span class="pill">v1.6・C1 School Year</span><h2 style="margin:8px 0 4px">📘 今日正課｜Day ${day}/14</h2><p class="small" style="margin:0">主課本 Sussex《Develop Your English》；BBC 只當 5–10 分鐘短補充；English Gym 負責輸出。</p></div>
      <div class="metric miniMetric"><span class="small">Unit 1</span><b>${count}/14</b><span class="small">完成</span></div>
    </div>
    <div class="c1Bar" style="margin:12px 0"><i style="width:${pct}%"></i></div>
    <div class="c1Today ${done?'c1Done':''}">
      <div class="row"><span class="pill">${esc(x.pages)}</span><span class="pill">約 60 分鐘</span>${done?'<span class="pill">✅ 已完成</span>':''}</div>
      <h3 style="margin-bottom:8px">${esc(x.title)}</h3>
      <p><b>00–30/40 主課本：</b>${esc(x.main)}</p>
      <p><b>剩餘時間輸出：</b>${esc(x.output)}</p>
      <div class="c1Links">
        <a href="${C1_SUSSEX}" target="_blank" rel="noopener">📖 Sussex 官方課本</a>
        ${x.bbc?`<a href="${x.bbc}" target="_blank" rel="noopener">🎧 BBC 短課</a>`:''}
        <a href="#" onclick="event.preventDefault();document.getElementById('area')?.scrollIntoView({behavior:'smooth'});">🎙️ English Gym</a>
      </div>
    </div>
    <div class="row" style="margin-top:12px">
      <button class="primary" onclick="c1CompleteToday()" ${done?'disabled':''}>${done?'今天已完成':'✅ 完成今日正課'}</button>
      <button onclick="c1ShowPlan()">看 14 天課表</button>
    </div>
    <div id="c1PlanBox" class="hidden"></div>
    <p class="small" style="margin-bottom:0">規則：照表操課，不補欠課。若今天狀態差，完成「主課本 20 分鐘＋口說 5 分鐘」也算出現。</p>`;
}
function c1ShowPlan(){
  const box=document.getElementById('c1PlanBox');if(!box)return;
  const s=c1State();box.classList.toggle('hidden');
  if(box.classList.contains('hidden'))return;
  box.innerHTML='<div class="stack" style="margin-top:12px">'+C1_PLAN.map(x=>`<div class="tip ${s.completed[x.day]?'c1Done':''}"><b>Day ${x.day}｜${esc(x.title)}</b><br><span class="small">${esc(x.pages)}</span></div>`).join('')+'</div>';
}
async function c1CompleteToday(){
  const s=c1State(),day=c1DayForDate();s.completed[day]=true;s.lastCompleted=c1LocalDate();
  await save();
  if(typeof hMark==='function')await hMark('course');
  c1Render();
  if(typeof hToast==='function')hToast('📘 今日正課完成。今天不用補更多。');
}
window.addEventListener('load',()=>setTimeout(c1Inject,600));
setTimeout(c1Inject,850);
