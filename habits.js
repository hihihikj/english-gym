/* English Gym v1.4 — process-first habit layer.
   No paid APIs. Stores only lightweight progress inside the existing state object. */
let hRecallQueue=[],hRecallIndex=0,hRecallRevealed=false;

function hState(){
  if(!st.habit)st.habit={};
  if(!st.habit.activities)st.habit.activities={};
  if(!st.habit.plan)st.habit.plan={cue:'完成一個固定日常動作後',action:'gym5'};
  if(!st.habit.phraseReview)st.habit.phraseReview={};
  return st.habit;
}
function hDateKey(d=new Date()){
  const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function hWeekDates(){
  const now=new Date(),offset=(now.getDay()+6)%7,monday=new Date(now);monday.setHours(12,0,0,0);monday.setDate(now.getDate()-offset);
  return Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d});
}
function hActiveTypes(rec){return rec?Object.keys(rec).filter(k=>rec[k]):[]}
function hGrowth(days){return days>=5?'🌳':days>=3?'🌿':days>=1?'🌱':'🪴'}
function hToast(msg){
  let x=document.getElementById('habitToast');
  if(!x){x=document.createElement('div');x.id='habitToast';x.className='habitToast';document.body.appendChild(x)}
  x.textContent=msg;x.classList.add('show');clearTimeout(hToast.t);hToast.t=setTimeout(()=>x.classList.remove('show'),2200);
}
async function hMark(type){
  const hs=hState(),k=hDateKey();if(!hs.activities[k])hs.activities[k]={};
  hs.activities[k][type]=true;
  const cutoff=new Date();cutoff.setDate(cutoff.getDate()-120);const cut=hDateKey(cutoff);
  Object.keys(hs.activities).filter(x=>x<cut).forEach(x=>delete hs.activities[x]);
  await save();hRender();hToast('✅ 今天已經出現了。少量也算。');
}
function hTopFocus(){
  const tags=st.speakingTags||{},top=Object.entries(tags).sort((a,b)=>b[1]-a[1])[0];
  return top?top[0]:'先把完整意思說完，不追求完美。';
}
function hRender(){
  const hs=hState(),box=document.getElementById('habitPanel');if(!box)return;
  const days=hWeekDates(),today=hDateKey(),activeDays=days.filter(d=>hActiveTypes(hs.activities[hDateKey(d)]).length).length;
  const names=['一','二','三','四','五','六','日'];
  const icons={gym:'🎙️',reading:'📖',recall:'🧠'};
  const tiles=days.map((d,i)=>{
    const k=hDateKey(d),types=hActiveTypes(hs.activities[k]),inside=types.length?types.map(t=>icons[t]||'✓').join(''):'·';
    return `<div class="habitDay ${types.length?'done':''} ${k===today?'today':''}"><span>週${names[i]}</span><b>${inside}</b></div>`
  }).join('');
  const cue=esc(hs.plan.cue||'完成一個固定日常動作後'),action=hs.plan.action||'gym5';
  box.innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:flex-start"><div><span class="pill">v1.4・過程優先</span><h2 style="margin:8px 0 4px">${hGrowth(activeDays)} 本週英文足跡</h2><p class="small" style="margin:0">不是連勝。空白日不扣分；重新出現就繼續。</p></div><div class="metric miniMetric"><span class="small">本週出現</span><b>${activeDays}/5</b><span class="small">天</span></div></div>
    <div class="habitWeek">${tiles}</div>
    <div class="tip"><b>今天只專注 1 件事：</b> ${esc(hTopFocus())}</div>
    <details style="margin-top:12px"><summary><b>⚓ 我的「看到線索就開始」計畫</b></summary>
      <div class="stack" style="margin-top:12px"><label class="small">當我……</label><input id="habitCue" value="${cue}" maxlength="90" />
      <label class="small">我就先做……</label><select id="habitAction"><option value="gym5" ${action==='gym5'?'selected':''}>English Gym 5 分鐘</option><option value="reading" ${action==='reading'?'selected':''}>Reading 10</option><option value="recall" ${action==='recall'?'selected':''}>Phrase Recall 3</option></select>
      <div class="row"><button onclick="hSavePlan()">儲存這個線索</button><button class="primary" onclick="hStartPlan()">現在直接開始</button></div>
      <p class="small">例：刷完牙後／喝完第一杯咖啡後／坐到書桌前。固定線索比只靠「等有動力」更容易啟動。</p></div></details>`;
  hRenderRecallHome();
}
async function hSavePlan(){
  const hs=hState(),cue=document.getElementById('habitCue')?.value.trim(),action=document.getElementById('habitAction')?.value;
  if(cue)hs.plan.cue=cue;if(action)hs.plan.action=action;await save();hToast('⚓ 已儲存。下次看到這個線索，就只做第一步。')
}
function hStartGym5(){
  const btn=document.querySelector('.mode button');if(btn)setMode(btn,5);else{mode=5;round=0;dash()}
  document.getElementById('area')?.scrollIntoView({behavior:'smooth',block:'center'});startSession();
}
function hStartPlan(){
  const action=document.getElementById('habitAction')?.value||hState().plan.action||'gym5';
  if(action==='reading')openReading10();else if(action==='recall')hStartRecall();else hStartGym5();
}
function hPhraseDueList(){
  const phrases=st.reading10?.phrases||[],rv=hState().phraseReview,today=hDateKey();
  const due=phrases.filter(x=>!rv[x.p]||!rv[x.p].due||rv[x.p].due<=today);
  return due.length?due:[];
}
function hRenderRecallHome(){
  const el=document.getElementById('phraseRecallHome');if(!el)return;
  const saved=st.reading10?.phrases?.length||0,due=hPhraseDueList().length;
  el.innerHTML=`<div><span class="pill">2–3 分鐘</span><h3 style="margin:8px 0 4px">🧠 Phrase Recall 3</h3><p class="small" style="margin:0">從 Reading 10 留下的片語中，最多主動回想 3 個。已存 ${saved} 個・今天到期 ${due} 個。</p></div><button class="primary" onclick="hStartRecall()" ${saved?'':'disabled'}>${saved?'開始回想':'先去 Reading 10 留片語'}</button>`;
}
function hStartRecall(){
  const due=hPhraseDueList();if(!due.length){hToast((st.reading10?.phrases?.length||0)?'🧠 今天沒有到期片語，不用硬背。':'先在 Reading 10 留下想學的 phrase。');return}
  hRecallQueue=due.slice(0,3);hRecallIndex=0;hRecallRevealed=false;
  const box=document.getElementById('phraseRecallBox');box.classList.remove('hidden');box.scrollIntoView({behavior:'smooth',block:'start'});hRenderRecallCard();
}
function hCloze(example,phrase){
  const safe=phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),re=new RegExp(safe,'i');
  return re.test(example)?example.replace(re,'_____'):example;
}
function hRenderRecallCard(){
  const box=document.getElementById('phraseRecallBox'),x=hRecallQueue[hRecallIndex];if(!box||!x)return;
  box.innerHTML=`<div class="row" style="justify-content:space-between"><span class="pill">${hRecallIndex+1}/${hRecallQueue.length}</span><button onclick="hCloseRecall()">關閉</button></div><h2>先把英文叫回來</h2><p><b>意思：</b>${esc(x.m)}</p><div class="tip"><span class="small">句子提示</span><p class="sentence" style="font-size:18px">${esc(hCloze(x.e,x.p))}</p></div><p class="small">先在心裡或大聲說答案，再揭曉。</p><div id="phraseReveal"><button class="primary" onclick="hRevealPhrase()">揭曉答案</button></div>`;
}
function hRevealPhrase(){
  const x=hRecallQueue[hRecallIndex],el=document.getElementById('phraseReveal');hRecallRevealed=true;
  el.innerHTML=`<div class="tip"><h3 style="margin-top:0">${esc(x.p)}</h3><p>${esc(x.e)}</p></div><p><b>剛才回想得怎樣？</b></p><div class="row"><button onclick="hRatePhrase('again')">想不起來</button><button onclick="hRatePhrase('hard')">有點卡</button><button class="primary" onclick="hRatePhrase('good')">想起來了</button></div>`;
}
async function hRatePhrase(rating){
  if(!hRecallRevealed)return;const x=hRecallQueue[hRecallIndex],rv=hState().phraseReview,old=rv[x.p]||{reps:0};
  let reps=old.reps||0,days=1;if(rating==='again'){reps=0;days=1}else if(rating==='hard'){reps=Math.max(1,reps);days=Math.min(3,[1,2,3][Math.min(reps,2)])}else{reps++;days=[1,3,7,14,30][Math.min(reps,4)]}
  const d=new Date();d.setDate(d.getDate()+days);rv[x.p]={reps,due:hDateKey(d),last:rating};await save();
  hRecallIndex++;hRecallRevealed=false;if(hRecallIndex<hRecallQueue.length)hRenderRecallCard();else{await hMark('recall');document.getElementById('phraseRecallBox').innerHTML='<div class="tip"><h3>✅ Recall 完成</h3><p>最多 3 個就停。讓間隔複習替你安排下一次。</p><button onclick="hCloseRecall()">完成</button></div>'}
}
function hCloseRecall(){document.getElementById('phraseRecallBox')?.classList.add('hidden')}

/* Keep the original learning engine, then add process reinforcement only after a real completion. */
const hOldDash=dash;
dash=function(){hOldDash();hRender()};
const hOldNextStage=nextStage;
nextStage=async function(){
  const finishing=stage===4&&round>=MODE_ROUNDS[mode];await hOldNextStage();if(finishing)await hMark('gym');
};
if(typeof r10Finish==='function'){
  const hOldR10Finish=r10Finish;
  r10Finish=async function(rating){await hOldR10Finish(rating);await hMark('reading')};
}
window.addEventListener('load',()=>setTimeout(hRender,500));
setTimeout(hRender,700);
