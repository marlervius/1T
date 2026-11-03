"""Regner alle svar i 4.3 Derivasjonsregler på nytt med sympy."""
import contextlib
import io

from kontroll import *

h = symbols("h")
m_, c_ = symbols("m_ c_")


def d(u):
    """Den deriverte av u(x)."""
    return diff(sympify(u), x)


def tang(u, p):
    """Tangenten til u i x = p som y = m x + c. Returnerer (m, c)."""
    u = sympify(u)
    m = d(u).subs(x, p)
    return m, expand(u.subs(x, p) - m * p)


def tangent_uttrykk(u, p):
    m, c = tang(u, p)
    return m * x + c


# ---------- Del 1: eksempler ----------
f = 2 * x**3 - 5 * x**2 + 4
chk("Eks 1.1 f'", d(f), 6 * x**2 - 10 * x)
chk("Eks 1.1 ledd 1", d(2 * x**3), 6 * x**2)
chk("Eks 1.1 ledd 2", d(-5 * x**2), -10 * x)
chk("Eks 1.1 ledd 3", d(4), 0)
chk("Eks 1.1 f'(2)", d(f).subs(x, 2), 4)
chk("Eks 1.1 inns", (6 * x**2 - 10 * x).subs(x, 2), 6 * 4 - 20)

g = (2 * x - 1) ** 2
chk("Eks 1.2 utgang", g, 4 * x**2 - 4 * x + 1)
chk("Eks 1.2 g'", d(4 * x**2 - 4 * x + 1), 8 * x - 4)
chk("Eks 1.2 g'(1)", (8 * x - 4).subs(x, 1), 4)
for hh, fork in [(Rational(1, 10), Rational(44, 10)), (Rational(1, 100), Rational(404, 100)), (Rational(1, 1000), Rational(4004, 1000))]:
    chk(f"Eks 1.2 tabell h={hh}", (g.subs(x, 1 + hh) - g.subs(x, 1)) / hh, fork)

# ---------- Del 1: vanlige feil ----------
chk("VF 1a", d(x**3), 3 * x**2)
chk("VF 1b", d(5), 0)
chk("VF 1c", d(5 * x), 5)
# produktet av de deriverte er ikke den deriverte av produktet
sant("VF 1d", d(x**2 * x) != d(x**2) * d(x) and d(x**2 * x) == 3 * x**2 and d(x**2) * d(x) == 2 * x, "(x^2 * x)' = 3x^2, men 2x * 1 = 2x")
# (x^2+1)(x-2) fra brief
sant("VF 1d ekstra", d((x**2 + 1) * (x - 2)) != d(x**2 + 1) * d(x - 2), "ulik")

# ---------- Del 1: oppgaver ----------
chk("1.1a", d(x**5), 5 * x**4)
chk("1.1b", d(4 * x**3), 12 * x**2)
chk("1.1c", d(6 * x - 9), 6)
chk("1.1d", d(8), 0)

chk("1.2a", d(3 * x**2 + 4 * x - 1), 6 * x + 4)
chk("1.2b", d(x**4 - 2 * x**3), 4 * x**3 - 6 * x**2)
chk("1.2c", d(Rational(1, 2) * x**2 + 10), x)
chk("1.2d", d(5 * x**3 - x), 15 * x**2 - 1)

f13 = x**3 - 3 * x**2 + 5 * x
chk("1.3a", d(f13), 3 * x**2 - 6 * x + 5)
chk("1.3b", d(f13).subs(x, 3), 14)

chk("1.4a", d((x + 3) ** 2), 2 * x + 6)
chk("1.4a utg", expand((x + 3) ** 2), x**2 + 6 * x + 9)
chk("1.4b", d((3 * x - 1) * (x + 2)), 6 * x + 5)
chk("1.4b utg", expand((3 * x - 1) * (x + 2)), 3 * x**2 + 5 * x - 2)
chk("1.4c utg", cancel((x**3 + 4 * x) / x), x**2 + 4)
chk("1.4c", d(cancel((x**3 + 4 * x) / x)), 2 * x)
chk("1.4d utg", cancel((2 * x**3 - 6 * x**2) / (2 * x)), x**2 - 3 * x)
chk("1.4d", d(cancel((2 * x**3 - 6 * x**2) / (2 * x))), 2 * x - 3)

