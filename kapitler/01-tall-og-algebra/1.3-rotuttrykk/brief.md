# Brief 1.3 Rotuttrykk og brøkeksponenter

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 1 Tall og algebra.
- Bygger på: 1.1 Potenser (alle potensreglene, $a^0$, $a^{-n}$), 1.2 Konjugatsetningen.
- Brukes senere i: 2.3 abc-formelen (forenkle $\sqrt{b^2-4ac}$), 3.5 potensfunksjoner $ax^b$ med brøk som $b$, 5.1 eksakte trigonometriske verdier ($\frac{\sqrt{3}}{2}$, $\frac{\sqrt{2}}{2}$).
- Kompetansemål: **KM9** — «utforske og beskrive egenskapene ved polynomfunksjoner, rasjonale funksjoner, eksponentialfunksjoner og potensfunksjoner». Seksjonen er grunnlag for potensfunksjonene.
  Utfordringsarket dekker også **KM2** (bevis) og **KM1** (algoritme/programmering). Skriv `\kompetansemaal{9}` i meta.tex.

## Deler
1. **Kvadratrot og n-te rot** — Definisjon: $\sqrt{a}$ er det tallet $\ge 0$ som ganget med seg selv gir $a$. $\sqrt[n]{a}$ tilsvarende. Oddetalls rot av negative tall finnes ($\sqrt[3]{-8} = -2$), partalls rot gjør ikke det.
   Regler: $\sqrt{ab} = \sqrt{a}\cdot\sqrt{b}$ og $\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$ ($a, b \ge 0$, $b \neq 0$). Teoriboksen skal vise *hvorfor* produktregelen gjelder: $(\sqrt{a}\sqrt{b})^2 = (\sqrt{a})^2(\sqrt{b})^2 = ab$, og $\sqrt{a}\sqrt{b} \ge 0$.
   Ferdigheter: forenkle ($\sqrt{12} = 2\sqrt{3}$, $\sqrt{50} = 5\sqrt{2}$), trekke sammen like rotledd ($\sqrt{8} + \sqrt{2} = 3\sqrt{2}$), gjøre nevneren rasjonal ($\frac{6}{\sqrt{3}} = 2\sqrt{3}$).
2. **Brøk som eksponent** — Teoriboksen skal *utlede* $a^{\frac{1}{2}} = \sqrt{a}$ fra regelen $(a^m)^n = a^{mn}$: hvis regelen skal gjelde, må $(a^{\frac12})^2 = a^1 = a$. Tilsvarende $a^{\frac1n} = \sqrt[n]{a}$ og $a^{\frac{m}{n}} = (\sqrt[n]{a})^m = \sqrt[n]{a^m}$.
   **Definer brøkeksponenter bare for $a > 0$** (si dette eksplisitt i teoriboksen). Ingen oppgaver med negativt grunntall og brøkeksponent.
   Ferdigheter: regne ut ($8^{\frac23} = 4$, $27^{-\frac13} = \frac13$), skrive rotuttrykk som én potens ($\sqrt{x}\cdot\sqrt[3]{x} = x^{\frac56}$), forenkle med potensreglene fra 1.1.

## Ord
del 1: kvadratrot, n-te rot, rotuttrykk, rasjonal nevner (gjøre nevneren rasjonal), irrasjonalt tall
del 2: brøkeksponent, (gjenbruk) grunntall og eksponent fra 1.1 er ikke nødvendig å gjenta

## Vanlige misoppfatninger som oppgavene skal fange
- $\sqrt{a+b} = \sqrt{a} + \sqrt{b}$ (for eksempel $\sqrt{9+16} \ne 3 + 4$)
- $\sqrt{8} + \sqrt{2} = \sqrt{10}$ (legger sammen under rottegnet)
- $2\sqrt{3} = \sqrt{6}$ (riktig er $\sqrt{12}$)
- $a^{\frac12} = \frac{a}{2}$ og $8^{\frac23} = \frac{8^2}{3}$
- $a^{-\frac12} = -\sqrt{a}$ (negativ eksponent gir brøk, som i 1.1)
- $\sqrt{x^2} = x$ for alle $x$ (stemmer bare for $x \ge 0$; bruk som nivå 3 «alltid/noen ganger/aldri»)

## Eksempler
- Del 1: Eksempel 1: forenkle $\sqrt{48} - \sqrt{12} + \sqrt{27}$ (finn største kvadrattall-faktor). Eksempel 2: $\frac{10}{\sqrt{5}}$ med rasjonal nevner.
- Del 2: Eksempel 1: regn ut $16^{\frac34}$ på to måter ($(\sqrt[4]{16})^3$ og $\sqrt[4]{16^3}$) og vis at den første er lettest uten hjelpemidler. Eksempel 2: skriv $\frac{x\sqrt{x}}{\sqrt[3]{x}}$ som én potens. Kontroll med $x = 64$.

## Nivå 3 og utfordringsarket — idéer
- Alltid / noen ganger / aldri: $\sqrt{x^2} = x$; $\sqrt{a+b} = \sqrt{a} + \sqrt{b}$ (sant når $a = 0$ eller $b = 0$); $\sqrt{a}\cdot\sqrt{a} = a$ for $a \ge 0$
- Hvilket er størst, $\sqrt[3]{3}$ eller $\sqrt{2}$? Begrunn uten kalkulator (opphøy begge i 6.)
- Løs $x^{\frac32} = 27$ (baklengs)
- Rasjonal nevner med konjugatsetningen fra 1.2: $\frac{1}{\sqrt{3} - 1} = \frac{\sqrt{3}+1}{2}$ — knytt eksplisitt til 1.2
- **Bevis (KM2):** at $\sqrt{2}$ er irrasjonal. Gi beviset ved selvmotsigelse som en tekst med hull eleven fyller ut og begrunner (lese og forstå bevis). Spør så: hvor bryter beviset sammen hvis vi prøver med $\sqrt{4}$?
- **Programmering (KM1):** Herons metode: `x = (x + 2/x)/2` gjentatt fra `x = 1`. Hvor mange runder trengs før $x^2$ er innenfor $10^{-10}$ av 2? Hvorfor virker metoden (hvis $x$ er for stor, er $2/x$ for liten)? Endre programmet til å finne $\sqrt{10}$.
- Kontekst med hjelpemidler: Keplers tredje lov $T = a^{\frac32}$ ($T$ i år, $a$ i astronomiske enheter). Mars har $a \approx 1{,}52$. Finn omløpstiden. Baklengs: et objekt har $T = 8$ år, finn $a$ (eksakt: $a = 4$).

## Hjelpemidler
Nesten alt `\uh`. Kepler-oppgaven `\mh`. Herons metode `\prog`.

## Spesielle ønsker
- Bruk notasjonen $a^{\frac{m}{n}}$ med `\frac` i eksponenten (ikke $a^{m/n}$) i oppgavene, slik eleven ser det på eksamen.
- Svar skal være eksakte og forenklet (f.eks. $3\sqrt{2}$, ikke $\sqrt{18}$ eller $4{,}24$), med mindre oppgaven sier noe annet.
