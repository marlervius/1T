import { vurder } from '../motor.js';
import { mountPractice, noteExample, progress, resetPractice, resumeId } from './practice.js';
import { mathHtml } from '../matematikk.js';

const fag=document.documentElement.dataset.course;
const courseFiles={'1P':'./1p.js','2P':'./2p.js',R1:'./r1.js',R2:'./r2.js','1P-Y HO':'./1py-ho.js','1P-Y Elektro':'./1py-elektro.js'};
const {course}=await import(courseFiles[fag]);
const real=fag==='R1'||fag==='R2';
const vocational=fag.startsWith('1P-Y');
const ho=fag==='1P-Y HO';
const steps=real?(await import('./mellomsteg.js')).mellomsteg[fag.toLowerCase()]:{};
if (real) (await import('./realfagsutfordringer.js')).addExpressionTasks(course);
const mountLab=vocational?(await import('./ylabs.js')).mountVocationalLab:real?(await import('./rlabs.js')).mountRealLab:(await import('./labs.js')).mountLab;
const year=vocational?'Vg1 yrkesfag':{'1P':'Vg1','2P':'Vg2',R1:'Vg2',R2:'Vg3'}[fag];
const one=fag==='1P';
const main=document.querySelector('main');
const nav=document.querySelector('#nav');
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arr=v=>Array.isArray(v)?v:[v];
const prose=value=>real?mathHtml(String(value??'')):esc(value);
const list=items=>arr(items).map(i=>'<li>'+prose(i)+'</li>').join('');
const link=(path,text,cls='')=>'<a class="'+cls+'" href="#'+path+'">'+esc(text)+'</a>';
const labName=vocational?(ho?'Budsjettlaboratorium':'Trigonometrilaboratorium'):{'1P':'Sammenlikn to priser','2P':'Undersøk et datasett',R1:'Deriverbar i knekkpunktet?',R2:'Integral, areal og akkumulering'}[fag];
const codeWorkshops={rekursjon:'rekursjon',numerisk:'trapes'};
const labChapters={R1:['derivert'],R2:['integral','fundamentalteorem']};
const draftKey=id=>'matverk-'+fag+'-utkast-'+id;
function realPicture(){
 const r1=fag==='R1';
 const caption=r1?'Hva skjer med stigningstallet i knekkpunktet?':'Hva skjer med integralet når grafen krysser x-aksen?';
 const axes=r1?'<path d="M18 86H345M167 164V14" fill="none" stroke="#b5c3da" stroke-width="1"/><g fill="#fff"><text x="346" y="82">x</text><text x="173" y="19">y</text></g>':'<path d="M28 86H345M38 164V14" fill="none" stroke="#b5c3da" stroke-width="1"/><g fill="#fff"><text x="346" y="82">x</text><text x="45" y="19">y</text></g>';
 const graph=r1?'<path d="M40 34L167 118L312 43" fill="none" stroke="#e8d5a9" stroke-width="4" stroke-linejoin="round"/><circle cx="167" cy="118" r="5" fill="white"/><text x="178" y="137" fill="white">Knekkpunkt</text>':
   '<path d="M38 86V144L167 86Z" fill="#e8cf9a" fill-opacity=".42"/><path d="M167 86L296 28V86Z" fill="#b5e3ff" fill-opacity=".37"/><path d="M38 144L320 17" stroke="#bae8ff" stroke-width="4" fill="none"/><g fill="white"><text x="70" y="111">−</text><text x="255" y="72">+</text></g>';
 return '<a class="hero-figure-link" href="#lab"><figure><svg role="img" aria-label="'+caption+'" viewBox="0 0 364 174">'+axes+graph+'</svg><figcaption>'+caption+' <span aria-hidden="true">↗</span></figcaption></figure></a>';
}
function picture(){
 if(real)return realPicture();
 if(vocational)return '<figure><svg role="img" aria-label="'+(ho?'Budsjett med tre kostnadsposter':'Rettvinklet trekant med motstående og hosliggende katet')+'" viewBox="0 0 360 163">'+(ho?'<path d="M25 135H335" stroke="#a9c9c4"/><rect x="45" y="40" width="65" height="95" fill="#abebc0"/><rect x="145" y="75" width="65" height="60" fill="#f7c682"/><rect x="245" y="100" width="65" height="35" fill="#d9e7dc"/><g fill="white" text-anchor="middle"><text x="78" y="153">Utstyr</text><text x="178" y="153">Drift</text><text x="278" y="153">Service</text></g>':'<path d="M45 135H310V30Z" stroke="#abebc0" stroke-width="4" fill="none"/><path d="M292 135V117H310" stroke="#f7c682" fill="none"/><path d="M90 135 A45 45 0 0 0 87 118" stroke="#f7c682" fill="none"/><g fill="white"><text x="180" y="153">hosliggende</text><text x="318" y="85">b</text><text x="163" y="72">hypotenus</text><text x="95" y="125">v</text></g>')+'</svg><figcaption>'+labName+'</figcaption></figure>';
 const inner=one?`<path d="M30 131H340M30 131V16" stroke="#a9c9c4" fill="none"/><path d="M30 126L320 24" stroke="#abebc0" stroke-width="4"/><path d="M30 86L320 64" stroke="#f7c682" stroke-width="4"/><circle cx="175" cy="75" r="5" fill="white"/><g fill="white"><text x="34" y="20">Pris (kr)</text><text x="239" y="154">Forbruk (GB)</text></g>`:`<path d="M20 132H340" stroke="#e4e8ee"/><g fill="#f7ce89"><rect x="43" y="100" width="35" height="32"/><rect x="99" y="52" width="35" height="80"/><rect x="155" y="20" width="35" height="112"/><rect x="211" y="68" width="35" height="64"/><rect x="267" y="116" width="35" height="16"/></g><g fill="white" text-anchor="middle">${[10,15,20,25,30].map((n,i)=>'<text x="'+(60+i*56)+'" y="151">'+n+'</text>').join('')}</g>`;
 return '<figure><svg role="img" aria-label="'+(one?'To abonnementer har lik pris der linjene krysser hverandre.':'Reisetid i minutter. Flest elever bruker 20 minutter.')+'" viewBox="0 0 360 163">'+inner+'</svg><figcaption>'+(one?'Når lønner abonnementet seg?':'Hvor lang er en typisk skolevei?')+'</figcaption></figure>';
}
function menu(){
 const path=location.hash.slice(1)||'start';
 const entries=[['start','Kapitler'],['lab','Laboratorium'],...(vocational?[['prove','Årsprøve']]:[]),['progresjon','Min progresjon'],['laerer','Lærerrom']];
 nav.innerHTML=entries.map(([k,v])=>link(k,v)).join('')+'<details open><summary>Kapitler i '+fag+'</summary>'+course.chapters.map(ch=>link('tema/'+ch.id,ch.title)).join('')+'</details>';
 for(const a of nav.querySelectorAll('a')) if(a.hash==='#'+path)a.setAttribute('aria-current','page');
}
function home(){
 const last=course.chapters.find(ch=>ch.id===resumeId(course));
 const due=progress(course).find(ch=>ch.due);
 return '<section class="hero"><div><span>Videregående · '+year+'</span><h1>Matematikk <em>'+fag+'</em></h1><p>'+prose(course.intro)+'</p><div class="buttons">'+link(last?'ov/'+last.id:'tema/'+course.chapters[0].id,last?'Fortsett øvingen':'Start første kapittel','primary')+link('lab',labName,'secondary')+'</div></div>'+picture()+'</section>'+(one?'<h2>Matematikk for yrkesfag</h2><div class="cards"><a class="card" href="./1py-ho.html"><h3>1P-Y · Helse- og oppvekstfag</h3><p>Måleenheter, praksisdata, formler, regneark og velferdsteknologi.</p></a><a class="card" href="./1py-elektro.html"><h3>1P-Y · Elektro og datateknologi</h3><p>Formler, likninger, måleenheter, økonomi og trigonometri.</p></a></div>':'')+(due?'<p class="notice">'+link('ov/'+due.id,'Tid for ny mestringssjekk i '+due.title)+'</p>':'')+'<h2>Velg kapittel</h2><div class="cards">'+course.chapters.map(ch=>'<a class="card" href="#tema/'+ch.id+'"><h3>'+esc(ch.title)+'</h3><p>'+prose(ch.summary)+'</p></a>').join('')+'</div>';
}
function dataset(ch){
 if(!ch.dataset)return '';
 const {title,headers,rows}=ch.dataset;
 const filename=real||vocational?ch.id+'.csv':'Trondheim_2025.csv';
 const csv=[headers,...rows].map(row=>row.join(';')).join('\r\n');
 return '<div class="scroll"><table><caption>'+esc(title)+'</caption><thead><tr>'+headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p><a download="'+esc(filename)+'" href="data:text/csv;charset=utf-8,%EF%BB%BF'+encodeURIComponent(csv)+'">Last ned til regneark (CSV)</a></p>';
}
function theme(ch){
 const example=real?'<details id="worked"><summary>Se gjennomregnet eksempel</summary><ol>'+list(ch.example)+'</ol></details><div id="step"></div>':'<h2>Gjennomregnet eksempel</h2><ol>'+list(ch.example)+'</ol>';
 const lab=labChapters[fag]?.includes(ch.id)?link('lab',labName,'secondary'):'';
 return '<p class="crumb">'+link('start','Kapitler')+' / '+fag+'</p><h1>'+esc(ch.title)+'</h1><p class="reading">'+prose(ch.summary)+'</p><div class="buttons">'+link('ov/'+ch.id,'Regn selv','primary')+link('sjekk/'+ch.id,'Sjekk forkunnskapene','secondary')+link('oppdrag/'+ch.id,'Utforsk og begrunn','secondary')+lab+'</div><section class="panel reading"><h2>Fagstoff</h2>'+arr(ch.theory).map(t=>'<p>'+prose(t)+'</p>').join('')+'</section><section class="panel worked reading">'+example+'</section>'+link('ov/'+ch.id,'Prøv en oppgave','primary');
}
function mountStep(root,ch){
 const step=steps[ch.id];
 if(!step)return;
 root.innerHTML='<details><summary>Fullfør et mellomsteg</summary><p>'+prose(step.q)+'</p><form class="form-row"><label>Ditt svar <input inputmode="decimal" type="text" required></label><button class="primary">Sjekk mellomsteget</button></form><p role="status"></p></details>';
 const form=root.querySelector('form'), feedback=root.querySelector('[role="status"]');
 form.onsubmit=event=>{
   event.preventDefault();
   const checked=vurder({type:'tall',svar:step.answer},form.querySelector('input').value);
   if(checked.gyldig)noteExample(course,ch);
   feedback.innerHTML=prose(checked.riktig?'Riktig. '+step.solution:checked.gyldig?step.hint:checked.melding);
 };
}
function project(ch){
 const workshop=fag==='R2'&&codeWorkshops[ch.id];
 const codeLink=workshop?'<p><a href="./pfag/programmering.html#'+workshop+'">Åpne programmeringsverkstedet</a></p>':'';
 return '<p class="crumb">'+link('tema/'+ch.id,ch.title)+'</p><h1>Utforsk og begrunn</h1><section class="panel reading"><h2>'+esc(ch.title)+'</h2>'+arr(ch.activity).map(a=>'<p>'+prose(a)+'</p>').join('')+dataset(ch)+codeLink+(ch.source?'<p><a href="'+esc(ch.source)+'">Åpne datakilden</a></p>':'')+'<h3>Dette skal du vise</h3><ul>'+list(ch.criteria)+'</ul><label for="utkast">Din løsning og begrunnelse</label><textarea id="utkast"></textarea><small id="draft-status">Utkastet lagres i denne nettleseren.</small><details><summary>Se ett mulig løsningsforslag</summary>'+arr(ch.model).map(m=>'<p>'+prose(m)+'</p>').join('')+'</details></section>'+link('ov/'+ch.id,'Øv på beregningene','secondary');
}
const realPlans={
 R1:{
   title:'Deriverbarhet i et knekkpunkt',
   goal:'Eleven skal bruke ensidige grenseverdier av differansekvotienten til å avgjøre om en funksjon er deriverbar.',
   prep:'Elevene bør kjenne differansekvotienten og grafen til en absoluttverdifunksjon.',
   steps:[
     '0–5 min · Skisser $f(x)=|x|$ og be elevene anslå stigningstallet fra hver side av origo.',
     '5–15 min · Undersøk differansekvotienter fra venstre og høyre i laboratoriet. Be elevene forutsi hva som skjer når avstanden til knekkpunktet avtar.',
     '15–30 min · For $f(x)=|x-a|+b(x-a)$ skal hvert par velge $a$ og $b$ og finne de ensidige grensene algebraisk.',
     '30–40 min · Sammenlikn forsøkene. Begrunn hvorfor den valgte verdien av $b$ påvirker begge grensene uten å fjerne knekken.',
     '40–45 min · Individuell utgangsoppgave. Vis om $f(x)=|x-2|-3(x-2)$ er deriverbar ved $x=2$.'
   ],
   exit:'Venstre grense er $-4$, høyre grense er $-2$. Ulike ensidige grenser gir at funksjonen ikke er deriverbar i $x=2$.'
 },
 R2:{
   title:'Bestemt integral og geometrisk areal',
   goal:'Eleven skal skille nettoakkumulasjon fra geometrisk areal og bruke analysens fundamentalteorem.',
   prep:'Elevene bør kunne finne en enkel antiderivert og tolke fortegnet til en funksjonsverdi.',
   steps:[
     '0–5 min · Skisser $f(t)=t-2$ og be elevene anslå nettoakkumulasjonen fra $0$ til $4$.',
     '5–15 min · Utforsk hva som skjer med integralet og arealet når en integrasjonsgrense passerer et nullpunkt.',
     '15–30 min · La par regne integral og geometrisk areal for $f(t)=t-2$ på $[0,3]$. Sammenlikn med laboratoriet ved $c=2$ og $x=3$.',
     String.raw`30–40 min · Diskuter den akkumulerte funksjonen $A(x)=\int_0^x (t-2)\,\mathrm{d}t$. Knytt fortegnet til $A'(x)$ til hvor $A$ synker og stiger.`,
     '40–45 min · Individuell utgangsoppgave. Finn integralet og det geometriske arealet for $f(x)=x$ på $[-2,1]$, og forklar forskjellen.'
   ],
   exit:'Integralet er $-3/2$, mens det geometriske arealet er $5/2$. Den negative delen trekkes fra i integralet og legges til i arealet.'
 }
};
function realTeacher(){
 const plan=realPlans[fag];
 const rows=course.chapters.map(ch=>'<tr><th scope="row">'+link('tema/'+ch.id,ch.title)+'</th><td><ul>'+list(ch.goals)+'</ul></td><td>'+link('oppdrag/'+ch.id,'Elevoppdrag')+' · '+link('ov/'+ch.id,'Øving')+'</td></tr>').join('');
 const notes=course.chapters.map(ch=>'<details class="panel reading"><summary>'+esc(ch.title)+'</summary><p>'+prose(arr(ch.teacher).join(' '))+'</p>'+link('oppdrag/'+ch.id,'Se oppdrag og vurderingskriterier')+'</details>').join('');
 return '<h1>Lærerrom · '+fag+'</h1><section class="panel reading"><h2>45 minutter · '+plan.title+'</h2><p>'+prose(plan.goal)+'</p><p>'+prose(plan.prep)+'</p><ol>'+list(plan.steps)+'</ol>'+link('lab','Åpne laboratoriet','primary')+'<details><summary>Forventet svar på utgangsoppgaven</summary><p>'+prose(plan.exit)+'</p></details></section><section class="panel" id="laereplan"><h2>Læreplanmatrise</h2><p>Koblingen mellom kompetansemålene og arbeidet i hvert kapittel.</p><p><a href="'+esc(course.source)+'">Kompetansemål og vurdering hos Udir</a></p><div class="scroll"><table><thead><tr><th scope="col">Kapittel</th><th scope="col">Kompetansemål i kortform</th><th scope="col">Elevaktivitet</th></tr></thead><tbody>'+rows+'</tbody></table></div></section><h2>Undervisningsnotater</h2>'+notes;
}
function teacher(){
 if(real)return realTeacher();
 if(vocational)return '<h1>Lærerrom · '+fag+'</h1><section class="panel reading"><h2>Årsplan – veiledende rekkefølge</h2><p>Bruk kapitlene i oppgitt rekkefølge, med jevnlig repetisjon. Avslutt med årsprøve og et selvstendig yrkesrettet oppdrag.</p><p><a href="'+esc(course.source)+'">Gjeldende kompetansemål hos Udir</a></p></section>'+course.chapters.map((ch,i)=>'<section class="panel"><h3>'+ (i+1)+'. '+link('tema/'+ch.id,ch.title)+'</h3><ul>'+list(ch.goals)+'</ul><p>'+prose(arr(ch.teacher).join(' '))+'</p>'+link('oppdrag/'+ch.id,'Elevoppdrag')+' · '+link('ov/'+ch.id,'Øving')+'</section>').join('');
 return '<h1>Lærerrom · '+fag+'</h1><section class="panel reading"><h2>En økt på 45 minutter</h2><ol>'+list(one?['0–5 min: Tegn to prislinjer. La elevene forutsi hvilken avtale som passer ved lavt og høyt forbruk.','5–15 min: Åpne prislaboratoriet. La par anslå skjæringspunktet før de undersøker grafen og tabellen.','15–30 min: Endre fastpris og enhetspris. Hvert par lager et tilfelle der avtalene aldri får samme pris.','30–40 min: Bytt eksempler med et annet par. Begrunn valg av avtale ved to ulike forbruk.','40–45 min: Lever prisuttrykkene, skjæringspunktet og en setning om når konklusjonen gjelder.']:['0–5 min: Vis et lite datasett med reisetider og be om et anslag på en typisk reisetid.','5–15 min: Åpne datalaboratoriet. La par forutsi median og gjennomsnitt før beregning.','15–30 min: Endre den høyeste verdien. Forklar hva som skjer med begge sentralmålene.','30–40 min: Bytt datasett med en medelev. Begrunn hvilket sentralmål dere ville brukt i en presentasjon.','40–45 min: Lever ett eksempel der medianen er stabil, med mellomregning og tolkning.'])+'</ol>'+link('lab','Åpne laboratoriet','primary')+'</section><h2>Læreplan og elevoppdrag</h2><p>Del lenken til ønsket kapittel, øving eller oppdrag med klassen. Åpne oppdrag vurderes ut fra elevens framgangsmåte og begrunnelse.</p><p><a href="'+esc(course.source)+'">Kompetansemål og vurdering hos Udir</a></p>'+course.chapters.map(ch=>'<section class="panel"><h3>'+link('tema/'+ch.id,ch.title)+'</h3><ul>'+list(ch.goals)+'</ul><p>'+esc(arr(ch.teacher).join(' '))+'</p>'+link('oppdrag/'+ch.id,'Se elevoppdrag og vurderingskriterier')+'</section>').join('');
}
function record(){
 return '<h1>Min progresjon</h1><p>Øving og utkast tilhører dette faget og denne nettleseren.</p><section class="panel"><div class="scroll"><table><thead><tr><th>Kapittel</th><th>Øvingsstatus</th><th>Forsøk</th></tr></thead><tbody>'+progress(course).map(r=>'<tr><td>'+link('ov/'+r.id,r.title)+'</td><td>'+esc(r.status)+(r.due?' · Klar for repetisjon':'')+'</td><td>'+esc(r.attempts)+'</td></tr>').join('')+'</tbody></table></div><button class="secondary" id="reset">Nullstill '+fag+' på denne enheten</button></section>';
}
let cleanupLab;
function render(){
 if (typeof cleanupLab === 'function') cleanupLab();
 cleanupLab=null;
 menu();
 const [route,id]=location.hash.slice(1).split('/');
 const ch=course.chapters.find(c=>c.id===id);
 if(route==='innhold'){main.focus();return}
 if(route==='lab'){
   main.innerHTML='<h1>'+(real?'Laboratorium · '+fag:labName)+'</h1><div id="lab"></div>';cleanupLab=mountLab(main.querySelector('#lab'),fag);
 }else if(route==='prove' && vocational){
   main.innerHTML='<h1>Årsprøve · '+fag+'</h1><p>Tre oppgaver fra hvert kapittel. Svar uten hjelp, og se hvilke kapitler du bør repetere.</p><div id="year-test"></div>';mountYearTest(main.querySelector('#year-test'));
 }else if(route==='laerer') main.innerHTML=teacher();
 else if(route==='progresjon'){
   main.innerHTML=record();main.querySelector('#reset').onclick=()=>{if(confirm('Slette øvingshistorikk og egne utkast i '+fag+' fra denne nettleseren?')){resetPractice(course);if(fag==="R2")for(const k of ["rekursjon-kode","rekursjon-notater","trapes-kode","trapes-notater","trapes-eksakt"])try{localStorage.removeItem(k)}catch{}for(const c of course.chapters)try{localStorage.removeItem(draftKey(c.id))}catch{}render()}};
 }else if(ch && ['ov','sjekk'].includes(route)){
   main.innerHTML='<p class="crumb">'+link('tema/'+ch.id,ch.title)+'</p><h1>'+esc(ch.title)+'</h1><div id="practice"></div>';mountPractice(main.querySelector('#practice'),course,ch,route==='sjekk');
 }else if(ch && route==='oppdrag'){
   main.innerHTML=project(ch);const field=main.querySelector('textarea');
   try{field.value=localStorage.getItem(draftKey(id))||''}catch{}
   field.oninput=()=>{try{localStorage.setItem(draftKey(id),field.value)}catch{main.querySelector('#draft-status').textContent='Nettleseren kunne ikke lagre utkastet. Kopier teksten før du går videre.'}};
 }else main.innerHTML=ch && route==='tema'?theme(ch):home();
 if(real && ch && route==='tema'){
   const details=main.querySelector('#worked');
   details.addEventListener('toggle',()=>{if(details.open)noteExample(course,ch)});
   mountStep(main.querySelector('#step'),ch);
 }
 const heading=main.querySelector('h1')?.textContent;
 document.title=!heading||route==='start'||!location.hash?'Matematikkverksted '+fag:heading+' · Matematikkverksted '+fag;
 main.focus({preventScroll:true});window.scrollTo(0,0);
}
function mountYearTest(root){
 const tasks=course.chapters.flatMap(ch=>[0,1,2].map(level=>({ch,level,t:ch.task(level,Math.floor(Math.random()*1001))})));
 let index=0;const results=[];
 function show(){
  if(index===tasks.length){root.innerHTML='<section class="panel"><h2>Resultat: '+results.filter(r=>r.correct).length+' av '+tasks.length+'</h2><p>Dette er en øvingsprøve, ikke en karakter.</p>'+course.chapters.map(ch=>{const rs=results.filter(r=>r.ch===ch);return '<p>'+link('tema/'+ch.id,ch.title)+' · '+rs.filter(r=>r.correct).length+'/3'+(rs.every(r=>r.correct)?' – bra!':' – repeter fagstoff og øving')+'</p>'}).join('')+'<button id="again">Ny prøve</button></section>';root.querySelector('#again').onclick=()=>mountYearTest(root);return;}
  const {ch,level,t}=tasks[index];root.innerHTML='<section class="panel reading"><p class="eyebrow">Oppgave '+(index+1)+' av '+tasks.length+' · '+esc(ch.title)+' · '+['Støtte','Øving','Utfordring'][level]+'</p><h2>'+esc(t.q)+'</h2><form class="form-row"><label>Ditt svar '+esc(t.unit||'')+' <input type="text" inputmode="decimal" required></label><button>Svar</button></form><p role="status"></p><button class="secondary" id="skip-test">Hopp over</button></section>';
  const form=root.querySelector('form'),status=root.querySelector('[role="status"]');
  function finish(correct){results.push({ch,correct});form.querySelectorAll('button,input').forEach(el=>el.disabled=true);root.querySelector('#skip-test').remove();status.textContent=(correct?'Riktig! ':'Ikke riktig. ')+t.solution;const next=document.createElement('button');next.textContent=index+1===tasks.length?'Se resultat':'Neste oppgave';next.onclick=()=>{index++;show()};status.after(next);next.focus();}
  form.onsubmit=e=>{e.preventDefault();const check=vurder({type:'tall',svar:t.answer},form.querySelector('input').value);if(!check.gyldig){status.textContent=check.melding;return;}finish(check.riktig)};
  root.querySelector('#skip-test').onclick=()=>finish(false);
 }show();
}
document.querySelector('.skip').onclick=e=>{e.preventDefault();main.focus()};
window.addEventListener('hashchange',render);
render();
