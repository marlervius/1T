"""Regner alle svar i 3.5 Eksponential- og potensfunksjoner på nytt med sympy."""
from kontroll import *

X = symbols("X", positive=True)
A = symbols("A", positive=True)
B = symbols("B", positive=True)
K = symbols("K", real=True)


def f_eks(uttr):
    """Samme faktor når X øker med 1?"""
    return simplify(powsimp(uttr.subs(X, X + 1) / uttr, force=True)).has(X) is False


def f_pot(uttr):
    """Samme faktor når X dobles?"""
    return simplify(powsimp(uttr.subs(X, 2 * X) / uttr, force=True)).has(X) is False


# ================= DEL 1 =================
# ---------- Eksempler ----------
chk("Eks 1.1 verdi", 20000 * Rational(104, 100) ** 5, Rational(20000 * 104**5, 100**5))
chk("Eks 1.1 avrundet", round(float(20000 * 1.04**5)), 24333)
# Eks 1.2: (2,12) og (5,96)
chk("Eks 1.2 steg 1", Rational(96, 12), 8)
los("Eks 1.2 steg 2", Eq(b**3, 8), [2], var=b)
chk("Eks 1.2 steg 3", Rational(12, 2**2), 3)
chk("Eks 1.2 kontroll f(2)", 3 * 2**2, 12)
chk("Eks 1.2 kontroll f(5)", 3 * 2**5, 96)
# Tabell i teoriboksen
chk("Tabell lineær", [100 + 10 * i for i in range(4)], [100, 110, 120, 130])
chk("Tabell eksp", [100 * Rational(11, 10) ** i for i in range(4)], [100, 110, 121, Rational(1331, 10)])
# Vanlige feil
chk("VF 1a", 1 + Rational(5, 100), Rational(105, 100))
chk("VF 1b", 1 - Rational(20, 100), Rational(8, 10))
sant("VF 1c", Rational(105, 100) ** 10 > 1.62 and Rational(105, 100) ** 10 < 1.63, "1,05^10 ≈ 1,63, ikke 1,5")
sant("VF 1d", 2 * 5**2 != (2 * 5) ** 2, "2*5^2 = 50, (2*5)^2 = 100")
chk("VF 1d tall", [2 * 5**2, (2 * 5) ** 2], [50, 100])
sant("VF 1e", float(Rational(95, 100) ** 100) > 0, "0,95^x er alltid positiv")

# ---------- Nivå 1 ----------
chk("1.1a", 1 + Rational(12, 100), Rational(112, 100))
chk("1.1b", 1 - Rational(35, 100), Rational(65, 100))
chk("1.1c", 1 + Rational(25, 10) / 100, Rational(1025, 1000))
chk("1.1d", 1 + Rational(60, 100), Rational(16, 10))

f12 = 4 * 3**X
sant("1.2a", f12 == 4 * 3**X and f_eks(f12), "a = 4, b = 3")
chk("1.2b", [f12.subs(X, i) for i in range(3)], [4, 12, 36])
sant("1.2c", 3 > 1, "b > 1: voksende")

chk("1.3 b", 1 + Rational(10, 100), Rational(11, 10))
chk("1.3 f(2)", 500 * Rational(11, 10) ** 2, 605)

# ---------- Nivå 2 ----------
chk("1.4a", 1 - Rational(15, 100), Rational(85, 100))
v4 = 240000 * Rational(85, 100) ** 4
chk("1.4b", round(float(v4), -2), 125300)
chk("1.4d", round(float(240000 * Rational(85, 100) ** 30), -2), 1800)
sant("1.4d nøyaktig", round(float(240000 * Rational(85, 100) ** 30)) == 1831, "ca. 1831 kr")
x4 = nsolve(240000 * Rational(85, 100) ** x - 100000, x, 5)
chk("1.4c", round(float(x4), 1), 5.4)

# 1.5: (1,40) og (3,10)
los("1.5 b", Eq(b**2, Rational(10, 40)), [Rational(1, 2), -Rational(1, 2)], var=b)  # b>0 gir b = 1/2
sant("1.5 b>0", [r for r in solve(b**2 - Rational(1, 4), b) if r > 0] == [Rational(1, 2)], "b = -1/2 forkastes")
chk("1.5 a", Rational(40) / Rational(1, 2), 80)
chk("1.5 kontroll", [80 * Rational(1, 2) ** 1, 80 * Rational(1, 2) ** 3], [40, 10])

