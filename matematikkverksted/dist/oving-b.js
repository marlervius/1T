// Hver variant har en fast tekstidentitet også når starttallet gjentas.
const m = String.raw;
const nb = value => String(value).replace('.', '{,}');
const err = (verdi, tekst, krav) => krav ? {verdi, tekst, krav} : {verdi, tekst};

function pol(coefficients) {
  let out = '';
  for (let d = coefficients.length - 1; d >= 0; d--) {
    const c = coefficients[d];
    if (!c) continue;
    const term = d === 0 || Math.abs(c) !== 1 ? String(Math.abs(c)) : '';
    const power = d === 0 ? '' : d === 1 ? 'x' : `x^{${d}}`;
    out += (c < 0 ? '-' : out ? '+' : '') + term + power;
  }
  return out || '0';
}

function task(type, sporsmal, svar, hint, losning, feil = []) {
  const format = {
    tall: 'Skriv et tall eller en brøk.',
    polynom: 'Skriv et uttrykk i x.',
    mengde: 'Oppgi alle løsningene, for eksempel {-2; 3}.',
    intervall: 'Bruk intervallnotasjon, for eksempel [1; 3].'
  }[type];
  return {type, sporsmal, svar, hint, losning, feil, format, variant: sporsmal};
}

const divisjon = {
  id: 'polynomdivisjon/1', kort: 'Kvotient og rest', krav: ['algebra/3'], maal: [11],
  stotte: 'Skriv polynomet i synkende grad. Del det høyeste leddet på divisorens høyeste ledd. Gang tilbake og trekk fra. Gjenta. Sjekk svaret ved å gange kvotient med divisor og legge til resten.',
  ord: 'Divisoren er det du deler på. Kvotienten er svaret før resten. Restens grad må være lavere enn divisorens grad.',
  utforsk: 'Begynn med divisoren $x-2$, kvotienten $x+3$ og resten $1$. Bygg telleren. Endre bare resten. Hvilke ledd i telleren endres? Forklar hvorfor.',
  lag(nivaa, seed) {
    const a = 2 + seed % 7, b = 1 + Math.floor(seed/7) % 4, r = 1 + seed % 4;
    if (nivaa === 0) return task('polynom',
      m`Fullfør det siste trinnet i divisjonen. $${pol([a*b,a+b,1])}=(x+${a})Q(x)$. Første ledd i $Q$ er $x$. Hva er hele $Q(x)$?`,
      [b,1], ['Hvilket produkt får du når du ganger divisoren med $x$?', m`Hvilket tall multiplisert med $x+${a}$ gir det som står igjen etter subtraksjonen?`],
      m`Trekk fra $x(x+${a})$. Da står $${pol([a*b,b])}=${b}(x+${a})$ igjen. Kvotienten blir $x+${b}$ og resten er $0$.`);
    if (nivaa === 1) return task('tall',
      m`Etter polynomdivisjon av $P(x)=${pol([a*b+r,a+b,1])}$ på $x+${a}$ får du kvotienten $x+${b}$. Finn resten.`,
      r, ['Hvordan kan du bygge telleren opp igjen fra kvotienten og divisoren?', m`Hvilket konstantledd får produktet $(x+${a})(x+${b})$?`],
      m`Produktet er $${pol([a*b,a+b,1])}$. Det mangler $${r}$ i konstantleddet. Resten er $${r}$. Kontroll ved innsetting gir $P(-${a})=${r}$.`,
      [err(-r,'Resten legges til produktet for å få telleren. Hvilken vei må du trekke fra?','polynomdivisjon/1')]);
    return task('polynom',
      m`Finn hele resten når $P(x)=${pol([a*b+r,b+r,a,b,1])}$ deles på $x^2+${a}$. Begrunn hvor du kan stoppe.`,
      [a*b+r,b+r-a*b],
      ['Hvilken grad kan resten ha når du deler på et andregradspolynom?', m`Trekk først fra $x^2(x^2+${a})$, deretter $${b}x(x^2+${a})$.`],
      m`Kvotienten er $${pol([0,b,1])}$. Tilbakeganging gir $(x^2+${a})(${pol([0,b,1])})$. Trekker vi produktet fra $P$, får vi resten $${pol([a*b+r,b+r-a*b])}$. Den har lavere grad enn divisoren.`);
  }
};

