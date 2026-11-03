# Brief 4.2 Den deriverte

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 4 Vekstfart og derivasjon.
- Bygger på: 4.1 (momentan vekstfart som tall sekantene nærmer seg), 1.2 kvadratsetningene, 1.4 fellesnevner, 1.3 rasjonal nevner.
- Brukes senere i: 4.3 derivasjonsregler, 4.4 drøfting.
- Kompetansemål:
  - **KM10** — «bruke gjennomsnittlig og momentan vekstfart i konkrete eksempler og gjøre rede for den deriverte»
  - **KM2** — «lese og forstå matematiske bevis og utforske og utvikle bevis i relevante matematiske emner»
  Skriv `\kompetansemaal{10,2}`. Utfordringsarket dekker også KM1.
  **«Gjøre rede for den deriverte»** er hovedmålet: eleven skal kunne forklare definisjonen og regne den ut fra definisjonen.

## Deler
1. **Grenseverdi og definisjonen av den deriverte** — $f'(a) = \lim\limits_{h \to 0} \frac{f(a + h) - f(a)}{h}$. Les: «grenseverdien når $h$ går mot 0».
   Teoriboksen skal forklare *hvorfor* vi ikke kan sette $h = 0$ direkte (vi får $\frac{0}{0}$), og at vi derfor forenkler først og forkorter $h$ (kobling 1.4 forkorting av faktorer).
   Kobling til 4.1: tabellen med $h = 0{,}1;\ 0{,}01$ viste tallet — definisjonen regner det ut eksakt.
   Notasjon: $f'(a)$ er et tall (stigningstallet til tangenten i $x = a$), $f'(x)$ er en funksjon.
   Grenseverdi intuitivt: «det tallet uttrykket kommer så nær vi vil når $h$ er nær nok 0». Ingen formell $\varepsilon$-definisjon.
2. **Utlede derivasjonsregler** — Bruk definisjonen til å vise $(x^2)' = 2x$ og $(x^3)' = 3x^2$ (ekspander $(x + h)^3$), og at $(k)' = 0$ og $(kx)' = k$.
   Mønsteret $(x^n)' = nx^{n-1}$: oppgi det som en regel *basert på mønsteret*, og si ærlig at et bevis for alle $n$ krever mer (binomialformelen) — utfordringsarket tar $n = 4$.
   Vis også fra definisjonen at $(f + g)' = f' + g'$ og $(k \cdot f)' = k \cdot f'$ (kort, i teoriboks eller eksempel).
   Selve bruken av reglene på polynomer kommer i 4.3. Her er målet å forstå hvor reglene kommer fra.

## Ord
del 1: grenseverdi, den deriverte, derivere, definisjon, tangent (gjenta)
del 2: derivasjonsregel, utlede, mønster, bevis

## Vanlige misoppfatninger som oppgavene skal fange
- Setter $h = 0$ først og får $\frac{0}{0}$, eller tror da at svaret er 0
- $(x + h)^2 = x^2 + h^2$ (kobling 1.2)
- Blander $f'(3)$ og $f(3)$
- Tror $f'(a) = 0$ alltid betyr topp- eller bunnpunkt (moteksempel $x^3$ i 0 — bare nevn; drøfting kommer i 4.4)
- Beholder $h$ i svaret etter grenseovergangen

## Eksempler
- Del 1: Eksempel 1: $f'(3)$ for $f(x) = x^2$ fra definisjonen: $\frac{(3+h)^2 - 9}{h} = \frac{6h + h^2}{h} = 6 + h \to 6$. Sammenlign med tabellen i 4.1. Eksempel 2: $f'(x)$ for $f(x) = x^2 - 4x$ generelt, deretter $f'(1)$ og tolkning.
- Del 2: Eksempel 1: $(x^3)' = 3x^2$ fra definisjonen, steg for steg. Eksempel 2: $(f+g)' = f' + g'$ fra definisjonen.

## Nivå 3 og utfordringsarket — idéer
- Finn $f'(x)$ for $f(x) = \frac{1}{x}$ fra definisjonen (fellesnevner fra 1.4): $-\frac{1}{x^2}$. Hva sier fortegnet om grafen?
- Alltid / noen ganger / aldri: «Hvis $f'(a) > 0$, er $f(a) > 0$.» (Noen ganger.) «Hvis $f(x) = c$ for alle $x$, er $f'(x) = 0$.» (Alltid — begrunn fra definisjonen.)
- Baklengs: finn en funksjon der $f'(x) = 2x + 3$ og $f(0) = 1$. Hvor mange finnes uten kravet $f(0) = 1$?
- **Utfordring, bevis (KM2):** $(x^4)' = 4x^3$ fra definisjonen ($(x + h)^4$ med to kvadreringer eller Pascals trekant — vis Pascals trekant kort).
- **Utfordring, kobling 1.3:** $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ fra definisjonen ved å utvide med konjugatet $\sqrt{x + h} + \sqrt{x}$. Passer dette med mønsteret $(x^n)' = nx^{n-1}$ for $n = \tfrac12$?
- **Programmering (KM1):** En funksjon `derivert(f, x, h)` som regner differansekvotienten. Sammenlign med eksakt $f'(x)$ for tre funksjoner. Hvorfor gir den symmetriske varianten $\frac{f(x+h) - f(x-h)}{2h}$ bedre svar? (La eleven undersøke.)

## Hjelpemidler
Nesten alt `\uh` (algebra fra definisjonen). Programmering `\prog`. Kanskje én `\mh` der eleven sjekker med CAS.

## Spesielle ønsker
- Skriv grenseverdien med `\lim\limits_{h \to 0}` i display og i stegtabeller.
- Hold $h$ i alle mellomsteg til siste linje, og skriv «Når $h \to 0$:» før siste steg.
- Kontroller hvert steg i `verifiser.py` (`limit`, `expand`, `simplify`).
