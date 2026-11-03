# Læreverk i Matematikk 1T

Eget læreverk for 1T (LK20, MAT09-02), laget av Marius. Utdata er PDF-er som legges i OneNote.
Designet er låst og bygger på 4FOB-heftene (`stil/laereverk.sty`).

## Struktur

```
stil/laereverk.sty        Design. Låst. Endres bare av arkitekten etter avtale med Marius.
stil/oppsett.tex          Læreverksinnstillinger (fagnavn, «Mitt språk» av/på).
laereplan/kapittelplan.md Alle kapitler og seksjoner, med kompetansemål (KM) og status.
laereplan/kompetansemaal-1T.md  De 14 målene ordrett fra udir.no (KM1–KM14). Ikke endre ordlyden.
kapitler/<NN-kapittel>/<n.m-seksjon>/
    brief.md              Bestilling fra arkitekten. Forfatteren leser, endrer ikke.
    meta.tex              Tittel, mål, «Hva kan jeg?».
    teori-og-oppgaver.tex 1–3 deler. Hver del: ord, teori, eksempel, vanlige feil, nivå 1–3, sjekk.
    utfordring.tex        Ekstra utfordringsark (oppgaver U1, U2 …).
    fasit.tex             Fasit for alt over.
    verifiser.py          Regner alle svar på nytt med sympy.
pdf/<NN-kapittel>/        Ferdige PDF-er (sjekkes inn i git, lastes ned til OneNote).
verktoy/                  bygg.py, sjekk.py, kontroll.py, installer.sh
.claude/agents/           forfatter (Haiku), kontrollor (Sonnet)
.claude/skills/ny-seksjon Arbeidsflyten for å lage en ny seksjon.
```

Mønsterseksjon: `kapitler/01-tall-og-algebra/1.1-potenser/`. Nye seksjoner skal ligne den.

## Én seksjon = tre PDF-er

| PDF | Innhold | Typisk lengde |
|---|---|---|
| `<nr> <tittel> - Teori og oppgaver.pdf` | forside med «Hva kan jeg?», deler med teori og oppgaver på tre nivå | 4–8 sider |
| `<nr> <tittel> - Ekstra utfordring.pdf` | utfordringsark for elever som er ferdige | 2–3 sider |
| `<nr> <tittel> - Fasit.pdf` | fasit for begge | 1–2 sider |

Hold PDF-ene korte. OneNote gjør hver PDF-side om til et bilde.

## Kommandoer

```bash
python3 verktoy/bygg.py kapitler/01-tall-og-algebra/1.1-potenser --forhandsvis   # sjekk + bygg + PNG
python3 verktoy/sjekk.py kapitler/01-tall-og-algebra/1.1-potenser                # bare sjekk
python3 verktoy/bygg.py --alle
```

`bygg.py` installerer LaTeX selv hvis det mangler (tar et par minutter første gang).

## Arbeidsdeling mellom modeller

1. **Arkitekt (hovedøkta, sterk modell):** skriver `brief.md`, holder kapittelplanen, godkjenner.
2. **Forfatter (Haiku, `.claude/agents/forfatter.md`):** skriver innholdsfilene etter brief og
   `FORFATTERGUIDE.md`, kjører bygg, ser på PNG-ene, retter.
3. **Kontrollør (Sonnet, `.claude/agents/kontrollor.md`):** regner alt på nytt uavhengig, vurderer
   nivå og språk, rapporterer. Endrer ikke filer.
4. Arkitekten retter eller sender tilbake (maks to runder), oppdaterer kapittelplanen, committer.

Bruk `/ny-seksjon <nr>` for hele flyten.

## Regler for alle

- Les `FORFATTERGUIDE.md` før du skriver innhold. Den er fasiten for format og kvalitet.
- Ikke endre `stil/` eller `verktoy/` mens du skriver innhold. Trengs en ny makro, si fra.
- Alle svar i fasiten skal være regnet på nytt i `verifiser.py`. 0 feil før bygging.
- Kompetansemål oppgis bare som ID-er i `meta.tex`: `\kompetansemaal{6}` eller `{9,11}`. `bygg.py` henter
  teksten ordrett fra `laereplan/kompetansemaal-1T.md`. Skriv aldri målteksten selv.
- Hver seksjon skal bidra til målene i kapittelplanen. Oppgavene skal bruke verbene i målet
  (utforske, forklare, begrunne, modellere), ikke bare drille teknikk.
- Ingen modellnavn i filer, commits eller PDF-er.
- Commit kildefiler og PDF-er sammen. `build/` sjekkes ikke inn.
