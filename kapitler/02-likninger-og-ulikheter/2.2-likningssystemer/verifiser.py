"""Regner alle svar i 2.2 Likningssystemer på nytt med sympy."""
from kontroll import *

_chk = chk


def chk(nr, verdi, forventet, **kw):
    """Som chk, men sammenligner bool, dict og lister av slike direkte."""
    def enkel(v):
        if isinstance(v, (bool, dict)):
            return True
        if isinstance(v, (list, tuple)):
            return any(enkel(e) for e in v) or any(isinstance(e, float) for e in v)
        return False
    if enkel(verdi) or enkel(forventet):
        sant(nr, verdi == forventet, f"{verdi} == {forventet}")
    else:
        _chk(nr, verdi, forventet, **kw)


def sys2(likninger, ukjente=(x, y)):
    """Løs et likningssystem. Gir {x: .., y: ..}, [] (ingen) eller 'alle' (uendelig mange)."""
    l = solve(likninger, list(ukjente), dict=True)
    if not l:
        return []
    if len(l[0]) < len(ukjente):
        return "alle"
    return l


def tallpar(likninger, forventet, ukjente=(x, y)):
    l = sys2(likninger, ukjente)
    if isinstance(l, list) and len(l) == 1:
        return tuple(l[0][u] for u in ukjente) == tuple(forventet)
    return False


def chkp(nr, likninger, forventet, ukjente=(x, y)):
    """Systemet skal ha nøyaktig én løsning lik forventet tallpar, og paret skal passe i alle likninger."""
    ok = tallpar(likninger, forventet, ukjente)
    sub = dict(zip(ukjente, forventet))
    ok = ok and all(simplify(l.lhs.subs(sub) - l.rhs.subs(sub)) == 0 for l in likninger)
    chk(nr, ok, True)


def innsatt(par, likninger, ukjente=(x, y)):
    sub = dict(zip(ukjente, par))
    return [simplify(l.lhs.subs(sub) - l.rhs.subs(sub)) == 0 for l in likninger]


# ---------- Eksempler ----------
chkp("Eks 1.1", [Eq(y, 2*x - 1), Eq(3*x + y, 9)], (2, 3))
chkp("Eks 1.2", [Eq(2*x + 3*y, 12), Eq(5*x - 2*y, 11)], (3, 2))
chk("Eks 1.2 gang", [expand(2*(2*x + 3*y)), expand(3*(5*x - 2*y)), 2*12, 3*11],
    [4*x + 6*y, 15*x - 6*y, 24, 33])
chk("Eks 1.2 sum", (4*x + 6*y) + (15*x - 6*y), 19*x)
chk("Eks 2.1", [expand(-2*(2*x - y - 3) * -1)], [4*x - 2*y - 6])
chk("Eks 2.1 sum", (4*x - 2*y) + (-4*x + 2*y), 0)
chk("Eks 2.1 type", sys2([Eq(2*x - y, 3), Eq(-4*x + 2*y, 6)]), [])
chk("Eks 2.1 y-form", [solve(Eq(2*x - y, 3), y)[0], solve(Eq(-4*x + 2*y, 6), y)[0]], [2*x - 3, 2*x + 3])
chk("Eks 2.2", sys2([Eq(x + y, 3), Eq(2*x + 2*y, 6)]), "alle")
chk("Eks 2.2 sum", (-2*x - 2*y) + (2*x + 2*y), 0)

# ---------- Vanlige feil ----------
chk("VF 1a", expand(2*(x + 3*y)), 2*x + 6*y)
sant("VF 1a feil", expand(2*(x + 3*y)) != 2*x + 3*y, "2(x+3y) er ikke 2x+3y")
chk("VF 1b", expand((4*x + 3*y) - (2*x - y)), 2*x + 4*y)
sant("VF 1b feil", expand((4*x + 3*y) - (2*x - y)) != 2*x + 2*y, "fortegnsfeil")
chk("VF 1c", 9 - 1, 8)
sant("VF 1d", innsatt((4, 1), [Eq(x + y, 5), Eq(x - y, 1)]) == [True, False], "(4,1) passer bare i første")
chk("VF 1d unik", sys2([Eq(x + y, 5), Eq(x - y, 1)]), [{x: 3, y: 2}])
chk("VF 2a", sys2([Eq(2*x + y, 6), Eq(4*x + 2*y, 12)]), "alle")
sant("VF 2a sym", (-2*x - y) + (2*x + y) == 0, "0 = 0 er ikke x = 0")
chk("VF 2b", sys2([Eq(x - y, 1), Eq(2*x - 2*y, 7)]), [])
chk("VF 2c", sys2([Eq(y, x + 1), Eq(y, 2*x + 1)]) , [{x: 0, y: 1}])
chk("VF 2c lik stigning", sys2([Eq(y, 3*x + 1), Eq(y, 3*x + 1)]), "alle")
chk("VF 2c lik stigning ingen", sys2([Eq(y, 3*x + 1), Eq(y, 3*x - 1)]), [])

