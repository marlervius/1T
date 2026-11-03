# Brief 1.4 Rasjonale uttrykk

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 1 Tall og algebra. Siste seksjon i kapittel 1.
- Bygger på: brøkregning (ungdomsskolen), 1.2 faktorisering og konjugatsetningen, 1.1 potenser.
- Brukes senere i: 2.1 likninger med brøk, 3.4 rasjonale funksjoner, likninger og ulikheter, 3.3 polynomdivisjon.
- Kompetansemål: **KM4** — «utforske strategier for å løse ligninger, ligningssystemer og ulikheter og argumentere for tenkemåtene sine» og **KM11** — «forklare polynomdivisjon og bruke det til å omskrive algebraiske uttrykk, drøfte funksjoner og løse ligninger og ulikheter».
  Seksjonen er grunnlag for KM11 (omskrive algebraiske uttrykk). Skriv `\kompetansemaal{4,11}` i meta.tex.
  Utfordringsarket dekker også KM1 (programmering) og KM2 (bevis).

## Deler
1. **Forkorte, gange og dele** — Et rasjonalt uttrykk er en brøk med polynom i teller og nevner.
   Nevneren kan ikke være 0, så vi skriver alltid vilkår (for eksempel $x \neq 2$).
   Teoriboksen skal vise *hvorfor* vi bare kan forkorte faktorer: $\frac{ac}{bc} = \frac{a}{b}\cdot\frac{c}{c} = \frac{a}{b}$, mens $\frac{a+c}{b+c}$ ikke kan forkortes. Kontroll med tall: $\frac{2+3}{4+3} \neq \frac{2}{4}$.
   Metode: faktoriser teller og nevner (felles faktor, kvadratsetninger fra 1.2), forkort like faktorer, skriv vilkår.
   Gange og dele: faktoriser først, forkort, gang til slutt.
   Viktig detalj: vilkåret gjelder fortsatt etter forkorting. $\frac{x^2-9}{x^2+3x} = \frac{x-3}{x}$ gjelder for $x \neq 0$ og $x \neq -3$.
2. **Addere og subtrahere** — Faktoriser nevnerne, finn minste fellesnevner, utvid hver brøk, trekk sammen, forkort hvis mulig.
   Teoriboksen: samme metode som for tallbrøker ($\frac{1}{6} + \frac{1}{4}$ med fellesnevner 12), vist side om side med et rasjonalt uttrykk.
   Parentes rundt telleren når det står minus foran brøken.

## Ord
del 1: rasjonalt uttrykk, forkorte, vilkår, faktor (gjenta kort), ikke definert
del 2: fellesnevner, minste fellesnevner, utvide, trekke sammen

## Vanlige misoppfatninger som oppgavene skal fange
- Forkorter ledd: $\frac{x+2}{x} = 2$ og $\frac{x+3}{x+5} = \frac{3}{5}$
- $\frac{a}{b} + \frac{c}{d} = \frac{a+c}{b+d}$
- Minus foran brøk: $\frac{2}{x} - \frac{x-1}{x} = \frac{2 - x - 1}{x}$ (riktig: $\frac{2 - x + 1}{x}$)
- $\frac{x-3}{3-x} = 1$ (riktig: $-1$, fordi $3 - x = -(x-3)$)
- Glemmer vilkåret etter forkorting

## Eksempler
- Del 1: Eksempel 1: forkort $\frac{x^2 - 9}{x^2 + 3x}$ med vilkår. Kontroll med $x = 1$.
  Eksempel 2: $\frac{x^2-4}{3x} \cdot \frac{6x^2}{x+2}$ — faktoriser, forkort, gang.
- Del 2: Eksempel 1: $\frac{2}{x} + \frac{3}{x+1}$. Eksempel 2: $\frac{x}{x^2-4} - \frac{1}{x+2}$ (fellesnevner $(x-2)(x+2)$, minus foran brøk).
  Kontroll med en tallverdi i hvert eksempel.

## Nivå 3 og utfordringsarket — idéer
- Alltid/noen ganger/aldri: $\frac{x^2-1}{x-1} = x + 1$ (alltid når $x \neq 1$, ikke definert for $x = 1$); $\frac{1}{a} + \frac{1}{b} = \frac{2}{a+b}$ (aldri for tillatte verdier: gir $a^2 + b^2 = 0$); $\frac{x-3}{3-x} = -1$
- Finn den første feilen i en utregning med minus foran brøk
- Forklar hvorfor $x = 2$ ikke er tillatt i det forkortede svaret selv om $\frac{x}{x+2}$ er definert der (når opprinnelig uttrykk hadde $x - 2$ i nevneren)
- **Likninger med $x$ i nevneren (KM4):** én oppgave på nivå 3 med to likninger. Tekst: «Den ene likningen har ingen løsning. Den andre stemmer for alle tillatte verdier. Finn ut hvilken som er hvilken, og begrunn.»
  a) $\frac{x}{x-2} = \frac{2}{x-2} + 3$ (gir $x = 2$, som ikke er tillatt: ingen løsning)
  b) $\frac{2}{x-1} + 1 = \frac{x+1}{x-1}$ (venstre side kan skrives som høyre side: alle $x \neq 1$)
- **Omskriving (bro til KM11):** vis at $\frac{x^2+1}{x-1} = x + 1 + \frac{2}{x-1}$ ved å sette på felles brøkstrek. Forklar hva omskrivingen sier om uttrykket når $x$ er stor.
- **Teleskopsum (KM2 og KM1):**
  a) Vis at $\frac{1}{n} - \frac{1}{n+1} = \frac{1}{n(n+1)}$.
  b) Bruk dette til å finne $\frac{1}{1\cdot 2} + \frac{1}{2\cdot 3} + \ldots + \frac{1}{99\cdot 100}$ eksakt.
  c) Python med `from fractions import Fraction`: regn ut summen for $n = 1, \ldots, 10$ og se mønsteret. Forklar hvorfor programmet ikke beviser mønsteret, men a) gjør det.
- Lag selv: et rasjonalt uttrykk som kan forkortes til $\frac{x+1}{x-2}$ og som ikke er definert for $x = 3$.

## Hjelpemidler
Alt `\uh`. Teleskopsummen del c) er `\prog`. En kontekstoppgave med `\mh` er valgfri, for eksempel gjennomsnittsfart tur–retur: $v = \frac{2s}{\frac{s}{v_1} + \frac{s}{v_2}}$ forenklet til $\frac{2v_1v_2}{v_1+v_2}$ (60 km/h og 40 km/h gir 48 km/h, ikke 50).

## Spesielle ønsker
- Skriv alltid vilkår i fasiten, også når oppgaven ikke ber om det.
- Fartsoppgaven er en god nivå 2/3-oppgave fordi svaret overrasker. Ta den med hvis det er plass.
