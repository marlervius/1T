"""Regner alle svar i 2.4 Ulikheter på nytt. Kjøres av sjekk.py / bygg.py."""
import contextlib
import io

from kontroll import *

g = symbols("g")
ap = Interval.open          # <a, b>
lk = Interval               # [a, b]
Lop = Interval.Lopen        # <a, b]
Rop = Interval.Ropen        # [a, b>


def lsm(u, var=x):
    return solveset(u, var, domain=S.Reals)


def likev(nr, *u):
    """Alle ulikhetene har samme løsningsmengde (steg i en utregning)."""
    f = lsm(u[0])
    sant(nr, all(lsm(v) == f for v in u[1:]), "likeverdige steg")


def dob(lo, mid, hi, lo_s=True, hi_s=False):
    """Løsningsmengden til dobbel ulikhet lo (<|<=) mid (<|<=) hi."""
    a1 = lsm(lo < mid) if lo_s else lsm(lo <= mid)
    a2 = lsm(mid < hi) if hi_s else lsm(mid <= hi)
    return Intersection(a1, a2)


# ======================= Teori, del 1 =======================
# Mustkunne: 2 < 3, gang med -1
sant("Teori 1 speiling", (2 < 3) and (-2 > -3), "2<3 og -2>-3")
# Tabellen «tre måter»
sant("Teori 1 tabell", Interval.open(2, oo) == lsm(x > 2) and Interval(-oo, 3) == lsm(x <= 3)
     and Rop(-1, 4) == dob(-1, x, 4, lo_s=False, hi_s=True), "tabellen")

# Eksempel 1.1: 5 - 3x >= 11
likev("Eks 1.1 steg 1", 5 - 3 * x >= 11, -3 * x >= 6)
likev("Eks 1.1 steg 2", -3 * x >= 6, x <= -2)
ulikhet("Eks 1.1 svar", 5 - 3 * x >= 11, Interval(-oo, -2))
sant("Eks 1.1 kontroll x=-3", 5 - 3 * (-3) >= 11 and 5 - 3 * (-3) == 14, "14 >= 11")
sant("Eks 1.1 kontroll x=0", not (5 - 3 * 0 >= 11), "5 >= 11 er usant")

# Eksempel 1.2: -1 < 2x+3 <= 7
s0 = dob(-1, 2 * x + 3, 7)
sant("Eks 1.2 steg 1", s0 == dob(-4, 2 * x, 4), "trekk fra 3 i alle deler")
sant("Eks 1.2 steg 2", s0 == dob(-2, x, 2), "del på 2")
sant("Eks 1.2 svar", s0 == Lop(-2, 2), "<-2, 2]")

# Vanlige feil, del 1
ulikhet("VF1a rett", -3 * x < 12, Interval.open(-4, oo))
sant("VF1a feil", lsm(-3 * x < 12) != Interval.open(-oo, -4), "x < -4 er feil")
sant("VF1a feil test", not (-3 * (-6) < 12), "x = -6 gir 18 < 12, usant")
sant("VF1b", Interval(4, oo) == lsm(x >= 4) and Interval.open(4, oo) == lsm(x > 4), "[4,->  mot <4,->")
sant("VF1c rett", dob(4, x + 2, 9, True, False) == Lop(2, 7), "trekk fra 2 i alle deler: <2, 7]")
sant("VF1c feil", dob(4, x + 2, 9, True, False) != Lop(4, 9), "bare midten gir feil svar")

# ======================= Del 1, oppgaver =======================
ulikhet("1.1a", x + 5 > 9, ap(4, oo))
ulikhet("1.1b", 3 * x <= 18, Interval(-oo, 6))
ulikhet("1.1c", x / 2 < -3, ap(-oo, -6))
ulikhet("1.1d", x - 7 >= -2, Interval(5, oo))

likev("1.2 steg", 7 - 2 * x < 13, -2 * x < 6, x > -3)
ulikhet("1.2", 7 - 2 * x < 13, ap(-3, oo))

ulikhet("1.3a", -2 * x < 10, ap(-5, oo))
ulikhet("1.3b", -3 * x >= 18, Interval(-oo, -6))
ulikhet("1.3c", 4 - x > 1, ap(-oo, 3))
ulikhet("1.3d", 2 - 5 * x <= 12, Interval(-2, oo))

ulikhet("1.4a", x > 1, ap(1, oo))
ulikhet("1.4b", x <= 2, Interval(-oo, 2))
sant("1.4c", dob(0, x, 5, lo_s=False, hi_s=True) == Rop(0, 5), "[0, 5>")