const faktorer = {
  id: 'polynomdivisjon/2', kort: 'Restsetningen og røtter', krav: ['polynomdivisjon/1','andregrad/1'], maal: [4,11],
  stotte: 'Deling på $x-r$ gir en tallrest. Sett $x=r$ i polynomet. Får du null, er $x-r$ en faktor. Del den ut før du leter etter flere røtter.',
  ord: 'En rot er en verdi der polynomet er null. En dobbeltrot har samme lineære faktor to ganger.',
  utforsk: 'Sammenlikn $P(x)=(x-2)^2(x+1)$ med $Q(x)=(x-2)(x+1)^2$. Lag en skisse ved hjelp av fortegnene. Hva kan du si om en rot der grafen snur?',
  lag(nivaa, seed) {
    const a = 2+seed%7, b=1+Math.floor(seed/7)%4, c=a+b+1;
    if (nivaa===0) return task('tall',
      m`$P(x)=x^2+${b}$. Hva er resten ved deling på $x-${a}$?`, a*a+b,
      [m`Hvilken verdi gjør divisoren $x-${a}$ lik null?`,'Hvordan finner du resten når du kjenner den verdien?'],
      m`I $P(x)=(x-${a})Q(x)+R$ setter vi $x=${a}$. Da blir produktet null, så $R=${a}^2+${b}=${a*a+b}$.`);
    if (nivaa===1) return task('mengde',
      m`$P(x)=${pol([a*b*c,a*c-b*(a+c),b-a-c,1])}$ har roten $${a}$. Finn alle reelle røtter.`, [-b,a,c],
      [m`Hvordan kan du bruke den kjente roten til å redusere graden?`,m`Del på $x-${a}$. Faktoriser deretter $${pol([-b*c,b-c,1])}$.`],
      m`Etter deling får vi $P(x)=(x-${a})(x+${b})(x-${c})$. Nullproduktregelen gir røttene $-${b}$, $${a}$ og $${c}$.`);
    return task('tall',
      m`For hvilken $k$ er $x-${a}$ en faktor i $P(x)=x^3+kx+${a*b}$? Bruk svaret til å forklare faktorkriteriet.`,
      -a*a-b, [m`Hvilken verdi må $P(${a})$ ha?`,m`Sett inn $x=${a}$ og løs likningen for $k$.`],
      m`Resten ved deling på $x-${a}$ er $P(${a})=${a*a*a}+${a}k+${a*b}$. Rest null gir $k=${-a*a-b}$. Dermed går divisjonen opp.`,
      [err(a*a+b,'Sett verdien inn. Må konstantleddene oppheves av et positivt eller et negativt ledd?','likninger/1')]);
  }
};

const asymptoter = {
  id:'polynomdivisjon/3', kort:'Asymptoter og hull', krav:['polynomdivisjon/2','funksjoner/2'], maal:[9,11],
  stotte:'Skriv brøken som et polynom pluss en restbrøk. For store x-verdier kan restbrøken bli svært liten. Sjekk også hvor den opprinnelige nevneren er null.',
  ord:'En vertikal asymptote er en linje som grafen nærmer seg mens funksjonsverdien blir ubegrenset. Et hull kan ha endelig grenseverdi.',
  utforsk:'Tegn $y=(x^2-1)/(x-1)$ og $y=(x^2+1)/(x-1)$. Bruk en verditabell på begge sider av $x=1$. Hvorfor blir grafene så ulike akkurat der?',
  lag(nivaa, seed) {
    const a=1+seed%6, b=1+Math.floor(seed/6)%6, r=1+seed%3;
    if(nivaa===0) return task('tall',
      m`$f(x)=x+${b}+\frac{${r}}{x-${a}}$. Den vertikale asymptoten er $x=c$. Finn $c$.`, a,
      ['Når kan restbrøken bli svært stor i absoluttverdi?','Sett nevneren lik null. Hva skjer med telleren samtidig?'],
      m`Når $x$ nærmer seg $${a}$, går nevneren mot null, mens telleren er $${r}$. Den vertikale asymptoten er $x=${a}$.`);
    if(nivaa===1) return task('polynom',
      m`Finn uttrykket for den skrå asymptoten til $f(x)=\frac{${pol([r-a*b,b-a,1])}}{x-${a}}$. Skriv høyresiden i $y=\ldots$.`,
      [b,1], ['Hvordan kan du få fram en restbrøk ved divisjon?','Hvilken del står igjen når restbrøken går mot null?'],
      m`Divisjon gir $f(x)=x+${b}+\frac{${r}}{x-${a}}$. Restbrøken går mot null i begge retninger for store $|x|$, så linja er $y=x+${b}$.`);
    return task('tall',
      m`$g(x)=\frac{${pol([-a*b,b-a,1])}}{x-${a}}$. Grafen har et hull. Hvilken $y$-koordinat mangler? Begrunn hvorfor punktet mangler.`, a+b,
      ['Er telleren også null der nevneren er null?',m`Faktoriser telleren. Hva blir verdien på den forkortede linja ved $x=${a}$?`],
      m`Telleren er $(x-${a})(x+${b})$. Dermed er $g(x)=x+${b}$ for $x\ne ${a}$. Linja har verdien $${a+b}$ ved $${a}$, men den opprinnelige brøken er udefinert der.`,
      [err(a,'Du har funnet x-koordinaten til hullet. Oppgaven spør etter y-koordinaten.')]);
  }
};

