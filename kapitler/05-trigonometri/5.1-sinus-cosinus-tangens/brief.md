# Brief 5.1 Sinus, cosinus og tangens

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 5 Trigonometri. Første seksjon.
- Bygger på: Pytagoras og formlike trekanter (ungdomsskolen), 1.3 kvadratrøtter og rasjonal nevner.
- Brukes senere i: 5.2–5.5 (arealsetningen, sinussetningen, cosinussetningen trenger sinus og cosinus til **stumpe** vinkler — derfor enhetssirkelen i del 2).
- Kompetansemål: **KM12** — «gjøre rede for definisjonene av sinus, cosinus og tangens og bruke trigonometri til å beregne lengder, vinkler og arealer i vilkårlige trekanter».
  Skriv `\kompetansemaal{12}`. Utfordringsarket dekker også KM1 og KM2.
  **«Gjøre rede for definisjonene»:** eleven skal kunne forklare hvorfor forholdene bare avhenger av vinkelen.

## Deler
1. **Sinus, cosinus og tangens i rettvinklede trekanter** — Definisjoner med motstående katet, hosliggende katet og hypotenus. Figur (TikZ) med navn på sidene for vinkel $v$.
   Teoriboksen skal vise *hvorfor* forholdet bare avhenger av vinkelen: to rettvinklede trekanter med samme vinkel $v$ er formlike, så forholdet mellom sidene er det samme (figur med to trekanter).
   Finne sider (`\uh` med eksakte verdier, `\mh` ellers) og vinkler med $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$ (`\mh`). Si at kalkulatoren må stå i grader (DEG).
2. **Eksakte verdier og enhetssirkelen** — Eksakte verdier for $30°$, $45°$, $60°$ utledet fra et halvt kvadrat og en halv likesidet trekant (kobling 1.3: $\frac{1}{\sqrt2} = \frac{\sqrt2}{2}$). Tabell.
   $\sin^2 v + \cos^2 v = 1$ fra Pytagoras.
   **Enhetssirkelen:** for $0° \le v \le 180°$ definerer vi $\cos v$ og $\sin v$ som koordinatene til punktet på enhetssirkelen. For spisse vinkler gir det det samme som før (vis hvorfor med trekanten inni sirkelen). Stumpe vinkler: $\sin(180° - v) = \sin v$ og $\cos(180° - v) = -\cos v$ (symmetri om $y$-aksen, figur).
   Konsekvens som trengs i 5.3: likningen $\sin v = 0{,}5$ har **to** løsninger mellom 0° og 180° ($30°$ og $150°$).

## Ord
del 1: hypotenus, katet (motstående/hosliggende), sinus, cosinus, tangens
del 2: eksakt verdi, enhetssirkel, spiss vinkel, stump vinkel

## Vanlige misoppfatninger som oppgavene skal fange
- Bytter om hosliggende katet og hypotenus
- Kalkulatoren står i radianer
- $\sin^{-1} x = \frac{1}{\sin x}$
- $\sin(2v) = 2 \sin v$ (gjelder ikke generelt — moteksempel med eksakte verdier: $\sin 60° \ne 2\sin 30°$)
- Bruker sin/cos/tan-definisjonene fra del 1 i en trekant som ikke er rettvinklet
- $\sin v = 0{,}5$ har bare løsningen $30°$

## Eksempler
- Del 1: Eksempel 1: finn en katet når hypotenus og vinkel er gitt (`\mh`, avrund til én desimal). Eksempel 2: finn en vinkel når to sider er gitt (`\mh`).
- Del 2: Eksempel 1: utled $\sin 60° = \frac{\sqrt3}{2}$ fra en likesidet trekant med side 2. Eksempel 2: finn $\sin 150°$ og $\cos 150°$ eksakt med enhetssirkelen.

## Nivå 3 og utfordringsarket — idéer
- Vis at $\tan v = \frac{\sin v}{\cos v}$ (fra definisjonene).
- Alltid / noen ganger / aldri: «$\sin v + \cos v = 1$» (noen ganger: $v = 0°$, $v = 90°$), «$\sin v < \tan v$ for $0° < v < 90°$» (alltid — begrunn med $\cos v < 1$).
- Baklengs: lag en rettvinklet trekant der $\tan v = \frac34$ og hypotenusen er 10. ($6$, $8$, $10$.)
- **Utfordring, praktisk:** høyden til et tre målt fra to punkter på bakken med kjent avstand (to rettvinklede trekanter, likningssystem). Tenkte mål. Velg tall så svaret blir pent med `\mh`.
- **Bevis (KM2):** $\sin^2 v + \cos^2 v = 1$ for stumpe vinkler også (enhetssirkelen).
- **Programmering (KM1):** en tabell over $\sin v$ og $\cos v$ for $v = 0°, 15°, \ldots, 180°$ med `math.sin(math.radians(v))`. Hvorfor trengs `radians`? Finn i tabellen par av vinkler med samme sinusverdi og forklar med enhetssirkelen.

## Hjelpemidler
Eksakte verdier og bevis `\uh`. Beregninger med kalkulator `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Gradetegn: `$30°$` fungerer ikke alltid i matematikkmodus — bruk `$30^\circ$`. Vær konsekvent.
- Alle figurer med TikZ, sidene merket med bokstaver/tall, rett vinkel markert med et lite kvadrat.
- Svar med kalkulator: oppgi antall desimaler i oppgaveteksten.
