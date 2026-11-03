"""Regner alle svar i 3.1 Funksjonsbegrepet og lineære funksjoner på nytt med sympy."""
import io
import contextlib
from kontroll import *
from sympy.calculus.util import continuous_domain, function_range

R = S.Reals
f = Function("f")


def dom(uttrykk):
    return continuous_domain(uttrykk, x, R)


def lin(p, q):
    """Stigningstall og konstantledd gjennom to punkt."""
    (x1, y1), (x2, y2) = p, q
    a_ = Rational(y2 - y1, x2 - x1)
    return a_, y1 - a_ * x1


# ======================= DEL 1 =======================
# ---------- Teoriboks: KM5 ----------
chk("Teori 1 f(3)", 2 * 3 + 1, 7)
los("Teori 1 likning", Eq(2 * x + 1, 7), [3])

# ---------- Eksempel 1: f(x) = x^2 - 3x ----------
F = lambda t_: t_**2 - 3 * t_
chk("Eks 1.1 f(-2) steg 1", F(-2), (-2) ** 2 - 3 * (-2))
chk("Eks 1.1 f(-2)", F(-2), 10)
chk("Eks 1.1 f(a)", F(a), a**2 - 3 * a)
chk("Eks 1.1 f(a+1) steg 1", F(a + 1), (a + 1) ** 2 - 3 * (a + 1))
chk("Eks 1.1 f(a+1) steg 2", (a + 1) ** 2 - 3 * (a + 1), a**2 + 2 * a + 1 - 3 * a - 3)
chk("Eks 1.1 f(a+1) steg 3", a**2 + 2 * a + 1 - 3 * a - 3, a**2 - a - 2)
chk("Eks 1.1 f(a)+1", F(a) + 1, a**2 - 3 * a + 1)
chk("Eks 1.1 forskjell", expand(F(a + 1) - (F(a) + 1)), 2 * a - 3)
chk("Eks 1.1 kontroll a=0", [F(0 + 1), F(0) + 1], [-2, 1])

# ---------- Eksempel 2: g(x) = sqrt(x)/(x-4) ----------
g_ = sqrt(x) / (x - 4)
sant("Eks 1.2 def", dom(g_) == Union(Interval.Ropen(0, 4), Interval.open(4, oo)), "[0,4> U <4,->")
chk("Eks 1.2 g(9)", g_.subs(x, 9), Rational(3, 5))
sant("Eks 1.2 g(4) udef", g_.subs(x, 4) in (zoo, nan, oo), "nevner 0")
sant("Eks 1.2 g(-1) udef", not g_.subs(x, -1).is_real, "rot av negativt")

# ---------- Vanlige feil del 1 ----------
q = lambda t_: t_**2
sant("VF 1a", [q(2 + 1), q(2) + 1] == [9, 5], "f(2+1)=9, f(2)+1=5")
sant("VF 1b", simplify(q(2 * x) - 2 * q(x)) != 0 and simplify(q(2 * x) - 4 * x**2) == 0, "f(2x)=4x^2")
sant("VF 1c", function_range(x**2, x, R) == Interval(0, oo), "V = [0,->")
los("VF 1d", Eq(0 + y**2, 1), [-1, 1], var=y)

# ---------- Nivå 1 ----------
h1 = lambda t_: 3 * t_ - 5
chk("1.1a", h1(0), -5)
chk("1.1b", h1(4), 7)
chk("1.1c", h1(-2), -11)

tab = {-2: 3, -1: 0, 0: -1, 1: 0, 2: 3}
sant("1.2 tabell er x^2-1", all(x**2 - 1 == x**2 - 1 and (xx**2 - 1) == yy for xx, yy in tab.items()), "tabellen")
chk("1.2a", tab[2], 3)
chk("1.2b", [xx for xx, yy in tab.items() if yy == 0], [-1, 1])
los("1.2b likning", Eq(x**2 - 1, 0), [-1, 1])
chk("1.2c", sorted(set(tab.values())), [-1, 0, 3])

sant("1.3a", dom(1 / (x + 5)) == Union(Interval.open(-oo, -5), Interval.open(-5, oo)), "x != -5")
sant("1.3b", dom(sqrt(x - 1)) == Interval(1, oo), "[1,->")
sant("1.3c", dom(3 * x**2 - 2) == R, "alle")

