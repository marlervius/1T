# Brief 4.4 Drøfting av funksjoner

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 4 Vekstfart og derivasjon. Siste seksjon i kapittel 4.
- Bygger på: 4.3 derivasjonsregler og tangent, 2.4 fortegnslinje, 2.3 andregradslikninger, 3.2 toppunkt, 3.3 polynomdivisjon og eskeoppgaven (der det ble lovet at største volum finnes i 4.4).
- Brukes senere i: 3.6/5.5 og generelt problemløsing.
- Kompetansemål:
  - **KM11** — «forklare polynomdivisjon og bruke det til å omskrive algebraiske uttrykk, drøfte funksjoner og løse ligninger og ulikheter»
  - **KM10** — «bruke gjennomsnittlig og momentan vekstfart i konkrete eksempler og gjøre rede for den deriverte»
  Skriv `\kompetansemaal{11,10}`. Utfordringsarket dekker også KM1, KM2 og KM7.

## Deler
1. **Fortegnslinje for $f'$ og ekstremalpunkter** — Hvis $f'(x) > 0$ på et intervall, er $f$ voksende der; $f'(x) < 0$ gir avtagende. Teoriboksen: *hvorfor* — tangentene stiger når stigningstallet er positivt (kobling 4.1–4.2).
   Toppunkt: $f'$ skifter fra $+$ til $-$. Bunnpunkt: fra $-$ til $+$. Terrassepunkt: $f'(a) = 0$ uten fortegnsskifte (f.eks. $x^3$ i 0).
   Fortegnslinjer for $f'$ lages med `verktoy/figurer.py`. Oppgi ekstremalpunkt som koordinater.
   Full drøfting: $f'$, fortegnslinje, monotoniområder (intervallnotasjon), ekstremalpunkter, nullpunkter (gjerne med polynomdivisjon fra 3.3 — KM11), skisse.
   Figur: graf av $f(x) = x^3 - 3x^2$ med fortegnslinjen for $f'$ rett under, slik at sammenhengen syns.
2. **Største og minste verdi og optimering** — På et lukket intervall: sammenlign verdiene i ekstremalpunktene *og* i endepunktene. Teoriboksen: figur der største verdi ligger i et endepunkt.
   Optimering i fire steg: (1) velg variabel og finn definisjonsmengden, (2) sett opp funksjonen, (3) deriver og finn kandidater, (4) sammenlign og svar i en setning med enhet.
   Eskeoppgaven fra 3.3: $V(x) = x(20 - 2x)(30 - 2x)$ — største volum (kobling, si «nå kan vi løse det vi lovte i 3.3»).

## Ord
del 1: voksende, avtagende, ekstremalpunkt, terrassepunkt, drøfte
del 2: største verdi, minste verdi, endepunkt, optimering

## Vanlige misoppfatninger som oppgavene skal fange
- $f'(a) = 0$ betyr alltid topp- eller bunnpunkt (moteksempel: terrassepunkt)
- Lager fortegnslinje for $f$ i stedet for $f'$
- Oppgir bare $x$-verdien som toppunkt
- Glemmer endepunktene når største/minste verdi på et intervall skal finnes
- Forveksler lokalt og globalt (største) toppunkt

## Eksempler
- Del 1: Eksempel 1: full drøfting av $f(x) = x^3 - 3x^2$: $f'(x) = 3x(x - 2)$, toppunkt $(0, 0)$, bunnpunkt $(2, -4)$, nullpunkter 0 og 3, skisse. Eksempel 2: $g(x) = x^3 - 6x^2 + 12x$ har terrassepunkt i $x = 2$ ($g'(x) = 3(x - 2)^2$).
- Del 2: Eksempel 1: største og minste verdi for $f(x) = x^3 - 3x^2$ på $[-1, 4]$ (største i endepunktet $x = 4$: 16; minste: $-4$ i bunnpunktet og $f(-1) = -4$ — **begge** gir $-4$; sjekk og vis begge). Eksempel 2: eskeoppgaven med `\mh` ($x \approx 3{,}92$ cm, $V \approx 1056$ cm³).

## Nivå 3 og utfordringsarket — idéer
- For hvilke $a$ har $f(x) = x^3 + ax$ ingen ekstremalpunkter? ($a \ge 0$; $a = 0$ gir terrassepunkt.) Begrunn med $f'$.
- Lag selv en funksjon med toppunkt i $x = 1$ og bunnpunkt i $x = 3$. ($f'(x) = k(x-1)(x-3)$ med $k > 0$, f.eks. $f(x) = x^3 - 6x^2 + 9x$.) Hvor mange finnes?
- Bevis (KM2): et tredjegradspolynom har enten 0 eller 2 ekstremalpunkter. (Se på diskriminanten til $f'$; $D = 0$ gir terrassepunkt.)
- Alltid / noen ganger / aldri: «Den største verdien til $f$ på $[a, b]$ ligger i et toppunkt.» (Noen ganger.)
- Drøfting med polynomdivisjon (KM11): $f(x) = x^3 - 3x + 2$ — finn nullpunktene ($x = 1$ er nullpunkt, divider, $(x-1)^2(x+2)$), drøft og skisser. Hva betyr dobbelt nullpunkt her? (Bunnpunkt på $x$-aksen.)
- Optimering (tenkt kontekst, `\mh`): fortjeneste $F(x) = -0{,}02x^2 + 40x - 8000$ kr ved salg av $x$ enheter. Hvor mange gir størst fortjeneste? (1000 enheter, 12 000 kr.) Vurder modellen (KM7).
- **Programmering (KM1):** et program som finner største verdi av $V(x)$ på $[0, 10]$ ved å prøve $x$ med steg 0,01. Sammenlign med eksakt svar fra $V'(x) = 0$. Hvor mange desimaler stemmer, og hvorfor?

## Hjelpemidler
Del 1 mest `\uh`. Del 2: eskeoppgaven og fortjenesteoppgaven `\mh`, resten `\uh`. Programmering `\prog`.

## Spesielle ønsker
- Bruk samme fire-stegs oppsett for alle optimeringsoppgaver, også i fasiten.
- Svar på optimering alltid i en setning med enhet: «Esken får størst volum, ca. 1056 cm³, når …».
