#!/usr/bin/env python3
"""Sjekker en seksjon mot reglene i FORFATTERGUIDE.md før bygging.

Bruk:  python3 verktoy/sjekk.py kapitler/01-tall-og-algebra/1.1-potenser

Gir FEIL (må rettes) og ADVARSEL (bør vurderes). Avslutter med kode 1 ved FEIL.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
FILER = ["brief.md", "meta.tex", "teori-og-oppgaver.tex", "utfordring.tex", "fasit.tex", "verifiser.py"]
INNHOLD = ["meta.tex", "teori-og-oppgaver.tex", "utfordring.tex", "fasit.tex"]

FORBUDT = [
    (r"\\documentclass|\\usepackage|\\begin\{document\}", "Innholdsfiler skal ikke ha preamble. Byggeskriptet lager den."),
    (r"\\newcommand|\\renewcommand(?!\{\\arraystretch\})|\\def\\|\\newenvironment", "Ikke lag egne makroer. Bruk makroene i FORFATTERGUIDE.md."),
    (r"\\begin\{tabularx\}", "tabularx krasjer inni bokser. Bruk tabular med p{}-kolonner."),
    (r"\$\$", "Bruk \\[ ... \\] for sentrert matematikk, ikke $$."),
    (r"\\kapittel\{", "\\kapittel er fra matte-hefte. Bruk \\del{nr}{tittel}."),
    (r"\\nivaahode\{\d\}\{", "\\nivaahode tar bare ett argument: \\nivaahode{1}."),
    (r"\\section|\\subsection", "Ikke bruk \\section. Bruk \\del eller en infoboks."),
    (r"\\color\{(red|blue|green|orange|yellow)\}", "Bruk bare læreverkets farger (hoved, niv1, niv2, niv3, graa)."),
    (r"\\vspace\{-", "Negativ \\vspace skjuler layoutfeil. Fjern den."),
    (r"\\newpage|\\clearpage|\\pagebreak", "Sidebrudd styres av \\del og \\needspace. Fjern manuelle sideskift."),
]

feil, advarsler = [], []


def F(msg):
    feil.append(msg)


def A(msg):
    advarsler.append(msg)


def les(p):
    return p.read_text(encoding="utf-8") if p.exists() else ""


def uten_kommentarer(tekst):
    return "\n".join(re.sub(r"(?<!\\)%.*", "", linje) for linje in tekst.splitlines())


def matte_segmenter(tekst):
    yield from re.findall(r"(?<!\\)\$(.+?)(?<!\\)\$", tekst, flags=re.S)
    yield from re.findall(r"\\\[(.+?)\\\]", tekst, flags=re.S)


def sjekk_forbudt(navn, tekst):
    for i, linje in enumerate(tekst.splitlines(), 1):
        for monster, grunn in FORBUDT:
            if re.search(monster, linje):
                F(f"{navn}:{i}: {grunn}")
    for seg in matte_segmenter(tekst):
        if re.search(r"\d\.\d", seg):
            F(f"{navn}: desimalpunktum i matematikk «{seg.strip()[:40]}». Bruk komma: 0,25.")
        if re.search(r"\d\s*\*\s*\d|\*", seg) and "\\*" not in seg:
            A(f"{navn}: «*» i matematikk «{seg.strip()[:40]}». Bruk \\cdot.")


def finn_oppgaver(tekst):
    return [(m.group(1), int(m.group(2)), m.group(3), m.start())
            for m in re.finditer(r"\\oppg\{([^}]*)\}\{(\d)\}\{\\(uh|mh|prog|uk|mk)\}", tekst)]


def sjekk_teori(tekst):
    """Struktur per del: ordliste, mustkunne, eksempel, vanligfeil, nivå 1-3, sjekk."""
    deler = list(re.finditer(r"\\del\{(\d+)\}\{", tekst))
    if not deler:
        F("teori-og-oppgaver.tex: ingen \\del{nr}{tittel}.")
        return [], []
    if len(deler) > 4:
        A(f"teori-og-oppgaver.tex: {len(deler)} deler. Mer enn 4 gir en tung PDF i OneNote. Vurder å dele seksjonen.")
    alle_oppg, delnr = [], []
    for i, d in enumerate(deler):
        nr = d.group(1)
        delnr.append(nr)
        slutt = deler[i + 1].start() if i + 1 < len(deler) else len(tekst)
        blokk = tekst[d.start():slutt]
        rekkefolge = ["ordliste", "mustkunne", "eksempel", "vanligfeil"]
        pos = -1
        for env in rekkefolge:
            m = re.search(r"\\begin\{" + env + r"\}", blokk)
            if not m:
                F(f"Del {nr}: mangler boksen «{env}».")
            elif m.start() < pos:
                F(f"Del {nr}: «{env}» står i feil rekkefølge (skal være {', '.join(rekkefolge)}).")
            else:
                pos = m.start()
        ord_ant = 0
        m = re.search(r"\\begin\{ordliste\}(.*?)\\end\{ordliste\}", blokk, re.S)
        if m:
            ord_ant = m.group(1).count("\\mittsprak")
            if not 3 <= ord_ant <= 6:
                A(f"Del {nr}: {ord_ant} ord i ordlisten. Bruk 3–6.")
        nivaa = [(int(m.group(1)), m.start()) for m in re.finditer(r"\\nivaahode\{(\d)\}", blokk)]
        if [n for n, _ in nivaa] != [1, 2, 3]:
            F(f"Del {nr}: nivåhodene må være \\nivaahode{{1}}, {{2}}, {{3}} i den rekkefølgen. Fant {[n for n, _ in nivaa]}.")
        if not re.search(r"\\begin\{sjekk\}", blokk):
            F(f"Del {nr}: mangler «sjekk» (Sjekk deg selv) til slutt.")
        elif nivaa and re.search(r"\\begin\{sjekk\}", blokk).start() < nivaa[-1][1]:
            F(f"Del {nr}: «sjekk» skal stå etter nivå 3.")
        oppg = finn_oppgaver(blokk)
        teller = {1: 0, 2: 0, 3: 0}
        forventet = 1
        for onr, niv, merke, p in oppg:
            if not re.fullmatch(rf"{nr}\.\d+", onr):
                F(f"Del {nr}: oppgave «{onr}» skal hete {nr}.1, {nr}.2 …")
            else:
                if int(onr.split(".")[1]) != forventet:
                    F(f"Del {nr}: oppgave {onr} kommer i feil rekkefølge (ventet {nr}.{forventet}).")
                forventet = int(onr.split(".")[1]) + 1
            gjeldende = max([n for n, s in nivaa if s < p], default=0)
            if gjeldende and niv != gjeldende:
                F(f"Oppgave {onr}: nivå {niv}, men står under Nivå {gjeldende}.")
            if niv in teller:
                teller[niv] += 1
        for niv, minst, maks in [(1, 2, 5), (2, 2, 5), (3, 1, 4)]:
            if teller[niv] < minst:
                F(f"Del {nr}: bare {teller[niv]} oppgaver på nivå {niv}. Minst {minst}.")
            if teller[niv] > maks:
                A(f"Del {nr}: {teller[niv]} oppgaver på nivå {niv}. Mer enn {maks} er mye.")
        alle_oppg += [o[0] for o in oppg]
    return alle_oppg, delnr


def sjekk_utfordring(tekst):
    oppg = finn_oppgaver(tekst)
    if len(oppg) < 4:
        F(f"utfordring.tex: {len(oppg)} oppgaver. Minst 4.")
    if sum(1 for o in oppg if o[1] == 3) < 2:
        F("utfordring.tex: minst 2 oppgaver på nivå 3.")
    if sum(1 for o in oppg if o[1] == 1) > 1:
        A("utfordring.tex: mer enn én nivå 1-oppgave på utfordringsarket.")
    for i, (onr, *_r) in enumerate(oppg, 1):
        if onr != f"U{i}":
            F(f"utfordring.tex: oppgave «{onr}» skal hete U{i}.")
    if not re.search(r"\\begin\{oppsummering\}", tekst):
        A("utfordring.tex: avslutt gjerne med boksen «oppsummering».")
    return [o[0] for o in oppg]


def sjekk_fasit(tekst, oppgaver, delnr):
    fo = set(re.findall(r"\\fo\{([^}]*)\}", tekst))
    for o in oppgaver:
        if o not in fo:
            F(f"fasit.tex: mangler \\fo{{{o}}}.")
    for d in delnr:
        if f"Sjekk {d}" not in fo:
            F(f"fasit.tex: mangler \\fo{{Sjekk {d}}}.")
    ekstra = fo - set(oppgaver) - {f"Sjekk {d}" for d in delnr}
    for e in sorted(ekstra):
        A(f"fasit.tex: \\fo{{{e}}} finnes ikke som oppgave.")


def sjekk_verifisering(mappe, oppgaver, delnr):
    env = dict(os.environ, PYTHONPATH=str(ROT / "verktoy"))
    r = subprocess.run([sys.executable, "verifiser.py"], cwd=mappe, env=env, capture_output=True, text=True)
    print(r.stdout.strip())
    if r.returncode != 0:
        F("verifiser.py: " + (r.stderr.strip().splitlines()[-1] if r.stderr.strip() else "en eller flere kontroller feilet."))
    logg = mappe / ".kontroll.json"
    if not logg.exists():
        F("verifiser.py skrev ingen rapport. Avslutt skriptet med rapport().")
        return
    nr_kontrollert = [k["nr"] for k in json.loads(logg.read_text(encoding="utf-8"))]
    for o in oppgaver + [f"Sjekk {d}" for d in delnr]:
        if not any(re.fullmatch(re.escape(o) + r"[a-z]?\d*", k) for k in nr_kontrollert):
            F(f"verifiser.py: ingen kontroll for oppgave {o}.")
    aapne = [k for k in json.loads(logg.read_text(encoding="utf-8")) if k["type"] == "aapen"]
    if nr_kontrollert and len(aapne) / len(nr_kontrollert) > 0.35:
        A(f"verifiser.py: {len(aapne)} av {len(nr_kontrollert)} kontroller er åpne. Regn ut det som kan regnes.")


def sjekk_sprak(navn, tekst):
    ren = re.sub(r"\$.*?\$|\\\[.*?\\\]", " X ", tekst, flags=re.S)
    ren = re.sub(r"\\begin\{(kode|stegtabell|tasks)\}.*?\\end\{\1\}", " ", ren, flags=re.S)
    ren = re.sub(r"\\(begin|end)\{[^}]*\}(\[[^\]]*\])?(\{[^}]*\})*", ". ", ren)
    ren = re.sub(r"\n\s*\n|\\task!?|\\item|&", ". ", ren)
    ren = re.sub(r"\\[a-zA-Z]+\*?(\[[^\]]*\])?", " ", ren)
    ren = re.sub(r"[{}&]|\\\\", " ", ren)
    for setning in re.split(r"(?<=[.!?])\s+", ren):
        ord_ = setning.split()
        if len(ord_) > 25:
            A(f"{navn}: lang setning ({len(ord_)} ord): «{' '.join(ord_[:8])} …»")


def sjekk_meta(tekst, delnr):
    if not re.search(r"\\seksjon\{[\d.]+\}\{[^}]+\}", tekst):
        F("meta.tex: mangler \\seksjon{nr}{tittel}.")
    for kommando in ["undertittel", "maal", "kompetansemaal", "hvakanjeg"]:
        if f"\\{kommando}{{" not in tekst:
            F(f"meta.tex: mangler \\{kommando}{{…}}.")
    kan_deler = set(re.findall(r"\\kan\{(\d+)\}", tekst))
    for d in delnr:
        if d not in kan_deler:
            F(f"meta.tex: «Hva kan jeg?» har ingen \\kan{{{d}}}{{…}}-linje for del {d}.")


def main(mappe):
    mappe = Path(mappe).resolve()
    print(f"== Sjekker {mappe.relative_to(ROT)}")
    if " " in mappe.name or not re.fullmatch(r"\d+\.\d+-[a-z0-9-]+", mappe.name):
        F(f"Mappenavnet «{mappe.name}» skal se slik ut: 1.1-potenser (små bokstaver, bindestrek, ikke æøå).")
    for f in FILER:
        if not (mappe / f).exists():
            F(f"Mangler fila {f}.")
    tekster = {f: uten_kommentarer(les(mappe / f)) for f in INNHOLD}
    for navn, t in tekster.items():
        sjekk_forbudt(navn, t)
    oppg, delnr = sjekk_teori(tekster["teori-og-oppgaver.tex"])
    uoppg = sjekk_utfordring(tekster["utfordring.tex"])
    sjekk_meta(tekster["meta.tex"], delnr)
    sjekk_fasit(tekster["fasit.tex"], oppg + uoppg, delnr)
    for navn in ["teori-og-oppgaver.tex", "utfordring.tex"]:
        sjekk_sprak(navn, tekster[navn])
    if (mappe / "verifiser.py").exists():
        sjekk_verifisering(mappe, oppg + uoppg, delnr)
    for a in advarsler:
        print("  ADVARSEL", a)
    for f in feil:
        print("  FEIL    ", f)
    print(f"== {len(feil)} feil, {len(advarsler)} advarsler")
    return 1 if feil else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    sys.exit(main(sys.argv[1]))
