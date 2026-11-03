# Brief 5.4 Cosinussetningen

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 5 Trigonometri.
- Bygger på: 5.1 (cosinus, enhetssirkelen, $\cos(180^\circ - v) = -\cos v$), 5.3 sinussetningen, Pytagoras, 2.3 andregradslikninger.
- Brukes senere i: 5.5 sammensatte problemer.
- Kompetansemål:
  - **KM13** — «begrunne sinus-, cosinus- og arealsetningen»
  - **KM12** — «gjøre rede for definisjonene av sinus, cosinus og tangens og bruke trigonometri til å beregne lengder, vinkler og arealer i vilkårlige trekanter»
  Skriv `\kompetansemaal{13,12}`. Utfordringsarket dekker også KM1 og KM2.

## Deler
1. **Cosinussetningen og beviset** — $a^2 = b^2 + c^2 - 2bc\cos A$.
   Bevis i teoriboksen: høyden $h$ fra $C$ deler $c$ i $x$ og $c - x$, der $x = b\cos A$. Pytagoras i begge trekantene: $b^2 = h^2 + x^2$ og $a^2 = h^2 + (c-x)^2$. Trekk fra og sett inn. Vis hvert steg.
   Stump vinkel $A$: høyden faller utenfor, men regnestykket gir samme formel fordi $\cos A < 0$ (kort figur og forklaring).
   Spesialtilfelle: $A = 90^\circ$ gir Pytagoras — cosinussetningen er en generalisering.
   Bruk: SVS (finn side) og SSS (finn vinkel: $\cos A = \frac{b^2 + c^2 - a^2}{2bc}$).
2. **Velg riktig setning** — Tabell: hva er kjent → hvilken setning. SSS → cosinussetningen; SVS → cosinussetningen; SVV → sinussetningen; SSV → sinussetningen (tvetydig) *eller* cosinussetningen, som da gir en andregradslikning (kobling 2.3) — to positive løsninger svarer til to trekanter.
   Areal: arealsetningen når en vinkel er kjent.
   Strategi: tegn, marker kjent og ukjent, velg setning, kontroller (vinkelsum, største side overfor største vinkel).

## Ord
del 1: cosinussetningen, generalisering, mellomliggende vinkel (gjenta)
del 2: SSS, SVS, SVV, SSV, strategi

## Vanlige misoppfatninger som oppgavene skal fange
- $a^2 = b^2 + c^2 - 2bc\cos A$ regnes som $(b^2 + c^2 - 2bc)\cos A$
- Glemmer å ta kvadratroten til slutt
- Fortegnsfeil når $\cos A < 0$ (stump vinkel: $-2bc\cos A$ blir positivt)
- Bruker sinussetningen på SSS
- Tror cosinussetningen bare gjelder for spisse vinkler

## Eksempler
- Del 1: Eksempel 1 (SVS, eksakt): $b = 3$, $c = 5$, $A = 120^\circ$ gir $a^2 = 49$, $a = 7$. Eksempel 2 (SSS, eksakt): sidene 5, 7, 8 — vinkelen overfor 7 er $60^\circ$ ($\cos = \frac{25 + 64 - 49}{80} = \frac12$).
- Del 2: Eksempel: samme SSV-oppgave som i 5.3 ($A = 30^\circ$, $a = 5$, $b = 8$) løst med cosinussetningen: $25 = 64 + c^2 - 8\sqrt3\, c$, to positive løsninger for $c$ — samme to trekanter. Sammenlign metodene.

## Nivå 3 og utfordringsarket — idéer
- Spiss, rett eller stump? Avgjør ut fra sidene alene ved å se på fortegnet til $b^2 + c^2 - a^2$ for den lengste siden $a$. Bevis at metoden virker.
- Alltid / noen ganger / aldri: «Hvis $a^2 > b^2 + c^2$, er vinkel $A$ stump.» (Alltid.)
- Baklengs: lag en trekant med heltallige sider og en vinkel på nøyaktig $60^\circ$ (f.eks. 3, 7, 8 eller 5, 7, 8). Hvordan fant du den?
- **Bevis (KM2):** parallellogramloven — summen av kvadratene av diagonalene er lik summen av kvadratene av de fire sidene. (Cosinussetningen på to trekanter, $\cos(180^\circ - v) = -\cos v$.)
- **Programmering (KM1):** et program som tar tre sider og (1) sjekker om de kan danne en trekant (trekantulikheten), (2) finner alle vinklene, (3) sier om trekanten er spiss, rett eller stump. Test på 3-4-5, 5-7-8 og 1-2-4.
- Praktisk (`\mh`, tenkt): avstanden over et vann mellom to punkter $P$ og $Q$, målt fra et tredje punkt $R$ med $RP = 420$ m, $RQ = 310$ m og vinkel $R = 72^\circ$.

## Hjelpemidler
Bevis og eksakte verdier `\uh`. Kalkulatoroppgaver `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Samme figurstil og notasjon som 5.2 og 5.3.
- I «velg riktig setning» skal fasiten begrunne valget, ikke bare regne.
