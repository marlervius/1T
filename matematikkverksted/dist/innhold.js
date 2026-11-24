import {texNumber} from './matematikk.js';

const MB = 'https://openmath.online/books/pdf/MB_bm.pdf';
const TM = 'https://openmath.online/books/pdf/TM1_bm.pdf';
const AM = 'https://openmath.online/books/pdf/AM_bm.pdf';
const ref = (bok, kapittel, side) => ({bok, kapittel, url: `${{MB,TM,AM}[bok]}#page=${side}`});
const n = (nivå, spørsmål, svar, tips, løsning, desimaler) => ({nivå,spørsmål,svar,tips,løsning,desimaler});
const o = (nivå, spørsmål, tips, løsning, arbeidsmåte) => ({nivå,spørsmål,tips,løsning,arbeidsmåte});
const l = (tittel, mål, teori, regel, eksempel, steg, kilde, oppgaver) => ({tittel,mål,teori,regel,eksempel,steg,kilde,oppgaver});
const k = (id,tittel,kort,formel,farge,leksjoner) => ({id,tittel,kort,formel,farge,leksjoner});

export const kapitler = [
k('algebra','Tall og algebra','Potenser, røtter og algebraiske uttrykk','$(a + b)^{2}$','blue',[
l('Potenser og røtter','Bruk potensreglene og hold styr på fortegn og vilkår.',[
'En positiv heltallseksponent teller hvor mange ganger grunntallet inngår som faktor. Ved multiplikasjon med samme grunntall kan alle faktorene telles samlet. Ved divisjon forkorter vi faktorer, så eksponentene trekkes fra hverandre.',
'For $a \\ne 0$ gir $\\frac{a^{m}}{a^{m}}= 1$ at $a^{0} = 1$. For $a > 0$ er $a^{\\tfrac{1}{2}}= \\sqrt{a}$. Kvadratroten er den ikke-negative roten, så $\\sqrt{x^{2}} = \\lvert x\\rvert$. Parentesen bestemmer om minustegnet er med i grunntallet.'
],'$\\begin{gathered}a^m\\cdot a^n=a^{m+n}\\\\\\frac{a^m}{a^n}=a^{m-n}\\end{gathered}$','Forenkle $\\frac{2^{3} \\cdot 2^{-4}}{2^{-2}}$.',['Tell eksponentene i telleren. $3 + (-4) = -1$.','Trekk fra eksponenten i nevneren. $-1 - (-2) = 1$.','Uttrykket er $2^{1} = 2$. Kontroller med $\\frac{\\frac{8}{16}}{\\frac{1}{4}}= 2$.'],ref('MB','§ 8.2–8.3',194),[
n('Grunnøving','Regn ut $\\frac{3^{4}}{3^{2}}$.',9,'Trekk eksponenten i nevneren fra den i telleren.','$\\frac{3^{4}}{3^{2}}= 3^{2} = 9$.'),
n('Anvendelse','Regn ut $16^{\\tfrac{3}{4}}$.',8,'Ta fjerderoten først.','Fjerderoten av $16$ er $2$. Da er $16^{\\tfrac{3}{4}}= 2^{3} = 8$.'),
o('Fordypning','Forklar hvorfor $\\sqrt{x^{2}} = \\lvert x\\rvert$. Bruk $x = -5$ som kontroll.','Hva slags fortegn har en kvadratrot?','Både $\\lvert x\\rvert$ og $\\sqrt{x^{2}}$ er ikke-negative tall som kvadreres til $x^{2}$. Når $x = -5$, får vi $\\sqrt{25} = 5$.')
]),
l('Uttrykk, identiteter og funksjoner','Skille mellom et uttrykk, en likning, en identitet og en funksjon.',[
'Et algebraisk uttrykk beskriver en regneoperasjon, for eksempel $2x + 3$. En likning setter to uttrykk lik hverandre og ber oss finne verdier som gjør likheten sann. En identitet er en likhet som holder for alle verdier der begge sider er definert.',
'En funksjon tilordner hver verdi i definisjonsmengden nøyaktig én verdi. $f(x) = 2x + 3$ bestemmer en funksjon når vi også vet hvilke $x$-verdier som er tillatt. Den blir til en likning vi kan løse dersom vi for eksempel spør når $f(x) = 11$.'
],'$2(x + 3) = 2x + 6$','Klassifiser $3(x - 1) = 3x - 3$ og $3(x - 1) = 6$.',['Bruk den distributive loven på venstresiden.','Første likhet blir $3x - 3 = 3x - 3$ og er en identitet.','Den andre gir $x - 1 = 2$ og holder bare når $x = 3$.'],ref('MB','§ 8.1, § 9.1 og § 10.1',188),[
n('Grunnøving','Hva er verdien av $4x - 7$ når $x = -2$?',-15,'Sett inn $(-2)$ med parentes.','$4 \\cdot (-2) - 7 = -8 - 7 = -15$.'),
n('Anvendelse','For hvilken $x$-verdi har $2x + 3$ og $5x - 9$ samme verdi?',4,'Sett uttrykkene lik hverandre.','$2x + 3 = 5x - 9$ gir $3x = 12$ og $x = 4$. Begge uttrykk er $11$.'),
o('Fordypning','Er $\\frac{x^{2} - 4}{x - 2}= x + 2$ en identitet? Oppgi hvor likheten gjelder.','Faktoriser telleren og sjekk definisjonsmengden før du forkorter.','Telleren er $(x - 2)(x + 2)$. Likheten holder for alle reelle $x \\ne 2$. Ved $x = 2$ er venstresiden udefinert.')
]),
l('Kvadratsetningene og faktorisering','Utled kvadratsetningene og bruk dem begge veier.',[
'Når $(a + b)(a + b)$ ganges ut, får vi $a^{2},\\, ab,\\, ba$ og $b^{2}$. Kryssleddene er like og summeres til $2ab$. I $(a + b)(a - b)$ kansellerer kryssleddene.',
'Å faktorisere er å skrive et uttrykk som et produkt. Se først etter felles faktor. Deretter kan setningene gjenkjennes baklengs. To kvadrater med minus mellom gir konjugatsetningen.'
],'$\\begin{gathered}(a\\pm b)^2=a^2\\pm 2ab+b^2\\\\(a+b)(a-b)=a^2-b^2\\end{gathered}$','Faktoriser $3x^{2} - 48$.',['Trekk ut $3$. Da får du $3(x^{2} - 16)$.','$16 = 4^{2}$, så $x^{2} - 16 = (x - 4)(x + 4)$.','Uttrykket er $3(x - 4)(x + 4)$. Multipliser tilbake for å kontrollere.'],ref('TM','§ 2.1',22),[
n('Grunnøving','Hva er koeffisienten foran $x$ når $(x - 7)^{2}$ ganges ut?',-14,'Bruk kryssleddet $2 \\cdot x \\cdot (-7)$.','$(x - 7)^{2} = x^{2} - 14x + 49$.'),
n('Anvendelse','Hvilket tall må legges til $x^{2} - 10x$ slik at uttrykket blir et fullstendig kvadrat?',25,'Halver koeffisienten foran $x$ og kvadrer.','$(x - 5)^{2} = x^{2} - 10x + 25$.'),
o('Fordypning','Vis uten kalkulator hvorfor $103 \\cdot 97 = 9991$. Forklar hvordan metoden generaliseres.','Skriv begge tall med $100$ som utgangspunkt.','$(100 + 3)(100 - 3) = 100^{2} - 3^{2} = 9991$. Generelt gjelder $(a + b)(a - b) = a^{2} - b^{2}$.')
])
]),
k('likninger','Likninger og ulikheter','Fra balansering til likningssystem og fortegn','$2x - 3 > 7$','purple',[
l('Lineære likninger og formler','Løs likninger med parentes og brøk, og isoler en variabel i en formel.',[
'En likning har samme løsningsmengde etter en operasjon som kan reverseres på begge sider. Addisjon av samme uttrykk og multiplikasjon med en kjent, ikke-null faktor er eksempler.',
'Ved brøker kan du gange begge sider med en fellesnevner. Er det en ukjent i nevneren, må du først fastsette hvilke verdier som er lovlige. Ved formelomskriving behandler du størrelsene du ikke løser for, som kjente.'
],'$a \\cdot x + b = c \\implies x =\\frac{c - b}{a},\\, a \\ne 0$','Løs $\\frac{2x - 1}{3}= x - 2$.',['Multipliser begge sider med $3$. Da er $2x - 1 = 3x - 6$.','Trekk fra $2x$ og legg til $6$. Da er $x = 5$.','Ved innsetting gir begge sider $3$.'],ref('MB','§ 9.2–9.3',213),[
n('Grunnøving','Løs $4(x - 2) = 2x + 6$.',7,'Gang ut parentesen.','$4x - 8 = 2x + 6$ gir $2x = 14$ og $x = 7$.'),
n('Anvendelse','$A = \\frac{(a+b)h}{2}$. Finn $b$ når $A = 45,\\, a = 6$ og $h = 5$.',12,'Multipliser med $2$ og del på $h$.','$b =\\frac{2A}{h}- a =\\frac{90}{5}- 6 = 12$.'),
o('Fordypning','Løs $\\frac{x^{2} - 4}{x - 2}= 4$. Forklar hvorfor du må kontrollere det algebraiske svaret.','Hvilken $x$ er utelukket fra starten?','For $x \\ne 2$ kan likningen skrives $x + 2 = 4$. Kandidaten $x = 2$ er utelukket. Løsningsmengden er tom.')
]),
l('Likningssystemer','Løs systemer ved innsetting, eliminasjon og grafisk tolkning.',[
'En løsning i to ukjente må oppfylle begge likningene samtidig. Med innsetting uttrykker du én variabel gjennom den andre. Ved eliminasjon kombinerer du likningene slik at én variabel forsvinner.',
'Grafisk er en løsning et skjæringspunkt. To forskjellige parallelle linjer gir ingen løsning. Sammenfallende linjer gir uendelig mange løsninger.'
],'$\\begin{cases}x+y=8\\\\2x-y=7\\end{cases}$','Løs systemet $x + y = 8$ og $2x - y = 7$.',['Legg likningene sammen. $y$ forsvinner, så $3x = 15$.','Sett $x = 5$ inn i første likning. Da er $y = 3$.','Kontroller i andre likning. $2 \\cdot 5 - 3 = 7$.'],ref('MB','§ 9.6',229),[
n('Grunnøving','Finn $x$ når $x + y = 11$ og $x - y = 3$.',7,'Legg sammen likningene.','$2x = 14$, så $x = 7$. Da er $y = 4$.'),
n('Anvendelse','Fire kinobilletter fordelt på voksne til $140$ kr og barn til $80$ kr koster $440$ kr. Hvor mange voksenbilletter ble kjøpt?',2,'Sett opp én likning for antall og én for pris.','La $v$ være antall voksne. $140v + 80(4 - v) = 440$ gir $60v = 120$, så $v = 2$.'),
o('Fordypning','Bestem $k$ slik at systemet $y = 2x + 3$ og $4x - 2y = k$ har uendelig mange løsninger. Hva skjer for andre $k$?','Sett inn $y$ fra den første likningen i den andre.','$4x - 2(2x + 3) = -6$. For $k = -6$ er linjene sammenfallende. Ellers er de parallelle og forskjellige.')
]),
l('Ulikheter og fortegn','Løs lineære og rasjonale ulikheter ved å undersøke fortegn.',[
'Å legge til samme tall på begge sider bevarer rekkefølgen. Å multiplisere med et negativt tall speiler tallinja og snur ulikhetstegnet.',
'For et produkt eller en brøk finner du først kritiske verdier der en faktor er null. Mellom slike verdier holder hver lineær faktor fortegnet. En verdi som gir null i nevneren, kan aldri inngå i løsningen.'
],'$-2x > 6 \\iff x < -3$','Løs $\\frac{x - 4}{x + 1}\\le 0$.',['De kritiske verdiene er $-1$ og $4$. Ved $-1$ er brøken udefinert.','Til venstre for $-1$ er begge faktorer negative, mellom $-1$ og $4$ har de ulike fortegn, og til høyre for $4$ er begge positive.','Svaret er $-1 < x \\le 4$. Ved $x = 4$ er brøken null.'],ref('MB','§ 9.5',227),[
n('Grunnøving','Hva er øvre grense for $x$ i ulikheten $-3x + 2 \\ge 14$? Skriv tallet.',-4,'Isoler $-3x$ og del på $-3$.','$-3x \\ge 12$ gir $x \\le -4$.'),
o('Anvendelse','Løs $\\frac{x + 3}{x - 2}> 0$. Vis fortegn i hvert intervall.','Teller og nevner må ha samme fortegn.','Begge er negative for $x < -3$ og positive for $x > 2$. Mellom $-3$ og $2$ har de ulike fortegn. Svaret er $x < -3$ eller $x > 2$.'),
o('Fordypning','En elev ganger ulikheten $\\frac{1}{x}> 2$ med $x$ og får $x <\\frac{1}{2}$. Finn det korrekte svaret og forklar feilen.','Del i $x < 0$ og $x > 0$.','For $x < 0$ er $\\frac{1}{x}$ negativ og kan ikke være større enn $2$. For $x > 0$ kan vi gange med $x$ og får $0 < x <\\frac{1}{2}$. $x = 0$ er utelukket.')
])
]),
k('andregrad','Andregrad','Knytt sammen nullpunkter, faktorer og parabel','$ax^{2} + bx + c$','pink',[
l('Andregradslikninger','Velg mellom faktorisering, fullstendig kvadrat og abc-formelen.',[
'Nullproduktregelen sier at minst én faktor må være null når et produkt er null. Derfor er faktorisering en rask vei når heltallsfaktorer er synlige.',
'Ved å fullføre kvadratet får vi abc-formelen. Fortegnet til diskriminanten $D = b^{2} - 4ac$ avgjør om kvadratroten gir et positivt tall, null eller ingen reell verdi. Det svarer til to, én eller ingen reelle løsninger.'
],'$x =\\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a},\\, a \\ne 0$','Løs $2x^{2} - 5x - 3 = 0$.',['Diskriminanten er $(-5)^{2} - 4 \\cdot 2 \\cdot (-3) = 49$.','Formelen gir $x =\\frac{5 \\pm 7}{4}$.','Løsningene er $x = 3$ og $x = -\\frac{1}{2}$. Faktoriseringskontroll gir $(2x + 1)(x - 3)$.'],ref('TM','§ 2.2',27),[
n('Grunnøving','Finn den største løsningen av $x^{2} - 7x + 12 = 0$.',4,'Se etter to faktorer med sum $-7$ og produkt $12$.','$(x - 3)(x - 4) = 0$ gir $3$ og $4$.'),
n('Anvendelse','Finn diskriminanten til $3x^{2} + 2x - 4 = 0$.',52,'$D = b^{2} - 4ac$. Behold fortegnet til $c$.','$D = 2^{2} - 4 \\cdot 3 \\cdot (-4) = 52$.'),
o('Fordypning','Utled løsningene av $2x^{2} + 8x - 6 = 0$ ved å fullføre kvadratet.','Del på $2$ før du legger til kvadratleddet.','$x^{2} + 4x = 3$ gir $(x + 2)^{2} = 7$. Dermed $x = -2 \\pm \\sqrt{7}$. Innsetting i kvadratformen bekrefter begge.')
]),
l('Parabler og ekstremalpunkt','Les startverdi, nullpunkt, symmetri og ekstremalpunkt fra ulike former.',[
'Standardformen $ax^{2} + bx + c$ viser konstantleddet $c$. Faktorformen $a(x - r)(x - s)$ viser nullpunktene når reelle røtter finnes. Formen $a(x - h)^{2} + k$ viser ekstremalpunktet $(h,\\, k)$.',
'Parabelen åpner oppover for $a > 0$ og nedover for $a < 0$. Symmetrilinjen er $x = h = -\\frac{b}{2a}$. Når nullpunktene er reelle, ligger symmetrilinjen midt mellom dem.'
],'$f(x) = a(x - h)^{2} + k$','Finn ekstremalpunktet til $f(x) = -x^{2} + 6x - 5$.',['Trekk ut minus fra de to første leddene.','Skriv $x^{2} - 6x = (x - 3)^{2} - 9$.','Da blir $f(x) = -(x - 3)^{2} + 4$. Toppunktet er $(3,\\, 4)$.'],ref('TM','§ 2.1–2.2 og § 7.2',22),[
n('Grunnøving','For hvilken $x$-verdi har $f(x) = 2(x - 4)^{2} - 7$ bunnpunkt?',4,'Kvadratet er minst når det er null.','Ved $x = 4$ er kvadratet null og $f(4) = -7$.'),
n('Anvendelse','Finn den største verdien til $f(x) = -2x^{2} + 12x + 1$ over alle reelle $x$.',19,'Finn symmetrilinjen og sett verdien inn.','$x = -\\frac{12}{-4}= 3$. Den største verdien er $f(3) = 19$.'),
o('Fordypning','Lag funksjonsuttrykket til en parabel med nullpunkter $-2$ og $6$ som går gjennom $(0,\\, -24)$. Finn bunnpunktet.','Start med $a(x + 2)(x - 6)$.','$f(0) = -12a$, så $a = 2$. Symmetrilinjen er $x = 2$. $f(2) = 2 \\cdot 4 \\cdot (-4) = -32$, så bunnpunktet er $(2,\\, -32)$.')
]),
l('Andregradsulikheter','Bruk nullpunkter og parabelens retning til å løse ulikheter.',[
'Flytt alle ledd til én side. Finn eventuelle nullpunkter, og avgjør fortegn mellom og utenfor dem. For en oppovervendt parabel med to ulike nullpunkter er funksjonen negativ mellom røttene.',
'Ved en dobbeltrot treffer grafen $x$-aksen uten å skifte fortegn. Ulikhetstegn med likhet inkluderer nullpunktene, forutsatt at uttrykket er definert der.'
],'$(x - 1)(x - 5) < 0 \\iff 1 < x < 5$','Løs $-x^{2} + 2x + 8 \\ge 0$.',['Faktoriser som $-(x - 4)(x + 2)$.','Parabelen vender nedover, så den ligger over $x$-aksen mellom $-2$ og $4$.','Nullpunktene er med. Svaret er $-2 \\le x \\le 4$.'],ref('TM','§ 2.1–2.2',22),[
n('Grunnøving','Oppgi nedre grense for løsningen av $(x + 1)(x - 6) < 0$.',-1,'Nullpunktene er $-1$ og $6$.','Produktet er negativt mellom røttene, så $-1 < x < 6$.'),
o('Anvendelse','Løs $x^{2} - 8x + 16 \\ge 0$ og forklar hvilken rolle dobbeltroten spiller.','Skriv uttrykket som et kvadrat.','$(x - 4)^{2}$ er ikke-negativt for alle $x$. Det er lik null ved $x = 4$ og positivt ellers. Alle reelle $x$ er løsninger.'),
o('Fordypning','En ball har høyde $h(t) = -5t^{2} + 15t$ meter etter $t$ sekunder. Når er den minst $10$ meter over bakken? Avgrens til tiden ballen er i lufta.','Trekk $10$ fra høyden og faktoriser.','$h(t) - 10 = -5(t - 1)(t - 2)$. Uttrykket er ikke-negativt for $1 \\le t \\le 2$. Ballen er i lufta for $0 < t < 3$.')
])
]),
k('funksjoner','Funksjoner','Grafer, funksjonsfamilier og tolkning','$f(x) = a \\cdot b^{x}$','blue',[
l('Grafer og lineære modeller','Koble uttrykk, verditabell, graf og enheter.',[
'Definisjonsmengden angir hvilke $x$-verdier du kan bruke. Verdimengden består av funksjonsverdiene som faktisk oppnås. Et nullpunkt er en $x$-verdi med $f(x) = 0$. Et skjæringspunkt mellom to grafer løser $f(x) = g(x)$.',
'I en lineær modell $f(x) = ax + b$ er $b$ startverdien og $a$ endring i $y$ per enhet $x$. Stigningstallet kan finnes fra to punkter som $\\frac{\\Delta y}{\\Delta x}$. Vurder om modellen skal brukes på alle reelle $x$ eller for eksempel bare heltall.'
],'$a =\\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$','En beholder inneholder $17$ liter etter $2$ min og $29$ liter etter $5$ min. Finn en lineær modell.',['Stigningstallet er $\\frac{29 - 17}{5 - 2}= 4\\,\\mathrm{L/min}$.','$17 = 4 \\cdot 2 + b$ gir $b = 9 L$.','Modellen er $V(t) = 4t + 9$. Den treffer begge datapunktene.'],ref('MB','§ 10.1–10.3',238),[
n('Grunnøving','Finn stigningstallet til linja gjennom $(2,\\, 7)$ og $(6,\\, 19)$.',3,'Bruk endring i $y$ delt på endring i $x$.','$\\frac{19 - 7}{6 - 2}= 3$.'),
n('Anvendelse','To mobilabonnement koster $120 + 2x$ og $60 + 5x$ kroner per måned. For hvilken $x$ er de like dyre?',20,'Sett prisene lik hverandre.','$120 + 2x = 60 + 5x$ gir $x = 20$. Begge koster da $160$ kr.'),
o('Fordypning','En tank tappes etter $V(t) = 150 - 12t$, i liter. Oppgi en praktisk definisjonsmengde og verdimengde.','Når blir tanken tom?','Ved $t =\\frac{150}{12}= 12{,}5$ min er $V = 0$. Praktisk definisjonsmengde er $0 \\le t \\le 12{,}5$, verdimengden er $0 \\le V \\le 150$.')
]),
l('Polynom- og rasjonale funksjoner','Forklar grad, definisjonsmengde, hull og asymptoter.',[
'En polynomfunksjon består av potenser av $x$ med ikke-negative heltallseksponenter. Graden er den største eksponenten med ikke-null koeffisient. Polynomfunksjoner er definert for alle reelle $x$.',
'En rasjonal funksjon er en brøk av polynomer. Utelukk nevnerens nullpunkter før forkorting. Når telleren etter forkorting er ulik null der nevneren er null, får vi en vertikal asymptote. En kansellert faktor kan gi et hull. I formen $a +\\frac{b}{x - c},\\, b \\ne 0$, nærmer grafen seg $y = a$ for store $\\lvert x\\rvert$.'
],'$\\frac{2x + 1}{x - 3}= 2 +\\frac{7}{x - 3}$','Finn asymptotene til $f(x) =\\frac{2x + 1}{x - 3}$.',['Skriv telleren som $2(x - 3) + 7$.','Brøkleddet øker ubegrenset i absoluttverdi når $x$ nærmer seg $3$. Vertikal asymptote er $x = 3$.','For store $\\lvert x\\rvert$ nærmer brøkleddet seg $0$. Horisontal asymptote er $y = 2$.'],ref('TM','§ 7.3. Se også MB § 10.4 om polynomer',173),[
n('Grunnøving','Hvilken $x$-verdi er utelukket fra $f(x) =\\frac{x + 5}{2x - 8}$?',4,'Sett nevneren lik null.','$2x - 8 = 0$ gir $x = 4$.'),
n('Anvendelse','Hva er $y$-verdien til den horisontale asymptoten til $\\frac{5x - 1}{2x + 3}$?',2.5,'Del teller og nevner på $x$ og vurder store $\\lvert x\\rvert$.','Brøken blir $\\frac{5 -\\frac{1}{x}}{2 +\\frac{3}{x}}$, som nærmer seg $\\frac{5}{2}$.'),
o('Fordypning','Sammenlikn grafene til $f(x) =\\frac{x^{2} - 9}{x - 3}$ og $g(x) = x + 3$. Forklar hva som skjer ved $x = 3$.','Faktoriser telleren.','$f(x) = g(x)$ for $x \\ne 3$. Grafen til $f$ er linja med et hull i $(3,\\, 6)$, mens $g$ også har punktet $(3,\\, 6)$.')
]),
l('Eksponential- og potensfunksjoner','Kjenn igjen vekstfaktor og skill mellom $x$ som grunntall og eksponent.',[
'I eksponentialfunksjonen $f(x) = a \\cdot b^{x}$ står $x$ i eksponenten. For $a > 0$ og $b > 0$ betyr $b > 1$ vekst og $b < 1$ nedgang. Like store tillegg til $x$ gir samme forhold mellom funksjonsverdiene. $a = f(0)$.',
'I potensfunksjonen $g(x) = ax^{p}$ står $x$ som grunntall. Når positiv $x$ ganges med $k > 0$, ganges funksjonsverdien med $k^{p}$. Definisjonsmengden avhenger av eksponenten. Eksempelvis krever $x^{-1}$ at $x \\ne 0$, mens $\\sqrt{x}$ krever $x \\ge 0$.'
],'$\\frac{f(x+1)}{f(x)}=b\\qquad g(kx)=k^p g(x)$','En mengde på $800 g$ avtar med $15 \\%$ per døgn. Finn mengden etter tre døgn.',['Vekstfaktoren er $1 - 0{,}15 = 0{,}85$.','Modellen er $M(t) = 800 \\cdot 0{,}85^{t}$.','$M(3) = 491{,}3 g$. Kontroller med tre påfølgende reduksjoner på $15 \\%$.'],ref('MB','§ 10.4',254),[
n('Grunnøving','Hva er vekstfaktoren ved en økning på $8 \\%$ per periode?',1.08,'Legg $\\frac{8}{100}$ til $1$.','Vekstfaktoren er $1 + 0{,}08 = 1{,}08$.'),
n('Anvendelse','Når $x$ dobles, hvor mange ganger så stor blir funksjonsverdien til $f(x) = 3x^{3}$?',8,'Sett inn $2x$ og sammenlikn med $f(x)$.','$3(2x)^{3} = 8 \\cdot 3x^{3}$, altså $8$ ganger så stor for $x > 0$.'),
o('Fordypning','Verdiene ved $x = 1,\\, 2,\\, 3,\\, 4$ er $5,\\, 10,\\, 20$ og $40$. Velg mellom en potensmodell og en eksponentialmodell. Begrunn valget.','Hva skjer hver gang $x$ øker med $1$?','En eksponentialmodell er $f(x) = 2{,}5 \\cdot 2^{x}$, fordi forholdet er $2$ for hvert trinn. En potensmodell som dobles fra $x = 1$ til $2$, må ha $p = 1$. Den ville gitt $15$ ved $x = 3$.')
])
]),
k('polynomdivisjon','Polynomdivisjon','Del, faktoriser og bruk resten i funksjonsdrøfting','$P =$ DQ $+ R$','purple',[
l('Divisjonsalgoritmen','Utfør polynomdivisjon og kontroller kvotient og rest.',[
'Sorter potensene etter grad og sett inn eventuelle manglende ledd med koeffisient $0$. Del første ledd i resten på første ledd i divisoren. Gang tilbake og trekk fra hele produktet.',
'Hvert trinn fjerner det ledende leddet i resten. Stopp når restens grad er lavere enn divisorens. Kontroller ved å multiplisere divisor med kvotient og legge til resten.'
],'$P(x) = D(x) \\cdot Q(x) + R(x)$','Del $2x^{3} + x^{2} - 4x + 7$ på $x + 2$.',['$\\frac{2x^{3}}{x}= 2x^{2}$. Trekk fra $2x^{3} + 4x^{2}$. Rest så langt er $-3x^{2} - 4x + 7$.','Del $-3x^{2}$ på $x$. Trekk fra $-3x^{2} - 6x$. Rest så langt er $2x + 7$.','Neste ledd er $2$. Trekk fra $2x + 4$. Kvotienten er $2x^{2} - 3x + 2$ og resten er $3$.'],ref('TM','§ 2.3 og § 2.6',30),[
n('Grunnøving','Hva er konstantleddet i kvotienten når $x^{2} + 5x + 6$ deles på $x + 2$?',3,'Faktoriser telleren eller del første ledd først.','$x^{2} + 5x + 6 = (x + 2)(x + 3)$. Kvotienten er $x + 3$.'),
n('Anvendelse','Finn resten når $x^{3} - 2x + 5$ deles på $x - 2$.',9,'Bruk null som koeffisient foran $x^{2}$ eller sett inn $x = 2$ i divisjonsidentiteten.','Ved $x = 2$ forsvinner $(x - 2)Q(x)$. Da er resten $P(2) = 8 - 4 + 5 = 9$.'),
o('Fordypning','Del $x^{3} + 2x + 1$ på $x^{2} + 1$. Kontroller svaret ved tilbakeganging.','Etter første trinn får resten grad $1$.','Kvotienten er $x$ og resten er $x + 1$. Kontroll gir $x(x^{2} + 1) + x + 1 = x^{3} + 2x + 1$.')
]),
l('Rest, faktorer og nullpunkter','Bruk restsetningen til å faktorisere og løse polynomlikninger.',[
'Når divisoren er $x - r$, er resten et konstant tall. I $P(x) = (x - r)Q(x) + R$ gir $x = r$ at $P(r) = R$. Dermed er $x - r$ en faktor akkurat når $P(r) = 0$.',
'Når én rot er kjent i en tredjegradslikning, kan polynomdivisjon senke graden til to. Bruk nullproduktregelen på faktoriseringen og kontroller røttene i det opprinnelige polynomet.'
],'$P(r)=0 \\iff x-r\\ \\text{er en faktor i }P(x)$','Løs $x^{3} - 4x^{2} + x + 6 = 0$ når $x = 2$ er en rot.',['$P(2) = 8 - 16 + 2 + 6 = 0$. Del på $x - 2$.','Kvotienten er $x^{2} - 2x - 3 = (x - 3)(x + 1)$.','Røttene er $-1,\\, 2$ og $3$. Kontroll ved å multiplisere faktorene.'],ref('TM','§ 2.3 og § 2.6',30),[
n('Grunnøving','For hvilken $k$ er $x - 2$ en faktor i $P(x) = x^{3} + kx - 4$?',-2,'Sett $P(2) = 0$.','$8 + 2k - 4 = 0$ gir $k = -2$.'),
n('Anvendelse','Finn den største roten i $x^{3} - 7x + 6 = 0$. Én rot er $1$.',2,'Del på $x - 1$ og faktoriser kvotienten.','Kvotienten er $x^{2} + x - 6 = (x + 3)(x - 2)$. Røttene er $-3,\\, 1$ og $2$.'),
o('Fordypning','Løs $x^{3} - 7x + 6 \\ge 0$ ved å bruke røttene $-3,\\, 1$ og $2$. Begrunn fortegnene.','Bruk $(x + 3)(x - 1)(x - 2)$ og vurder ett punkt per intervall.','Fortegnene fra venstre er −, +, −, +. Med nullpunktene inkludert får vi $-3 \\le x \\le 1$ eller $x \\ge 2$.')
]),
l('Divisjon i funksjonsdrøfting','Omskriv rasjonale funksjoner og tolk restleddet grafisk.',[
'Polynomdivisjon gir $f(x) = Q(x) +\\frac{R(x)}{D(x)}$. Når nevnerens grad er større enn tellerens i restbrøken, nærmer restleddet seg $0$ for store $\\lvert x\\rvert$.',
'Er $Q$ lineær, følger grafen en skrå asymptote på lang avstand. Nær nevnerens nullpunkter må du vurdere om grafen går mot uendelig eller har et hull. Behold den opprinnelige definisjonsmengden.'
],'$\\frac{x^{2} + x + 4}{x - 1}= x + 2 +\\frac{6}{x - 1}$','Finn asymptotene til $f(x) =\\frac{x^{2} + x + 4}{x - 1}$.',['Del og få $Q(x) = x + 2$ og $R = 6$.','Restleddet går mot $0$ for store $\\lvert x\\rvert$. Skrå asymptote er $y = x + 2$.','Restleddet vokser uten grense i absoluttverdi nær $x = 1$. Vertikal asymptote er $x = 1$.'],ref('TM','§ 2.3 og § 7.3',173),[
n('Grunnøving','Finn konstantleddet i den skrå asymptoten til $\\frac{x^{2} + 3x + 1}{x + 1}$.',2,'Del på $x + 1$.','Telleren er $(x + 1)(x + 2) - 1$. Asymptoten er $y = x + 2$.'),
o('Anvendelse','Finn skjæringspunktet mellom $f(x) =\\frac{x^{2} - 3}{x - 2}$ og linja $y = x + 3$.','Del først og sammenlikn uttrykkene.','$f(x) = x + 2 +\\frac{1}{x - 2},\\, x \\ne 2$. Likheten gir $\\frac{1}{x - 2}= 1$ og $x = 3$. Punktet er $(3,\\, 6)$.'),
o('Fordypning','Forklar om grafen til $\\frac{x^{2} - 4}{x - 2}$ kan ha $y = x + 2$ som asymptote etter en formell grenseverdidefinisjon, og beskriv grafen konkret.','Undersøk forskjellen $f(x) - (x + 2)$.','Forskjellen er identisk null for $x \\ne 2$ og har dermed grenseverdi $0$ for store $\\lvert x\\rvert$. Konkret er grafen selve linja med hull i $(2,\\, 4)$.')
])
]),
k('derivasjon','Vekstfart og derivasjon','Fra sekant til tangent og funksjonsdrøfting','$f\'(x)$','pink',[
l('Gjennomsnittlig og momentan vekstfart','Tolk sekant, tangent og endringsrate med enhet.',[
'Gjennomsnittlig vekstfart over $[a,\\, b]$ er endring i funksjonsverdi delt på endring i $x$. Den er stigningstallet til linja gjennom grafpunktene ved $a$ og $b$, kalt en sekant.',
'Flytt $b$ mot $a$. Hvis stigningstallet får en endelig grenseverdi fra begge sider, er denne den deriverte $f\'(a)$. Grafisk er det stigningstallet til tangenten, og enheten er funksjonsenhet per $x$-enhet.'
],'$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$','Finn momentan vekstfart for $s(t) = t^{2}$ ved $t = 3$.',['Endringen fra $3$ til $3 + h$ er $(3 + h)^{2} - 9 = 6h + h^{2}$.','Del på $h \\ne 0$. Gjennomsnittlig vekstfart er $6 + h$.','Når $h$ går mot $0$, går $6 + h$ mot $6$. Er $s$ i meter og $t$ i sekunder, er svaret $6\\,\\mathrm{m/s}$.'],ref('TM','§ 6.1',132),[
n('Grunnøving','Finn gjennomsnittlig vekstfart for $f(x) = x^{2}$ fra $x = 1$ til $x = 5$.',6,'Del endringen i $y$ på lengden til intervallet.','$\\frac{25 - 1}{5 - 1}= 6$.'),
n('Anvendelse','Finn momentan vekstfart ved $x = 4$ for $f(x) = x^{2} + 3x$.',11,'Differansekvotienten for $x^{2}$ nær $x = 4$ nærmer seg $8$.','Differansekvotienten er $8 + h + 3$. Den går mot $11$.'),
o('Fordypning','Undersøk om $f(x) = \\lvert x\\rvert$ er deriverbar ved $x = 0$.', 'Sammenlikn differansekvotienten for positiv og negativ $h$.','For $h > 0$ er $\\frac{\\lvert h\\rvert }{h}= 1$, mens for $h < 0$ er den $-1$. Ensidige grenseverdier er ulike, så $f\'(0)$ finnes ikke.')
]),
l('Derivasjonsregler og tangenter','Deriver polynomer og bestem likningen til en tangent.',[
'Konstanter har derivert $0$. For en positiv heltallseksponent $n$ får vi $(x^{n})\' = nx^{n-1}$. Regelen kan utledes ved å gange ut $(x + h)^{n}$. Når differansen deles på $h$, er det bare leddet med én faktor $h$ som overlever i grensen.',
'Du kan derivere hvert ledd i et polynom for seg. En tangent ved $x = a$ trenger både stigningstallet $f\'(a)$ og grafpunktet $(a,\\, f(a))$.'
],'$y = f(a) + f\'(a)(x - a)$','Finn likningen til tangenten til $f(x) = x^{3} - 2x$ ved $x = 2$.',['Deriver. $f\'(x) = 3x^{2} - 2$.','Ved $x = 2$ er $f\'(2) = 10$ og $f(2) = 4$.','Tangenten er $y = 4 + 10(x - 2) = 10x - 16$.'],ref('TM','§ 6.1–6.2',135),[
n('Grunnøving','Finn $f\'(3)$ når $f(x) = 2x^{2} - 5x + 8$.',7,'Deriver leddvis.','$f\'(x) = 4x - 5$, så $f\'(3) = 7$.'),
n('Anvendelse','Finn konstantleddet til tangenten til $f(x) = x^{2} + 1$ ved $x = 3$.',-8,'Finn punkt og stigningstall før du løser for konstantleddet.','$f(3) = 10$ og $f\'(3) = 6$. $y = 10 + 6(x - 3) = 6x - 8$.'),
o('Fordypning','Finn punktene hvor grafen til $f(x) = x^{3} - 3x$ har tangent parallell med $y = 9x - 2$.','Tangenter som er parallelle, har samme stigningstall.','$3x^{2} - 3 = 9$ gir $x = \\pm 2$. $f(-2) = -2$ og $f(2) = 2$, så punktene er $(-2,\\, -2)$ og $(2,\\, 2)$.')
]),
l('Funksjonsdrøfting og optimering','Bruk fortegn av den deriverte og undersøk endepunkter.',[
'Når $f\'$ er positiv på et intervall, er $f$ voksende der. Når $f\'$ er negativ, er $f$ avtakende. Fortegnsskifte fra pluss til minus gir et lokalt toppunkt og fra minus til pluss et lokalt bunnpunkt.',
'Likningen $f\'(x) = 0$ gir kandidater. På et lukket intervall må du også undersøke endepunktene og eventuelle indre punkter der $f$ ikke er deriverbar.'
],'$f\'(x)>0:\\ \\text{voksende}\\quad f\'(x)<0:\\ \\text{avtakende}$','Finn største verdi av $f(x) = x^{3} - 3x$ for $-2 \\le x \\le 3$.',['$f\'(x) = 3x^{2} - 3$ er null ved $-1$ og $1$.','Regn ut $f(-2) = -2,\\, f(-1) = 2,\\, f(1) = -2$ og $f(3) = 18$.','Største verdi er $18$ ved $x = 3$. Den kommer i et endepunkt.'],ref('TM','§ 7.1–7.2',164),[
n('Grunnøving','Finn $x$-verdien til toppunktet for $f(x) = -x^{2} + 8x + 1$.',4,'Løs $f\'(x) = 0$ og sjekk fortegnsskiftet.','$f\'(x) = -2x + 8$ er positiv til venstre for $4$ og negativ til høyre.'),
n('Anvendelse','Finn størst mulig areal i $m^{2}$ for et rektangel med omkrets $24 m$.',36,'Bruk sidelengdene $x$ og $12 - x$.','$A(x) = 12x - x^{2}$. $A\'(x) = 12 - 2x$ gir maksimum ved $x = 6$, og $A(6) = 36 m^{2}$.'),
o('Fordypning','Undersøk om $x = 0$ er et ekstremalpunkt til $f(x) = x^{3}$. Bruk $f\'$.','Undersøk fortegn på begge sider.','$f\'(x) = 3x^{2}$ er positiv på begge sider av $0$. Funksjonen vokser gjennom punktet, så det er ikke et ekstremalpunkt.')
])
]),
k('trigonometri','Trigonometri','Lengder, vinkler og areal i trekanter','$\\sin^{2} v + \\cos^{2} v = 1$','purple',[
l('Sinus, cosinus og tangens','Bruk sideforhold i rettvinklede trekanter og enhetssirkelen.',[
'I en rettvinklet trekant med spiss vinkel $v$ er $\\sin v$ motstående katet delt på hypotenusen. $\\cos v$ bruker hosliggende katet, mens $\\tan v$ bruker forholdet mellom motstående og hosliggende katet. Formlikhet gjør forholdene uavhengige av størrelsen.',
'På enhetssirkelen er punktet ved vinkelen $v$ lik $(\\cos v,\\, \\sin v)$. Dermed gjelder definisjonene også for stumpe vinkler. Da kan cosinus bli negativ. Bruk gradmodus i regneverktøy når vinkler er gitt i grader.'
],'$\\begin{gathered}\\tan v=\\frac{\\sin v}{\\cos v}\\\\\\sin^2 v+\\cos^2 v=1\\end{gathered}$','En stige på $5 m$ står i $68^{\\circ}$ mot bakken. Hvor høyt rekker den?',['Stigen er hypotenusen og høyden $h$ ligger mot $68^{\\circ}$.','$\\sin 68^{\\circ} =\\frac{h}{5}$ gir $h = 5 \\cdot \\sin 68^{\\circ} \\approx 4{,}64 m$.','Høyden er kortere enn stigen, slik vi forventer.'],ref('TM','§ 3.1',56),[
n('Grunnøving','Motstående katet er $6$ og hypotenusen er $10$. Hva er sinus til vinkelen?',0.6,'Bruk motstående delt på hypotenusen.','$\\sin v =\\frac{6}{10}= 0{,}6$.'),
n('Anvendelse','Fra et punkt $30 m$ fra foten av et tårn er vinkelen opp til toppen $40^{\\circ}$. Finn høyden fra øyehøyde i meter. Rund av til én desimal.',25.2,'Tegn en rettvinklet trekant. $30 m$ er hosliggende katet.','$h = 30 \\tan 40^{\\circ} \\approx 25{,}173 m$, som blir $25{,}2 m$.',1),
o('Fordypning','Forklar ved hjelp av enhetssirkelen hvorfor $\\sin 120^{\\circ} = \\sin 60^{\\circ}$, mens $\\cos 120^{\\circ} = -\\cos 60^{\\circ}$.','Sammenlikn punktene ved speiling om $y$-aksen.','Punktene har samme $y$-koordinat og motsatte $x$-koordinater. Sinus er $y$-koordinaten, cosinus er $x$-koordinaten.')
]),
l('Sinus-, cosinus- og arealsetningen','Velg trekantsetning og begrunn hver av dem.',[
'Arealsetningen følger av $A =\\frac{bh}{2}$ og høyden $h = c \\sin A$ når $A$ er vinkelen mellom sidene $b$ og $c$. Ved en stump vinkel brukes høyden utenfor trekanten og $\\sin (180^{\\circ} - A) = \\sin A$.',
'Ved å skrive trekantens areal som $\\frac{bc \\sin A}{2}$ og $\\frac{ac \\sin B}{2}$ og dele på $\\frac{abc}{2}$, får vi $\\frac{\\sin A}{a}=\\frac{\\sin B}{b}$. Tilsvarende gjelder for $C$. For cosinussetningen legg $A$ i $(0,\\, 0),\\, B$ i $(c,\\, 0)$ og $C$ i $(b \\cos A,\\, b \\sin A)$. Avstandsformelen og $\\sin^{2} A + \\cos^{2} A = 1$ gir formelen.'
],'$\\begin{gathered}a^2=b^2+c^2-2bc\\cos A\\\\ \\text{Areal}=\\frac12 bc\\sin A\\end{gathered}$','Sett $b = 7,\\, c = 8$ og $A = 60^{\\circ}$. Finn $a$ og arealet.',['$a^{2} = 49 + 64 - 2 \\cdot 7 \\cdot 8 \\cdot 0{,}5 = 57$.','Altså $a = \\sqrt{57} \\approx 7{,}55$.','Arealet er $\\tfrac{1}{2} \\cdot 7 \\cdot 8 \\cdot \\sin 60^{\\circ} = 14\\sqrt{3} \\approx 24{,}25$.'],ref('TM','§ 3.3–3.4',60),[
n('Grunnøving','To sider har lengde $8$ og $5$. Vinkelen mellom dem er $30^{\\circ}$. Finn arealet.',10,'Bruk arealsetningen med den mellomliggende vinkelen.','$\\tfrac{1}{2} \\cdot 8 \\cdot 5 \\cdot \\sin 30^{\\circ} = 10$.'),
n('Anvendelse','Finn $a^{2}$ når $b = 4,\\, c = 6$ og $A = 120^{\\circ}$.',76,'Bruk cosinussetningen og $\\cos 120^{\\circ} = -0{,}5$.','$a^{2} = 16 + 36 - 48 \\cdot (-0{,}5) = 76$.'),
o('Fordypning','Utled sinussetningen fra arealformelen og forklar hvorfor den gjelder også for stumpe trekanter.','Skriv samme areal med tre ulike kombinasjoner av sider og vinkler.','Dobbelarealet er $bc \\sin A = ac \\sin B = ab \\sin C$. Del på $abc$ for å få $\\frac{\\sin A}{a}=\\frac{\\sin B}{b}=\\frac{\\sin C}{c}$. Høyden er uendret om den stumpe vinkelen erstattes med supplementvinkelen ved høydeberegningen.')
]),
l('Sammensatte trekantproblemer','Tegn en skisse, velg informasjon og kontroller tvetydige svar.',[
'Start med å merke vinkler og motstående sider. To sider og vinkelen mellom dem peker mot cosinussetningen. Et kjent motstående par peker mot sinussetningen. En høyde eller diagonalen i en figur kan dele opp et problem i trekanter.',
'En kjent sinusverdi kan gi både en spiss og en stump vinkel. Test begge mot vinkelsummen og øvrige opplysninger. Med tre kjente sider kan cosinussetningen bestemme hver vinkel entydig.'
],'$\\sin v = \\sin (180^{\\circ} - v)$','I trekant $ABC$ har $a = 6,\\, b = 10$ og $A = 30^{\\circ}$. Hvor mange trekanter er mulige?',['Sinussetningen gir $\\sin B = 10 \\cdot \\frac{\\sin 30^{\\circ}}{6}=\\frac{5}{6}$.','$B \\approx 56{,}4^{\\circ}$ eller $B \\approx 123{,}6^{\\circ}$. Begge gir $A + B < 180^{\\circ}$.','Begge vinklene er mulige. $C$ er henholdsvis ca. $93{,}6^{\\circ}$ og $26{,}4^{\\circ}$.'],ref('TM','§ 3.3 og oppgavene i kapittel 3',60),[
n('Grunnøving','Hvor mange mulige vinkler $B$ har trekanten når $A = 40^{\\circ},\\, a = 8$ og $b = 8$?',1,'Test både $40^{\\circ}$ og $140^{\\circ}$ mot vinkelsummen.','$\\sin B = \\sin 40^{\\circ}$. $B = 140^{\\circ}$ gir $C = 0^{\\circ}$ og er utelukket. Bare $B = 40^{\\circ}$ er mulig.'),
n('Anvendelse','To stier på $60 m$ og $80 m$ går fra samme punkt med $60^{\\circ}$ mellom seg. Finn avstanden mellom endepunktene i meter. Rund av til én desimal.',72.1,'Endepunktene danner en trekant med startpunktet.','$d^{2} = 60^{2} + 80^{2} - 2 \\cdot 60 \\cdot 80 \\cdot \\cos 60^{\\circ} = 5200$. $d \\approx 72{,}1 m$.',1),
o('Fordypning','Et parallellogram har sider $7$ og $10$ og en diagonal på $13$. Finn arealet.','En diagonal deler figuren i to trekanter. Bruk cosinussetningen og deretter arealsetningen.','Vinkelen $v$ mellom sidene i deltrekanten har $\\cos v =\\frac{49 + 100 - 169}{140}= -\\frac{1}{7}$. $\\sin v =\\frac{\\sqrt{48}}{7}$. Hele arealet er $7 \\cdot 10 \\cdot \\frac{\\sqrt{48}}{7}= 40\\sqrt{3} \\approx 69{,}3$.')
])
]),
k('modellering','Modellering og programmering','Sammenlikn modeller og bygg algoritmer','$\\text{mål}-\\text{modell}$','blue',[
l('Fra tekst til matematisk modell','Velg variabler, sett opp formel og vurder gyldighetsområdet.',[
'Definer størrelser med enheter og si hva $x$ og $y$ betyr. Bruk mekanismen i situasjonen til å velge modell. Fast tillegg gir lineær vekst. Fast prosentvis endring gir eksponentialvekst. Et areal kan gi produktet av to uttrykk.',
'En modell bygger på antakelser. Undersøk definisjonsmengde, sammenlikn med data og vurder hva som skjer når modellen brukes utenfor området du kjenner. Et svar med riktig enhet kan fortsatt være urimelig.'
],'$\\text{Modellvalg} \\to \\text{beregning} \\to \\text{kontroll}$','En artikkel sier at et abonnement koster $99$ kr per måned pluss $4$ kr per GB. Det tilbys også et abonnement til $179$ kr per måned med ubegrenset data. Når er fastpris billigst?',['Sett $x$ lik antall GB i måneden. Prisene er $99 + 4x$ og $179$.','Fastpris er billigst når $179 < 99 + 4x$, altså $x > 20$.','Ved $20$ GB er prisene like. Sjekk om leverandøren avrunder forbruket eller har andre vilkår.'],ref('AM','§ 6.1',142),[
n('Grunnøving','En modell for drosjepris er $95 + 18x$ kroner. Hvor mye koster $7$ km?',221,'Sett $x = 7$ i modellen.','$95 + 18 \\cdot 7 = 221$ kr.'),
n('Anvendelse','En klubb øker fra $250$ til $300$ medlemmer på ett år. Hvor mange prosent øker medlemstallet?',20,'Sammenlikn økningen med startverdien.','$\\frac{300 - 250}{250}= 0{,}20 = 20 \\%$.'),
o('Fordypning','En artikkel sier at klubben vil vokse fra $300$ til $600$ medlemmer på fire år hvis $20 \\%$ årlig vekst fortsetter. Kontroller påstanden og vurder modellen.','Sammenlikn $300 \\cdot 1{,}20^{4}$ med $600$.','Modellen gir $622{,}08$, så $600$ passeres etter fire hele år hvis antakelsen holder. Resultatet er en prognose. Kapasitet og medlemsgrunnlag kan endre veksten.')
]),
l('Data, modellvalg og residualer','Sammenlikn modeller ved hjelp av residualer og vurder ekstrapolasjon.',[
'Et residual er observert verdi minus modellverdi ved samme $x$. Positivt residual betyr at modellen ligger under observasjonen. Et systematisk mønster i residualene kan tyde på at funksjonstypen bør endres.',
'For likt fordelte $x$-verdier kan konstante differanser peke mot en lineær modell. Konstante forhold kan peke mot en eksponentialmodell. Sammenlikn modeller på samme datasett og vurder både feil og hva modellen antar.'
],'$r = \\text{observert verdi} - \\text{modellverdi}$','For $t = 0,\\, 1,\\, 2,\\, 3$ er målingene $100,\\, 120,\\, 145$ og $173$. Sammenlikn $L(t) = 100 + 24t$ med $E(t) = 100 \\cdot 1{,}2^{t}$.',['$L$ gir $100,\\, 124,\\, 148$ og $172$. Residualene er $0,\\, -4,\\, -3$ og $1$.','$E$ gir $100,\\, 120,\\, 144$ og $172{,}8$. Residualene er $0,\\, 0,\\, 1$ og $0{,}2$.','$E$ treffer disse målingene bedre. Vurder om prosentveksten kan fortsette utenfor tidsintervallet.'],ref('AM','§ 6.2 om regresjon',148),[
n('Grunnøving','Observasjonen er $28{,}2$ og modellverdien $27{,}5$. Hva er residualet?',0.7,'Trekk modellverdien fra observasjonen.','$28{,}2 - 27{,}5 = 0{,}7$.'),
n('Anvendelse','En eksponentialmodell har observasjonene $80$ og $100$ ved $x = 0$ og $x = 1$. Finn modellverdien ved $x = 3$. Rund av til én desimal.',156.3,'Vekstfaktoren er $\\frac{f(1)}{f(0)}$.','$80 \\cdot 1{,}25^{3} = 156{,}25$, som avrundes til $156{,}3$.',1),
o('Fordypning','Lag to modeller for $80$ ved $t = 0$ og $100$ ved $t = 1$. Sammenlikn ved $t = 10$. Hva kan du konkludere med bare disse to datapunktene?','Bruk henholdsvis fast tillegg og fast faktor.','$L(10) = 80 + 20 \\cdot 10 = 280$. $E(10) = 80 \\cdot 1{,}25^{10} \\approx 745{,}1$. Begge treffer de oppgitte punktene. Datagrunnlaget alene avgjør ikke modellvalget.')
]),
l('Programmering og numerisk problemløsing','Bruk løkker og intervallhalvering med tydelige stoppvilkår.',[
'En algoritme kan undersøke kandidater i rekkefølge. Hvis du skal finne første hele år en grense passeres, oppdater verdien én gang per år og stopp så snart vilkåret er oppfylt. Kontroller også året før.',
'Intervallhalvering finner en rot i en kontinuerlig funksjon når endepunktene har motsatt fortegn. Del intervallet i to og behold delen med fortegnsskifte, med mindre midtpunktet allerede er en rot. Gjenta til intervallet er kort nok.'
],'$m =\\frac{a + b}{2}$','Finn første hele år $1000 \\cdot 1{,}08^{t}$ er minst $1500$.',['Start med år $= 0$ og verdi $= 1000$.','Så lenge verdi $< 1500$, gang med $1{,}08$ og øk år med $1$.','Etter $5$ år er verdien ca. $1469{,}33$ og etter $6$ år ca. $1586{,}87$. Svaret er $6$ år.'],ref('AM','§ 7.1.6 om løkker',178),[
n('Grunnøving','Hva er første midtpunkt i intervallet $[2,\\, 5]$ ved intervallhalvering?',3.5,'Ta gjennomsnittet av endepunktene.','$\\frac{2 + 5}{2}= 3{,}5$.'),
o('Anvendelse','Gjør to halveringer for $f(x) = x^{2} - 5$, med startintervall $[2,\\, 3]$. Oppgi det nye intervallet.','Evaluer $f$ ved $2{,}5$ og ved neste midtpunkt.','$f(2) < 0$ og $f(2{,}5) > 0$ gir $[2;\\, 2{,}5]$. Deretter er $f(2{,}25) = 0{,}0625 > 0$, så intervallet blir $[2;\\, 2{,}25]$.'),
o('Fordypning','Skriv et program som finner første hele år $8000$ kr passerer $10\\,000$ kr ved $3 \\%$ årlig rente. Vis året før og vurder når løkka kan bli uendelig.', 'Bruk en while-løkke med verdi $\\le 10\\,000$ som vilkår.','Start år $= 0$ og beløp $= 8000$. Så lenge beløpet er $\\le 10\\,000$, øk år med $1$ og gang beløpet med $1{,}03$. $8000 \\cdot 1{,}03^{7} \\approx 9839{,}0$ og $8000 \\cdot 1{,}03^{8} \\approx 10\\,134{,}2$, så første hele år er $8$. Med vekstfaktor $\\le 1$ når beløpet aldri grensen.','programmering')
])
])
];

