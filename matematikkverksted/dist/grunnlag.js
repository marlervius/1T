const tex = String.raw;
const gcd = (a,b) => b ? gcd(b,a%b) : a;
// Several procedures can produce the same number. Ask a control question instead
// of asserting that the student used a particular procedure.
const kontroll = 'Hvilket regnestykke brukte du? Kontroller mellomregningen og sammenlign med hintet.';
function diagnostikk(q, candidates) {
  const same=(a,b)=>typeof a==='number' && typeof b==='number' ? Math.abs(a-b)<1e-10 : JSON.stringify(a)===JSON.stringify(b);
  const all=[...q.feil,...candidates];
  q.feil=[];
  for (const f of all) {
    if (same(f.verdi,q.svar)) continue;
    const existing=q.feil.find(x=>same(x.verdi,f.verdi));
    if (existing) { existing.tekst=kontroll; continue; }
    q.feil.push({...f});
  }
  return q;
}

function oppgave(type, sporsmal, svar, hint, losning, feil = []) {
  const format = {
    tall: 'Skriv et tall eller en brøk.',
    polynom: 'Skriv et uttrykk i x.',
    mengde: 'Oppgi alle verdiene, for eksempel {-2; 3}.'
  }[type];
  return {type, sporsmal, svar, hint, losning, feil, format, variant: sporsmal};
}

const brok = {
  id: 'grunnlag/1', kort: 'Brøk og fortegn', krav: [], maal: [4],
  stotte: tex`Med lik nevner teller vi like store deler. $-\frac15+\frac35=\frac25$. Med ulik nevner må delene først få samme størrelse. Ved divisjon kan du gange med den omvendte brøken.`,
  ord: 'Telleren sier hvor mange deler du har. Nevneren bestemmer størrelsen på hver del. En negativ brøk ligger til venstre for null på tallinja.',
  utforsk: tex`Plasser $-\frac12$, $-\frac34$ og $\frac14$ på en tallinje. Hvilket tall får du om du begynner på $-\frac34$ og går en halv enhet til høyre?`,
  lag(nivaa, seed) {
    const d = 3 + seed % 7;
    // Proper, reduced fractions make the arithmetic and its sign visible.
    const candidates=Array.from({length:d-1},(_,i)=>i+1).filter(n=>gcd(n,d)===1);
    const a = candidates[Math.floor(seed / 7) % candidates.length];
    const bCandidates=candidates.filter(n=>gcd(n,2*d)===1);
    const b = bCandidates[Math.floor(seed / 3) % bCandidates.length];
    if (nivaa === 0) return oppgave('tall',
      tex`Regn ut $-\frac{${a}}{${d}}-\frac{${b}}{${d}}$.`, -(a+b)/d,
      ['Start på en tallinje til venstre for null. Hvilken vei går du når du trekker fra et positivt tall?', 'Delene er like store. Hva skal skje med telleren?'],
      tex`Du begynner med $-${a}$ deler og trekker fra $${b}$ deler. Det gir $-\frac{${a+b}}{${d}}$.`,
      [{verdi: (a+b)/d, tekst: 'Summen av størrelsene stemmer. Hvor på tallinja ligger svaret?'}]);
    if (nivaa === 1) return oppgave('tall',
      tex`Regn ut $-\frac{${a}}{${d}}+\frac{${b}}{${2*d}}$.`, (b-2*a)/(2*d),
      ['Hvilken nevner kan du bruke for begge brøkene?', 'Gang den første telleren og nevneren med samme tall. Behold minustegnet.'],
      tex`Den første brøken er $-\frac{${2*a}}{${2*d}}$. Etter addisjon får du $\frac{-${2*a}+${b}}{${2*d}}=\frac{${b-2*a}}{${2*d}}$.`,
      [{verdi:(a+b)/(2*d), tekst:'Sjekk både fortegnet og telleren i den første brøken etter utvidelsen.'}]);
    return oppgave('tall',
      tex`Bestem verdien av $-\frac{${a}}{${d}}:\left(1-\frac{${d+b}}{${d}}\right)$. Avgjør fortegnet før du regner.`, a/b,
      ['Skriv 1 som en brøk med samme nevner som brøken i parentesen.', 'Hvilket fortegn får divisjon av to negative tall? Snu den brøken du deler på.'],
      tex`Parentesen er $\frac{${d}-${d+b}}{${d}}=-\frac{${b}}{${d}}$. Divisjonen blir $\left(-\frac{${a}}{${d}}\right)\left(-\frac{${d}}{${b}}\right)=\frac{${a}}{${b}}$.`,
      [{verdi:-a/b, tekst:'Kontroller fortegnet på tallet i parentesen, og deretter fortegnet ved divisjon.'}]);
  }
};

