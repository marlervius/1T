// Svarretting i et avgrenset språk. Brøker og polynomkoeffisienter regnes eksakt.
const grense = 10n ** 150n;
const dag = 86400000;
const stopp = melding => { throw new Error(melding); };
const abs = x => x < 0n ? -x : x;

function brøk(t, n = 1n) {
  if (n === 0n) stopp('Divisjon med null er udefinert. Kontroller nevneren.');
  if (n < 0n) { t = -t; n = -n; }
  let a = abs(t), b = n;
  while (b) [a, b] = [b, a % b];
  t /= a; n /= a;
  if (abs(t) > grense || n > grense) stopp('Tallene i mellomregningen ble for store. Forenkle uttrykket først.');
  return [t, n];
}
const pluss = ([a, b], [c, d]) => brøk(a*d + b*c, b*d);
const ganger = ([a, b], [c, d]) => brøk(a*c, b*d);
const nullBrøk = [0n, 1n], en = [1n, 1n];

function desimal(literal) {
  const [mantisse, exp = '0'] = literal.toLowerCase().replace(',', '.').split('e');
  const [hel, des = ''] = mantisse.split('.');
  const skala = des.length - Number(exp);
  if (Math.abs(skala) > 150) stopp('Eksponenten er for stor for dette svarfeltet.');
  const heltall = BigInt(hel + des);
  return skala < 0 ? brøk(heltall * 10n ** BigInt(-skala)) : brøk(heltall, 10n ** BigInt(skala));
}
function trim(coeff) {
  while (coeff.length > 1 && coeff.at(-1)[0] === 0n) coeff.pop();
  return coeff;
}
function summer(p, q) {
  return trim(Array.from({length: Math.max(p.length, q.length)}, (_, i) =>
    pluss(p[i] || nullBrøk, q[i] || nullBrøk)));
}
function produkt(p, q) {
  if (p.length + q.length - 2 > 24) stopp('Dette feltet støtter polynomer til og med grad 24.');
  const r = Array(p.length + q.length - 1).fill(nullBrøk);
  p.forEach((a, i) => q.forEach((b, j) => { r[i+j] = pluss(r[i+j], ganger(a,b)); }));
  return trim(r);
}
function normaliser(s) {
  const opphøyd = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-'};
  return s.replace(/[−–]/g, '-').replace(/[·×]/g, '*').replace(/÷/g, '/').replace(/\*\*/g,'^')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, m => '^' + [...m].map(c => opphøyd[c]).join(''));
}
function polynom(raw, tillatX) {
  const input = normaliser(raw).trim().replace(/(?<=\d)[ \u00a0\u202f](?=\d{3}(?:[ \u00a0\u202f]\d{3})*(?:[^\d]|$))/g,'');
  if (input.length > 200) stopp('Uttrykket er for langt. Forenkle mellomregningene først.');
  const tokens = input.match(/(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?|\S/gu) || [];
  let pos = 0, antallX = 0;
  const talltegn = s => typeof s === 'string' && /^[\d.,]/.test(s);
  function atom() {
    const t = tokens[pos++];
    if (t === 'x' && tillatX) { antallX++; return [nullBrøk, en]; }
    if (talltegn(t) && /\d/.test(t)) return [desimal(t)];
    if (t === '(') {
      const p = sum();
      if (tokens[pos++] !== ')') stopp('Kontroller at parentesene er lukket.');
      return p;
    }
    stopp(tillatX ? 'Bruk tall, x, parenteser og regnetegn i polynomet.' : 'Skriv et tall eller et regneuttrykk med tall.');
  }
  function potens() {
    const p = atom();
    if (tokens[pos] !== '^') return p;
    pos++;
    const før = antallX;
    const [eks] = fortegn();
    if (antallX !== før || eks[1] !== 1n || abs(eks[0]) > 24n)
      stopp('Her må eksponenten være et heltall fra −24 til 24.');
    if (eks[0] === 0n && p.length === 1 && p[0][0] === 0n) stopp('Uttrykket 0⁰ er ikke definert i dette feltet.');
    if (eks[0] < 0n && p.length > 1) stopp('En negativ eksponent på et x-uttrykk gir en nevner. Skriv svaret som polynom.');
    const base = eks[0] < 0n ? [brøk(p[0][1], p[0][0])] : p;
    let r = [en];
    for (let i = 0; i < Number(abs(eks[0])); i++) r = produkt(r, base);
    return r;
  }
  function fortegn() {
    if (!['-', '+'].includes(tokens[pos])) return potens();
    const tegn = tokens[pos++];
    const p = fortegn();
    return tegn === '-' ? p.map(([a,b]) => [-a,b]) : p;
  }
  function ledd() {
    let p = fortegn();
    for (;;) {
      let op = tokens[pos];
      if (op === '*' || op === '/') pos++;
      else if (op === '(' || op === 'x') op = '*';
      else break;
      const før = antallX;
      const q = fortegn();
      if (op === '/') {
        if (antallX !== før) stopp('En nevner med x kan endre definisjonsmengden. Dette feltet ber om et polynom som gjelder for alle reelle x.');
        p = produkt(p, [brøk(q[0][1], q[0][0])]);
      } else p = produkt(p, q);
    }
    return p;
  }
  function sum() {
    let p = ledd();
    while (['+', '-'].includes(tokens[pos])) {
      const tegn = tokens[pos++];
      const q = ledd();
      p = summer(p, tegn === '-' ? q.map(([a,b]) => [-a,b]) : q);
    }
    return p;
  }
  const p = sum();
  if (pos !== tokens.length) stopp('Kontroller regnetegnene mellom leddene.');
  return p;
}

function sammeTall(r, fasit) {
  if (r === Infinity || r === -Infinity) return r === fasit;
  if (!Number.isFinite(fasit)) return false;
  const [a,b] = desimal(String(fasit));
  if (r[0]*b === a*r[1]) return true;
  // JS-genererte brøksvar kan være avrundet i innholdsfilen (f.eks. 1/3).
  // Heltall og endelige, korte desimalfasiter sammenlignes alltid eksakt.
  if (Number.isInteger(fasit) || !/\d{13}/.test(String(fasit).split('.')[1] || '')) return false;
  return Math.abs(Number(r[0])/Number(r[1]) - fasit) <= 2*Number.EPSILON*Math.abs(fasit);
}
function skalar(s) { return polynom(s, false)[0]; }
function mengde(input) {
  let s = input.trim().replace(/^\s*(?:[xX]\s*∈|[LlSs]\s*=)\s*/, '');
  if (/^(?:∅|\{\s*\}|tom(?: mengde)?|ingen(?: løsninger)?)$/i.test(s)) return [];
  if (s.startsWith('{') || s.endsWith('}')) {
    if (!s.startsWith('{') || !s.endsWith('}')) stopp('Lukk mengden med en krøllparentes.');
    s = s.slice(1,-1);
  }
  // Semikolon er entydig ved norsk desimalkomma. Også «1, 2» og «1 og 2» støttes.
  const deler = /;/.test(s) ? s.split(';') : s.split(/,\s+|\s+(?:og|eller)\s+/i);
  const svar = deler.map(x => skalar(x.trim().replace(/^x\s*=\s*/i, '')));
  return svar.filter(([a,b], i) => !svar.slice(0,i).some(([c,d]) => a*d === c*b));
}
function grenseverdi(s) {
  const t = s.trim().toLowerCase();
  if (/^[+]?(?:∞|inf(?:inity)?|infty|uendelig)$/.test(t)) return Infinity;
  if (/^-(?:∞|inf(?:inity)?|infty|uendelig)$/.test(t)) return -Infinity;
  return skalar(t);
}
function sammenlign(a,b) {
  if (a === b) return 0;
  if (a === -Infinity || b === Infinity) return -1;
  if (a === Infinity || b === -Infinity) return 1;
  const d = a[0]*b[1] - b[0]*a[1];
  return d < 0n ? -1 : d > 0n ? 1 : 0;
}
function intervall(input) {
  let s = normaliser(input).trim().replace(/^x\s*∈\s*/i, '').replace(/≤/g,'<=').replace(/≥/g,'>=');
  if (/^(?:ℝ|R)$/.test(s)) return {lo:-Infinity,hi:Infinity,lc:false,hc:false};
  let lo = -Infinity, hi = Infinity, lc = false, hc = false;
  if (s.includes('x')) {
    const deler = s.split(/(<=|>=|<|>)/).map(x=>x.trim());
    if (![3,5].includes(deler.length) || (deler.length===5 && deler[2]!=='x')) stopp('Skriv for eksempel −2 < x ≤ 4.');
    for (let i=0; i<deler.length-1; i+=2) {
      const [a,op,b] = deler.slice(i,i+3);
      if ((a==='x')===(b==='x')) stopp('Skriv en grense på hver side av x.');
      const øvre = a === 'x' ? op[0] === '<' : op[0] === '>';
      const n = grenseverdi(a === 'x' ? b : a);
      if (øvre && hi === Infinity) {hi=n; hc=op.includes('=');}
      else if (!øvre && lo === -Infinity) {lo=n; lc=op.includes('=');}
      else stopp('Skriv hvert endepunkt én gang.');
    }
  } else {
    const start = s[0], slutt = s.at(-1);
    if (!['[','(',']','⟨','<'].includes(start) || ![']',')','[','⟩','>'].includes(slutt))
      stopp('Skriv intervallet som [1; 3), eller bruk ulikheter med x.');
    lc = start === '['; hc = slutt === ']';
    s = s.slice(1,-1);
    const grenser = s.includes(';') ? s.split(';') : s.split(',');
    if (grenser.length !== 2) stopp('Skill endepunktene med semikolon, for eksempel [0,5; 2).');
    [lo,hi] = grenser.map(grenseverdi);
  }
  if ((lo === -Infinity && lc) || (hi === Infinity && hc))
    stopp('Uendelig er ingen tallverdi. Sett en åpen grense der intervallet fortsetter uten ende.');
  const orden = sammenlign(lo,hi);
  if (orden > 0 || (orden === 0 && (!lc || !hc))) stopp('Kontroller rekkefølgen på endepunktene. Intervallet her skal ha minst én verdi.');
  return {lo,hi,lc,hc};
}

function tallnøkkel(tall) {
  return Array.isArray(tall) ? tall.join('/') : String(tall);
}

function forkortetBrøksvar(s, [t, n]) {
  const deler = normaliser(s).match(/^([+-]?\s*\d+)\s*\/\s*([+-]?\s*\d+)$/);
  if (!deler) return '';
  const nevner = BigInt(deler[2].replace(/\s/g,''));
  const faktor = abs(nevner) / n;
  if (faktor < 2n) return '';
  const enkel = n===1n ? String(t) : `${t<0n?'-':''}\\frac{${abs(t)}}{${n}}`;
  return `Riktig verdi. Forkort brøken ved å dele teller og nevner på ${faktor}. Da får du $${enkel}$.`;
}

export function vurder(oppgave, råstreng, medSvarenøkkel = false) {
  const s = String(råstreng ?? '').trim();
  const type = oppgave.type || 'tall';
  try {
    if (!s || s.length>260) stopp(s ? 'Svaret er for langt. Skriv resultatet i kortere form.' : 'Skriv inn eller velg et svar først.');
    let passer, svarnøkkel, forkorting;
    if (type === 'valg') {
      if (!oppgave.valg?.includes(s)) stopp('Velg ett av svaralternativene.');
      passer = fasit => s === fasit;
      svarnøkkel = s;
    } else if (type === 'tall') {
      const tall = skalar(s);
      passer = fasit => sammeTall(tall, fasit);
      svarnøkkel = tallnøkkel(tall);
      forkorting = () => forkortetBrøksvar(s,tall);
    } else if (type === 'polynom') {
      const p = polynom(s, true);
      passer = fasit => Array.isArray(fasit) && Array.from({length:Math.max(p.length,fasit.length)}, (_,i) =>
        sammeTall(p[i] || nullBrøk, fasit[i] ?? 0)).every(Boolean);
      svarnøkkel = p.map(tallnøkkel).join(';');
    } else if (type === 'mengde') {
      const m = mengde(s);
      passer = fasit => Array.isArray(fasit) && new Set(fasit).size===m.length &&
        [...new Set(fasit)].every(t => m.some(r => sammeTall(r,t)));
      svarnøkkel = m.map(tallnøkkel).sort().join(';');
    } else if (type === 'intervall') {
      const v = intervall(s);
      passer = f => f && v.lc===f.lc && v.hc===f.hc && sammeTall(v.lo,f.lo) && sammeTall(v.hi,f.hi);
      svarnøkkel = [tallnøkkel(v.lo),tallnøkkel(v.hi),v.lc,v.hc].join(';');
    } else stopp('Denne oppgaven må vurderes sammen med en lærer.');
    const riktig = passer(oppgave.svar);
    const kjent = riktig ? null : oppgave.feil?.find(f => passer(f.verdi));
    return {riktig,gyldig:true,melding:riktig ? forkorting?.() || 'Riktig. Sammenlign gjerne fremgangsmåten din med løsningen.' :
      kjent?.tekst || 'Svaret stemmer ikke ennå. Se på det første steget eller åpne et hint.',
      ...(medSvarenøkkel ? {svarnøkkel} : {})};
  } catch (feil) {
    return {riktig:false,gyldig:false,melding:feil.message};
  }
}

// Hvert loggelement gjelder én konkret oppgave. Ingen inferens fra svartid eller egenavkryssing.
function observasjoner(id, logg, nå) {
  return logg.filter(o => o && o.id === id && typeof o.variant === 'string' && o.variant &&
    [0,1,2].includes(o.nivaa) && typeof o.riktig==='boolean' && Number.isInteger(o.hint) && o.hint>=0 &&
    Number.isInteger(o.forsok) && (o.forsok>=1 || (o.forsok===0 && o.hint>0 && !o.riktig)) &&
    Number.isFinite(o.tid) && o.tid<=nå)
    .sort((a,b)=>a.tid-b.tid);
}
const selvstendig = o => o.riktig && o.hint===0 && o.forsok===1;

function analyser(funn, nå) {
  const sistSett = new Map(), sikre = new Set();
  let ordinær = false, klar = null, bekreftet = null, støttePåRad = 0, sistKontrollert = '';
  for (const o of funn) {
    const forrige = sistSett.get(o.variant);
    const ny = forrige === undefined;
    // Etter den første bekreftelsen kan en annen variant brukes igjen etter en uke.
    // En liten oppgavebank skal fortsatt kunne støtte vedlikehold over et skoleår.
    const fordeltRepetisjon = sistKontrollert && sistKontrollert!==o.variant && o.tid-forrige>=7*dag;
    sistSett.set(o.variant,o.tid);
    if (!selvstendig(o)) {
      støttePåRad++;
      bekreftet=null;
      if (klar !== null) klar=o.tid;
      if (støttePåRad>=2) { sikre.clear(); ordinær=false; klar=null; sistKontrollert=''; }
      continue;
    }
    if (!ny && !fordeltRepetisjon) continue;
    støttePåRad=0;
    sikre.add(o.variant);
    if (o.nivaa>0) ordinær=true;
    if (klar === null && sikre.size>=2 && ordinær) klar=o.tid;
    else if (klar!==null && o.nivaa>0 && o.tid-klar>=dag) {
      bekreftet=o.tid; sistKontrollert=o.variant;
    }
  }
  const trinn = bekreftet!==null ? 3 : klar!==null ? 2 : funn.length ? 1 : 0;
  const forfalt = trinn===3 ? nå-bekreftet>=7*dag : trinn===2 && nå-klar>=dag;
  return {navn:['Ikke prøvd','Under øving','På vei mot sikker mestring','Bekreftet ved repetisjon'][trinn],trinn,forfalt,antall:funn.length};
}
export function statusFor(id, logg, now=Date.now()) {
  return analyser(observasjoner(id,logg,now), now);
}

export function anbefal(ferdigheter, logg, now=Date.now(), onsketId='') {
  if (!ferdigheter.length) return {id:'',nivaa:1,grunn:'Ingen ferdigheter er tilgjengelige.'};
  const profiler = new Map(ferdigheter.map(f => {
    const funn=observasjoner(f.id,logg,now);
    return [f.id,{f,funn,s:analyser(funn,now),sist:funn.at(-1)}];
  }));
  const alle=[...profiler.values()];
  const valgt=profiler.get(onsketId);
  const siste=alle.filter(p=>p.sist).sort((a,b)=>b.sist.tid-a.sist.tid)[0];
  const kravVei=(p, nivaa, grunn)=>{
    const forklaring=siste.f.kravGrunn?.[p.f.id];
    return {id:p.f.id,nivaa,grunn:forklaring ? `${grunn} ${forklaring}` : grunn};
  };
  const vei=(p,grunn) => {
    const hjelp=p.sist && !selvstendig(p.sist);
    const nivaa=hjelp ? 0 : p.s.forfalt ? 1 : p.s.trinn>=2 ? 2 : 1;
    return {id:p.f.id,nivaa,grunn:grunn || (hjelp ? 'Forrige forsøk trengte støtte. Prøv et kortere steg i samme tema.' :
      p.s.forfalt ? 'Det har gått tid. Prøv en ny kontrolloppgave uten hint.' :
      p.s.trinn>=2 ? 'Du har løst ulike oppgaver selv. Utforsk en mer sammensatt variant.' :
      p.s.trinn===1 ? 'Prøv en ny variant, slik at du får brukt metoden på egen hånd.' :
      'Start med en oppgave i den ordinære læringsveien. Du kan velge mer støtte underveis.')};
  };
  if (valgt) return vei(valgt);
  if (!siste) return vei(alle.find(p=>!p.f.id.startsWith('grunnlag/')) || alle[0]);
  if (siste?.sist && !selvstendig(siste.sist) && siste.sist.feilKrav) {
    const øving=profiler.get(siste.sist.feilKrav);
    if (øving) return kravVei(øving,øving.s.trinn>=2 ? 1 : 0,
      `Med utgangspunkt i svaret fra «${siste.f.kort}» får du øve på «${øving.f.kort}».`);
  }
  const forfalt=alle.filter(p=>p.s.forfalt).sort((a,b)=>a.sist.tid-b.sist.tid)[0];
  if (forfalt) return vei(forfalt);
  if (siste?.sist && !selvstendig(siste.sist)) {
    const krav=(siste.f.krav || []).map(id=>profiler.get(id)).find(p=>p && p.s.trinn<2);
    if (krav) return kravVei(krav,0,`Etter øving på «${siste.f.kort}» får du trene på forkunnskapen «${krav.f.kort}».`);
    return vei(siste);
  }
  if (siste?.s.trinn===1) return vei(siste);
  if (siste?.s.trinn>=2) {
    const tilbake=alle.filter(p=>p!==siste && p.sist && !selvstendig(p.sist) &&
      (p.sist.feilKrav===siste.f.id || p.f.krav?.includes(siste.f.id)))
      .sort((a,b)=>b.sist.tid-a.sist.tid)[0];
    if (tilbake) return {id:tilbake.f.id,nivaa:1,
      grunn:`Du har nå brukt «${siste.f.kort}» selvstendig. Prøv en ny oppgave i «${tilbake.f.kort}».`};
  }
  const klarFor = p => (p.f.krav || []).every(id=>(profiler.get(id)?.s.trinn ?? 0)>=2);
  const neste=alle.find(p=>p.s.trinn<2 && klarFor(p)) || alle.find(p=>p.s.trinn<2);
  if (neste) return vei(neste);
  return vei(alle.reduce((a,b)=>(a.sist?.tid ?? 0)<=(b.sist?.tid ?? 0) ? a : b));
}