# ---------- Nivå 2 ----------
k4 = lambda t_: 2 * t_**2 - t_
chk("1.4a", k4(-1), 3)
chk("1.4b", k4(2 * a), 8 * a**2 - 2 * a)
chk("1.4c", k4(a + 2), 2 * a**2 + 7 * a + 6)
chk("1.4c steg", 2 * (a + 2) ** 2 - (a + 2), 2 * a**2 + 8 * a + 8 - a - 2)
chk("1.4d", expand(k4(2 * a) - 2 * k4(a)), 4 * a**2)
los("1.4d likhet", Eq(k4(2 * a), 2 * k4(a)), [0], var=a)

sant("1.5a", dom(sqrt(6 - 2 * x)) == Interval(-oo, 3), "<-,3]")
sant("1.5b", dom(x / (x**2 - 9)) == Union(Interval.open(-oo, -3), Interval.open(-3, 3), Interval.open(3, oo)), "x != +-3")
sant("1.5c", dom(1 / sqrt(x + 1)) == Interval.open(-1, oo), "<-1,->")

# 1.6: f(x) = x^2 - 4x, finn f(a-1)
f6 = lambda t_: t_**2 - 4 * t_
sant("1.6p1", f6(a - 1) == (a - 1) ** 2 - 4 * (a - 1), "innsetting")
sant("1.6p2", simplify((a - 1) ** 2 - 4 * (a - 1) - (a**2 - 1 - 4 * a + 4)) != 0, "feil: (a-1)^2 != a^2-1")
sant("1.6p3", expand(a**2 - 1 - 4 * a + 4) == a**2 - 4 * a + 3, "samling")
chk("1.6r", f6(a - 1), a**2 - 6 * a + 5)
chk("1.6s", expand((a - 1) ** 2 - 4 * (a - 1)), a**2 - 2 * a + 1 - 4 * a + 4)

h7 = lambda t_: 5 - 2 * t_
chk("1.7a", h7(4), -3)
los("1.7b", Eq(5 - 2 * x, 9), [-2])
aapen("1.7c", "h(4) gir en verdi; h(x)=9 spør hvilken x som gir 9")
chk("1.7d", h7(-2), 9)

# ---------- Nivå 3 ----------
aapen("1.8a", "elev -> fødselsdato: funksjon, hver elev har én")
aapen("1.8b", "fødselsdato -> elev: ikke funksjon, flere kan ha samme dato")
sant("1.8c", len({x_**2 for x_ in [3]}) == 1, "x -> x^2: én verdi per x")
los("1.8d", Eq(y**2, 4), [-2, 2], var=y)

sant("1.9 f=2x", function_range(2 * x, x, Interval(1, 5)) == Interval(2, 10), "D=[1,5], V=[2,10]")
sant("1.9b f=-2x+12", function_range(-2 * x + 12, x, Interval(1, 5)) == Interval(2, 10), "synkende, samme V")
sant("1.9c", (-2 * 1 + 12, -2 * 5 + 12) == (10, 2), "f(1)=10, f(5)=2")

sant("1.10", dom(sqrt(x - 3) / (x - 7)) == Union(Interval.Ropen(3, 7), Interval.open(7, oo)), "a=3, b=7")
sant("1.10 entydig", all(dom(sqrt(x - aa) / (x - bb)) != dom(sqrt(x - 3) / (x - 7)) for aa in range(0, 9) for bb in range(0, 9) if (aa, bb) != (3, 7)), "bare (3,7)")

# ---------- Sjekk 1 ----------
chk("Sjekk 1a", 4 - (-3), 7)
sant("Sjekk 1b", dom(sqrt(x - 6)) == Interval(6, oo), "[6,->")
aapen("Sjekk 1c", "sirkel: x=0 gir to y-verdier")

# ======================= DEL 2 =======================
# ---------- Teoriboks ----------
chk("Teori 2 f(x+1)-f(x)", expand((a * (x + 1) + b) - (a * x + b)), a)
chk("Teori 2 trekant 1", Rational(2 - 1, 2 - 0), Rational(1, 2))
chk("Teori 2 trekant 2", Rational(4 - 2, 6 - 2), Rational(1, 2))
chk("Teori 2 figur", [Rational(1, 2) * xx + 1 for xx in (0, 2, 6)], [1, 2, 4])

# ---------- Eksempel 1: gjennom (-1,5) og (3,-3) ----------
a_e, b_e = lin((-1, 5), (3, -3))
chk("Eks 2.1 a", a_e, -2)
chk("Eks 2.1 a steg", Rational(-3 - 5, 3 - (-1)), Rational(-8, 4))
chk("Eks 2.1 b", b_e, 3)
chk("Eks 2.1 b steg", 5, -2 * (-1) + b_e)
chk("Eks 2.1 kontroll 1", -2 * (-1) + 3, 5)
chk("Eks 2.1 kontroll 2", -2 * 3 + 3, -3)

