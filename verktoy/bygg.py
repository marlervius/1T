#!/usr/bin/env python3
"""Bygger PDF-er for én eller flere seksjoner.

Bruk:
  python3 verktoy/bygg.py kapitler/01-tall-og-algebra/1.1-potenser
  python3 verktoy/bygg.py --alle
  python3 verktoy/bygg.py <mappe> --forhandsvis     # lager PNG-er i build/ for visuell kontroll

For hver seksjon lages tre PDF-er i pdf/<kapittel>/:
  «1.1 Potenser - Teori og oppgaver.pdf»
  «1.1 Potenser - Ekstra utfordring.pdf»
  «1.1 Potenser - Fasit.pdf»
"""
import argparse
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
STIL = ROT / "stil"
BUILD = ROT / "build"
PDF = ROT / "pdf"

DOKUMENTER = [
    # (filnavn, dokumenttype, forside, innhold)
    ("teori", 1, r"\forsideteori", r"\input{SEKSJON/teori-og-oppgaver}"),
    ("utfordring", 2, r"\forsideutfordring", r"\input{SEKSJON/utfordring}"),
    ("fasit", 3, r"\forsidefasit", r"\begin{fasitspalter}\input{SEKSJON/fasit}\end{fasitspalter}"),
]
NAVN = {"teori": "Teori og oppgaver", "utfordring": "Ekstra utfordring", "fasit": "Fasit"}

MAL = r"""\documentclass[11pt,a4paper]{article}
\usepackage{laereverk}
\input{oppsett}
\renewcommand{\dokumenttype}{TYPE}
\input{SEKSJON/meta}
\begin{document}
FORSIDE
INNHOLD
\end{document}
"""


def installer_latex():
    if shutil.which("latexmk") and shutil.which("pdftoppm"):
        return
    print("LaTeX mangler. Kjører verktoy/installer.sh (tar et par minutter) …")
    subprocess.run(["bash", str(ROT / "verktoy" / "installer.sh")], check=True)


def ren_tittel(t):
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    return re.sub(r"[${}\\/:]", "", t).strip()


def les_meta(mappe):
    meta = (mappe / "meta.tex").read_text(encoding="utf-8")
    m = re.search(r"\\seksjon\{([^}]*)\}\{([^}]*)\}", meta)
    if not m:
        sys.exit(f"{mappe}: fant ikke \\seksjon{{nr}}{{tittel}} i meta.tex")
    return m.group(1), ren_tittel(m.group(2))


def sjekk_logg(logg, navn):
    tekst = logg.read_text(encoding="latin-1", errors="replace") if logg.exists() else ""
    meldinger = []
    for m in re.finditer(r"Overfull \\hbox \((\d+\.?\d*)pt too wide\)[^\n]*lines? (\d+)", tekst):
        if float(m.group(1)) > 3:
            meldinger.append(f"  ADVARSEL {navn}: tekst stikker {m.group(1)} pt ut i margen (linje {m.group(2)} i kildefila).")
    if "There were undefined references" in tekst or "Reference `" in tekst:
        meldinger.append(f"  ADVARSEL {navn}: udefinerte referanser.")
    return meldinger


def kompiler(mappe, forhandsvis):
    snr, tittel = les_meta(mappe)
    ut = BUILD / snr
    ut.mkdir(parents=True, exist_ok=True)
    kapittel = mappe.parent.name
    (PDF / kapittel).mkdir(parents=True, exist_ok=True)

    kilder = list(mappe.glob("*")) + list(STIL.glob("*"))
    epoch = str(int(max(p.stat().st_mtime for p in kilder if p.is_file())))
    env = dict(os.environ, TEXINPUTS=f"{STIL}:{mappe}:", SOURCE_DATE_EPOCH=epoch, FORCE_SOURCE_DATE="1")

    ok = True
    for navn, typ, forside, innhold in DOKUMENTER:
        tex = ut / f"{navn}.tex"
        tex.write_text(
            MAL.replace("TYPE", str(typ)).replace("FORSIDE", forside).replace("INNHOLD", innhold)
               .replace("SEKSJON", mappe.as_posix()),
            encoding="utf-8")
        r = subprocess.run(
            ["latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error", "-quiet", f"-outdir={ut}", str(tex)],
            env=env, capture_output=True, text=True)
        logg = ut / f"{navn}.log"
        if r.returncode != 0:
            ok = False
            print(f"  FEIL {navn}: LaTeX stoppet. Utdrag fra loggen:")
            tekst = logg.read_text(encoding="latin-1", errors="replace") if logg.exists() else r.stdout
            for blokk in re.findall(r"^! .*?(?:\n.*){0,6}", tekst, flags=re.M)[:3]:
                print("    " + blokk.replace("\n", "\n    "))
            continue
        for m in sjekk_logg(logg, navn):
            print(m)
        maal = PDF / kapittel / f"{snr} {tittel} - {NAVN[navn]}.pdf"
        shutil.copy(ut / f"{navn}.pdf", maal)
        sider = subprocess.run(["pdfinfo", str(maal)], capture_output=True, text=True).stdout
        antall = re.search(r"Pages:\s+(\d+)", sider)
        print(f"  OK   {maal.relative_to(ROT)}  ({antall.group(1) if antall else '?'} sider)")
        if forhandsvis:
            for gammel in ut.glob(f"{navn}-side-*.png"):
                gammel.unlink()
            subprocess.run(["pdftoppm", "-r", "60", "-png", str(ut / f"{navn}.pdf"), str(ut / f"{navn}-side")], check=True)
            print(f"       PNG per side: {(ut).relative_to(ROT)}/{navn}-side-*.png")
    return ok


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("mapper", nargs="*")
    p.add_argument("--alle", action="store_true")
    p.add_argument("--uten-sjekk", action="store_true", help="hopp over sjekk.py (bare for feilsøking)")
    p.add_argument("--forhandsvis", action="store_true")
    arg = p.parse_args()

    mapper = [Path(m).resolve() for m in arg.mapper]
    if arg.alle:
        mapper = sorted(m.parent for m in (ROT / "kapitler").glob("*/*/meta.tex"))
    if not mapper:
        p.error("oppgi minst én seksjonsmappe, eller --alle")

    installer_latex()
    sys.path.insert(0, str(ROT / "verktoy"))
    status = 0
    for m in mapper:
        if not arg.uten_sjekk:
            import sjekk
            sjekk.feil.clear()
            sjekk.advarsler.clear()
            if sjekk.main(m) != 0:
                print("  Bygger ikke før FEIL er rettet.\n")
                status = 1
                continue
        print(f"== Bygger {m.relative_to(ROT)}")
        if not kompiler(m, arg.forhandsvis):
            status = 1
        print()
    sys.exit(status)


if __name__ == "__main__":
    main()
