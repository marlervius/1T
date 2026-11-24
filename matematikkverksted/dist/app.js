import {kapitler,books,generatorer} from './innhold.js';
import {labMarkup,mountGraphs} from './graf.js';
import {escapeHtml as e, mathHtml} from './matematikk.js';

import {chapterFigure,coverFigure} from './figurer.js';
import {ferdigheter,kontekst,seRute,trenSide,diagSide,bindOving,kart,neste,status,skillName,nullstillOving} from './oving.js';
import {laererSide,monterLaerer,matrise,oppdragSide,monterOppdrag,arkSide} from './laerer.js';
import {bevisMarkup,monterBevis} from './bevis.js';

const main = document.querySelector('main');
const navigation = document.querySelector('#navigation');
const side = document.querySelector('#side-progress');
const dialog = document.querySelector('#search-dialog');
const query = document.querySelector('#search');
const storageKey = 'matematikkverksted-1t-v1';
const lessons = kapitler.flatMap((kap, c) => kap.leksjoner.map((lesson, i) => ({
  ...lesson, kap, c, i, key: `${kap.id}/${i+1}`, number: `${c+1}.${i+1}`
})));
const tasks = lessons.flatMap(les => les.oppgaver.map((opp,i) => ({
  ...opp, les, key:`${les.key}/${i+1}`, number:`${les.number}.${i+1}`
})));
const byTask = new Map(tasks.map(task=>[task.key,task]));
const booksById = new Map(books.map(book=>[book.id,book]));
const navItems = [
  ['oversikt','⌂','Oversikt'],
  ['andregrad','∩','Andregradsforløp'],
  ['tren','✎','Min øving'],
  ['oppgaver','⊞','Oppgavebank'],
  ['progresjon','◔','Min progresjon'],
  ['laerer','▤','Lærerrom'],
  ['kilder','≡','Kilder og læreplan']
];
const format = new Intl.NumberFormat('nb-NO',{maximumFractionDigits:6});
const fmt = value => format.format(value);
const pages = new Set(navItems.map(([id])=>id));
const levels = ['Grunnøving','Anvendelse','Fordypning'];
const filters = {chapter:'',level:'',status:''};
const chapterUrl = kap => `#kapittel/${kap.id}`;
const lessonUrl = les => `#leksjon/${les.key}`;
let unmount = ()=>{};
let route;
let trainingChapter = 0;
let trainingTask = null;
let storageAvailable = true;
let state = {done:{},solved:{},notes:{},last:''};

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (saved && typeof saved==='object') state = {
    done:saved.done && typeof saved.done==='object' ? saved.done : {},
    solved:saved.solved && typeof saved.solved==='object' ? saved.solved : {},
    notes:saved.notes && typeof saved.notes==='object' ? saved.notes : {},
    last:typeof saved.last==='string' ? saved.last : ''
  };
} catch {
  storageAvailable = false;
}
function save(){
  try {localStorage.setItem(storageKey,JSON.stringify(state));}
  catch {storageAvailable=false;}
}

