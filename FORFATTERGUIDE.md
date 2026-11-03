# Forfatterguide — slik skriver du en seksjon

Les hele guiden før du begynner. Se deretter på mønsterseksjonen
`kapitler/01-tall-og-algebra/1.1-potenser/` og gjør det på samme måte.

---

## 1. Arbeidsflyt (følg rekkefølgen)

1. Les `brief.md` i seksjonsmappa. Den bestemmer deler, ord, misoppfatninger og nivå 3-ideer.
2. Les alle filene i mønsterseksjonen 1.1. Kopier strukturen, ikke innholdet.
3. **Planlegg oppgavene først** som en liste: nummer, nivå, hjelpemiddel, hva oppgaven trener.
4. **Skriv `verifiser.py` først.** Regn ut alle svar med sympy. Kjør til 0 feil:
   `PYTHONPATH=verktoy python3 kapitler/.../verifiser.py`
5. Skriv `meta.tex`, `teori-og-oppgaver.tex`, `utfordring.tex`.
6. Skriv `fasit.tex`. Bruk svarene fra `verifiser.py`, ikke svar du regnet i hodet.
7. Bygg: `python3 verktoy/bygg.py <mappe> --forhandsvis`. Rett alle FEIL. Vurder alle ADVARSLER.
8. **Se på hver PNG** i `build/<nr>/` med Read-verktøyet. Se etter punktene i avsnitt 9.
9. Rapporter (avsnitt 11).

---

## 2. Filene

| Fil | Innhold |
|---|---|
| `meta.tex` | `\seksjon{1.2}{Tittel}`, `\undertittel{…}`, `\maal{…}`, `\kompetansemaal{6}`, `\hvakanjeg{…}` |
| `teori-og-oppgaver.tex` | 1–3 deler. Hver del starter med `\del{nr}{Tittel}` |
| `utfordring.tex` | infoboks, oppgaver U1, U2 …, oppsummering |
| `fasit.tex` | `\fk{Del 1 — …}` og `\fo{1.1} svar` for hver oppgave og hver «Sjekk» |
| `verifiser.py` | `from kontroll import *`, kontroller, `rapport()` til slutt |

Ingen preamble, ingen `\documentclass`, ingen `\usepackage`. Byggeskriptet lager rammen.

---

## 3. Makroer du skal bruke (og ingen andre)

**Struktur**
- `\del{1}{Tittel}` — ny del, ny side. Delene nummereres 1, 2, 3 innen seksjonen.
- `\nivaahode{1}` / `{2}` / `{3}` — nivåoverskrift. Navnet kommer automatisk.
- `\oppg{1.4}{2}{\uh}` — oppgavehode: nummer, nivå (1–3), hjelpemiddel.
  - `\uh` uten hjelpemidler (Del 1 på eksamen) · `\mh` med hjelpemidler (Del 2) · `\prog` programmering

**Bokser (i denne rekkefølgen i hver del)**
1. `\begin{ordliste} ord & forklaring & \mittsprak\\ … \end{ordliste}` — 3–6 ord
2. `\begin{mustkunne} … \end{mustkunne}` — regel, definisjon, *hvorfor* regelen gjelder
3. `\begin{eksempel}[1 — kort tittel] … \end{eksempel}` — 1–2 stykker, med `stegtabell`
4. `\begin{vanligfeil} \begin{itemize}…\end{itemize} \end{vanligfeil}` — 2–4 feil
5. `\nivaahode{1}` + oppgaver, `\nivaahode{2}` + oppgaver, `\nivaahode{3}` + oppgaver
6. `\begin{sjekk} \begin{tasks}(2) … \end{tasks} \end{sjekk}` — 3 korte spørsmål

**Andre**
- `\begin{stegtabell} utregning & forklaring\\ \end{stegtabell}` — i eksempler
- `\begin{tasks}(n) \task … \end{tasks}` — deloppgaver a), b), c). `(4)` for korte uttrykk,
  `(2)` for middels, `(1)` for setninger. `\task!` gir full bredde.
- `\begin{infoboks}{Tittel} … \end{infoboks}`, `\begin{oppsummering} … \end{oppsummering}`
- `\begin{kode} … \end{kode}` — Python-kode. Ikke inni `tasks`.
- `\polylongdiv{x^3-2x^2-5x+6}{x-1}` — polynomdivisjon med norsk oppstilling. Pakken regner selv
  (også rest). `\polylongdiv[stage=3]{…}{…}` viser bare de første stegene — fint til «fullfør»-oppgaver.
  Skriv polynomene uten mellomrom og med `^` (ikke `\cdot`). Kontroller svaret i `verifiser.py` med `div()`.
