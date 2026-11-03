"""Regner alle svar i 3.2 Andregradsfunksjoner på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *

R = Rational


def sym(f):
    p = Poly(f, x)
    a_, b_ = p.coeff_monomial(x**2), p.coeff_monomial(x)
    return -R(1, 2) * b_ / a_


def ekstrem(f):
    p = sym(f)
    return (p, f.subs(x, p))


def nullp(f):
    return sorted(solveset(Eq(f, 0), x, domain=S.Reals))


# ---------- Eksempler del 1 ----------
f1 = x**2 - 2*x - 3
los("Eks 1.1 nullpunkt", Eq(f1, 0), [-1, 3])
chk("Eks 1.1 symmetrilinje", (-1 + 3) / 2, sym(f1))
chk("Eks 1.1 symmetrilinje abc", -R(-2, 2*1), 1)
chk("Eks 1.1 bunnpunkt", ekstrem(f1), (1, -4))
chk("Eks 1.1 y", f1.subs(x, 0), -3)
g1 = -x**2 + 4*x - 5
chk("Eks 1.2 D", 4**2 - 4*(-1)*(-5), -4)
chk("Eks 1.2 symmetrilinje", sym(g1), 2)
chk("Eks 1.2 toppunkt", ekstrem(g1), (2, -1))
chk("Eks 1.2 steg", -(2**2) + 4*2 - 5, -1)
chk("Eks 1.2 y", g1.subs(x, 0), -5)
# teoriboksen
h0 = x**2 + 4*x + 3
los("Teori nullpunkt", Eq(h0, 0), [-3, -1])
chk("Teori sym", ekstrem(h0), (-2, -1))
chk("Teori y", h0.subs(x, 0), 3)
chk("Teori gjennomsnitt", R(1, 2) * (-R(4, 1)), -2)

# vanlige feil del 1
chk("VF 1a", sym(x**2 + 6*x), -3)
sant("VF 1a feil", sym(x**2 + 6*x) != R(6, 2), "b/(2a) = 3 er feil")
chk("VF 1b", ekstrem(x**2 - 4*x + 7), (2, 3))
sant("VF 1b c", x**2 - 4*x + 7 != 0 and (x**2 - 4*x + 7).subs(x, 2) != 7, "bunnpunktets y er ikke c")
sant("VF 1c", Poly(x**2 + 6*x, x).coeff_monomial(x**2) > 0, "a > 0 gir bunnpunkt")

# ---------- Del 1 oppgaver ----------
sant("1.1a opp", Poly(x**2 - 5*x + 4, x).coeff_monomial(x**2) > 0, "a>0")
chk("1.1a y", (x**2 - 5*x + 4).subs(x, 0), 4)
sant("1.1b ned", Poly(-2*x**2 + 3*x + 7, x).coeff_monomial(x**2) < 0, "a<0")
chk("1.1b y", (-2*x**2 + 3*x + 7).subs(x, 0), 7)
sant("1.1c ned", Poly(3 - x**2, x).coeff_monomial(x**2) < 0, "a<0")
chk("1.1c y", (3 - x**2).subs(x, 0), 3)

chk("1.2a", sym(x**2 - 8*x + 3), 4)
chk("1.2b", sym(2*x**2 + 6*x - 1), R(-3, 2))
chk("1.2c", sym(-x**2 + 10*x), 5)

f13 = x**2 - 4*x - 5
los("1.3a", Eq(f13, 0), [-1, 5])
chk("1.3b", R(-1 + 5, 2), 2)
chk("1.3c", f13.subs(x, 2), -9)
chk("1.3c sym", ekstrem(f13), (2, -9))

f14a, f14b, f14c = x**2 + 2*x - 15, -x**2 + 6*x - 8, 2*x**2 - 4*x + 5
los("1.4a null", Eq(f14a, 0), [-5, 3])
chk("1.4a", ekstrem(f14a), (-1, -16))
los("1.4b null", Eq(f14b, 0), [2, 4])
chk("1.4b", ekstrem(f14b), (3, 1))
chk("1.4c D", 16 - 4*2*5, -24)
los("1.4c null", Eq(f14c, 0), [])
chk("1.4c", ekstrem(f14c), (1, 3))

f15 = 3*x**2 + 12*x + 5
chk("1.5 pil 1", R(-12, 2*3), -2)
sant("1.5 pil 2", 3*(-2)**2 != -12, "3*(-2)^2 = 12, ikke -12")
chk("1.5 riktig", f15.subs(x, -2), -7)
chk("1.5 bunnpunkt", ekstrem(f15), (-2, -7))
chk("1.5 steg", 12 - 24 + 5, -7)
chk("1.5 pil 3", -12 - 24 + 5, -31)
sant("1.5 toppunkt-feil", Poly(f15, x).coeff_monomial(x**2) > 0, "a>0 gir bunnpunkt, ikke toppunkt")

c_ = symbols("c")
for cv, antall in ((-1, 2), (4, 1), (7, 0)):
    chk(f"1.6a c={cv} bunnpunkt", ekstrem(x**2 - 4*x + cv), (2, cv - 4))
    chk(f"1.6a c={cv} nullpunkt", len(nullp(x**2 - 4*x + cv)), antall)
chk("1.6b", sym(x**2 - 4*x + c_), 2)
chk("1.6b bunn", (x**2 - 4*x + c_).subs(x, 2), c_ - 4)
chk("1.6c", solve(Eq(c_ - 4, 0), c_), [4])
los("1.6c los", Eq(16 - 4*c_, 0), [4], var=c_)

# 1.7 graf
f17 = -(x - 1)*(x - 5)
chk("1.7a", nullp(f17), [1, 5])
chk("1.7b", sym(expand(f17)), 3)
chk("1.7c", ekstrem(expand(f17)), (3, 4))
chk("1.7c y", f17.subs(x, 0), -5)
chk("1.7d", expand(f17), -x**2 + 6*x - 5)
chk("1.7d a", solve(Eq(a*(0 - 1)*(0 - 5), -5), a), [-1])

# 1.8 alltid/noen/aldri
los("1.8a", Eq(x**2 + 1, 0), [])
chk("1.8a motpart", nullp(x**2 - 1), [-1, 1])
D_ = b**2 - 4*a*c
chk("1.8b bevis", simplify(D_.subs(c, -a*k**2) - (b**2 + 4*a**2*k**2)), 0)
sant("1.8b ac<0", all((bv**2 - 4*av*cv) > 0 for av in (-3, -1, 2, 5) for cv in (-4, -1, 3) for bv in (-2, 0, 3) if av*cv < 0), "ac<0 gir D>0")
sant("1.8b a>0 c<0", ((x**2 - 5).subs(x, 0) < 0), "f(0)=c<0 og a>0")
chk("1.8c ja", len(nullp(x**2 + 1)), 0)
chk("1.8c nei", nullp(x**2 - 4*x + 3), [1, 3])
sant("1.8c a og c", 1 > 0 and 3 > 0, "a>0 og c>0 i motpart")

# 1.9 baklengs
f19 = x**2 + 2*x - 8
chk("1.9a sym", sym(f19), -1)
chk("1.9a andre", R(1, 1)*(-1)*2 - 2, -4)
chk("1.9b b", -2*(-1), 2)
chk("1.9b null", f19.subs(x, 2), 0)
los("1.9b alle", Eq(f19, 0), [-4, 2])
sant("1.9b bunn", Poly(f19, x).coeff_monomial(x**2) > 0, "a>0 bunnpunkt")

chk("Sjekk 1a", sym(x**2 - 10*x + 7), 5)
sant("Sjekk 1b ned", Poly(4 - x**2, x).coeff_monomial(x**2) < 0, "a<0")
chk("Sjekk 1b y", (4 - x**2).subs(x, 0), 4)
aapen("Sjekk 1c", "Midt mellom nullpunktene: (x1+x2)/2 = -b/(2a)")

# ---------- Eksempler del 2 ----------
chk("Eks 2.1 steg 1", x**2 - 6*x + 5, x**2 - 6*x + 9 - 9 + 5)
chk("Eks 2.1 steg 2", x**2 - 6*x + 9 - 9 + 5, (x - 3)**2 - 4)
chk("Eks 2.1 kontroll", expand((x - 3)**2 - 4), x**2 - 6*x + 5)
chk("Eks 2.1 bunnpunkt", ekstrem(x**2 - 6*x + 5), (3, -4))
chk("Eks 2.2 steg 1", 2*x**2 + 8*x + 3, 2*(x**2 + 4*x) + 3)
chk("Eks 2.2 steg 2", 2*(x**2 + 4*x) + 3, 2*((x + 2)**2 - 4) + 3)
chk("Eks 2.2 steg 3", 2*((x + 2)**2 - 4) + 3, 2*(x + 2)**2 - 8 + 3)
chk("Eks 2.2 steg 4", 2*(x + 2)**2 - 8 + 3, 2*(x + 2)**2 - 5)
chk("Eks 2.2 kontroll", expand(2*(x + 2)**2 - 5), 2*x**2 + 8*x + 3)
chk("Eks 2.2 bunnpunkt", ekstrem(2*x**2 + 8*x + 3), (-2, -5))
# VF del 2
chk("VF 2a", ekstrem(2*(x + 3)**2 - 1), (-3, -1))
sant("VF 2a feil", 2*(3 + 3)**2 - 1 != -1, "(3,-1) er ikke bunnpunktet")
chk("VF 2b", [(2*(x + 3)**2 - 1).subs(x, -3), (2*(x + 3)**2 - 1).subs(x, -2)], [-1, 1])
sant("VF 2c", expand(2*(x + 2)**2 - 4 + 3) != 2*x**2 + 8*x + 3, "glemt faktor 2")
chk("VF 2c riktig", expand(2*(x + 2)**2 - 5), 2*x**2 + 8*x + 3)

# ---------- Del 2 oppgaver ----------
chk("2.1a", expand((x + 1)**2 + 4), x**2 + 2*x + 5)
chk("2.1b", expand((x - 5)**2 + 5), x**2 - 10*x + 30)
chk("2.1c", expand((x - 4)**2 - 7), x**2 - 8*x + 9)

chk("2.2a", ekstrem((x - 2)**2 + 7), (2, 7))
chk("2.2b", ekstrem(-(x + 1)**2 + 4), (-1, 4))
chk("2.2c", ekstrem(3*(x + 4)**2 - 2), (-4, -2))
sant("2.2 V", minimum((x - 2)**2 + 7, x, S.Reals) == 7 and maximum(-(x + 1)**2 + 4, x, S.Reals) == 4
     and minimum(3*(x + 4)**2 - 2, x, S.Reals) == -2, "verdimengder")

chk("2.3a", expand((x + 8)**2 - 4), x**2 + 16*x + 60)
chk("2.3 steg", x**2 + 16*x + 60, x**2 + 16*x + 64 - 64 + 60)

chk("2.4a", expand(2*(x + 3)**2 - 11), 2*x**2 + 12*x + 7)
chk("2.4b", expand(3*(x - 1)**2 + 2), 3*x**2 - 6*x + 5)
chk("2.4c", expand(-(x - 2)**2 + 5), -x**2 + 4*x + 1)
chk("2.4a eks", ekstrem(2*x**2 + 12*x + 7), (-3, -11))
chk("2.4b eks", ekstrem(3*x**2 - 6*x + 5), (1, 2))
chk("2.4c eks", ekstrem(-x**2 + 4*x + 1), (2, 5))

f25 = 2*x**2 - 12*x + 5
chk("2.5 pil 1", f25, 2*(x**2 - 6*x) + 5)
chk("2.5 pil 2", 2*(x**2 - 6*x) + 5, 2*((x - 3)**2 - 9) + 5)
sant("2.5 pil 3", 2*((x - 3)**2 - 9) + 5 != 2*(x - 3)**2 - 9 + 5, "faktoren 2 ganges ikke med -9")
chk("2.5 pil 4", 2*(x - 3)**2 - 9 + 5, 2*(x - 3)**2 - 4)
chk("2.5 riktig", expand(2*(x - 3)**2 - 13), f25)
chk("2.5 bunnpunkt", ekstrem(f25), (3, -13))

h26 = -5*x**2 + 10*x + 2
chk("2.6a", expand(-5*(x - 1)**2 + 7), h26)
chk("2.6b", ekstrem(h26), (1, 7))
chk("2.6c", h26.subs(x, 0), 2)

f27 = 2*x**2 - 8*x + 5
chk("2.7a", expand(2*(x - 2)**2 - 3), f27)
chk("2.7a a", solve(Eq(a*(0 - 2)**2 - 3, 5), a), [2])
chk("2.7a punkt", f27.subs(x, 0), 5)
chk("2.7b", len(nullp(f27)), 2)
chk("2.7b D", 64 - 4*2*5, 24)

A28 = x*(40 - 2*x)
chk("2.8a", expand(A28), -2*x**2 + 40*x)
chk("2.8b", expand(-2*(x - 10)**2 + 200), -2*x**2 + 40*x)
chk("2.8b topp", ekstrem(-2*x**2 + 40*x), (10, 200))
chk("2.8b mål", [10, 40 - 2*10], [10, 20])
chk("2.8c", A28.subs(x, 25), -250)

los("2.9a", Eq(-3*(x - 1)**2 - 2, 0), [])
chk("2.9a topp", maximum(-3*(x - 1)**2 - 2, x, S.Reals), -2)
los("2.9b nei", Eq(2*(x - 1)**2 + 3, 0), [])
los("2.9b ja", Eq(-2*(x - 1)**2 + 3, 0), [1 - sqrt(R(3, 2)), 1 + sqrt(R(3, 2))])
chk("2.9c a", ekstrem(x**2 - 4*x + 1), (2, -3))
chk("2.9c b", ekstrem(2*x**2 - 8*x + 5), (2, -3))
sant("2.9c ulike", x**2 - 4*x + 1 != 2*x**2 - 8*x + 5, "samme topp, ulik a")

chk("Sjekk 2a", expand((x - 6)**2 + 4), x**2 - 12*x + 40)
chk("Sjekk 2b", ekstrem(2*(x + 1)**2 - 6), (-1, -6))
chk("Sjekk 2b V", minimum(2*(x + 1)**2 - 6, x, S.Reals), -6)
aapen("Sjekk 2c", "(x-p)^2 >= 0, så a(x-p)^2 >= 0 for a > 0")

# ---------- Utfordring ----------
fu1 = 2*(x + 1)*(x - 5)
chk("U1 uttrykk", expand(fu1), 2*x**2 - 8*x - 10)
chk("U1 punkt", fu1.subs(x, 0), -10)
chk("U1 topp", ekstrem(expand(fu1)), (2, -18))
chk("U1 toppform", expand(2*(x - 2)**2 - 18), expand(fu1))

p_ = symbols("p")
I = p_*(400 - 20*p_)
chk("U2a", expand(I), -20*p_**2 + 400*p_)
chk("U2a toppform", expand(-20*(p_ - 10)**2 + 2000), expand(I))
chk("U2a topp", I.subs(p_, 10), 2000)
chk("U2b salg", 400 - 20*20, 0)
chk("U2b p=25", I.subs(p_, 25), -2500)

kode = """
def f(x):
    return x**2 - 4*x + 1

