# Brief 4.3 Derivasjonsregler for polynom

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 4 Vekstfart og derivasjon.
- Bygger på: 4.2 (definisjonen, $(x^n)' = nx^{n-1}$, $(f+g)' = f'+g'$, $(kf)' = kf'$), 4.1 (vekstfart i kontekst), 3.1 (linje gjennom punkt med gitt stigningstall), 1.2 (gange ut).
- Brukes senere i: 4.4 drøfting.
- Kompetansemål: **KM10** — «bruke gjennomsnittlig og momentan vekstfart i konkrete eksempler og gjøre rede for den deriverte».
  Skriv `\kompetansemaal{10}`. Utfordringsarket dekker også KM1 og KM2.

## Deler
1. **Derivere polynomer** — Reglene fra 4.2 samlet i én tabell. Teoriboksen skal minne om *hvor* hver regel kommer fra (én linje per regel, henvis til 4.2).
   Omskriv før du deriverer: gang ut $(2x - 1)^2$ først; forkort $\frac{x^3 - 2x}{x}$ til $x^2 - 2$ ($x \neq 0$) først.
   **Viktig grense:** produktregelen og kjerneregelen er *ikke* med i 1T. Derfor: gang alltid ut produkter før derivasjon. Si det i teoriboksen.
   Tolkning i kontekst (KM10): $s(t)$ er strekning, $s'(t)$ er fart; $K(x)$ er kostnad, $K'(x)$ er kostnaden for én enhet til (omtrent). Alltid med enhet.
2. **Tangentlikning** — Tangenten i $x = a$ har stigningstall $f'(a)$ og går gjennom $(a, f(a))$: $y - f(a) = f'(a)(x - a)$. Teoriboksen: *hvorfor* — dette er ettpunktsformelen for en linje (kobling 3.1 «finn linje gjennom ett punkt med kjent stigningstall»).
   Finne punkter der tangenten har et gitt stigningstall (løs $f'(x) = k$, kobling 2.3), f.eks. vannrett tangent ($f'(x) = 0$) eller tangent parallell med en gitt linje.
   Figur (pgfplots): graf med tangent i ett punkt.

## Ord
del 1: derivasjonsregel (gjenta), polynom (gjenta), fart, momentan (gjenta)
del 2: tangentlikning, ettpunktsformelen, parallell, vannrett tangent

## Vanlige misoppfatninger som oppgavene skal fange
- $(x^3)' = 3x^3$ eller $(x^3)' = 3x^4$
- $(5)' = 5$ og $(5x)' = 5x$
- Deriverer et produkt som produktet av de deriverte: $\big((x^2 + 1)(x - 2)\big)' = 2x \cdot 1$ (gjelder ikke generelt — moteksempel)
- Tangentlikning med $f'(x)$ i stedet for tallet $f'(a)$, eller med $f(a)$ som stigningstall
- Tolker $s'(3)$ som strekningen etter 3 sekunder

## Eksempler
- Del 1: Eksempel 1: $f(x) = 2x^3 - 5x^2 + 4$. Finn $f'(x)$ og $f'(2)$, tolk $f'(2)$ som stigningstall. Eksempel 2: $g(x) = (2x - 1)^2$ — gang ut først, deriver, kontroller med $g'(1)$ fra en tabell med små $h$ (kobling 4.1), eller fra definisjonen.
- Del 2: Eksempel 1: tangenten til $f(x) = x^2 - 3x$ i $x = 1$: $f(1) = -2$, $f'(1) = -1$, $y = -x - 1$. Kontroller at punktet ligger på linjen. Eksempel 2: finn punktet der tangenten er vannrett.

## Nivå 3 og utfordringsarket — idéer
- Finn $a$ og $b$ slik at $f(x) = ax^2 + bx$ har $f'(1) = 4$ og $f(3) = 15$ (likningssystem, kobling 2.2). Løsning: $a = 1$, $b = 2$.
- **Utfordring (oppdaget av arkitekten da briefen ble kontrollert):** «Ola vil finne $a$ og $b$ slik at $f(x) = ax^2 + bx$ har $f'(1) = 4$ og $f(2) = 10$. Han finner ingen løsning. Forklar hvorfor.» (Det gjelder alltid at $f(2) = 4a + 2b = 2f'(1)$, så kravene motsier hverandre.) For hvilke verdier av $f(2)$ ville det fungert, og hvor mange løsninger er det da?
- Bevis (KM2): tangentene til $y = x^2$ i $x = a$ og $x = -a$ ($a \neq 0$) skjærer hverandre på $y$-aksen. Hvor? ($(0, -a^2)$)
- Alltid / noen ganger / aldri: «To ulike punkter på grafen til et andregradspolynom har parallelle tangenter.» (Aldri: $f'$ er lineær og ikke konstant.) «… til et tredjegradspolynom.» (Noen ganger/ofte.)
- Baklengs: finn et polynom $f$ med $f'(x) = 6x^2 - 2$ og $f(1) = 3$.
- **Utfordring:** tangenter til $y = x^2$ som går gjennom punktet $(1, -3)$ utenfor grafen. (Tangentpunkt $a$: $a^2 - 2a - 3 = 0$, $a = 3$ eller $a = -1$; tangenter $y = 6x - 9$ og $y = -2x - 1$.)
- **Kontekst (`\mh`):** høyden til en ball $h(t) = 20t - 5t^2$ (meter, sekunder; tenkt modell). Fart $h'(t)$ med enhet. Når er farten 0? Sammenlign med toppunktet fra 3.2 — samme svar, to metoder.
- Kostnad (tenkt): $K(x) = 0{,}01x^2 + 20x + 5000$. Tolk $K'(100)$ med enhet, og sammenlign med $K(101) - K(100)$.
- **Programmering (KM1):** et program som regner ut $f'(a)$ med en symmetrisk differansekvotient og skriver ut tangentlikningen $y = mx + c$ (avrundet). Sammenlign med eksakt svar for et polynom.

## Hjelpemidler
Del 1 og 2 mest `\uh`. Kontekst med `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Skriv tangentlikningen ferdig på formen $y = mx + c$ i alle svar.
- Ingen produktregel, kjerneregel eller derivasjon av $e^x$ / $\ln x$.