const distribusjon = {
  id: 'grunnlag/2', kort: 'Gange inn i en parentes', krav: ['grunnlag/1'], maal: [5,6],
  stotte: tex`Tallet utenfor parentesen ganger hvert ledd. For eksempel gir $-2(x-3)=(-2)x+(-2)(-3)=-2x+6$. Sett inn $x=0$ på begge sider som kontroll.`,
  ord: 'En faktor er noe du ganger med. Et ledd er en del av en sum. Den distributive loven lar deg gange hvert ledd i en sum med samme faktor.',
  utforsk: 'Utvid $3(x+2)$, $3(x-2)$ og $-3(x-2)$. Hvilke av leddene endrer fortegn når du endrer ett tegn om gangen?',
  lag(nivaa, seed) {
    const a = 2 + seed % 8;
    const b = 2 + Math.floor(seed / 4) % 6;
    const k = 1 + Math.floor(seed / 8) % 5;
    if (nivaa === 0) return oppgave('tall',
      tex`Gang ut $-${a}(x-${b})$. Hva blir konstantleddet?`, a*b,
      ['Hvilket ledd i parentesen er uten x?', 'Hva blir fortegnet når du ganger to negative tall?'],
      tex`$-${a}(x-${b})=-${a}x+${a*b}$. Ved $x=0$ er verdien $${a*b}$, altså konstantleddet.`,
      [{verdi:-a*b, tekst:'Skriv begge faktorene i talldelen med fortegn før du ganger.'}]);
    if (nivaa === 1) return oppgave('polynom',
      tex`Gang ut og samle like ledd i $${a}(x-${b})-${k}(x+${a})$.`, [-a*(b+k), a-k],
      ['Hvilket fortegn har faktoren foran den andre parentesen?', 'Samle ledd som inneholder x, og regn ut konstantleddet for seg.'],
      tex`Koeffisienten til $x$ blir $${a}-${k}=${a-k}$. Konstantleddet blir $-${a*b}-${k*a}=${-a*(b+k)}$. Uttrykket er derfor $(${a-k})x-${a*(b+k)}$.`);
    return oppgave('tall',
      tex`Finn $c$ slik at $${a}(x-c)=${a}x-${a*b}$ for alle reelle $x$. Hvorfor holder det her å sammenligne konstantleddene?`, b,
      ['Har de to sidene allerede samme koeffisient foran x?', 'Sett x lik null. Hvilken likning står igjen for c?'],
      tex`Venstresiden er $${a}x-${a}c$. Begge sider har samme $x$-ledd. Konstantleddene må dermed være like. $-${a}c=-${a*b}$ gir $c=${b}$.`,
      [{verdi:-b, tekst:'Prøv verdien din ved x = 0 og se om de to sidene blir like.'}]);
  }
};

