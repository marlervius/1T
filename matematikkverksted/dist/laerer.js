import { escapeHtml as e, mathHtml as m } from './matematikk.js';
import { kapitler } from './innhold.js';

const planUrl = 'https://www.udir.no/lk20/mat09-02/';
const veier = ['Ekstra støtte', 'Ordinær vei', 'Ekstra utfordring'];
const leksjoner = new Map(kapitler.flatMap(k => k.leksjoner.map((l, i) => [k.id + '/' + (i+1), l.tittel])));
const kilde = (url, tekst) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${e(tekst)}</a>`;
const r = String.raw;

// Local short descriptions follow the order in MAT09-02, competence aims for 1T.
const plan = [
  ['Utvikle algoritmer og bruke digitale strategier til å løse problemer', ['modellering/3'], 'kodesok', 'Foreslå en algoritme, kjør den og kontroller stoppvilkåret.'],
  ['Tolke, undersøke og bygge opp matematiske bevis', ['algebra/3','trigonometri/2'], 'rektangler', 'Forklar hvorfor en påstand holder for alle tillatte verdier.'],
  ['Velge variable, lage formler og undersøke dem digitalt', ['funksjoner/1','modellering/1'], 'hall', 'Lag to prisfunksjoner og sammenlikn dem i et regneark.'],
  ['Sammenlikne og begrunne strategier for likninger, systemer og ulikheter', ['likninger/1','likninger/2','likninger/3'], 'hall', 'Finn skjæringen grafisk og algebraisk og tolk ulikheten.'],
  ['Skille mellom uttrykk, likning, identitet og funksjon', ['algebra/2'], 'rektangler', 'Bruk samme eksempel til å forklare fire ulike begreper.'],
  ['Knytte sammen kvadratsetninger, parabler, likninger og ulikheter', ['algebra/3','andregrad/1','andregrad/2','andregrad/3'], 'rektangler', 'Finn største areal og alle bredder som gir minst et oppgitt areal.'],
  ['Bygge modeller, presentere resultater og drøfte gyldighet', ['modellering/1','modellering/2'], 'sykkel', 'Test to prognoser mot en ny observasjon og begrunn en anbefaling.'],
  ['Vurdere matematikk i tekster og presentere en egen analyse', ['modellering/1'], 'sykkel', 'Skriv et faglig svar på en påstand ved hjelp av tekstens datagrunnlag.'],
  ['Undersøke polynom-, rasjonale, potens- og eksponentialfunksjoner', ['funksjoner/2','funksjoner/3'], 'familier', 'Skille fire funksjoner ved definisjonsmengde, kurveform og endringsmønster.'],
  ['Tolke sekant, momentan vekstfart og derivert i en situasjon', ['derivasjon/1','derivasjon/2'], 'fart', 'Gå fra en måling over et tidsrom til fart i et øyeblikk.'],
  ['Bruke polynomdivisjon til omskriving, funksjonsdrøfting og løsning', ['polynomdivisjon/1','polynomdivisjon/2','polynomdivisjon/3'], 'polynom', 'Koble kvotient og rest til et hull, nullpunkter og fortegn.'],
  ['Forklare trigonometriske forhold og beregne i vilkårlige trekanter', ['trigonometri/1','trigonometri/2'], 'tomt', 'Skisser tre sideforhold og bruk to av dem i en vilkårlig trekant.'],
  ['Utlede trekantsetningene for areal, sinus og cosinus', ['trigonometri/2'], 'trekantbevis', 'Vis hvordan samme hjelpehøyde gir grunnlag for tre setninger.'],
  ['Kombinere flere trigonometriske resonnementer i samme problem', ['trigonometri/3'], 'tomt', 'Velg hjelpelinje, finn en ukjent avstand og beregn samlet areal.']
];

const oppdrag = {
  kodesok: {
    tittel: 'Hvor mange rader trengs?', fag: 'Programmering og problemløsing',
    innledning: 'Første rad i et amfi har 12 seter. Hver ny rad har tre flere seter. Arrangøren vil vite hvor mange hele rader som trengs for minst 200 gjester.',
    steg: [
      'Lag en tabell med radnummer, antall seter på raden og samlet kapasitet. Forutsi om åtte rader er nok.',
      'Skriv og kjør et program i Python som finner det minste antallet rader. Forklar løkkevilkåret og når hver variabel oppdateres.',
      'Prøv også grensene 12, 13 og 180 gjester. Velg selv en fjerde test som kan avsløre en feil i løkkevilkåret. Vis mellomregning og sammenlikn med programmet.'
    ],
    stotte: 'Start med null rader og null plasser. Når du legger til en rad, må du oppdatere både kapasiteten og størrelsen på neste rad.',
    vurdering: 'Programmet stopper ved første kapasitet som er stor nok. Eleven kan vise hva som skjer når kapasiteten blir nøyaktig lik grensen.',
    losning: 'Etter åtte rader er kapasiteten 180, og med ni rader blir den 216. Svaret for 200 er ni. Grensene 12, 13 og 180 gir henholdsvis én, to og åtte rader. Testen 216 avslører samme grensefeil ved niende rad.',
    kode: 'def antall_rader(grense):\n    rader, kapasitet, neste = 0, 0, 12\n    while kapasitet < grense:\n        kapasitet += neste\n        rader += 1\n        neste += 3\n    return rader\n\nfor grense in (12, 13, 180, 200, 216):\n    print(grense, antall_rader(grense))'
  },
  rektangler: {
    tittel: 'Hvilket rektangel vinner?', fag: 'Bevis og andregrad',
    innledning: 'Du har 24 meter list og skal ramme inn et rektangel. Velg to mulige rektangler, og sammenlikn arealene. Formuler en påstand om hvilket rektangel som får størst areal.',
    steg: [
      'Kall den ene siden x meter. Skriv den andre siden som et uttrykk i x, og angi hvilke x-verdier som er mulige.',
      r`Les påbegynnelsen av et bevis: $x(12-x)=36-(x-6)^2$. Kontroller identiteten. Fullfør beviset for påstanden din og vis når likhet oppnås.`,
      'Finn alle bredder som gir minst 32 kvadratmeter. Kontroller med en skisse av grafen.',
      'Lag et eksempel på et uttrykk, en funksjon, en identitet og en likning fra denne oppgaven. Forklar rollen til likhetstegnet. Kan beviset ditt tilpasses et rektangel med omkrets P?'
    ],
    stotte: 'Prøv bredde 4, 5, 6 og 7 meter. Hvilket tall trekkes fra 36 når bredden avviker fra 6?',
    vurdering: 'Eleven skiller mellom en identitet og en likning med bestemte løsninger, bruker kvadraters fortegn og begrunner intervallet i den praktiske situasjonen.',
    losning: r`Sidelengdene er $x$ og $12-x$, der $0<x<12$. Uttrykket $x(12-x)$ definerer arealfunksjonen $A(x)$. Identiteten i oppgaven gjelder for alle reelle $x$ og viser at $A(x)\le 36$, med likhet bare for $x=6$. Likningen $A(x)=32$ har løsningene 4 og 8. Ulikheten $A(x)\ge32$ gir $(x-6)^2\le4$, altså $4\le x\le8$. For omkrets $P>0$ blir $A(x)=P^2/16-(x-P/4)^2$. Maksimum oppnås med fire like sider.`
  },
  hall: {
    tittel: 'Hvilken hall bør klubben leie?', fag: 'Tekst, formler og likningssystem',
    innledning: 'Klubben har fått to fiktive tilbud for en treningsdag. Hall A tar 600 kr i bestillingsgebyr og 120 kr per time. Hall B tar 240 kr per time. Begge lar dere bestille én til åtte hele timer.',
    steg: [
      'Skriv en formel for totalkostnaden i hver hall. Forklar hva variablene måles i.',
      'Lag et regneark for én til åtte timer og tegn begge grafene. Bruk deretter en likning til å kontrollere skjæringspunktet. Forklar hvorfor to ulike metoder gir samme svar.',
      'En trener sier at A er billigst hele dagen. Formuler en ulikhet og svar treneren med en anbefaling for tre og sju timer. Vis hvordan ett endret prisvilkår kan endre konklusjonen.'
    ],
    stotte: 'Skriv timer i kolonne A. Bruk tallet i samme rad i begge prisformlene. Husk at det faste gebyret betales én gang.',
    vurdering: 'Eleven forbinder graf og likning med prisene, velger gyldige heltallsverdier og begrunner en anbefaling i kroner.',
    losning: r`$A(t)=600+120t$, $B(t)=240t$. Lik pris krever $600=120t$, altså $t=5$, og begge tar 1200 kr. A koster minst ved seks til åtte timer og B ved én til fire timer. Etter tre timer koster A 960 kr og B 720 kr. Etter sju timer er prisene 1440 og 1680 kr. Øker gebyret til 840 kr, flyttes skjæringen til sju timer.`
  },
  sykkel: {
    tittel: 'Holder overskriften om sykkeltrafikken?', fag: 'Kritisk lesing og modellering',
    innledning: 'En fiktiv skoleavis skriver: «Om fem år tar over 200 elever sykkelen hit.» På én høstdag i år telte avisen 100 sykler ved skolen. Samme ukedag i fjor talte de 80. Skolen har 150 sykkelplasser ved dagens stativer. I dette oppdraget regnes inneværende år som år 0.',
    steg: [
      'Finn veksten fra i fjor til i år i sykler og i prosent. Hvilke antakelser gjør avisen når den går fra sykler på én dag til antall elever?',
      'Lag en lineær og en eksponentiell prognose som passer begge tellingene. Sammenlikn tallene om fem år med avisens ordvalg og med kapasiteten ved stativene.',
      'Ett år senere telles 112 sykler. Vurder begge prognosene mot denne nye observasjonen. Skriv tre setninger til redaktøren med beregning, anbefalt overskrift og én opplysning dere trenger for å undersøke saken videre.'
    ],
    stotte: 'Tegn en tidslinje med år −1, 0, 1 og 5. For en lineær prognose bruker du samme tillegg hvert år. For en eksponentiell prognose bruker du samme faktor.',
    vurdering: 'Eleven begrunner både starttidspunkt og modellvalg, skiller observasjon fra prognose og vurderer konsekvensen av få måledager.',
    losning: r`Økningen er 20 sykler eller 25 %. $L(t)=100+20t$ gir nøyaktig 200 om fem år. $E(t)=100\cdot1{,}25^t$ gir omtrent 305. Bare den siste prognosen gir «over 200». År 1 er residualene $112-120=-8$ og $112-125=-13$. Den lineære prognosen bommer minst dette året. Antall stativplasser kan begrense tellingen. Vær, andre parkeringsplasser og gjentatte tellinger er relevante for vurderingen. En mulig overskrift er «Flere sykler på telledagen – usikker utvikling videre».`
  },
  familier: {
    tittel: 'Fire grafer med et felles punkt', fag: 'Funksjonsfamilier',
    innledning: r`Fire funksjoner er gitt ved $p(x)=x^2$, $r(x)=1/x$, $v(x)=\sqrt{x}$ og $e(x)=2^{x-1}$. Alle grafene går gjennom $(1,1)$.`,
    steg: [
      'Velg tre x-verdier som skiller grafene. Lag en verditabell og forklar eventuelle tomme felt.',
      'Tegn grafene med et digitalt verktøy. Sammenlikn definisjonsmengde, nullpunkter og hva som skjer når x blir stor. Hvilken graf har en vertikal asymptote?',
      'Sorter uttrykkene etter funksjonsfamilie. Kan en funksjon passe i flere familier? Begrunn svaret, og vis med regning hva som skjer med e(x) når x øker med én.'
    ],
    stotte: 'Prøv −1, 0 og 4. Undersøk hvilke regneoperasjoner som kan utføres for hver verdi.',
    vurdering: 'Eleven kan gå fra regneoperasjon til grafegenskap og begrunne at noen av funksjonsfamiliene overlapper.',
    losning: r`Ved $x=-1$ er verdiene 1, −1, udefinert i de reelle tallene og $1/4$. Ved $x=0$ får vi 0, udefinert, 0 og $1/2$. Ved $x=4$ får vi 16, $1/4$, 2 og 8. $r$ har vertikal asymptote $x=0$ og går mot null når $x$ vokser. De andre vokser uten grense. Både $p(x)=x^2$, $r(x)=x^{-1}$ og $v(x)=x^{1/2}$ er potensfunksjoner på sine definisjonsmengder. $p$ er også et polynom. $e(x+1)/e(x)=2$.`
  },
  fart: {
    tittel: 'Hva viser speedometeret?', fag: 'Derivasjon og måling',
    innledning: r`En vogn beveger seg langs en rett skinne. De første fem sekundene er avstanden fra start $s(t)=t^2+2t$ meter etter $t$ sekunder.`,
    steg: [
      'Finn gjennomsnittsfarten fra t = 2 til t = 3, og deretter fra t = 2 til t = 2,1. Vis måleenheten.',
      r`La intervallet gå fra $2$ til $2+h$. Forenkle uttrykket for gjennomsnittsfarten og forklar hva som skjer for små positive og negative $h$.`,
      'En medelev deler tilbakelagt avstand ved t = 2 på to sekunder og får 4 m/s. Hvilken fart beskriver de to svarene? Tegn sekant og tangent som viser forskjellen.'
    ],
    stotte: 'Avstanden ved to sekunder er 8 meter. Finn først tilveksten i avstand, og del på akkurat det tidsintervallet du brukte.',
    vurdering: 'Eleven skiller mellom en gjennomsnittlig fart og øyeblikksfart, viser enhet og bruker grenseprosessen til å forklare den deriverte.',
    losning: r`$s(3)=15$ og $s(2{,}1)=8{,}61$. Gjennomsnittsfartene er 7 og 6,1 m/s. Siden $s(2+h)-s(2)=6h+h^2$, blir differansekvotienten $6+h$ for $h\ne0$. Fra begge sider går denne mot 6 m/s, som er farten ved to sekunder. Svaret 4 m/s gjelder hele intervallet fra start til to sekunder.`
  },
  polynom: {
    tittel: 'Et nullpunkt som forsvinner', fag: 'Polynomdivisjon og fortegn',
    innledning: r`La $P(x)=x^3-4x^2+x+6$ og $f(x)=P(x)/(x-2)$. En elev leser av en graf og sier at $f$ er et andregradspolynom for alle reelle tall.`,
    steg: [
      'Del P(x) på x − 2. Vis alle ledd i divisjonen og kontroller kvotient og rest ved å multiplisere tilbake.',
      'Faktoriser kvotienten. Løs P(x) = 0 og f(x) = 0. Forklar forskjellen mellom løsningsmengdene ved hjelp av den opprinnelige nevneren.',
      'Bestem hvor f(x) ≤ 0. Beskriv grafen ved x = 2 og forklar hvordan det kan være lett å overse et manglende punkt på skjermen.'
    ],
    stotte: 'Det første leddet i kvotienten er x². Etter hvert trinn må du trekke fra hele produktet av divisoren og det nye leddet.',
    vurdering: 'Eleven kontrollerer divisjonen, tar med alle røtter i polynomet og beholder den opprinnelige definisjonsmengden ved løsning av ulikheten.',
    losning: r`$P(x)=(x-2)(x^2-2x-3)=(x-2)(x-3)(x+1)$. Kvotienten er $x^2-2x-3$, og resten er null. Røttene til $P$ er −1, 2 og 3. For $f$ gjenstår −1 og 3 siden $x=2$ er utelukket. Kravet $f(x)\le0$ gir $[-1,2)\cup(2,3]$. Grafen følger parabelen og mangler punktet $(2,-3)$.`
  },
  trekantbevis: {
    tittel: 'Tre setninger fra én trekant', fag: 'Geometriske bevis',
    innledning: 'Tegn en trekant ABC. Skriv a, b og c på sidene mot vinklene A, B og C. Plasser A i origo og B på positiv x-akse. La først A være spiss.',
    steg: [
      'Uttrykk koordinatene til C ved hjelp av b og A. Bruk høyden over grunnlinjen til å vise arealsetningen.',
      'Uttrykk samme areal med hver av de tre mulige grunnlinjene. Bruk det til å utlede sinussetningen.',
      'Bruk koordinatene til B og C til å beregne den kvadrerte avstanden BC. Forenkle til cosinussetningen. Gjenta forklaringen når A er stump og diskuter hva som skjer med projeksjonen på x-aksen.'
    ],
    stotte: 'Punkt B har koordinatene (c, 0). Punkt C ligger i avstand b fra origo. Se på høyden fra C og skyggen dens på x-aksen.',
    vurdering: 'Eleven kan knytte minst ett algebraisk trinn i hvert bevis til figuren og forklare hvorfor høyden er positiv også ved en stump vinkel A.',
    losning: r`$C=(b\cos A,b\sin A)$, så høyden er $b\sin A$ og arealet $T=bc\sin A/2$. De tre grunnlinjevalgene gir $2T=bc\sin A=ca\sin B=ab\sin C$. Del på $abc$ for å få sinussetningen i resiprok form. Avstandsformelen gir $a^2=(b\cos A-c)^2+(b\sin A)^2=b^2+c^2-2bc\cos A$. Vi har brukt $\cos^2 A+\sin^2 A=1$. For stump A går projeksjonen til venstre for A, og cosinus er negativ. Koordinatargumentet virker fortsatt.`
  },
  tomt: {
    tittel: 'Mål tomta fra diagonalen', fag: 'Praktisk trigonometri',
    innledning: 'En konveks firkant ABCD er delt av diagonalen AC. I trekant ABC er AB = 30 m, BC = 40 m og vinkel ABC = 60°. I trekant ACD er det målt ∠CAD = 45° og ∠ACD = 75°. Finn arealet av hele tomta.',
    steg: [
      'Tegn en skisse. Tegn også en liten rettvinklet hjelpetrekant og forklar hvordan sinus, cosinus og tangens for en spiss vinkel defineres ved sidene.',
      'Velg en setning for å finne diagonalen AC. Finn arealet av ABC og deretter en ukjent side i ACD. Begrunn hvordan du velger motstående vinkel i sinussetningen.',
      'Beregn det samlede arealet. Forklar en annen måte å kontrollere ett av delarealene på, og vis kontrollen.'
    ],
    stotte: 'Den siste vinkelen i ACD er 60°. Diagonalen AC ligger mot denne vinkelen. I ABC kjenner du to sider og den mellomliggende vinkelen.',
    vurdering: 'Eleven bruker riktig diagonal i begge trekanter, knytter side og motstående vinkel sammen og kontrollerer størrelse og enhet.',
    losning: r`Sinus og cosinus er henholdsvis motstående og hosliggende katet delt på hypotenusen. Tangens er motstående delt på hosliggende katet. $AC^2=30^2+40^2-2\cdot30\cdot40\cos60^\circ=1300$. $T_{ABC}=30\cdot40\sin60^\circ/2\approx519{,}6$. $AD=AC\sin75^\circ/\sin60^\circ\approx40{,}21$. Dermed blir $T_{ACD}=AC\cdot AD\sin45^\circ/2\approx512{,}64$. Totalt omtrent $1032\,\mathrm{m^2}$. Som kontroll kan du beregne høyden i ABC over AB: $40\sin60^\circ\approx34{,}64$ m gir omtrent $519{,}6\,\mathrm{m^2}$.`
  }
};

const kjerne = [
  ['Utforsking og problemløsing','Velg og prøv en strategi i amfiproblemet.', 'kodesok'],
  ['Modellering og anvendelser','Bygg og prøv to ulike prognoser for sykkeltrafikken.', 'sykkel'],
  ['Resonnering og argumentasjon','Begrunn hvorfor tre setninger gjelder for en vilkårlig trekant.', 'trekantbevis'],
  ['Representasjon og kommunikasjon','Veksle mellom prisvilkår, tabell, grafer og likningssystem.', 'hall'],
  ['Abstraksjon og generalisering','Utvid et arealbevis til en valgfri omkrets.', 'rektangler'],
  ['Matematiske kunnskapsområder','Koble algebra, graf og funksjoners definisjonsmengder.', 'polynom']
];

export function matrise() {
  return `<section class="pane lp-matrix"><h2>Læreplanmatrise for 1T</h2>
    <p>MAT09-02 gjelder fra 1. august 2026. De 14 radene følger rekkefølgen i læreplanen. Lenken til hvert oppdrag viser en konkret måte eleven kan bruke og begrunne matematikken på.</p>
    <p>${kilde(planUrl+'kompetansemaal-og-vurdering/kv979?lang=nob','Kompetansemål og vurdering hos Udir')} · ${kilde(planUrl+'gyldighet-og-innfoering?lang=nob','Gyldighet og innføring')}</p>
    <div class="lp-table-wrap" tabindex="0" role="region" aria-label="Kompetansemål med leksjoner og oppdrag"><table class="data-table"><caption>Mål, undervisning og arbeid eleven kan vise</caption>
    <thead><tr><th scope="col">Mål i kortform</th><th scope="col">Leksjoner</th><th scope="col">Oppdrag og vurderingsgrunnlag</th></tr></thead>
    <tbody>${plan.map(([maal, ids, id, tegn], i) => `<tr><th scope="row">${i+1}. ${e(maal)}</th>
      <td><ul>${ids.map(x => `<li><a href="#leksjon/${x}">${e(leksjoner.get(x))}</a></li>`).join('')}</ul></td>
      <td><a href="#oppdrag/${id}">${e(oppdrag[id].tittel)}</a><br>${e(tegn)}</td></tr>`).join('')}</tbody></table></div>
    <details><summary>Kjerneelementene i arbeid med oppdragene</summary><ul class="lp-core">${kjerne.map(([t, tekst, id])=>`<li><strong>${e(t)}.</strong> <a href="#oppdrag/${id}">${e(tekst)}</a></li>`).join('')}</ul>
    <p>${kilde(planUrl+'om-faget/kjerneelementer?lang=nob','Kjerneelementene hos Udir')}</p></details>
    <details><summary>Underveisvurdering i klasserommet</summary>
    <p>La eleven velge strategi og presentere et tidlig løsningsforslag. Be en medelev stille ett spørsmål om et valg i løsningen. I programmering kan eleven vise én test som endret fremgangsmåten. La eleven revidere etter samtalen og sette ord på hva hen nå kan forklare selv.</p>
    <p>Bruk skriftlig arbeid, tegninger, kode og muntlig begrunnelse når dere velger neste oppgave. Tellere for øving viser aktivitet på enheten. Faglig skjønn bygger på hva eleven gjør og forklarer i ulike situasjoner.</p></details></section>`;
}

const oppdragLink = id => `<a class="lp-project" href="#oppdrag/${id}"><small>${e(oppdrag[id].fag)}</small><strong>${e(oppdrag[id].tittel)}</strong></a>`;
const printKnapp = (label, fasit=false) => `<button class="button outline" type="button" data-lp-print="${fasit?'fasit':'elev'}">${e(label)}</button>`;
const tilbake = '<a href="#laerer">Til lærerrommet</a>';
const ugyldig = (navn) => `<header class="page-head"><h1>${navn}</h1><p>Lenken er ufullstendig eller viser til en ukjent oppgave. ${tilbake}</p></header>`;

export function oppdragSide(id) {
  if (!Object.hasOwn(oppdrag,id)) return ugyldig('Ukjent oppdrag');
  const o = oppdrag[id];
  const utstyr = {kodesok:"Digitalt verktøy kreves · Python", hall:"Digitalt verktøy kreves · regneark", familier:"Digitalt verktøy kreves · graftegner"}[id] || "Kan løses uten digitale hjelpemidler";
  return `<article class="lp-elev lp-print-area"><header class="page-head"><span class="eyebrow">${e(o.fag)}</span>
    <h1>${e(o.tittel)}</h1><p class="track">${utstyr} · Læreren vurderer framgangsmåten og begrunnelsen.</p><p>${m(o.innledning)}</p></header>
    <section class="pane"><h2>Undersøk og begrunn</h2><ol class="lp-steps">${o.steg.map(s=>`<li>${m(s)}</li>`).join('')}</ol>
    <details class="lp-help"><summary>Støtte til første steg</summary><p>${m(o.stotte)}</p></details>
    <h3>Se etter dette i besvarelsen</h3><p>${m(o.vurdering)}</p></section>
    <section class="pane lp-solution"><details><summary>Se løsningsforslag</summary><p>${m(o.losning)}</p>${o.kode?`<pre class="code"><code>${e(o.kode)}</code></pre>`:''}</details></section></article>
    <div class="actions lp-screen">${printKnapp('Skriv ut elevoppdrag')}${printKnapp('Skriv ut med løsningsforslag',true)} ${tilbake}</div>`;
}

const options = (fs, selected) => fs.map(f=>`<option value="${e(f.id)}"${selected===f.id?' selected':''}>${e(f.kort)}</option>`).join('');
const veiOptions = veier.map((v,i)=>`<option value="${i}"${i===1?' selected':''}>${v}</option>`).join('');

function lokalOppfolging(fs, logg) {
  const rader = fs.map(f=>{
    const forsok = logg.filter(x=>x.id===f.id);
    const usikre = forsok.filter(x=>!x.riktig || x.forsok>1 || x.hint>0);
    return {f, forsok, usikre, selv:forsok.filter(x=>x.riktig && x.forsok===1 && !x.hint).length};
  }).filter(r=>r.forsok.length).sort((a,b)=>b.usikre.length-a.usikre.length || b.forsok.length-a.forsok.length);
  if (!rader.length) return '<p>Her kommer en oversikt når en elev har svart i adaptiv øving eller kartlegging på denne enheten.</p>';
  const deltakelse = new Map();
  for (const {f,forsok} of rader) {
    for (const n of new Set(f.maal)) {
      if (!plan[n-1]) continue;
      deltakelse.set(n,(deltakelse.get(n)||0)+forsok.length);
    }
  }
  const feil = new Map();
  for (const {f,forsok} of rader) {
    for (const x of forsok.filter(x=>typeof x.feil==='string' && x.feil.trim())) {
      const key = f.id+'|'+x.feil;
      feil.set(key, {f,tekst:x.feil,antall:(feil.get(key)?.antall||0)+1});
    }
  }
  return `<div class="lp-table-wrap" tabindex="0" role="region" aria-label="Øving på denne enheten"><table class="data-table"><thead><tr><th scope="col">Ferdighet</th><th scope="col">Oppgaver</th><th scope="col">Riktig ved første forsøk uten hint</th><th scope="col">Følg opp</th></tr></thead>
    <tbody>${rader.map(({f,forsok,selv})=>`<tr><th scope="row">${e(f.kort)}</th><td>${forsok.length}</td><td>${selv}</td><td><a href="${leksjoner.has(f.id)?'#leksjon/'+e(f.id):'#tren/'+e(f.id)+'/0'}">${leksjoner.has(f.id)?'Åpne leksjon':'Øv på grunnlaget'}</a></td></tr>`).join('')}</tbody></table></div>
    <details><summary>Aktivitet fordelt på kompetansemål</summary><p>En oppgave kan berøre flere mål.</p><ul>${[...deltakelse].sort((a,b)=>a[0]-b[0]).map(([n,antall])=>`<li>Mål ${n} · ${e(plan[n-1][0])} · ${antall} oppgaver</li>`).join('')}</ul></details>
    ${feil.size?`<details><summary>Tilbakemeldinger som er gitt</summary><p>Bruk eksemplene som utgangspunkt for å spørre hva eleven tenkte.</p><ul>${[...feil.values()].sort((a,b)=>b.antall-a.antall).slice(0,8).map(x=>`<li><b>${e(x.f.kort)}</b> · ${m(x.tekst)} (${x.antall})</li>`).join('')}</ul></details>`:''}`;
}

export function laererSide({ferdigheter,logg=[],veiledning=true}) {
  const start = ferdigheter.find(f=>f.id==='likninger/1') ?? ferdigheter[0];
  return `<div class="lp-desk"><header class="page-head"><span class="eyebrow">Matematikk 1T</span><h1>Lærerrommet</h1><p>Velg et mål for timen, del en øvingsvei eller følg opp ferdighetene klassen har øvd på.</p><a class="button solid" href="./klasse.html">Åpne klasseoversikten</a></header>
    <div class="lp-desk-grid"><section class="pane lp-builder"><h2>Planlegg en økt</h2>
      <form class="lp-form" data-lp-form><label>Type arbeidsark<select name="modus"><option value="o">Øving i én ferdighet</option><option value="k">Kartlegging av tre ferdigheter</option></select></label>
      <label>Ferdighet<select name="ferdighet">${options(ferdigheter,start?.id)}</select></label>
      <div data-lp-extra hidden><label>Andre ferdighet<select name="to">${options(ferdigheter,'algebra/2')}</select></label>
      <label>Tredje ferdighet<select name="tre">${options(ferdigheter,'funksjoner/1')}</select></label></div>
      <label>Læringsvei<select name="nivaa">${veiOptions}</select></label></form>
      <p class="lp-notice" aria-live="polite" data-lp-message></p>
      <div class="actions" data-lp-links></div>
      <details><summary>Hva kan jeg dele?</summary><p>Arbeidsarklenken åpner samme oppgaver og tall for hele gruppa. Øvingslenken velger startferdighet og støtte for den første oppgaven. Eleven kan bytte vei underveis. Kopier lenken fra nettleseren eller bruk «Kopier arklenke».</p></details>
      <p><a href="#kartlegging">Åpne frivillig adaptiv kartlegging</a></p>
    </section><aside class="pane lp-lesson"><h2>Tilpass veiledningen</h2><label class="lp-toggle"><input type="checkbox" data-lp-guide${veiledning?' checked':''}> Vis veiledning i adaptiv øving</label>
      <p>Valget gjelder i denne nettleseren. Veilederen bruker forhåndsskrevne spørsmål og hint.</p>
      <h3>Et spørsmål å ta med til tavla</h3><p data-lp-board></p>
      <a class="lp-matrix-link" href="#kilder">Se læreplanmatrisen</a></aside></div>
    <section class="pane lp-section"><h2>Andregradsforløp på 45 minutter</h2><p><strong>Forkunnskaper:</strong> faktorisering, nullpunkter og fortegnet til et produkt. <strong>Mål:</strong> bruke nullpunkter og fortegn til å løse en andregradsulikhet og begrunne løsningen.</p><ol><li>0–5 min: Be elevene finne nullpunktene til (x − 2)(x + 3), og spør hva de forteller om grafen.</li><li>5–15 min: Elevene løser ulikheten i <a href="andregrad.html">andregradsforløpet</a>. De velger støtte eller begynner selvstendig.</li><li>15–25 min: Sammenlign løsningene parvis. Prøv x = 0 og x = 2. Hvorfor behandles endepunktene slik?</li><li>25–35 min: Løs en ny variant. Elevene forklarer hvordan en negativ koeffisient endrer fortegnet.</li><li>35–45 min: Felles oppsummering med fortegnslinje og graf. Avslutt med et individuelt eksempel og be eleven begrunne intervallet.</li></ol><p><strong>Se etter:</strong> om eleven skiller nullpunkter fra løsningsintervall, tester fortegn mellom nullpunktene og vurderer endepunktene.</p></section>
    <section class="pane lp-section"><h2>Forskning og valg i læreverket</h2><ul>
      <li>Adaptiv matematikkundervisning: Et svar kan gi grunnlag for neste spørsmål og relevant støtte. Tersklene i dette læreverket er designvalg som må prøves ut med elever. ${kilde('https://eric.ed.gov/?id=EJ1461689','Yi mfl. (2025)')}</li>
      <li>Gjennomregnede eksempler og gradvis mindre støtte: Elevene kan gå fra modellert løsning via utfylte mellomsteg til selvstendig arbeid. ${kilde('https://eric.ed.gov/?id=EJ1364058','Barbieri mfl. (2023)')} · ${kilde('https://doi.org/10.1080/00220970209599510','Renkl mfl. (2002)')}</li>
      <li>Tilbakemelding: Et konkret spørsmål om neste steg gir eleven mulighet til å revidere sitt svar. ${kilde('https://pmc.ncbi.nlm.nih.gov/articles/PMC6987456/','Wisniewski mfl. (2020)')}</li>
      <li>Repetisjon over tid: Tidligere ferdigheter kan hentes fram i nye oppgaver i senere økter. Avstanden mellom øktene må tilpasses undervisningen. ${kilde('https://doi.org/10.1007/s10648-025-10035-1','Murray mfl. (2025)')}</li>
    </ul></section>
    <section class="pane lp-section"><h2>Utforskende oppdrag</h2><p>Bruk oppdragene til parsamtaler, skriftlig argumentasjon og muntlig vurdering. Hvert oppdrag har støtte, vurderingskriterium og løsningsforslag.</p>
      <div class="lp-projects">${Object.keys(oppdrag).map(oppdragLink).join('')}</div></section>
    <section class="pane lp-section"><h2>Oppfølging på denne enheten</h2><p>Oversikten viser øving lagret i denne nettleseren. På en delt maskin kan flere elevers forsøk inngå.</p>${lokalOppfolging(ferdigheter,logg)}
      <details><summary>Eksempel på oppfølging av en klasse</summary><p><b>Fiktive klassedata.</b> I et tenkt utgangskort med 18 besvarelser beholder sju elever ulikhetstegnet når de deler med et negativt tall. Fire andre løser ulikheten riktig, men gir ingen begrunnelse.</p>
      <p>La par lage hvert sitt moteksempel til et foreslått feil svar. Be dem forklare snuoperasjonen med en tallinje, og prøv et nytt eksempel alene ved slutten av timen.</p><a href="#leksjon/likninger/3">Åpne leksjonen om ulikheter</a></details></section></div>`;
}

function lesArkvalg(token, fs) {
  if (typeof token !== 'string' || token.length>180) return null;
  const deler = token.split('~');
  if (deler.length!==4) return null;
  const [modus, nivaa, s, valgte] = deler;
  if (!['o','k'].includes(modus) || !/^[012]$/.test(nivaa) || !/^\d{1,8}$/.test(s)) return null;
  const ids = valgte.split('.');
  if (ids.length !== (modus==='k'?3:1) || new Set(ids).size!==ids.length) return null;
  const skills = ids.map(id=>fs.find(f=>f.id.replace('/','-')===id));
  return skills.every(Boolean) ? {modus,nivaa:Number(nivaa),seed:Number(s),skills} : null;
}

export function arkSide(token, ferdigheter) {
  const ark = lesArkvalg(token, ferdigheter);
  if (!ark) return ugyldig('Ukjent arbeidsark');
  const {modus,nivaa,seed,skills} = ark;
  const kart = modus==='k';
  const sett = [];
  for (const f of skills) {
    const unike = new Set();
    // Finite item families can contain fewer than three different prompts.
    for (let j=0; j<60 && unike.size<(kart?1:3); j++) {
      const oppgave = f.lag(nivaa,seed+j);
      const id = oppgave.variant ?? oppgave.sporsmal;
      if (unike.has(id)) continue;
      sett.push({f,oppgave});
      unike.add(id);
    }
  }
  function sporsmal(oppgave) {
    const svarvalg = oppgave.type==='valg' && oppgave.valg?.length ? `<ul>${oppgave.valg.map(t=>`<li>${m(t)}</li>`).join('')}</ul>` : '';
    return `<p>${m(oppgave.sporsmal)}</p>${svarvalg}`;
  }
  const refleksjon = kart?'Velg én av oppgavene. Hva fikk du til selv, og hvilket steg vil du øve mer på?':skills[0].utforsk;
  return `<article class="lp-elev lp-print-area"><header class="page-head"><span class="eyebrow">${kart?'Kartleggingsark':'Øvingsark'} · ${veier[nivaa]}</span>
      <h1>${kart?'Kartlegging av tre ferdigheter':e(skills[0].kort)}</h1><p>Vis mellomregning og begrunn valgene dine på papir eller i et eget dokument.</p></header>
    <section class="pane"><h2>Oppgaver</h2><ol class="lp-steps lp-sheet">${sett.map(({f,oppgave})=>`<li>${kart?`<strong>${e(f.kort)}</strong>`:''}${sporsmal(oppgave)}<div class="lp-answer-space" aria-hidden="true"></div></li>`).join('')}</ol>
    <h3>${kart?'Egenvurdering':'Utforsk videre'}</h3><p>${m(refleksjon)}</p><div class="lp-answer-space" aria-hidden="true"></div></section>
    <section class="pane lp-solution"><details><summary>Løsningsforslag til oppgavene</summary><ol class="lp-steps">${sett.map(({oppgave})=>`<li>${m(oppgave.losning)}</li>`).join('')}</ol>
      <p>Gå gjennom begrunnelsene og den åpne delen sammen i etterkant.</p></details></section></article>
      <div class="actions lp-screen">${printKnapp('Skriv ut elevark')} ${printKnapp('Skriv ut med løsningsforslag',true)} ${tilbake}</div>`;
}

export function monterLaerer(root,{ferdigheter,settVeiledning}) {
  const form = root.querySelector('[data-lp-form]');
  if (!form) return;
  const beskjed = root.querySelector('[data-lp-message]');
  const links = root.querySelector('[data-lp-links]');
  const board = root.querySelector('[data-lp-board]');
  let seed = 1;
  let arkHash='';
  function oppdater() {
    const kart = form.elements.modus.value==='k';
    const id = form.elements.ferdighet.value;
    const f = ferdigheter.find(x=>x.id===id);
    if (!f) return;
    const nivaa = Number(form.elements.nivaa.value);
    const ids = kart?[id,form.elements.to.value,form.elements.tre.value]:[id];
    board.innerHTML = m(f.utforsk);
    root.querySelector('[data-lp-extra]').hidden = !kart;
    if (new Set(ids).size!==ids.length) {
      beskjed.textContent = 'Velg tre ulike ferdigheter til kartleggingsarket.';
      links.innerHTML = '';
      arkHash='';
      return;
    }
    arkHash = `#ark/${kart?'k':'o'}~${nivaa}~${seed}~${ids.map(s=>s.replace('/','-')).join('.')}`;
    beskjed.textContent='';
    links.innerHTML = `<a class="button solid" href="${e(arkHash)}">Åpne arbeidsark</a>
      <button type="button" class="button outline" data-lp-copy>Kopier arklenke</button>
      <button type="button" class="button outline" data-lp-new>Nye tall</button>
      ${kart?'':`<a href="#tren/${e(id)}/${nivaa}">Åpne valgt øvingsvei</a>`}`;
  }
  form.addEventListener('change',oppdater);
  form.addEventListener('submit',ev=>{ev.preventDefault(); if (arkHash) location.hash = arkHash;});
  root.querySelector('[data-lp-guide]').addEventListener('change',ev=>settVeiledning(ev.target.checked));
  links.addEventListener('click', async ev=>{
    if (ev.target.closest('[data-lp-new]')) {
      seed = (seed+1)%100000000;
      oppdater();
      beskjed.textContent = 'Nytt oppgavesett er valgt.';
      links.querySelector('[data-lp-new]').focus();
    }
    if (ev.target.closest('[data-lp-copy]')) {
      const url = new URL(arkHash,location.href).href;
      try {
        await navigator.clipboard.writeText(url);
        beskjed.textContent = 'Arklenken er kopiert.';
      } catch {
        beskjed.innerHTML = `<label>Kopier denne lenken<input type="url" readonly value="${e(url)}"></label>`;
        const field = beskjed.querySelector('input');
        field.focus();
        field.select();
      }
    }
  });
  oppdater();
}

export function monterOppdrag(root) {
  const knapper = root.querySelectorAll('[data-lp-print]');
  for (const knapp of knapper) {
    knapp.addEventListener('click',()=>{
      const fasit = knapp.dataset.lpPrint==='fasit';
      const felt = root.querySelector('.lp-solution details');
      const forrige = felt?.open ?? false;
      const hjelp = root.querySelector('.lp-help');
      const haddeHjelp = hjelp?.open ?? false;
      if (felt) felt.open = fasit;
      if (hjelp) hjelp.open = true;
      document.body.classList.toggle('lp-fasit', fasit);
      const gjenopprett = ()=>{
        if (felt) felt.open = forrige;
        if (hjelp) hjelp.open = haddeHjelp;
        document.body.classList.remove('lp-fasit');
      };
      window.addEventListener('afterprint',gjenopprett,{once:true});
      window.print();
    });
  }
}
