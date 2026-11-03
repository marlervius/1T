"""Regner alle svar i 2.3 Andregradslikninger på nytt. Kjøres av sjekk.py / bygg.py."""
import io
import contextlib
from kontroll import *

p, q = symbols("p q")
D_ = lambda A, B, C: B**2 - 4 * A * C

# ---------- Teoriboks del 1 ----------
los("Teori 1 felles faktor", Eq(x**2 - 5 * x, 0), [0, 5])
chk("Teori 1 felles faktor steg", expand(x * (x - 5)), x**2 - 5 * x)
los("Teori 1 kvadratrot", Eq(x**2, 9), [3, -3])
los("Teori 1 kvadratsetning", Eq(x**2 - 6 * x + 9, 0), [3])
chk("Teori 1 kvadratsetning steg", expand((x - 3) ** 2), x**2 - 6 * x + 9)
chk("Teori 1 sum-produkt", expand((x + 2) * (x + 3)), x**2 + 5 * x + 6)
los("Teori 1 sum-produkt løsn", Eq(x**2 + 5 * x + 6, 0), [-2, -3])
sant("Teori 1 a*b=6", 2 * 3 == 6 and 2 != 6 and 3 != 6, "ab = 6 sier ingenting om a eller b")

# ---------- Eksempel 1.1: 3x^2 = 12x ----------
chk("Eks 1.1 steg 1", 3 * x**2 - 12 * x, 3 * x**2 - 12 * x)
chk("Eks 1.1 steg 2", expand(3 * x * (x - 4)), 3 * x**2 - 12 * x)
los("Eks 1.1", Eq(3 * x**2, 12 * x), [0, 4])
chk("Eks 1.1 kontroll x=4", [3 * 4**2, 12 * 4], [48, 48])
chk("Eks 1.1 kontroll x=0", [3 * 0**2, 12 * 0], [0, 0])
# ---------- Eksempel 1.2: x^2 - x - 12 = 0 ----------
chk("Eks 1.2 tall", [(-4) * 3, -4 + 3], [-12, -1])
chk("Eks 1.2 steg 1", expand((x - 4) * (x + 3)), x**2 - x - 12)
los("Eks 1.2", Eq(x**2 - x - 12, 0), [4, -3])
chk("Eks 1.2 kontroll", [4**2 - 4 - 12, (-3) ** 2 + 3 - 12], [0, 0])

# ---------- Vanlige feil del 1 ----------
los("VF 1.1a x^2=5x", Eq(x**2, 5 * x), [0, 5])
chk("VF 1.1a faktor", expand(x * (x - 5)), x**2 - 5 * x)
los("VF 1.1b x^2=9", Eq(x**2, 9), [3, -3])
los("VF 1.1c (x-2)(x-3)=6", Eq((x - 2) * (x - 3), 6), [0, 5])
chk("VF 1.1c omskriving", expand((x - 2) * (x - 3) - 6), x**2 - 5 * x)
sant("VF 1.1c feil: x=8 er ikke løsning", (8 - 2) * (8 - 3) != 6, "x-2=6 gir x=8")
sant("VF 1.1c feil: x=9 er ikke løsning", (9 - 2) * (9 - 3) != 6, "x-3=6 gir x=9")

# ---------- Del 1 ----------
los("1.1a", Eq((x - 1) * (x + 4), 0), [1, -4])
los("1.1b", Eq(x * (x - 7), 0), [0, 7])
los("1.1c", Eq((2 * x - 6) * (x + 5), 0), [3, -5])
los("1.1d", Eq(3 * (x + 2) * (x - 8), 0), [-2, 8])

los("1.2a", Eq(x**2 - 8 * x, 0), [0, 8])
los("1.2b", Eq(2 * x**2 + 10 * x, 0), [0, -5])
los("1.2c", Eq(x**2, 49), [7, -7])
los("1.2d", Eq(2 * x**2, 32), [4, -4])

chk("1.3 produkt og sum", [2 * 5, 2 + 5], [10, 7])
chk("1.3 faktorisering", expand((x + 2) * (x + 5)), x**2 + 7 * x + 10)
los("1.3", Eq(x**2 + 7 * x + 10, 0), [-2, -5])