function link(href,content,type='solid'){
  return `<a class="button ${type}" href="${href}">${content}</a>`;
}
const ext = (url,label) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${e(label)} <span aria-hidden="true">↗</span></a>`;
const title = (label,name,desc) => `<header class="page-head"><span class="eyebrow">${e(label)}</span><h1>${e(name)}</h1><p>${mathHtml(desc)}</p></header>`;
const crumb = (...parts) => `<nav class="breadcrumb" aria-label="Sti"><a href="#oversikt">Oversikt</a>${parts.map(part=>`<span aria-hidden="true">/</span>${part}`).join('')}</nav>`;
const footer = () => '<footer class="site-footer">Matematikkverksted 1T · Bearbeidet fra OpenMathBooks. <a href="#kilder">Kilder, lisens og kompetansemål</a></footer>';
const complete = c => lessons.filter(l=>l.c===c && state.done[l.key]).length;
const progressCount = () => lessons.filter(l=>state.done[l.key]).length;
const checkedCount = () => tasks.filter(t=>typeof t.svar==='number' && state.solved[t.key]).length;
const comparedCount = () => tasks.filter(t=>typeof t.svar!=='number' && state.solved[t.key]).length;
const bar = (value,max,label) => `<progress value="${value}" max="${max}" aria-label="${e(label)}"></progress>`;
function navLink(id, icon, text, active, ch=false, checked=false){
  return `<a class="nav-item${ch?' nav-chapter':''}" href="#${id}"${active?' aria-current="page"':''}><span class="nav-glyph${ch?' nav-num':''}" aria-hidden="true">${icon}</span><span>${e(text)}</span>${checked?'<span class="nav-mark" aria-label="Fullført">✓</span>':''}</a>`;
}
function updateNav(){
  navigation.innerHTML = navItems.map(([id,ico,name])=>navLink(id,ico,name,(route.page===id || (id==='tren' && route.page==='kartlegging') || (id==='laerer' && ['oppdrag','ark'].includes(route.page))))).join('')+
    '<p class="nav-label">Oversikter</p><a class="nav-item" href="./mine-data.html"><span class="nav-glyph" aria-hidden="true">◔</span><span>Mine data</span></a><a class="nav-item" href="./klasse.html"><span class="nav-glyph" aria-hidden="true">▤</span><span>Klasseoversikt</span></a>'+
    '<p class="nav-label">Kapitler</p>'+
    kapitler.map((kap,i)=>navLink('kapittel/'+kap.id,String(i+1).padStart(2,'0'),kap.tittel,route.kap===kap,complete(i)===kap.leksjoner.length)).join('');
  side.innerHTML = `<div class="progressbox"><strong>Din progresjon</strong>${bar(progressCount(),lessons.length,'Fullførte leksjoner')}<p>${progressCount()} av ${lessons.length} leksjoner fullført</p></div>`;
}

function chapterCard(kap,i){
  const num=complete(i);
  return `<a class="chapter-card tone-${i%4}" href="${chapterUrl(kap)}"><div class="card-art">${chapterFigure(i)}</div><div class="chapter-details"><span class="card-number">Kapittel ${i+1}</span><h3>${e(kap.tittel)}</h3><p>${e(kap.kort)}</p><div class="card-end"><span>${kap.leksjoner.length} leksjoner${num?' · '+num+' fullført':''}</span><span aria-hidden="true">↗</span></div></div></a>`;
}
function overview(){
  const {logg}=kontekst(), rec=neste();
  const tried=logg.length>0;
  const last=lessons.find(l=>l.key===state.last);
  return `<header class="studio-hero"><div class="studio-intro"><span class="hero-kicker">Videregående <i></i> Vg1</span>
    <h1>Matematikk <em>1T</em></h1>
    <p>${tried?`Neste anbefalte ferdighet er <strong>${e(skillName(rec.id))}</strong>.`: 'Utforsk sammenhenger, løs problemer og finn din egen vei gjennom faget.'}</p>
    <div class="actions">${link('#tren',tried?'Fortsett øvingen':'Start en økt','lime')}${link('#kartlegging','Finn mitt startpunkt','hero-link')}</div></div>
    <a href="#leksjon/derivasjon/1" class="studio-plot" aria-label="Utforsk sekant og tangent i derivasjonslaboratoriet">${coverFigure()}<span>Sekant og tangent <b aria-hidden="true">↗</b></span></a></header>
    <section class="home-section"><div class="section-head"><div><span class="section-kicker">Læreverket</span><h2>Kapitler</h2></div><p>${kapitler.length} kapitler <span class="dotsep">·</span> ${lessons.length} leksjoner</p></div>
    ${last?`<div class="resume-strip"><span>Sist åpnet</span><a href="${lessonUrl(last)}">${e(last.number)} ${e(last.tittel)}</a></div>`:''}
    <a class="featured-course" href="./andregrad.html"><strong>Utforsk andregradsulikheter</strong><span>Faktorisering, nullpunkter, graf og tilpasset øving</span></a>
    <div class="chapter-grid">${kapitler.map(chapterCard).join('')}</div></section>${footer()}`;
}
function lessonRows(kap){
  return `<ol class="chapter-lessons">${lessons.filter(l=>l.kap===kap).map(l=>`<li><a class="row-link" href="${lessonUrl(l)}"><span class="row-num">${l.number}</span><span><strong>${e(l.tittel)}</strong><small>${mathHtml(l.mål)}</small></span><span class="card-arrow" ${state.done[l.key]?'aria-label="Fullført"':'aria-hidden="true"'}>${state.done[l.key]?'✓':'→'}</span></a></li>`).join('')}</ol>`;
}
function chapter(kap,c){
  return crumb(e(kap.tittel))+title(`Kapittel ${c+1}`,kap.tittel,kap.kort)+
    `<div class="lesson-grid"><div class="stack"><section class="pane"><h2>Leksjoner</h2>${lessonRows(kap)}</section>${labMarkup(kap.id)}</div>
    <aside class="pane lesson-aside"><h2>Øv på kapittelet</h2><p class="track">${tasks.filter(t=>t.les.kap===kap).length} oppgaver med løsningsforslag</p>${link('#oppgaver/'+kap.id,'Vis oppgaver →','outline')}</aside></div>
    <p class="actions"><a href="#oppgaver/${kap.id}">Se alle oppgavene i kapittelet →</a></p>${footer()}`;
}
function source(k){
  if(!k) return '';
  return ext(k.url,`${booksById.get(k.bok).tittel} · ${k.kapittel}`);
}
function exercise(t){
  const key=t.key;
  const dom=key.replaceAll('/','-');
  const isNumeric=typeof t.svar==='number';
  const solved=key!=='variant' && !!state.solved[key];
  return `<article id="oppgave-${dom}" class="exercise" data-task="${key}">
    <span class="level" data-level="${e(t.nivå)}">${e(t.nivå)}</span>${t.number?` <span class="track">${t.number}</span>`:''}
    <span class="exercise-ok"${solved?'':' hidden'}>✓ ${isNumeric?'Tallsvar kontrollert':'Sammenliknet'}</span>
    <p class="track"><strong>Arbeidsmåte:</strong> ${t.arbeidsmåte==='programmering'?'Digitalt verktøy kreves · skriv og kjør programmet':'Kan løses uten digitale hjelpemidler'}. <strong>Vurdering:</strong> ${isNumeric?'Automatisk kontroll av tallsvar; framgangsmåten vurderes ikke':'Du sammenlikner selv med løsningsforslaget; lærer kan vurdere begrunnelsen'}.</p>
    <p>${mathHtml(t.spørsmål)}</p>
    ${isNumeric?`<form class="answer-form" data-answer="${key}"><label for="svar-${dom}" class="field-label">Svar som tall<input type="text" inputmode="text" class="answer-input" id="svar-${dom}" placeholder="${t.desimaler===1?'Én desimal':'F.eks. 2,5 eller 5/2'}" autocomplete="off" required></label><button class="button solid">Sjekk svar</button></form><p class="feedback" role="status"></p>`:
    `<details class="self-note"><summary>Skriv løsningsforslag</summary><label for="notat-${dom}" class="visually-hidden">Ditt løsningsforslag</label><textarea id="notat-${dom}" rows="3" data-note="${key}" placeholder="Skriv hvordan du tenkte …">${e(state.notes[key]||'')}</textarea></details>`}
    <details><summary>Hint</summary><p>${mathHtml(t.tips)}</p></details>
    <details><summary>Vis løsning</summary><p>${mathHtml(t.løsning)}</p>${isNumeric?'':`<label class="answer-open"><input type="checkbox" data-self="${key}"${solved?' checked':''}>Jeg har sammenliknet min løsning</label>`}</details>
    ${t.kilde?`<p class="source-link">Bearbeidet fra ${source(t.kilde)}</p>`:''}
    ${route.page==='oppgaver' && t.les?`<p class="source-link"><a href="${lessonUrl(t.les)}">${e(t.les.tittel)} →</a></p>`:''}
    </article>`;
}
const python = `aar = 0
verdi = 1000
while verdi < 1500:
    verdi = verdi * 1.08
    aar = aar + 1