ulikhet("1.5a", 3 * x - 5 <= 2 * x + 4, Interval(-oo, 9))
ulikhet("1.5b", 2 * (x - 3) > 5 * x + 3, ap(-oo, -3))
ulikhet("1.5c", (x + 2) / 2 >= x / 3, Interval(-6, oo))
ulikhet("1.5d", 6 - 3 * (x + 1) < x - 1, ap(1, oo))

sant("1.6a", dob(-4, 3 * x - 1, 8, lo_s=False, hi_s=True) == Rop(-1, 3), "[-1, 3>")
sant("1.6b", dob(1, 5 - 2 * x, 9, lo_s=True, hi_s=False) == Rop(-2, 2), "[-2, 2>")

# 1.7: hver pil for seg
k0 = 2 * (3 - x) + 4 >= 5 * x - 11
k1 = 6 - 2 * x + 4 >= 5 * x - 11
k2 = 10 - 2 * x >= 5 * x - 11
k3 = -7 * x >= -21
k4 = x >= 3
sant("1.7a", lsm(k0) == lsm(k1), "gange ut parentesen")
sant("1.7b", lsm(k1) == lsm(k2), "6+4=10")
sant("1.7c", lsm(k2) == lsm(k3), "samle x-ledd og tall")
sant("1.7d", lsm(k3) != lsm(k4), "tegnet skulle vært snudd")
ulikhet("1.7e", 2 * (3 - x) + 4 >= 5 * x - 11, Interval(-oo, 3))

# 1.8: mobilabonnement
ulikhet("1.8a", 99 + 15 * g < 249, ap(-oo, 10), var=g)
chk("1.8b", max(i for i in range(0, 40) if 99 + 15 * i < 249), 9)
chk("1.8b lik pris", 99 + 15 * 10, 249)

# 1.9 alltid / noen ganger / aldri
par = [(p, q) for p in range(-5, 6) for q in range(-5, 6) if p < q]
sant("1.9a", all(not (-p < -q) for p, q in par), "-a < -b er aldri sann når a < b")
sant("1.9b", (1 < 2 and 1**2 < 2**2) and (-3 < 2 and not ((-3) ** 2 < 2**2)), "1<2 ok, -3<2 feiler")
ulikhet("1.9c", 2 * x + 1 > 2 * x - 3, S.Reals)

# 1.10 to metoder
ulikhet("1.10a", 4 - 3 * x > 2 * x - 16, ap(-oo, 4))
sant("1.10b", lsm(-5 * x > -20) == ap(-oo, 4), "-5x > -20 gir x < 4")
sant("1.10c", lsm(20 > 5 * x) == ap(-oo, 4), "20 > 5x gir x < 4")

# 1.11 ax > 6
ulikhet("1.11a", 2 * x > 6, ap(3, oo))
ulikhet("1.11b", -2 * x > 6, ap(-oo, -3))
sant("1.11c", not (0 * 5 > 6) and lsm(0 * x > 6) == S.EmptySet, "ingen løsning")
ap_pos = symbols("a_pos", positive=True)
a_neg = symbols("a_neg", negative=True)
sant("1.11d", lsm(ap_pos * x > 6) == ap(6 / ap_pos, oo), "a > 0: x > 6/a")
sant("1.11e", lsm(a_neg * x > 6) == ap(-oo, 6 / a_neg), "a < 0: x < 6/a")

# Sjekk 1
ulikhet("Sjekk 1a", 2 - 4 * x <= 10, Interval(-2, oo))
sant("Sjekk 1b", dob(-2, x, 4, lo_s=False, hi_s=True) == Rop(-2, 4), "[-2, 4>")
aapen("Sjekk 1c", "2 < 3, gang med -1: -2 og -3 speiles om 0, så -2 > -3")