# ---------- Del 1 ----------
r = innsatt((4, 3), [Eq(x + y, 7), Eq(x - y, 1)])
chk("1.1a", r, [True, True])
r = innsatt((3, 3), [Eq(2*x + y, 9), Eq(x - y, 1)])
chk("1.1b", r, [True, False])

chkp("1.2a", [Eq(y, x + 2), Eq(2*x + y, 11)], (3, 5))
chkp("1.2b", [Eq(x, 3*y), Eq(x + y, 12)], (9, 3))
chkp("1.2c", [Eq(y, 4 - x), Eq(2*x + 3*y, 9)], (3, 1))

chk("1.3a", (x + y) + (2*x - y), 3*x)
chkp("1.3b", [Eq(x + y, 9), Eq(2*x - y, 6)], (5, 4))
chk("1.3c", innsatt((5, 4), [Eq(x + y, 9), Eq(2*x - y, 6)]), [True, True])

chkp("1.4a", [Eq(2*x + y, 7), Eq(3*x - 2*y, 14)], (4, -1))
chkp("1.4b", [Eq(2*x + 3*y, -5), Eq(3*x - 2*y, 12)], (2, -3))
chkp("1.4c", [Eq(3*x + 2*y, 4), Eq(2*x + 5*y, 21)], (-2, 5))

chkp("1.5a", [Eq(x, 2*y - 3), Eq(3*x - 4*y, -5)], (1, 2))
chkp("1.5b", [Eq(3*x + 5*y, -4), Eq(3*x - 2*y, -11)], (-3, 1))
chk("1.5b diff", expand((3*x + 5*y) - (3*x - 2*y)), 7*y)
chkp("1.5c", [Eq(6*x + 5*y, 3), Eq(-6*x + y, 15)], (-2, 3))

# 1.6: riktig løsning og feilen
chkp("1.6", [Eq(2*x + 3*y, 13), Eq(5*x - 4*y, -2)], (2, 3))
chk("1.6 gang", [expand(4*(2*x + 3*y)), 4*13, expand(3*(5*x - 4*y)), 3*(-2)], [8*x + 12*y, 52, 15*x - 12*y, -6])
chk("1.6 sum", (8*x + 12*y) + (15*x - 12*y), 23*x)
chk("1.6 x", Rational(46, 23), 2)
sant("1.6 feil", 13 - 4 != 13 + 4, "3y = 13 - 4, ikke 13 + 4")
chk("1.6 kontroll", innsatt((2, 3), [Eq(2*x + 3*y, 13), Eq(5*x - 4*y, -2)]), [True, True])

# 1.7: s = skolebrød, k = kakao
s_, k_ = symbols("s k_")
chkp("1.7", [Eq(4*s_ + 2*k_, 110), Eq(3*s_ + 4*k_, 120)], (20, 15), ukjente=(s_, k_))

aapen("1.8", "Lag selv: system med løsning (3, -1)")
chk("1.8 eks", innsatt((3, -1), [Eq(x + y, 2), Eq(x - y, 4)]), [True, True])
chk("1.8 eks unik", sys2([Eq(x + y, 2), Eq(x - y, 4)]), [{x: 3, y: -1}])

a_, b_ = symbols("a b")
chk("1.9a", solve(Eq(3*2 + a_*5, 21), a_), [3])
chk("1.9b", solve(Eq(b_*2 - 5, 3), b_), [4])

chkp("Sjekk 1a", [Eq(y, 2*x + 1), Eq(x + y, 7)], (2, 5))
chk("Sjekk 1b", Poly(5*x - 3*y, y).coeffs()[0], -3)
aapen("Sjekk 1c", "Løsningen må passe i begge likninger; et par kan passe i bare én")

