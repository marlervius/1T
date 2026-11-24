// The question text identifies a concrete variant independently of the seed.
const T = String.raw;
const signed = n => n >= 0 ? '+' + n : String(n);
const shift = (v,n) => n ? v + signed(n) : v;
const timesX = n => n === 1 ? 'x' : n === -1 ? '-x' : n + 'x';
const line = (a,b) => shift(timesX(a), b);
const middle = n => n === 0 ? '' : n === 1 ? '+x' : n === -1 ? '-x' : signed(n)+'x';
const quad = (b,c) => shift('x^2'+middle(b),c);
const issue = (verdi,tekst,krav) => ({verdi,tekst,krav});
function task(type, sporsmal, svar, hint, losning, feil = []) {
  const format = {
    tall:'Skriv et tall eller en brøk.',
    polynom:'Skriv et uttrykk i x.',
    mengde:'Oppgi alle verdiene, for eksempel {-2; 3}.',
    intervall:'Skriv et intervall som [1; 3), eller en ulikhet med x.'
  }[type];
  return {type, sporsmal, svar, hint, losning, feil, format, variant:sporsmal};
}
function choose(sporsmal, svar, alternatives, hint, losning, seed) {
  const valg = [svar,...alternatives];
  const split = seed % valg.length;
  const feil = alternatives.map(verdi => issue(verdi, {
    'Et uttrykk':'Se etter likhetstegn eller en regel som tilordner en utverdi. Her beskrives mer enn et enkelt regneuttrykk.',
    'En identitet':'En identitet er en likhet som gjelder for alle tillatte innverdier. Se hva som faktisk står mellom uttrykkene.',
    'En likning med én løsning':'Denne beskrivelsen krever en likhet som holder for én eneste innverdi. Prøv flere verdier eller se etter en tilordning.',
    'En funksjonsdefinisjon':'En definisjon sier hvilken utverdi hver tillatt innverdi får. Hvilken rolle spiller variabelen her?'
  }[verdi]));
  return {...task('valg',sporsmal,svar,hint,losning,feil), valg:[...valg.slice(split),...valg.slice(0,split)]};
}
const interval = (lo, hi, lc = false, hc = false) => ({lo,hi,lc,hc});