const vekstfart = {
  id:'derivasjon/1', kort:'Sekant og momentan vekstfart', krav:['funksjoner/1'], maal:[10],
  stotte:'Marker to punkter. Finn endringen oppover og endringen bortover. Del dem på hverandre. Flytt så punktene nærmere hverandre for å undersøke farten i ett øyeblikk.',
  ord:'Sekanten går gjennom to grafpunkter. Tangentens stigningstall er den momentane vekstfarten.',
  utforsk:'Bruk $s(t)=t^2$. Fra $t=2$ til $t=2+h$, prøv $h=1$, $0{,}1$ og $-0{,}1$. Hva nærmer sekanthastigheten seg fra hver side? Begrunn med et uttrykk i $h$.',
  lag(nivaa, seed) {
    const a=2+seed%8, h=2+Math.floor(seed/8)%4, v=2+seed%5, s0=3*a;
    if(nivaa===0) return task('tall',
      m`En vogn er $${s0}$ m fra start ved $t=${a}$ s, og $${s0+v*h}$ m fra start ved $t=${a+h}$ s. Hva er gjennomsnittlig vekstfart for posisjonen, i m/s?`, v,
      ['Hvor mange meter har posisjonen endret seg? Hvor mange sekunder tok det?',m`Del posisjonsendringen på $${a+h}-${a}$ sekunder.`],
      m`Farten er $\frac{${s0+v*h}-${s0}}{${a+h}-${a}}=\frac{${v*h}}{${h}}=${v}$ m/s. I posisjonsgrafen er dette stigningen til sekanten.`,
      [err(v*h,'Du fant endringen i meter. Hvor lang tid tok den?','funksjoner/1')]);
    if(nivaa===1) return task('tall',
      m`Vannvolumet i en tank er $V(t)=t^2+${h}t$ liter de første $12$ minuttene. Finn tilstrømningen i liter per minutt akkurat når $t=${a}$.`, 2*a+h,
      ['Hva er forskjellen mellom volumet og hvor fort volumet øker?',m`Lag differansekvotienten fra $${a}$ til $${a}+u$, eller deriver $V$.`],
      m`Med $u\ne 0$ får vi $\frac{V(${a}+u)-V(${a})}{u}=${2*a+h}+u$. Når $u$ går mot null, får vi $${2*a+h}$ L/min. Derivasjon gir også $V'(${a})=2\cdot ${a}+${h}$.`);
    return task('tall',
      m`En syklist har posisjon $s(t)=t^2+${h}t$ meter. På intervallet fra $${a}$ til $${a+2*h}$ sekunder er det et tidspunkt da momentan fart er lik gjennomsnittsfarten. Finn tidspunktet i sekunder.`, a+h,
      ['Regn ut gjennomsnittsfarten ved hjelp av de to posisjonene.',m`Sett $s'(t)=2t+${h}$ lik sekantens stigningstall.`],
      m`Sekanten har stigningstall $${a}+${a+2*h}+${h}=${2*a+3*h}$ m/s. Dermed må $2t+${h}=${2*a+3*h}$, som gir $t=${a+h}$ s. For denne parabelen er det midt i intervallet.`,
      [err(2*a+3*h,'Du har funnet farten i m/s. Ved hvilket tidspunkt oppnås den?')]);
  }
};

const tangenter = {
  id:'derivasjon/2', kort:'Derivasjonsregler og tangent', krav:['derivasjon/1','algebra/1'], maal:[9,10],
  stotte:'Deriver ett ledd om gangen. For å finne en tangent trenger du punktet på grafen og stigningstallet der. Sett begge inn i ettpunktsformelen.',
  ord:"Tangenten ved $a$ går gjennom $(a,f(a))$ og har stigningstall $f'(a)$.",
  utforsk:'Tegn $f(x)=x^3-3x$. Finn to ulike punkter med parallelle tangenter. Hva skjer dersom du krever en horisontal tangent? Hvor mange punkter har en tangent med stigningstall $-4$?',
  lag(nivaa, seed) {
    const a=2+seed%6, b=1+Math.floor(seed/6)%5, k=1+seed%4;
    if(nivaa===0) return task('polynom',
      m`Deriver leddvis. Hva er $f'(x)$ når $f(x)=${pol([b,-k,a])}$?`, [-k,2*a],
      ['Hvilket ledd forsvinner helt?',m`Hva blir den deriverte av $${a}x^2$ og av $${pol([0,-k])}$?`],
      m`Kvadratleddet gir $${2*a}x$, førstegradsleddet gir $-${k}$, og konstantleddet gir null. Dermed er $f'(x)=${pol([-k,2*a])}$.`);
    if(nivaa===1) return task('polynom',
      m`Finn høyresiden i likningen for tangenten til $f(x)=x^2+${b}$ ved $x=${a}$.`, [b-a*a,2*a],
      [m`Hvilket punkt på grafen har $x=${a}$?`,m`Bruk $y=f(${a})+f'(${a})(x-${a})$.`],
      m`Punktet har høyde $${a*a+b}$. Stigningen er $2\cdot ${a}=${2*a}$. Tangenten blir $y=${a*a+b}+${2*a}(x-${a})=${pol([b-a*a,2*a])}$.`,
      [err([a*a+b,2*a],'Høyden i tangeringspunktet er vanligvis forskjellig fra skjæringen med y-aksen. Kontroller linja i punktet.')]);
    return task('mengde',
      m`Grafen til $f(x)=${pol([b,-3*k,0,1])}$ har tangenter med stigningstall $${3*a*a-3*k}$. Ved hvilke $x$-verdier? Finn alle.`, [-a,a],
      ['Hvilken likning gir deg et bestemt stigningstall?',m`Deriver og løs $3x^2-${3*k}=${3*a*a-3*k}$.`],
      m`Likningen for stigningen forenkles til $x^2=${a*a}$. Både $-${a}$ og $${a}$ gir ønsket stigning. Konstantleddet flytter grafen opp, men endrer ingen stigningstall.`,
      [err([a],'En kvadratlikning kan ha to løsninger. Hvilket annet tall har samme kvadrat?','andregrad/1')]);
  }
};

