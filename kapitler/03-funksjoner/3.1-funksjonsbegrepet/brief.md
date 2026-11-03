# Brief 3.1 Funksjonsbegrepet og lineære funksjoner

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 3 Funksjoner. Første seksjon.
- Bygger på: 2.1 (uttrykk, likning, identitet, funksjon), 2.2 (linjer og skjæringspunkt), lineære funksjoner fra ungdomsskolen, 1.3 og 1.4 (når et uttrykk ikke er definert).
- Brukes senere i: hele kapittel 3, 4.1 (vekstfart som stigningstall), 3.6 modellering.
- Kompetansemål:
  - **KM5** — «forklare forskjellen mellom en identitet, en ligning, et algebraisk uttrykk og en funksjon»
  - **KM3** — «identifisere variable størrelser i ulike situasjoner, sette opp formler og utforske disse ved hjelp av digitale verktøy»
  Skriv `\kompetansemaal{5,3}`. Utfordringsarket dekker også KM1, KM2 og KM8.

## Deler
1. **Hva er en funksjon?** — Definisjon: en regel som gir **nøyaktig én** verdi $f(x)$ for hver $x$ i definisjonsmengden.
   Fire representasjoner (teoriboks med fire små felt): formel, tabell, graf, tekst.
   Definisjonsmengde $D_f$ og verdimengde $V_f$, med intervallnotasjon fra 2.4 ($\langle \;\rangle$, $[\;]$).
   Naturlig definisjonsmengde: hvilke $x$ gir mening? ($\frac{1}{x-3}$: $x \neq 3$; $\sqrt{x+2}$: $x \ge -2$ — kobling 1.3 og 1.4.)
   «Loddrett linje-testen» for grafer: hvorfor en sirkel ikke er grafen til en funksjon.
   KM5: $f(x) = 2x + 1$ (funksjon) mot $2x + 1 = 7$ (likning) — likningen spør *når* funksjonen har verdien 7.
2. **Lineære funksjoner** — $f(x) = ax + b$. Stigningstallet $a$ er endringen i $f(x)$ når $x$ øker med 1: $a = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}$.
   Teoriboksen skal vise *hvorfor* stigningstallet er det samme mellom alle par av punkter (lik endring per steg ⇒ rett linje), med en liten figur (pgfplots) med to stigningstrekanter av ulik størrelse.
   Finne funksjonsuttrykket gjennom to punkt. Tolke $a$ og $b$ i en sammenheng (KM3), med enhet: «$a = 16$ kr per km».
   Proporsjonal funksjon: $b = 0$.

## Ord
del 1: funksjon, funksjonsverdi, definisjonsmengde, verdimengde, graf
del 2: lineær funksjon, stigningstall, konstantledd, proporsjonal

## Vanlige misoppfatninger som oppgavene skal fange
- $f(x + 1) = f(x) + 1$ og $f(2x) = 2f(x)$ for alle funksjoner
- Blander $x$ og $f(x)$: gir $x$-verdier som verdimengde
- Stigningstall med fortegnsfeil: $\frac{y_2 - y_1}{x_1 - x_2}$, eller $\frac{\Delta x}{\Delta y}$
- Tror enhver graf eller sammenheng er en funksjon (sirkel, «person → telefonnummer»)
- Tolker $b$ som «startverdi» også når $x = 0$ ikke gir mening i sammenhengen

## Eksempler
- Del 1: Eksempel 1: $f(x) = x^2 - 3x$. Finn $f(-2)$, $f(a)$ og $f(a+1)$ — og vis at $f(a+1) \ne f(a) + 1$. Eksempel 2: finn naturlig definisjonsmengde for $g(x) = \frac{\sqrt{x}}{x - 4}$.
- Del 2: Eksempel 1: finn $f$ gjennom $(-1, 5)$ og $(3, -3)$ ($f(x) = -2x + 3$), kontroller i begge punkt. Eksempel 2: en sparekonto/abonnement i tekst — sett opp $f$, tolk $a$ og $b$ med enhet.

## Nivå 3 og utfordringsarket — idéer
- For hvilke lineære funksjoner gjelder $f(a + b) = f(a) + f(b)$ for alle $a, b$? (Bare $b = 0$, de proporsjonale.) Begrunn.
- Er sammenhengen en funksjon? «Elev → fødselsdato», «fødselsdato → elev», «tall → kvadratet», «tall → tall med samme kvadrat». Begrunn hver.
- Lag selv en funksjon med $D_f = [1, 5]$ og $V_f = [2, 10]$. Finnes det flere? Er det mulig med en lineær funksjon som synker?
- Bevis (KM2): vis at punktene $(1, 2)$, $(3, 8)$ og $(-2, -7)$ ligger på samme linje. Hva må gjelde for tre punkter generelt?
- Stykkevis funksjon (utfordringsarket): en strømavtale/parkeringsavgift med to prissoner. Tegn grafen, finn $f(x)$ for begge intervaller. **Merk tallene som et tenkt eksempel**, ikke som faktiske priser.
- **Programmering (KM1):** Et program som tar en tabell (to lister `x` og `y`) og avgjør om dataene kan komme fra en lineær funksjon (sjekk at $\frac{\Delta y}{\Delta x}$ er lik for alle naboparr). Hvis ja: skriv ut $a$ og $b$. Test med én lineær og én ikke-lineær tabell. Bruk `Fraction` for å unngå avrundingsfeil, og spør hvorfor det er viktig.
- **Tekst (KM8):** En kort tekst (lag den selv, f.eks. om en tenkt taxi- eller mobilavtale) med tall i løpende tekst. Eleven henter ut opplysningene, setter opp funksjonen og vurderer en påstand i teksten («Det lønner seg alltid med …»).

## Hjelpemidler
Del 1 mest `\uh`. Del 2: én `\mh` med GeoGebra (tegn og tolk). Programmering `\prog`.

## Spesielle ønsker
- Grafene skal ha `axis lines=middle`, merkede akser ($x$ og $y$) og ingen rutenett, som i 2.2.
- Funksjonsnavn i kursiv ($f$, $g$), $D_f$ og $V_f$ med senket skrift.
