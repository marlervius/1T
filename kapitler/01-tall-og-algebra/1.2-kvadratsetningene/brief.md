# Brief 1.2 Kvadratsetningene og faktorisering

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 1 Tall og algebra.
- Bygger på: 1.1 Potenser, gange ut parenteser (ungdomsskolen).
- Brukes senere i: 1.4 rasjonale uttrykk, 2.3 andregradslikninger, 2.4 ulikheter, 3.2 fullstendige kvadraters metode.

## Deler
1. **Kvadratsetningene** — $(a+b)^2$, $(a-b)^2$, $(a+b)(a-b)$.
   Teoriboksen skal vise *hvorfor* med en arealfigur (TikZ: kvadrat med side $a+b$ delt i
   $a^2$, $ab$, $ab$, $b^2$) og ved å gange ut. Bruk kvadratsetningene til hoderegning ($51^2$, $49 \cdot 51$).
2. **Faktorisering** — trekke ut felles faktor, og bruke kvadratsetningene baklengs
   ($x^2 - 9 = (x-3)(x+3)$, $x^2 + 6x + 9 = (x+3)^2$). Kontroller faktoriseringen ved å gange ut.

## Ord
del 1: kvadratsetning, kvadrat, konjugatsetningen, gange ut
del 2: faktorisere, felles faktor, faktor, fullstendig faktorisert

## Vanlige misoppfatninger som oppgavene skal fange
- $(a+b)^2 = a^2 + b^2$ (glemmer dobbeltproduktet)
- $(x-3)^2 = x^2 - 6x - 9$ (fortegnsfeil på siste ledd)
- $(2x+1)^2 = 2x^2 + 4x + 1$ (glemmer å kvadrere 2-tallet)
- $x^2 + 9 = (x+3)(x-3)$ (en sum av kvadrater kan ikke faktoriseres slik)
- Trekker ut felles faktor bare delvis: $4x^2 + 8x = 4(x^2 + 2x)$ — ikke fullstendig

## Eksempler
- Del 1: $(3x - 2)^2$ steg for steg, og $49 \cdot 51 = (50-1)(50+1)$.
- Del 2: $2x^3 - 18x = 2x(x^2 - 9) = 2x(x-3)(x+3)$ — felles faktor først, så konjugatsetningen.

## Nivå 3 og utfordringsarket — idéer
- Alltid/noen ganger/aldri: $(a-b)^2 = (b-a)^2$; $(a+b)^2 \ge a^2 + b^2$
- Bevis at $(n+1)^2 - n^2$ alltid er et oddetall
- Regn ut $1001^2 - 999^2$ uten kalkulator
- Finn $k$ slik at $x^2 + kx + 25$ er et fullstendig kvadrat (to svar)
- Bevis at produktet av to tall som er symmetriske om $m$ er $m^2 - d^2$, og bruk det på $47 \cdot 53$
- Faktoriser $x^4 - 16$ fullstendig
- Programmering: en løkke som sjekker $(n+1)^2 - n^2 = 2n + 1$ for $n = 1, \ldots, 10$, og et spørsmål om hvorfor en slik sjekk ikke er et bevis

## Hjelpemidler
Alt uten hjelpemidler, bortsett fra programmeringsoppgaven (`\prog`).

## Spesielle ønsker
- Bruk «konjugatsetningen» som navn på tredje kvadratsetning, og nevn at den også kalles «tredje kvadratsetning».
