/* Speak Smart 9 — free, low-pressure clarity practice; no external paid API. */
const SS_TOPICS=[
['Do you prefer studying at home or at a library?','I prefer studying at a library because I can focus better. At home, I often end up playing with my cat or doing household chores.','Point → Reason → Example'],
['Why is learning a foreign language important?','I think learning another language is valuable because it helps us connect with people. For example, speaking French makes daily life in Geneva easier.','Point → Reason → Example'],
['Should people always try to be productive?','I understand why productivity matters, but rest is important too. For example, a short break helps me come back with more energy.','Acknowledge → Position → Reason'],
['What is one habit you would like to improve?','I want to spend less time scrolling on my phone because it distracts me from my priorities. For example, I could read for ten minutes instead.','Point → Reason → Example'],
['How would you ask someone to speak more slowly?','Could you speak a little more slowly, please? I want to make sure I understand the details.','Request → Reason'],
['Tell me about a time you solved a small problem.','I was distracted at home, so I decided to work at a library. As a result, I was able to focus on my reading.','Situation → Change → Result'],
['Do you think children should have more free time?','I think children need unstructured time because it encourages creativity. For example, they can invent their own games instead of following instructions.','Point → Reason → Example'],
['What makes a conversation enjoyable?','For me, a good conversation involves curiosity and listening. For instance, asking a follow-up question can make the other person feel heard.','Point → Reason → Example']
];
let ssStep=0,ssIndex=0,ssStart=0,ssFirst='',ssSecond='';
function ssData(){if(!st.speakSmart9)st.speakSmart9={completed:0,sessions:[],next:0};return st.speakSmart9}
function ssHome(){
 const el=document.getElementById('ss9Home');if(!el)return;
 const data=ssData();el.innerHTML='<div class="row" style="justify-content:space-between"><div><span class="pill">免費・9 分鐘・低壓</span><h2>🗣️ Speak Smart 9</h2><p class="small">練習 Point → Reason → Example、自然表達與一次 retry。選它就不用再加做 Gym。</p></div><span class="pill">已完成 '+data.completed+' 次</span></div><button class="primary" onclick="ssOpen()">開始 9 分鐘</button><p class="small">每週 2 次即可；沒有連勝、沒有補課債。錄音與逐字稿不會上傳儲存。</p>';
}
function ssOpen(){
 if(!currentUser)return;
 ssIndex=ssData().next%SS_TOPICS.length;ssStep=0;ssStart=Date.now();ssFirst='';ssSecond='';
 document.getElementById('ss9Box').classList.remove('hidden');ssRender();
 document.getElementById('ss9Box').scrollIntoView({behavior:'smooth',block:'start'});
}
function ssRender(){
 const box=document.getElementById('ss9Box');if(!box)return;
 const q=SS_TOPICS[ssIndex],steps=['Warm-up｜開口','Think｜先想清楚','Speak｜說第一次','Feedback｜只改一件事','Retry｜再說一次'];
 const scripts=[
 '<p>先朗讀兩次：<b>I think… because… For example…</b><br>放慢速度，有停頓就好。</p>',
 '<p>想出你的 <b>立場、原因、例子</b>，不用事先寫完整稿。</p>',
 '<p>不看範例，口說約 45–60 秒。完成後才進入下一步。</p>',
 '<p>檢查是否有 <b>Point / Reason / Example</b>。只挑一個最想改善的地方。</p>',
 '<p>再講 30–60 秒。試著把改善點自然地用出來；說完就可以完成，不需要追求完美。</p>'
 ];
 box.innerHTML='<div class="row" style="justify-content:space-between"><h2>Speak Smart 9｜'+(ssStep+1)+'/5</h2><button onclick="ssClose()">關閉</button></div>'+
 '<p class="small">建議：1 分暖身、2 分思考、2 分初說、2 分回饋、2 分重說。時間是參考，不會倒數催促。</p>'+
 '<div class="tip"><b>題目：</b>'+esc(q[0])+'<br><span class="small">'+esc(q[2])+'</span></div>'+
 '<h3>'+steps[ssStep]+'</h3>'+scripts[ssStep]+
 (ssStep===3?'<details><summary>看自然英文範例（可選）</summary><p>'+esc(q[1])+'</p></details><p class="small">回想上次的重點：先說立場，再補充原因和具體例子。</p>':'')+
 (ssStep===2||ssStep===4?'<p class="small">可以直接用嘴巴練；不必上傳錄音。若要 ChatGPT 幫忙批改，可自行貼轉錄。</p><textarea id="ssText" rows="3" placeholder="口說轉錄（選填，不會上傳儲存）"></textarea><button onclick="ssCopyPrompt()">複製給 ChatGPT 批改的文字</button>':'')+
 '<div class="row" style="margin-top:14px">'+(ssStep?'<button onclick="ssBack()">上一步</button>':'')+
 '<button class="primary" onclick="'+(ssStep===4?'ssFinish()':'ssNext()')+'">'+(ssStep===4?'✅ 完成今天':'下一步')+'</button></div>';
}
function ssCopyPrompt(){
 const v=document.getElementById('ssText')?.value.trim()||'';
 const prompt='請以 Speak Smart 9 教練身分評估。題目：'+SS_TOPICS[ssIndex][0]+'\n口說轉錄：'+(v||'（請在此貼上我的口說轉錄）')+'\n只看意思清楚、Point-Reason-Example 結構、最值得修的一項問題。給精簡自然版、稍高階版和30秒 retry；不要過度糾正。';
 navigator.clipboard?.writeText(prompt).then(()=>{if(typeof hToast==='function')hToast('文字已複製，可貼到 ChatGPT')}).catch(()=>{window.prompt('請複製下列文字：',prompt)});
}
function ssNext(){if(ssStep===2)ssFirst=document.getElementById('ssText')?.value||'';if(ssStep<4)ssStep++;ssRender()}
function ssBack(){if(ssStep>0)ssStep--;ssRender()}
function ssClose(){document.getElementById('ss9Box')?.classList.add('hidden')}
async function ssFinish(){
 ssSecond=document.getElementById('ssText')?.value||'';
 const data=ssData();data.completed++;data.next=(ssIndex+1)%SS_TOPICS.length;
 data.sessions.push({date:new Date().toISOString(),topic:ssIndex,minutes:9,kind:'speakSmart9'});
 if(data.sessions.length>80)data.sessions=data.sessions.slice(-80);
 await save();if(typeof hMark==='function')await hMark('smart');
 ssClose();ssHome();
 if(typeof hToast==='function')hToast('🗣️ 9 分鐘練習完成。今天就夠了。');
}
window.addEventListener('load',ssHome);setTimeout(ssHome,1000);