- **Fortegnslinjer og tallinjer lages ALLTID med `verktoy/figurer.py`** (fortegnene regnes av sympy):
  `python3 verktoy/figurer.py fortegn "x+1" "x-3"` · med nevner: `… fortegn "x-1" "/x+2" --navn "\dfrac{x-1}{x+2}"`
  · tallinje: `python3 verktoy/figurer.py tallinje "[-1,3>" "<5,->" --fra -3 --til 7`. Lim utskriften inn som den er.
- `\hint{tekst}` — grått tips under en oppgave (bruk sjelden, mest på nivå 3)
- `\skrivlinje[3cm]`, `\rute` — tomme felt i «fullfør»-oppgaver
- `minipage[t]` med `\begin{tabular}[t]` — to spalter i `mustkunne`
- TikZ / pgfplots for figurer og grafer (`\begin{tikzpicture} … \end{tikzpicture}`)
- `\renewcommand{\arraystretch}{1.5}` er lov inni en boks. Andre `\renewcommand` er ikke lov.

**I `meta.tex`:** `\kompetansemaal{6}` eller `\kompetansemaal{9,11}` — bare ID-ene fra `brief.md`
(se `laereplan/kompetansemaal-1T.md`). Aldri tekst. Målteksten settes inn automatisk.
`\kan{1}{skrive … }` per linje i `\hvakanjeg{…}`, `\kanskille` mellom deler.
2–4 linjer per del. Start med et verb: «løse», «forklare», «tegne».

---

## 4. Krav til innholdet

### Mengde per del
| Nivå | Antall oppgaver | Hva oppgavene gjør |
|---|---|---|
| 1 Grunnleggende | 2–4 | Én regel om gangen. Ligner eksemplet. Gjerne en «fullfør»-oppgave med stillas. |
| 2 Middels | 3–4 | Flere steg. Kombiner regler. Typiske prøveoppgaver. Én «finn den første feilen». Gjerne én praktisk kontekst. |
| 3 Utfordring | 2–3 | Begrunn og forklar. «Alltid, noen ganger eller aldri sant?». Baklengs (gitt svaret, finn oppgaven). Parameter. Generaliser. |

**Nivå 3 er dypere, ikke lengre.** Større tall eller flere ledd er *ikke* nivå 3.
**Krav per del:** nivå 3 skal ha minst én oppgave av typen «alltid / noen ganger / aldri», «baklengs»
(gitt svaret, finn oppgaven) eller «lag selv», og minst én som ber eleven *begrunne* eller *forklare*.
En flerstegs teknikkoppgave (faktoriser og forkort, løs en lang likning) hører hjemme på nivå 2.
Hint på nivå 3 skal ikke fortelle hvilken metode som skal brukes.
Sjekk dette for **hver** del — kontrollene har vist at del 2 ofte får svakere nivå 3 enn del 1.

### Utfordringsarket
- 5–8 oppgaver, U1, U2 … Starter med `\nivaahode{2}` (Fordypning), så `\nivaahode{3}` (Ekstra utfordring).
- Minst 2 oppgaver på nivå 3. Minst én der eleven lager noe selv eller undersøker.
- Gjerne én `\prog`-oppgave (Python) og én oppgave som krever et bevis eller en fullstendig begrunnelse.
- Start med infoboksen «Velg metode selv». Slutt med `oppsummering` (2–3 setninger).

### Kompetansemålene
Les målene i briefen i `laereplan/kompetansemaal-1T.md`. Se på verbene. Står det «utforske»,
«forklare», «begrunne» eller «argumentere», skal minst én oppgave på nivå 2–3 be eleven gjøre nettopp det.

### Teoriboksen
- Forklar **hvorfor**, ikke bare **hva**. Vis hvor regelen kommer fra (som i 1.1: skriv ut faktorene).
- Maks ca. 10 linjer. Bruk tabell eller to spalter når det er flere regler.

### Eksemplene
- Ett steg per linje i `stegtabell`. Forklaringen sier *hva* du gjør og *hvilken regel*.
- Avslutt med en kontroll når det går (sett inn, regn baklengs).