const optimering = {
  id:'derivasjon/3', kort:'Maksimum og endepunkter', krav:['derivasjon/2','andregrad/2'], maal:[6,7,10],
  stotte:'Skriv først hvilke x-verdier som er mulige. Finn steder der den deriverte er null. Sjekk disse mot endepunktene og velg den største eller minste funksjonsverdien.',
  ord:'Et stasjonært punkt har horisontal tangent. Et globalt maksimum er den største verdien i hele området.',
  utforsk:'En rektangulær luftegård står langs en rett vegg. Du har 24 m gjerde til tre sider. Tegn tre mulige gårder. Hva gir størst areal? Prøv så med en vegg som bare er 8 m lang.',
  lag(nivaa,seed) {
    const a=3+seed%8, b=1+Math.floor(seed/8)%5;
    if(nivaa===0) return task('tall',
      m`En parabel har derivert $f'(x)=${pol([2*a,-2])}$. Hvilken $x$-verdi gir toppunktet? Sjekk fortegnet på hver side.`, a,
      ['Ved hvilket stigningstall er tangenten vannrett?',m`Løs $${pol([2*a,-2])}=0$.`],
      m`$f'(x)=0$ ved $x=${a}$. Til venstre er den deriverte positiv, til høyre negativ. Funksjonen stiger før dette punktet og synker etterpå.`);
    if(nivaa===1) return task('tall',
      m`En hage får gjerde på tre sider og en vegg på den fjerde. Gjerdet er $${4*a}$ m langt. Hvor stort kan arealet bli i kvadratmeter?`, 2*a*a,
      ['Kall hver side som står vinkelrett på veggen for $x$. Hva er lengden på den tredje siden?',m`Arealet er $x(${4*a}-2x)$. Finn hvor den deriverte blir null.`],
      m`$A'(x)=${4*a}-4x$ skifter fra positivt til negativt ved $x=${a}$. Den lange siden er $${2*a}$ m. Dermed blir maksimum $${a}\cdot ${2*a}=${2*a*a}$ m². Begge endene av det mulige intervallet gir null areal.`,
      [err(a,'Dette er en sidelengde i meter. Hvilken størrelse har enhet kvadratmeter?')]);
    const end=a+b;
    return task('tall',
      m`En maskin kan bare stilles inn på $${end}\le x\le ${end+4}$. Utbyttet er $U(x)=${2*end*end}-(x-${a})^2$. Hvor stort er det største tillatte utbyttet?`, 2*end*end-b*b,
      ['Ligger det stasjonære punktet innenfor det tillatte intervallet?', m`Undersøk fortegnet til $-2(x-${a})$ for alle lovlige $x$.`],
      m`Hele intervallet ligger til høyre for $${a}$. Der er $U'(x)<0$, så utbyttet er størst ved venstre endepunkt. $U(${end})=${2*end*end}-${b}^2=${2*end*end-b*b}$.`,
      [err(2*end*end,'Denne verdien hører til parabelens toppunkt. Kan maskinen stilles inn der?')]);
  }
};

