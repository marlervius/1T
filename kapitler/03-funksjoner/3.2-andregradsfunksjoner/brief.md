# Brief 3.2 Andregradsfunksjoner

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 3 Funksjoner.
- Bygger på: 3.1 funksjonsbegrepet, 2.3 andregradslikninger (nullpunkter, abc-formel, diskriminant, sum av løsninger $-\frac{b}{a}$), 2.4 ulikheter, 1.2 kvadratsetningene.
- Brukes senere i: 3.3 polynomfunksjoner, 4.4 drøfting (der toppunkt finnes med derivasjon — her finnes det uten).
- Kompetansemål:
  - **KM6** — «utforske sammenhenger mellom andregradsligninger og andregradsulikheter, andregradsfunksjoner og kvadratsetningene og bruke sammenhengene i problemløsing»
  - **KM9** — «utforske og beskrive egenskapene ved polynomfunksjoner, rasjonale funksjoner, eksponentialfunksjoner og potensfunksjoner»
  Skriv `\kompetansemaal{6,9}`. Utfordringsarket dekker også KM1, KM2 og KM7.

## Deler
1. **Graf, nullpunkter og symmetrilinje** — $f(x) = ax^2 + bx + c$. Fortegnet til $a$ bestemmer om grafen vender opp ($a > 0$) eller ned ($a < 0$). $c$ er skjæringen med $y$-aksen.
   Nullpunktene er løsningene av $f(x) = 0$ (kobling 2.3), og antall nullpunkter følger av $D$.
   Symmetrilinjen $x = -\frac{b}{2a}$. Teoriboksen skal vise *hvorfor*: symmetrilinjen ligger midt mellom nullpunktene, og gjennomsnittet av løsningene er $\frac{1}{2}\cdot\left(-\frac{b}{a}\right)$ (fra 2.3). Gjelder også når grafen ikke har nullpunkter (forklar kort: flytt grafen opp/ned, symmetrilinjen endrer seg ikke).
   Topp- eller bunnpunkt: sett symmetrilinjens $x$ inn i $f$.
   Figur: én pgfplots-graf med nullpunkter, symmetrilinje (stiplet), bunnpunkt og skjæring med $y$-aksen markert.
2. **Fullstendige kvadraters metode og toppunktform** — Skriv $f(x) = a(x - p)^2 + q$. Da er ekstremalpunktet $(p, q)$.
   Teoriboksen skal vise *hvorfor*: $(x - p)^2 \ge 0$, så $f(x) \ge q$ når $a > 0$, med likhet bare for $x = p$ (kobling 1.2 og 2.4).
   Metode på talleksempel: $x^2 - 6x + 5 = (x - 3)^2 - 4$. Deretter med $a \ne 1$: $2x^2 + 8x + 3 = 2(x + 2)^2 - 5$.
   Verdimengde fra toppunktformen. Problemløsing: maksimalt areal og høyeste punkt (KM6).

## Ord
del 1: andregradsfunksjon, parabel, symmetrilinje, bunnpunkt/toppunkt, ekstremalpunkt
del 2: fullstendig kvadrat (gjenta), toppunktform, verdimengde (gjenta), maksimum/minimum

## Vanlige misoppfatninger som oppgavene skal fange
- Symmetrilinje $x = \frac{b}{2a}$ (fortegnsfeil)
- $f(x) = 2(x + 3)^2 - 1$ har bunnpunkt $(3, -1)$ (fortegnsfeil i $p$)
- $c$ er $y$-verdien til toppunktet
- Verdimengden oppgis som $x$-verdier, eller som $\langle q, \rightarrow\rangle$ når $q$ er med
- «Toppunkt» når $a > 0$ (skal være bunnpunkt)

## Eksempler
- Del 1: Eksempel 1: $f(x) = x^2 - 2x - 3$. Nullpunkter, symmetrilinje, bunnpunkt, skjæring med $y$-aksen, skisse. Eksempel 2: $g(x) = -x^2 + 4x - 5$ — ingen nullpunkter ($D < 0$), men toppunkt likevel.
- Del 2: Eksempel 1: $x^2 - 6x + 5$ på toppunktform, steg for steg. Eksempel 2: $2x^2 + 8x + 3$ (sett 2 utenfor først). Kontroller hvert steg ved å gange ut igjen.

## Nivå 3 og utfordringsarket — idéer
- Finn $f$ når bunnpunktet er $(2, -3)$ og grafen går gjennom $(0, 5)$. ($f(x) = 2(x-2)^2 - 3$)
- Hvor mange nullpunkter har $f(x) = x^2 - 2x + c$? Svar avhengig av $c$, og forklar med toppunktformen (bunnpunkt $(1, c - 1)$). Ikke samme oppgave som $k$-oppgaven i 2.3.
- Bevis (KM2): fullstendige kvadraters metode på $ax^2 + bx + c$ gir symmetrilinjen $x = -\frac{b}{2a}$ og $q = c - \frac{b^2}{4a}$. Forklar sammenhengen mellom $q$ og $D$.
- **Utforsk:** For hver $b$ har $f(x) = x^2 + bx$ et bunnpunkt. Finn bunnpunktet for $b = -4, -2, 0, 2, 4$. Hvilken kurve ligger bunnpunktene på? Bevis det. (Bunnpunkt $(-\frac{b}{2}, -\frac{b^2}{4})$ ligger på $y = -x^2$.) Gjerne med GeoGebra-glider (`\mh`).
- Areal: 40 m gjerde, rektangel inntil en vegg (vegg på én side). Største areal? (10 m × 20 m = 200 m²)
- Inntekt (tenkt eksempel): selger $400 - 20p$ enheter til pris $p$ kr. Hvilken pris gir størst inntekt? ($p = 10$, 2000 kr) Vurder om modellen gir mening for store $p$ (KM7).
- **Programmering (KM1):** Et program som regner ut $f(x)$ for $x$ fra $-5$ til $5$ med steg $0{,}1$ og finner den minste verdien. Sammenlign med eksakt svar fra toppunktformen. Hvorfor kan programmet bomme når bunnpunktet ikke ligger på et steg? Prøv med $f(x) = x^2 - 0{,}15x$.

## Hjelpemidler
Del 1 og 2 mest `\uh`. Én `\mh` med GeoGebra (tegn og sjekk). Programmering `\prog`.

## Spesielle ønsker
- Alle grafer: pgfplots, `axis lines=middle`, merkede akser, ingen rutenett, samme stil som 2.2 og 3.1.
- Skriv ekstremalpunkt som koordinater: «bunnpunkt $(1, -4)$».
