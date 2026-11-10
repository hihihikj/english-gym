/* English Gym v2.1 — B2 passport first, C1 diplomacy bridge.
   Fictional learning scenarios, not current news reports. No paid services.
   New progress in st.curriculum.pathwayV3; old progress preserved. */
const C1_SOURCES=[
  {name:'UN Geneva｜國際新聞',url:'https://www.ungeneva.org/en/news-media/news'},
  {name:'UNHCR｜人道故事',url:'https://www.unhcr.org/news/stories'},
  {name:'Cambridge｜B2 First',url:'https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/'},
  {name:'考選部｜外交特考公告',url:'https://wwwc.moex.gov.tw/Main/Exam/wFrmPropertyDetail.aspx?c=115140&m=7907'}
];
const C1_SKILLS=['reading','listening','speaking','writing'];
const C1_LABELS={reading:'📖 Reading',listening:'🎧 Listening',speaking:'🗣️ Speaking',writing:'✍️ Writing'};
const C1_TOPICS={
 diplomatic:{
  name:'外交・國關・日內瓦',
  reading:[
    {title:'A Difficult Briefing in Geneva',text:'At a fictional international meeting in Geneva, three delegations tried to agree on a statement about humanitarian access. The first delegation wanted strong language and a clear deadline. The second argued that setting a deadline without a realistic delivery plan could weaken trust. The third suggested a compromise: an immediate assessment followed by a review after two weeks. During the discussion, the chair noticed that participants were using the word “access” differently. Some meant permission to enter an area, while others meant the practical ability to move supplies safely. Before drafting the statement, the chair asked each group to define the term. This small clarification changed the discussion. Although the delegations still disagreed about the deadline, they eventually adopted wording that described both permission and logistics. The case shows that successful negotiation sometimes begins not with a major concession but with a precise definition.',q:'What helped the delegations make progress?',choices:['They cancelled the meeting','They clarified what “access” meant','They agreed to remove every deadline'],answer:1,why:'The chair clarified the different meanings of “access” before the statement was drafted.'},
    {title:'Public Statement or Quiet Negotiation?',text:'An imaginary foreign ministry faces a dilemma. A neighbouring country has introduced new inspections that slow down cross-border trade. Some advisers recommend a strongly worded public statement to reassure local businesses. Others believe that a private meeting would be more effective because public criticism could make compromise politically difficult. A junior diplomat proposes a two-part strategy. First, officials should gather evidence on how much time goods are losing at the border. Second, they should open technical talks while preparing a measured public message explaining the practical consequences. The minister agrees to review the evidence before deciding whether to escalate. The strategy does not guarantee a quick solution, but it creates a way to distinguish the economic problem from the political disagreement. It also demonstrates a useful principle: communication can be firm without being unnecessarily confrontational.',q:'What is the diplomat’s main recommendation?',choices:['Escalate immediately','Collect evidence and hold technical talks','Avoid communication altogether'],answer:1,why:'The two-part strategy combines evidence gathering, technical discussion and careful public messaging.'}
  ],
  listening:[
    {title:'A Delegate Requests Clarification',text:'Thank you, Chair. Our delegation supports the overall objective, but we would appreciate clarification on the proposed timetable. Is the two-week deadline intended for the initial assessment or for the delivery of all assistance? These are very different commitments. We suggest that the draft distinguish between them, so that each delegation understands what it is agreeing to. We would also welcome a brief update at the next meeting.',q:'What does the delegate want?',choices:['A clearer distinction between two deadlines','The cancellation of assistance','A new meeting in six months'],answer:0,why:'The delegate asks whether the timetable concerns assessment or complete delivery.'},
    {title:'A Short Diplomatic Briefing',text:'Good morning. I have three points for today’s briefing. First, the delegations remain divided on the scope of the proposed agreement. Second, they have made progress on information sharing, which could reduce misunderstandings. Third, the chair has asked each delegation to submit one practical proposal by Friday. My recommendation is to keep our public message constructive while making our concerns clear in the working group.',q:'Which area has improved?',choices:['A final treaty has been signed','Information sharing between delegations','All concerns have disappeared'],answer:1,why:'The speaker states that progress has been made on information sharing.'}
  ],
  speaking:[
    'Should diplomats make strong public statements or negotiate quietly when tensions rise?',
    'How would you explain Taiwan’s international participation to someone who knows little about it?',
    'How can two governments cooperate when they disagree about major political questions?',
    'What would you say in a meeting if a proposal sounded promising but lacked clear evidence?'
  ],
  writing:[
    'Write a short diplomatic email asking another delegation to clarify an unclear deadline. Be polite, precise and constructive.',
    'Write a brief recommendation comparing a public statement with a private negotiation. Include one risk and one advantage for each.',
    'Write a short briefing explaining why access to reliable information matters in international negotiations.',
    'Write a balanced argument: Should smaller countries prioritise alliances or strategic flexibility?'
  ],
  phrases:['We would appreciate clarification on…','Our main concern is…','A possible compromise would be…','The evidence suggests that…']
 },
 mystery:{
  name:'懸疑・推理・世界探索',
  reading:[
    {title:'The Missing File at the Archive',text:'A researcher arrived at a city archive to examine a document about an old railway project. The catalogue indicated that the file had been stored in Room Seven for decades. Yet the archivist could not find it. A computer record showed that it had been requested the previous afternoon. The person listed as the borrower was a colleague who had been abroad for two weeks. Instead of accusing anyone, the researcher compared the paper request form with the digital log. The form included the correct file number but an outdated room code. A member of staff then remembered moving several boxes during an emergency repair. After an hour of searching, they found the file in a temporary storage area. What initially looked like theft turned out to be a documentation error. The lesson was not that suspicion is always wrong, but that evidence should be checked before conclusions are announced.',q:'What ultimately explained the missing file?',choices:['A deliberate theft','A filing and room-code error','The document never existed'],answer:1,why:'The file had been moved and the outdated room code caused confusion.'},
    {title:'A Message from Platform Four',text:'An engineer working on a fictional night train noticed a repeated warning on the control panel. The warning appeared only when the train entered an old tunnel, yet inspections found no mechanical defect. A passenger claimed to have seen the lights flicker at exactly the same point on three journeys. Another suggested a supernatural explanation, but the engineer remained sceptical. She compared train logs with maintenance records and discovered that the warning started shortly after new communication equipment was installed beside the tunnel. A controlled test showed that radio interference, rather than mechanical failure, triggered the alert. The team repaired the shielding and monitored the train for a week. The warning disappeared. The mystery had an ordinary explanation, but solving it required patience, curiosity, and a willingness to revise an initial hypothesis.',q:'Which evidence led to the solution?',choices:['A supernatural explanation','Communication equipment installed near the tunnel','A passenger’s travel plans'],answer:1,why:'The warning began after new communications equipment was installed.'}
  ],
  listening:[
    {title:'An Investigator Checks a Timeline',text:'I want to clarify the sequence of events before we draw any conclusions. The building was locked at six thirty. The alarm sounded at seven fifteen, but the security camera stopped recording five minutes earlier. We know a technician visited the building that morning. What we do not know is whether the camera failure was connected to the alarm. Please separate confirmed facts from assumptions in your report.',q:'What does the investigator emphasise?',choices:['Separating facts from assumptions','Accusing the technician immediately','Ignoring the camera failure'],answer:0,why:'The speaker explicitly asks the team to distinguish confirmed facts and assumptions.'},
    {title:'A Scientist Explains an Unexpected Signal',text:'We first thought the signal was coming from the sensor itself, but the data did not support that theory. It appeared at regular intervals and only during heavy rain. We then tested the insulation and discovered a small leak that was affecting a nearby cable. The important point is that our initial explanation was plausible, but it was not correct. We changed our view when new evidence became available.',q:'Why did the team change its explanation?',choices:['They were ordered to','New evidence revealed a cable problem','The signal disappeared permanently'],answer:1,why:'Insulation tests identified the leak affecting the cable.'}
  ],
  speaking:[
    'Tell a short mystery story in which a small detail changes your conclusion.',
    'How would you explain the difference between a clue and reliable evidence?',
    'Should we trust our first impression when solving a problem?',
    'Describe an unexpected discovery and how it changed your mind.'
  ],
  writing:[
    'Write a concise incident report that separates facts, assumptions and unresolved questions.',
    'Write a story about a missing object and an unexpected but logical explanation.',
    'Explain why investigators should test alternative explanations.',
    'Write a short argument about why uncertainty can be useful in research.'
  ],
  phrases:['At first, I assumed that…','The evidence did not support…','A more plausible explanation is…','This changed my initial conclusion.']
 },
 technology:{
  name:'AI・科技・國際社會',
  reading:[
    {title:'An AI Tool at a Public Agency',text:'A fictional public agency is considering an artificial intelligence tool to help staff summarise long documents. Supporters expect the tool to save time, especially when reports arrive in several languages. Critics worry that summaries might omit exceptions or express uncertain findings as facts. The agency therefore tests the system with a set of documents that contain ambiguous terms and conflicting figures. It asks staff to record mistakes and review any conclusion before publication. After the pilot, managers find that the tool performs well on routine summaries but struggles with legal qualifications. They decide to use it for first drafts rather than final decisions. The result illustrates an important trade-off: automation can improve efficiency, but professional judgement remains necessary when accuracy and accountability matter.',q:'How does the agency decide to use AI?',choices:['For unreviewed final decisions','For first drafts with human review','To replace every staff member'],answer:1,why:'Managers decide to use AI for first drafts rather than final decisions.'},
    {title:'Who Controls Critical Technology?',text:'Imagine two countries that rely on imported chips for communication networks. One government argues that local production is essential for national security. The other prefers diversified suppliers because building a complete domestic industry would be expensive and slow. A group of economists suggests that the choices are not mutually exclusive. Governments could strengthen selected domestic capabilities while maintaining several reliable trading partners. The group also warns that sudden restrictions may raise costs for consumers and create political friction. Decision-makers need to compare resilience, price, innovation and diplomatic consequences instead of focusing on a single objective. There is no perfect answer, but a transparent assessment of trade-offs can improve public debate.',q:'What is the economists’ proposed approach?',choices:['Depend on one supplier','Combine selective domestic capacity with diversified partners','Ban all international trade'],answer:1,why:'They suggest selective domestic capability plus diversified international suppliers.'}
  ],
  listening:[
    {title:'An AI Policy Update',text:'The pilot project produced encouraging results, but we should be careful not to overstate them. The tool reduced the time required for routine summaries. However, human reviewers still found mistakes in complex legal documents. Our next step is to expand testing and publish clear guidelines about when staff must verify the output. Speed matters, but accuracy and accountability matter just as much.',q:'What problem remains?',choices:['Errors in complex legal documents','A shortage of office chairs','An inability to process routine summaries'],answer:0,why:'Human reviewers found mistakes when legal documents were complex.'},
    {title:'A Supply Chain Briefing',text:'We recommend avoiding excessive dependence on a single supplier. Diversification may increase short-term costs, but it could reduce the impact of future disruptions. The policy team also suggests regular communication with trade partners, since unexpected restrictions can create uncertainty for both companies and governments. Our goal is to improve resilience without unnecessarily damaging cooperation.',q:'Why does the team recommend diversification?',choices:['To reduce disruption risks','To end all trade','To lower every short-term cost'],answer:0,why:'Diversification aims to reduce exposure to future disruptions.'}
  ],
  speaking:[
    'Should governments regulate artificial intelligence more strictly?',
    'How could AI help international organisations without replacing human judgement?',
    'What are the risks of relying on one country for important technology?',
    'How would you explain a difficult AI policy choice to the public?'
  ],
  writing:[
    'Write a short recommendation about responsible AI use in a public agency.',
    'Compare the advantages and disadvantages of restricting technology exports.',
    'Explain how technology can support international humanitarian work while creating new risks.',
    'Write a balanced argument about innovation, regulation and accountability.'
  ],
  phrases:['One potential benefit is…','However, an important limitation is…','This raises questions about…','A balanced approach would…']
 }
};
/* Additional original materials so each 4-skill round advances rather than repeats. */
const C1_EXTRA={
 diplomatic:{
  reading:[
   {title:'A Humanitarian Corridor',text:'In a fictional negotiation, humanitarian agencies ask two parties to allow a safe route for medical supplies. Both sides say they support helping civilians, but they disagree about who should monitor the route. One side wants independent observers, while the other argues that foreign monitors would threaten sovereignty. A mediator proposes a limited pilot with agreed reporting rules and a joint review after the first deliveries. This does not settle the wider conflict, but it narrows the immediate dispute. The mediator also insists that both parties distinguish their public political positions from the practical requirements of delivering medicine. During the pilot, observers will report delays without assigning blame before the evidence is reviewed. The arrangement shows how an apparently impossible negotiation can sometimes move forward through small, verifiable commitments. Its success still depends on implementation, not merely on signing a document.',q:'Why does the mediator recommend a pilot?',choices:['To avoid any monitoring','To test a limited practical arrangement','To settle the entire conflict immediately'],answer:1,why:'The limited pilot allows monitoring and review without resolving the entire political dispute.'},
   {title:'An Ambassador Weighs Two Risks',text:'A fictional ambassador must brief her government about a proposed economic agreement. The deal could open a new market for local exporters, but it may also increase dependence on a trading partner that has recently changed its regulations without warning. The ambassador asks her team to separate immediate commercial benefits from strategic risks. Some advisers favour signing quickly to secure access before competitors arrive. Others argue that stronger dispute-resolution provisions should be negotiated first. Rather than describe the issue as a simple choice between growth and security, the ambassador recommends a phased agreement with periodic reviews and transparent indicators. She also notes an important uncertainty: market forecasts depend on assumptions that could change within a year. Her briefing aims to help decision-makers understand not only what might happen, but what evidence would cause her recommendation to change.',q:'Which feature makes the recommendation more cautious?',choices:['A phased agreement with periodic reviews','A ban on trade forecasts','Refusing to speak with exporters'],answer:0,why:'The ambassador recommends stages, reviews and transparent evidence rather than an unconditional commitment.'}
  ],
  listening:[
   {title:'A Humanitarian Meeting',text:'Before we finalise this arrangement, I would like to confirm three details. Who will collect information about delays? How will we report incidents that have not yet been verified? And when will both parties review the pilot? Our aim is not to resolve every disagreement today. It is to establish a practical process that can be monitored and adjusted if problems arise.',q:'What is the speaker’s immediate aim?',choices:['Resolve every political disagreement','Establish a verifiable process','Stop all deliveries'],answer:1,why:'The speaker proposes a practical process to monitor and adjust.'},
   {title:'An Ambassador’s Recommendation',text:'There is a credible economic opportunity, but I would not recommend an unconditional agreement at this stage. The projected gains rely on assumptions about future trade rules. I suggest a phased approach, clear review dates and a mechanism for addressing unexpected restrictions. We should explain that this recommendation is cautious, not hostile. Our goal is to protect cooperation by managing risk.',q:'Why does the ambassador prefer a phased approach?',choices:['To manage uncertainty in trade rules','To prevent any future negotiations','Because the agreement has no benefits'],answer:0,why:'The recommendation recognises opportunities but limits exposure to unpredictable regulation.'}
  ]
 },
 mystery:{
  reading:[
   {title:'The Case of the Altered Map',text:'A historian finds two maps of the same mountain pass in a museum archive. Both are labelled with the same year, yet one shows a bridge that the other omits. A dramatic explanation would be that somebody altered the historical record deliberately. Before making that claim, the historian checks the printing marks and discovers that the documents come from different editions. The later edition was updated after a flood destroyed an older crossing and forced the construction of a new bridge. The archive had attached the same approximate date to both maps during a cataloguing project. The historian writes a short note explaining the uncertainty and asks the museum to revise the labels. What appears to be a conspiracy can sometimes result from incomplete documentation. Nevertheless, the difference was worth investigating because it revealed a real change in the landscape and the way information had been recorded.',q:'Why were the maps different?',choices:['They belonged to different updated editions','One was certainly forged','The bridge was imaginary'],answer:0,why:'Different editions and an approximate catalogue date caused the discrepancy.'},
   {title:'An Unreliable Witness',text:'During a fictional inquiry into a missing painting, three witnesses report hearing a door close at midnight. A researcher initially treats their accounts as independent evidence, but discovers that all three discussed the event together before being interviewed. Their descriptions are remarkably similar, including an unusual expression used by the first witness. The investigator explains that agreement between witnesses is not always proof of accuracy if their memories may have influenced one another. She looks for additional records and finds a repair log showing that a security door had been malfunctioning for several days. The inquiry is not over, but the team now has a more reliable line of investigation. The experience illustrates a wider reasoning skill: before counting sources as separate confirmation, ask whether they depend on the same original information.',q:'What reduces the independence of the witnesses?',choices:['They were interviewed separately','They discussed the event before their interviews','They were in different cities'],answer:1,why:'Their accounts may have influenced each other before the inquiry.'}
  ],
  listening:[
   {title:'The Map Archive',text:'We should not assume that the difference between the maps proves deliberate tampering. The printing marks suggest two editions, and the archive uses approximate dates. I recommend checking local records about the bridge and adding a note to the catalogue until we understand the sequence more clearly. It is better to explain uncertainty than to make a dramatic but unsupported claim.',q:'What does the researcher recommend?',choices:['Publish an accusation','Investigate editions and local records','Ignore the difference'],answer:1,why:'The researcher wants the team to verify the editions and document uncertainty.'},
   {title:'A Witness Statement',text:'The three witnesses gave similar descriptions, but we should be cautious. They spoke to one another before the interviews, so their memories may no longer be independent. The security logs might offer a separate source of evidence. Please check whether the door had any known faults before we decide what happened that night.',q:'What additional source does the investigator suggest?',choices:['Security logs','Online rumours','Another discussion between the witnesses'],answer:0,why:'The investigator asks the team to examine security logs as independent evidence.'}
  ]
 },
 technology:{
  reading:[
   {title:'A Regional Agreement on AI Safety',text:'Several fictional governments are considering a regional agreement on the use of artificial intelligence in public services. All support innovation, but they differ in how much oversight companies should face. One country wants strict licensing rules; another argues that extensive regulation could limit small businesses. Instead of drafting a universal rule immediately, the negotiators agree on shared principles: transparency, clear responsibility for errors, and opportunities for independent evaluation. Each government would be free to develop specific regulations, but they would compare results after one year. Critics say such principles may be too vague to protect the public. Supporters respond that shared definitions are a realistic starting point when countries have different legal systems. The debate is not simply about choosing between safety and innovation. It is about designing institutions that can adapt as technology changes.',q:'What do negotiators agree on first?',choices:['Shared principles and later evaluation','A single strict law for all countries','A total ban on public-service AI'],answer:0,why:'They adopt common principles while leaving detailed laws to individual governments.'},
   {title:'Technology Restrictions and Diplomatic Costs',text:'An imaginary government is preparing restrictions on advanced components that could have military applications. Security officials argue that the measure is necessary to reduce strategic risks. Industry representatives warn that the same components are also used in civilian research, and broad restrictions could delay important projects. A policy analyst recommends narrow definitions, clear exemptions and regular reviews. She also suggests consulting affected trade partners before publishing the final rules, because surprise announcements might damage cooperation. Neither side can predict the exact economic impact, so the analyst highlights the evidence available and the areas of uncertainty. The proposal does not remove the tension between openness and security, but it provides a way to make the trade-off more explicit. Good policy analysis should explain which assumptions matter and how decisions could be revised.',q:'What is the main purpose of narrow exemptions and reviews?',choices:['To make restrictions more proportionate','To remove security considerations','To guarantee zero economic impact'],answer:0,why:'Narrow rules and reviews seek a balance between risk reduction and civilian uses.'}
  ],
  listening:[
   {title:'AI Safety Negotiation',text:'The delegations have not reached agreement on one detailed regulation, but they support three common principles. First, public agencies should explain how they use automated tools. Second, someone must be responsible when those tools make mistakes. Third, independent evaluations should be possible. We propose reviewing implementation next year instead of claiming that the problem has already been solved.',q:'Which principle is mentioned?',choices:['No responsibility for mistakes','Independent evaluation','Permanent secrecy'],answer:1,why:'The speaker explicitly includes independent evaluations.'},
   {title:'Trade Policy Advice',text:'Our assessment recognises the security concerns, but a broad ban could affect civilian research. We recommend defining the restricted components precisely, identifying appropriate exemptions and consulting important partners before the announcement. We also need a review date, because the technology and its uses are changing quickly. The strongest policy is one that can be adjusted when better evidence appears.',q:'What does the analyst advise?',choices:['Broad restrictions with no review','Precise rules and partner consultation','Avoiding any security analysis'],answer:1,why:'The analyst recommends precise definitions, exceptions, consultation and review.'}
  ]
 }
};
for(const k of Object.keys(C1_EXTRA)){
 C1_TOPICS[k].reading.push(...C1_EXTRA[k].reading);
 C1_TOPICS[k].listening.push(...C1_EXTRA[k].listening);
}