const sideforhold = {
  id:'trigonometri/1', kort:'Sideforhold og enhetssirkel', krav:['algebra/1'], maal:[12],
  stotte:'Marker vinkelen først. Hypotenusen ligger rett overfor den rette vinkelen. Finn så motstående og hosliggende katet. Velg forholdet som bruker de to sidene du kjenner.',
  ord:'Motstående katet ligger overfor vinkelen du ser på. På enhetssirkelen er cosinus x-koordinaten og sinus y-koordinaten.',
  utforsk:'Tegn en trekant med sider 3, 4 og 5. Doble alle sidene. Hvilke sideforhold bevares? Bytt så til den andre spisse vinkelen og undersøk hva som skjer med sinus og cosinus.',
  lag(nivaa,seed){
    const triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];
    const [p,q,c]=triples[seed%4], k=1+Math.floor(seed/4)%5, flip= Math.floor(seed/20)%2;
    const [u,v]=flip?[q,p]:[p,q];
    if(nivaa===0) return task('tall',
      m`I en rettvinklet trekant har vinkelen $v$ motstående katet $${k*u}$ og hosliggende katet $${k*v}$. Hypotenusen er $${k*c}$. Skriv $\sin v$ som brøk.`,u/c,
      ['Hvilke to sider bruker sinus?', 'Del den motstående kateten på hypotenusen.'],
      m`$\sin v=\frac{${k*u}}{${k*c}}=\frac{${u}}{${c}}$. Sidene kan skaleres med samme faktor uten at sideforholdet endres.`,
      [err(v/c,'Dette er cosinus. Hvilken katet er motstående til den valgte vinkelen?','trigonometri/1')]);
    if(nivaa===1) return task('tall',
      m`En rampe stiger $${k*u}$ cm over en horisontal avstand på $${k*v}$ cm. En modell skal ha samme vinkel. Modellen har horisontal lengde $${2*v}$ cm. Hvor mange cm må den stige?`,2*u,
      ['Hvilket sideforhold er konstant når vinkelen er den samme?', m`Sett $\frac{h}{${2*v}}=\frac{${k*u}}{${k*v}}$.`],
      m`Tangens til helningsvinkelen er $\frac{${u}}{${v}}$. Modellen stiger derfor $${2*v}\cdot\frac{${u}}{${v}}=${2*u}$ cm.`);
    return task('tall',
      m`En stump vinkel $v$ oppfyller $\sin v=\frac{${u}}{${c}}$. Finn $\cos v$ eksakt som brøk. Forklar fortegnet på enhetssirkelen.`,-v/c,
      ['Hvilken del av enhetssirkelen svarer til en vinkel mellom 90° og 180°?',m`Bruk $\cos^2 v=1-(${u}/${c})^2$. Hvilket fortegn må kvadratroten få?`],
      m`$\cos^2 v=\frac{${c*c}-${u*u}}{${c*c}}=\frac{${v*v}}{${c*c}}$. Punktet ligger til venstre for $y$-aksen. Derfor er $\cos v=-\frac{${v}}{${c}}$.`,
      [err(v/c,'Størrelsen stemmer. Er x-koordinaten positiv eller negativ for en stump vinkel?')]);
  }
};

const setninger = {
  id:'trigonometri/2', kort:'Areal og trekantsetninger', krav:['trigonometri/1','algebra/3'], maal:[2,12,13],
  stotte:'Marker hvilke sider og vinkler du kjenner. To sider og vinkelen mellom dem gir arealsetningen eller cosinussetningen. Et kjent par av vinkel og motstående side kan brukes i sinussetningen.',
  ord:'Den mellomliggende vinkelen ligger mellom de to sidene i formelen. Motstående side ligger overfor vinkelen.',
  utforsk:'Plasser $A=(0,0)$, $B=(c,0)$ og $C=(b\\cos A,b\\sin A)$. Bruk høyden til å begrunne arealsetningen. Skriv samme areal fra en annen side for å utlede sinussetningen. Bruk til slutt avstandsformelen for $BC$ til å utlede cosinussetningen.',
  lag(nivaa,seed){
    const b=4+2*(seed%7), c=3+Math.floor(seed/7)%5;
    if(nivaa===0) return task('tall',
      m`En trekant har grunnlinje $${b}$ cm og en side på $${c}$ cm som danner $30^\circ$ med grunnlinja. Hvor stort er arealet i cm²? Bruk $\sin 30^\circ=1/2$.`, b*c/4,
      ['Hvilken del av den skrå siden blir høyden?',m`Finn først $h=${c}\sin 30^\circ$, og bruk så $A=\frac12\cdot ${b}\cdot h$.`],
      m`Høyden er $${nb(c/2)}$ cm. Arealet er $\frac12\cdot ${b}\cdot ${nb(c/2)}=${nb(b*c/4)}$ cm². Dette viser hvorfor sinus til den mellomliggende vinkelen inngår i arealsetningen.`,
      [err(b*c/2,'Kontroller både høyden og faktoren én halv i trekantens areal.')]);
    if(nivaa===1) return task('tall',
      m`To stag har lengde $${b}$ m og $${c}$ m. De møtes i en vinkel på $120^\circ$. Finn kvadratet av avstanden mellom de frie endene, i m². Bruk $\cos 120^\circ=-1/2$.`,b*b+c*c+b*c,
      ['Hvordan ser triangelen ut når du forbinder de frie endene?', 'Hvilket fortegn gir leddet med cosinus i en stumpvinklet trekant?'],
      m`$d^2=${b}^2+${c}^2-2\cdot ${b}\cdot ${c}\cdot(-1/2)=${b*b+c*c+b*c}$. Kvadratet av den motstående siden er større enn summen av kvadratene av de to andre.`,
      [err(b*b+c*c-b*c,'Kontroller fortegnet når du trekker fra et negativt produkt.','trigonometri/1')]);
    const a=3+seed%8;
    return task('tall',
      m`To trekanter har begge side $a=${a}$ cm mot vinkelen $A=30^\circ$. Bruk en høyde eller to arealuttrykk til å begrunne at $b/\sin B$ er likt i begge trekanter. Hva er fellesverdien i cm?`,2*a,
      [m`Uttrykk dobbelt areal som både $bc\sin A$ og $ac\sin B$.`,m`Del på $c$ og samle $a$ med $\sin A$, og $b$ med $\sin B$.`],
      m`Samme areal gir $bc\sin A=ac\sin B$. Alle sidene og sinusverdiene er positive, så vi kan dele og få $\frac{b}{\sin B}=\frac{a}{\sin A}=\frac{${a}}{1/2}=${2*a}$ cm. Beviset gjelder uansett hvilken mulig trekant vi begynner med.`,
      [err(a/2,'Undersøk om du skal gange eller dele a med sinus til den motstående vinkelen.')]);
  }
};