export const books = [
{tittel:'Matematikkens byggesteiner',id:'MB',url:MB,oppgaver:'https://openmath.online/books/pdf/losf_mb.pdf'},
{tittel:'Teoretisk matematikk 1',id:'TM',url:TM,oppgaver:'https://openmath.online/books/pdf/losf_tm1.pdf'},
{tittel:'Anvendt matematikk',id:'AM',url:AM,oppgaver:'https://openmath.online/books/pdf/losf_am.pdf'}
];

const adapted = (oppgave, kilde) => ({...oppgave, kilde});
kapitler[0].leksjoner[2].oppgaver.push(adapted(o('Anvendelse','Skriv $9x^{2} + 30x + 25$ som kvadratet av et førstegradsuttrykk. Kontroller ved å gange ut.','Finn kvadratrøttene av første og siste ledd.','$9x^{2} + 30x + 25 = (3x + 5)^{2}$, fordi kryssleddet er $2 \\cdot 3x \\cdot 5 = 30x$.'),ref('TM','oppgave 2.1.2, med nye tall',42)));
kapitler[4].leksjoner[1].oppgaver.push(adapted(o('Fordypning','Vis at når $P(x)$ deles på $x - a$, kan resten avgjøres uten å kjenne kvotienten. Bruk resultatet på $P(x) = 3x^{3} - x + 4$ og $a = -1$.','Sett $x = a$ inn i $P(x) = (x - a)Q(x) + R$.','$P(a) = R$, siden produktleddet blir null. $P(-1) = -3 + 1 + 4 = 2$.'),ref('TM','§ 2.6, med nytt eksempel',41)));
kapitler[5].leksjoner[0].oppgaver.push(adapted(o('Anvendelse','Bruk differansekvotienten til å finne $f\'(-2)$ for $f(x) = x^{2}$. Kontroller med en derivasjonsregel.','Regn ut $(-2 + h)^{2} - (-2)^{2}$ før du deler på $h$.','Kvotienten er $\\frac{-4h + h^{2}}{h}= -4 + h$ for $h \\ne 0$. Grensen er $-4$. Regelen $f\'(x) = 2x$ gir også $-4$.'),ref('TM','§ 6.1, eksempel 1 med ny x-verdi',133)));
kapitler[6].leksjoner[1].oppgaver.push(adapted(o('Fordypning','I $ABC$ er $A = 120^{\\circ},\\, B = 30^{\\circ}$ og $a = 6$. Finn $b$ eksakt og kontroller med et overslag.','Bruk $\\sin 30^{\\circ} =\\frac{1}{2}$ og $\\sin 120^{\\circ} =\\frac{\\sqrt{3}}{2}$.','$b = 6\\frac{\\sin 30^{\\circ}}{\\sin 120^{\\circ}}= 2\\sqrt{3} \\approx 3{,}46$. Den ligger mot en mindre vinkel enn $a$, så $b < a$.'),ref('TM','§ 3.3, eksempel med nye data',61)));

