"""Regner alle svar i 3.4 Rasjonale funksjoner på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *
from sympy import limit, oo, cancel, apart, div, Poly, factor, solveset, Interval, Union, Complement, S, denom, numer


d = symbols("d")


def vert(f):
    """Vertikale asymptoter: nullpunkt i nevneren etter forkorting."""
    return sorted(solveset(denom(cancel(together(f))), x, S.Reals))


def hull(teller, nevner):
    """Hull: x der både teller og nevner er 0. Gir liste av [x, y]."""
    alle = solveset(nevner, x, S.Reals)
    igjen = solveset(denom(cancel(teller / nevner)), x, S.Reals)
    return sorted([p, limit(teller / nevner, x, p)] for p in Complement(alle, igjen))


def horiz(f):
    return limit(f, x, oo)


# ---------- Del 1: eksempler ----------
f1 = (2 * x + 1) / (x - 1)
q, r = div(2 * x + 1, x - 1, x)
chk("Eks 1.1 div kvotient", q, 2)
chk("Eks 1.1 div rest", r, 3)
chk("Eks 1.1 omskriving", f1 - (2 + 3 / (x - 1)), 0)
chk("Eks 1.1 vertikal", vert(f1), [1])
chk("Eks 1.1 teller i 1", 2 * 1 + 1, 3)
chk("Eks 1.1 horisontal", horiz(f1), 2)
chk("Eks 1.1 nullpunkt", solve(2 * x + 1, x), [Rational(-1, 2)])
chk("Eks 1.1 y-skjæring", f1.subs(x, 0), -1)
chk("Eks 1.1 kontroll f(100)", f1.subs(x, 100), Rational(201, 99))
sant("Eks 1.1 kontroll f(100) nær 2", abs(f1.subs(x, 100) - 2) < Rational(1, 30), "201/99 = 2,03")
g1 = (x**2 - 4) / (x - 2)
chk("Eks 1.2 faktorisering", factor(x**2 - 4), (x - 2) * (x + 2))
chk("Eks 1.2 forkortet", cancel(g1), x + 2)
sant("Eks 1.2 hull", hull(x**2 - 4, x - 2) == [[2, 4]], "hull i (2, 4)")
chk("Eks 1.2 vertikal", vert(g1), [])
chk("Eks 1.2 kontroll g(3)", g1.subs(x, 3), 5)

# Teoriboks del 1
chk("T1 horisontal generelt", limit((a * x + b) / (c * x + d), x, oo), a / c)
chk("T1 omskriving f(x)=2+3/(x-1) ved x=5", f1.subs(x, 5), 2 + Rational(3, 4))

# Vanlige feil del 1
chk("VF 1a vertikal (x-3)/(x+1)", vert((x - 3) / (x + 1)), [-1])
chk("VF 1a nullpunkt", solve(x - 3, x), [3])
chk("VF 1b div", div(5 * x + 1, x + 2, x), (5, -9))
chk("VF 1b horisontal", horiz((5 * x + 1) / (x + 2)), 5)
sant("VF 1c hull", hull(x**2 - 9, x - 3) == [[3, 6]], "hull i (3, 6)")
chk("VF 1c vertikal", vert((x**2 - 9) / (x - 3)), [])

# ---------- Del 1: oppgaver ----------
chk("1.1a vert", vert((x + 5) / (x - 2)), [2])
chk("1.1a horiz", horiz((x + 5) / (x - 2)), 1)
chk("1.1b vert", vert((4 * x - 1) / (2 * x + 6)), [-3])
chk("1.1b horiz", horiz((4 * x - 1) / (2 * x + 6)), 2)
chk("1.1c vert", vert(6 / (x + 1)), [-1])
chk("1.1c horiz", horiz(6 / (x + 1)), 0)

chk("1.2a", expand(3 * (x + 1) + 4), 3 * x + 7)
chk("1.2b", (3 * x + 7) / (x + 1) - (3 + 4 / (x + 1)), 0)
chk("1.2c", horiz((3 * x + 7) / (x + 1)), 3)

f13 = (2 * x - 6) / (x + 4)
chk("1.3a", solveset(denom(f13), x, S.Reals), FiniteSet(-4))
chk("1.3b", solve(2 * x - 6, x), [3])
chk("1.3c", f13.subs(x, 0), Rational(-3, 2))

f21 = (5 * x - 2) / (x - 3)
chk("1.4a div", div(5 * x - 2, x - 3, x), (5, 13))
chk("1.4a", f21 - (5 + 13 / (x - 3)), 0)
chk("1.4b vert", vert(f21), [3])
chk("1.4b horiz", horiz(f21), 5)
chk("1.4c nullpunkt", solve(5 * x - 2, x), [Rational(2, 5)])
chk("1.4c y", f21.subs(x, 0), Rational(2, 3))
sant("1.4d", f21.subs(x, 3 + Rational(1, 100)) > 1000 and f21.subs(x, 3 - Rational(1, 100)) < -1000, "grenene mot asymptoten")

p22 = (x**2 - 5 * x + 4) / (x - 1)
q22 = (x**2 - 3 * x + 2) / (x**2 - 4)
chk("1.5a faktor", factor(x**2 - 5 * x + 4), (x - 1) * (x - 4))
chk("1.5a forkortet", cancel(p22), x - 4)
sant("1.5a hull", hull(x**2 - 5 * x + 4, x - 1) == [[1, -3]], "hull i (1, -3)")
chk("1.5a vert", vert(p22), [])
chk("1.5b faktor teller", factor(x**2 - 3 * x + 2), (x - 1) * (x - 2))
chk("1.5b faktor nevner", factor(x**2 - 4), (x - 2) * (x + 2))
chk("1.5b forkortet", cancel(q22), (x - 1) / (x + 2))
sant("1.5b hull", hull(x**2 - 3 * x + 2, x**2 - 4) == [[2, Rational(1, 4)]], "hull i (2, 1/4)")
chk("1.5b vert", vert(q22), [-2])
chk("1.5b horiz", horiz(q22), 1)

# 2.3: finn den første feilen
f23 = (2 * x - 8) / (x**2 - 16)
sant("1.6 pil 1 (faktorisert)", simplify(f23 - 2 * (x - 4) / ((x - 4) * (x + 4))) == 0, "ok")
sant("1.6 pil 2 (forkortet)", cancel(f23) == 2 / (x + 4), "ok")
chk("1.6 riktig vert", vert(f23), [-4])
sant("1.6 riktig hull", hull(2 * x - 8, x**2 - 16) == [[4, Rational(1, 4)]], "hull i (4, 1/4)")
chk("1.6 riktig horiz", horiz(f23), 0)

# 3.1: lag selv f = (ax+b)/(cx+d); vertikal x=3, horisontal y=-2, nullpunkt x=1
f31 = (-2 * x + 2) / (x - 3)
chk("1.7 vert", vert(f31), [3])
chk("1.7 horiz", horiz(f31), -2)
chk("1.7 null", solve(-2 * x + 2, x), [1])
f31b = (-4 * x + 4) / (2 * x - 6)
chk("1.7 alt", simplify(f31b - f31), 0)
# 3.2
chk("1.8a ad=bc gir konstant", cancel((a * x + b) / (c * x + d)).subs({b: a * d / c}), a / c)
chk("1.8a ad=bc eksempel", cancel((2 * x + 4) / (x + 2)), 2)
chk("1.8b likning", simplify((a * x + b) / (c * x + d) - a / c - (b * c - a * d) / (c * (c * x + d))), 0)
sant("1.8b aldri lik", (b * c - a * d) != 0, "teller i differansen er konstant og ikke 0")
h32 = (3 * x**2 + x) / (x**2 + 1)
los("1.8c", Eq(h32, 3), [3])
chk("1.8c horiz", horiz(h32), 3)
# 3.3: hull i (-1, 3) og vertikal asymptote x = 4
f33 = 15 * x * (x + 1) / ((x + 1) * (x - 4))
sant("1.9 hull", hull(15 * x * (x + 1), (x + 1) * (x - 4)) == [[-1, 3]], "hull i (-1, 3)")
chk("1.9 vert", vert(f33), [4])
chk("1.9 kontroll", cancel(f33), 15 * x / (x - 4))

# Sjekk 1
chk("Sjekk 1a vert", vert((6 * x + 1) / (x - 4)), [4])
chk("Sjekk 1a horiz", horiz((6 * x + 1) / (x - 4)), 6)
aapen("Sjekk 1b", "Asymptote: grafen nærmer seg uten å nå. Hull: ett punkt mangler (teller og nevner er 0).")
chk("Sjekk 1c", div(x + 4, x - 2, x), (1, 6))
chk("Sjekk 1c fire", ((x + 4) / (x - 2)).subs(x, 1002), 1 + Rational(6, 1000))

# ---------- Del 2: eksempler ----------
los("Eks 2.1 likning", Eq((2 * x + 1) / (x - 1), 3), [4])
chk("Eks 2.1 steg", expand(3 * (x - 1)), 3 * x - 3)
chk("Eks 2.1 steg løs", solve(Eq(2 * x + 1, 3 * x - 3), x), [4])
chk("Eks 2.1 kontroll", Rational(2 * 4 + 1, 4 - 1), 3)
ulikhet("Eks 2.2 ulikhet", (x + 3) / (x - 2) <= 1, Interval.open(-oo, 2))
sant("Eks 2.2 gal metode gir tull", not (3 <= -2), "3 <= -2 er usant")
sant("Eks 2.2 men x=0 virker", Rational(0 + 3, 0 - 2) <= 1, "-3/2 <= 1")
chk("Eks 2.2 differanse", simplify((x + 3) / (x - 2) - 1 - 5 / (x - 2)), 0)
chk("Eks 2.2 kontroll x=0", Rational(3, -2), Rational(-3, 2))

# Vanlige feil del 2
ulikhet("VF 2a", 1 / (x - 3) < 1, Union(Interval.open(-oo, 3), Interval.open(4, oo)))
sant("VF 2a moteksempel x=0", Rational(1, 0 - 3) < 1, "-1/3 < 1")
sant("VF 2a feil svar utelater x=0", not (0 > 4), "0 er ikke > 4")
los("VF 2b", Eq(x / (x - 3), 3 / (x - 3)), [])
ulikhet("VF 2c", (x - 1) / (x + 4) <= 0, Interval.Lopen(-4, 1))

# ---------- Del 2: oppgaver ----------
los("2.1a", Eq(12 / x, 4), [3])
los("2.1b", Eq((x + 6) / x, 4), [2])
los("2.1c", Eq(3 / (x - 1), 6 / (x + 1)), [3])

chk("2.2a", sorted(solveset(denom(5 / (x - 3)), x, S.Reals)), [3])
chk("2.2b", sorted(solveset(denom(together(1 / x + 1 / (x + 4))), x, S.Reals)), [-4, 0])
chk("2.2c", sorted(solveset(denom((x + 1) / (x**2 - 9)), x, S.Reals)), [-3, 3])

ulikhet("2.3", (x - 1) / (x + 3) > 0, Union(Interval.open(-oo, -3), Interval.open(1, oo)))

los("2.4a", Eq(2 * x / (x - 3), 1 + 6 / (x - 3)), [])
chk("2.4a falsk løsning", solve(Eq(2 * x, x - 3 + 6), x), [3])
los("2.4b", Eq(1 / x + 1 / (x + 2), Rational(3, 4)), [Rational(-4, 3), 2])
los("2.4c", Eq(2 / (x - 1), x / (x + 2)), [-1, 4])

ulikhet("2.5a", (x - 4) / (x + 1) >= 0, Union(Interval.open(-oo, -1), Interval(4, oo)))
ulikhet("2.5b", (2 * x - 1) / (x - 3) < 1, Interval.open(-2, 3))
chk("2.5b omskrevet", simplify((2 * x - 1) / (x - 3) - 1 - (x + 2) / (x - 3)), 0)
ulikhet("2.5c", 3 / (x + 2) <= 1, Union(Interval.open(-oo, -2), Interval(1, oo)))
chk("2.5c omskrevet", simplify(3 / (x + 2) - 1 - (1 - x) / (x + 2)), 0)

# 2.6: finn den første feilen
ulikhet("2.6 riktig", (x + 5) / (x - 1) >= 2, Interval.Lopen(1, 7))
sant("2.6 pil 1", simplify((x + 5) / (x - 1) - 2 - ((x + 5) / (x - 1) - 2)) == 0, "samme ulikhet")
sant("2.6 pil 2 er feil", simplify((x + 5) / (x - 1) - 2 - (x + 5 - 2 * x - 2) / (x - 1)) != 0, "fortegnsfeil: -2(x-1) = -2x+2")
chk("2.6 riktig teller", expand(x + 5 - 2 * (x - 1)), 7 - x)
chk("2.6 kontroll x=7", Rational(7 + 5, 7 - 1), 2)
sant("2.6 kontroll x=3 gir ikke løsning", Rational(3 + 5, 3 - 1) >= 2 and True, "x=3 er med i begge, x=5 skiller")
sant("2.6 skiller: x=5", Rational(5 + 5, 5 - 1) >= 2, "5/2 >= 2 sant, men 5 > 3")

# 3.1 baklengs
ulikhet("3.1", (x - 3) / (x + 2) >= 0, Union(Interval.open(-oo, -2), Interval(3, oo)))
# 3.2
ulikhet("2.8a", (x - 1) ** 2 / (x + 3) > 0, Union(Interval.open(-3, 1), Interval.open(1, oo)))
ulikhet("2.8b", (x - 1) ** 2 / (x + 3) >= 0, Interval.open(-3, oo))
# 3.3 parameter k
los("2.9 k=-2", ((x - 2) / (x - 2), 3), [])
chk("2.9 løsning generelt", solve(Eq(x + k, 3 * (x - 2)), x), [(k + 6) / 2])
chk("2.9 falsk når x=2", solve(Eq((k + 6) / 2, 2), k), [-2])
los("2.9 k=0 har løsning", Eq((x + 0) / (x - 2), 3), [3])

# Sjekk 2
los("Sjekk 2a", Eq(8 / (x + 1), 2), [3])
ulikhet("Sjekk 2b", (x - 2) / (x + 3) < 0, Interval.open(-3, 2))
ulikhet("Sjekk 2c", 5 / x > 2, Interval.open(0, Rational(5, 2)))
sant("Sjekk 2c x=-1", 5 / Rational(-1) < 2, "gal metode gir x < 5/2 inkl. -1, men 5/(-1) = -5 < 2")

# ---------- Utfordring ----------
q, r = div(x**2 + 1, x - 1, x)
chk("U1a kvotient", q, x + 1)
chk("U1a rest", r, 2)
chk("U1a", (x**2 + 1) / (x - 1) - (x + 1 + 2 / (x - 1)), 0)
chk("U1b", limit((x**2 + 1) / (x - 1) - (x + 1), x, oo), 0)
chk("U1c vert", vert((x**2 + 1) / (x - 1)), [1])
sant("U1c horiz", horiz((x**2 + 1) / (x - 1)) == oo, "ingen horisontal asymptote")

K = (5000 + 20 * x) / x
chk("U2a", horiz(K), 20)
chk("U2a omskrevet", K - (20 + 5000 / x), 0)
sant("U2b", solveset(K < 25, x, S.Reals).intersect(Interval.open(0, oo)) == Interval.open(1000, oo), "x > 1000")
chk("U2b kontroll", K.subs(x, 1000), 25)
chk("U2c", vert(K), [0])
aapen("U2c vurdering", "x=0 gir ingen mening; kostnaden per enhet blir aldri under 20 kr")

kode = """
def f(x):
    return (2 * x + 1) / (x - 1)