# ---------- Del 2 ----------
chkp("2.1", [Eq(y, x - 1), Eq(y, -x + 5)], (3, 2))
chk("2.2a", sys2([Eq(y, 3*x + 1), Eq(y, 3*x - 4)]), [])
chkp("2.2b", [Eq(y, 2*x - 5), Eq(y, -x + 4)], (3, 1))
chk("2.2c", sys2([Eq(y, 4 - x), Eq(y, -x + 4)]), "alle")

chk("2.3a", sys2([Eq(x + y, 1), Eq(x + y, 5)]), [])
chk("2.3b", sys2([Eq(x - y, 2), Eq(2*x - 2*y, 4)]), "alle")
chk("2.3c", [(x + y) + (x - y)], [2*x])

chk("2.4a", sys2([Eq(2*x + y, 5), Eq(4*x + 2*y, 7)]), [])
chk("2.4a form", [solve(Eq(2*x + y, 5), y)[0], solve(Eq(4*x + 2*y, 7), y)[0]], [5 - 2*x, Rational(7, 2) - 2*x])
chk("2.4b", sys2([Eq(x - y, 3), Eq(2*x - 2*y, 6)]), "alle")
chkp("2.4c", [Eq(3*x + y, 4), Eq(6*x - y, 5)], (1, 1))

# 2.5: sykkelutleie. A: 50 + 20x, B: 20 + 30x
chkp("2.5a", [Eq(y, 50 + 20*x), Eq(y, 20 + 30*x)], (3, 110))
chk("2.5b", [50 + 20*5, 20 + 30*5], [150, 170])

# 2.6: ingen løsning, feil i fortegn
chk("2.6", sys2([Eq(6*x - 3*y, 9), Eq(2*x - y, 5)]), [])
chk("2.6 gang", expand(3*(2*x - y)), 6*x - 3*y)
chk("2.6 rett", (6*x - 3*y) - (6*x - 3*y), 0)
chk("2.6 feil", expand((6*x - 3*y) - (6*x - 3*y)) != -6*y, True)
chk("2.6 kontroll", innsatt((3, 1), [Eq(6*x - 3*y, 9), Eq(2*x - y, 5)]), [False, True])
chk("2.6 diff", 9 - 15, -6)

# 2.7: 2x + ay = 4, x + 3y = b
sys_a = lambda av, bv: sys2([Eq(2*x + av*y, 4), Eq(x + 3*y, bv)])
chk("2.7a", sys_a(6, 2), "alle")
chk("2.7b", sys_a(6, 5), [])
chk("2.7b2", sys_a(6, 0), [])
chk("2.7c", [len(sys_a(av, 7)) for av in (1, 2, 5, -4)], [1, 1, 1, 1])
chk("2.7c det", 2*3 - a_*1, 6 - a_)

# 2.8 linje og parabel
chk("2.8a", solve([Eq(y, x**2), Eq(y, 4*x)], [x, y], dict=True), [{x: 0, y: 0}, {x: 4, y: 16}])
chk("2.8a fakt", factor(x**2 - 4*x), x*(x - 4))
chk("2.8b", [r for r in solve(Eq(x**2, -4), x) if r.is_real], [])

chk("Sjekk 2a", sys2([Eq(y, -x + 2), Eq(y, -x + 6)]), [])
aapen("Sjekk 2b", "0 = 0 betyr sammenfallende linjer, uendelig mange løsninger")
aapen("Sjekk 2c", "Punkt på begge linjer = passer i begge likninger")

# ---------- Utfordring ----------
chk("U1", solve([Eq(x + y + z, 6), Eq(x - y, 1), Eq(y + z, 4)], [x, y, z], dict=True), [{x: 2, y: 1, z: 3}])
v_, bb_ = symbols("v bb")
chkp("U2", [Eq(3*v_ + 2*bb_, 610), Eq(2*v_ + 4*bb_, 620)], (150, 80), ukjente=(v_, bb_))
chkp("U3", [Eq(x/2 + y/3, 4), Eq(x - y, 3)], (6, 3))
chk("U3 gang", expand(6*(x/2 + y/3)), 3*x + 2*y)

A_, B_, C_, D_, E_, F_ = symbols("A B C D E F")
l = solve([Eq(A_*x + B_*y, C_), Eq(D_*x + E_*y, F_)], [x, y], dict=True)[0]
chk("U4a", simplify(l[x] - (C_*E_ - B_*F_)/(A_*E_ - B_*D_)), 0)
chk("U4b", simplify(l[y] - (A_*F_ - C_*D_)/(A_*E_ - B_*D_)), 0)
chk("U4 trinn", expand(E_*(A_*x + B_*y) - B_*(D_*x + E_*y)), (A_*E_ - B_*D_)*x)
chk("U4c", sys2([Eq(x + 2*y, 3), Eq(2*x + 4*y, 6)]), "alle")
chk("U4c ingen", sys2([Eq(x + 2*y, 3), Eq(2*x + 4*y, 7)]), [])