### Vanlige feil
- Skriv den gale versjonen, si at den er feil, gi den riktige. **Med formel**, ikke bare ord.
- Kontroller påstanden i boksen med sympy i `verifiser.py` ("VF 1a" osv.). En feil i denne boksen lærer elevene noe galt. Hent feilene fra `brief.md`.
- Oppgavene på nivå 2 og 3 skal teste minst to av disse feilene.

### Unngå
- At a) avslører svaret på b).
- At svaret står et annet sted på siden. Tall fra eksempler, «Vanlig feil», ordlisten og
  «Hva kan jeg?» skal **ikke** gjenbrukes i oppgavene. «Finn den første feilen» skal ha nye tall
  og helst flere steg, med feilen et stykke ut i kjeden.
- Nivå 3 som bruker samme metode som en nivå 2-oppgave, og hint som gir bort hele metoden.
  Et hint på nivå 3 skal peke i en retning («Hvilken potens fjerner begge rottegnene?»), ikke gi oppskriften.
- Tall som gir avrundingstrøbbel. Velg tall med pene svar uten hjelpemidler.
- Oppgaver som bare kan løses med en metode som ikke er gjennomgått.
- Kontekster som er kunstige («Per har $x^2 + 3$ epler»).

---

## 5. Språk

- Norsk bokmål. Korte setninger (maks ca. 20 ord). Én instruks per setning.
- Instruksjoner i imperativ: «Løs likningen.» «Forklar kort.» «Vis utregningen.»
- Bruk fagbegrepene. Nye begreper står i ordlisten med en enkel forklaring.
- «Likning», ikke «ligning». «Løsning», «faktorisere», «forkorte», «eksakt svar».
- Ingen utropstegn, ingen «Lykke til», ingen emojier.

---

## 6. Matematikk i LaTeX

- Desimalkomma: `$0,25$` (ikke `0.25`). Tusenskille: `$45\,000$`. Prosent: `$25\,\%$`.
- Gangetegn: `\cdot`. Aldri `*` eller `x`.
- Brøk i oppgavetekst og `tasks`: `\dfrac`. Brøk i fasit og løpende tekst: `\frac`.
- **Brøk i eksponent: alltid `\tfrac`**, for eksempel `8^{\tfrac{2}{3}}`. `\frac` i en eksponent blir for lite til å lese i OneNote.
- Formler med brøk inni brøk (som $\frac{x + 2/x}{2}$) settes på egen linje med `\[ … \]`.
- Sentrert matematikk: `\[ … \]`. Aldri `$$`.
- Enheter: `$3,0 \cdot 10^8$ m/s` (enheten utenfor `$`), eller `\text{ m}` inni.
- Likningssett: `\begin{cases} … \end{cases}` eller `aligned`.
- Ulikhetstegn: `\le`, `\ge`, `\neq`.
- Funksjoner: `f(x) = 2x^2 - 3x + 1`, `f'(x)`. Intervaller: `[1, 3\rangle` (norsk notasjon).

---

## 7. Fasit

- Samme nummer som oppgaven: `\fo{1.4} a) $27x^6$ \ b) $3a^3b$`. Bruk `\ ` mellom deloppgaver.
- Én `\fo{Sjekk N}` per del.
- Nivå 1: bare svaret. Nivå 2: svar + kort mellomregning når det hjelper. Nivå 3 og U: kort
  løsning og begrunnelse, slik en god elev ville skrevet den.
- Åpne oppgaver («lag selv»): gi ett eksempel på et godt svar og si at flere svar er riktige.
- **Vilkår** står i parentes etter svaret: «a) $\frac{2x}{3}$ ($x \neq 0$)». Ta med vilkår i *alle* svar
  med $x$ i nevneren. Ved divisjon med en brøk kommer også telleren i den brøken med i vilkåret.
- Store brøker og produkter: én deloppgave per linje. Ikke press alt inn på én side — fasiten kan være 2 sider.
- «Alltid / noen ganger / aldri»: en påstand som stemmer for alle *tillatte* verdier, er «alltid
  (for tillatte verdier)». Skriv i oppgaveteksten «… for alle tillatte verdier av $x$?» når det gjelder.
- Fasiten løser oppgaven med seksjonens egne metoder, ikke med metoder som kommer senere.
- Eksakte svar. Avrundet svar bare når oppgaven ber om det, og da med `\approx`.