const vilkar = {
  id:'grunnlag/3', kort:'Algebraiske brøker og vilkår', krav:['grunnlag/2'], maal:[4,5,9],
  stotte: tex`Sjekk nevneren i det opprinnelige uttrykket. I $\frac{(x-2)(x+3)}{x-2}$ er $x=2$ utelukket. For alle andre verdier kan vi forkorte faktoren $x-2$ og få $x+3$.`,
  ord:'Definisjonsmengden er alle verdiene som er tillatt. Å forkorte betyr å dele telleren og nevneren på samme faktor, som må være ulik null.',
  utforsk:tex`Sammenlign $\frac{x^2-4}{x-2}$ og $x+2$ ved $x=1$, $x=3$ og $x=2$. Hvorfor må det siste tilfellet behandles særskilt?`,
  lag(nivaa, seed) {
    const a=1+seed%9, b=1+Math.floor(seed/5)%7;
    if(nivaa===0) return oppgave('tall',
      tex`Hvilken verdi av $x$ er utelukket i $\frac{${b}}{x+${a}}$?`, -a,
      ['Hvilket tall kan du aldri dele på?', 'Hvilken verdi gjør nevneren lik dette tallet?'],
      tex`Sett $x+${a}=0$. Brøken er udefinert ved $x=-${a}$.`,
      [{verdi:a, tekst:'Sett verdien inn i nevneren. Blir den null?'}]);
    if(nivaa===1) {
      const riktig=tex`$x+${b}$ for $x\ne ${a}$`;
      const alternativer=[riktig,tex`$x+${b}$ for alle reelle $x$`,tex`$x-${a}$ for $x\ne -${b}$`];
      const start=seed%alternativer.length;
      const q=oppgave('valg',
        tex`Forkort $\frac{(x-${a})(x+${b})}{x-${a}}$. Hvilket svar beskriver også det opprinnelige vilkåret?`, riktig,
        ['Hvilken faktor finnes både i teller og nevner?', 'Hvilken verdi ville gjort den opprinnelige nevneren lik null?'],
        tex`For $x\ne ${a}$ kan vi forkorte $x-${a}$. Da står $x+${b}$ igjen. Den opprinnelige brøken er fortsatt udefinert ved $x=${a}$.`);
      q.valg=[...alternativer.slice(start),...alternativer.slice(0,start)];
      return q;
    }
    return oppgave('mengde',
      tex`Bestem alle reelle løsninger av $\frac{(x-${a})(x+${b})}{x-${a}}=0$.`, [-b],
      ['Bestem hvilke x-verdier brøken er definert for.', 'En brøk blir null når telleren er null samtidig som nevneren er ulik null. Hvilken rot består kontrollen?'],
      tex`Telleren er null for $x=${a}$ eller $x=-${b}$. Den første verdien er utelukket, og ved $-${b}$ er nevneren $${-b-a}$. Løsningsmengden er $\{-${b}\}$.`);
  }
};

const stigning = {
  id:'grunnlag/4', kort:'Koordinater og stigningstall', krav:['grunnlag/1'], maal:[3,9,10],
  stotte:tex`I $(x,y)$ leser du først vannrett og så loddrett. Fra $(1,2)$ til $(3,8)$ endres $x$ med 2 og $y$ med 6. Stigningstallet er $\frac{6}{2}=3$.`,
  ord:'Stigningstallet er endringen i y per enhet i x på en rett linje. Når stigningstallet er negativt, synker linja mot høyre.',
  utforsk:tex`Finn stigningstallet fra $(1,2)$ til $(4,8)$. Bytt startpunkt og sluttpunkt og regn på nytt. Hvorfor får du samme svar?`,
  lag(nivaa, seed) {
    const x = 1 + seed % 6, y = 2 + Math.floor(seed/3)%9;
    const dx = 2 + Math.floor(seed/9)%5, a = 2 + seed%5;
    if(nivaa===0) return oppgave('tall',
      tex`Gå fra $A=(${x},\,${y})$ til $B=(${x+dx},\,${y-a})$. Hva er endringen i $y$, med fortegn?`, -a,
      ['Hvilket tall i hvert koordinatpar er y-verdien?', 'Trekk startverdien fra sluttverdien.'],
      tex`$y_B-y_A=(${y-a})-${y}=-${a}$. Punktet ligger lavere etter flyttingen.`,
      [{verdi:a, tekst:'Du har funnet avstanden i y-retning. Ta med retningen fra A til B.'}]);
    if(nivaa===1) return oppgave('tall',
      tex`En linje går gjennom $(${x},\,${y})$ og $(${x+dx},\,${y-a*dx})$. Finn stigningstallet.`, -a,
      ['Finn endringen i y og endringen i x i samme retning.', 'Del endringen i y på endringen i x.'],
      tex`Stigningstallet er $\frac{(${y-a*dx})-${y}}{${x+dx}-${x}}=\frac{-${a*dx}}{${dx}}=-${a}$.`,
      [{verdi:-1/a, tekst:'Sjekk rekkefølgen i brøken. Hvor mye endres y per enhet i x?'}]);
    return oppgave('tall',
      tex`En rett linje med stigningstall $-\frac{${a}}{${dx}}$ går gjennom $(${x},\,${y})$. Hvilken $y$-verdi har linja ved $x=${x-2*dx}$?`, y+2*a,
      ['Hvor mye og i hvilken retning flytter du deg i x?', 'Multipliser denne endringen med stigningstallet. Legg så til den kjente y-verdien.'],
      tex`Her er $\Delta x=-${2*dx}$. Dermed er $\Delta y=\left(-\frac{${a}}{${dx}}\right)(-${2*dx})=${2*a}$. Sluttverdien er $${y}+${2*a}=${y+2*a}$.`,
      [{verdi:y-2*a, tekst:'En fallende linje stiger når du beveger deg mot venstre. Kontroller fortegnet til endringen i x.'}]);
  }
};

