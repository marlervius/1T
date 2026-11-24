import {ferdigheterA} from './oving-a.js';
import {ferdigheterB} from './oving-b.js';
import {grunnlag,supplerEldreGrunnlag} from './grunnlag.js';
import {kapitler} from './innhold.js';
import {vurder,statusFor,anbefal} from './motor.js';
import {escapeHtml as e,mathHtml} from './matematikk.js';
const basiskrav = {'algebra/1':['grunnlag/1'],'algebra/2':['grunnlag/2'],'likninger/1':['grunnlag/1','grunnlag/2'],'funksjoner/1':['grunnlag/4'],'funksjoner/2':['grunnlag/3']};
const kravGrunn = {
  'grunnlag/2': {'grunnlag/1':'Fortegn avgjør hva som skjer med hvert ledd når du ganger med et negativt tall.'},
  'grunnlag/3': {'grunnlag/2':'Når du løser opp en parentes, kan du se hvilke faktorer som er felles for flere ledd.'},
  'grunnlag/4': {'grunnlag/1':'Stigningstallet er en brøk, og fortegnene på differansene avgjør om grafen stiger eller synker.'},
  'algebra/1': {'grunnlag/1':'Brøker og fortegn hjelper deg å tolke negative eksponenter og potenser med negativt grunntall.'},
  'algebra/2': {'grunnlag/2':'Den distributive loven lar deg skrive om parentesuttrykk før du samler like ledd.'},
  'algebra/3': {'algebra/2':'Når du ganger ut to parenteser og samler like ledd, ser du hvor midtleddet kommer fra.',
    'grunnlag/2':'Å gange hvert ledd med hvert ledd i den andre parentesen hjelper deg å få med kryssleddene.'},
  'likninger/1': {'grunnlag/1':'Brøkregning og fortegn trengs når du isolerer den ukjente ved å dele begge sider.',
    'grunnlag/2':'Du må gange faktoren inn i hvert ledd når likningen har en parentes.',
    'algebra/2':'Ved å samle like ledd får du en enklere likning med samme løsning.'},
  'likninger/2': {'likninger/1':'Etter innsetting eller eliminasjon står du igjen med en likning med én ukjent.'},
  'likninger/3': {'likninger/1':'Løs den tilhørende likningen for å finne grensen i ulikheten.',
    'grunnlag/1':'Hvis du deler på et negativt tall, må du snu ulikhetstegnet for å bevare rekkefølgen på tallinja.',
    'grunnlag/3':'Null i nevneren utelukker et endepunkt fra løsningen.'},
  'andregrad/1': {'algebra/3':'Kvadratsetningene kan hjelpe deg med å faktorisere uttrykket før du bruker nullproduktregelen.',
    'likninger/1':'Å finne nullpunkter handler om å løse likningen der uttrykket er lik null.'},
  'andregrad/2': {'andregrad/1':'Når parabelen har to nullpunkter, ligger symmetriaksen midt mellom dem.'},
  'andregrad/3': {'andregrad/1':'Røttene deler tallinja i områder der andregradsuttrykket har fast fortegn.',
    'likninger/3':'Intervallskriving viser hvilke områder som skal med, og om røttene er med.'},
  'funksjoner/1': {'grunnlag/4':'Du bruker koordinatene til å finne stigningstallet i den lineære modellen.',
    'algebra/2':'Du bruker algebra til å skrive om uttrykket og skille fastleddet fra leddet som varierer med x.'},
  'funksjoner/2': {'grunnlag/3':'Vilkår i nevneren lar deg se hvilke x-verdier som er utelukket, også etter forkorting.',
    'algebra/3':'Faktorisering kan avsløre en felles faktor og forklare hvorfor grafen har et hull.',
    'funksjoner/1':'Stigningstall og konstantledd hjelper deg å beskrive en eventuell skrå asymptote.'},
  'funksjoner/3': {'algebra/1':'Potensregler trengs når du tolker gjentatt vekst eller en variabel med en fast eksponent.',
    'funksjoner/1':'En lineær modell med konstant differanse gir et sammenligningsgrunnlag når du undersøker veksten.'},
  'polynomdivisjon/1': {'algebra/3':'Trening på å gange ut parenteser gjør det lettere å kontrollere at divisor ganger kvotient pluss rest gir det opprinnelige polynomet.'},
  'polynomdivisjon/2': {'polynomdivisjon/1':'Resten etter divisjon med x − a forteller om x − a er en faktor.',
    'andregrad/1':'Når du har funnet én faktor, kan du finne de øvrige røttene ved å løse andregradslikningen som står igjen.',
    'likninger/1':'I noen oppgaver gir restsetningen en likning der du kan isolere en ukjent koeffisient.'},
  'polynomdivisjon/3': {'polynomdivisjon/2':'Restsetningen hjelper deg med å finne faktorer som kan være felles for teller og nevner.',
    'funksjoner/2':'Forskjellen mellom et hull og en vertikal asymptote avhenger av om faktoren i nevneren blir forkortet bort.'},
  'derivasjon/1': {'funksjoner/1':'Gjennomsnittlig vekstfart er stigningstallet til sekanten gjennom to punkter.'},
  'derivasjon/2': {'derivasjon/1':'Tangentens stigningstall er den momentane vekstfarten i punktet.',
    'algebra/1':'Potensregelen bruker eksponenten for å finne koeffisienten og den nye eksponenten.'},
  'derivasjon/3': {'derivasjon/2':'Den deriverte lar deg finne indre kandidater til maksimum ved å sette vekstfarten lik null.',
    'andregrad/2':'Toppunktet til en parabel gir øving i å skille mellom hvor maksimum oppstår og hvilken verdi det har.'},
  'trigonometri/1': {'algebra/1':'Potenser og røtter trengs når du bruker Pytagoras til å finne en ukjent side.'},
  'trigonometri/2': {'trigonometri/1':'Kjennskap til sinus og cosinus hjelper deg å velge riktig trekantsetning ut fra sidene og vinklene du kjenner.',
    'algebra/3':'Det er nyttig å kjenne kvadratiske sammenhenger når du regner med kvadrerte sidelengder.'},
  'trigonometri/3': {'trigonometri/2':'Når du deler figuren i trekanter, bruker du trekantsetningene i én trekant om gangen.'},
  'modellering/1': {'funksjoner/1':'I en lineær modell må du kunne tolke stigningstall og konstantledd i situasjonen.',
    'likninger/1':'Når du kjenner modellens verdi, kan du sette opp og løse en likning for den ukjente.'},
  'modellering/2': {'modellering/1':'Variablenes betydning og modellens gyldighetsområde hjelper deg å tolke residualene.',
    'funksjoner/3':'Kjennetegn på eksponential- og potensmodeller gir deg noe konkret å se etter når du sammenligner modellene.'},
  'modellering/3': {'modellering/1':'Situasjonen du modellerer avgjør hvilket intervall det er meningsfullt å søke i.',
    'funksjoner/1':'Funksjonsverdien viser om punktet ligger over eller under målet du søker etter.'}
};
export const ferdigheter = [...ferdigheterA,...ferdigheterB,...grunnlag].map(f=>({
  ...f,krav:[...new Set([...(basiskrav[f.id]||[]),...f.krav])],kravGrunn:kravGrunn[f.id] || {}
}));

  const storageKey = 'matematikkverksted-1t-oving-v1';
  const oppgaveversjon = 2;
  const byId = new Map(ferdigheter.map(f=>[f.id,f]));

  let lagring = true;
  let logg = [];
  let veiledning = true;
  let active = null;
  let diag = null;
  let observedRoute = '';
  const diagIds = ['grunnlag/1','grunnlag/2','grunnlag/4','algebra/2','likninger/1'];
  const veier = ['Ekstra støtte','Ordinær vei','Ekstra utfordring'];
  const format = {
    tall:'Skriv et tall. Du kan bruke desimalkomma eller brøk.',
    polynom:'Bruk x, parenteser og ^ for potens. Eksempel: (x+2)^2.',
    mengde:'Skill løsningene med semikolon, for eksempel {-2; 3}.',
    intervall:'Skriv et intervall, for eksempel [-2; 3) eller (-inf; 4].',
    valg:'Velg ett svar.'
  };
  function hentAktiv(a) {
    if (!a || !byId.has(a.id) || ![0,1,2].includes(a.nivaa) || !a.opp?.sporsmal || !a.ref) return null;
    if (a.versjon!==oppgaveversjon && !a.forsok && !a.hint && !a.eksempel && !a.raw) return null;
    if (a.versjon!==oppgaveversjon && a.id==='grunnlag/1') supplerEldreGrunnlag(a.opp);
    if (a.opp.type==='intervall') {
      // JSON lagrer uendelige endepunkter som null.
      for (const intervall of [a.opp.svar, ...(a.opp.feil || []).map(f=>f.verdi)]) {
        if (intervall?.lo===null) intervall.lo=-Infinity;
        if (intervall?.hi===null) intervall.hi=Infinity;
      }
    }
    return a;
  }
  function hent() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!value || !Array.isArray(value.logg)) return;
      // Merge individual observations when a second tab has written since mount.
      const events = new Map(value.logg.filter(r=>r && byId.has(r.id) && typeof r.ref==='string')
        .map(r=>[r.ref,r]));
      for(const r of logg){
        if(!events.has(r.ref) || events.get(r.ref).tid <= r.tid) events.set(r.ref,r);
      }
      logg = [...events.values()].sort((a,b)=>a.tid-b.tid);
      veiledning = value.veiledning !== false;
      if (!active) active = hentAktiv(value.active);
    } catch { lagring=false; }
  }
  function skriv() {
    try { localStorage.setItem(storageKey,JSON.stringify({logg,veiledning,active})); }
    catch { lagring=false; }
  }
  function nullstillOving() {
    logg=[]; active=null; diag=null; observedRoute=''; veiledning=true;
    try { localStorage.removeItem(storageKey); } catch { lagring=false; }
  }
  function settVeiledning(on) { hent(); veiledning=!!on; skriv(); }
  hent();
  window.addEventListener('storage',event=>{
    if(event.key==='matematikkverksted-1t-gjenopprettet') window.location.reload();
    else if(event.key===storageKey) hent();
  });
  function kontekst() { return {ferdigheter,logg,veiledning,settVeiledning}; }
  function giOppgave(id,nivaa,grunn) {
    const skill = byId.get(id);
    const old = new Set(logg.filter(r=>r.id===id).map(r=>r.variant));
    if(active?.id===id)old.add(active.variant);
    const seed = Math.floor(Math.random()*1000000);
    let opp, variant;
    for(let i=0;i<48;i++){
      opp=skill.lag(nivaa,seed+i);
      variant=String(opp.variant ?? opp.sporsmal);
      if(!old.has(variant))break;
    }
    return {id,nivaa,grunn,opp,variant,versjon:oppgaveversjon,ref:crypto.randomUUID(),hint:0,forsok:0,riktig:false,feil:'',ferdig:false,feedback:'',raw:'',fasit:false};
  }
  function start(fokus='',nivaa=null) {
    const next = anbefal(ferdigheter,logg,Date.now(),fokus);
    const fast = nivaa!==null;
    return giOppgave(next.id,fast?nivaa:next.nivaa,fast?'Denne veien er valgt for økta. Du kan bytte underveis.':next.grunn);
  }
  function seRute(page,skill='',nivaa=null) {
    const route=[page,skill,nivaa].join('/');
    if(page==='tren' && observedRoute!==route){
      const fortsett = !observedRoute && active && (!skill || active.id===skill) && (nivaa===null || active.nivaa===nivaa);
      if(!fortsett){ active=start(skill,nivaa); skriv(); }
    }
    observedRoute=route;
  }
  function registrer(a){
    hent();
    const record={id:a.id,ref:a.ref,variant:a.variant,nivaa:a.nivaa,riktig:a.riktig,hint:Math.max(a.hint,a.eksempel?1:0),
      forsok:a.forsok,tid:Date.now(),feil:a.feil,feilKrav:a.feilKrav};
    const i=logg.findIndex(r=>r.ref===a.ref);
    if(i>=0)logg[i]=record;else logg.push(record);
    skriv();
  }
  function status(id){return statusFor(id,logg);}
  function neste(){return anbefal(ferdigheter,logg);}
  function skillName(id){ return byId.get(id)?.kort || ''; }
  function skillLink(id){return id.startsWith('grunnlag/')?'#tren/'+id+'/0':'#leksjon/'+id;}
  function kanGåVidere(a) {
    return a.ferdig || a.forsok>=2 || (a.forsok===1 && a.hint>0);
  }
  function hintBox(a, isDiag) {
    if(isDiag || !veiledning || a.ferdig)return '';
    const past=a.opp.hint.slice(0,a.hint);
    return `<div class="hint-area"><div id="hint-tekst">${past.map((h,i)=>`<p><strong>Hint ${i+1}</strong> ${mathHtml(h)}</p>`).join('')}</div>
      ${a.hint<a.opp.hint.length?`<button type="button" class="quiet-control" data-hint>${a.hint?'Få neste hint':'Jeg trenger et hint'}</button>`:''}
      ${kanGåVidere(a)||a.hint>=2?'<button type="button" class="quiet-control" data-fasit>Gå gjennom løsningen</button>':''}</div>`;
  }
  function oppgaveflate(a,isDiag) {
    const q=a.opp, f=byId.get(a.id), choice=q.type==='valg';
    const valg = choice?q.valg.map((v,i)=>`<label class="valg-rad"><input type="radio" name="valg" value="${i}" ${a.raw===v?'checked':''} required><span>${mathHtml(v)}</span></label>`).join(''):'';
    return `<section class="practice-card" aria-labelledby="opp-tittel">
      <div class="exercise-line"><span>${isDiag?'Kartlegging':e(veier[a.nivaa])}</span><span>${e(f.kort)}</span></div>
      ${isDiag?'':'<p class="track">Uten hjelpemidler · Automatisk svarretting</p>'}
      <h2 id="opp-tittel" tabindex="-1">${mathHtml(q.sporsmal)}</h2>
      <form id="sjekk-oving"><fieldset ${a.ferdig?'disabled':''}><legend>${choice?'Svaralternativer':'Ditt svar'}</legend>
      ${choice?valg:`<input class="answer-input" id="oving-svar" aria-label="Ditt svar" aria-describedby="oving-format" value="${e(a.raw)}" required autocomplete="off" spellcheck="false"><small id="oving-format">${mathHtml(q.format||format[q.type||'tall'])}</small>`}
      ${a.ferdig?'':'<button class="button solid" type="submit">Sjekk svar</button>'}</fieldset></form>
      <div id="oving-feedback" tabindex="-1" role="status" class="${a.feedback?'result-box '+(a.riktig?'success':'try-again'):''}">${mathHtml(a.feedback)}</div>
      ${hintBox(a,isDiag)}
      ${a.ferdig?`<details class="worked" ${a.fasit?'open':''}><summary>Se utregningen</summary><p>${mathHtml(q.losning)}</p></details>`:''}
      <div class="next-actions">${a.ferdig || (!isDiag && kanGåVidere(a))?`<button class="button solid" data-next>${isDiag?(diag.index===diagIds.length-1?'Vis oppsummering':'Neste spørsmål'):'Neste oppgave'}</button>`:''}
      ${!isDiag && a.forsok===1 && !kanGåVidere(a)?`<p class="track">${veiledning && q.hint.length?'Åpne et hint eller prøv et nytt svar for å gå videre.':'Prøv et nytt svar for å gå videre.'}</p>`:''}
      ${isDiag && !a.ferdig?'<button class="quiet-control" data-skip>Hopp over spørsmålet</button>':''}</div></section>`;
  }
  function rutevalg(fokus,nivaa,a) {
    const opts = ferdigheter.map(f=>`<option value="${e(f.id)}"${f.id===fokus?' selected':''}>${e(f.kort)}</option>`).join('');
    return `<details class="practice-settings"><summary>Endre ferdighet eller læringsvei</summary><form id="endre-oving" class="filters">
      <label>Ferdighet<select name="fokus"><option value="">Anbefalt ferdighet</option>${opts}</select></label>
      <label>Læringsvei<select name="nivaa"><option value="">Tilpass underveis</option>${veier.map((v,i)=>`<option value="${i}" ${nivaa===i?'selected':''}>${v}</option>`).join('')}</select></label>
      <button class="button outline">Bruk valget</button></form></details>`;
  }
  function trenSide(fokus='',nivaa=null){
    if(!active){active=start(fokus,nivaa);skriv();}
    const f=byId.get(active.id);
    const bareGrunn=f.id.startsWith('grunnlag/');
    const les=bareGrunn?null:kapitler.find(k=>k.id===f.id.split('/')[0])?.leksjoner[Number(f.id.split('/')[1])-1];
    return `<header class="practice-head"><span class="eyebrow">Min øving</span><h1>${e(f.kort)}</h1><p>${e(active.grunn)}</p></header>
    <div class="practice-grid"><div>${oppgaveflate(active,false)}${rutevalg(fokus,nivaa,active)}
    ${lagring?'':'<p role="status">Lagring er blokkert. Økta fungerer så lenge fanen er åpen.</p>'}</div><aside class="practice-help"><h2>Faglig støtte</h2>
    <details ${active.nivaa===0?'open':''}><summary>Kort forklart</summary><p>${mathHtml(f.stotte)}</p></details>
    <details><summary>Ord og begreper</summary><p>${mathHtml(f.ord)}</p></details>
    ${les?`<details data-eksempel><summary>Gjennomregnet eksempel</summary><p>${mathHtml(les.eksempel)}</p><ol>${les.steg.map(t=>`<li>${mathHtml(t)}</li>`).join('')}</ol></details><a class="text-link" href="#leksjon/${f.id}">Åpne leksjonen</a>`:''}
    ${f.krav.length?`<h3>Forkunnskaper</h3><ul>${f.krav.map(k=>`<li><a href="#tren/${e(k)}/0">${e(skillName(k))}</a><br><small>${e(f.kravGrunn[k] || '')}</small></li>`).join('')}</ul>`:''}
    <details><summary>Utforsk videre</summary><p>${mathHtml(f.utforsk)}</p></details></aside></div>`;
  }
  function diagSide(){
    if(!diag)return `<header class="practice-head"><span class="eyebrow">Frivillig kartlegging</span><h1>Finn et startpunkt</h1><p>Fem korte spørsmål om regning, uttrykk, grafer og likninger. Du kan hoppe over spørsmål. Etterpå får du et forslag til hva du kan øve på.</p></header>
    <section class="pane narrow"><h2>Før du begynner</h2><p>Bruk gjerne kladdeark. Prøv på egen hånd. Svarene brukes til å foreslå øving, og bare denne nettleseren husker dem.</p><div class="actions"><button class="button solid" data-diag-start>Start kartleggingen</button><a class="button outline" href="#tren">Gå direkte til øving</a></div></section>`;
    if(diag.index>=diagIds.length){
      const first = diag.svar.find(r=>!r.riktig)?.id;
      const next = first?{id:first,nivaa:0}:neste();
      return `<header class="practice-head"><span class="eyebrow">Kartlegging</span><h1>Ditt startpunkt</h1><p>Hvert spørsmål gir ett holdepunkt. Videre øving og repetisjon gir et sikrere bilde.</p></header>
      <section class="pane narrow"><h2>Forslag til første økt</h2><p>${e(skillName(next.id))}</p><a class="button solid" href="#tren/${e(next.id)}">Øv på denne ferdigheten</a>
      <ul class="diag-result">${diag.svar.map(r=>`<li><a href="#tren/${e(r.id)}">${e(skillName(r.id))}</a><span>${r.skipped?'Hoppet over':r.riktig?'Riktig på kartleggingen':'Prøv med støtte'}</span></li>`).join('')}</ul>
      <button class="quiet-control" data-diag-start>Ta en ny kartlegging</button></section>`;
    }
    return `<header class="practice-head"><span class="eyebrow">Kartlegging</span><h1>Spørsmål ${diag.index+1} av ${diagIds.length}</h1><progress value="${diag.index}" max="${diagIds.length}" aria-label="Besvarte spørsmål"></progress></header><div class="narrow">${oppgaveflate(diag.task,true)}</div>`;
  }
  function nesteDiag(){
    if(diag.index<diagIds.length)diag.task=giOppgave(diagIds[diag.index],0,'');
  }
  function bindOving(root,page,fokus,nivaa,rerender){
    const isDiag=page==='kartlegging';
    const a=isDiag?diag?.task:active;
    const redraw=focusTo=>{
      rerender();
      if(focusTo)root.querySelector(focusTo)?.focus({preventScroll:true});
    };
    root.querySelector('[data-diag-start]')?.addEventListener('click',()=>{
      diag={index:0,svar:[],task:null};nesteDiag();redraw('#opp-tittel');
    });
    if(!a || (isDiag && diag.index>=diagIds.length))return;
    const input=root.querySelector('#oving-svar');
    input?.addEventListener('input',()=>{a.raw=input.value;skriv();});
    root.querySelectorAll('input[name="valg"]').forEach(el=>el.addEventListener('change',()=>{a.raw=a.opp.valg[Number(el.value)];skriv();}));
    root.querySelector('#sjekk-oving').addEventListener('submit',event=>{
      event.preventDefault(); if(a.ferdig)return;
      const check=vurder(a.opp,a.raw,true);
      a.feedback=check.melding;
      if(check.gyldig){
        if (!isDiag && a.forsok && a.svarnøkkel===check.svarnøkkel) {
          a.feedback='Dette har samme verdi som forrige svar. Prøv et nytt svar.';
          skriv(); redraw('#oving-feedback'); return;
        }
        a.svarnøkkel=check.svarnøkkel;
        a.forsok++;
        a.riktig=check.riktig;
        if(!a.riktig){
          const krav=a.opp.feil?.find(f=>f.tekst===check.melding)?.krav;
          if (!a.feil || (krav && !a.feilKrav)) {
            a.feil=check.melding;
            a.feilKrav=krav;
          }
        }
        a.ferdig=a.riktig || isDiag; registrer(a);
      }
      skriv(); redraw('#oving-feedback');
    });
    root.querySelector('[data-hint]')?.addEventListener('click',()=>{
      a.hint=Math.min(a.opp.hint.length,a.hint+1);
      if(a.forsok)registrer(a);else skriv();
      redraw('#hint-tekst');const el=root.querySelector('#hint-tekst');if(el){el.tabIndex=-1;el.focus();}
    });
    root.querySelector('[data-fasit]')?.addEventListener('click',()=>{
      a.hint=Math.max(3,a.hint);a.ferdig=true;a.fasit=true;a.feedback='Les gjennom stegene. Prøv deretter en ny oppgave.';registrer(a);redraw('#oving-feedback');
    });
    root.querySelector('[data-eksempel]')?.addEventListener('toggle',event=>{
      if(event.target.open && !a.ferdig){a.eksempel=true;skriv();}
    });
    const advance=(skipped=false)=>{
      if(isDiag){
        diag.svar.push({id:a.id,riktig:a.riktig,skipped});diag.index++;nesteDiag();
      }else {active=start(fokus,nivaa);skriv();}
      redraw('#opp-tittel'); if(isDiag && diag.index>=diagIds.length)root.focus();
      window.scrollTo(0,0);
    };
    root.querySelector('[data-next]')?.addEventListener('click',()=>advance());
    root.querySelector('[data-skip]')?.addEventListener('click',()=>advance(true));
    root.querySelector('#endre-oving')?.addEventListener('submit',event=>{
      event.preventDefault();const fd=new FormData(event.target);
      const lv=fd.get('nivaa'), id=fd.get('fokus') || (lv===''?'':a.id);
      const dest='#tren'+(id?'/'+id:'')+(lv===''?'':'/'+lv);
      if(location.hash!==dest) location.hash=dest;
      else if(a.forsok!==1 || kanGåVidere(a)){active=start(fokus,nivaa);skriv();redraw('#opp-tittel');}
    });
  }
  function kart(){
    const group=(name,skills)=>{
      return `<section class="map-section"><h3>${e(name)}</h3><ul>${skills.map(f=>{
        const st=status(f.id);
        return `<li><a href="#tren/${f.id}"><span>${e(f.kort)}</span><small>${st.forfalt?'Tid for repetisjon':e(st.navn)}</small></a>${f.krav.length?`<span class="prereq">Bygger på ${f.krav.map(k=>`<a href="${skillLink(k)}">${e(skillName(k))}</a>`).join(', ')}</span>`:''}</li>`;
      }).join('')}</ul></section>`;
    };
    return `<section class="pane"><h2>Ferdighetskart</h2><p class="track">Åpne en ferdighet for å øve. Mestring bekreftes med selvstendige løsninger på ulike oppgaver og en ny kontroll tidligst neste døgn.</p><div class="map-grid">${group('Forkunnskaper',ferdigheter.filter(f=>f.id.startsWith('grunnlag/')))}${kapitler.map(k=>group(k.tittel,ferdigheter.filter(f=>f.id.startsWith(k.id+'/')))).join('')}</div></section>`;
  }

export {kontekst,seRute,trenSide,diagSide,bindOving,kart,neste,status,skillName,nullstillOving};