# ======================= Teori, del 2 =======================
chk("Teori 2 faktorisering", expand((x + 1) * (x - 3)), x**2 - 2 * x - 3)
ulikhet("Teori 2", (x + 1) * (x - 3) < 0, ap(-1, 3))
# Eksempel 2.1: x^2 - 2x - 3 < 0
chk("Eks 2.1 steg 1", expand((x + 1) * (x - 3)), x**2 - 2 * x - 3)
likev("Eks 2.1 steg 2", x**2 - 2 * x - 3 < 0, (x + 1) * (x - 3) < 0)
ulikhet("Eks 2.1 svar", x**2 - 2 * x - 3 < 0, ap(-1, 3))
sant("Eks 2.1 kontroll x=0", (0**2 - 2 * 0 - 3 < 0), "-3 < 0")
sant("Eks 2.1 kontroll x=4", not (4**2 - 2 * 4 - 3 < 0), "5 < 0 er usant")
# Eksempel 2.2: 2x^2 >= 8x
likev("Eks 2.2 steg 1", 2 * x**2 >= 8 * x, 2 * x**2 - 8 * x >= 0)
likev("Eks 2.2 steg 2", 2 * x**2 - 8 * x >= 0, 2 * x * (x - 4) >= 0)
chk("Eks 2.2 faktorisering", expand(2 * x * (x - 4)), 2 * x**2 - 8 * x)
ulikhet("Eks 2.2 svar", 2 * x**2 >= 8 * x, Union(Interval(-oo, 0), Interval(4, oo)))
sant("Eks 2.2 feil metode", lsm(2 * x**2 >= 8 * x) != Interval(4, oo) and (2 * (-1) ** 2 >= 8 * (-1)), "x = -1 virker, men x >= 4 inneholder ikke -1")
# Eksempel 2.3: spesialtilfeller
chk("Eks 2.3 D", (-4) ** 2 - 4 * 1 * 5, -4)
chk("Eks 2.3 kvadrat", expand((x - 2) ** 2 + 1), x**2 - 4 * x + 5)
ulikhet("Eks 2.3 svar", x**2 - 4 * x + 5 > 0, S.Reals)
ulikhet("Eks 2.3 tabell >=", (x - 2) ** 2 >= 0, S.Reals)
ulikhet("Eks 2.3 tabell >", (x - 2) ** 2 > 0, Union(ap(-oo, 2), ap(2, oo)))
ulikhet("Eks 2.3 tabell <=", (x - 2) ** 2 <= 0, FiniteSet(2))
ulikhet("Eks 2.3 tabell <", (x - 2) ** 2 < 0, S.EmptySet)

# Vanlige feil, del 2
ulikhet("VF2a rett", x**2 > 4, Union(ap(-oo, -2), ap(2, oo)))
sant("VF2a feil", (-3) ** 2 > 4 and not (-3 > 2), "x = -3 virker, men x > 2 inneholder ikke -3")
ulikhet("VF2a rett <", x**2 < 4, ap(-2, 2))
chk("VF2b x=-2", (-2 + 1) * (-2 - 3), 5)
sant("VF2b", (-2 + 1 < 0) and (-2 - 3 < 0) and not ((-2 + 1) * (-2 - 3) < 0), "begge faktorer negative, produkt positivt")
ulikhet("VF2c rett", x**2 >= 5 * x, Union(Interval(-oo, 0), Interval(5, oo)))
sant("VF2c feil", (-1) ** 2 >= 5 * (-1) and not (-1 >= 5), "x = -1 virker, men x >= 5 inneholder ikke -1")

# ======================= Del 2, oppgaver =======================
chk("2.1 faktorisering", expand((x - 2) * (x - 4)), x**2 - 6 * x + 8)
ulikhet("2.1", x**2 - 6 * x + 8 <= 0, Interval(2, 4))
ulikhet("2.1 faktorisert", (x - 2) * (x - 4) <= 0, Interval(2, 4))

ulikhet("2.2a", (x - 1) * (x + 5) > 0, Union(ap(-oo, -5), ap(1, oo)))
ulikhet("2.2b", (x + 2) * (x - 5) <= 0, Interval(-2, 5))
ulikhet("2.2c", x * (x - 3) < 0, ap(0, 3))

chk("2.3a faktorisering", expand((x + 4) * (x - 2)), x**2 + 2 * x - 8)
ulikhet("2.3a", x**2 + 2 * x - 8 < 0, ap(-4, 2))
chk("2.3b faktorisering", expand((x - 2) * (x - 5)), x**2 - 7 * x + 10)
ulikhet("2.3b", x**2 - 7 * x + 10 >= 0, Union(Interval(-oo, 2), Interval(5, oo)))
ulikhet("2.3c", x**2 <= 9, Interval(-3, 3))

chk("2.4a faktorisering", expand((x - 5) * (x + 2)), x**2 - 3 * x - 10)
ulikhet("2.4a", x**2 > 3 * x + 10, Union(ap(-oo, -2), ap(5, oo)))
chk("2.4b faktorisering", expand((x - 3) * (x - 4)), x**2 - 7 * x + 12)
ulikhet("2.4b", x**2 + 12 <= 7 * x, Interval(3, 4))
chk("2.4c faktorisering", expand(2 * (x - 3) * (x + 2)), 2 * x**2 - 2 * x - 12)
ulikhet("2.4c", 2 * x**2 - 2 * x - 12 < 0, ap(-2, 3))

