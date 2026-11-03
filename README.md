# Læreverk i Matematikk 1T

Teori, oppgaver på tre nivå, ekstra utfordringsark og fasit for hele 1T (LK20, MAT09-02),
som PDF-er for OneNote. 23 seksjoner, 69 PDF-er.

**Ferdige PDF-er:** mappen [`pdf/`](pdf/). Hver seksjon har tre filer:
*Teori og oppgaver*, *Ekstra utfordring* og *Fasit*.

**Kapittel 1 Tall og algebra**

- 1.1 Potenser
- 1.2 Kvadratsetningene og faktorisering
- 1.3 Rotuttrykk og brøkeksponenter
- 1.4 Rasjonale uttrykk

**Kapittel 2 Likninger og ulikheter**

- 2.1 Uttrykk, identiteter, likninger og formler
- 2.2 Likningssystemer
- 2.3 Andregradslikninger
- 2.4 Ulikheter

**Kapittel 3 Funksjoner**

- 3.1 Funksjonsbegrepet og lineære funksjoner
- 3.2 Andregradsfunksjoner
- 3.3 Polynomfunksjoner og polynomdivisjon
- 3.4 Rasjonale funksjoner
- 3.5 Eksponential- og potensfunksjoner
- 3.6 Modellering

**Kapittel 4 Vekstfart og derivasjon**

- 4.1 Gjennomsnittlig og momentan vekstfart
- 4.2 Den deriverte
- 4.3 Derivasjonsregler for polynom
- 4.4 Drøfting av funksjoner

**Kapittel 5 Trigonometri**

- 5.1 Sinus, cosinus og tangens
- 5.2 Arealsetningen
- 5.3 Sinussetningen
- 5.4 Cosinussetningen
- 5.5 Sammensatte problemer

Alle svar og mellomsteg i fasitene er regnet på nytt med Python (sympy) — rundt 3 500 kontroller.
Hver seksjon er skrevet av en forfatter-agent og kontrollert av en kontrollør-agent før godkjenning.

## Legge PDF-ene i OneNote
1. Last ned PDF-en fra GitHub (åpne fila → «Download raw file»).
2. I OneNote: **Sett inn → Filutskrift** (*Insert → File Printout*). Hver PDF-side blir en side elevene kan skrive på.
3. Fasiten legges i lærerdelen eller låses til du vil dele den.

## Endre eller lage ny seksjon (i Claude Code)
Skriv `/ny-seksjon 2.5` (eller be om endringer i en seksjon). Se `CLAUDE.md` og `FORFATTERGUIDE.md`.

## Bygge selv
```bash
python3 verktoy/bygg.py --alle
```
