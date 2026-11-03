# Brief 5.5 Sammensatte problemer

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 5 Trigonometri. Siste seksjon i læreverket.
- Bygger på: 5.1–5.4 (alle setningene), 2.3 andregradslikninger, 4.4 optimering (én oppgave).
- Kompetansemål: **KM14** — «bruke trigonometri til å analysere og løse sammensatte teoretiske og praktiske problemer med lengder, vinkler og arealer».
  Skriv `\kompetansemaal{14}`. Utfordringsarket dekker også KM1, KM2 og KM7.
  **«Sammensatte»:** hver oppgave på nivå 2–3 skal kreve minst to trekanter eller to setninger.

## Deler
1. **Teoretiske problemer** — Figurer med flere trekanter: firkant med diagonal, trekant med en linje fra et hjørne til motstående side, regulære mangekanter.
   Teoriboksen: en strategi i fem punkter (tegn og merk, finn en trekant med nok opplysninger, regn ut det du trenger videre, gå til neste trekant, kontroller) og et lite flytskjema eller en nummerert liste.
   Eksakte svar der det går (vinkler $30^\circ$, $45^\circ$, $60^\circ$, $120^\circ$, $135^\circ$, $150^\circ$).
2. **Praktiske problemer** — Oppmåling (bredde av en elv, høyde av et fjell eller en mast fra to punkter), navigasjon med kurs i grader fra nord (forklar kort og tegn), takkonstruksjon. Alle tall tenkte. `\mh`.
   Vurdering (KM7): hvor nøyaktig er svaret når målingene har en usikkerhet? (En oppgave der vinkelen endres med $1^\circ$ og eleven ser hvor mye svaret endres.)

## Ord
del 1: diagonal, regulær mangekant, strategi (gjenta), eksakt (gjenta)
del 2: kurs, oppmåling, høydevinkel, usikkerhet

## Vanlige misoppfatninger som oppgavene skal fange
- Bruker sin/cos/tan-definisjonene i en trekant som ikke er rettvinklet
- Avrunder underveis og får feil svar til slutt (bruk lagrede verdier på kalkulatoren)
- Bruker en vinkel fra feil trekant
- Tolker kurs som vinkel fra $x$-aksen

## Eksempler
- Del 1: Eksempel: firkant $ABCD$ med $AB = 4$, $AD = 4$, $\angle A = 60^\circ$, $BC = 3$, $\angle DBC = 90^\circ$ — finn $BD$ (likesidet: 4), deretter $CD$ ($5$) og arealet ($4\sqrt3 + 6$). Eksakt, `\uh`.
- Del 2: Eksempel: høyden av en mast målt fra to punkter på bakken (tenkte tall, `\mh`) — sinussetningen i den skjeve trekanten, deretter sinus i den rettvinklede.

## Nivå 3 og utfordringsarket — idéer
- Regulær åttekant innskrevet i en sirkel med radius 1: eksakt areal ($2\sqrt2$) og omkrets (cosinussetningen gir siden $\sqrt{2 - \sqrt2}$).
- Lag selv et sammensatt problem med to trekanter der svaret blir et helt tall. Bytt med en medelev.
- Kobling til 2.3: en SSV-oppgave løst med cosinussetningen gir en andregradslikning. Tolk løsningene (to, én eller ingen trekanter) og sammenlign med svingarmen fra 5.3.
- **Usikkerhet (KM7):** høyden av en mast med høydevinkel $40^\circ \pm 1^\circ$ fra 50 m. Hvor stort blir spennet i svaret?
- **Programmering (KM1):** en «trekantløser» som tar tre kjente størrelser (SSS, SVS, SVV eller SSV) og finner resten, med alle tilfeller i SSV. Gi et skjelett med funksjonene fra 5.3 og 5.4.
- **Bevis (KM2):** Herons formel $T = \sqrt{s(s-a)(s-b)(s-c)}$ som «les og forstå»: gi hovedstegene (arealsetningen, $\sin^2 + \cos^2 = 1$, cosinussetningen, konjugatsetningen) og la eleven fylle ut og forklare. Test på 5, 7, 8 ($T = 10\sqrt3$).

## Hjelpemidler
Del 1 mest `\uh` (eksakt). Del 2 `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Hver figur skal ha merkede kjente størrelser og en markert ukjent.
- Fasiten viser strategien: «Trekant $ABD$: SVS → cosinussetningen gir $BD$. Trekant $BCD$: …».
- Siste side på utfordringsarket: en kort «Hele 1T»-oppgave som kombinerer trigonometri med en annen del av kurset (f.eks. andregradslikning fra cosinussetningen, eller areal som funksjon av en side med toppunkt fra 3.2).
