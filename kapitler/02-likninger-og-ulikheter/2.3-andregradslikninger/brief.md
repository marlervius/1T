# Brief 2.3 Andregradslikninger

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 2 Likninger og ulikheter.
- Bygger på: 1.2 kvadratsetningene og faktorisering, 1.3 kvadratrot, 1.4 rasjonale uttrykk (vilkår), 2.1 likning/identitet.
- Brukes senere i: 2.4 andregradsulikheter, 3.2 andregradsfunksjoner (nullpunkter), 3.3 polynom, 4.4 drøfting.
- Kompetansemål:
  - **KM6** — «utforske sammenhenger mellom andregradsligninger og andregradsulikheter, andregradsfunksjoner og kvadratsetningene og bruke sammenhengene i problemløsing»
  - **KM4** — «utforske strategier for å løse ligninger, ligningssystemer og ulikheter og argumentere for tenkemåtene sine»
  Skriv `\kompetansemaal{6,4}`. Utfordringsarket dekker også KM1 og KM2.

## Deler
1. **Faktorisering og nullproduktregelen** — Regelen: hvis $a \cdot b = 0$, er $a = 0$ eller $b = 0$. Teoriboksen skal si *hvorfor* (hvis $a \ne 0$, kan vi dele på $a$ og får $b = 0$) og at regelen **bare** gjelder for 0 ($a \cdot b = 6$ sier ingenting om $a$ eller $b$).
   Metoder i rekkefølge, med ett lite eksempel hver i teoriboksen:
   - felles faktor: $x^2 - 5x = 0$
   - ren kvadratledd: $x^2 = 9$ gir $x = \pm 3$
   - kvadratsetningene baklengs (fra 1.2): $x^2 - 6x + 9 = 0$
   - sum–produkt-metoden: $x^2 + 5x + 6 = (x+2)(x+3)$ — finn to tall med produkt 6 og sum 5. Bare for $a = 1$ og heltallsløsninger.
   Strategi (KM4): Hvilken metode passer? Se på likningen før du regner.
2. **abc-formelen og diskriminanten** — Utled abc-formelen i teoriboksen eller i et eksempel med fullstendige kvadraters metode (kobling til kvadratsetningene, KM6). Vis først metoden på et talleksempel ($x^2 + 6x - 7 = 0$), deretter generelt i kort form.
   Diskriminanten $D = b^2 - 4ac$: $D > 0$ to løsninger, $D = 0$ én, $D < 0$ ingen. Gi en figur (pgfplots) med tre parabler som krysser, tangerer og ikke treffer $x$-aksen — kobling til andregradsfunksjoner (KM6, forsmak på 3.2).
   Faktorisering med nullpunktene: $ax^2 + bx + c = a(x - x_1)(x - x_2)$.

## Ord
del 1: andregradslikning, nullproduktregelen, sum–produkt-metoden, løsning (gjenta)
del 2: abc-formelen, diskriminant, fullstendig kvadrat, nullpunkt

## Vanlige misoppfatninger som oppgavene skal fange
- $x^2 = 5x$: deler på $x$ og mister $x = 0$
- $x^2 = 9$ gir bare $x = 3$
- $(x-2)(x-3) = 6$ gir $x - 2 = 6$ eller $x - 3 = 6$ (nullproduktregelen brukt på 6)
- abc-formelen: skriver $-b^2$ i stedet for $b^2$ når $b$ er negativ; deler bare $\sqrt{D}$ på $2a$
- Nullpunktene $2$ og $-3$ gir $(x+2)(x-3)$ (fortegnsfeil)

## Eksempler
- Del 1: Eksempel 1: $3x^2 = 12x$ (felles faktor, ikke del på $x$). Eksempel 2: $x^2 - x - 12 = 0$ med sum–produkt.
- Del 2: Eksempel 1: $2x^2 - 3x - 2 = 0$ med abc-formelen og kontroll. Eksempel 2: avgjør antall løsninger med $D$ uten å løse, for tre likninger.

## Nivå 3 og utfordringsarket — idéer
- Finn $k$ slik at $x^2 + kx + 9 = 0$ har nøyaktig én løsning ($k = \pm 6$). Kobling til kvadratsetningene.
- Lag selv en andregradslikning med løsningene $2$ og $-5$ der $a \ne 1$. Hvor mange slike finnes?
- Finn den første feilen i en abc-utregning med negativ $b$.
- Bevis (KM2): vis at summen av løsningene er $-\frac{b}{a}$ og produktet er $\frac{c}{a}$. Bruk det til å forklare hvorfor sum–produkt-metoden virker.
- Likninger som kan gjøres om til andregradslikninger (bare utfordringsarket):
  - $x^4 - 5x^2 + 4 = 0$ med $u = x^2$ (løsninger $\pm 1$, $\pm 2$)
  - $x + \frac{6}{x} = 5$ (vilkår $x \ne 0$, løsninger 2 og 3) — kobling til 1.4
  - $\sqrt{x + 2} = x$ — kvadrering gir $x = 2$ og $x = -1$; $x = -1$ må forkastes. Hvorfor oppstår en falsk løsning? (Kobling til 1.3: $\sqrt{\ }$ er alltid $\ge 0$.)
- Tekstoppgave (`\mh`): et rektangel har omkrets 34 cm og areal 60 cm². Finn sidene (5 og 12). Én tekstoppgave til i del 2, gjerne med kast: $h(t) = 20t - 5t^2$, når er ballen 15 m over bakken? ($t = 1$ og $t = 3$ — tolk begge.)
- **Programmering (KM1):** Skriv `abc(a, b, c)` som returnerer løsningene og håndterer $D < 0$ og $D = 0$. Test på eksemplene. Ekstra: hva skjer om $a = 0$? Legg inn en sjekk.

## Hjelpemidler
Del 1 alt `\uh`. Del 2 mest `\uh`; tekstoppgaver med `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Skriv løsninger som $x = -2 \lor x = 3$ eller «$x = -2$ eller $x = 3$». Velg én skrivemåte og bruk den overalt (anbefaling: «eller», det er tydeligst for elevene).
- Eksakte svar med rot der det trengs ($x = 1 \pm \sqrt{3}$). Desimaltall bare med hjelpemidler.
