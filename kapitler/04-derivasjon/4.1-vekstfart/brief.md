# Brief 4.1 Gjennomsnittlig og momentan vekstfart

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 4 Vekstfart og derivasjon. Første seksjon.
- Bygger på: 3.1 stigningstall ($\frac{\Delta y}{\Delta x}$, enhet), 3.2 andregradsfunksjoner, 3.5 eksponentialfunksjoner, 3.6 modeller.
- Brukes senere i: 4.2 den deriverte (grenseverdi), 4.3, 4.4.
- Kompetansemål: **KM10** — «bruke gjennomsnittlig og momentan vekstfart i konkrete eksempler og gjøre rede for den deriverte».
  Skriv `\kompetansemaal{10}`. Utfordringsarket dekker også KM1 og KM2.
  **Vekt på «i konkrete eksempler»:** hver del skal ha minst to oppgaver med kontekst og enhet.

## Deler
1. **Gjennomsnittlig vekstfart** — $\frac{f(b) - f(a)}{b - a}$ på intervallet $[a, b]$. Teoriboksen: det er stigningstallet til sekanten gjennom $(a, f(a))$ og $(b, f(b))$ (kobling 3.1). Figur (pgfplots): graf med sekant og stigningstrekant.
   Enhet: enheten til $f$ per enhet til $x$ (km per time, kr per år, °C per time).
   Fra formel, tabell og graf. Negativ vekstfart: funksjonen synker i snitt.
2. **Momentan vekstfart** — Vekstfarten *i et punkt*: stigningstallet til tangenten. Figur: graf med tangent i ett punkt og to sekanter som nærmer seg tangenten.
   To måter: (1) tegn tangenten og les av stigningstallet (unøyaktig), (2) regn gjennomsnittlig vekstfart på stadig mindre intervaller $[x, x + h]$ ($h = 1;\ 0{,}1;\ 0{,}01$) og se hvilket tall den nærmer seg (tabell). Teoriboksen: *hvorfor* sekanten nærmer seg tangenten når $h$ blir liten.
   Ikke innfør $f'(x)$ eller grenseverdinotasjon ennå — det kommer i 4.2. Si «vi skal gi dette et navn i 4.2».

## Ord
del 1: vekstfart, gjennomsnittlig vekstfart, sekant, intervall (gjenta)
del 2: momentan vekstfart, tangent, tilnærming, nærme seg

## Vanlige misoppfatninger som oppgavene skal fange
- Gjennomsnittlig vekstfart som gjennomsnittet av funksjonsverdiene: $\frac{f(a) + f(b)}{2}$
- Momentan vekstfart forveksles med funksjonsverdien $f(x)$
- Mangler enhet, eller bytter om enhetene (timer per km)
- $\Delta x$ regnes «feil vei» (fortegnsfeil)
- Tror at gjennomsnittlig vekstfart 0 betyr at funksjonen er konstant

## Eksempler
- Del 1: Eksempel 1: $f(x) = x^2 - 2x$ på $[1, 4]$ (gjennomsnittlig vekstfart 3), med sekant i figur. Eksempel 2: tenkt temperaturtabell gjennom en dag — gjennomsnittlig vekstfart mellom kl. 6 og kl. 12 med enhet.
- Del 2: Eksempel 1: $f(x) = x^2$ i $x = 3$: tabell med $h = 1;\ 0{,}1;\ 0{,}01;\ 0{,}001$ (vekstfart 7; 6,1; 6,01; 6,001 → 6). Eksempel 2: les av stigningstallet til en tegnet tangent, og vurder nøyaktigheten.

## Nivå 3 og utfordringsarket — idéer
- Alltid / noen ganger / aldri: «For $f(x) = x^2$ er gjennomsnittlig vekstfart på $[a, b]$ lik momentan vekstfart midt i intervallet.» (Alltid: $a + b$ og $2\cdot\frac{a+b}{2}$ — men momentan kan bare *anslås* her; la eleven anslå med tabell for ett eksempel og bevise det generelle på utfordringsarket.)
- Finn et intervall der gjennomsnittlig vekstfart for $f(x) = -x^2 + 6x$ er 0. Hvor mange finnes? (Alle intervaller symmetriske om $x = 3$.) Hva sier det om grafen?
- Lag selv en funksjon med gjennomsnittlig vekstfart 0 på $[0, 4]$ som ikke er konstant.
- **Bevis (KM2):** Vis at gjennomsnittlig vekstfart for $f(x) = ax^2 + bx + c$ på $[x_1, x_2]$ er $a(x_1 + x_2) + b$. Bruk det til å forklare tabellen i eksempel 1 i del 2.
- **Programmering (KM1):** Et program som regner $\frac{f(x+h) - f(x)}{h}$ for $h = 1;\ 0{,}1;\ \ldots;\ 10^{-8}$ for $f(x) = 2^x$ i $x = 0$. Hva nærmer tallene seg (ca. 0,693)? Hva skjer når $h$ blir *veldig* liten, f.eks. $10^{-15}$? (Avrundingsfeil i datamaskinen — la eleven oppdage det.) Ikke navngi ln 2.
- **Kontekst (`\mh`):** posisjon for en syklist som tabell (tenkte data) — gjennomsnittsfart på ulike intervaller og et anslag på farten i ett tidspunkt. Hva er forskjellen i betydning?

## Hjelpemidler
Del 1 mest `\uh`, kontekst med tabell gjerne `\mh`. Del 2: tabeller med små $h$ er `\mh` (kalkulator). Programmering `\prog`.

## Spesielle ønsker
- Figurer: pgfplots, samme stil som kapittel 3. Sekanter heltrukket i `hoved`, tangent stiplet eller i `niv3`.
- Svar med enhet i alle kontekstoppgaver, også i fasiten.