const C1_LEVELS=[
 {title:'B2 起步｜把意思講完整',word:'80–120',min:80,max:120,aim:'結論、原因、具體例子'},
 {title:'B2 進階｜比較與解釋',word:'110–150',min:110,max:150,aim:'比較選項、說明取捨'},
 {title:'B2 練習檢核｜完整四技能',word:'140–190',min:140,max:190,aim:'立場、證據、反方意見'},
 {title:'C1 銜接｜細緻論證',word:'180–230',min:180,max:230,aim:'限制、權衡與清楚的建議'}
];
let c1Answer=null,c1MaterialIndex=0,c1Draft='',c1Spoken=false;
function c1State(){
 if(!st.curriculum)st.curriculum={completed:{},notes:{},unit:1};
 if(!st.curriculum.pathwayV3)st.curriculum.pathwayV3={completed:{},topic:'diplomatic',answers:{}};
 return st.curriculum.pathwayV3;
}
function c1Count(){return Object.keys(c1State().completed).filter(k=>c1State().completed[k]&&Number(k)>=1&&Number(k)<=16).length}
function c1NextNum(){for(let i=1;i<=16;i++)if(!c1State().completed[i])return i;return 16}
function c1Render(){
 const el=document.getElementById('c1SchoolHome');if(!el||!currentUser)return;
 const s=c1State(),count=c1Count(),all=count===16,num=c1NextNum(),tier=Math.floor((num-1)/4),skill=C1_SKILLS[(num-1)%4],data=C1_TOPICS[s.topic]||C1_TOPICS.diplomatic;
 const materialIndex=Math.floor((num-1)/4);
 const block=data[skill],unit=skill==='reading'||skill==='listening'?block[materialIndex]:null;
 const resource=C1_SOURCES.map(x=>'<a href="'+x.url+'" target="_blank" rel="noopener noreferrer">'+esc(x.name)+'</a>').join(' · ');
 el.innerHTML='<div class="row" style="justify-content:space-between;align-items:start"><div><span class="pill">B2 檢定 → C1｜興趣導向</span><h2>🎓 英文主線：B2 通關，C1 進階</h2><p class="small">每週挑 3 次，每次約 20–30 分鐘；不補課。先通過正式英檢 B2 四技能，再持續往 C1。</p></div><span class="pill">'+count+'/16</span></div>'+
 '<div class="c1Bar" style="margin:12px 0"><i style="width:'+(count/16*100)+'%"></i></div>'+
 '<div class="tip"><b>'+C1_LEVELS[tier].title+'</b>｜下一堂 '+num+'/16：'+C1_LABELS[skill]+'<p class="small">四技能輪替，不會只練口說。每 4 堂完成一輪。</p></div>'+
 '<label class="small" for="c1Topic">挑你今天真正想讀的主題</label><select id="c1Topic" onchange="c1TopicChanged(this.value)">'+
 Object.entries(C1_TOPICS).map(([k,v])=>'<option value="'+k+'" '+(s.topic===k?'selected':'')+'>'+esc(v.name)+'</option>').join('')+'</select>'+
 (all?c1AdvancedHtml(s):'<div class="c1Today" style="margin-top:12px">'+
 '<div class="row"><span class="pill">'+C1_LABELS[skill]+'</span><span class="pill">20–30 分鐘</span><span class="pill">原創模擬情境・非即時新聞</span></div>'+
 '<h3 style="margin-top:10px">'+esc(unit?unit.title:skill==='writing'?'Briefing / opinion writing':'Clear speaking / diplomacy')+'</h3>'+
 c1LessonContent(skill,data,materialIndex,num)+
 '<div class="tip" style="margin-top:10px"><b>今天可用的英文：</b> '+esc(data.phrases[tier])+'</div>'+
 '<div id="c1Feedback" style="margin-top:12px"></div>'+
 '<div class="row" style="margin-top:12px"><button class="primary" onclick="c1CompleteToday()">✅ 完成這一堂</button><button onclick="c1ChangeTopic()">換題材</button></div></div>')+
 '<details style="margin-top:14px"><summary><b>如何申請 B2 英檢？／官方閱讀資源</b></summary>'+
 '<p class="small">外交特考英文組與國際法組須有報名前 3 年內、含聽說讀寫的有效 B2 證明；需依報考年度公告確認採認測驗及四項門檻。這個程式不是官方測驗，也不會推定你已取得 B2。</p>'+
 '<div class="c1Links">'+resource+'</div><p class="small">官方新聞可自行選有趣的文章；不會把即時新聞混充成程式內的原創題材。</p></details>'+
 '<p class="small">最低門檻：10 分鐘也值得。若今天真的不喜歡題材，直接換，不必硬讀。</p>';
}
/* Ongoing C1 elective labs after the 16-session B2-to-C1 bridge.
   These are self-directed activities using official editorial sources, not a proficiency certificate. */
