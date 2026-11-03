# Brief 3.6 Modellering

Skrevet av: arkitekt · Dato: 2026-11-03

## Plass i læreverket
- Kapittel 3 Funksjoner. Siste seksjon i kapittel 3.
- Bygger på: 3.1 lineære funksjoner, 3.2 andregradsfunksjoner, 3.5 eksponential- og potensfunksjoner (gjenkjenne type fra tabell), 2.1 formler.
- Brukes senere i: 4.1 vekstfart i modeller.
- Kompetansemål:
  - **KM7** — «modellere situasjoner knyttet til ulike temaer, drøfte, presentere og forklare resultatene og argumentere for om modellene er gyldige»
  - **KM8** — «lese, hente ut og vurdere matematikk i relevante tekster om ulike temaer og presentere relevante beregninger og analyser av resultatene»
  - **KM3** — «identifisere variable størrelser i ulike situasjoner, sette opp formler og utforske disse ved hjelp av digitale verktøy»
  Skriv `\kompetansemaal{7,8,3}`. Utfordringsarket dekker også KM1.

## Deler
1. **Regresjon med digitale verktøy** — Fra data til modell: (1) se på sammenhengen og grafen, (2) velg modelltype ut fra hva du vet om situasjonen og om tabellen (fast differanse, fast forhold — fra 3.5), (3) bruk regresjon, (4) tolk konstantene med enhet, (5) vurder.
   Teoriboksen: en arbeidsgang i fem punkter, og en liten tabell over modelltyper og når de passer.
   GeoGebra: regresjon i regnearket (marker data → «Regresjonsanalyse») eller med kommandoer. **Kommandonavnene i norsk GeoGebra er usikre for arkitekten** (trolig `RegLin`, `RegEksp`, `RegPot`, `RegPoly`). Skriv derfor instruksjonen via verktøyet «Regresjonsanalyse», og nevn kommandoene bare som «for eksempel».
   Variabelvalg: la $x$ være «år etter 2010» og ikke årstallet — forklar hvorfor.
2. **Vurdere modeller og lese tekster** — Gyldighetsområde: hvor gir modellen mening? Faren ved å bruke modellen langt utenfor dataene. En høy forklaringsgrad ($R^2$) er ikke nok — modellen må passe med situasjonen (f.eks. eksponentiell vekst kan ikke vare evig; et andregradsuttrykk for pris kan gi negative verdier).
   KM8: lese en kort tekst (lag den selv, som et tenkt avisutdrag), hente ut tallene, regne, og vurdere en påstand i teksten.

## Data og tall
- **Bruk bare tenkte data**, og merk tabellene «tenkte data» eller «avrundede, tenkte tall». Ikke skriv at tallene kommer fra SSB eller andre kilder.
- Lag dataene slik at de har et tydelig mønster med litt støy (to desimaler eller hele tall), og regn ut regresjonen selv i `verifiser.py` (numpy/sympy minste kvadraters metode) så fasiten har riktige konstanter (oppgi med to–tre gjeldende siffer).

## Ord
del 1: modell, regresjon, variabel (gjenta), modelltype
del 2: gyldighetsområde, prognose, forklaringsgrad, vurdere

## Vanlige misoppfatninger som oppgavene skal fange
- Velger modellen med høyest $R^2$ uten å tenke på situasjonen
- Bruker modellen langt utenfor dataene uten forbehold
- Bruker årstall som $x$ og får meningsløse konstanter
- Tolker konstantene uten enhet
- Tror modellen er virkeligheten («modellen viser at …» i stedet for «ifølge modellen …»)

## Eksempler
- Del 1: Eksempel: tenkte data for antall brukere av en app over 6 måneder (tydelig eksponentiell). Velg modell, regresjon (vis resultat), tolk $a$ og $b$ med enhet.
- Del 2: Eksempel: en andregradsmodell for temperatur gjennom et døgn (tenkt) — hvor er modellen gyldig, og hva sier den feil om natten?

## Nivå 3 og utfordringsarket — idéer
- To modeller (lineær og eksponentiell) passer omtrent like godt for de samme dataene. Hvilken bør brukes for en prognose om 10 år? Argumenter ut fra situasjonen.
- Lag selv et datasett med 5 punkter som passer best med en potensmodell. Forklar hvordan du sikret det (kobling 3.5: fast forhold når $x$ dobles).
- Tekst (KM8): et tenkt avisutdrag med en påstand («Med denne veksten vil alle i Norge bruke appen innen 2030»). Finn tallene, lag en modell, og vurder påstanden. Hva mangler for å kunne vurdere den?
- **Programmering (KM1):** Minste kvadraters metode for en rett linje med formlene $a = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}$, $b = \bar y - a\bar x$. Gi programmet med hull. Sammenlign med GeoGebra. (Ikke krev bevis for formlene.)
- Vurder: hvorfor kan ikke en eksponentiell modell for befolkning gjelde i 200 år? Hva slags kurve ville passet bedre? (Nevn bare at det finnes modeller med en øvre grense; ikke innfør logistisk vekst.)

## Hjelpemidler
Del 1 nesten alt `\mh`, men minst to `\uh`-oppgaver (velge modelltype fra tabell, tolke gitte konstanter). Del 2 blandet. Programmering `\prog`.

## Spesielle ønsker
- Ikke lag oppgaver som krever en bestemt GeoGebra-versjon eller knappetrykk. Skriv «Bruk regresjon i et digitalt verktøy».
- Fasiten gir regresjonskonstantene med to–tre gjeldende siffer og sier at små avvik er greit.
- Svar på vurderingsoppgaver: gi to–tre gode poeng et elevsvar bør ha, ikke én fasitsetning.