los("1.4a", Eq(x**2 - 3 * x - 10, 0), [5, -2])
los("1.4b", Eq(x**2 - 10 * x + 25, 0), [5])
chk("1.4b kvadratsetning", expand((x - 5) ** 2), x**2 - 10 * x + 25)
los("1.4c", Eq(6 * x**2, 18 * x), [0, 3])
los("1.4d", Eq(x**2 + 2 * x, 15), [3, -5])
chk("1.4d omskriving", expand((x + 5) * (x - 3)), x**2 + 2 * x - 15)

los("1.5a", Eq((x - 3) * (x + 2), 14), [5, -4])
chk("1.5a omskriving", expand((x - 3) * (x + 2) - 14), x**2 - x - 20)
chk("1.5a faktorisering", expand((x - 5) * (x + 4)), x**2 - x - 20)
los("1.5b", Eq(x * (x + 3), 28), [4, -7])
chk("1.5b faktorisering", expand((x - 4) * (x + 7)), x**2 + 3 * x - 28)

# 1.6: hver pil
sant("1.6 pil 1", expand((x**2 + 5 * x) - (4 * x + 20) - (x**2 + 5 * x - 4 * x - 20)) == 0, "flytte over")
sant("1.6 pil 2", expand((x**2 + 5 * x - 4 * x - 20) - (x**2 + x - 20)) == 0, "samle ledd")
sant("1.6 pil 3", expand((x + 5) * (x - 4) - (x**2 + x - 20)) == 0, "faktorisere")
sant("1.6 pil 4 er feil", not any(simplify((x + 5) * (x - 4)).subs(x, v) == 0 for v in [5, -4]), "5 og -4 er ikke nullpunkt")
los("1.6", Eq(x**2 + 5 * x, 4 * x + 20), [-5, 4])

# 1.7
los("1.7a", Eq(x**2, 4), [2, -2])
los("1.7a", Eq(x**2, 0), [0])
los("1.7a", Eq(x**2, -4), [])
los("1.7b", Eq((x - 1) * (x - 6), 0), [1, 6])
los("1.7b", Eq((x - 3) * (x - 3), 0), [3])
chk("1.7c", expand(x * (x + b)), x**2 + b * x)
los("1.7c", Eq(x**2 + 4 * x, 0), [0, -4])
los("1.7c", Eq(x**2 + 0 * x, 0), [0])
los("1.7c", Eq(x**2 - 3 * x, 0), [0, 3])

# 1.8
chk("1.8", expand((x + 6) ** 2), x**2 + 12 * x + 36)
chk("1.8", expand((x - 6) ** 2), x**2 - 12 * x + 36)
los("1.8", Eq(x**2 + 12 * x + 36, 0), [-6])
los("1.8", Eq(x**2 - 12 * x + 36, 0), [6])

# 1.9
chk("1.9a", expand((x - 3) * (x - 8)), x**2 - 11 * x + 24)
los("1.9a løsn", Eq(x**2 - 11 * x + 24, 0), [3, 8])
chk("1.9b", expand((x - p) * (x - q)), x**2 - (p + q) * x + p * q)

# Sjekk 1
los("Sjekk 1a", Eq(x**2 + 7 * x, 0), [0, -7])
los("Sjekk 1b", Eq(x**2, -16), [])
los("Sjekk 1c", Eq((x - 1) * (x + 2), 4), [-3, 2])
sant("Sjekk 1c feil", (5 - 1) * (5 + 2) != 4 and (2 + 2) * (2 - 1) == 4, "x-1=4 gir x=5, som ikke virker")

# ---------- Teoriboks del 2 ----------
chk("Teori 2 tall steg 1", expand((x + 3) ** 2), x**2 + 6 * x + 9)
chk("Teori 2 tall steg 2", x**2 + 6 * x - 7 + 16, (x + 3) ** 2)
los("Teori 2 tall", Eq(x**2 + 6 * x - 7, 0), [1, -7])
A_, B_, C_ = symbols("A B C", positive=True)
# generelt: a(x + b/2a)^2 = (b^2 - 4ac)/(4a)   -> (x + b/2a)^2 = D/(4a^2)
chk("Teori 2 generelt steg", expand(x**2 + b / a * x + (b / (2 * a)) ** 2 - (b**2 / (4 * a**2) - c / a)),
    x**2 + b / a * x + c / a)