chk("2.5a D", 2**2 - 4 * 1 * 5, -16)
ulikhet("2.5a", x**2 + 2 * x + 5 > 0, S.Reals)
ulikhet("2.5b", (x + 3) ** 2 <= 0, FiniteSet(-3))
chk("2.5c kvadrat", expand((x - 4) ** 2), x**2 - 8 * x + 16)
ulikhet("2.5c", x**2 - 8 * x + 16 > 0, Union(ap(-oo, 4), ap(4, oo)))
chk("2.5d D", 6**2 - 4 * 1 * 10, -4)
ulikhet("2.5d", x**2 + 6 * x + 10 <= 0, S.EmptySet)

# 2.6: hver pil for seg (feilen ligger i faktoriseringen)
f0 = x**2 - x > 12
f1 = x**2 - x - 12 > 0
f2 = (x - 3) * (x + 4) > 0
f3 = Union(ap(-oo, -4), ap(3, oo))
sant("2.6a", lsm(f0) == lsm(f1), "trekk fra 12")
sant("2.6b", lsm(f1) != lsm(f2) and expand((x - 3) * (x + 4)) == x**2 + x - 12, "feil faktorisering: (x-3)(x+4) = x^2 + x - 12")
sant("2.6c", lsm(f2) == f3, "avlesing av fortegnslinja stemmer for den gale faktoriseringen")
ulikhet("2.6d", x**2 - x > 12, Union(ap(-oo, -3), ap(4, oo)))
chk("2.6e riktig faktorisering", expand((x - 4) * (x + 3)), x**2 - x - 12)

# 2.7 les av parabel med negativ a
chk("2.7a faktorisering", expand(-(x + 2) * (x - 4)), -(x**2) + 2 * x + 8)
los("2.7a nullpunkter", Eq(-(x**2) + 2 * x + 8, 0), [-2, 4])
ulikhet("2.7b", -(x**2) + 2 * x + 8 >= 0, Interval(-2, 4))
ulikhet("2.7b <", -(x**2) + 2 * x + 8 < 0, Union(ap(-oo, -2), ap(4, oo)))
chk("2.7 toppunkt", -(1**2) + 2 * 1 + 8, 9)
ulikhet("2.7c", -(x + 2) * (x - 4) >= 0, Interval(-2, 4))

# 2.7 alltid / noen ganger / aldri
ulikhet("2.8a", x**2 > x, Union(ap(-oo, 0), ap(1, oo)))
ulikhet("2.8b", (x - 3) ** 2 >= 0, S.Reals)
ulikhet("2.8c", x**2 + 1 < 0, S.EmptySet)
ulikhet("2.8d", -(x**2) <= 0, S.Reals)

# 2.8 lag selv (eksempel på godt svar)
chk("2.9a faktorisering", expand((x + 1) * (x - 6)), x**2 - 5 * x - 6)
ulikhet("2.9a", x**2 - 5 * x - 6 <= 0, Interval(-1, 6))
ulikhet("2.9b", (x - 3) ** 2 > 0, Union(ap(-oo, 3), ap(3, oo)))

# 2.9: x^2 + kx + 4 > 0 for alle x
ulikhet("2.10a", k**2 - 16 < 0, ap(-4, 4), var=k)
sant("2.10a alle x", all((lsm(x**2 + kk * x + 4 > 0) == S.Reals) == (-4 < kk < 4) for kk in range(-7, 8)), "x^2 + kx + 4 > 0 for alle x nøyaktig når -4 < k < 4 (heltall -7..7)")
ulikhet("2.10b", x**2 + 3 * x + 4 > 0, S.Reals)
ulikhet("2.10c", x**2 + 4 > 0, S.Reals)
ulikhet("2.10d", x**2 + 4 * x + 4 > 0, Union(ap(-oo, -2), ap(-2, oo)))
ulikhet("2.10e", x**2 + 5 * x + 4 > 0, Union(ap(-oo, -4), ap(-1, oo)))

# Sjekk 2
chk("Sjekk 2a faktorisering", expand((x + 4) * (x - 3)), x**2 + x - 12)
ulikhet("Sjekk 2a", x**2 + x - 12 >= 0, Union(Interval(-oo, -4), Interval(3, oo)))
ulikhet("Sjekk 2b", -((x - 2) ** 2) < 0, Union(ap(-oo, 2), ap(2, oo)))
ulikhet("Sjekk 2c", x**2 >= 7 * x, Union(Interval(-oo, 0), Interval(7, oo)))
sant("Sjekk 2c feil", (-1) ** 2 >= 7 * (-1) and not (-1 >= 7), "x = -1 virker, men x >= 7 inneholder ikke -1")