const sammensatt = {
  id:'trigonometri/3', kort:'Sammensatte trekanter', krav:['trigonometri/2'], maal:[12,14],
  stotte:'Tegn en skisse med målene som står i teksten. Del figuren i trekanter. Merk det du finner i den første trekanten før du går videre til den neste.',
  ord:'Siktelinjen går fra øyet til punktet man ser på. To vinkler med sum 180° har samme sinus.',
  utforsk:'Tegn $A=30^\\circ$ og $AC=10$ cm. Bruk passer med sentrum i C for å finne mulige punkt B på strålen fra A når $BC=4$, $5$, $8$ og $12$ cm. Hvorfor gir sirkel og stråle ulike antall løsninger?',
  lag(nivaa,seed) {
    const d=6+seed%9, h=1.5+(seed%3)*0.1;
    if(nivaa===0) return task('tall',
      m`På flatt underlag står en elev $${d}$ m fra en loddrett vegg. Fra øyehøyden $${nb(h)}$ m ser eleven toppen i $45^\circ$ opp fra vannrett. Hvor høy er veggen i meter?`,Math.round((d+h)*10)/10,
      ['Hvilken del av veggen inngår i den rettvinklede trekanten?',m`Hvor stor er høydeforskjellen fra øyet når $\tan 45^\circ=1$?`],
      m`Fra øyet opp til toppen er det $${d}\tan 45^\circ=${d}$ m. Legg til øyehøyden. Hele veggen er $${nb(Math.round((d+h)*10)/10)}$ m høy.`,
      [err(d,'Dette er høyden målt fra øyet. Hvor høyt over bakken er øyet?')]);
    if(nivaa===1) {
      const a=6+2*(seed%6), b=2+Math.floor(seed/6)%6;
      return task('tall',
        m`En gårdsplass er et parallellogram med sider $${a}$ og $${b}$ meter. En diagonal deler plassen i to trekanter. I den ene trekanten er vinkelen mellom de oppgitte sidene $150^\circ$. Finn hele arealet i m².`, a*b/2,
        ['Hva er arealet til én av de to trekantene?',m`Hvordan henger $\sin 150^\circ$ sammen med $\sin 30^\circ$?`],
        m`$\sin 150^\circ=1/2$. Hver trekant har areal $\frac12\cdot ${a}\cdot ${b}\cdot\frac12=${nb(a*b/4)}$ m². Parallellogrammet har dobbelt areal, $${nb(a*b/2)}$ m².`,
        [err(a*b/4,'Du fant arealet av deltrekanten. Hvilken figur ba oppgaven om?','trigonometri/2')]);
    }
    const b=8+2*(Math.floor(seed/4)%6), a=[b/2-1,b/2,b/2+1,b+1][seed%4];
    const count=[0,1,2,1][seed%4];
    return task('tall',
      m`I trekant $ABC$ kjenner vi $A=30^\circ$, $a=${a}$ og $b=${b}$. Hvor mange forskjellige trekanter er mulige, når speilbilder telles som samme trekant? Begrunn med høyden eller sinussetningen.`,count,
      ['La A ligge i origo, AB langs en stråle og AC skrått opp. Hvor langt ligger C fra linja AB?',m`Høyden er $h=${b}\sin 30^\circ=${b/2}$. Tenk på en sirkel med sentrum i C og radius $${a}$. Hvor ofte treffer den strålen?`],
      m`Høyden er $${b/2}$. ${count===0?'Radien er mindre enn høyden og når ikke strålen.':a===b/2?'Radien er lik høyden. Sirkelen tangerer strålen, så én rettvinklet trekant er mulig.':count===2?'Radien ligger mellom høyden og lengden AC. Sirkelen treffer strålen på begge sider av høydefoten.':'Radien er større enn AC. Linjas ene skjæringspunkt ligger bak A. Bare det andre ligger på strålen.'} Antall trekanter er $${count}$.`);
  }
};

