# Brief 5.2 Arealsetningen

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 5 Trigonometri.
- Bygger på: 5.1 (sinus i rettvinklet trekant, enhetssirkelen, $\sin(180^\circ - v) = \sin v$, to løsninger av $\sin v = k$), arealformelen $\frac{g \cdot h}{2}$.
- Brukes senere i: 5.3 (sinussetningen bevises med arealsetningen), 5.5.
- Kompetansemål:
  - **KM13** — «begrunne sinus-, cosinus- og arealsetningen»
  - **KM12** — «gjøre rede for definisjonene av sinus, cosinus og tangens og bruke trigonometri til å beregne lengder, vinkler og arealer i vilkårlige trekanter»
  Skriv `\kompetansemaal{13,12}`. Utfordringsarket dekker også KM1 og KM2.
  **«Begrunne»:** beviset skal stå i teoriboksen, og minst én oppgave ber eleven gjennomføre eller forklare beviset selv.

## Deler
1. **Arealsetningen og beviset** — $T = \frac12 ab \sin C$. Notasjon: side $a$ står overfor vinkel $A$ osv. (figur).
   Bevis i teoriboksen for **spiss** vinkel $C$: høyden fra $A$ er $h = b \sin C$ (rettvinklet trekant), så $T = \frac12 a h = \frac12 ab\sin C$.
   Bevis for **stump** vinkel $C$: høyden faller utenfor trekanten; $h = b\sin(180^\circ - C) = b\sin C$ (fra 5.1). To figurer side om side.
   Rett vinkel: $\sin 90^\circ = 1$ gir den kjente formelen — vis at setningen er en generalisering.
2. **Bruke arealsetningen** — Finne areal (`\mh` og eksakte `\uh` med $30^\circ$, $45^\circ$, $60^\circ$, $120^\circ$, $150^\circ$). Finne en side når arealet er kjent. Finne en vinkel når arealet er kjent: **to mulige vinkler** ($v$ og $180^\circ - v$) — begge kan gi en trekant. Teoriboks med figur av de to trekantene.

## Ord
del 1: arealsetningen, høyde, spiss vinkel (gjenta), stump vinkel (gjenta)
del 2: mellomliggende vinkel, to løsninger

## Vanlige misoppfatninger som oppgavene skal fange
- Bruker en vinkel som ikke ligger mellom de to sidene
- Glemmer $\frac12$
- Finner bare den spisse vinkelen når arealet er gitt
- Tror at arealsetningen bare gjelder for spisse vinkler

## Eksempler
- Del 1: Eksempel: areal med $a = 6$, $b = 5$, $C = 30^\circ$ (eksakt, $T = 7{,}5$). Kontroll med den stumpe vinkelen $150^\circ$: samme areal — hvorfor?
- Del 2: Eksempel 1: finn $C$ når $a = 8$, $b = 5$ og $T = 10\sqrt3$ ($\sin C = \frac{\sqrt3}{2}$, $C = 60^\circ$ eller $120^\circ$). Tegn begge trekantene. Eksempel 2: areal av en firkant ved å dele den i to trekanter (`\mh`).

## Nivå 3 og utfordringsarket — idéer
- Av alle trekanter med to sider 6 og 8, hvilken har størst areal? Begrunn. (Rett vinkel, 24.)
- Gjelder det generelt? «Dobler vi vinkelen mellom to sider, dobles arealet.» Svar med et moteksempel med eksakte verdier ($30^\circ \to 60^\circ$: $\frac12 \to \frac{\sqrt3}{2}$, ikke 1). **Ikke** be om «aldri» — det krever formelen for $\sin 2v$, som ikke er med i 1T.
- Baklengs: lag en trekant med areal 12 og en vinkel på $30^\circ$. Hvor mange finnes?
- **Bevis (KM2):** areal av et parallellogram med sider $a$, $b$ og vinkel $v$ er $ab\sin v$.
- **Utfordring:** areal av en regulær sekskant med side 4 (seks likesidede trekanter, eksakt $24\sqrt3$). Regulær $n$-kant innskrevet i en sirkel med radius 1: $T_n = \frac n2 \sin\frac{360^\circ}{n}$.
- **Programmering (KM1):** regn ut $T_n$ for $n = 6, 12, 24, \ldots, 1536$. Hvilket tall nærmer det seg, og hvorfor? (π — si at eleven kan sammenligne med `math.pi`.)

## Hjelpemidler
Bevis og eksakte verdier `\uh`. Desimalsvar `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Figurer med TikZ, hjørner $A$, $B$, $C$, sider $a$, $b$, $c$ overfor, høyden stiplet, rett vinkel markert.
- Bruk `^\circ` for grader.