// Attach diagnoses to each generated variant. The first level also includes
// the old generator's sum-of-denominators error (including −9/12).
for (const [skill,diagnoses] of [
  [brok,(level,seed) => {
    const d=3+seed%7, c=Array.from({length:d-1},(_,i)=>i+1).filter(n=>gcd(n,d)===1);
    const bc=c.filter(n=>gcd(n,2*d)===1);
    const a=c[Math.floor(seed/7)%c.length], b=bc[Math.floor(seed/3)%bc.length];
    if(level===0) return [
      {verdi:-(a+b)/(2*d),tekst:'Undersøk nevneren: er delene fortsatt like store når du trekker fra brøker med lik nevner?'},
      {verdi:(b-a)/d,tekst:'Kontroller begge fortegnene på tallinja. Hvilken retning betyr det å trekke fra en positiv brøk?'},
      {verdi:-(a-b)/d,tekst:'Se på operasjonen mellom brøkene. Hva skjer med telleren når du trekker fra positive deler?'},
      {verdi:-(a+b),tekst:'Sjekk størrelsen på hver del. Hvilken nevner skal resultatet ha?'}];
    if(level===1) return [
      {verdi:(b-a)/(2*d),tekst:'Kontroller om telleren også ble ganget med 2 da den første brøken ble utvidet.'},
      {verdi:(b-a)/d,tekst:'Undersøk om brøkene har fått samme nevner før tellerne samles.'},
      {verdi:-(2*a+b)/(2*d),tekst:'Kontroller fortegnet foran den andre brøken.'},
      {verdi:(2*a+b)/(2*d),tekst:'Kontroller fortegnet til den første brøken etter utvidelsen.'}];
    return [
      {verdi:a*b/(d*d),tekst:'Kontroller divisjonen: Hvilken brøk skal snus før du ganger?'},
      {verdi:b/a,tekst:'Kontroller hvilken brøk du deler på og hvilken som skal snus.'},
      {verdi:-b/a,tekst:'Kontroller både fortegnene og hvilken brøk som skal snus.'},
      {verdi:a/(d+b),tekst:'Regn ferdig parentesen før du utfører divisjonen.'}];
  }],
  [distribusjon,(level,seed)=>{
    const a=2+seed%8,b=2+Math.floor(seed/4)%6,k=1+Math.floor(seed/8)%5;
    if(level===0) return [{verdi:b,tekst:'Hva skjer med konstantleddet når hele parentesen ganges med faktoren utenfor?'},{verdi:-b,tekst:'Gang konstantleddet med hele faktoren utenfor parentesen, inkludert fortegnet.'},{verdi:a,tekst:'Finn konstantleddet ved å sette x = 0 i det opprinnelige uttrykket.'},{verdi:0,tekst:'Sett x = 0 i det opprinnelige uttrykket. Hva blir verdien?'}];
    if(level===1) return [{verdi:[-a*b+k*a,a-k],tekst:'Kontroller fortegnet når du ganger inn i den andre parentesen.'},{verdi:[-a*b-k*a,a+k],tekst:'Kontroller fortegnet foran x-leddet i den andre parentesen.'},{verdi:[-b-a,a-k],tekst:'Gang begge konstantleddene med faktorene utenfor parentesene.'},{verdi:[-a*b,a-k],tekst:'Hvilket konstantledd kommer fra den andre parentesen?'}];
    return [{verdi:a*b,tekst:'Sett x = 0 og løs likningen for c. Hvilken faktor må du dele på?'},{verdi:b/a,tekst:'Sett x = 0. Hvilket tall skal du dele begge sider av likningen på?'},{verdi:a,tekst:'Sammenlign konstantleddene ved x = 0 og løs likningen for c.'},{verdi:0,tekst:'Sett inn x = 0 på begge sider. Hvilken verdi må c ha?'}];
  }],
  [vilkar,(level,seed)=>{
    const a=1+seed%9,b=1+Math.floor(seed/5)%7;
    if(level===0) return [{verdi:0,tekst:'Sett verdien inn i nevneren. Hvilket tall gjør hele nevneren null?'},{verdi:-b,tekst:'Det er nevneren, ikke telleren, som må være forskjellig fra null.'},{verdi:a+b,tekst:'Sett svaret inn i nevneren og sjekk om den blir null.'},{verdi:-a-b,tekst:'Løs likningen x + a = 0 ved å isolere x.'}];
    if(level===1) return [{verdi:tex`$x+${b}$ for alle reelle $x$`,tekst:'Kontroller om den opprinnelige nevneren kan være null.'},{verdi:tex`$x-${a}$ for $x\ne -${b}$`,tekst:'Kontroller både hvilken faktor som forkortes og hvilken verdi som gjør nevneren null.'},...qvalg(a,b)];
    return [{verdi:[a,-b],tekst:'Kontroller hver rot i den opprinnelige nevneren. Er begge tillatt?'},{verdi:[a],tekst:'Sett verdien inn i den opprinnelige nevneren. Hva blir den?'},{verdi:[b],tekst:'Hvilken verdi gjør faktoren x + b lik null?'},{verdi:[],tekst:'Finn når telleren er null og kontroller verdien i nevneren.'}];
  }],
  [stigning,(level,seed)=>{
    const x=1+seed%6,y=2+Math.floor(seed/3)%9,dx=2+Math.floor(seed/9)%5,a=2+seed%5;
    if(level===0) return [{verdi:y-a,tekst:'Dette er sluttverdien. Trekk startverdien fra sluttverdien for å finne endringen.'},{verdi:dx,tekst:'Dette er endringen i x. Hvilke koordinater viser y?'},{verdi:-dx,tekst:'Sammenlign y-koordinatene og trekk startverdien fra sluttverdien.'},{verdi:y,tekst:'Sammenlign begge y-koordinatene for å finne endringen.'},{verdi:0,tekst:'Sammenlign y-koordinatene. Har y-verdien endret seg?'},{verdi:y+a,tekst:'Trekk startverdien fra sluttverdien for å finne endringen.'}];
    if(level===1) return [{verdi:a,tekst:'Kontroller fortegnet til endringen i y når x øker.'},{verdi:-a*dx,tekst:'Dette er endringen i y. Del på endringen i x for å finne endringen per x-enhet.'},{verdi:1/a,tekst:'Finn endringen i y per enhet i x, og kontroller fortegnet.'},{verdi:(y-a*dx)/(x+dx),tekst:'Bruk forskjellen mellom y-verdiene delt på forskjellen mellom x-verdiene.'}];
    return [{verdi:2*a,tekst:'Dette er endringen i y. Legg den til y-verdien i det kjente punktet.'},{verdi:y+2*dx,tekst:'Multipliser endringen i x med stigningstallet før du legger til startverdien.'},{verdi:y+a,tekst:'Finn hele endringen i x og multipliser med stigningstallet.'},{verdi:y,tekst:'Finn endringen i y ved å multiplisere endringen i x med stigningstallet.'}];
  }]
]) {
  const lag=skill.lag;
  skill.lag=function(level,seed) {
    const q=lag.call(this,level,seed);
    const candidates=diagnoses(level,seed);
    if(q.type==='valg') q.valg.push(...candidates.map(f=>f.verdi).filter(v=>!q.valg.includes(v)));
    diagnostikk(q,candidates);
    q.feil=q.feil.slice(0,5);
    return q;
  };
}
function qvalg(a,b) {
  return [
    {verdi:tex`$x+${b}$ for $x\ne -${b}$`,tekst:'Vilkåret kommer fra den opprinnelige nevneren. Hvilken verdi gjør den null?'},
    {verdi:tex`$x-${a}$ for alle reelle $x$`,tekst:'Hvilken faktor står igjen etter forkorting? Kontroller også den opprinnelige nevneren.'},
    {verdi:tex`$x-${a}$ for $x\ne ${a}$`,tekst:'Vilkåret stemmer. Kontroller hvilken faktor som står igjen i telleren.'}
  ];
}
export const grunnlag = [brok, distribusjon, vilkar, stigning];

// Older saved questions retain their original text and can be enriched in place.
export function supplerEldreGrunnlag(q) {
  if (!q || q.type!=='tall' || typeof q.sporsmal!=='string') return q;
  const m=q.sporsmal.match(/Regn ut \$-\\frac\{(\d+)\}\{(\d+)\}-\\frac\{(\d+)\}\{(\d+)\}\$\./);
  if (!m || m[2]!==m[4]) return q;
  const a=Number(m[1]),d=Number(m[2]),b=Number(m[3]);
  q.feil ||= [];
  return diagnostikk(q,[{verdi:-(a+b)/(2*d),tekst:'Undersøk nevneren: er delene fortsatt like store når du trekker fra brøker med lik nevner?'}]);
}
