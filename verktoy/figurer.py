#!/usr/bin/env python3
"""Lager TikZ-kode for fortegnslinjer og tallinjer i læreverkets faste stil.

Fortegnene og nullpunktene REGNES ut med sympy — de tegnes aldri for hånd.
Lim utskriften inn i .tex-fila (i en tikzpicture-blokk som den står).

Fortegnslinje for (x+1)(x-3):
    python3 verktoy/figurer.py fortegn "x+1" "x-3"
Med nevner (merkes med ×, aldri med i løsningen) og eget navn på produktlinja:
    python3 verktoy/figurer.py fortegn "x-1" "/x+2" --navn "\\frac{x-1}{x+2}"
Tallinje for løsningsmengden [-1, 3> og <5, ->:
    python3 verktoy/figurer.py tallinje "[-1,3>" "<5,->" --fra -3 --til 7

Fra Python:
    from figurer import fortegnslinje, tallinje
    print(fortegnslinje(["x+1", "x-3"]))

Stil: én rad per faktor, loddrett grå strek og 0 ved hvert nullpunkt, heltrukket = positiv,
stiplet = negativ, produktlinja i hovedfargen. × markerer nullpunkt i en nevner.
"""
import argparse
import re

import sympy as sp

x = sp.symbols("x")


def _tex(v):
    return sp.latex(v).replace(r"\frac", r"\tfrac")


def fortegnslinje(faktorer, navn=None, bredde=1.9, marg=1.4):
    """faktorer: liste av strenger/uttrykk. Start en streng med '/' for faktor i nevneren."""
    rader = []
    for f in faktorer:
        nevner = isinstance(f, str) and f.startswith("/")
        uttr = sp.sympify(f[1:] if nevner else f, locals={"x": x})
        rader.append((sp.latex(uttr), uttr, nevner))
    nuller = sorted({v for _, u, _ in rader for v in sp.solveset(u, x, sp.S.Reals)}, key=float)
    if not nuller:
        raise ValueError("Ingen av faktorene har reelle nullpunkter.")
    test = [nuller[0] - 1] + [(nuller[i] + nuller[i + 1]) / 2 for i in range(len(nuller) - 1)] + [nuller[-1] + 1]
    p = [marg + bredde * i for i in range(len(nuller))]
    kant = [0] + p + [p[-1] + marg]
    dy = 0.7
    ys = [-dy * i for i in range(len(rader))]
    yprod = ys[-1] - dy - 0.15
    ytop, ybot = 0.4, yprod - 0.4

    ut = [r"\begin{tikzpicture}[font=\small,fpos/.style={line width=1.1pt},"
          r"fneg/.style={line width=1.1pt,dash pattern=on 4pt off 3pt}]"]
    for pi in p:
        ut.append(rf"  \draw[graa,thin] ({pi:.2f},{ytop:.2f}) -- ({pi:.2f},{ybot:.2f});")

    def linje(y, tegn, farge=""):
        for i, s in enumerate(tegn):
            stil = ("fpos" if s > 0 else "fneg") + ("," + farge if farge else "")
            ut.append(rf"  \draw[{stil}] ({kant[i]:.2f},{y:.2f}) -- ({kant[i+1]:.2f},{y:.2f});")

    def merke(xp, y, sym):
        ut.append(rf"  \node[fill=white,inner sep=1.5pt] at ({xp:.2f},{y:.2f}) {{${sym}$}};")

    prod_tegn = [1] * len(test)
    prod_merke = [None] * len(nuller)
    for (lab, u, nevner), y in zip(rader, ys):
        tegn = [int(sp.sign(u.subs(x, t))) for t in test]
        prod_tegn = [a * b for a, b in zip(prod_tegn, tegn)]
        ut.append(rf"  \node[anchor=east] at (-0.15,{y:.2f}) {{${lab}$}};")
        linje(y, tegn)
        for i, v in enumerate(nuller):
            if sp.simplify(u.subs(x, v)) == 0:
                if nevner:
                    prod_merke[i] = r"\times"
                elif prod_merke[i] is None:
                    prod_merke[i] = "0"
                merke(p[i], y, r"\times" if nevner else "0")
    produkt = navn or " ".join(f"({l})" if len(rader) > 1 else l for l, _, n in rader if not n)
    ut.append(rf"  \node[anchor=east] at (-0.15,{yprod:.2f}) {{${produkt}$}};")
    linje(yprod, prod_tegn, "hoved")
    for i, m in enumerate(prod_merke):
        if m:
            merke(p[i], yprod, m)
    for pi, v in zip(p, nuller):
        ut.append(rf"  \node[below] at ({pi:.2f},{ybot:.2f}) {{${_tex(v)}$}};")
    ut.append(r"\end{tikzpicture}")
    return "\n".join(ut)


def _les_intervall(s):
    """'[-1,3>' -> (-1, 3, True, False). '<5,->' -> (5, None, False, False). '<-,2]' -> (None, 2, False, True)."""
    m = re.fullmatch(r"\s*([\[<])\s*([^,]+?)\s*,\s*([^\]>]+?)\s*([\]>])\s*", s)
    if not m:
        raise ValueError(f"Kan ikke lese intervallet {s!r}. Bruk f.eks. [-1,3> eller <5,->.")
    a = None if m.group(2) in ("-", "<-", "-oo") else float(sp.sympify(m.group(2)))
    b = None if m.group(3) in ("-", "->", "oo") else float(sp.sympify(m.group(3)))
    return a, b, m.group(1) == "[", m.group(4) == "]"


def tallinje(intervaller, fra, til, enhet=0.75):
    ut = [rf"\begin{{tikzpicture}}[x={enhet}cm,font=\small]"]
    ut.append(rf"  \draw[-{{Stealth[length=2mm]}}] ({fra-0.5},0) -- ({til+0.5},0);")
    for i in range(fra, til + 1):
        ut.append(rf"  \draw ({i},0.07) -- ({i},-0.07) node[below,font=\scriptsize,inner sep=2pt] {{${i}$}};")
    for s in intervaller:
        a, b, ak, bk = _les_intervall(s) if isinstance(s, str) else s
        aa = fra - 0.5 if a is None else a
        bb = til + 0.5 if b is None else b
        ut.append(rf"  \draw[hoved,line width=2.2pt] ({aa},0) -- ({bb},0);")
        for v, lukket in ((a, ak), (b, bk)):
            if v is not None:
                ut.append(rf"  \filldraw[hoved,fill={'hoved' if lukket else 'white'},line width=0.9pt] ({v},0) circle (2.6pt);")
    ut.append(r"\end{tikzpicture}")
    return "\n".join(ut)


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="type", required=True)
    f = sub.add_parser("fortegn")
    f.add_argument("faktorer", nargs="+")
    f.add_argument("--navn")
    t = sub.add_parser("tallinje")
    t.add_argument("intervaller", nargs="+")
    t.add_argument("--fra", type=int, required=True)
    t.add_argument("--til", type=int, required=True)
    a = p.parse_args()
    print(fortegnslinje(a.faktorer, a.navn) if a.type == "fortegn" else tallinje(a.intervaller, a.fra, a.til))
