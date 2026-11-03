# Brief 5.3 Sinussetningen

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 5 Trigonometri.
- Bygger på: 5.2 arealsetningen (brukes i beviset), 5.1 (enhetssirkelen, $\sin v = k$ har to løsninger mellom $0^\circ$ og $180^\circ$).
- Brukes senere i: 5.4 (velge setning), 5.5.
- Kompetansemål:
  - **KM13** — «begrunne sinus-, cosinus- og arealsetningen»
  - **KM12** — «gjøre rede for definisjonene av sinus, cosinus og tangens og bruke trigonometri til å beregne lengder, vinkler og arealer i vilkårlige trekanter»
  Skriv `\kompetansemaal{13,12}`. Utfordringsarket dekker også KM1 og KM2.

## Deler
1. **Sinussetningen og beviset** — $\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}$ (eller omvendt brøk).
   Bevis i teoriboksen fra arealsetningen: $\frac12 bc\sin A = \frac12 ac\sin B = \frac12 ab\sin C$, del alle tre på $\frac12 abc$. Kort og elegant — vis det steg for steg.
   Bruk når vi kjenner to vinkler og én side (SVV): først tredje vinkel ($180^\circ$), deretter sidene.
   Eksakt eksempel: $A = 30^\circ$, $B = 45^\circ$, $a = 4$ gir $b = 4\sqrt2$.
2. **Det tvetydige tilfellet** — Kjent: to sider og en vinkel som *ikke* ligger mellom dem (SSV). Da gir $\sin B = k$ to mulige vinkler $B$ og $180^\circ - B$ (5.1). Begge gir en trekant hvis vinkelsummen tillater det.
   Teoriboks med figur: en «svingarm» med lengde $a$ fra $C$ som treffer grunnlinjen i null, ett eller to punkter.
   Tre tilfeller: ingen trekant ($\sin B > 1$), én trekant, to trekanter.

## Ord
del 1: sinussetningen, motstående side, vinkelsum
del 2: tvetydig, SSV (to sider og en vinkel som ikke ligger mellom dem), svingarm

## Vanlige misoppfatninger som oppgavene skal fange
- Setter opp $\frac{\sin A}{b}$ (vinkel og side som ikke står overfor hverandre)
- Finner bare den spisse vinkelen $B$ i SSV-tilfellet
- Godtar begge vinklene uten å sjekke vinkelsummen
- Bruker sinussetningen når ingen vinkel–side-par er kjent (SSS eller SVS) — da trengs cosinussetningen (5.4)

## Eksempler
- Del 1: Eksempel 1: eksakt med $A = 30^\circ$, $B = 45^\circ$, $a = 4$. Eksempel 2: med kalkulator, $A = 40^\circ$, $B = 75^\circ$, $a = 8$ (finn $C$, $b$, $c$, én desimal).
- Del 2: Eksempel: $A = 30^\circ$, $a = 5$, $b = 8$: $\sin B = 0{,}8$, $B \approx 53{,}1^\circ$ eller $B \approx 126{,}9^\circ$. Begge gir trekanter ($30^\circ + 126{,}9^\circ < 180^\circ$). Tegn begge. Finn $c$ i begge.

## Nivå 3 og utfordringsarket — idéer
- Parameter: $b = 8$ og $A = 30^\circ$. For hvilke $a$ finnes det ingen, én eller to trekanter? ($a < 4$: ingen; $a = 4$ eller $a \ge 8$: én; $4 < a < 8$: to.) Begrunn med svingarmen og $\sin B = \frac{4}{a}$.
- Alltid / noen ganger / aldri: «Den største vinkelen står overfor den lengste siden.» (Alltid — begrunn med sinussetningen og enhetssirkelen, pass på stump vinkel.)
- Lag selv et SSV-sett med nøyaktig to trekanter, og et med nøyaktig én.
- **Les og forstå et bevis (KM2):** gi et ferdig bevis for at $\frac{a}{\sin A} = 2R$ (diameteren i den omskrevne sirkelen) med figur, og still spørsmål til hvert steg. Bruk bare kjent geometri; forklar periferivinkelsetningen kort i teksten hvis den trengs, og si at den er «kjent fra geometri».
- **Programmering (KM1):** en funksjon `ssv(a, b, A)` som returnerer antall trekanter og vinkelen(e) $B$. Test på de tre tilfellene. Hvorfor må programmet sjekke $180^\circ - B$?
- Praktisk (`\mh`, tenkt): to observatører 500 m fra hverandre ser en drone under vinklene $62^\circ$ og $71^\circ$. Hvor langt er det fra hver observatør til dronen?

## Hjelpemidler
Bevis og eksakte verdier `\uh`. Kalkulatoroppgaver `\mh`. Programmering `\prog`.

## Spesielle ønsker
- Figurer med TikZ, samme notasjon som 5.2 ($A$, $B$, $C$ og $a$, $b$, $c$ overfor).
- Svar med kalkulator: én desimal for vinkler og sider, med mindre annet står.
