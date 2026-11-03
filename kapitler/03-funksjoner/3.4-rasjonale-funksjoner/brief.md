# Brief 3.4 Rasjonale funksjoner

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 3 Funksjoner.
- Bygger på: 3.3 polynomdivisjon, 1.4 rasjonale uttrykk (forkorte, vilkår, fellesnevner), 2.1 likninger med brøk, 2.4 fortegnslinje, 3.1 definisjonsmengde.
- Brukes senere i: 3.5 potensfunksjoner med negativ eksponent, 3.6 modellering, 4.4 drøfting.
- Kompetansemål:
  - **KM9** — «utforske og beskrive egenskapene ved polynomfunksjoner, rasjonale funksjoner, eksponentialfunksjoner og potensfunksjoner»
  - **KM11** — «forklare polynomdivisjon og bruke det til å omskrive algebraiske uttrykk, drøfte funksjoner og løse ligninger og ulikheter»
  - **KM4** — «utforske strategier for å løse ligninger, ligningssystemer og ulikheter og argumentere for tenkemåtene sine»
  Skriv `\kompetansemaal{9,11,4}`. Utfordringsarket dekker også KM1, KM2 og KM7.

## Deler
1. **Asymptoter** — Rasjonal funksjon $f(x) = \frac{P(x)}{Q(x)}$. Hovedtype i 1T: $f(x) = \frac{ax + b}{cx + d}$.
   Vertikal asymptote der nevneren er 0 (og telleren ikke er 0). Horisontal asymptote $y = \frac{a}{c}$.
   Teoriboksen skal vise *hvorfor* med polynomdivisjon (KM11): $\frac{2x + 1}{x - 1} = 2 + \frac{3}{x - 1}$. Når $x$ blir stor, blir $\frac{3}{x-1}$ nær 0, så $f(x)$ nærmer seg 2. Når $x$ nærmer seg 1, blir brøken veldig stor.
   Bruk `\polylongdiv{2x+1}{x-1}`.
   Hull i grafen: $\frac{x^2 - 4}{x - 2} = x + 2$ for $x \neq 2$ (forkorting fra 1.4) — ingen asymptote, men et hull.
   Figur (pgfplots): grafen til $\frac{2x+1}{x-1}$ med asymptotene stiplet. Bruk `restrict y to domain` og to plott (ett på hver side av asymptoten) så grafen ikke tegnes over asymptoten.
2. **Rasjonale likninger og ulikheter** — Likninger: vilkår først, gang med fellesnevner, kontroller (2.1, 1.4).
   Ulikheter: **gang aldri med et uttrykk med ukjent fortegn.** Samle alt på én side, skriv på én brøkstrek, fortegnslinje (2.4) for teller og nevner. Nevnerens nullpunkt er aldri med.
   Teoriboksen skal vise hva som går galt hvis man ganger med $(x - 2)$: se eksempel 2.

## Ord
del 1: rasjonal funksjon, vertikal asymptote, horisontal asymptote, hull i grafen
del 2: rasjonal likning, rasjonal ulikhet, fortegnslinje (gjenta)

## Vanlige misoppfatninger som oppgavene skal fange
- Vertikal asymptote der *telleren* er 0
- Horisontal asymptote $y = \frac{b}{d}$ (konstantleddene) i stedet for $\frac{a}{c}$
- Ganger en ulikhet med $(x - 2)$ uten å tenke på fortegnet
- Glemmer hullet når uttrykket kan forkortes
- Tror grafen aldri kan krysse den horisontale asymptoten

## Eksempler
- Del 1: Eksempel 1: $f(x) = \frac{2x + 1}{x - 1}$: asymptoter med polynomdivisjon, nullpunkt, skjæring med $y$-aksen, graf. Eksempel 2: $g(x) = \frac{x^2 - 4}{x - 2}$: hull i $(2, 4)$.
- Del 2: Eksempel 1: likningen $\frac{2x + 1}{x - 1} = 3$ med vilkår og kontroll ($x = 4$). Eksempel 2: ulikheten $\frac{x + 3}{x - 2} \le 1$. Vis først den gale metoden (gange med $x - 2$ gir $3 \le -2$, «ingen løsning» — feil!), deretter riktig: $\frac{5}{x - 2} \le 0$, altså $x < 2$. Kontroller med $x = 0$: $-\frac{3}{2} \le 1$.

## Nivå 3 og utfordringsarket — idéer
- Lag selv en funksjon $\frac{ax + b}{cx + d}$ med vertikal asymptote $x = 3$, horisontal asymptote $y = -2$ og nullpunkt $x = 1$. (Én løsning: $f(x) = \frac{-2x + 2}{x - 3}$.)
- Alltid / noen ganger / aldri: «Grafen kan krysse den horisontale asymptoten.» Noen ganger: $\frac{2x^2 + x}{x^2 + 1}$ krysser $y = 2$ i $x = 2$, men $\frac{ax+b}{cx+d}$ gjør det aldri. Begrunn.
- Bevis (KM2): vis at $f(x) = \frac{2x+1}{x-1}$ aldri har verdien 2. (Fra omskrivingen: $\frac{3}{x-1} \neq 0$.) Generaliser: verdimengden er alle tall unntatt $\frac{a}{c}$.
- Skrå asymptote (bare utfordringsarket): $\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x-1}$ — hva nærmer grafen seg? (Kobling 1.4 U4 og 3.3.)
- **Kontekst (KM7, `\mh`):** Kostnad per enhet $K(x) = \frac{5000 + 20x}{x}$ (tenkt bedrift: faste kostnader 5000 kr, 20 kr per enhet). Hva betyr den horisontale asymptoten? Hvor mange enheter må lages for at kostnaden per enhet skal være under 25 kr? ($x > 1000$) Kan $x$ være 0? Vurder modellen.
- **Programmering (KM1):** Et program som skriver ut $f(x) = \frac{2x+1}{x-1}$ for $x = 1{,}1;\ 1{,}01;\ 1{,}001$ og $x = 10;\ 100;\ 1000$. Hva viser tabellen om asymptotene? Hvorfor kan ikke programmet regne ut $f(1)$? Hva skjer i Python?

## Hjelpemidler
Del 1 og 2 mest `\uh`. Kostnadsoppgaven `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Grafer: pgfplots, `axis lines=middle`, asymptoter stiplet og merket ($x = 1$, $y = 2$), samme stil som 3.1–3.3. Hullet markeres med åpen ring.
- Fortegnslinjer i samme stil som 2.4.