chk("Teori 2 generelt D", b**2 / (4 * a**2) - c / a, (b**2 - 4 * a * c) / (4 * a**2))
chk("Teori 2 generelt rot", (-b + sqrt(b**2 - 4 * a * c)) / (2 * a) * 0 + (-b / (2 * a) + sqrt(b**2 - 4 * a * c) / (2 * a)),
    (-b + sqrt(b**2 - 4 * a * c)) / (2 * a))
x1, x2 = symbols("x1 x2")
chk("Teori 2 faktorisering", simplify(a * (x - (-b + sqrt(D_(a, b, c))) / (2 * a)) * (x - (-b - sqrt(D_(a, b, c))) / (2 * a))
    - (a * x**2 + b * x + c)), 0)
chk("Teori 2 figur D>0", D_(1, -2, -3), 16)
chk("Teori 2 figur D=0", D_(1, -2, 1), 0)
chk("Teori 2 figur D<0", D_(1, -2, 3), -8)
los("Teori 2 figur D>0 løsn", Eq(x**2 - 2 * x - 3, 0), [3, -1])
los("Teori 2 figur D=0 løsn", Eq(x**2 - 2 * x + 1, 0), [1])
los("Teori 2 figur D<0 løsn", Eq(x**2 - 2 * x + 3, 0), [])

# ---------- Eksempel 2.1: 2x^2 - 3x - 2 = 0 ----------
chk("Eks 2.1 D", D_(2, -3, -2), 25)
chk("Eks 2.1 steg 2", (3 + sqrt(9 + 16)) / 4, 2)
chk("Eks 2.1 steg 2b", (3 - sqrt(9 + 16)) / 4, Rational(-1, 2))
los("Eks 2.1", Eq(2 * x**2 - 3 * x - 2, 0), [2, Rational(-1, 2)])
chk("Eks 2.1 kontroll x=2", 2 * 2**2 - 3 * 2 - 2, 0)
chk("Eks 2.1 kontroll x=-1/2", 2 * Rational(1, 4) + Rational(3, 2) - 2, 0)
# ---------- Eksempel 2.2: antall løsninger ----------
chk("Eks 2.2a D", D_(1, -4, 7), -12)
los("Eks 2.2a", Eq(x**2 - 4 * x + 7, 0), [])
chk("Eks 2.2b D", D_(2, 1, -3), 25)
los("Eks 2.2b", Eq(2 * x**2 + x - 3, 0), [1, Rational(-3, 2)])
chk("Eks 2.2c D", D_(4, 12, 9), 0)
los("Eks 2.2c", Eq(4 * x**2 + 12 * x + 9, 0), [Rational(-3, 2)])

# ---------- Vanlige feil del 2 ----------
chk("VF 2a b^2", [(-3) ** 2, -((-3) ** 2), -(-3)], [9, -9, 3])
sant("VF 2b hele telleren", (3 + 5) / 4 != 3 + 5 / 4, "(3+5)/4 = 2, ikke 3 + 5/4")
los("VF 2c flytt over", Eq(x**2 + 2 * x, 8), [2, -4])
chk("VF 2c c", Poly(x**2 + 2 * x - 8, x).all_coeffs(), [1, 2, -8])
chk("VF 2d faktorisering", expand((x - 2) * (x + 3)), x**2 + x - 6)
sant("VF 2d feil", expand((x + 2) * (x - 3)) != x**2 + x - 6, "(x+2)(x-3) har nullpunkt -2 og 3")
los("VF 2d nullpunkt", Eq(x**2 + x - 6, 0), [2, -3])

# ---------- Del 2 ----------
chk("2.1a", D_(1, 2, 5), -16)
los("2.1a antall", Eq(x**2 + 2 * x + 5, 0), [])
chk("2.1b", D_(3, -2, -1), 16)
los("2.1b antall", Eq(3 * x**2 - 2 * x - 1, 0), [1, Rational(-1, 3)])
chk("2.1c", D_(4, -4, 1), 0)
los("2.1c antall", Eq(4 * x**2 - 4 * x + 1, 0), [Rational(1, 2)])

los("2.2a", Eq(x**2 - 7 * x + 10, 0), [2, 5])
chk("2.2a D", D_(1, -7, 10), 9)
los("2.2b", Eq(x**2 + 2 * x - 4, 0), [-1 + sqrt(5), -1 - sqrt(5)])
chk("2.2b D", D_(1, 2, -4), 20)
los("2.2c", Eq(2 * x**2 + 5 * x + 2, 0), [Rational(-1, 2), -2])
chk("2.2c D", D_(2, 5, 2), 9)

