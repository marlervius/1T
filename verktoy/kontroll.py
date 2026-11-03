"""Felles bibliotek for verifiser.py i hver seksjon.

Hver seksjon har en verifiser.py som regner ALLE svar på nytt med sympy:

    from kontroll import *
    chk("1.1a", 2**3 * 2**2, 32)
    los("1.4b", Eq(3*x - 2, x + 6), [4])
    aapen("1.6c", "Forklaringsoppgave")
    rapport()

Regler:
- Bruk Rational(2, 3) eller S("2/3"), ikke 0.6667. Desimaltall bare når svaret er et desimaltall.
- Nummeret er oppgavenummeret pluss bokstav: "1.2a", "U3b", "Sjekk 1a".
- Hver oppgave i heftet og på utfordringsarket må ha minst én kontroll her.
"""
import json
import sys
from pathlib import Path

from sympy import *  # noqa: F401,F403  (gjør x, sqrt, Rational osv. tilgjengelig)
from sympy import S, Eq, simplify, nsimplify, FiniteSet, solveset, symbols, sympify

x, y, z, a, b, c, t, n, k = symbols("x y z a b c t n k")

_logg = []


def _lik(verdi, forventet, tol):
    if isinstance(verdi, (list, tuple, set, frozenset, FiniteSet)) or isinstance(
        forventet, (list, tuple, set, frozenset, FiniteSet)
    ):
        v = sorted((sympify(e) for e in verdi), key=lambda e: complex(e.evalf()).real if e.is_number else 0)
        f = sorted((sympify(e) for e in forventet), key=lambda e: complex(e.evalf()).real if e.is_number else 0)
        return len(v) == len(f) and all(_lik(p, q, tol) for p, q in zip(v, f))
    if isinstance(verdi, str) or isinstance(forventet, str):
        if isinstance(verdi, str) and isinstance(forventet, str):
            return verdi.strip() == forventet.strip()
        try:
            verdi, forventet = sympify(verdi), sympify(forventet)
        except Exception:
            return False
    v, f = sympify(verdi), sympify(forventet)
    try:
        if simplify(v - f) == 0:
            return True
    except Exception:
        pass
    try:
        return abs(complex(v.evalf()) - complex(f.evalf())) < tol
    except Exception:
        return False


def chk(nr, verdi, forventet, tol=1e-9):
    """Kontroller at verdi == forventet (symbolsk, eller numerisk med toleranse)."""
    ok = _lik(verdi, forventet, tol)
    _logg.append({"nr": nr, "type": "chk", "verdi": str(verdi), "forventet": str(forventet), "ok": ok})
    return ok


def los(nr, likning, forventet, var=None, domene=S.Reals):
    """Løs likningen med sympy og sammenlign med forventet liste av løsninger.
    Bruk forventet=[] for «ingen løsning» og forventet="alle" for alle reelle tall."""
    var = var or x
    if not isinstance(likning, Eq):
        likning = Eq(likning, 0)
    losning = solveset(likning, var, domain=domene)
    if forventet == "alle":
        ok = losning == domene
    else:
        ok = isinstance(losning, FiniteSet) and _lik(list(losning), list(forventet), 1e-9)
    _logg.append({"nr": nr, "type": "los", "verdi": str(losning), "forventet": str(forventet), "ok": ok})
    return ok


def sant(nr, pastand, beskrivelse=""):
    """Kontroller en påstand som er True/False i Python (f.eks. en kontroll i VS = HS)."""
    ok = bool(pastand)
    _logg.append({"nr": nr, "type": "sant", "verdi": beskrivelse, "forventet": "True", "ok": ok})
    return ok


def aapen(nr, merknad=""):
    """Registrer en åpen oppgave (forklar, lag selv) som ikke kan regnes automatisk.
    Fasiten skal likevel gi et eksempel på et godt svar."""
    _logg.append({"nr": nr, "type": "aapen", "verdi": merknad, "forventet": "", "ok": True})


def rapport():
    feil = [r for r in _logg if not r["ok"]]
    for r in feil:
        print(f"FEIL {r['nr']}: fikk {r['verdi']}, forventet {r['forventet']}")
    aapne = sum(1 for r in _logg if r["type"] == "aapen")
    print(f"{len(_logg)} kontroller ({aapne} åpne), {len(feil)} feil")
    ut = Path(sys.argv[0]).resolve().parent / ".kontroll.json"
    ut.write_text(json.dumps(_logg, ensure_ascii=False, indent=1), encoding="utf-8")
    sys.exit(1 if feil else 0)
