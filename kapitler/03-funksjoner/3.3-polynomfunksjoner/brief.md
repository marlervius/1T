# Brief 3.3 Polynomfunksjoner og polynomdivisjon

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 3 Funksjoner.
- Bygger på: 3.2 andregradsfunksjoner, 2.3 (nullproduktregelen, abc-formelen, faktorisering med nullpunkter), 2.4 fortegnslinje, 1.4 rasjonale uttrykk.
- Brukes senere i: 3.4 rasjonale funksjoner (asymptoter med polynomdivisjon), 4.4 drøfting.
- Kompetansemål:
  - **KM11** — «forklare polynomdivisjon og bruke det til å omskrive algebraiske uttrykk, drøfte funksjoner og løse ligninger og ulikheter»
  - **KM9** — «utforske og beskrive egenskapene ved polynomfunksjoner, rasjonale funksjoner, eksponentialfunksjoner og potensfunksjoner»
  Skriv `\kompetansemaal{11,9}`. Utfordringsarket dekker også KM1 og KM2.
  **KM11 sier «forklare»:** eleven skal kunne forklare hva polynomdivisjon er og hvorfor den virker, ikke bare utføre den.

## Deler
1. **Polynomdivisjon og faktorisering** — Teoriboksen viser vanlig divisjon med tall side om side med polynomdivisjon, for å forklare *hvorfor* metoden virker:
   $157 : 12 = 13$ rest $1$, altså $157 = 12 \cdot 13 + 1$, og $(x^2 + 5x + 7) : (x + 2) = x + 3$ rest $1$, altså $x^2 + 5x + 7 = (x+2)(x+3) + 1$.
   Bruk makroen `\polylongdiv{…}{…}` (se FORFATTERGUIDE) for alle oppstillinger.
   Kontroll: gang ut divisor · kvotient + rest.
   **Faktorsetningen:** hvis $P(a) = 0$, er $(x - a)$ en faktor i $P(x)$. *Hvorfor:* $P(x) = (x - a)Q(x) + r$; sett inn $x = a$, og få $r = P(a)$.
   Faktorisere et tredjegradspolynom: prøv heltallige divisorer i konstantleddet, divider, faktoriser andregradskvotienten (2.3).
2. **Polynomfunksjoner: grad, nullpunkter og forløp** — Grad og ledende ledd. Hva skjer med $f(x)$ når $x$ blir stor positiv/negativ (bestemmes av ledende ledd)?
   Fra faktorisert form til skisse: nullpunkter, fortegnslinje (2.4), skjæring med $y$-aksen. Dobbelt nullpunkt: grafen tangerer $x$-aksen.
   Polynomlikninger og -ulikheter av grad 3 (KM11 «løse ligninger og ulikheter»): faktoriser med polynomdivisjon, løs med nullproduktregel eller fortegnslinje.
   Figur: pgfplots-graf av et tredjegradspolynom med tre nullpunkter, og en med et dobbelt nullpunkt.

## Ord
del 1: polynom, grad, polynomdivisjon, kvotient, rest, faktorsetningen, divisor
del 2: polynomfunksjon, ledende ledd, dobbelt nullpunkt, forløp

## Vanlige misoppfatninger som oppgavene skal fange
- Glemmer å sette inn $0x^2$ for et manglende ledd ($x^3 - 7x + 6$)
- Fortegnsfeil i subtraksjonen i divisjonen
- $P(2) = 0$ gir faktoren $(x + 2)$
- Tror et tredjegradspolynom alltid har tre nullpunkter
- Deler begge sider av $x^3 = 4x$ på $x$ og mister $x = 0$ (kjent fra 2.3, ny kontekst)

## Eksempler
- Del 1: Eksempel 1: $(x^3 - 2x^2 - 5x + 6) : (x - 1)$, med kontroll. Eksempel 2: faktoriser $P(x) = x^3 - 7x + 6$ fullstendig (prøv $x = 1$, divider — merk $0x^2$, faktoriser kvotienten). Svar: $(x - 1)(x - 2)(x + 3)$.
- Del 2: Eksempel 1: skisse og fortegnslinje for $f(x) = (x + 2)(x - 1)(x - 3)$. Eksempel 2: løs ulikheten $x^3 - 7x + 6 > 0$ med faktoriseringen fra del 1.

## Nivå 3 og utfordringsarket — idéer
- Forklar (KM11): hvorfor gir $P(a)$ resten når vi deler på $(x - a)$? Bruk $P(x) = (x-a)Q(x) + r$.
- Finn $k$ slik at $(x - 2)$ er en faktor i $x^3 + kx^2 - 4x + 4$. ($k = -1$; deretter faktoriser.)
- Lag selv et tredjegradspolynom med nullpunktene $-1$, $2$ og $3$ og $f(0) = 12$. Hvor mange finnes?
- Alltid / noen ganger / aldri: «Et tredjegradspolynom har minst ett nullpunkt.» (Alltid — begrunn med ledende ledd og forløp.) «Et fjerdegradspolynom har minst ett nullpunkt.» (Noen ganger.)
- Divisjon som ikke går opp: skriv $\frac{x^3 + 2}{x - 1}$ som polynom pluss brøk — bro til 3.4.
- **Programmering (KM1):** Et program som finner alle heltallige nullpunkter for et polynom med heltallige koeffisienter ved å prøve divisorene i konstantleddet. Hvorfor holder det å prøve divisorene? (Begrunn på utfordringsarket, KM2.)
- **Bevis (KM2):** Hvis heltallet $a$ er et nullpunkt for $x^3 + bx^2 + cx + d$ med heltallige koeffisienter, går $a$ opp i $d$. (Flytt $d$ over og sett $a$ utenfor.)
- Kontekst (`\mh`): en eske lages av en papp 20 cm × 30 cm ved å klippe bort kvadrater med side $x$ i hjørnene. $V(x) = x(20 - 2x)(30 - 2x)$. Definisjonsmengde? For hvilke $x$ er volumet 1000 cm³? (GeoGebra; tenk gjennom definisjonsmengden.) Største volum finnes i 4.4 — si det.

## Hjelpemidler
Del 1 og 2 mest `\uh`. Eskeoppgaven `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Alle polynomdivisjoner med `\polylongdiv`. Ingen håndlagde tabeller.
- Fortegnslinjer i samme stil som i 2.4.
- Grafer i samme stil som 3.1 og 3.2.