function c1AdvancedHtml(s){
 const n=(s.advancedSessions||[]).length,skill=C1_SKILLS[n%4],topic=s.topic;
 const work={
  reading:'從下方 UN Geneva 或 UNHCR 官方網站挑一篇你感興趣的英文文章（外交、國際危機、科技政策等），讀 15 分鐘。整理作者主張、兩項證據，以及一個未解決的問題；標出事實與評論。',
  listening:'從 UN Geneva 官方 News & Media 頁面選一段你願意聽的英文影音或訪談，聽 2–5 分鐘兩次。第一次抓主旨，第二次找兩個細節。說出「講者有什麼不確定性」。',
  speaking:'選一則你剛讀過的國關或科技故事，做 2 分鐘簡報：立場 → 背景 → 兩個理由 → 反方疑慮 → 建議。再用 30 秒回答假想追問。',
  writing:'就最近讀過的國關、AI 或人道議題撰寫 180–250 字英文 policy brief。先寫結論與建議，再寫證據、可能反對理由和限制；最後自己修正兩處。'
 };
 const link=topic==='diplomatic'?'https://www.ungeneva.org/en/news-media/news':topic==='technology'?'https://www.unhcr.org/news/stories':'https://www.ungeneva.org/en/news-media';
 return '<div class="c1Today" style="margin-top:12px"><span class="pill">C1 延伸練習｜第 '+(n+1)+' 次</span><h3>'+C1_LABELS[skill]+'・自主深度任務</h3><p>'+work[skill]+'</p>'+
 '<p class="small">題材由你決定；不強迫完成不感興趣的新聞。閱讀／聽力材料來自外部官方網站，程式不會假裝自動更新即時內容。</p>'+
 '<div class="c1Links"><a href="'+link+'" target="_blank" rel="noopener noreferrer">開啟官方素材庫</a></div>'+
 '<label class="c1Option"><input id="c1AdvancedDone" type="checkbox"> 我已完成今天這項技能的練習</label>'+
 '<button class="primary" onclick="c1AdvancedFinish()">記錄這次 C1 深度練習</button>'+
 '<p class="small">已記錄 '+n+' 次 C1 延伸練習。這只是練習紀錄；能力級別仍須由正式測驗和專業評估確認。</p></div>';
}
async function c1AdvancedFinish(){
 const el=document.getElementById('c1AdvancedDone');
 if(!el?.checked){if(typeof hToast==='function')hToast('先完成練習並勾選，再記錄。');return}
 const s=c1State(),sessions=s.advancedSessions||(s.advancedSessions=[]),skill=C1_SKILLS[sessions.length%4];
 sessions.push({date:new Date().toISOString(),topic:s.topic,skill});
 if(sessions.length>120)sessions.splice(0,sessions.length-120);
 await save();if(typeof hMark==='function')await hMark('course');c1Render();
 if(typeof hToast==='function')hToast('完成一次 C1 深度練習。今天就到這裡。');
}
function c1LessonContent(skill,data,idx,num){
 const lev=C1_LEVELS[Math.floor((num-1)/4)];
 if(skill==='reading'){
  const x=data.reading[idx];return '<p style="line-height:1.7;max-width:65ch">'+esc(x.text)+'</p>'+
   '<p><b>閱讀理解：</b>'+esc(x.q)+'</p>'+x.choices.map((v,i)=>'<label class="c1Option"><input type="radio" name="c1Quiz" value="'+i+'" onchange="c1Answer='+i+'"> '+esc(v)+'</label>').join('')+
   '<button onclick="c1Check()">檢查答案</button><p class="small">先找作者的主旨和因果，再查不懂的 2–3 個字。</p>';
 }
 if(skill==='listening'){
  const x=data.listening[idx];return '<p>請先聽，不看逐字稿。使用瀏覽器內建語音朗讀，並非真人考試錄音。</p>'+
   '<button class="primary" onclick="c1PlayListening()">▶ 播放聽力（英文）</button> <button onclick="c1StopAudio()">停止</button>'+
   '<p><b>聽力問題：</b>'+esc(x.q)+'</p>'+x.choices.map((v,i)=>'<label class="c1Option"><input type="radio" name="c1Quiz" value="'+i+'" onchange="c1Answer='+i+'"> '+esc(v)+'</label>').join('')+
   '<button onclick="c1Check()">檢查答案</button><details><summary>聽完再看逐字稿</summary><p>'+esc(x.text)+'</p></details>';
 }
 if(skill==='speaking')return '<p class="sentence">'+esc(data.speaking[Math.floor((num-1)/4)])+'</p>'+
 '<div class="tip">結構提示：'+esc(lev.aim)+'。先說 45–90 秒；若有餘力再說一次。</div>'+
 '<label class="c1Option"><input type="checkbox" id="c1Spoke" onchange="c1Spoken=this.checked"> 我已經口頭講過至少一次</label>'+
 '<p class="small">要深度回饋可進 Speak Smart 9，或複製題目去 ChatGPT；程式不會儲存錄音或逐字稿。</p>';
 if(skill==='writing')return '<p><b>寫作題：</b>'+esc(data.writing[Math.floor((num-1)/4)])+'</p>'+
 '<p class="small">參考長度 '+lev.word+' 字；先完成再修改。這不是官方考試規定字數。</p>'+
 '<textarea id="c1Writing" rows="7" oninput="c1Draft=this.value;c1WordCount()" placeholder="Type your answer here. 這段只暫存在本頁，不上傳雲端。"></textarea>'+
 '<p class="small" id="c1Words">0 words</p><button onclick="c1CopyWriting()">複製給 ChatGPT 批改</button>';
 return '';
}
function c1TopicChanged(topic){
 if(!C1_TOPICS[topic])return;c1State().topic=topic;c1Answer=null;c1Spoken=false;c1Draft='';save();c1Render();
}
function c1ChangeTopic(){
 const keys=Object.keys(C1_TOPICS),s=c1State(),i=keys.indexOf(s.topic);
 c1TopicChanged(keys[(i+1)%keys.length]);}