# 1.5 finn den første feilen
k0 = (x - 1) * (x + 4)
sant("1.5 pil 1", expand(k0) == x**2 + 3 * x - 4, "(x-1)(x+4) = x^2 + 3x - 4")
sant("1.5 pil 2 (feil)", d(x**2 + 3 * x - 4) != 2 * x + 3 - 4, "(-4)' er 0, ikke -4")
sant("1.5 pil 3", (2 * x + 3 - 4) == 2 * x - 1, "2x + 3 - 4 = 2x - 1")
sant("1.5 pil 4", (2 * x - 1).subs(x, 3) == 5, "feil verdi 5")
chk("1.5 riktig f'", d(k0), 2 * x + 3)
chk("1.5 riktig f'(3)", d(k0).subs(x, 3), 9)

# 1.6 syklist
s = Rational(1, 2) * t**2 + 2 * t
chk("1.6a", diff(s, t), t + 2)
chk("1.6b", diff(s, t).subs(t, 4), 6)
chk("1.6c s(4)", s.subs(t, 4), 16)
chk("1.6c tabell", (s.subs(t, 4 + Rational(1, 100)) - s.subs(t, 4)) / Rational(1, 100), Rational(6005, 1000))

# 1.7 alltid/noen/aldri
chk("1.7a samme f", d(x**2 + 7) - d(x**2 - 4), 0)
sant("1.7a", d(x**2 + 1) == d(x**2) and (x**2 + 1) != x**2, "forskjøvet med konstant")
sant("1.7b", all(degree(d(a * x**nn), x) == nn - 1 for nn in range(1, 8)), "grad n gir grad n-1")

# 1.8 Olas metode
chk("1.8a", d((x + 1) * (x - 1)), 2 * x)
chk("1.8a Ola", d(x + 1) * d(x - 1), 1)
los("1.8b", Eq(d((x + 1) * (x - 1)), d(x + 1) * d(x - 1)), [Rational(1, 2)])
sant("1.8c", d(x * x) != d(x) * d(x), "(x*x)' = 2x, men 1*1 = 1")

# Sjekk 1
chk("Sjekk 1a", d(3 * x**4 - 5 * x), 12 * x**3 - 5)
chk("Sjekk 1b", d(7), 0)
chk("Sjekk 1c", d((x + 2) ** 2), 2 * x + 4)
chk("Sjekk 1c utg", expand((x + 2) ** 2), x**2 + 4 * x + 4)

# ---------- Del 2: eksempler ----------
f21 = x**2 - 3 * x
chk("Eks 2.1 f'", d(f21), 2 * x - 3)
chk("Eks 2.1 f(1)", f21.subs(x, 1), -2)
chk("Eks 2.1 f'(1)", d(f21).subs(x, 1), -1)
chk("Eks 2.1 steg", expand(-1 * (x - 1) - 2), -x - 1)
chk("Eks 2.1 linje", tangent_uttrykk(f21, 1), -x - 1)
chk("Eks 2.1 kontroll punkt", (-x - 1).subs(x, 1), -2)
chk("Eks 2.1 felles", factor(f21 - (-x - 1)), (x - 1) ** 2)

f22 = x**3 - 3 * x
chk("Eks 2.2 f'", d(f22), 3 * x**2 - 3)
los("Eks 2.2 f'=0", Eq(d(f22), 0), [-1, 1])
chk("Eks 2.2 f(1)", f22.subs(x, 1), -2)
chk("Eks 2.2 f(-1)", f22.subs(x, -1), 2)

# ---------- Del 2: vanlige feil ----------
sant("VF 2a", expand((2 * x - 3) * (x - 1) - 2) != -x - 1 and degree(expand((2 * x - 3) * (x - 1) - 2), x) == 2, "f'(x) gir parabel")
chk("VF 2b", tangent_uttrykk(f21, 1), -x - 1)
chk("VF 2b feil", expand(-2 * (x - 1) - 2), -2 * x)
chk("VF 2c", f22.subs(x, 1), -2)

# ---------- Del 2: oppgaver ----------
f_ = x**2 + 3 * x
chk("2.1a f(1)", f_.subs(x, 1), 4)
chk("2.1a f'", d(f_), 2 * x + 3)
chk("2.1a f'(1)", d(f_).subs(x, 1), 5)
chk("2.1b linje", tangent_uttrykk(f_, 1), 5 * x - 1)
chk("2.1b steg", expand(5 * (x - 1) + 4), 5 * x - 1)