const fig = new Intl.NumberFormat('nb-NO',{maximumFractionDigits:2});
const rand = (a,b) => a + Math.floor(Math.random()*(b-a+1));
export const generatorer = [
() => {
  const a=rand(2,5), b=rand(2,4), c=rand(1,b-1);
  return n('Grunnøving',String.raw`Regn ut $\frac{${a}^${b}}{${a}^${c}}$.`,a**(b-c),
    'Trekk eksponentene fra hverandre.',`Resultatet er $${a}^${b-c} = ${a**(b-c)}$.`);
},
() => {
  const a=rand(2,9), b=rand(1,12), x=rand(1,12);
  return n('Grunnøving',`Løs $${a}x - ${b} = ${a*x-b}$.`,x,
    `Legg til $${b}$ på begge sider.`,`Da får du $${a}x = ${a*x}$. Del på $${a}$ og få $x = ${x}$.`);
},
() => {
  const a=rand(1,7), b=rand(a+1,a+7);
  return n('Grunnøving',`Finn den største roten til $x^2 - ${a+b}x + ${a*b} = 0$.`,b,
    'Bruk sum og produkt til å faktorisere.',`$(x - ${a})(x - ${b}) = 0$. Den største roten er $${b}$.`);
},
() => {
  const a=rand(1,8), b=rand(1,12), x=rand(2,12);
  return n('Grunnøving',`Finn $f(${x})$ når $f(x) = ${a}x + ${b}$.`,a*x+b,
    'Sett inn $x$ og gang før du legger sammen.',String.raw`$f(${x}) = ${a} \cdot ${x} + ${b} = ${a*x+b}$.`);
},
() => {
  const r=rand(1,7), a=rand(2,5), b=rand(1,12);
  return n('Anvendelse',`Finn resten når $${a}x^2 + ${b}$ deles på $x - ${r}$.`,a*r*r+b,
    `Sett $x = ${r}$ for å få divisoren lik null.`,String.raw`Resten er $P(${r}) = ${a} \cdot ${r}^2 + ${b} = ${a*r*r+b}$.`);
},
() => {
  const a=rand(1,5), b=rand(1,9), x=rand(1,8);
  return n('Grunnøving',`Finn $f'(${x})$ når $f(x) = ${a}x^2 - ${b}x + 2$.`,2*a*x-b,
    'Deriver hvert ledd for seg.',`$f'(x) = ${2*a}x - ${b}$. Da er $f'(${x}) = ${2*a*x-b}$.`);
},
() => {
  const a=rand(4,18), b=rand(4,18);
  return n('Grunnøving',String.raw`To sider i en trekant er $${a}$ og $${b}$. Vinkelen mellom dem er $30^{\circ}$. Finn arealet.`,a*b/4,
    'Bruk $\\tfrac12 ab\\sin 30^{\\circ}$.',String.raw`Siden $\sin 30^{\circ} = \frac12$, er arealet $\frac{${a} \cdot ${b}}{4} = ${texNumber(fig.format(a*b/4))}$.`);
},
() => {
  const p=rand(2,19), start=100*rand(2,15);
  return n('Anvendelse',String.raw`En mengde på $${start}$ øker med $${p}\,\%$. Hva er den nye mengden?`,start+start*p/100,
    'Gang med $1 + \\frac{p}{100}$ når $p$ er den prosentvise økningen.',
    `Vekstfaktoren er $${texNumber(fig.format(1+p/100))}$, så den nye mengden er $${start+start*p/100}$.`);
}
];

export const mål = [
['Algoritmer, problemløsing og programmering','modellering'],
['Bevis og begrunnelser','algebra','polynomdivisjon','trigonometri'],
['Variabler, formler og digitale verktøy','likninger','funksjoner','modellering'],
['Strategier for likninger, systemer og ulikheter','likninger','andregrad','polynomdivisjon'],
['Uttrykk, identitet, likning og funksjon','algebra'],
['Sammenhengene i andregrad','andregrad','algebra'],
['Modellvalg, presentasjon og gyldighet','modellering','funksjoner'],
['Matematikk i tekster, beregning og analyse','modellering'],
['Polynom-, rasjonale, eksponential- og potensfunksjoner','funksjoner','polynomdivisjon'],
['Gjennomsnittlig og momentan vekstfart','derivasjon'],
['Polynomdivisjon i algebra og funksjonsdrøfting','polynomdivisjon'],
['Trigonometriske definisjoner, lengder, vinkler og arealer','trigonometri'],
['Begrunnelse for trekantsetningene','trigonometri'],
['Sammensatte problemer med trigonometri','trigonometri']
];