print(aar, verdi)`;
function lesson(les){
  const prev = lessons[lessons.indexOf(les)-1];
  const next = lessons[lessons.indexOf(les)+1];
  const done = !!state.done[les.key];
  const skill=ferdigheter.find(f=>f.id===les.key);
  const labIds = {'algebra/3':'algebra','likninger/1':'likninger','andregrad/2':'andregrad','funksjoner/3':'funksjoner','polynomdivisjon/3':'polynomdivisjon','derivasjon/1':'derivasjon','trigonometri/1':'trigonometri','trigonometri/2':'trekant','trigonometri/3':'trekant','modellering/2':'modellering'};
  const lab = labIds[les.key]?labMarkup(labIds[les.key]):'';
  const skillPanel = '<section class="pane lesson-practice"><h2>Øv på ferdigheten</h2><p>'+mathHtml(skill.utforsk)+'</p><div class="actions">'+link('#tren/'+les.key,'Start tilpasset øving')+'</div><details><summary>Velg læringsvei selv</summary><div class="actions">'+['Ekstra støtte','Ordinær vei','Ekstra utfordring'].map((v,i)=>link('#tren/'+les.key+'/'+i,v,'outline')).join('')+'</div></details></section>';
  return crumb(`<a href="${chapterUrl(les.kap)}">${e(les.kap.tittel)}</a>`,e(les.number))+title(`Leksjon ${les.number}`,les.tittel,les.mål)+
    `<div class="lesson-grid"><div class="stack">
      <section class="pane"><h2>Teori</h2><details class="les-stotte"><summary>Les en kortere forklaring</summary><p>${mathHtml(skill.stotte)}</p><p>${mathHtml(skill.ord)}</p></details>${les.teori.map(t=>`<p>${mathHtml(t)}</p>`).join('')}<div class="math-display">${mathHtml(les.regel, true)}</div></section>
      <section class="pane"><h2>Gjennomregnet eksempel</h2><p><strong>${mathHtml(les.eksempel)}</strong></p><ol class="steps">${les.steg.map(s=>`<li>${mathHtml(s)}</li>`).join('')}</ol>
      ${les.key==='modellering/3'?`<pre class="code"><code>${e(python)}</code></pre><p>Kjør koden i Python. Endre vekstfaktoren og terskelen, og sjekk året før svaret.</p>`:''}</section>
      ${skillPanel}${lab}${bevisMarkup(les.key)}
      <section class="pane"><h2>Oppgaver</h2>${tasks.filter(t=>t.les===les).map(exercise).join('')}</section>
      ${les.kilde?`<div class="source-link">Videre lesing hos OpenMathBooks · ${source(les.kilde)}</div>`:''}
      <div class="actions"><button type="button" class="button ${done?'outline':'solid'}" data-complete="${les.key}" aria-pressed="${done}">${done?'✓ Fullført':'Merk leksjonen som fullført'}</button></div>
      <div class="actions lesson-next">${prev?link(lessonUrl(prev),'← Forrige leksjon','outline'):'<span></span>'}${next?link(lessonUrl(next),'Neste leksjon →','outline'):link('#progresjon','Se progresjon →','outline')}</div>
    </div><aside class="pane lesson-aside"><h2>I dette kapittelet</h2>${lessonRows(les.kap)}</aside></div>${footer()}`;
}
function option(value, label, present){
  return `<option value="${e(value)}"${value===present?' selected':''}>${e(label)}</option>`;
}
function filteredExercises(){
  const results=tasks.filter(t=>(!filters.chapter || filters.chapter===t.les.kap.id) &&
    (!filters.level || filters.level===t.nivå) && (!filters.status || !state.solved[t.key]));
  return `<p class="track" role="status">${results.length} ${results.length===1?'oppgave':'oppgaver'} i utvalget</p>`+
    (results.length?results.map(exercise).join(''):'<p>Ingen oppgaver passer valget. Prøv et annet filter.</p>');
}
function newTraining(){
  const generate=generatorer[trainingChapter];
  let next=generate();
  for(let tries=0; tries<4 && next.spørsmål===trainingTask?.spørsmål; tries++) next=generate();
  trainingTask={...next,key:'variant'};
}
function bank(){
  if(!trainingTask) newTraining();
  return crumb('Oppgavebank')+title('Trening','Oppgavebank','Velg kapittel og nivå. Bruk hint ved behov og sammenlikn framgangsmåten din med løsningsforslaget.')+
  `<div class="lesson-grid"><div class="stack">
  <section class="pane"><h2>Finn oppgaver</h2><div class="filters">
  <label>Kapittel<select id="f-chapter">${option('','Alle kapitler',filters.chapter)}${kapitler.map(k=>option(k.id,k.tittel,filters.chapter)).join('')}</select></label>
  <label>Nivå<select id="f-level">${option('','Alle nivåer',filters.level)}${levels.map(l=>option(l,l,filters.level)).join('')}</select></label>
  <label>Framdrift<select id="f-status">${option('','Alle oppgaver',filters.status)}${option('todo','Gjenstår',filters.status)}</select></label></div></section>
  <section class="pane" id="generator"><h2>Tren med nye tall</h2><p>Velg tema og få en ny variant med automatisk svarretting.</p><div class="filters">
  <label>Tema<select id="training-chapter">${kapitler.map((k,c)=>option(String(c),k.tittel,String(trainingChapter))).join('')}</select></label>
  <button class="button outline" type="button" data-variant>Ny variant ↻</button></div><div id="training-task">${exercise(trainingTask)}</div></section>
  <section class="pane" id="task-list"><h2>Oppgaver i utvalget</h2><div id="task-results">${filteredExercises()}</div></section>
  </div><aside class="pane lesson-aside"><h2>Tren på eksamen</h2><p>Hos OpenMathBooks finner du løsningsforslag til tidligere eksamener.</p>${ext('https://openmath.online/exams/exams','Eksamensløsninger')}</aside></div>${footer()}`;
}
function progress(){
  return crumb('Min progresjon')+title('Arbeidet ditt','Min progresjon','Her ser du fullførte leksjoner, riktige tallsvar og åpne oppgaver du har sammenliknet med løsningsforslaget.')+
   `<div class="stack">${kart()}<section class="pane"><h2>${progressCount()} av ${lessons.length} leksjoner fullført</h2>${bar(progressCount(),lessons.length,'Fullførte leksjoner')}<p>${checkedCount()} tallsvar er kontrollert automatisk. ${comparedCount()} åpne oppgaver er sammenliknet med løsningsforslaget. Dette viser aktivitet, ikke dokumentert mestring.</p><p><a href="./mine-data.html">Se og administrer mine data →</a></p>
   <p class="track">${storageAvailable?'Progresjon og notater lagres i denne nettleseren.':'Nettleseren blokkerer lagring. Framdriften varer mens siden er åpen.'}</p><button type="button" class="button outline" data-reset>Nullstill progresjon på denne enheten</button></section>
   <section class="pane"><h2>Leste leksjoner og arbeid i oppgavebanken per kapittel</h2><ul class="resource-list">${kapitler.map((k,i)=>{
     const problems=tasks.filter(t=>t.les.kap===k);
     return `<li><a href="${chapterUrl(k)}">${e(k.tittel)}</a><small>${complete(i)} av ${k.leksjoner.length} leksjoner · ${problems.filter(t=>state.solved[t.key]).length} av ${problems.length} oppgaver kontrollert eller sammenliknet</small>${bar(complete(i),k.leksjoner.length,'Progresjon i '+k.tittel)}</li>`;
   }).join('')}</ul></section></div>${footer()}`;
}
function resources(){
  return crumb('Kilder og læreplan')+title('Om læreverket','Kilder og læreplan','Finn kildene til teorien, ekstra oppgaver og koblingen til kompetansemålene i 1T.')+
  `<div class="stack"><section class="pane"><h2>OpenMathBooks</h2>
  <p>Læreverket er en selvstendig, ikke-kommersiell bearbeiding av fagstoff fra <a href="https://openmath.online/">OpenMathBooks</a> © 2022 Sindre Sogge Heggen. Relevante kapitler er valgt ut og omformulert for 1T, flere eksempler har nye tall, og den digitale utgaven har nye oppgaver og interaktive figurer. Oppgaver som er bearbeidet fra bestemte tekster eller eksempler, har egen kildehenvisning.</p>
  <p>Faglig innhold i bearbeidingen er tilgjengelig under <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>.</p>
  <ul class="resource-list">${books.map(b=>`<li><strong>${e(b.tittel)}</strong><small>${ext(b.url,'Bok (PDF)')} · ${ext(b.oppgaver,'Løsningsforslag (PDF)')}</small></li>`).join('')}
  <li>${ext('https://openmath.online/skilltraining/skilltraining','Ferdighetstrening fra OpenMathBooks')}</li>
  <li>${ext('https://openmath.online/exams/exams','Løsningsforslag til tidligere eksamener')}</li></ul></section>
  ${matrise()}<section class="pane"><h2>Bakgrunn for læreverket</h2><p>Les om forskningen bak hint, repetisjon og oppgavevalg, og se hva som er testet.</p><a href="./om-verkstedet.html">Designvalg, kilder og testresultater</a></section></div>${footer()}`;
}

function getRoute(){
  const [page,id,lesson,v]=location.hash.slice(1).split('/');
  if(page==='tren')return {page,fokus:ferdigheter.some(f=>f.id===id+'/'+lesson)?id+'/'+lesson:'',nivaa:['0','1','2'].includes(v)?Number(v):null};
  if(page==='andregrad') { location.replace('./andregrad.html'); return {page:'oversikt'}; }
  if(page==='kartlegging' || page==='oppdrag' || page==='ark')return {page,id};
  const c=kapitler.findIndex(k=>k.id===id);
  const kap=kapitler[c];
  const les=lessons.find(l=>l.key===`${id}/${lesson}`);
  if(page==='leksjon' && les) return {page,c,kap,les};
  if(page==='kapittel' && kap) return {page,c,kap};
  if(pages.has(page)) return {page,filter:page==='oppgaver' && kap?kap.id:''};
  return {page:'oversikt'};
}

function render(focus=false){
  if(location.hash==='#main') return;
  unmount();
  route=getRoute();
  if(route.page==='leksjon'){state.last=route.les.key;save();}
  if(route.page==='oppgaver'){
    filters.chapter=route.filter;
    if(route.filter){trainingChapter=kapitler.findIndex(k=>k.id===route.filter);newTraining();}
  }
  seRute(route.page,route.fokus,route.nivaa);
  const views={tren:()=>trenSide(route.fokus,route.nivaa),kartlegging:diagSide,laerer:()=>laererSide(kontekst()),oppdrag:()=>oppdragSide(route.id), ark:()=>arkSide(route.id,ferdigheter),oversikt:overview,kapittel:()=>chapter(route.kap,route.c),leksjon:()=>lesson(route.les),oppgaver:bank,progresjon:progress,kilder:resources};
  main.innerHTML=views[route.page]();
  unmount=mountGraphs(main);
  if(['tren','kartlegging'].includes(route.page))bindOving(main,route.page,route.fokus,route.nivaa,()=>render(false));
  if(route.page==='laerer')monterLaerer(main,kontekst());
  if(['ark','oppdrag'].includes(route.page))monterOppdrag(main);
  if(route.page==='leksjon')monterBevis(main);
  updateNav();
  const pageTitle=main.querySelector('h1')?.textContent || 'Matematikk 1T';
  document.title=route.page==='oversikt'?'Matematikkverksted 1T':pageTitle+' · Matematikkverksted 1T';
  if(focus){window.scrollTo(0,0); main.focus({preventScroll:true});}
}

function parseNumber(raw){
  const text=raw.trim().replaceAll('−','-').replaceAll(',','.').replaceAll(/[\u00a0\u202f]/g,' ');
  const parts=text.split('/').map(p=>p.trim().replace(/(?<=\d) (?=\d{3}(?:\D|$))/g,''));
  if(parts.length>2 || parts.some(p=>!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(p))) return NaN;
  return parts.length===2 && +parts[1]===0?NaN:Number(parts[0])/(parts.length===2?Number(parts[1]):1);
}

main.addEventListener('submit',event=>{
  const form=event.target;
  if(!form.matches('[data-answer]')) return;
  event.preventDefault();
  const key=form.dataset.answer;
  const task=key==='variant'?trainingTask:byTask.get(key);
  const input=form.querySelector('input');
  const value=parseNumber(input.value);
  const feedback=form.nextElementSibling;
  if(!Number.isFinite(value)){
    feedback.dataset.state='error';
    feedback.textContent='Skriv et tall, for eksempel 2,5 eller 5/2.';
    return;
  }
  const correct=Math.abs(value-task.svar)<=1e-8*Math.max(1,Math.abs(task.svar));
  feedback.dataset.state=correct?'ok':'error';
  feedback.textContent=correct?'Riktig! Se løsningen hvis du vil sammenlikne metoden.':'Prøv igjen. Åpne hintet hvis du står fast.';
  if(correct){
    form.closest('.exercise').querySelector('.exercise-ok').hidden=false;
    if(key!=='variant'){state.solved[key]=true;save();}
  }
});

main.addEventListener('input',event=>{
  const field=event.target;
  if(!field.matches('[data-note]')) return;
  state.notes[field.dataset.note]=field.value;
  save();
});
main.addEventListener('change',event=>{
  const field=event.target;
  if(field.matches('[data-self]')){
    state.solved[field.dataset.self]=field.checked;
    field.closest('.exercise').querySelector('.exercise-ok').hidden=!field.checked;
    save();
  }
  if(field.id.startsWith('f-')){
    filters[field.id.slice(2)]=field.value;
    if(field.id==='f-chapter'){
      history.replaceState(null,'',field.value?'#oppgaver/'+field.value:'#oppgaver');
    }
    document.querySelector('#task-results').innerHTML=filteredExercises();
  }
  if(field.id==='training-chapter'){
    trainingChapter=Number(field.value);
    newTraining();
    document.querySelector('#training-task').innerHTML=exercise(trainingTask);
  }
});
main.addEventListener('click',event=>{
  const target=event.target.closest('button');
  if(!target) return;
  if(target.hasAttribute('data-reset')){
    if(window.confirm('Slette progresjon, øvingshistorikk og notater fra denne nettleseren?')){
      state={done:{},solved:{},notes:{},last:''};
      try {
        localStorage.removeItem(storageKey);
        localStorage.removeItem('matematikkverksted-1t-andregrad-v1');
      } catch {storageAvailable=false;}
      nullstillOving(); render(false);
    }
  }
  if(target.hasAttribute('data-variant')){
    newTraining();
    document.querySelector('#training-task').innerHTML=exercise(trainingTask);
  }
  if(target.hasAttribute('data-complete')){
    const key=target.dataset.complete;
    state.done[key]=!state.done[key];
    const done=state.done[key];
    save();
    target.textContent=done?'✓ Fullført':'Merk leksjonen som fullført';
    target.classList.toggle('solid',!done);
    target.classList.toggle('outline',done);
    target.setAttribute('aria-pressed',String(done));
    document.querySelector('.lesson-aside').innerHTML='<h2>I dette kapittelet</h2>'+lessonRows(route.kap);
    updateNav();
  }
});

const menuButton=document.querySelector('#mobile-menu');
function closeMenu(){
  document.querySelector('.sidebar').classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded','false');
}
menuButton.addEventListener('click',()=>{
  const open=document.querySelector('.sidebar').classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded',String(open));
});
navigation.addEventListener('click',ev=>{if(ev.target.closest('a'))closeMenu();});
document.addEventListener('keydown',ev=>{
  if(ev.key==='Escape' && menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}
});
function showSearch(){
  query.value='';
  dialog.showModal();
  searchResults();
  query.focus();
}
function searchSnippet(body){
  const line = body.split('. ')[0];
  if (line.length <= 110) return line;
  const parts = line.split('$');
  let snippet = '';
  for (const [i, part] of parts.entries()) {
    const remaining = 109 - snippet.length;
    if (i % 2 === 1) {
      if (part.length + 2 > remaining) break;
      snippet += '$' + part + '$';
    } else {
      snippet += part.slice(0, remaining);
      if (part.length > remaining) break;
    }
  }
  return snippet.trimEnd() + '…';
}
function searchResults(){
  const term=query.value.trim().toLocaleLowerCase('nb');
  const bits=term.split(/\s+/).filter(Boolean);
  const getMatches = (list,limit) => list.map(r=>{
    const head=r.name.toLocaleLowerCase('nb');
    const body=r.body.toLocaleLowerCase('nb');
    const score=bits.every(s=>head.includes(s)||body.includes(s)) ? (head.includes(term)?3:0)+bits.filter(s=>head.includes(s)).length : -1;
    return {...r,score};
  }).filter(r=>r.score>=0).sort((a,b)=>b.score-a.score).slice(0,limit);
  const catalog=[
    {url:'#kartlegging',name:'Kartlegging',body:'Finn et startpunkt med fem spørsmål'},
    {url:'./klasse.html',name:'Klasseoversikt',body:'Se ferdigheter og støttebehov i innleverte progresjonsrapporter.'},
    {url:'./mine-data.html',name:'Mine data',body:'Del en ferdighetsrapport eller flytt progresjon til en annen maskin.'},
    {url:'#laerer',name:'Lærerrom',body:'Arbeidsark, elevoppdrag, differensiering, læreplan og utskrift'},
    ...ferdigheter.filter(f=>f.id.startsWith('grunnlag/')).map(f=>({url:'#tren/'+f.id,name:f.kort,body:f.stotte})),
    ...kapitler.map(k=>({url:chapterUrl(k),name:k.tittel,body:k.kort})),
    ...lessons.map(l=>({url:lessonUrl(l),name:l.tittel,body:[l.mål,l.kap.tittel,...l.teori].join(' ')}))
  ];
  const hits=term?getMatches(catalog,12):catalog.slice(0,5);
  document.querySelector('#search-results').innerHTML=hits.length ? hits.map(r=>`<a class="search-result" href="${r.url}"><strong>${e(r.name)}</strong><small>${mathHtml(searchSnippet(r.body))}</small></a>`).join('') : '<p>Ingen treff. Prøv et annet begrep.</p>';
}
document.querySelector('#open-search').addEventListener('click',showSearch);
document.querySelector('#close-search').addEventListener('click',()=>dialog.close());
query.addEventListener('input',searchResults);
dialog.addEventListener('click',event=>{
  if(event.target===dialog || event.target.closest('a')) dialog.close();
});
document.addEventListener('keydown',event=>{
  if(event.key==='/' && !dialog.open && !event.target.closest('input,textarea,select,[contenteditable]')){
    event.preventDefault();
    showSearch();
  }
});
document.querySelector('.skip').addEventListener('click',event=>{
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange',()=>render(true));
render();
