"""Regner alle svar i 1.4 Rasjonale uttrykk på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *


def vilkaar(*nevnere):
    """Verdier som gjør en av de opprinnelige nevnerne (og eventuelle divisorer) lik 0."""
    mengde = S.EmptySet
    for nev in nevnere:
        mengde = Union(mengde, solveset(nev, x, domain=S.Reals))
    return sorted(mengde)


def likt(u, v):
    return simplify(u - v) == 0


# ---------- Eksempler ----------
chk("Eks 1.1", (x**2 - 9) / (x**2 + 3 * x), (x - 3) / x)
chk("Eks 1.1 vilkår", vilkaar(x**2 + 3 * x), [-3, 0])
chk("Eks 1.1 kontroll", [Rational(1 - 9, 1 + 3), Rational(1 - 3, 1)], [-2, -2])
chk("Eks 1.2", (x**2 - 4) / (3 * x) * (6 * x**2) / (x + 2), 2 * x * (x - 2))
chk("Eks 1.2 vilkår", vilkaar(3 * x, x + 2), [-2, 0])
chk("Eks 1.2 kontroll", ((x**2 - 4) / (3 * x) * (6 * x**2) / (x + 2)).subs(x, 3), 6)
chk("Eks 1 tekst", [Rational(2 + 3, 4 + 3), Rational(2, 4)], [Rational(5, 7), Rational(1, 2)])
chk("Eks 2.0 tall", Rational(1, 6) + Rational(1, 4), Rational(5, 12))
chk("Eks 2.1", 2 / x + 3 / (x + 1), (5 * x + 2) / (x * (x + 1)))
chk("Eks 2.1 kontroll", (2 / x + 3 / (x + 1)).subs(x, 1), Rational(7, 2))
chk("Eks 2.2", x / (x**2 - 4) - 1 / (x + 2), 2 / (x**2 - 4))
chk("Eks 2.2 forkortet", 2 / (x**2 - 4), 2 / ((x - 2) * (x + 2)))
chk("Eks 2.2 kontroll", (x / (x**2 - 4) - 1 / (x + 2)).subs(x, 3), Rational(2, 5))
chk("Eks 2.2 kontroll2", (2 / (x**2 - 4)).subs(x, 3), Rational(2, 5))

# ---------- Del 1 ----------
chk("1.1a", 6 * x**2 / (9 * x), 2 * x / 3)
chk("1.1a vilkår", vilkaar(9 * x), [0])
chk("1.1b", (3 * x + 6) / (x + 2), 3)
chk("1.1b vilkår", vilkaar(x + 2), [-2])
chk("1.1c", (x**2 - 5 * x) / x, x - 5)
chk("1.1c vilkår", vilkaar(x), [0])
chk("1.1d", (x - 4) / (x**2 - 4 * x), 1 / x)
chk("1.1d vilkår", vilkaar(x**2 - 4 * x), [0, 4])

chk("1.2a", factor(x**2 - 25), (x - 5) * (x + 5))
chk("1.2b", factor(x**2 - 5 * x), x * (x - 5))
chk("1.2c", (x**2 - 25) / (x**2 - 5 * x), (x + 5) / x)
chk("1.2c vilkår", vilkaar(x**2 - 5 * x), [0, 5])

chk("1.3a", vilkaar(x - 3), [3])
chk("1.3b", vilkaar(x**2 - 4), [-2, 2])
chk("1.3c", vilkaar(x * (x + 2)), [-2, 0])

chk("1.4a", (x**2 - 6 * x + 9) / (x**2 - 9), (x - 3) / (x + 3))
chk("1.4a vilkår", vilkaar(x**2 - 9), [-3, 3])
chk("1.4b", (2 * x**2 - 8) / (x**2 + 4 * x + 4), 2 * (x - 2) / (x + 2))
chk("1.4b vilkår", vilkaar(x**2 + 4 * x + 4), [-2])
chk("1.4c", (x**2 + 6 * x + 9) / (3 * x + 9), (x + 3) / 3)
chk("1.4c vilkår", vilkaar(3 * x + 9), [-3])
chk("1.4d", (5 - x) / (x - 5), -1)
chk("1.4d vilkår", vilkaar(x - 5), [5])

e15a = (x**2 - 1) / (2 * x) * (4 * x) / (x + 1)
e15b = (x**2 - 9) / (x + 1) / ((x + 3) / (2 * x + 2))
e15c = (x**2 + 2 * x) / (x**2 - 4) * (x - 2) / x**2
chk("1.5a", e15a, 2 * (x - 1))
chk("1.5a vilkår", vilkaar(2 * x, x + 1), [-1, 0])
chk("1.5b", e15b, 2 * (x - 3))
chk("1.5b vilkår", vilkaar(x + 1, x + 3), [-3, -1])
chk("1.5c", e15c, 1 / x)
chk("1.5c vilkår", vilkaar(x**2 - 4, x**2), [-2, 0, 2])

chk("1.6", (x**2 - 9) / (x**2 - 3 * x), (x + 3) / x)
chk("1.6 vilkår", vilkaar(x**2 - 3 * x), [0, 3])
sant("1.6 feil", not likt((x**2 - 9) / (x**2 - 3 * x), 3 / x), "svaret 3/x er feil")
chk("1.6 kontroll", [((x**2 - 9) / (x**2 - 3 * x)).subs(x, 6), Rational(3, 6)], [Rational(3, 2), Rational(1, 2)])

# 1.7: alltid / noen ganger / aldri
chk("1.7a", (x**2 - 1) / (x - 1), x + 1)
chk("1.7a vilkår", vilkaar(x - 1), [1])
chk("1.7b", (x - 3) / (3 - x), -1)
los("1.7c", Eq((x + 3) / (x + 5), Rational(3, 5)), [0])

aapen("1.8", "Lag selv: f.eks. (x+1)(x-3)/((x-2)(x-3))")
eks18 = (x + 1) * (x - 3) / ((x - 2) * (x - 3))
chk("1.8 eks", eks18, (x + 1) / (x - 2))
chk("1.8 eks vilkår", vilkaar((x - 2) * (x - 3)), [2, 3])

chk("1.9", x * (x - 2) / ((x + 2) * (x - 2)), x / (x + 2))
chk("1.9 vilkår", vilkaar((x + 2) * (x - 2)), [-2, 2])
chk("1.9 kontroll", [(x / (x + 2)).subs(x, 2)], [S.Half])

chk("Sjekk 1a", (2 * x + 4) / (x**2 - 4), 2 / (x - 2))
chk("Sjekk 1a vilkår", vilkaar(x**2 - 4), [-2, 2])
chk("Sjekk 1b", vilkaar(x - 5), [5])
chk("Sjekk 1c", [Rational(1 + 3, 1 + 5), Rational(3, 5)], [Rational(2, 3), Rational(3, 5)])
aapen("Sjekk 1c tekst", "x+3 og x+5 er summer, ikke faktorer; tallprøve")

# ---------- Del 2 ----------
chk("2.1a", Rational(1, 3) + Rational(1, 4), Rational(7, 12))
chk("2.1b", Rational(5, 6) - Rational(3, 8), Rational(11, 24))
chk("2.1c", Rational(2, 5) + Rational(3, 10), Rational(7, 10))

chk("2.2a", 3 / x + 5 / x, 8 / x)
chk("2.2b", (2 * x + 1) / (x + 3) + (x + 5) / (x + 3), 3 * (x + 2) / (x + 3))
chk("2.2c", 5 / x - 2 / x, 3 / x)
chk("2.2d", (x + 4) / (x - 1) - (x + 1) / (x - 1), 3 / (x - 1))

chk("2.3a", lcm(x, x + 2), x * (x + 2))
chk("2.3b", lcm(x**2 - 4, x - 2), x**2 - 4)
chk("2.3c", lcm(2 * x, 3 * x**2), 6 * x**2)

chk("2.4a", 1 / x + 2 / (x + 3), 3 * (x + 1) / (x * (x + 3)))
chk("2.4b", 3 / (x - 1) - 2 / x, (x + 2) / (x * (x - 1)))
chk("2.4c", 1 / (2 * x) + 1 / (3 * x**2), (3 * x + 2) / (6 * x**2))
chk("2.4d", x / (x + 1) + 1 / (x - 1), (x**2 + 1) / (x**2 - 1))

chk("2.5a", 1 / (x - 3) - 6 / (x**2 - 9), 1 / (x + 3))
chk("2.5a vilkår", vilkaar(x - 3, x**2 - 9), [-3, 3])
chk("2.5b", 2 * x / (x**2 - 1) + 1 / (x + 1), (3 * x - 1) / (x**2 - 1))
chk("2.5b vilkår", vilkaar(x**2 - 1, x + 1), [-1, 1])
chk("2.5c", 1 / x - 1 / (x**2 + x), 1 / (x + 1))
chk("2.5c vilkår", vilkaar(x, x**2 + x), [-1, 0])

chk("2.6", 2 / x - (x - 1) / x, (3 - x) / x)
sant("2.6 feil", not likt(2 / x - (x - 1) / x, (1 - x) / x), "(2-x-1)/x er feil")
chk("2.6 kontroll", [(2 / x - (x - 1) / x).subs(x, 2), (3 - x).subs(x, 2) / 2], [S.Half, S.Half])

sv = symbols("s", positive=True)
chk("2.7a", sv / 60 + sv / 40, sv / 24)
chk("2.7b", 2 * sv / (sv / 60 + sv / 40), 48)
v1, v2 = symbols("v1 v2", positive=True)
chk("2.7 generell", 2 * sv / (sv / v1 + sv / v2), 2 * v1 * v2 / (v1 + v2))
chk("2.7 generell tall", (2 * v1 * v2 / (v1 + v2)).subs({v1: 60, v2: 40}), 48)

los("2.8a", Eq(x / (x - 2), 2 / (x - 2) + 3), [])
los("2.8b", (2 / (x - 1) + 1, (x + 1) / (x - 1)), "alle")
chk("2.8b omskriving", 2 / (x - 1) + 1, (x + 1) / (x - 1))
chk("2.8a kandidat", solve(Eq(x, 2 + 3 * (x - 2)), x), [2])

# 2.9: 1/a + 1/b = 2/(a+b) aldri
chk("2.9 utregning", expand(numer(together(1 / a + 1 / b - 2 / (a + b)))), a**2 + b**2)
sant("2.9", all(a**2 + b**2 > 0 for a, b in [(1, 2), (-3, 1), (5, -5)]), "a^2+b^2>0 når a,b != 0")
chk("2.9 kontroll", [Rational(1, 2) + Rational(1, 3), Rational(2, 5)], [Rational(5, 6), Rational(2, 5)])

chk("Sjekk 2a", 1 / x + 1 / y, (x + y) / (x * y))
chk("Sjekk 2b", 3 / x - (x + 1) / x, (2 - x) / x)
chk("Sjekk 2c", [Rational(1, 2) + Rational(1, 3), Rational(2, 5)], [Rational(5, 6), Rational(2, 5)])

# ---------- Utfordring ----------
uU1 = (x**2 - 4) / (x**2 + 4 * x + 4) / ((x - 2) / (x**2 + 2 * x))
chk("U1", uU1, x)
chk("U1 vilkår", vilkaar(x**2 + 4 * x + 4, x**2 + 2 * x, x - 2), [-2, 0, 2])
chk("U2", 1 / (x - 1) - 1 / (x + 1) - 2 / (x**2 - 1), 0)
chk("U3", (1 + 1 / x) / (1 - 1 / x**2), x / (x - 1))
chk("U3 vilkår", vilkaar(x, x**2, x**2 - 1), [-1, 0, 1])
chk("U4", (x + 1) + 2 / (x - 1), (x**2 + 1) / (x - 1))
chk("U4 stor x", float(((100000**2 + 1) / (100000 - 1) - 100001) * 1), 2 / 99999, tol=1e-4)
chk("U5a", 1 / n - 1 / (n + 1), 1 / (n * (n + 1)))
chk("U5b", sum(Rational(1, i * (i + 1)) for i in range(1, 100)), Rational(99, 100))
from fractions import Fraction
sum_ = Fraction(0)
utskrift = []
for i in range(1, 11):
    sum_ += Fraction(1, i * (i + 1))
    utskrift.append(sum_)
chk("U6", [str(f) for f in utskrift],
    ["1/2", "2/3", "3/4", "4/5", "5/6", "6/7", "7/8", "8/9", "9/10", "10/11"])
chk("U7", (x + 5) / (x - 1), 1 + 6 / (x - 1))
heltall = [m for m in range(-100, 101) if m != 1 and (m + 5) % (m - 1) == 0]
chk("U7 heltall", heltall, [-5, -2, -1, 0, 2, 3, 4, 7])

rapport()
