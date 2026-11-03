# Brief 2.1 Uttrykk, identiteter, likninger og formler

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 2 Likninger og ulikheter. Første seksjon.
- Bygger på: lineære likninger (ungdomsskolen), 1.2 kvadratsetningene, 1.4 rasjonale uttrykk og fellesnevner.
- Brukes senere i: 2.2 likningssystemer, 2.3 andregradslikninger, 3.1 funksjonsbegrepet, 3.6 modellering.
- Kompetansemål:
  - **KM5** — «forklare forskjellen mellom en identitet, en ligning, et algebraisk uttrykk og en funksjon»
  - **KM3** — «identifisere variable størrelser i ulike situasjoner, sette opp formler og utforske disse ved hjelp av digitale verktøy»
  - **KM4** — «utforske strategier for å løse ligninger, ligningssystemer og ulikheter og argumentere for tenkemåtene sine»
  Skriv `\kompetansemaal{5,3,4}` i meta.tex. Utfordringsarket dekker også KM1 og KM2.

## Deler
1. **Uttrykk, likning, identitet og funksjon** (KM5) — Teoriboksen: en tabell med de fire begrepene, ett eksempel hver og hva vi gjør med det:
   - algebraisk uttrykk $2x + 3$: forenkle, regne ut verdien (ingen likhetstegn)
   - likning $2x + 3 = 7$: sann for noen verdier, vi *løser* den
   - identitet $(x+1)^2 = x^2 + 2x + 1$: sann for alle (tillatte) verdier, vi *viser/beviser* den
   - funksjon $f(x) = 2x + 3$: en regel som gir én verdi for hver $x$, vi *bruker og tegner* den
   *Hvorfor* det betyr noe: å sette inn tall kan vise at noe *ikke* er en identitet (ett moteksempel), men aldri bevise at det *er* en identitet. Det krever algebra.
   Hva skjer når vi «løser» en identitet ($0 = 0$, alle tall er løsning) og en selvmotsigelse ($0 = 5$, ingen løsning)?
2. **Likninger med brøk og formler** (KM4, KM3) — Løse lineære likninger med brøk: gang *alle ledd* med fellesnevneren (bruk 1.4), parentes rundt tellere med flere ledd, kontroller i den opprinnelige likningen.
   Formler: identifiser variable og konstante størrelser i en situasjon, sett opp formelen, snu formelen (løs med hensyn på en annen variabel).
   Eksempler på formler: $v = \frac{s}{t}$, trapesareal $A = \frac{(a+b)h}{2}$, temperatur $F = 1{,}8C + 32$, taxipris.

## Ord
del 1: algebraisk uttrykk, likning, identitet, funksjon, moteksempel
del 2: fellesnevner (gjenta kort), formel, variabel, konstant, snu en formel

## Vanlige misoppfatninger som oppgavene skal fange
- Ganger bare det første leddet med fellesnevneren
- Glemmer parentes: $12\cdot\frac{x+2}{4}$ blir $3x + 2$
- «Løser» en identitet, får $0 = 0$ og tror svaret er $x = 0$
- Får $0 = 5$ og tror svaret er $x = 0$ eller $x = 5$
- Tester med to tall og konkluderer med at noe er en identitet
- Snur formel og deler bare en del av siden: $A = \frac{(a+b)h}{2}$ gir $b = \frac{2A}{h} + a$

## Eksempler
- Del 1: Eksempel 1: avgjør om $(x-2)^2 = x^2 - 4$ er en identitet. Moteksempel $x = 1$, og vis med kvadratsetningen hva som er riktig. Eksempel 2: «løs» $2(x+3) = 2x + 6$ og $2(x+3) = 2x + 5$ — tolk $0 = 0$ og $0 = 1$.
- Del 2: Eksempel 1: $\frac{x-1}{3} - \frac{x+2}{4} = 1$ med kontroll. Eksempel 2: snu trapesformelen og finn $b$ når $A = 30$, $a = 4$, $h = 5$.

## Nivå 3 og utfordringsarket — idéer
- Lag selv: en likning med nøyaktig én løsning $x = 3$, en med ingen løsning og en identitet. Alle skal ha $x$ på begge sider og minst én brøk.
- Klassifiser og begrunn: $\sqrt{x^2} = x$ (fra 1.3) — en likning med uendelig mange løsninger, men *ikke* en identitet. Hvorfor?
- Parameter: $a(x-1) = 2x + 4$. For hvilken $a$ er det ingen løsning? Finnes det en $a$ som gir en identitet? (Svar: $a = 2$ gir ingen løsning; ingen $a$ gir identitet. Kontroller selv.)
- Temperatur: Ved hvilken temperatur viser celsius og fahrenheit samme tall? ($-40$)
- **Formler fra tekst (KM3, KM8, `\mh`):** To taxiselskap. A: 49 kr i start, 16 kr per km. B: 89 kr i start, 12 kr per km. Sett opp formler, finn når de koster like mye (10 km), og bruk GeoGebra til å tegne begge. Hvilket selskap anbefaler du for en tur på 6 km og på 25 km?
- **Programmering (KM1):** Skriv en funksjon `los(a, b, c, d)` som løser $ax + b = cx + d$ og skriver ut «én løsning: …», «ingen løsning» eller «alle tall er løsninger». Eleven må tenke gjennom tilfellene $a \neq c$, $a = c$ og $b = d$, og $a = c$ og $b \ne d$. Gi et skjelett med hull.
- **Bevis (KM2):** Vis at $\frac{1}{x} - \frac{1}{x+1} = \frac{1}{x(x+1)}$ er en identitet (for $x \ne 0$, $x \ne -1$) — kobling til teleskopsummen i 1.4. Forklar hvorfor testing med $x = 1, 2, 3$ ikke er et bevis.

## Hjelpemidler
Del 1 alt `\uh`. Del 2 mest `\uh`, men minst én `\mh` (GeoGebra for formler). Programmering `\prog`.

## Spesielle ønsker
- Funksjonsbegrepet tas grundig i 3.1. Her holder det å skille funksjon fra likning og uttrykk.
- Bruk samme stil som 4FOB-heftet om likninger der det passer (fellesnevner, kontroll i den opprinnelige likningen).