chk("2.2a", tangent_uttrykk(x**2 - 4 * x, 3), 2 * x - 9)
chk("2.2b", tangent_uttrykk(x**3, 1), 3 * x - 2)
chk("2.2c", tangent_uttrykk(2 * x**2 - x + 1, 0), -x + 1)

los("2.3a", Eq(d(x**2 - 6 * x), 0), [3])
los("2.3b", Eq(d(x**2 - 6 * x), 4), [5])
los("2.3c", Eq(d(x**2 - 6 * x), -2), [2])

f24 = x**3 - 3 * x**2 + 2
chk("2.4a f(1)", f24.subs(x, 1), 0)
chk("2.4a f'(1)", d(f24).subs(x, 1), -3)
chk("2.4a", tangent_uttrykk(f24, 1), -3 * x + 3)
los("2.4b", Eq(d(f24), 0), [0, 2])
chk("2.4b y0", f24.subs(x, 0), 2)
chk("2.4b y2", f24.subs(x, 2), -2)
los("2.4c", Eq(d(f24), 9), [-1, 3])
chk("2.4c y-1", f24.subs(x, -1), -2)
chk("2.4c y3", f24.subs(x, 3), 2)

# 2.5 finn den første feilen
f25 = x**2 - 5 * x
sant("2.5 pil 1", f25.subs(x, 4) == -4, "f(4) = -4")
sant("2.5 pil 2", d(f25) == 2 * x - 5, "f'(x) = 2x - 5")
sant("2.5 pil 3", d(f25).subs(x, 4) == 3, "f'(4) = 3")
sant("2.5 pil 4 (feil)", tangent_uttrykk(f25, 4) == 3 * x - 16 and (3 * (x - 4) + 4) != 3 * x - 16, "y + 4, ikke y - 4")
chk("2.5 riktig", tangent_uttrykk(f25, 4), 3 * x - 16)
chk("2.5 feil svar konsekvent", expand(3 * (x - 4) + 4), 3 * x - 8)

# 2.6 ball
hh_ = 20 * t - 5 * t**2
chk("2.6a", diff(hh_, t), 20 - 10 * t)
chk("2.6a fart 1 s", diff(hh_, t).subs(t, 1), 10)
los("2.6b", Eq(diff(hh_, t), 0), [2], var=t)
chk("2.6c", hh_.subs(t, 2), 20)
chk("2.6c toppunkt", -Rational(20, 1) / (2 * -5), 2)

# 2.7 a og b
A, B = symbols("A B")
losn = solve([Eq(2 * A + B, 4), Eq(9 * A + 3 * B, 15)], [A, B])
chk("2.7a", [losn[A], losn[B]], [1, 2])
chk("2.7a f'(1)", d(x**2 + 2 * x).subs(x, 1), 4)
chk("2.7a f(3)", (x**2 + 2 * x).subs(x, 3), 15)
chk("2.7b", tangent_uttrykk(x**2 + 2 * x, 1), 4 * x - 1)

# 2.8 alltid/noen/aldri
chk("2.8a generelt", solve(Eq(2 * a * x + b, 2 * a * 5 + b), x), [5])
los("2.8b ja", Eq(d(x**3), 0), [0])
los("2.8b nei", Eq(d(x**3 + x), 0), [])
los("2.8c ingen", Eq(d(x**3 + x), 0), [])
los("2.8c en", Eq(d(x**3), 0), [0])
los("2.8c to", Eq(d(x**3 - 3 * x), 0), [-1, 1])
sant("2.8c maks to", degree(d(a * x**3 + b * x**2 + c * x), x) == 2, "f' er andregrad")

# Sjekk 2
chk("Sjekk 2a", tangent_uttrykk(x**2, 2), 4 * x - 4)
los("Sjekk 2b", Eq(d(x**2 - 8 * x), 0), [4])
aapen("Sjekk 2c", "f'(a) er et tall (stigningstallet), f'(x) er en funksjon")

# ---------- Utfordring ----------
K = Rational(1, 100) * x**2 + 20 * x + 5000
chk("U2a", d(K), Rational(1, 50) * x + 20)
chk("U2b", d(K).subs(x, 100), 22)
chk("U2c", K.subs(x, 101) - K.subs(x, 100), Rational(2201, 100))
sant("U2d", abs(d(K).subs(x, 100) - (K.subs(x, 101) - K.subs(x, 100))) < Rational(1, 10), "nesten lik")

