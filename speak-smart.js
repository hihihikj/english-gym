/* Speak Smart 9 — free, low-pressure clarity practice; no external paid API. */
const SS_TOPICS=[
 ['What makes Geneva an interesting place to live?','I think Geneva is interesting because people from many different countries live and work here. For example, I can meet people with very different experiences.','Point → Reason → Example'],
 ['What makes a city worth visiting?','For me, a city is worth visiting when it has interesting history and beautiful streets. For example, I enjoy discovering places with distinctive architecture.','Point → Reason → Example'],
 ['What can people learn from living abroad?','Living abroad helps us understand different habits and perspectives. For instance, I have learned to communicate with people from many backgrounds.','Point → Reason → Example'],
 ['Why do people from different countries meet in Geneva?','Geneva is home to many international organisations. People come here to discuss global challenges, exchange information and cooperate across borders.','Point → Reason → Example'],
 ['How can small countries make their voices heard in international organisations?','Smaller countries can build coalitions and contribute specialised expertise. For example, cooperation on public health can help them influence discussions beyond their economic size.','Point → Reason → Example'],
 ['Should diplomats speak publicly or negotiate privately during a crisis?','I think both approaches can be useful. Public statements signal a position, while private negotiations may create room for compromise. The right balance depends on the situation.','Compare → Position → Reason'],
 ['How would you explain Taiwan’s international participation to a new friend?','Taiwan participates in many international networks through trade, technology and people-to-people exchanges. I would explain its contribution with a concrete example and invite questions.','Point → Evidence → Example'],
 ['What does a good diplomat do when two sides disagree?','A good diplomat listens carefully, identifies shared interests and clarifies misunderstandings. For instance, agreeing on definitions can make further negotiation possible.','Point → Reason → Example'],
 ['Should countries restrict exports of advanced technology?','Export controls can protect security interests, but they may also disrupt supply chains. Governments should assess both consequences before adopting broad restrictions.','Position → Trade-off → Recommendation'],
 ['How should international organisations respond to a humanitarian crisis?','I would prioritise reliable information and cooperation with local partners. Clear coordination can prevent duplication and help assistance reach the people who need it.','Priority → Reason → Example'],
 ['Do you think AI will change the work of diplomats?','AI could help diplomats summarise documents and compare information. However, human judgement will remain important when trust and political context matter.','Benefit → Limitation → Conclusion'],
 ['What makes a public statement persuasive?','A persuasive statement should be concise, evidence-based and respectful. It should acknowledge concerns rather than simply repeat a strong position.','Claim → Evidence → Implication'],
 ['How would you politely challenge a claim in a meeting?','I understand your point, but could we look more closely at the evidence? I think we should separate confirmed facts from assumptions before deciding.','Acknowledge → Question → Suggestion'],
 ['What can international visitors learn from living in Geneva?','Geneva brings together people with different professional and cultural backgrounds. Meeting them can make international issues feel more concrete and personal.','Point → Reason → Example'],
 ['Tell a mystery story in which one small clue changes everything.','At first, I thought someone had stolen the missing file. Then I noticed an outdated room number. The file had simply been moved to another archive.','Situation → Clue → Revelation'],
 ['Why is it important to change your mind when new evidence appears?','Changing our minds is not a sign of weakness. It shows that we are willing to test our assumptions and make better decisions when new information becomes available.','Position → Reason → Illustration'],
 ['How could AI help public agencies without replacing human judgement?','AI can save time on routine summaries. However, officials should review sensitive information because an inaccurate summary may influence serious decisions.','Benefit → Risk → Safeguard'],
 ['Should smaller countries prioritise partnerships or independence?','I would favour a balanced strategy. Partnerships can increase influence, but maintaining some flexibility helps countries protect their own priorities.','Position → Trade-off → Conclusion']
]
let ssStep=0,ssIndex=0,ssStart=0,ssFirst='',ssSecond='';
function ssData(){if(!st.speakSmart9)st.speakSmart9={completed:0,sessions:[],next:0};return st.speakSmart9}
function ssHome(){
 const el=document.getElementById('ss9Home');if(!el)return;
 const data=ssData();el.innerHTML='<div class="row" style="justify-content:space-between"><div><span class="pill">免費・9 分鐘・低壓</span><h2>🗣️ Speak Smart 9｜外交・推理・科技</h2><p class="small">選感興趣的題目，練清晰表達＋一次 retry。選這個就不用再加做 Gym。</p></div><span class="pill">已完成 '+data.completed+' 次</span></div><label class="small" for="ssTopicChoice">今天想講什麼？</label><select id="ssTopicChoice">'+SS_TOPICS.map((q,i)=>'<option value="'+i+'" '+(i===data.next?'selected':'')+'>'+esc(q[0])+'</option>').join('')+'</select><button class="primary" onclick="ssOpen()">開始 9 分鐘</button><p class="small">每週 1–2 次即可；沒有連勝或補課債。口說全文不會存入雲端。</p>';
}
function ssOpen(){
 if(!currentUser)return;
 ssIndex=Number(document.getElementById("ssTopicChoice")?.value??ssData().next)%SS_TOPICS.length;ssStep=0;ssStart=Date.now();ssFirst='';ssSecond='';
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