export const ferdigheterA = [
  {
    id:'algebra/1', kort:'Potenser og røtter', krav:['grunnlag/1'], maal:[2,5,9],
    stotte:T`Skriv $2^3$ som $2\cdot2\cdot2$. Med samme grunntall kan du telle faktorer. Ved divisjon stryker du like faktorer oppe og nede.`,
    ord:T`Grunntall er tallet som opphøyes. Eksponenten sier hvor mange faktorer du har når den er et positivt heltall. $\sqrt{a}$ er den ikke-negative kvadratroten av $a$.`,
    utforsk:T`Lag en tabell for $2^n$ fra $n=3$ til $n=-3$. Hva må skje for hvert steg mot venstre? Bruk mønsteret til å begrunne regelen for negative eksponenter.`,
    lag(nivaa, seed) {
      const a = 2+seed%6, m = 2+Math.floor(seed/6)%4, n = 1+Math.floor(seed/24)%4;
      if (nivaa === 0) return task('tall',T`Skriv $${a}^${m}\cdot${a}^${n}$ som én potens med grunntall $${a}$. Hva er eksponenten?`,m+n,
        ['Hva betyr hver av de to potensene som produkt?',T`Tell først $${m}$ faktorer og deretter $${n}$ nye faktorer.`],
        T`Det er $${m}+${n}=${m+n}$ faktorer med samme grunntall. Produktet er $${a}^{${m+n}}$.`,[issue(m+n+1,'Tell faktorene én gang hver. Mellom to påfølgende faktorer står det ett multiplikasjonstegn.')]);
      if (nivaa === 1) return task('tall',T`Regn ut $\dfrac{${a}^{${m+n}}}{${a}^{${m}}}$.`,a**n,
        ['Hvilke faktorer kan forkortes?',T`Trekk $${m}$ fra $${m+n}$ i eksponenten.`],
        T`Kvotienten er $${a}^{${m+n}-${m}}=${a}^{${n}}=${a**n}$.`,[issue(n,'Du har funnet eksponenten. Oppgaven spør etter verdien av hele potensen.')]);
      const b = 4+seed%12;
      return task('tall',T`Finn verdien av $\dfrac{\sqrt{x^2}}{x}\cdot ${a}^{-${n}}$ når $x=-${b}$. Gi eksakt svar.`,-1/a**n,
        [T`Hvilket fortegn har $\sqrt{(-${b})^2}$?`,T`Skriv $\sqrt{x^2}$ som $|x|$ og en negativ potens som en brøk.`],
        T`Siden $x<0$, er $|x|/x=-1$. Svaret er $-1/${a**n}$.`,[issue(1/a**n,T`Kvadratroten er positiv her. Hva blir fortegnet når du deler på $x=-${b}$?`,'grunnlag/1')]);
    }
  },
  {
    id:'algebra/2', kort:'Uttrykk og identiteter', krav:['grunnlag/2'], maal:[5],
    stotte:T`Et uttrykk som $2x+3$ kan ha ulik verdi. Sett inn et tall for $x$. En likning spør når to uttrykk har lik verdi. I en identitet er verdiene like for alle tillatte $x$.`,
    ord:T`En funksjon gir nøyaktig én utverdi for hver tillatt innverdi. Definisjonsmengden er alle tillatte innverdier.`,
    utforsk:T`Sammenlign $2(x+1)$ og $2x+2$ for tre verdier av $x$. Holder tre treff som bevis på en identitet? Vis ved å multiplisere ut. Lag deretter en likning som bare har én løsning.`,
    lag(nivaa,seed) {
      const a=2+seed%7,b=2+Math.floor(seed/7)%8,x=-(1+Math.floor(seed/56)%6);
      if (!nivaa) return task('tall',T`Finn verdien av $${a}x-${b}$ når $x=${x}$.`,a*x-b,
        ['Hvilket tall skal erstatte x?','Multipliser først, og trekk så fra konstanten.'],
        T`Sett inn med parentes. $${a}\cdot(${x})-${b}=${a*x}-${b}=${a*x-b}$.`,[issue(-a*x-b,'Kontroller fortegnet når du ganger et positivt tall med et negativt tall.')]);
      if (nivaa===1) {
        const expr=[T`$${a}x+${a*b}$`,T`$${a}(x+${b})=${a}x+${a*b}$`,T`$${a}x+${b}=${a*b}$`,T`$f:\mathbb R\to\mathbb R,\quad x\mapsto ${a}x+${b}$`];
        const names=['Et uttrykk','En identitet','En likning med én løsning','En funksjonsdefinisjon'];
        const i=seed%4;
        return choose(T`Velg den mest presise beskrivelsen av ${expr[i]}.`,names[i],names.filter((_,j)=>j!==i),
          ['Står det en likhet, en tilordning eller bare et uttrykk?', 'Hvis det er en likhet, sjekk om den gjelder for alle reelle x.'],
          [T`$${a}x+${a*b}$ er et uttrykk som får en verdi når $x$ er kjent.`,T`Ganger vi ut venstresiden, får vi høyresiden for alle $x$.`,T`Siden koeffisienten til $x$ er $${a}\ne0$, finnes nøyaktig én løsning.`,T`Hver reell innverdi tilordnes én utverdi.`][i],Math.floor(seed/4));
      }
      return task('tall',T`En elev skriver $\dfrac{x^2-${b*b}}{x-${b}}=x+${b}$ for alle reelle $x$. For hvilken eneste verdi svikter påstanden?`,b,
        ['Når kan brøken regnes ut?',T`Løs $x-${b}=0$ før du forkorter.`],
        T`Når $x\ne${b}$, kan $(x-${b})(x+${b})$ forkortes. Ved $x=${b}$ er nevneren null, så venstresiden er udefinert.`,
        [issue(-b,'Telleren kan være null. Det er en null i nevneren som hindrer divisjon.')]);
    }
  },
  {
    id:'algebra/3', kort:'Kvadratsetningene', krav:['algebra/2'], maal:[2,6],
    stotte:T`Tegn et kvadrat med side $x+2$ for positiv $x$. Del hver side i $x$ og $2$. De fire delene har areal $x^2$, $2x$, $2x$ og $4$. Du får to like kryssledd.`,
    ord:T`En faktor er et ledd i et produkt. Faktorisering betyr å skrive et uttrykk som et produkt. Et kryssledd oppstår når ulike ledd ganges sammen i et kvadrat.`,
    utforsk:T`Utvid $(x+1)^2$, $(x+2)^2$ og $(x+3)^2$. Formuler en regel for $(x+a)^2$ og begrunn den ved hjelp av den distributive loven, også når $a$ er negativ.`,
    lag(nivaa,seed) {
      const a=2+seed%13, b=2+Math.floor(seed/13)%5;
      if (!nivaa) return task('tall',T`Et kvadrat med side $x+${a}$ består av et $x^2$-kvadrat, et $${a*a}$-kvadrat og to rektangler. Hvilken koeffisient står foran $x$ når du legger sammen rektanglene?`,2*a,
        ['Hvilke mål har hvert av de to rektanglene?',T`Hvert rektangel har areal $${a}x$.`],
        T`Rektanglene gir $${a}x+${a}x=${2*a}x$. Koeffisienten er $${2*a}$.`,[issue(a,'Du har regnet med ett rektangel. Finn summen av begge.')]);
      if (nivaa===1) return task('polynom',T`Utvid $(x-${a})^2$. Skriv svaret som et polynom.`,[a*a,-2*a,1],
        ['Skriv kvadratet som to like faktorer.','Hva er fortegnet til kryssleddene? Og til konstantleddet?'],
        T`$(x-${a})(x-${a})=x^2-${a}x-${a}x+${a*a}=${quad(-2*a,a*a)}$.`,[issue([a*a,0,1],'Du har kvadrert hvert ledd. Skriv parentesen to ganger og finn de to kryssleddene.','grunnlag/2')]);
      return task('polynom',T`Forenkle $(${b}x+${a})^2-(${b}x-${a})^2$. Finn en metode som slipper å regne ut begge kvadratene.`,[0,4*a*b],
        ['Kan du se en differanse av to kvadrater?',T`Bruk $u^2-v^2=(u-v)(u+v)$ med $u=${b}x+${a}$ og $v=${b}x-${a}$.`],
        T`Differansen av parentesene er $${2*a}$ og summen er $${2*b}x$. Produktet blir $${4*a*b}x$.`,[issue([0,2*a*b],'De to kryssleddene får motsatt fortegn før subtraksjonen. Hva skjer når du trekker et negativt kryssledd fra et positivt?')]);
    }
  },
  {
    id:'likninger/1', kort:'Balansere en likning', krav:['algebra/2'], maal:[3,4],
    stotte:T`Tenk på en balanse. I $2x+3=11$ kan du ta bort $3$ på begge sider. Da er $2x=8$. Del begge sider på $2$. Sett $x=4$ inn for å sjekke.`,
    ord:T`Å isolere $x$ betyr å få $x$ alene på én side. To likninger er ekvivalente når de har samme løsningsmengde.`,
    utforsk:T`Start med $2x+3=11$. Legg til $4$ på begge sider, og løs igjen. Prøv så å gange begge sider med $0$. Hvilke operasjoner kan du angre, og hvorfor spiller det noen rolle?`,
    lag(nivaa,seed) {
      const a=2+seed%7,b=2+Math.floor(seed/7)%9,x=2+Math.floor(seed/3)%11, c=1+Math.floor(seed/13)%5;
      if (!nivaa) return task('tall',T`På en balanse veier $${a}$ like poser og et lodd på $${b}$ kg til sammen $${a*x+b}$ kg. Hvor mange kilo veier én pose?`,x,
        ['Hva veier posene alene?',T`Trekk fra $${b}$ på begge sider og fordel resten på $${a}$ poser.`],
        T`$${a}x+${b}=${a*x+b}$ gir $${a}x=${a*x}$. Hver pose veier $${x}$ kg. Kontrollen er $${a}\cdot${x}+${b}=${a*x+b}$.`,
        [issue(a*x,'Dette er vekten til alle posene. Finn vekten til én pose.','likninger/1')]);
      if (nivaa===1) return task('tall',T`Løs $${a+c}(x-${b})=${line(c,a*x-(a+c)*b)}$. Kontroller svaret i den opprinnelige likningen.`,x,
        ['Hva må både x og konstanten i parentesen ganges med?',T`Trekk $${timesX(c)}$ fra begge sider og samle konstantene på høyresiden.`],
        T`Utvid venstresiden til $${line(a+c,-(a+c)*b)}$. Når leddene er samlet, får du $${a}x=${a*x}$ og $x=${x}$. Begge sider gir $${(a+c)*(x-b)}$.`,[issue(x-(a+c-1)*b/a,'Kontroller hvordan konstanten i parentesen blir multiplisert inn. Sett svaret ditt i begge sider.','grunnlag/2')]);
      if (seed%2===0) {
        const d=2+Math.floor(seed/5)%5;
        return task('tall',T`Hvor stor må $k$ være for at $(k-${a})x+${d}=${line(b,d)}$ skal ha uendelig mange løsninger?`,a+b,
          ['Hva må være likt for at to lineære uttrykk skal være like for alle x?',T`Sammenlign koeffisientene. Da må $k-${a}=${b}$.`],
          T`Konstantleddene er allerede like. Vi trenger $k=${a+b}$, slik at begge sider er $${line(b,d)}$ for alle $x$.`,[issue(b,'Høyresidens stigningstall er riktig. Hvilket tall må k være for at venstresiden skal få dette stigningstallet?')]);
      }
      return task('polynom',T`En funksjon er gitt ved $f(x)=\dfrac{x-${b}}{${a}}$. Finn funksjonsuttrykket til den inverse funksjonen $f^{-1}(x)$.`,[b,a],
        ['Kall utverdien y. Hvilken operasjon opphever divisjonen?',T`Multipliser begge sider med $${a}$ og legg så til $${b}$. Bytt til slutt navn på innvariabelen.`],
        T`$${a}y=x-${b}$ gir $x=${a}y+${b}$. Den inverse funksjonen har dermed uttrykket $${a}x+${b}$ med $x$ som innvariabel.`,[issue([-b,a],'Etter at begge sider er multiplisert med nevneren, står det fortsatt et minustegn foran konstanten. Hvilken operasjon opphever dette?')]);
    }
  },
  {
    id:'likninger/2', kort:'Løse likningssystemer', krav:['likninger/1'], maal:[4,7],
    stotte:T`Et tallpar må passe i begge likningene. Hvis $y=x+2$ og $x+y=8$, kan du bytte ut $y$ i den andre likningen. Da har du bare én ukjent igjen.`,
    ord:T`Innsetting betyr å bytte ut en variabel med et uttrykk som er like stort. Ved eliminasjon adderer eller subtraherer du likninger for å fjerne en variabel.`,
    utforsk:T`Tegn $y=2x+1$ og $y=ax+3$. Prøv $a=0$, $1$ og $2$. Hvordan ser du antall løsninger i grafene? Finn en situasjon med uendelig mange løsninger.`,
    lag(nivaa,seed) {
      const a=2+seed%7, x=2+Math.floor(seed/7)%8, y=x+a, p=2+Math.floor(seed/3)%6, q=p+1+Math.floor(seed/15)%4;
      if (!nivaa) return task('tall',T`To tall har sum $${x+y}$. Det største er $${a}$ større enn det minste. Kall det minste tallet $x$. Hva er $x$?`,x,
        [T`Skriv det største tallet som $x+${a}$.`,T`Sett inn i summen: $x+(x+${a})=${x+y}$.`],
        T`$2x=${x+y}-${a}=${2*x}$, så $x=${x}$. Tallene $${x}$ og $${y}$ har både riktig sum og riktig differanse.`,[issue(y,'Det er det største tallet. Oppgaven spør etter det minste.')]);
      if (nivaa===1) return task('tall',T`En skolekafé selger $${x+y}$ drikker. Te koster $${p}$ kr og kakao $${q}$ kr. Inntekten er $${p*x+q*y}$ kr. Hvor mange kakao solgte de?`,y,
        ['Sett opp én likning for antall og én for kroner.',T`Hvis alle drikkene var te, ville de kostet $${p*(x+y)}$ kr. Hvor mye mer gir hver kakao?`],
        T`Forskjellen i inntekt er $${p*x+q*y}-${p*(x+y)}=${(q-p)*y}$ kr. Hver kakao gir $${q-p}$ kr mer. Dermed ble det solgt $${y}$ kakao og $${x}$ te.`,[issue(x,'Du har funnet antall te. Finn antall kakao med antallslikningen.')]);
      const d=1+Math.floor(seed/9)%5;
      return task('tall',T`Linjene $y=${line(a,d)}$ og $y=kx+${d+1}$ skal være parallelle uten å falle sammen. Hvilken verdi må $k$ ha?`,a,
        ['Hva forteller stigningstallet om to rette linjer?','Sammenlign både koeffisientene til x og skjæringene med y-aksen.'],
        T`Når $k=${a}$, har linjene samme stigningstall og ulike konstantledd. Ved innsetting står det $${d}=${d+1}$, som er usant for alle $x$.`,[issue(-a,'Med motsatt stigningstall vil linjene skjære hverandre. Parallelle linjer trenger samme stigningstall.')]);
    }
  },
  {
    id:'likninger/3', kort:'Fortegn og intervaller', krav:['likninger/1'], maal:[4,9],
    stotte:T`Løs først som en likning for å finne grensen. Når du deler en ulikhet på et negativt tall, snur tegnet. Kontroller ved å sette inn ett tall på hver side av grensen.`,
    ord:T`Et åpent endepunkt er utelatt. Et lukket endepunkt er med. En verdi som gjør en nevner lik null, må alltid utelates.`,
    utforsk:T`Lag en fortegnslinje for $(x-2)/(x+1)$. Prøv $x=-2$, $0$ og $3$. Sammenlign løsningene for $<0$ og $\le0$. Hvilket endepunkt kan endre seg?`,
    lag(nivaa,seed) {
      const a=2+seed%8,r=2+Math.floor(seed/8)%10,s=r+1+Math.floor(seed/3)%6;
      if (!nivaa) return task('intervall',T`Hvilke tall $x$ oppfyller $x+${a}\le ${a+r}$? Svar med ett intervall.`,interval(-Infinity,r,false,true),
        ['Hvilket tall kan du trekke fra begge sider?', 'Grenseverdien oppfyller likhet. Skal den da være med?'],
        T`Trekk fra $${a}$. Løsningen er $x\le${r}$, altså $(-\infty,${r}]$.`,
        [issue(interval(-Infinity,r),'Ulikheten tillater likhet. Test høyre endepunkt selv.')]);
      if (nivaa===1) return task('intervall',T`Finn løsningene av $-${a}x<-${a*r}$ og skriv som ett intervall.`,interval(r,Infinity),
        ['Hvilket tall må du dele på?', 'Prøv ett tall større enn grensen i den opprinnelige ulikheten.'],
        T`Divisjon på $-${a}$ snur ulikheten. Vi får $x>${r}$, altså $(${r},\infty)$. For eksempel er $-${a*(r+1)}<-${a*r}$.`,
        [issue(interval(-Infinity,r),'Når du deler på et negativt tall, bytter de to sidene rekkefølge på tallinja.','grunnlag/1')]);
      return task('intervall',T`Løs $\dfrac{x-${r}}{x-${s}}\le0$. Svar med ett intervall.`,interval(r,s,true,false),
        ['Hvor er brøken null, og hvor er den udefinert?',T`Velg én testverdi mellom $${r}$ og $${s}$. Sjekk endepunktene hver for seg.`],
        T`Mellom $${r}$ og $${s}$ har teller og nevner motsatte fortegn. Ved $${r}$ er brøken null, ved $${s}$ er den udefinert. Løsningen er $[${r},${s})$.`,
        [issue(interval(r,s,true,true),'Høyre endepunkt gjør nevneren lik null.','grunnlag/3'), issue(interval(r,s),'Venstre endepunkt gir null og oppfyller ulikheten.','likninger/3')]);
    }
  },
  {
    id:'andregrad/1', kort:'Finne røtter', krav:['algebra/3','likninger/1'], maal:[4,6],
    stotte:T`Et produkt kan bli null når én av faktorene er null. I $(x-2)(x+3)=0$ får du to små likninger. Løs dem hver for seg, og sjekk begge svarene.`,
    ord:T`En rot er en verdi som gjør et uttrykk lik null. Har et andregradspolynom to like røtter, kalles roten en dobbeltrot.`,
    utforsk:T`Undersøk $x^2-6x+c=0$ for $c=8$, $9$ og $10$. Bruk graf og fullstendig kvadrat til å forklare når to røtter blir til én, og når det ikke er noen reelle røtter.`,
    lag(nivaa,seed) {
      const r=2+seed%11,s=1+Math.floor(seed/11)%7,a=2+Math.floor(seed/5)%8;
      if (!nivaa) return task('mengde',T`Finn begge løsningene av $(x-${r})(x+${s})=0$.`,[-s,r],
        ['Når blir et produkt null?',T`Hva gir $x-${r}=0$? Hva gir $x+${s}=0$?`],
        T`Faktorene blir null ved $x=${r}$ og $x=-${s}$. Løsningsmengden er $\{-${s};\,${r}\}$.`,[issue([r],'Dette er en løsning. Hva må x være for at den andre faktoren skal bli null?')]);
      if (nivaa===1) return task('mengde',T`Løs $${quad(s-r,-r*s)}=0$. Oppgi alle reelle løsninger.`,[-s,r],
        [T`Hvilke to heltall har produkt $-${r*s}$ og sum $${s-r}$?`,'Bruk tallene til å faktorisere og sett hver faktor lik null.'],
        T`$${quad(s-r,-r*s)}=(x-${r})(x+${s})$. Dermed er løsningene $-${s}$ og $${r}$.`,r===s ? [issue([r],'Sjekk også hva som skjer med den negative verdien.','likninger/1')] : [issue([-r,s],'Tallene du fant i faktorene må settes inn i hver sin lille likning der faktoren er lik null.','likninger/1')]);
      return task('tall',T`Likningen $${a}x^2-${2*a*r}x+c=0$ skal ha nøyaktig én reell løsning. Finn $c$.`,a*r*r,
        ['Hvordan ser et kvadrat med én dobbeltrot ut?',T`Fullfør kvadratet i $${a}(x^2-${2*r}x)+c$.`],
        T`Venstresiden er $${a}(x-${r})^2+c-${a*r*r}$. Nullpunktet blir en dobbeltrot når $c=${a*r*r}$. Da er $x=${r}$ eneste løsning.`,[issue(r,'Dette er verdien av dobbeltroten. Oppgaven spør etter konstantleddet som gir den.')]);
    }
  },
  {
    id:'andregrad/2', kort:'Symmetri og ekstremalpunkt', krav:['andregrad/1'], maal:[6,9],
    stotte:T`I $f(x)=(x-3)^2+2$ er kvadratet minst når $x=3$. Da er verdien $2$. I grafen gir dette bunnpunktet $(3,2)$.`,
    ord:T`Symmetriaksen deler parabelen i to speilbilder. Et ekstremalpunkt er et toppunkt eller et bunnpunkt. Skill mellom punktets koordinater og funksjonsverdien der.`,
    utforsk:T`Start med $y=x^2$. Sammenlign $y=(x-2)^2$, $y=(x-2)^2+3$ og $y=-(x-2)^2+3$. Hva bevares i hvert steg? Tegn alle fire før du kontrollerer i et grafverktøy.`,
    lag(nivaa,seed) {
      const h=2+seed%9,k=2+Math.floor(seed/9)%8,d=1+Math.floor(seed/5)%7;
      if (!nivaa) return task('tall',T`Hva er den minste verdien til $f(x)=(x-${h})^2+${k}$?`,k,
        ['Kan kvadratet være negativt?',T`Sett $x=${h}$. Hva står igjen?`],
        T`Kvadratet er minst når det er null. $f(${h})=${k}$, og alle andre innverdier gir større funksjonsverdi.`,[issue(-k,'Siden kvadratet er null eller positivt, kan du sjekke nedre grense direkte fra uttrykket.')]);
      if (nivaa===1) return task('tall',T`Grafen til en andregradsfunksjon skjærer $x$-aksen ved $${h-d}$ og $${h+d}$. Hvilken $x$-koordinat har ekstremalpunktet?`,h,
        ['Hvor ligger symmetriaksen i forhold til nullpunktene?','Finn midtpunktet mellom de to tallene på tallinja.'],
        T`Ekstremalpunktet ligger på symmetriaksen $x=\dfrac{(${h-d})+(${h+d})}{2}=${h}$.`,[issue(2*h,'Dette er summen av nullpunktene. Hvor ligger midtpunktet mellom dem?')]);
      return task('tall',T`Et rektangel har omkrets $${4*h}$ m. Hvilket størst mulig areal kan det ha, målt i kvadratmeter?`,h*h,
        [T`Hvis én side er $x$, hvor lang er den andre?`,T`Skriv arealet $x(${2*h}-x)$ som et konstantledd minus et kvadrat.`],
        T`Arealet er $A(x)=x(${2*h}-x)=${h*h}-(x-${h})^2$, med $0<x<${2*h}$. Maksimum $${h*h}$ m² oppnås for et kvadrat med side $${h}$ m.`,
        [issue(h,'Du har funnet sidelengden ved maksimum. Oppgi arealet.')]);
    }
  },
  {
    id:'andregrad/3', kort:'Andregradsulikheter', krav:['andregrad/1','likninger/3'], maal:[4,6],
    stotte:T`Start med nullpunktene. Tegn en enkel parabel. Der grafen ligger under aksen, er funksjonsverdien negativ. Se på om ulikheten tillater null i endepunktene.`,
    ord:T`Et fortegn viser om verdien er positiv, null eller negativ. En faktor skifter fortegn når du passerer et enkelt nullpunkt.`,
    utforsk:T`Skisser $y=(x+1)(x-3)$ og $y=-(x+1)(x-3)$. For hvilke $x$ er grafene positive? Forklar hvorfor det er nyttig å kjenne både nullpunktene og retningen på parabelen.`,
    lag(nivaa,seed) {
      const r=1+seed%9,s=1+Math.floor(seed/9)%7,k=1+Math.floor(seed/7)%5;
      if (!nivaa) return task('intervall',T`En parabel åpner oppover og har nullpunkter $-${r}$ og $${s}$. Hvor ligger grafen strengt under $x$-aksen?`,interval(-r,s),
        ['Lag en skisse med de to nullpunktene.', 'Ligger skjæringspunktene under eller på aksen?'],
        T`Grafen er under aksen mellom nullpunktene. Svaret er $(-${r},\,${s})$.`,[issue(interval(-r,s,true,true),'Nullpunktene ligger på aksen. Oppgaven spør når grafen er strengt under aksen.')]);
      if (nivaa===1) return task('intervall',T`Finn alle $x$ som oppfyller $-(x+${r})(x-${s})\ge0$.`,interval(-r,s,true,true),
        ['Hvor er produktet null?', 'Prøv x = 0 og husk minuset foran produktet.'],
        T`Nullpunktene er $-${r}$ og $${s}$. Parabelen åpner nedover, så den er over eller på aksen i $[-${r},\,${s}]$.`,
        [issue(interval(-r,s),'Begge nullpunktene oppfyller også ulikheten.')]);
      const h=r+s+1;
      return task('intervall',T`En digital sensor varsler når $k(x-${h})^2\le ${k*s*s}$, der $k=${k}$. For hvilke reelle $x$ kommer varselet?`,interval(h-s,h+s,true,true),
        ['Del begge sider på det positive tallet k.',T`Tolk $(x-${h})^2\le${s*s}$ som en maksimal avstand til $${h}$ på tallinja.`],
        T`$|x-${h}|\le${s}$ gir $${h}-${s}\le x\le${h}+${s}$. Intervallet er $[${h-s},\,${h+s}]$.`,[issue(interval(h-s,h+s),'Ved begge endepunkter er det likhet. Varsler sensoren også da?')]);
    }
  },
  {
    id:'funksjoner/1', kort:'Lineære modeller', krav:['grunnlag/4','algebra/2'], maal:[3,7,8,9],
    stotte:T`I $y=3x+5$ starter du på $5$ når $x=0$. Hvis $x$ øker med $1$, øker $y$ med $3$. Lag en rad for innverdier og en for utverdier.`,
    ord:T`Stigningstallet måler hvor mye utverdien endres per enhet av innverdien. Konstantleddet er utverdien når innverdien er null.`,
    utforsk:T`To mobilabonnement koster $50+2x$ og $90+x$ kroner ved $x$ enheter bruk. Lag tabell, tegn linjene og finn når du vil velge hvert tilbud. Hvilke innverdier gir mening her?`,
    lag(nivaa,seed) {
      const a=2+seed%9,b=5+Math.floor(seed/9)%12,x=2+Math.floor(seed/5)%6,d=2+Math.floor(seed/17)%4;
      if (!nivaa) return task('tall',T`En verkstedtime koster $${a}$ kr per minutt pluss $${b}$ kr i startpris. Hva koster $${x}$ minutter, målt i kroner?`,a*x+b,
        ['Hva betaler du før det har gått noen minutter?', 'Legg startprisen til prisen for alle minuttene.'],
        T`$P(${x})=${a}\cdot${x}+${b}=${a*x+b}$ kr.`,[issue(a*x,'Tidskostnaden er riktig. Husk startprisen.')]);
      if (nivaa===1) return task('tall',T`Vannmengden i en tank øker lineært. Etter $${x}$ min er den $${a*x+b}$ L, og etter $${x+d}$ min er den $${a*(x+d)+b}$ L. Finn stigningstallet i L/min.`,a,
        ['Hvor mange liter kom til mellom målingene?', 'Del endringen i liter på antall minutter mellom målingene.'],
        T`Endringen per minutt er $(${a*(x+d)+b}-${a*x+b})/(${x+d}-${x})=${a*d}/${d}=${a}$ L/min.`,[issue(a*d,'Du har funnet antall liter mellom målingene. Oppgi hvor mange liter dette er per minutt.')]);
      return task('polynom',T`En lineær modell passerer $(${x},\,${a*x+b})$ og $(${x+d},\,${a*(x+d)+b})$. Finn hele funksjonsuttrykket i $x$.`,[b,a],
        ['Regn ut endring i y delt på endring i x.', 'Bruk så ett målepunkt til å finne konstantleddet.'],
        T`Stigningstallet er $${a*d}/${d}=${a}$. Med det første punktet blir konstantleddet $${a*x+b}-${a}\cdot${x}=${b}$. Modellen er $f(x)=${line(a,b)}$.`,[issue([0,a],'Stigningstallet stemmer. Sett det første punktet i modellen for å finne startverdien.','grunnlag/4')]);
    }
  },
  {
    id:'funksjoner/2', kort:'Hull og asymptoter', krav:['grunnlag/3','algebra/3','funksjoner/1'], maal:[5,9],
    stotte:T`Begynn med nevneren. Hvis den er null for en verdi av $x$, er verdien forbudt. Sjekk om en felles faktor kan forkortes. Et hull står igjen i grafen ved en utelatt verdi når grenseverdien er endelig.`,
    ord:T`En asymptote er en rett linje grafen nærmer seg. Ved en loddrett asymptote vokser størrelsen på funksjonsverdien uten grense fra minst én side.`,
    utforsk:T`Sammenlign grafene til $(x^2-4)/(x-2)$ og $1/(x-2)$ nær $x=2$. Lag en tabell for $1{,}9$, $1{,}99$, $2{,}01$ og $2{,}1$. Hvorfor kan en graftegner skjule forskjellen på hull og hel linje?`,
    lag(nivaa,seed) {
      const a=2+seed%11,b=2+Math.floor(seed/11)%7,c=1+Math.floor(seed/5)%8;
      if (!nivaa) return task('tall',T`Hvilken $x$-verdi må tas ut av definisjonsmengden til $f(x)=\dfrac{${b}}{x-${a}}$?`,a,
        ['Når kan vi ikke utføre en divisjon?',T`Løs $x-${a}=0$.`],
        T`Nevneren blir null for $x=${a}$. Alle andre reelle tall er tillatt.`,[issue(-a,'Sett det foreslåtte tallet inn i nevneren og sjekk om du virkelig får null.')]);
      if (nivaa===1) return task('tall',T`Grafen til $f(x)=\dfrac{(x-${a})(x+${c})}{x-${a}}$ har et hull. Hvilken $y$-koordinat har det manglende punktet?`,a+c,
        ['Hvilken verdi er forbudt i det opprinnelige uttrykket?',T`Forkort for $x\ne${a}$. Hvilken høyde nærmer grafen seg?`],
        T`For $x\ne${a}$ er $f(x)=x+${c}$. Punktet $(${a},\,${a+c})$ mangler på linja.`,[issue(a,'Dette er x-koordinaten. Finn høyden på den forkortede linja ved denne verdien.')]);
      return task('mengde',T`Funksjonen $f(x)=\dfrac{x-${a}}{(x-${a})(x+${b})(x+${b+c})}$ er gitt på sin naturlige definisjonsmengde. Oppgi $x$-verdiene til alle loddrette asymptoter.`,[-b-c,-b],
        ['Finn alle tre nullpunktene til nevneren.',T`Hvilken faktor forsvinner ved forkorting? Et hull og en loddrett asymptote oppfører seg forskjellig.`],
        T`Ved $x=${a}$ er grenseverdien endelig etter forkorting. Ved $x=-${b}$ og $x=-${b+c}$ har den forkortede brøken teller $1$ og nevner som nærmer seg null. Begge gir loddrette asymptoter.`,
        [issue([-b-c,-b,a],'Du har funnet alle utelatte innverdier. Én gir et hull etter forkorting.','grunnlag/3')]);
    }
  },
  {
    id:'funksjoner/3', kort:'Eksponential- og potensmodeller', krav:['algebra/1','funksjoner/1'], maal:[3,7,9],
    stotte:T`Se hvor variabelen står. I $3\cdot2^x$ står $x$ i eksponenten. Hver økning på én gir dobling. I $3x^2$ er det $x$ som kvadreres. Her gir en dobling av $x$ en firedobling av verdien.`,
    ord:T`En vekstfaktor er forholdet mellom to påfølgende verdier i en eksponentialmodell med steg én. I en potensmodell er eksponenten fast.`,
    utforsk:T`Sammenlign $f(x)=2^x$ og $g(x)=x^2$ for $x=1,2,3,4,5$. Finn forholdet mellom påfølgende verdier for hver modell. Undersøk så forholdet mellom $g(2x)$ og $g(x)$.`,
    lag(nivaa,seed) {
      const a=2+seed%8,b=2+Math.floor(seed/8)%3,p=2+Math.floor(seed/3)%4, x=1+Math.floor(seed/5)%3;
      if (!nivaa) return task('tall',T`En kultur starter med $${a}$ tusen celler. Antallet blir $${b}$ ganger så stort hver time. Hvor mange tusen celler har modellen etter $${x}$ timer?`,a*b**x,
        ['Hvilket tall beskriver starten?', T`Gang startverdien med $${b}$ én gang for hver av de $${x}$ timene.`],
        T`$N(${x})=${a}\cdot${b}^{${x}}=${a*b**x}$ tusen.`,[issue(a*b**(x-1),'Du har ganget inn én vekstfaktor for lite. Ved start er det gått null timer.')]);
      if (nivaa===1) return task('tall',T`En potensfunksjon er $f(x)=${a}x^{${p}}$ for $x>0$. Hvor mange ganger så stor blir funksjonsverdien når innverdien ganges med $${b}$?`,b**p,
        [T`Sett inn $${b}x$ i stedet for $x$.`,T`Sammenlign $\dfrac{f(${b}x)}{f(x)}$ og forkort.`],
        T`$f(${b}x)=${a}(\,${b}x\,)^{${p}}=${b**p}\, f(x)$. Faktoren er $${b**p}$.`,[issue(b,'Dette er faktoren for innverdien. Hvilken virkning får eksponenten på forholdet mellom utverdiene?')]);
      return task('tall',T`For en eksponentialmodell $f(t)=Aq^t$ med $q>0$ vet du at $f(${x})=${a*b**x}$ og $f(${x+2})=${a*b**(x+2)}$. Hva blir $f(0)$?`,a,
        ['Hva finner du ved å dele den andre målingen på den første?',T`Forholdet gjelder to tidssteg: $q^2=f(${x+2})/f(${x})$. Gå så tilbake til tid null.`],
        T`$q^2=${b*b}$ og $q=${b}$. Dermed er $f(0)=A=\dfrac{${a*b**x}}{${b}^{${x}}}=${a}$.`,
        [issue(b*b,'Dette er endringsfaktoren over to steg. Finn startverdien ved å gå tilbake til t = 0.'),issue(a*b**x,'Dette er målingen ved den første oppgitte tiden. Gå tilbake til start gjennom å dele på vekstfaktoren for hvert tidssteg.')].filter((f,i,alle)=>f.verdi!==a && alle.findIndex(other=>other.verdi===f.verdi)===i));
    }
  }
];
