# Brief 2.4 Ulikheter

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 2 Likninger og ulikheter. Siste seksjon i kapittel 2.
- Bygger på: 2.1 likninger, 2.3 andregradslikninger (faktorisering, nullpunkter, diskriminant), 1.2 kvadratsetningene.
- Brukes senere i: 3.2 andregradsfunksjoner, 3.4 rasjonale ulikheter, 4.4 fortegnslinje for $f'$.
- Kompetansemål:
  - **KM4** — «utforske strategier for å løse ligninger, ligningssystemer og ulikheter og argumentere for tenkemåtene sine»
  - **KM6** — «utforske sammenhenger mellom andregradsligninger og andregradsulikheter, andregradsfunksjoner og kvadratsetningene og bruke sammenhengene i problemløsing»
  Skriv `\kompetansemaal{4,6}`. Utfordringsarket dekker også KM1 og KM2.

## Deler
1. **Lineære ulikheter** — Regler: legg til/trekk fra på begge sider; gang/del med positivt tall; **snu ulikhetstegnet** ved negativt tall.
   Teoriboksen skal vise *hvorfor* tegnet snus: $2 < 3$, men $-2 > -3$ (tallinje med speiling om 0).
   Svar på tre måter: ulikhet ($x > 2$), tallinje (fylt/åpen ring), intervall. **Norsk intervallnotasjon:** $\langle 2, \rightarrow\rangle$, $[-1, 4\rangle$, $\langle\leftarrow, 3]$. Bruk `\langle`, `\rangle`, `\rightarrow`, `\leftarrow`.
   Dobbel ulikhet: $-1 < 2x + 3 \le 7$.
2. **Andregradsulikheter med fortegnslinje** — Metode: samle alt på én side, faktoriser (2.3), fortegnslinje for hver faktor, fortegnslinje for produktet, les av.
   Teoriboksen: fortegnslinje som TikZ-figur (faktorene på hver sin linje, heltrukket for positiv, stiplet for negativ, slik det er vanlig i norske læreverk) for $(x+1)(x-3) < 0$.
   Kobling til grafen (KM6): ulikheten $x^2 - 2x - 3 < 0$ spør hvor parabelen ligger under $x$-aksen. Vis en liten pgfplots-figur ved siden av fortegnslinjen.
   Spesialtilfeller: $D < 0$ (uttrykket har samme fortegn for alle $x$), fullstendig kvadrat ($(x-2)^2 \ge 0$ alltid sann, $(x-2)^2 < 0$ aldri).

## Ord
del 1: ulikhet, ulikhetstegn, intervall, tallinje, åpent/lukket intervall
del 2: fortegnslinje, faktor (gjenta), nullpunkt (gjenta), andregradsulikhet

## Vanlige misoppfatninger som oppgavene skal fange
- Deler på et negativt tall uten å snu tegnet
- $x^2 > 4$ gir bare $x > 2$; $x^2 < 4$ gir $x < \pm 2$
- Ganger begge sider med $x$ (ukjent fortegn) eller deler på en faktor som kan være negativ
- Løser $(x-1)(x-3) < 0$ som en likning og gjetter intervallet
- Feil klammer: $\langle 2, 5]$ når 5 ikke er med

## Eksempler
- Del 1: Eksempel 1: $5 - 3x \ge 11$ (del på $-3$, snu). Eksempel 2: dobbel ulikhet $-1 < 2x + 3 \le 7$ med svar på tallinje og som intervall.
- Del 2: Eksempel 1: $x^2 - 2x - 3 < 0$ med fortegnslinje og graf. Eksempel 2: $2x^2 \ge 8x$ (samle på én side, felles faktor; ikke del på $x$).

## Nivå 3 og utfordringsarket — idéer
- For hvilke $k$ er $x^2 + kx + 4 > 0$ for alle $x$? ($-4 < k < 4$, via $D < 0$; kobling 2.3.)
- Alltid / noen ganger / aldri: $x^2 > x$; $(x-3)^2 \ge 0$; $x^2 + 1 < 0$; $-x^2 \le 0$
- Lag selv en andregradsulikhet med løsningsmengde $[-2, 5]$, og en med løsningsmengde «alle tall unntatt 3».
- Finn den første feilen: en elev deler $x^2 < 3x$ på $x$ og får $x < 3$.
- **Bevis (KM2):** Vis at $\frac{a+b}{2} \ge \sqrt{ab}$ for $a, b \ge 0$ (start med $(\sqrt a - \sqrt b)^2 \ge 0$). Når er det likhet? Kobling 1.2 og 1.3. Bruk resultatet: av alle rektangler med omkrets 20, hvilket har størst areal?
- Rasjonal ulikhet (bare utfordringsarket, forsmak på 3.4): $\frac{x-1}{x+2} \ge 0$ med fortegnslinje — hvorfor er $x = -2$ aldri med?
- **Tekst (KM3, `\mh`):** To mobilabonnement: A koster 99 kr/mnd + 15 kr per GB, B koster 249 kr/mnd fast. (Grense: 10 GB.) Når er A billigst? Svar som ulikhet og i en setning.
- Kast: $h(t) = 20t - 5t^2$. I hvilket tidsrom er ballen høyere enn 15 m? ($1 < t < 3$; kobling til 2.3.)
- **Programmering (KM1):** Et program som tester $x = -10, -9{,}5, \ldots, 10$ og skriver ut hvilke $x$ som oppfyller $x^2 - 2x - 3 < 0$. Spørsmål: Hvorfor gir ikke programmet hele svaret? Hva kan programmet gå glipp av? (Endepunkter, smale intervaller.)

## Hjelpemidler
Del 1 og 2 mest `\uh`. Én `\mh` tekstoppgave i del 1 eller 2. Programmering `\prog`.

## Spesielle ønsker
- Fortegnslinjene skal ha samme utseende i alle eksempler, oppgaver og fasit. Lag dem med TikZ: én rad per faktor, en vertikal linje ved hvert nullpunkt, `0` markert, heltrukket strek for positivt og stiplet for negativt.
- I fasiten: gi svaret både som ulikhet og intervall for nivå 1–2.