chk("2.3 steg 1", expand((x + 2) ** 2), x**2 + 4 * x + 4)
sant("2.3 steg 1 likning", expand((x + 2) ** 2) == x**2 + 4 * x + 4 and 21 + 4 == 25, "venstre side er kvadrat")
los("2.3", Eq(x**2 + 4 * x - 21, 0), [3, -7])
los("2.3 via kvadrat", Eq((x + 2) ** 2, 25), [3, -7])

los("2.4a", Eq(x**2 - 2 * x - 2, 0), [1 + sqrt(3), 1 - sqrt(3)])
chk("2.4a D", D_(1, -2, -2), 12)
los("2.4b", Eq(3 * x**2 + x - 2, 0), [Rational(2, 3), -1])
chk("2.4b D", D_(3, 1, -2), 25)
los("2.4c", Eq(2 * x**2 - 6 * x + 5, 0), [])
chk("2.4c D", D_(2, -6, 5), -4)
los("2.4d", Eq(5 * x**2 - 20, 0), [2, -2])

# 2.5: hver pil
sant("2.5 pil 1", Poly(2 * x**2 - 5 * x - 3, x).all_coeffs() == [2, -5, -3], "a, b, c")
sant("2.5 pil 2", simplify((5 + sqrt((-5) ** 2 - 4 * 2 * (-3))) / (2 * 2) - (-(-5) + sqrt((-5) ** 2 - 4 * 2 * (-3))) / (2 * 2)) == 0, "sette inn")
sant("2.5 pil 3 er feil", (-5) ** 2 == 25 and (-5) ** 2 != -25, "(-5)^2 = 25, ikke -25")
sant("2.5 pil 4", -25 + 24 == -1, "følger av feilen")
chk("2.5 riktig D", D_(2, -5, -3), 49)
los("2.5", Eq(2 * x**2 - 5 * x - 3, 0), [3, Rational(-1, 2)])
chk("2.5 kontroll", [2 * 9 - 15 - 3, 2 * Rational(1, 4) + Rational(5, 2) - 3], [0, 0])

# 2.6 rektangel
chk("2.6 andre side", 34 / 2 - x, 17 - x)
los("2.6", Eq(x * (17 - x), 60), [5, 12])
chk("2.6 omskriving", expand(x * (17 - x) - 60), -(x**2 - 17 * x + 60))
chk("2.6 D", D_(1, -17, 60), 49)
chk("2.6 kontroll", [2 * (5 + 12), 5 * 12], [34, 60])

# 2.7 kast
h = lambda tt: 20 * tt - 5 * tt**2
los("2.7a", Eq(h(t), 15), [1, 3], var=t)
chk("2.7a omskriving", expand((h(t) - 15) / -5), t**2 - 4 * t + 3)
chk("2.7 høyde", [h(1), h(3)], [15, 15])
los("2.7c", Eq(h(t), 0), [0, 4], var=t)
chk("2.7 toppunkt", h(2), 20)

# 2.8 parameter k
ku = symbols("k")
chk("2.8", D_(1, -4, ku), 16 - 4 * ku)
ulikhet("2.8a", 16 - 4 * ku > 0, Interval.open(-oo, 4), var=ku)
los("2.8b", Eq(x**2 - 4 * x + 4, 0), [2])
ulikhet("2.8c", 16 - 4 * ku < 0, Interval.open(4, oo), var=ku)
los("2.8", Eq(x**2 - 4 * x + 3, 0), [1, 3])
los("2.8", Eq(x**2 - 4 * x + 5, 0), [])

# 2.9 forkorte
los("2.9", Eq(2 * x**2 - x - 3, 0), [Rational(3, 2), -1])
chk("2.9", expand(2 * (x - Rational(3, 2)) * (x + 1)), 2 * x**2 - x - 3)
chk("2.9", expand((2 * x - 3) * (x + 1)), 2 * x**2 - x - 3)
chk("2.9", cancel((2 * x**2 - x - 3) / (x**2 - 1)), (2 * x - 3) / (x - 1))
los("2.9", Eq(x**2 - 1, 0), [1, -1])

# Sjekk 2
los("Sjekk 2a", Eq(2 * x**2 - x - 1, 0), [1, Rational(-1, 2)])
chk("Sjekk 2a D", D_(2, -1, -1), 9)
chk("Sjekk 2b D", D_(1, 1, 1), -3)
los("Sjekk 2b", Eq(x**2 + x + 1, 0), [])
chk("Sjekk 2c", D_(1, -2, 1), 0)
aapen("Sjekk 2c forklaring", "D = 0: parabelen tangerer x-aksen i ett punkt")