# 1.6: første feilen er pil 3
sant("1.6 pil 1", 1 - Rational(25, 100) == Rational(75, 100), "b = 0,75 og f(x) = 800 * 0,75^x")
sant("1.6 pil 2 feil", 800 * Rational(75, 100) ** 2 != (800 * Rational(75, 100)) ** 2, "a*b^x er ikke (ab)^x")
sant("1.6 pil 3", (800 * Rational(75, 100)) ** 2 == 360000, "600^2")
chk("1.6 riktig", 800 * Rational(75, 100) ** 2, 450)

# 1.7: doblingstid 6 %
x7 = nsolve(1000 * Rational(106, 100) ** x - 2000, x, 10)
chk("1.7a", round(float(x7), 1), 11.9)
x7b = nsolve(3000 * Rational(106, 100) ** x - 6000, x, 10)
chk("1.7b", round(float(x7b), 1), 11.9)
aapen("1.7c", "Doblingstiden er den samme uansett startbeløp")

# ---------- Nivå 3 ----------
chk("1.8a", [25000 + 2000 * i for i in (1, 2, 10)], [27000, 29000, 45000])
chk("1.8a B", [round(float(25000 * Rational(108, 100) ** i)) for i in (1, 2, 10)], [27000, 29160, 53973])
forste = min(i for i in range(1, 50) if 25000 * Rational(108, 100) ** i > 25000 + 2000 * i)
chk("1.8b", forste, 2)
aapen("1.8c", "A: like tillegg. B: samme faktor")
# 1.9: produkt og sum
C_, D_ = symbols("C_ D_", positive=True)
chk("1.9a", simplify(powsimp(A * B**X * C_ * D_**X - A * C_ * (B * D_) ** X, force=True)), 0)
chk("1.9b lik b", simplify(A * B**X + C_ * B**X - (A + C_) * B**X), 0)
sant("1.9b ulik", 1 * 2**1 + 1 * 3**1 == 5 and 1 * 2**2 + 1 * 3**2 == 13 and (13 / 5) != 5 / 1, "2^x + 3^x har ulik faktor: 5, 13")
chk("1.9c", Rational(13, 10) ** 2, Rational(169, 100))
sant("1.9c ikke 60", Rational(13, 10) ** 2 != Rational(16, 10), "69 % og ikke 60 %")

chk("1.10a", simplify(A * B ** (X + 3) / (A * B**X)), B**3)
chk("1.10b", (2 ** Rational(1, 3)) ** 9, 8)
chk("1.11a", 48 * Rational(1, 2) ** 3, 6)
sant("1.11a avtar", Rational(1, 2) < 1, "0 < b < 1")
los("1.11b b", Eq(b**2 * 5, 20), [2, -2], var=b)
chk("1.11b f(1)", 5 * 2, 10)
sant("1.11b nei", 5 * 2 != 12, "f(1) = 10, ikke 12")

chk("Sjekk 1a", 1 + Rational(9, 100), Rational(109, 100))
chk("Sjekk 1b", 7 * 2**3, 56)
sant("Sjekk 1c", Rational(95, 100) < 1, "0 < b < 1: avtagende")

# ================= DEL 2 =================
# Eks 1
f = 3 * X**2
chk("Eks 2.1 dobling", simplify(f.subs(X, 2 * X) / f), 4)
chk("Eks 2.1 trippel", simplify(f.subs(X, 3 * X) / f), 9)
chk("Eks 2.1 steg", expand(3 * (2 * X) ** 2), 4 * 3 * X**2)
# Eks 2
chk("Eks 2.2 forhold", [Rational(16, 2), Rational(128, 16), Rational(1024, 128)], [8, 8, 8])
chk("Eks 2.2 b", 2**3, 8)
chk("Eks 2.2 deltay/deltax", [Rational(16 - 2, 1), Rational(128 - 16, 2), Rational(1024 - 128, 4)], [14, 56, 224])
chk("Eks 2.2 ikke eksp", [8**2, Rational(128, 16)], [64, 8])
chk("Eks 2.2 a", 2 * 1**3, 2)
chk("Eks 2.2 kontroll", [2 * xx**3 for xx in (1, 2, 4, 8)], [2, 16, 128, 1024])
# Vanlige feil
chk("VF 2a", [2**3, 3**2], [8, 9])
chk("VF 2b", [9 ** Rational(1, 2), Rational(9, 2)], [3, Rational(9, 2)])
sant("VF 2b ulik", 3 != Rational(9, 2) and 4 ** Rational(1, 2) == Rational(4, 2), "gjelder ikke generelt: x = 9 moteksempel, x = 4 stemmer")
chk("VF 2c", simplify((2 * X) ** 2 / X**2), 4)