const tekstmodell = {
  id:'modellering/1', kort:'Tekst, variabler og gyldighet', krav:['funksjoner/1','likninger/1'], maal:[3,7,8],
  stotte:'Understrek tallene og enhetene i teksten. Bestem hva som varierer. Finn startverdien og hvor mye verdien endrer seg per enhet. Sjekk hvilke x-verdier teksten tillater.',
  ord:'Startverdien gjelder når $x=0$. Gyldighetsområdet er området der antakelsene i modellen gir mening.',
  utforsk:'Lag et tilbud for en sykkelutleie med startpris og minuttpris. Finn to ulike tilbud som koster akkurat det samme etter 30 minutter. Vis med en graf og forklar hvem som ville valgt hvert tilbud.',
  lag(nivaa,seed) {
    const a=30+5*(seed%9), b=2+Math.floor(seed/9)%5, t=7+seed%5;
    if(nivaa===0) return task('tall',
      m`På oppslagstavla står det «Leie av kajakk. Startavgift ${a} kr. Deretter ${b} kr per minutt.» Hva betaler du for ${t} minutter, i kroner?`,a+b*t,
      ['Hvilket beløp betaler du én gang?',m`Hvilket beløp må du multiplisere med ${t}?`],
      m`Startavgiften og tidsprisen gir $${a}+${b}\cdot ${t}=${a+b*t}$ kr. Ved null minutter gir modellen startavgiften.`,
      [err(b*t,'Du har tatt med tidsprisen. Hvilken pris står som fast beløp?')]);
    if(nivaa===1) return task('polynom',
      m`En klubb betalte ${a+b*4} kr for fire trykte plakater og ${a+b*10} kr for ti. Leverandøren tar fast oppstartsgebyr og samme pris per plakat. Skriv en modell for prisen i kroner for $x$ plakater.`, [a,b],
      ['Hvor mye koster de seks ekstra plakatene til sammen?', 'Finn pris per plakat. Trekk deretter prisen på fire plakater fra totalsummen for fire.'],
      m`Prisen per plakat er $(${a+b*10}-${a+b*4})/6=${b}$ kr. Oppstart koster $${a+b*4}-4\cdot ${b}=${a}$ kr. Modellen er $P(x)=${pol([a,b])}$ for positive, hele bestillinger med samme avtale.`,
      [err([0,b],'En modell uten oppstartsgebyr må også treffe begge totalsummene. Prøv x = 4.','funksjoner/1')]);
    const cap=a+2*b*t;
    return task('intervall',
      m`En tom vanntank rommer ${cap} liter. En pumpe fyller med ${b} liter per minutt fra $t=0$. Samtidig heller man ${a} liter i tanken ved start. For hvilket lukket tidsintervall beskriver $V(t)=${a}+${b}t$ mengden i tanken, fram til den er full? Oppgi minutter.`,
      {lo:0,hi:2*t,lc:true,hc:true}, ['Hvilke situasjoner svarer til starten og slutten på tidsintervallet?',m`Løs $${a}+${b}t=${cap}$. Er antakelsen om samme økning gyldig også etter dette?`],
      m`Ved $t=0$ er det $${a}$ liter. Ved $t=(${cap}-${a})/${b}=${2*t}$ er tanken akkurat full. Begge endepunktene er med, så gyldighetsintervallet er $[0;${2*t}]$.`);
  }
};

const residualer = {
  id:'modellering/2', kort:'Beregning av residualer og modellverdier', krav:['modellering/1','funksjoner/3'], maal:[7,8,9],
  stotte:'Sammenlikn måling og modell ved samme x-verdi. Trekk modellverdien fra målingen. Undersøk deretter om feilene har et mønster, og om modellen gir mening i situasjonen.',
  ord:'Residual er måling minus modellverdi. Ekstrapolasjon betyr å bruke en modell utenfor området for målingene.',
  utforsk:'Et frøfirma oppgir at antallet spirer etter dag 0, 1 og 2 var 10, 15 og 22. Finn en lineær og en eksponentiell modell fra de to første målingene. Sammenlikn på dag 2. Hvordan endrer du vurderingen dersom brettet bare har plass til 30 spirer?',
  lag(nivaa,seed) {
    const a=14+seed%9, r=(seed%2===0?1:-1)*(1+Math.floor(seed/2)%5);
    if(nivaa===0) return task('tall',
      m`Modellen varslet ${a} °C klokka 12. Termometeret viste ${a+r} °C. Finn residualet i °C.`, r,
      ['Hva er observasjonen, og hva er modellverdien?', 'Bruk samme rekkefølge hver gang. Start med målingen.'],
      m`Residualet er $${a+r}-${a}=${r}$ °C. Modellen lå ${r<0?'over':'under'} målingen.`,
      [err(-r,'Rekkefølgen snur fortegnet. Trekk modellverdien fra målingen.')]);
    if(nivaa===1) {
      const base=50+10*(seed%6), t=2+Math.floor(seed/6)%4;
      return task('tall',
        m`I et forsøk økte et signal fra ${base} til ${2*base} på ett sekund. En modell antar konstant dobling per sekund. Etter ${t} sekunder ble signalet målt til ${base*2**t+r}. Finn residualet da.`,r,
        ['Hva er startverdi og vekstfaktor?', m`Regn ut modellverdien etter ${t} sekunder før du bruker målingen.`],
        m`Modellen gir $${base}\cdot 2^{${t}}=${base*2**t}$. Residualet er $${base*2**t+r}-${base*2**t}=${r}$. En enkelt liten feil på dette tidspunktet sier lite om gyldigheten langt fram i tid.`,
        [err(-r,'Du fant differansen i motsatt rekkefølge.','modellering/2')]);
    }
    const k=2+seed%6, z=3+Math.floor(seed/6)%7;
    return task('tall',
      m`I en treningslogg dobles antall registrerte runder fra $${k}$ på dag 0 til $${2*k}$ på dag 1. To elever modellerer videre, én med fast tillegg og én med fast faktor. Begge treffer de to målingene. Hvor mange flere runder anslår faktormodellen på dag $${z}$? Drøft hvilken mer informasjon dere trenger.`,
      k*2**z-k*(1+z),['Finn hver elevs modell ut fra de to dagene.','Sammenlikn modellene på den angitte dagen. Kan målinger bare på dag 0 og 1 avgjøre hvilken regel som holder?'],
      m`Med fast tillegg blir det $${k}+${z}\cdot ${k}=${k*(1+z)}$. Med fast faktor blir det $${k}\cdot2^{${z}}=${k*2**z}$. Forskjellen er $${k*2**z-k*(1+z)}$. Flere målinger og kunnskap om tid og kapasitet trengs for å vurdere om noen av prognosene er rimelige.`);
  }
};

