# Brief 3.5 Eksponential- og potensfunksjoner

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 3 Funksjoner.
- Bygger på: 1.1 potenser, 1.3 brøkeksponenter (definert for grunntall $> 0$), 3.1 lineære funksjoner, 3.4 rasjonale funksjoner ($\frac{1}{x}$, asymptoter).
- Brukes senere i: 3.6 modellering og regresjon.
- Kompetansemål:
  - **KM9** — «utforske og beskrive egenskapene ved polynomfunksjoner, rasjonale funksjoner, eksponentialfunksjoner og potensfunksjoner»
  - **KM7** — «modellere situasjoner knyttet til ulike temaer, drøfte, presentere og forklare resultatene og argumentere for om modellene er gyldige»
  Skriv `\kompetansemaal{9,7}`. Utfordringsarket dekker også KM1 og KM2.
  **Logaritmer står ikke i kompetansemålene for 1T.** Likninger som $1{,}05^x = 2$ løses grafisk eller med digitale verktøy (`\mh`), eller med samme grunntall når det går ($2^x = 32$). Ikke innfør lg.

## Deler
1. **Eksponentialfunksjoner** — $f(x) = a \cdot b^x$, $a > 0$, $b > 0$. $a$ er startverdi, $b$ vekstfaktor.
   Teoriboksen skal vise *hvorfor* forskjellen til lineær vekst: lineær — like store *tillegg* per steg; eksponentiell — samme *faktor* per steg. Tabell med to kolonner side om side (f.eks. $100 + 10x$ og $100 \cdot 1{,}1^x$).
   Vekstfaktor fra prosent: $b = 1 + \frac{p}{100}$ (vekst), $b = 1 - \frac{p}{100}$ (nedgang).
   Graf: $b > 1$ voksende, $0 < b < 1$ avtagende, $y = 0$ er horisontal asymptote, $f(0) = a$.
   Doblingstid og halveringstid: tid før verdien dobles/halveres — finnes grafisk/digitalt, eller eksakt når tallene passer.
2. **Potensfunksjoner** — $f(x) = a \cdot x^b$. Eksempler: $x^2$, $x^3$, $\sqrt{x} = x^{\tfrac12}$, $\frac{1}{x} = x^{-1}$ (kobling 3.4).
   Definisjonsmengde: for brøkeksponent bruker vi $x > 0$ (som i 1.3).
   Kjennetegn (KM9): når $x$ dobles, ganges $f(x)$ med $2^b$. Sammenlign med eksponentialfunksjonen, der *tillegg* i $x$ gir fast faktor. Teoriboks: tabell som viser de tre typene (lineær: fast differanse; eksponentiell: fast forhold ved fast tillegg i $x$; potens: fast forhold ved fast *faktor* i $x$).
   Grafer: $x^{\tfrac12}$, $x^1$, $x^2$ for $x \ge 0$ i samme koordinatsystem — hvilken er størst for $0 < x < 1$ og for $x > 1$?

## Ord
del 1: eksponentialfunksjon, vekstfaktor, startverdi, doblingstid, halveringstid
del 2: potensfunksjon, eksponent (gjenta), proporsjonal (gjenta), modell

## Vanlige misoppfatninger som oppgavene skal fange
- 5 % vekst gir vekstfaktor $0{,}05$ eller $1{,}5$; 20 % nedgang gir $0{,}2$
- «5 % per år i 10 år er 50 %»
- Blander $2^x$ og $x^2$
- $a \cdot b^x = (ab)^x$
- Tror en eksponentialfunksjon med $0 < b < 1$ blir negativ etter hvert

## Eksempler
- Del 1: Eksempel 1: et beløp på 20 000 kr med 4 % rente per år: $f(x) = 20\,000 \cdot 1{,}04^x$. Verdi etter 5 år (`\mh`), tolk $a$ og $b$. Eksempel 2: finn $f(x) = a \cdot b^x$ gjennom $(2, 12)$ og $(5, 96)$: $b^3 = 8$, $b = 2$, $a = 3$ (`\uh`, kontroller).
- Del 2: Eksempel 1: $f(x) = 3x^2$: hva skjer med $f(x)$ når $x$ dobles? Tredobles? Vis med regning ($3(2x)^2 = 4 \cdot 3x^2$). Eksempel 2: avgjør fra en tabell om dataene er lineære, eksponentielle eller en potensfunksjon.

## Nivå 3 og utfordringsarket — idéer
- Avgjør modelltype fra tre tabeller og begrunn med differanser/forhold.
- Halveringstid: en medisin har halveringstid 6 timer (tenkt verdi). Skriv funksjonen for mengden etter $t$ timer når startdosen er 400 mg: $f(t) = 400 \cdot \left(\frac12\right)^{\tfrac{t}{6}}$. Hvor mye er igjen etter ett døgn? (25 mg, `\uh`.)
- Alltid / noen ganger / aldri: «$2^x > x^2$» (noen ganger — sjekk $x = 3$ og $x = 5$; begge like ved $x = 2$ og $x = 4$). Bruk GeoGebra for å se hele bildet.
- Lag selv en potensfunksjon der $f(2) = 12$ og $f(4) = 48$. ($b = 2$, $a = 3$.) Kan det også være en eksponentialfunksjon gjennom de samme punktene? (Ja: $b^2 = 4$, $b = 2$, $a = 3$: $3 \cdot 2^x$.) Hva skjer for $x = 6$? (108 mot 192.) Hvilke data trengs for å skille?
- **Programmering (KM1):** Et program som finner doblingstiden (helt antall år) for $p = 1, 2, \ldots, 10$ % rente med en `while`-løkke, og sammenligner med «72-regelen» $\frac{72}{p}$. Hvor godt stemmer regelen? (Ikke påstå at regelen er eksakt.)
- **Bevis (KM2):** Vis at for $f(x) = a \cdot b^x$ er $\frac{f(x+1)}{f(x)} = b$ for alle $x$, og at for $g(x) = ax^k$ er $\frac{g(2x)}{g(x)} = 2^k$. Forklar hva dette betyr for tabeller.
- **Modell (KM7, `\mh`):** Kleibers lov sier at energiforbruket til et pattedyr er omtrent proporsjonalt med $m^{\tfrac34}$, der $m$ er massen. Hvor mye mer energi bruker et dyr som er 16 ganger så tungt? ($16^{\tfrac34} = 8$.) Drøft: hvorfor er dette mindre enn 16, og hva begrenser modellen? Ikke bruk oppdiktede «målte» data — si at det er en modell.

## Hjelpemidler
Del 1: rentesrente og doblingstid med `\mh`; vekstfaktor og eksakte oppgaver `\uh`. Del 2 mest `\uh`. Programmering `\prog`.

## Spesielle ønsker
- Alle tall i kontekstoppgaver er tenkte eller avrundede. Skriv «tenkt eksempel» der det kunne misforstås som fakta.
- Grafer: pgfplots, samme stil som 3.1–3.4.
- Svar med kalkulator: oppgi antall desimaler eller gjeldende siffer i oppgaveteksten.