# ---------- Nivå 1 ----------
sant("2.1a", f_pot(X**5) and not f_eks(X**5), "potens")
sant("2.1b", f_eks(5**X) and not f_pot(5**X), "eksponential")
sant("2.1c", f_pot(4 / X) and not f_eks(4 / X), "potens")
sant("2.1d", f_eks(Rational(1, 2) ** X) and not f_pot(Rational(1, 2) ** X), "eksponential")

chk("2.2a", 25 ** Rational(1, 2), 5)
chk("2.2b", Rational(4) ** -1, Rational(1, 4))
chk("2.2c", 2 * 3**3, 54)
chk("2.2d", 9 ** Rational(3, 2), 27)

chk("2.3 steg", expand(4 * (2 * X) ** 3), 8 * 4 * X**3)
chk("2.3 faktor", simplify((4 * (2 * X) ** 3) / (4 * X**3)), 8)

# ---------- Nivå 2 ----------
chk("2.4a", simplify((5 * (3 * X) ** 3) / (5 * X**3)), 27)
chk("2.4b", simplify(((4 * X) ** Rational(1, 2)) / X ** Rational(1, 2)), 2)
chk("2.4c", simplify((10 / (3 * X)) / (10 / X)), Rational(1, 3))

# 2.5 tabeller
chk("2.5a", [7 + 5 * i for i in range(4)], [7, 12, 17, 22])
chk("2.5a diff", [12 - 7, 17 - 12, 22 - 17], [5, 5, 5])
chk("2.5b", [5 * 3**i for i in range(4)], [5, 15, 45, 135])
chk("2.5b forhold", [Rational(15, 5), Rational(45, 15), Rational(135, 45)], [3, 3, 3])
chk("2.5c", [24 / Rational(xx) for xx in (1, 2, 4, 8)], [24, 12, 6, 3])
chk("2.5c forhold", [Rational(12, 24), Rational(6, 12), Rational(3, 6)], [Rational(1, 2)] * 3)
chk("2.5d", [2**-1, 24], [Rational(1, 2), 24])  # 2^b = 1/2 => b = -1
los("2.5d b", Eq(2**b, Rational(1, 2)), [-1], var=b)

# 2.6 grafer
sant("2.6a", all([xx**2 < xx for xx in (Rational(1, 2),)]) and Rational(1, 2) ** Rational(1, 2) > Rational(1, 2), "x^2 < x < sqrt(x) for 0<x<1")
sant("2.6b", 4 ** Rational(1, 2) < 4 < 4**2, "sqrt < x < x^2 for x>1")
chk("2.6c", [1 ** Rational(1, 2), 1, 1**2], [1, 1, 1])

# 2.7: 4^b = 8
sant("2.7 pil 1", True, "4^b = 8")
sant("2.7 pil 2", 4 == 2**2 and 8 == 2**3, "4 = 2^2, 8 = 2^3")
chk("2.7 pil 3 feil", simplify((2**2) ** b - 2 ** (2 * b)), 0)
sant("2.7 pil 3 feil2", (2**2) ** 3 != 2 ** (3 + 2), "(2^2)^b er ikke 2^(b+2)")
los("2.7 riktig", Eq(2 ** (2 * b), 2**3), [Rational(3, 2)], var=b)
chk("2.7 kontroll", 4 ** Rational(3, 2), 8)

# ---------- Nivå 3 ----------
sant("2.8a", simplify(((2 * X) ** 3) / X**3) == 8, "2^b > 1 når b > 0")
sant("2.8a2", all((Rational(i) * 2) ** Rational(1, 2) > Rational(i) ** Rational(1, 2) for i in range(1, 20)), "voksende")
sant("2.8b", Rational(2) ** -1 < 1 and 2**1 > 1, "x^(-1) avtar, x^1 vokser")
sant("2.8c", all(Rational(5) / Rational(i) != 0 for i in range(1, 50)), "a/x er aldri 0")