for x in [1.1, 1.01, 1.001, 10, 100, 1000]:
    print(x, round(f(x), 3))
"""
import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    exec(kode, {})
sant("U3 utskrift", buf.getvalue().split("\n")[:-1] ==
    ["1.1 32.0", "1.01 302.0", "1.001 3002.0", "10 2.333", "100 2.03", "1000 2.003"], buf.getvalue())
try:
    exec("def g(x):\n    return (2 * x + 1) / (x - 1)\ng(1)", {})
    feil = None
except ZeroDivisionError as e:
    feil = "ZeroDivisionError"
chk("U3c", feil, "ZeroDivisionError")

ulikhet("U4", 1 / (x - 1) >= 1 / (x + 2), Union(Interval.open(-oo, -2), Interval.open(1, oo)))
chk("U4 omskrevet", simplify(1 / (x - 1) - 1 / (x + 2) - 3 / ((x - 1) * (x + 2))), 0)

fU5 = (3 * x + 1) / (x - 2)
chk("U5a div", div(3 * x + 1, x - 2, x), (3, 7))
los("U5a", (fU5, 3), [])
y_ = symbols("y")
chk("U5b invers", solve(Eq(y_, fU5), x), [(2 * y_ + 1) / (y_ - 3)])
chk("U5b kontroll", fU5.subs(x, (2 * y_ + 1) / (y_ - 3)).simplify(), y_)
chk("U5b forbudt y", solveset(denom((2 * y_ + 1) / (y_ - 3)), y_, S.Reals), FiniteSet(3))

heltall = [t_ for t_ in range(-60, 61) if t_ != 1 and ((t_ + 7) % (t_ - 1) == 0)]
chk("U6", sorted(heltall), [-7, -3, -1, 0, 2, 3, 5, 9])
chk("U6 omskriving", (x + 7) / (x - 1) - (1 + 8 / (x - 1)), 0)

fU7 = (x - 3) / ((x + 1) * (x - 2) * (x - 3))
chk("U7 vert", vert(fU7), [-1, 2])
chk("U7 horiz", horiz(fU7), 0)
sant("U7 hull", hull(x - 3, (x + 1) * (x - 2) * (x - 3)) == [[3, Rational(1, 4)]], "hull i (3, 1/4)")

rapport()