# ---------- Utfordring ----------
los("U1a", Eq(x**4 - 5 * x**2 + 4, 0), [1, -1, 2, -2])
chk("U1a u", (symbols("u") ** 2 - 5 * symbols("u") + 4).subs(symbols("u"), x**2), x**4 - 5 * x**2 + 4)
los("U1a u-likning", Eq(symbols("u") ** 2 - 5 * symbols("u") + 4, 0), [1, 4], var=symbols("u"))
los("U1b", Eq(x**4 + x**2 - 6, 0), [sqrt(2), -sqrt(2)])
los("U1b u-likning", Eq(symbols("u") ** 2 + symbols("u") - 6, 0), [2, -3], var=symbols("u"))

los("U2a", Eq(x + 6 / x, 5), [2, 3])
chk("U2a omskriving", expand((x + 6 / x - 5) * x), x**2 - 5 * x + 6)
los("U2b", Eq(2 * x, 3 - 1 / x), [1, Rational(1, 2)])
chk("U2b omskriving", expand((2 * x - 3 + 1 / x) * x), 2 * x**2 - 3 * x + 1)

kode_u3 = """from math import sqrt
def abc(a, b, c):
    D = b**2 - 4*a*c
    if D < 0:
        return []
    if D == 0:
        return [-b / (2*a)]
    return [(-b - sqrt(D)) / (2*a), (-b + sqrt(D)) / (2*a)]

print(abc(1, -2, -8))
print(abc(1, 2, 5))
print(abc(1, -4, 4))
"""
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    exec(kode_u3, {})
sant("U3a", buf.getvalue() == "[-2.0, 4.0]\n[]\n[2.0]\n", repr(buf.getvalue()))
ns = {}
exec(kode_u3.split("print(")[0], ns)
try:
    ns["abc"](0, 2, -4)
    feil_a0 = False
except ZeroDivisionError:
    feil_a0 = True
sant("U3b", feil_a0, "deling på 2*a = 0")
kode_fix = kode_u3.split("print(")[0].replace("    D = b**2", "    if a == 0:\n        return [-c / b]\n    D = b**2", 1)
ns2 = {}
exec(kode_fix, ns2)
chk("U3b", ns2["abc"](0, 2, -4), [2.0])
chk("U3b", ns2["abc"](1, -2, -8), [-2.0, 4.0])

los("U4", Eq(sqrt(x + 2), x), [2])
los("U4 kvadrert", Eq(x + 2, x**2), [2, -1])
sant("U4 x=-1 falsk", sqrt(-1 + 2) == 1 and 1 != -1, "sqrt(1) = 1, ikke -1")
sant("U4 x=2 ekte", sqrt(2 + 2) == 2, "sqrt(4) = 2")
sant("U4 begge kvadrerer likt", (-1) ** 2 == 1**2, "kvadrering tar med -x også")

chk("U5", expand((x - 2) * (x + 5)), x**2 + 3 * x - 10)
for A_ in [2, -3, Rational(1, 2), 7]:
    los(f"U5", Eq(A_ * (x - 2) * (x + 5), 0), [2, -5])
chk("U5", expand(2 * (x - 2) * (x + 5)), 2 * x**2 + 6 * x - 20)
chk("U5", expand(-3 * (x - 2) * (x + 5)), -3 * x**2 - 9 * x + 30)
chk("U5", expand(2 * (x - 2) * (x + 5)) / 2, x**2 + 3 * x - 10)
chk("U5", expand(symbols("m") * (x - 2) * (x + 5)).coeff(x, 2), symbols("m"))

xa, xb = (-b + sqrt(D_(a, b, c))) / (2 * a), (-b - sqrt(D_(a, b, c))) / (2 * a)
chk("U6a", simplify(xa + xb), -b / a)
chk("U6a", simplify(expand(xa * xb)), c / a)
chk("U6b", [-(2 + 5), 2 * 5], [-7, 10])
chk("U6b", expand((x + 2) * (x + 5)), x**2 + 7 * x + 10)
sant("U6b", -2 + -5 == -7 and (-2) * (-5) == 10, "sum -b, produkt c")

rapport()