function c1PlayListening(){
 const s=c1State(),i=Math.floor((c1NextNum()-1)/4),x=C1_TOPICS[s.topic].listening[i];
 if(!('speechSynthesis' in window)){document.getElementById('c1Feedback').textContent='此瀏覽器不支援朗讀；請改用文字或其他裝置。';return;}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x.text);u.lang='en-GB';u.rate=.86;window.speechSynthesis.speak(u);
}
function c1StopAudio(){if('speechSynthesis' in window)window.speechSynthesis.cancel()}
function c1Check(){
 const num=c1NextNum(),skill=C1_SKILLS[(num-1)%4],idx=Math.floor((num-1)/4);
 const x=C1_TOPICS[c1State().topic][skill][idx],f=document.getElementById('c1Feedback');
 if(c1Answer===null){f.textContent='先選一個答案，再按檢查。';return;}
 const good=c1Answer===x.answer;
 f.innerHTML='<div class="tip">'+(good?'✅ 正確。':'尚未答對，可再看一次材料。')+' '+esc(x.why)+'</div>';
}
function c1WordCount(){const n=c1Draft.trim()?c1Draft.trim().split(/\s+/).length:0;const el=document.getElementById('c1Words');if(el)el.textContent=n+' words'}
function c1CopyWriting(){
 const text=document.getElementById('c1Writing')?.value||'';
 const q=C1_TOPICS[c1State().topic].writing[Math.floor((c1NextNum()-1)/4)];
 const msg='請以 B2→C1 英文教練身份批改我的外交/國關寫作：'+q+'\n我的草稿：'+text+'\n請評估主旨、論證、清晰度，最多修正兩個重點；提供B2自然版及C1升級句。';
 if(!navigator.clipboard?.writeText){window.prompt('請複製：',msg);return}
 navigator.clipboard.writeText(msg).then(()=>{if(typeof hToast==='function')hToast('已複製。貼到 ChatGPT 即可。')}).catch(()=>window.prompt('請複製：',msg));
}
async function c1CompleteToday(){
 const num=c1NextNum(),skill=C1_SKILLS[(num-1)%4],s=c1State();
 if(s.completed[num])return;
 if(skill==='reading'||skill==='listening'){
  const x=C1_TOPICS[s.topic][skill][Math.floor((num-1)/4)];
  if(c1Answer!==x.answer){document.getElementById('c1Feedback').textContent='先完成一題理解檢查；答案不對也可以重新聽或閱讀。';return;}
 }
 if(skill==='speaking'&&!c1Spoken){document.getElementById('c1Feedback').textContent='先練習口說一次，再勾選確認。';return;}
 if(skill==='writing'&&!c1Draft.trim()){document.getElementById('c1Feedback').textContent='先寫幾句英文；今天不要求一次寫到完整字數。';return;}
 s.completed[num]={date:new Date().toISOString(),topic:s.topic,skill};
 c1Answer=null;c1Draft='';c1Spoken=false;c1StopAudio();
 await save();if(typeof hMark==='function')await hMark('course');c1Render();
 if(typeof hToast==='function')hToast('📘 完成一堂。今天不欠課。');
}
function c1ShowPlan(){document.getElementById('c1SchoolHome')?.scrollIntoView({behavior:'smooth'})}
function c1Inject(){
 if(document.getElementById('c1SchoolHome')){c1Render();return}
 const anchor=document.getElementById('habitPanel');if(!anchor)return;
 const css=document.createElement('style');css.textContent='.c1Bar{height:10px;background:#e7e8e2;border-radius:99px;overflow:hidden}.c1Bar>i{display:block;height:100%;background:#20211f}.c1Today{background:var(--soft);padding:14px;border-radius:14px}.c1Option{display:flex;align-items:center;gap:10px;padding:8px 0}.c1Option input{width:auto}.c1Links{display:flex;gap:9px;flex-wrap:wrap;margin-top:10px}.c1Links a{padding:8px;border:1px solid #ddd;border-radius:8px;background:white;color:inherit;text-decoration:none}';document.head.appendChild(css);
 const home=document.createElement('div');home.id='c1SchoolHome';home.className='card';anchor.insertAdjacentElement('afterend',home);c1Render();
}
window.addEventListener('load',()=>setTimeout(c1Inject,700));setTimeout(c1Inject,1000);