const algoritmer = {
  id:'modellering/3', kort:'Sporing av løkker og intervallhalvering', krav:['modellering/1','funksjoner/1'], maal:[1,4,7],
  stotte:'Skriv hva programmet skal finne. Bestem en startverdi, ett trinn og et stoppvilkår. Spor variablene for hånd gjennom de første trinnene. Kontroller også trinnet før løkka stopper.',
  ord:'En iterasjon er én runde i en løkke. Et stoppvilkår bestemmer når løkka er ferdig. Ved intervallhalvering beholdes en del som fortsatt inneholder en rot.',
  utforsk:'Programmer en sparekalkulator som stopper første måned du når 5000 kr. Begynn med 1000 kr og legg inn 300 kr per måned. Vis saldo før og etter siste innskudd. Endre koden slik at den også svarer fornuftig når innskuddet er null.',
  lag(nivaa,seed) {
    const start=2+seed%9, step=2+Math.floor(seed/9)%7, n=3+seed%6;
    if(nivaa===0) {
      const lim=start+step*n;
      return task('tall',
        m`En løkke begynner med verdi ${start} og teller 0. Så lenge verdien er mindre enn ${lim}, øker den verdien med ${step} og telleren med 1. Hva viser telleren når løkka stopper?`,
        n, ['Skriv starttilstanden i en tabell med verdi og teller.',m`Hva er telleren når verdien er $${lim-step}$? Skal løkka ta ett trinn til?`],
        m`Etter $k$ runder er verdien $${start}+${step}k$. Etter $${n-1}$ runder er den $${lim-step}$, etter $${n}$ er den $${lim}$. Da er vilkåret usant og telleren viser $${n}$.`,
        [err(n+1,'Når verdien blir nøyaktig lik grensen, er den fortsatt mindre enn grensen?')]);
    }
    if(nivaa===1) {
      const lo=1+seed%6, mid=lo+0.5, high=seed%2===0, t=lo+(high?0.7:0.3);
      const c=Math.round(t*t*100+2)/100;
      return task('intervall',
        m`Et program bruker intervallhalvering på $f(x)=x^2-${nb(c)}$. Startintervallet er $[${lo};${lo+1}]$. Hvilket lukket intervall skal beholdes etter første halvering?`,
        {lo:high?mid:lo, hi:high?lo+1:mid,lc:true,hc:true},
        ['Hva er midtpunktet? Har funksjonsverdien der samme fortegn som i venstre eller høyre endepunkt?',m`Sammenlikn $${nb(mid*mid)}$ med $${nb(c)}$. Roten ligger mellom et punkt med negativ og et punkt med positiv verdi.`],
        m`Venstre endepunkt gir negativ verdi, høyre positiv verdi. Ved $${nb(mid)}$ er $f$ ${high?'negativ':'positiv'}. Nytt intervall er $[${nb(high?mid:lo)};${nb(high?lo+1:mid)}]$. Kontinuiteten sikrer en rot i dette intervallet.`);
    }
    const v=50*(1+seed%6), nYears=3+Math.floor(seed/6)%5, threshold=v*2**nYears;
    return task('tall',
      m`En simulering starter på ${v} enheter og dobler verdien etter hvert helt døgn. Skriv en løkke som finner første hele døgn der verdien er strengt større enn ${threshold}. Hvilket døgn skriver programmet ut? Test også ett døgn tidligere.`,nYears+1,
      ['Hva skal løkka gjøre når verdien treffer grensen nøyaktig?', 'Initialiser døgn til 0. Fortsett å doble mens verdien er mindre enn eller lik grensen.'],
      m`Etter $${nYears}$ døgn er verdien $${v}\cdot 2^{${nYears}}=${threshold}$. Etter $${nYears+1}$ døgn er den $${2*threshold}$. Programmet skal øke døgntelleren én gang ved hver dobling og skrive ut $${nYears+1}$.`,
      [err(nYears,'Her traff programmet grensen nøyaktig. Oppgaven krever at verdien er strengt større.')]);
  }
};

export const ferdigheterB = [
  divisjon, faktorer, asymptoter, vekstfart, tangenter, optimering,
  sideforhold, setninger, sammensatt, tekstmodell, residualer, algoritmer
];