# ---------- Eksempel 2: treningssenter ----------
fs = lambda t_: 290 * t_ + 400
chk("Eks 2.2 f(6)", fs(6), 2140)
chk("Eks 2.2 f(0)", fs(0), 400)
chk("Eks 2.2 f(12)", fs(12), 3880)

# ---------- Vanlige feil del 2 ----------
chk("VF 2a", [Rational(6 - 2, 1 - 3), Rational(6 - 2, 3 - 1)], [-2, 2])
chk("VF 2b", [Rational(3 - 1, 6 - 2), Rational(6 - 2, 3 - 1)], [Rational(1, 2), 2])
chk("VF 2c", expand((3 * (x + 1) + 2) - (3 * x + 2)), 3)
aapen("VF 2d", "b er verdien ved x = 0, som ikke alltid er med i situasjonen")

# ---------- Nivå 1 ----------
chk("2.1a", lin((1, 3), (3, 9))[0], 3)
chk("2.1b", lin((-2, 4), (2, 0))[0], -1)
chk("2.1c", lin((0, 5), (4, 5))[0], 0)

chk("2.2a", Poly(4 * x - 7, x).all_coeffs(), [4, -7])
chk("2.2b", Poly(-x / 2 + 3, x).all_coeffs(), [Rational(-1, 2), 3])
chk("2.2c", Poly(5 * x, x).all_coeffs(), [5, 0])
chk("2.2d", Poly(6 - 3 * x, x).all_coeffs(), [-3, 6])
sant("2.2 proporsjonal", [Poly(e, x).all_coeffs()[-1] == 0 for e in (4 * x - 7, -x / 2 + 3, 5 * x, 6 - 3 * x)] == [False, False, True, False], "bare c")

a3, b3 = lin((2, 5), (4, 11))
chk("2.3a", a3, 3)
chk("2.3a steg", Rational(11 - 5, 4 - 2), 3)
chk("2.3b", b3, -1)
chk("2.3b steg", 5, 3 * 2 + b3)
chk("2.3c kontroll", 3 * 4 - 1, 11)

# ---------- Nivå 2 ----------
for nr, p1, p2, fa, fb in [("a", (-2, 9), (1, -3), -4, 1), ("b", (-2, -4), (2, 2), Rational(3, 2), -1), ("c", (4, 1), (10, -2), Rational(-1, 2), 3)]:
    aa_, bb_ = lin(p1, p2)
    chk(f"2.4{nr}", [aa_, bb_], [fa, fb])
    chk(f"2.4{nr} kontroll", [fa * p1[0] + fb, fa * p2[0] + fb], [p1[1], p2[1]])

tank = lambda t_: -6 * t_ + 240
a5, b5 = lin((4, 216), (10, 180))
chk("2.5a", [a5, b5], [-6, 240])
chk("2.5a steg", Rational(180 - 216, 10 - 4), -6)
chk("2.5a kontroll", [tank(4), tank(10)], [216, 180])
aapen("2.5b", "a = -6 liter per minutt, b = 240 liter ved start")
los("2.5c", Eq(tank(x), 90), [25])
los("2.5d tom", Eq(tank(x), 0), [40])
chk("2.5d", [tank(0), tank(40)], [240, 0])
sant("2.5d V", function_range(tank(x), x, Interval(0, 40)) == Interval(0, 240), "V=[0,240]")

# 2.6: gjennom (-2, 8) og (2, -4); feilen kommer i b
a6, b6 = lin((-2, 8), (2, -4))
sant("2.6p1", Rational(-4 - 8, 2 - (-2)) == Rational(-12, 4), "innsetting")
sant("2.6p2", Rational(-12, 4) == -3, "a = -3")
sant("2.6p3", (-3) * (-2) == 6 and 8 == 6 + b6, "feil: -3 * (-2) = 6, ikke -6")
sant("2.6p4", 8 == -6 + 14, "fra feil likning følger b = 14")
chk("2.6r", [a6, b6], [-3, 2])
chk("2.6k", [-3 * (-2) + 2, -3 * 2 + 2], [8, -4])