# ======================= Utfordring =======================
chk("U1 faktorisering", expand(x * (x - 2) * (x + 2)), x**3 - 4 * x)
ulikhet("U1", x**3 - 4 * x >= 0, Union(Interval(-2, 0), Interval(2, oo)))

ulikhet("U2a", 20 * t - 5 * t**2 > 15, ap(1, 3), var=t)
chk("U2b", ap(1, 3).measure, 2)  # varighet i sekunder
chk("U2 høyeste", max(20 * i - 5 * i**2 for i in range(0, 5)), 20)

kode = """x = -10
while x <= 10:
    if x**2 - 2*x - 3 < 0:
        print(x)
    x = x + 0.5
"""
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode, {})
sant("U3a utskrift", ut.getvalue().split() == ["-0.5", "0.0", "0.5", "1.0", "1.5", "2.0", "2.5"], "7 verdier fra -0.5 til 2.5")
kode2 = kode.replace("< 0", "<= 0")
ut2 = io.StringIO()
with contextlib.redirect_stdout(ut2):
    exec(kode2, {})
sant("U3c", ut2.getvalue().split() == ["-1.0", "-0.5", "0.0", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0"], "<= 0 tar med -1.0 og 3.0")
ulikhet("U3b smalt intervall", (x - Rational(6, 5)) * (x - Rational(7, 5)) < 0, ap(Rational(6, 5), Rational(7, 5)))
sant("U3b ingen testverdi", not any(Rational(6, 5) < Rational(i, 2) < Rational(7, 5) for i in range(-20, 21)), "ingen multiplum av 0,5 i <1,2; 1,4>")
ulikhet("U3 løsning", x**2 - 2 * x - 3 < 0, ap(-1, 3))

ulikhet("U4a", x**2 - 1 >= 3, Union(Interval(-oo, -2), Interval(2, oo)))
ulikhet("U4b", x**2 - 1 < 8, ap(-3, 3))
sant("U4c", Intersection(lsm(3 <= x**2 - 1), lsm(x**2 - 1 < 8)) == Union(Lop(-3, -2), Rop(2, 3)), "<-3, -2] og [2, 3>")
sant("U4d kontroll", all((3 <= v**2 - 1 < 8) for v in (Rational(5, 2), -Rational(5, 2), 2, -2)) and not (3 <= 0**2 - 1 < 8), "x = +-2,5 og +-2 virker, x = 0 virker ikke")

ulikhet("U5", (x - 1) / (x + 2) >= 0, Union(ap(-oo, -2), Interval(1, oo)))
sant("U5 x=-2", (-2) + 2 == 0 and (-2) not in lsm((x - 1) / (x + 2) >= 0), "x = -2 gir nevner 0")

ap_, bp_ = symbols("a b", positive=True)
chk("U6a", expand((sqrt(ap_) - sqrt(bp_)) ** 2), ap_ - 2 * sqrt(ap_) * sqrt(bp_) + bp_)
sant("U6b likhet bare a=b", solve(Eq((sqrt(ap_) - sqrt(bp_)) ** 2, 0), ap_) == [bp_], "a = b")
chk("U6c areal", max(s * (10 - s) for s in range(0, 11)), 25)
los("U6c likhet", Eq(x * (10 - x), 25), [5])
ulikhet("U6c ikke større", x * (10 - x) > 25, S.EmptySet)

ulikhet("U7a", 16 - 4 * k >= 0, Interval(-oo, 4), var=k)
ulikhet("U7b", x**2 - 4 * x + 3 <= 0, Interval(1, 3))
ulikhet("U7c", x**2 - 4 * x + 4 <= 0, FiniteSet(2))
ulikhet("U7d", x**2 - 4 * x + 5 <= 0, S.EmptySet)
sant("U7a ulikheten", all((lsm(x**2 - 4 * x + kk <= 0) != S.EmptySet) == (kk <= 4) for kk in range(-6, 9)), "minst én løsning nøyaktig når k <= 4 (heltall -6..8)")
chk("U7e rot-intervall", sorted(solve(Eq(x**2 - 4 * x + k, 0), x), key=lambda e: e.subs(k, 0)), [2 - sqrt(4 - k), 2 + sqrt(4 - k)])
ulikhet("U7f", x**2 - 4 * x - 5 <= 0, Interval(-1, 5))
chk("U7f lengde", Interval(-1, 5).measure, 6)
los("U7f k", Eq(2 * sqrt(4 - k), 6), [-5], var=k)

rapport()
