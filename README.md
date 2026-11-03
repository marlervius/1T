# Læreverk i Matematikk 1T

Teori, oppgaver på tre nivå, ekstra utfordringsark og fasit, som PDF-er for OneNote.

**Ferdige PDF-er:** mappen [`pdf/`](pdf/). Hver seksjon har tre filer:
*Teori og oppgaver*, *Ekstra utfordring* og *Fasit*.

## Legge PDF-ene i OneNote
1. Last ned PDF-en fra GitHub (åpne fila → «Download raw file»).
2. I OneNote: **Sett inn → Filutskrift** (*Insert → File Printout*). Hver PDF-side blir en side elevene kan skrive på.
3. Fasiten legges i lærerdelen eller låses til du vil dele den.

## Lage en ny seksjon (i Claude Code)
Skriv `/ny-seksjon 1.2`. Da skriver hovedøkta en bestilling (`brief.md`), forfatter-agenten skriver innholdet,
kontrollør-agenten kontrollerer det, og PDF-ene havner i `pdf/`. Se `CLAUDE.md` for detaljer.

## Bygge selv
```bash
python3 verktoy/bygg.py --alle
```