minst = f(-5)
for i in range(-50, 51):
    x = i / 10
    if f(x) < minst:
        minst = f(x)
print(round(minst, 4))
"""
import io, contextlib
def kjor(kode):
    ut = io.StringIO()
    with contextlib.redirect_stdout(ut):
        exec(kode, {})
    return ut.getvalue().strip()
chk("U3a", kjor(kode), "-3.0")
chk("U3b", kjor(kode.replace("x**2 - 4*x + 1", "x**2 - 0.15*x")), "-0.005")
chk("U3b eksakt", ekstrem(x**2 - R(15, 100)*x), (R(3, 40), R(-9, 1600)))
sant("U3b avvik", R(-9, 1600) < R(-1, 200), "eksakt minimum er lavere enn rutenettets")

for cv in (-1, 1, 2):
    D = 4 - 4*cv
    chk(f"U4 c={cv}", len(nullp(x**2 - 2*x + cv)), 2 if D > 0 else (1 if D == 0 else 0))
chk("U4 topp", ekstrem(x**2 - 2*x + c_)[1], c_ - 1)
chk("U4 toppform", expand((x - 1)**2 + c_ - 1), x**2 - 2*x + c_)

chk("U5 identitet", simplify(a*(x + b/(2*a))**2 + c - b**2/(4*a) - (a*x**2 + b*x + c)), 0)
chk("U5 q", simplify((c - b**2/(4*a)) - (-(b**2 - 4*a*c)/(4*a))), 0)
chk("U5 q mot f", simplify((a*x**2 + b*x + c).subs(x, -b/(2*a)) - (c - b**2/(4*a))), 0)
aapen("U5 forklaring", "q = -D/(4a): D<0 og a>0 gir q>0, ingen nullpunkt")

for bv, pt in [(-4, (2, -4)), (-2, (1, -1)), (0, (0, 0)), (2, (-1, -1)), (4, (-2, -4))]:
    chk(f"U6 b={bv}", ekstrem(x**2 + bv*x), pt)
chk("U6 bevis", -(b/2)**2, -(-b/2)**2)
chk("U6 kurve", [ekstrem(x**2 + b*x)[0], ekstrem(x**2 + b*x)[1]], [-b/2, -b**2/4])

rapport()