f_u2 = x**3 - 6 * x
los("U3 x", Eq(d(f_u2), 6), [-2, 2])
chk("U3 y2", f_u2.subs(x, 2), -4)
chk("U3 y-2", f_u2.subs(x, -2), 4)
chk("U3 t1", tangent_uttrykk(f_u2, 2), 6 * x - 16)
chk("U3 t2", tangent_uttrykk(f_u2, -2), 6 * x + 16)

f_u3 = x**2 - 4 * x + 6
chk("U4 f(1)", f_u3.subs(x, 1), 3)
chk("U4 f'(1)", d(f_u3).subs(x, 1), -2)
chk("U4 linje", tangent_uttrykk(f_u3, 1), -2 * x + 5)
los("U4 x-akse", Eq(-2 * x + 5, 0), [Rational(5, 2)])
chk("U4 y-akse", (-2 * x + 5).subs(x, 0), 5)
chk("U4 areal", Rational(1, 2) * Rational(5, 2) * 5, Rational(25, 4))

# U1 programmering: koden kjøres slik den står
kode_u4 = '''
def f(x):
    return x**4 - x

def derivert(f, a, h=0.0001):
    return (f(a + h) - f(a - h)) / (2 * h)

a = 1
m = derivert(f, a)
c = f(a) - m * a
print("m =", round(m, 2), "og c =", round(c, 2))
'''
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode_u4, {})
chk("U1 utskrift", ut.getvalue().strip(), "m = 3.0 og c = -3.0")
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode_u4.replace("x**4 - x", "x**3 - 2*x").replace("a = 1", "a = 2"), {})
chk("U1c utskrift", ut.getvalue().strip(), "m = 10.0 og c = -16.0")
chk("U1c eksakt", tangent_uttrykk(x**3 - 2 * x, 2), 10 * x - 16)
chk("U1 eksakt", tangent_uttrykk(x**4 - x, 1), 3 * x - 3)

# U5 Ola
chk("U5 f(2) = 2 f'(1)", (4 * a + 2 * b) - 2 * (2 * a + b), 0)
sant("U5 ingen løsning", solve([Eq(2 * a + b, 4), Eq(4 * a + 2 * b, 10)], [a, b]) == [], "ingen løsning")
sant("U5 f(2)=8", simplify((4 * a + 2 * b) - 2 * (2 * a + b)) == 0 and solve(Eq(2 * a + b, 4), b) == [4 - 2 * a], "b = 4 - 2a gir uendelig mange")
chk("U5 eksempel a=1,b=2", [(2 * 1 + 2), (4 * 1 + 2 * 2)], [4, 8])
chk("U5 eksempel a=0,b=4", [(2 * 0 + 4), (4 * 0 + 2 * 4)], [4, 8])

# U6 bevis
tA = tangent_uttrykk(x**2, a)
tB = tangent_uttrykk(x**2, -a)
chk("U6 tangent a", tA, 2 * a * x - a**2)
chk("U6 tangent -a", tB, -2 * a * x - a**2)
chk("U6 skjæring x", solve(Eq(tA, tB), x), [0])
chk("U6 skjæring y", tA.subs(x, 0), -a**2)

# U7b antall tangenter gjennom (p, q)
pp, qq = symbols("pp qq")
chk("U7b diskriminant", discriminant(a**2 - 2 * pp * a + qq, a), 4 * (pp**2 - qq))
sant("U7b tilfeller", all(len(solveset(a**2 - 2 * P * a + Q, a, domain=S.Reals)) == ant for P, Q, ant in [(1, -3, 2), (1, 1, 1), (1, 5, 0)]), "2, 1, 0 tangenter")
# U7 tangent gjennom (1, -3)
los("U7 a", Eq(-3, 2 * a - a**2), [-1, 3], var=a)
chk("U7 t1", tangent_uttrykk(x**2, 3), 6 * x - 9)
chk("U7 t2", tangent_uttrykk(x**2, -1), -2 * x - 1)
chk("U7 gjennom 1", [(6 * x - 9).subs(x, 1), (-2 * x - 1).subs(x, 1)], [-3, -3])

rapport()