---

## 8. verifiser.py

```python
from kontroll import *          # gir x, y, a, b, n, t, Rational, sqrt, Eq, solve, expand …

chk("1.4a", (3*x**2)**3, 27*x**6)                 # uttrykk = forventet (sympy forenkler)
chk("1.2b", Rational(2, 3)**2, Rational(4, 9))    # brøker med Rational, aldri 0.666
los("2.3a", Eq(x**2 - 5*x + 6, 0), [2, 3])         # løs likning, sammenlign løsningsmengden
los("3.4", Eq(2*x + 1, 2*x + 3), [])               # ingen løsning
los("3.5", (2*(x + 1), 2*x + 2), "alle")          # alle tillatte verdier (bruk tuppel, ikke Eq,
                                                   # ellers gjør sympy identiteten om til True)
los("3.6", Eq(x/(x - 2), 2/(x - 2) + 3), [])        # x = 2 fjernes automatisk (nevner 0)
ulikhet("2.4a", x**2 - 2*x - 3 < 0, Interval(-1, 3, True, True))   # <-1, 3>  (True = åpent endepunkt)
ulikhet("2.4b", 2*x**2 >= 8*x, Union(Interval(-oo, 0), Interval(4, oo)))
sant("2.8", Rational(1, 1024) < Rational(1, 1000), "rekkefølge")
aapen("2.7", "Forklaringsoppgave")                 # bare for oppgaver som ikke kan regnes
rapport()                                          # alltid sist
```

- **Minst én kontroll per oppgave og per «Sjekk deg selv».** Nummer = oppgavenummer + bokstav.
- Regn oppgaven *fra oppgaveteksten*, ikke fra svaret du tror er riktig. Eksempel: for «løs likningen»
  skal sympy løse likningen. Ikke skriv `chk("2.3a", 3, 3)`.
- Kontroller **hvert steg** i eksemplene, ikke bare svaret: hver linje i `stegtabell` skal være lik linja
  før (`chk("Eks 2.1 steg 3", venstre - hoyre, ...)`). Eleven kopierer stegene.
- «Finn den første feilen»: kontroller hver pil for seg (`sant("1.6 pil 1", ...)`), og la fasiten nevne
  steget med innhold («overgangen til $3x + 18 - 2x - 4 = 24$»), ikke bare et pilnummer.
- Programmeringsoppgaver: kjør **koden slik den står i oppgaven** (med hullene fylt inn) og sammenlign utskriften.
- Programmeringsoppgaver: kjør koden i Python og sammenlign utskriften.
- Høyst ca. 1/3 av kontrollene kan være `aapen`.

---

## 9. Visuell kontroll av PNG-ene

Se på hver side i `build/<nr>/` (`teori-side-*.png`, `utfordring-side-*.png`, `fasit-side-*.png`). Rett:
- Oppgavehode eller nivåhode alene nederst på en side.
- Tekst eller formler som går ut i margen eller over hverandre.
- En side som bare har én boks og resten tomt (flytt eller del opp).
- Deloppgaver i `tasks` som brytes stygt (bytt antall spalter).
- Brøker som kolliderer med linjen under (bruk `\[ … \]` eller `stegtabell`).
- Fasiten over 2 sider (kort ned forklaringene).

Ikke bruk `\newpage`, `\vspace{-…}` eller `\clearpage` for å fikse layout. Endre innholdet i stedet.

---

## 10. Dette stopper sjekk.py (FEIL)

Preamble i innholdsfiler · egne makroer · `tabularx` · `$$` · `\section` · manuelle sideskift ·
desimalpunktum i matematikk · feil boksrekkefølge · mangler nivå 1/2/3 eller sjekk ·
oppgavenummer i feil rekkefølge · nivå som ikke passer nivåhodet · oppgave uten fasit ·
oppgave uten kontroll i `verifiser.py` · `verifiser.py` med feil.

---

## 11. Rapport når du er ferdig

Skriv kort:
1. Filene du laget, antall sider i hver PDF.
2. `verifiser.py`: antall kontroller, antall åpne, antall feil (skal være 0).
3. ADVARSLER du lot stå, og hvorfor.
4. Hva du er usikker på faglig (vær ærlig — det er bedre enn en skjult feil).
5. Avvik fra `brief.md`, og hvorfor.
