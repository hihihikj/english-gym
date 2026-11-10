const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const code=fs.readFileSync('curriculum.js','utf8');
const site={innerHTML:'',classList:{add(){},remove(){}}};
let spoken='';
const st={curriculum:{completed:{1:true,2:true},notes:{legacy:'preserved'},unit:1}};
const ctx=vm.createContext({
 st,currentUser:{id:'test'},console,
 document:{getElementById(id){return id==='c1SchoolHome'?site:id==='c1Feedback'?{textContent:'',innerHTML:''}:null}},
 window:{addEventListener(){},speechSynthesis:{cancel(){},speak(u){spoken=u.text}}},
 SpeechSynthesisUtterance:function(t){this.text=t;this.lang='';this.rate=1},
 setTimeout(){},esc:s=>String(s).replaceAll('<','&lt;'),save:async()=>{},hMark:async()=>{},hToast:()=>{}
});
vm.runInContext(code,ctx,{filename:'curriculum.js'});
const evalIn=s=>vm.runInContext(s,ctx);
assert.equal(evalIn('c1Count()'),0);
assert.equal(st.curriculum.completed[1],true);
assert.equal(evalIn('Object.keys(C1_TOPICS).length'),3);
assert.equal(evalIn('Object.values(C1_TOPICS).every(t=>t.reading.length===4 && t.listening.length===4)'),true);
assert.equal(evalIn('C1_SKILLS.join(",")'),'reading,listening,speaking,writing');
evalIn('c1Render()');
assert.match(site.innerHTML,/B2/);
assert.match(site.innerHTML,/c1Topic/);
assert.match(site.innerHTML,/c1Exam/);
evalIn('c1ExamChanged("ielts")');
assert.equal(st.curriculum.pathwayV3.exam,'ielts');
evalIn('c1TopicChanged("mystery")');
assert.match(site.innerHTML,/懸疑/);
evalIn('c1TopicChanged("technology")');
for(let i=1;i<=13;i++)st.curriculum.pathwayV3.completed[i]={date:'test'};
assert.equal(evalIn('c1NextNum()'),14);
evalIn('c1PlayListening()');
assert.match(spoken,/Our assessment recognises/);
for(let i=14;i<=16;i++)st.curriculum.pathwayV3.completed[i]={date:'test'};
evalIn('c1Render()');
assert.match(site.innerHTML,/C1 延伸練習/);
assert.match(site.innerHTML,/官方素材庫/);
evalIn('c1TopicChanged("mystery")');
assert.match(site.innerHTML,/Reading 10 懸疑故事/);
const speak=fs.readFileSync('speak-smart.js','utf8');
const ctx2=vm.createContext({st,document:{getElementById(){return null}},window:{addEventListener(){}},currentUser:{id:'test'},esc:s=>s,setTimeout(){}});
vm.runInContext(speak,ctx2,{filename:'speak-smart.js'});
assert.ok(vm.runInContext('SS_TOPICS.length',ctx2)>=14);
assert.match(vm.runInContext('SS_TOPICS[0][0]',ctx2),/Geneva/);
assert.match(vm.runInContext('SS_TOPICS[4][0]',ctx2),/countries/);
assert.match(fs.readFileSync('app.js','utf8'),/duePreferred/);
assert.match(fs.readFileSync('habits.js','utf8'),/Speak Smart 9/);
const cfg=fs.readFileSync('config.js','utf8');
assert.match(cfg,/paidApisEnabled:\s*false/);
assert.match(cfg,/aiEnabled:\s*false/);
console.log('PASS: interested B2/C1 curriculum, progress preservation, topics, listening, C1 extension, safety');