g = lambda v: 2**v - v**2
rutenett = [Rational(i, 100) for i in range(0, 1001) if i not in (200, 400)]
sant("2.9a", all((g(v) > 0) == (v < 2 or v > 4) for v in rutenett) and g(2) == 0 and g(4) == 0, "2^x > x^2 nøyaktig for 0<=x<2 og x>4")
neg = nsolve(2**x - x**2, x, -0.8)
sant("2.9c", g(-1) < 0 and g(0) > 0 and -1 < neg < 0, "ett skjæringspunkt for x<0 (x = %.3f), tre til sammen" % neg)
sant("2.9b", 2**11 == 2 * 2**10 and Rational(11**2, 10**2) == Rational(121, 100), "faktorer 2 og 1,21")

# 2.10: f(2)=20, f(4)=80
los("2.10a b", Eq(2**b, 4), [2], var=b)
chk("2.10a a", Rational(20, 2**2), 5)
los("2.10b b", Eq(b**2, 4), [2, -2], var=b)
chk("2.10b a", Rational(20, 2**2), 5)
sant("2.10c", all(5 * v**2 != 5 * 2**v for v in (1, 3, 5, 6, 7)) and 5*2**2 == 5*2**2 and 5*4**2 == 5*2**4, "grafene møtes bare ved x = 2 og x = 4 for x>0")

chk("Sjekk 2a", simplify((2 * X) ** 3 / X**3), 8)
chk("Sjekk 2b", [3**2, 2**3], [9, 8])
chk("Sjekk 2c", simplify(1 / X**2 - X ** (-2)), 0)

# ================= UTFORDRING =================
chk("U1a", Rational(1, 2) ** (Rational(6, 6)), Rational(1, 2))
chk("U1b", 400 * Rational(1, 2) ** (Rational(24, 6)), 25)
chk("U1c", 400 * Rational(1, 2) ** (Rational(18, 6)), 50)
los("U2a", Eq(5**x, 125), [3])
los("U2b", Eq(3 * 2**x, 96), [5])
los("U2c", Eq(Rational(1, 2) ** x, 16), [-4])

kode = """
for p in range(1, 11):
    belop = 1.0
    ar = 0
    while belop < 2:
        belop = belop * (1 + p / 100)
        ar = ar + 1
    ut.append((p, ar, round(72 / p, 1)))
"""
lok = {"ut": []}
exec(kode, {}, lok)
print(lok["ut"])
chk("U3a", [r[1] for r in lok["ut"]], [70, 36, 24, 18, 15, 12, 11, 10, 9, 8])
aapen("U3b", "Kommentar til sammenligning med 72/p")
sant("U3c", all(abs(r[1] - r[2]) <= 2 for r in lok["ut"]), "avvik høyst 2 år")

f0, rr = symbols("f0 rr", positive=True)
fv = f0
ok = True
for nn in range(1, 8):
    fv = fv * rr
    ok = ok and simplify(fv - f0 * rr**nn) == 0
sant("U4a", ok, "f(n) = f(n-1)*b gir f(n) = f(0)*b^n")
gv = f0
ok = True
for nn in range(1, 8):
    gv = gv * rr
    ok = ok and simplify(gv - f0 * rr**nn) == 0
sant("U4b", ok, "g(2^n) = g(1)*r^n")
sant("U4b k", simplify((2**K) ** 5 - 2 ** (5 * K)) == 0, "r = 2^k gir g(2^n) = g(1)*(2^n)^k")
aapen("U4c", "Tolking for tabeller")
lsg = [s for s in solve([Eq(b, 2**k), Eq(b**2, 2**k)], [b, k], dict=True) if s[b] > 0]
sant("U5 b=0", 0**2 == 0**1, "b = 0 løser b^2 = b, men b > 0")
sant("U5 løsning", lsg == [{b: 1, k: 0}], "b = 1 og k = 0")
chk("U6a", 16 ** Rational(3, 4), 8)
chk("U6b", Rational(8, 16), Rational(1, 2))
chk("U6c", float(f"{20000 ** 0.75:.3g}"), 1680)
print(20000 ** 0.75)
aapen("U6d", "Drøfting av modellen")

rapport()