# ---------- Nivå 3 ----------
chk("2.7a", expand((a * (x + 1) + b) - (a * x + b)), a)
chk("2.7b", expand((a * 2 * x + b) - 2 * (a * x + b)), -b)
chk("2.7c a<>0", solve(a * x + b, x), [-b / a])
sant("2.7c a=0,b=3", solveset(0 * x + 3, x, R) == S.EmptySet, "ingen")
sant("2.7c a=0,b=0", solveset(0 * x + 0, x, R) == R, "alle")

P = lambda t_: 60000 * t_ - 400000
chk("2.8a", expand(P(x + 1) - P(x)), 60000)
chk("2.8b", P(0), -400000)
chk("2.8c", [P(30), P(120)], [1400000, 6800000])
sant("2.8c V", function_range(P(x), x, Interval(30, 120)) == Interval(1400000, 6800000), "V")

a9, b9 = lin((0, -1), (3, 5))
chk("2.9a a", a9, 2)
chk("2.9a k", a9 * 7 + b9, 13)
chk("2.9a k via AC", Rational(13 - (-1), 7 - 0), 2)
aapen("2.9b", "alle punkt på samme linje har samme a")

# ---------- Sjekk 2 ----------
chk("Sjekk 2a", lin((2, 1), (6, 9))[0], 2)
chk("Sjekk 2b", Poly(7 - 3 * x, x).all_coeffs()[-1], 7)
aapen("Sjekk 2c", "f(0) = a*0 = 0")

# ======================= UTFORDRING =======================
def park(t_):
    return 20 * t_ if t_ <= 2 else 35 * t_ - 30


chk("U1a", [20 * 2, 35 * 2 - 30], [40, 40])
chk("U1a steg", 40 + 35 * (x - 2), 35 * x - 30)
chk("U1c", park(5), 145)
chk("U1c steg", 2 * 20 + 3 * 35 , 145)
aapen("U1b", "skisse av graf med knekk i x = 2")

N = lambda t_: 65 + 19 * t_
B = lambda t_: 100 + 14 * t_
chk("U2a", [N(x), B(x)], [19 * x + 65, 14 * x + 100])
chk("U2b", [N(4), B(4), N(10), B(10)], [141, 156, 255, 240])
los("U2c", Eq(N(x), B(x)), [7])
sant("U2c vurdering", N(3) < B(3) and N(7) == B(7) and N(8) > B(8), "Nordtaxi billigst under 7 km")

kode = '''from fractions import Fraction

def sjekk(x, y):
    a = Fraction(y[1] - y[0], x[1] - x[0])
    for i in range(1, len(x) - 1):
        if Fraction(y[i + 1] - y[i], x[i + 1] - x[i]) != a:
            print("Nei")
            return
    b = y[0] - a * x[0]
    print("Ja: a =", a, "og b =", b)

sjekk([0, 1, 3, 4], [2, 5, 11, 14])
sjekk([0, 1, 2, 3], [1, 2, 4, 8])
'''
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode, {})
sant("U3b", ut.getvalue().strip().split("\n") == ["Ja: a = 3 og b = 2", "Nei"], ut.getvalue())
sant("U3c", (0.3 - 0.2) != 0.1 and 0.3 - 0.2 == 0.09999999999999998, "0,3 - 0,2 er ikke 0,1 i flyttall")
sant("U3d", ((0.3 - 0.2) / (0.3 - 0.2)) == 1.0 and (0.3 - 0.2) / 0.1 != 1.0, "ulike stigningstall")

s1 = Rational(8 - 2, 3 - 1)
s2 = Rational(-7 - 2, -2 - 1)
chk("U4a", [s1, s2], [3, 3])
a4, b4 = lin((1, 2), (3, 8))
chk("U4b", [a4, b4], [3, -1])
chk("U4b kontroll", 3 * (-2) - 1, -7)
aapen("U4c", "(y2-y1)/(x2-x1) = (y3-y1)/(x3-x1)")

aapen("U5a", "x1 = x2 gir nevner 0")
aapen("U5b", "en loddrett linje gir to verdier for samme x")

sant("U6a", dom(sqrt(x**2 - 7 * x + 10)) == Union(Interval(-oo, 2), Interval(5, oo)), "<-,2] U [5,->")
sant("U6a faktor", expand((x - 2) * (x - 5)) == x**2 - 7 * x + 10, "faktorisering")
sant("U6b", dom(1 / ((x + 1) * (x - 6))) == Union(Interval.open(-oo, -1), Interval.open(-1, 6), Interval.open(6, oo)), "alle unntatt -1 og 6")

rapport()
