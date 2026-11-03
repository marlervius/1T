# Brief 2.2 Likningssystemer

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 2 Likninger og ulikheter.
- Bygger på: 2.1 (likning, identitet, $0 = 0$ og $0 = 5$), 1.2 felles faktor, lineære funksjoner fra ungdomsskolen.
- Brukes senere i: 3.1 lineære funksjoner (skjæringspunkt), 3.2 og 3.3 (skjæring mellom grafer), 3.6 modellering.
- Kompetansemål: **KM4** — «utforske strategier for å løse ligninger, ligningssystemer og ulikheter og argumentere for tenkemåtene sine».
  Skriv `\kompetansemaal{4}` i meta.tex. Utfordringsarket dekker også KM1, KM2 og KM3.

## Deler
1. **Innsetting og addisjon** — To lineære likninger med to ukjente. Notasjon: `\begin{cases} … \end{cases}` eller `aligned` med (I) og (II).
   Innsettingsmetoden: løs én likning for én ukjent, sett inn i den andre.
   Addisjonsmetoden: gang likningene slik at én ukjent får motsatte koeffisienter, legg sammen.
   Teoriboksen skal vise *hvorfor* addisjon er lov: hvis $A = B$ og $C = D$, er $A + C = B + D$. Vi legger like store tall til begge sider.
   Kontroll: sett inn i *begge* de opprinnelige likningene.
   Strategi (KM4): når passer hvilken metode? (Innsetting når en ukjent står alene, addisjon når koeffisientene passer.)
2. **Grafisk løsning og antall løsninger** — Hver lineær likning er en rett linje. Løsningen er skjæringspunktet.
   Tre tilfeller med figur (TikZ eller pgfplots, tre små koordinatsystem side om side): én løsning (linjene krysser), ingen løsning (parallelle), uendelig mange (samme linje).
   Kobling til 2.1: addisjonsmetoden gir da $0 = 5$ (selvmotsigelse) eller $0 = 0$ (de to likningene er samme likning).
   Ett ikke-lineært system på nivå 3: linje og parabel som løses med innsetting og felles faktor, f.eks. $y = x^2$ og $y = 2x$ (gir $x(x-2) = 0$). **Ikke** systemer som krever abc-formelen — den kommer i 2.3.

## Ord
del 1: likningssystem, ukjent, innsettingsmetoden, addisjonsmetoden, koeffisient
del 2: skjæringspunkt, parallelle linjer, sammenfallende linjer, stigningstall (gjenta kort)

## Vanlige misoppfatninger som oppgavene skal fange
- Ganger bare ett ledd når en likning ganges med et tall
- Fortegnsfeil når likningene trekkes fra hverandre
- Finner $x$ og glemmer $y$ (svaret er et tallpar)
- Kontrollerer bare i én av likningene
- Tolker $0 = 0$ som $x = 0$ (og $0 = 5$ som en feil i utregningen)

## Eksempler
- Del 1: Eksempel 1: innsetting, $\begin{cases} y = 2x - 1 \\ 3x + y = 9 \end{cases}$. Eksempel 2: addisjon, $\begin{cases} 2x + 3y = 12 \\ 5x - 2y = 11 \end{cases}$ (gang med 2 og 3). Kontroll i begge.
- Del 2: Eksempel: avgjør antall løsninger for $\begin{cases} 2x - y = 3 \\ -4x + 2y = 6 \end{cases}$ uten å tegne — omskriv til $y = \ldots$, sammenlign stigningstall og konstantledd.

## Nivå 3 og utfordringsarket — idéer
- Finn $a$ og $b$ slik at $\begin{cases} 2x + ay = 4 \\ x + 3y = b \end{cases}$ har (i) uendelig mange løsninger, (ii) ingen løsning. (Svar: $a = 6$; $b = 2$ gir uendelig, $b \ne 2$ ingen.)
- Lag selv et system med løsningen $(3, -1)$ der addisjonsmetoden passer best. Forklar valget.
- Linje og parabel: $y = x^2$ og $y = 2x$; hvor mange skjæringspunkt kan en linje og $y = x^2$ ha? Begrunn med figur.
- **Tekst (KM3, KM8):** Kinobilletter: 3 voksne og 2 barn betaler 610 kr, 2 voksne og 4 barn betaler 620 kr. Sett opp og løs. (Svar: voksen 150, barn 80.) Gjerne én `\mh`-oppgave med GeoGebra der eleven tegner linjene.
- **Bevis (KM2):** Vis at $\begin{cases} ax + by = c \\ dx + ey = f \end{cases}$ har nøyaktig én løsning når $ae - bd \ne 0$, og finn $x$ uttrykt med $a, b, c, d, e, f$. Hva skjer når $ae - bd = 0$? (Kobling til del 2.)
- **Programmering (KM1):** Skriv en funksjon `los(a, b, c, d, e, f)` som bruker formelen fra beviset og skriver «ingen eller uendelig mange løsninger» når $ae - bd = 0$. Test på eksemplene i heftet. Alternativt: et program som prøver alle heltallspar $0 \le x, y \le 20$ i en tekstoppgave, og spørsmål om fordeler og ulemper ved denne «prøv alle»-strategien.
- Tre ukjente (bare utfordringsarket): $\begin{cases} x + y + z = 6 \\ x - y = 1 \\ y + z = 4\end{cases}$ (svar $(2, 1, 3)$) — strategi: reduser til to ukjente.

## Hjelpemidler
Del 1 alt `\uh` bortsett fra én tekstoppgave `\mh`. Del 2: én `\mh` med GeoGebra. Programmering `\prog`.

## Spesielle ønsker
- Svar alltid som tallpar: $x = 3$, $y = -1$, eller $(3, -1)$.
- Figurene i del 2 skal være enkle og like store. Bruk pgfplots med `axis lines=middle`, uten rutenett.