def los(a, b, c, d, e, f):
    D = a*e - b*d
    if D == 0:
        return "ingen eller uendelig mange løsninger"
    return ((c*e - b*f)/D, (a*f - c*d)/D)


import builtins
chk("U5a", los(2, 3, 12, 5, -2, 11), (3.0, 2.0))
chk("U5b", los(2, -1, 3, -4, 2, 6), "ingen eller uendelig mange løsninger")
chk("U5b2", los(3, 2, 4, 2, 5, 21), (-2.0, 5.0))
aapen("U5c", "Fordeler og ulemper ved formel mot prøv-alle")
treff = [(p, q) for p in range(21) for q in range(21) if 3*p + 2*q == 61 and 2*p + 4*q == 62]
sant("U5c prøv alle", treff == [(15, 8)], "prøv alle gir ett par")

chk("U6a", solve([Eq(y, x**2), Eq(y, 2*x - 1)], [x, y], dict=True), [{x: 1, y: 1}])
chk("U6a fakt", factor(x**2 - 2*x + 1), (x - 1)**2)
chk("U6b ingen", [r for r in solve(Eq(x**2, 2*x - 3), x) if r.is_real], [])
chk("U6b to", sorted(solve(Eq(x**2, x + 6), x)), [-2, 3])

# ---------- Steg for steg: eksempler og «finn feilen» ----------
sant("Steg Eks 1.1 a", expand(3*x + (2*x - 1)) == 5*x - 1 and 5*x - 1 - 9 == 5*x - 10, "3x+(2x-1)=9 gir 5x=10")
sant("Steg Eks 1.1 b", 10/5 == 2 and 2*2 - 1 == 3, "x=2, y=3")
sant("Steg Eks 1.1 c", [3 == 2*2 - 1, 3*2 + 3 == 9] == [True, True], "kontroll")
sant("Steg Eks 1.2 a", (4*x + 6*y) + (15*x - 6*y) == 19*x and 24 + 33 == 57 and 57/19 == 3, "19x=57")
sant("Steg Eks 1.2 b", solve(Eq(2*3 + 3*y, 12), y) == [2], "y=2")
sant("Steg Eks 1.2 c", [6 + 6 == 12, 15 - 4 == 11] == [True, True], "kontroll")
sant("Steg Eks 2.1 a", (4*x - 2*y - 6) + (-4*x + 2*y - 6) == -12, "0=12")
sant("Steg Eks 2.2 a", expand(-2*(x + y)) == -2*x - 2*y and -2*3 == -6, "gang med -2")
sant("Steg 1.6 pil1", expand(4*(2*x + 3*y)) == 8*x + 12*y and 4*13 == 52 and expand(3*(5*x - 4*y)) == 15*x - 12*y and 3*-2 == -6, "gang")
sant("Steg 1.6 pil2", (8*x + 12*y) + (15*x - 12*y) == 23*x and 52 - 6 == 46, "23x=46")
sant("Steg 1.6 pil3", 46/23 == 2, "x=2")
sant("Steg 1.6 pil4", 2*2 + 3*y - 13 == 3*y - 9, "3y = 13 - 4 = 9")
sant("Steg 1.6 pil5 FEIL", 13 + 4 != 13 - 4, "feil: 3y=13+4")
sant("Steg 1.6 pil6", Rational(17, 3) == Rational(17, 3), "y=17/3 følger av feilen")
sant("Steg 2.6 pil1", expand(3*(2*x - y)) == 6*x - 3*y and 3*5 == 15, "II gange 3")
sant("Steg 2.6 pil2", True, "(I)-(II·3) skrevet som venstre minus venstre = 9 - 15")
sant("Steg 2.6 pil3 FEIL", expand((6*x - 3*y) - (6*x - 3*y)) == 0 and 9 - 15 == -6, "venstre side er 0, ikke -6y")
sant("Steg 2.6 pil4", Rational(-6, -6) == 1 and solve(Eq(2*x - 1, 5), x) == [3], "følger av feilen")

aapen("U6c", "Andregradslikningen x^2 = mx + c har høyst to løsninger")
rapport()
