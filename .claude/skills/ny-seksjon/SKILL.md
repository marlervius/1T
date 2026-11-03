---
name: ny-seksjon
description: Lager en ny seksjon i 1T-læreverket fra kapittelplanen — brief, forfatter-agent, kontrollør-agent, retting, PDF og commit. Bruk når Marius skriver «/ny-seksjon 1.2», «lag seksjon 2.3» eller «neste seksjon».
---

# Ny seksjon

Argument: seksjonsnummer, f.eks. `1.2`. Uten argument: første seksjon med status `—` i
`laereplan/kapittelplan.md`.

Du er arkitekten. Du skriver briefen og godkjenner. Forfatteren og kontrolløren gjør resten.

## 1. Brief (du)
1. Les `CLAUDE.md`, `laereplan/kapittelplan.md`, og briefen og fasiten til forrige seksjon
   (så du vet hva elevene har lært).
2. Lag mappa `kapitler/<NN-kapittel>/<nr>-<kort-navn>/` (små bokstaver, bindestrek, ikke æøå).
3. Skriv `brief.md` fra `maler/brief.md`. Ta med KM-ID-ene fra kapittelplanen og siter målene
   fra `laereplan/kompetansemaal-1T.md`. Vær konkret: deler, ord, 3–5 misoppfatninger,
   idéer til nivå 3 og utfordringsarket, én programmeringsidé. Briefen er det viktigste
   kvalitetsgrepet — en svak brief gir en svak seksjon.
4. Er noe faglig uklart (hører temaet til 1T? hvilken notasjon?), spør Marius før du går videre.
5. Sett status `brief` i kapittelplanen.

## 2. Forfatter
Start agenten `forfatter` med prompten:
«Skriv seksjonen i `<mappe>`. Følg instruksjonene dine.»
Les rapporten. Er det FEIL igjen, send den tilbake én gang med konkrete beskjeder.

## 3. Kontroll
Start agenten `kontrollor` med prompten: «Kontroller seksjonen i `<mappe>`.»

## 4. Retting (du)
- FEIL fra kontrolløren: rett selv hvis det er små ting, ellers send til `forfatter` med listen.
  Maks to runder totalt. Kjør `python3 verktoy/bygg.py <mappe> --forhandsvis` etterpå.
- Se selv på forsiden og én oppgaveside (PNG) før du godkjenner.

## 5. Avslutt
1. Sett status `ferdig` i kapittelplanen.
2. `git add kapitler/<…> pdf/<…> laereplan/kapittelplan.md` og commit:
   `Seksjon <nr> <tittel>: teori, oppgaver, utfordring, fasit`.
3. Push til arbeidsgrenen.
4. Svar Marius kort: hvilke PDF-er som er klare, antall sider, antall kontroller, og hva
   kontrolløren fant som du rettet. Nevn alt du er usikker på.
