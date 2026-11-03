"""Regner alle svar i 3.3 Polynomfunksjoner på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *

R = Rational


def dv(p, d):
    """Polynomdivisjon: (kvotient, rest)."""
    q, r = div(Poly(p, x), Poly(d, x))
    return q.as_expr(), r.as_expr()


def divchk(nr, p, d, kvotient, rest=0):
    q, r = dv(p, d)
    chk(nr + " kvotient", q, kvotient)
    chk(nr + " rest", r, rest)
    chk(nr + " kontroll", expand(d * kvotient + rest), expand(p))


def nullp(f):
    return sorted(solveset(Eq(f, 0), x, domain=S.Reals))


# ---------- Eksempler del 1 ----------
chk("Eks 1.0 tall", 12 * 13 + 1, 157)
chk("Eks 1.0 poly", expand((x + 2) * (x + 3) + 1), x**2 + 5*x + 7)
divchk("Eks 1.0", x**2 + 5*x + 7, x + 2, x + 3, 1)
divchk("Eks 1.1", x**3 - 2*x**2 - 5*x + 6, x - 1, x**2 - x - 6)
chk("Eks 1.1 kontroll", expand((x - 1) * (x**2 - x - 6)), x**3 - 2*x**2 - 5*x + 6)
P = x**3 - 7*x + 6
chk("Eks 1.2 P(1)", P.subs(x, 1), 0)
chk("Eks 1.2 P(2)", P.subs(x, 2), 0)
chk("Eks 1.2 P(-1)", P.subs(x, -1), 12)
divchk("Eks 1.2", x**3 + 0*x**2 - 7*x + 6, x - 1, x**2 + x - 6)
chk("Eks 1.2 faktor", expand((x - 2) * (x + 3)), x**2 + x - 6)
chk("Eks 1.2 svar", expand((x - 1) * (x - 2) * (x + 3)), P)
# faktorsetningen i boksen: P(x) = (x-a)Q(x) + r  =>  P(a) = r
Q0 = dv(x**3 - 3*x**2 + 5, x - 2)
chk("Faktorsetning r = P(2)", Q0[1], (x**3 - 3*x**2 + 5).subs(x, 2))

# ---------- Vanlige feil del 1 ----------
PV = x**3 - 2*x**2 - x + 2
chk("VF 1a P(2)", PV.subs(x, 2), 0)
chk("VF 1a P(-2)", PV.subs(x, -2), -12)
chk("VF 1a faktor", factor(PV), (x - 1) * (x + 1) * (x - 2))
# VF 1b: x^3 - 7x + 6 uten 0x^2 gir feil kvotient (viser at leddet må med)
sant("VF 1b", dv(x**3 - 7*x + 6, x - 1)[1] == 0, "divisjon går opp når 0x^2 er med")
# VF 1c: subtraksjon: (x^2 + 3x) - (x^2 - x) = 4x, ikke 2x
chk("VF 1c", expand((x**2 + 3*x) - (x**2 - x)), 4*x)

# ---------- Del 1 ----------
divchk("1.1a", x**2 + 7*x + 10, x + 2, x + 5)
divchk("1.1b", x**2 - x - 12, x - 4, x + 3)
divchk("1.1c", 2*x**2 + 5*x + 3, x + 1, 2*x + 3)

# 1.2 fullfør: (x^3 + 2x^2 - 5x - 6) : (x - 2)
divchk("1.2", x**3 + 2*x**2 - 5*x - 6, x - 2, x**2 + 4*x + 3)

P13 = x**3 - 4*x**2 + x + 6
chk("1.3a", P13.subs(x, 3), 0)
chk("1.3b", P13.subs(x, -2), -20)
chk("1.3c", P13.subs(x, -1), 0)
sant("1.3b ikke faktor", dv(P13, x + 2)[1] != 0, "rest -20")

divchk("1.4a", x**3 - 13*x + 12, x - 3, x**2 + 3*x - 4)
divchk("1.4b", x**3 + 8, x + 2, x**2 - 2*x + 4)
divchk("1.4c", 2*x**3 - x**2 - 13*x - 6, x + 2, 2*x**2 - 5*x - 3)
divchk("1.4d", x**3 + x**2 + x + 4, x - 1, x**2 + 2*x + 3, 7)

chk("1.5a", factor(x**3 - 6*x**2 + 11*x - 6), (x - 1) * (x - 2) * (x - 3))
chk("1.5b", factor(x**3 + 3*x**2 - 4*x - 12), (x - 2) * (x + 2) * (x + 3))
chk("1.5c", factor(x**3 - 3*x - 2), (x + 1)**2 * (x - 2))
divchk("1.5a steg", x**3 - 6*x**2 + 11*x - 6, x - 1, x**2 - 5*x + 6)
divchk("1.5b steg", x**3 + 3*x**2 - 4*x - 12, x - 2, x**2 + 5*x + 6)
divchk("1.5c steg", x**3 + 0*x**2 - 3*x - 2, x + 1, x**2 - x - 2)

# 1.6 finn den første feilen
P16 = x**3 - 5*x**2 + 2*x + 8
sant("1.6 pil 1", P16.subs(x, 2) == 0, "P(2) = 8 - 20 + 4 + 8 = 0 stemmer")
sant("1.6 pil 2 feil", P16.subs(x, -2) != 0, "P(-2) != 0, så (x+2) er ikke faktor")
divchk("1.6 riktig", P16, x - 2, x**2 - 3*x - 4)
chk("1.6 svar", factor(P16), (x - 2) * (x - 4) * (x + 1))

# 1.7 alltid / noen ganger / aldri
sant("1.7a noen", len(nullp(x**3 - x)) == 3 and len(nullp(x**3 + 2*x)) == 1, "x^3 - x har 3, x^3 + 2x har 1")
sant("1.7b noen", dv(x**3 - 4*x, x - 1)[1] == -3 and len(nullp(x**3 - 4*x)) == 3
     and dv(x**2 + 1, x - 1)[1] == 2 and len(nullp(x**2 + 1)) == 0,
     "rest != 0 ved x-1, men x^3 - 4x har nullpunkter; x^2+1 har ingen")
sant("1.7c alltid", dv(x**3 - 4*x**2 + x + 6, expand((x - 2) * (x - 3)))[1] == 0
     and dv(x**3 - 4*x**2 + x + 6, expand((x - 2) * (x - 3)))[0] == x + 1,
     "P(2) = P(3) = 0 gir faktoren (x-2)(x-3)")
chk("1.7c P(2)", (x**3 - 4*x**2 + x + 6).subs(x, 2), 0)
chk("1.7c P(3)", (x**3 - 4*x**2 + x + 6).subs(x, 3), 0)

# 1.8 finn k
kk = solve(Eq((x**3 + k*x**2 - 4*x + 4).subs(x, 2), 0), k)
chk("1.8a", kk, [-1])
chk("1.8b", factor(x**3 - x**2 - 4*x + 4), (x - 1) * (x - 2) * (x + 2))
divchk("1.8b steg", x**3 - x**2 - 4*x + 4, x - 2, x**2 + x - 2)

# 1.9 lag selv: rest 5 ved divisjon med (x-2)
eks19 = x**3 - 3
chk("1.9 rest", dv(eks19, x - 2)[1], 5)
chk("1.9 P(2)", eks19.subs(x, 2), 5)
chk("1.9 alternativ", (x**3 + x - 5).subs(x, 2), 5)
aapen("1.9 forklar", "Rest = P(2) etter P(x) = (x-2)Q(x) + r")

# Sjekk 1
divchk("Sjekk 1a", x**2 + 2*x - 15, x - 3, x + 5)
chk("Sjekk 1b", (x**3 - 3*x**2 + 4).subs(x, 2), 0)
aapen("Sjekk 1c", "Delingen oppfyller P = divisor * kvotient + rest")

# ---------- Eksempler del 2 ----------
f21 = (x + 2) * (x - 1) * (x - 3)
chk("Eks 2.1 utgang", expand(f21), x**3 - 2*x**2 - 5*x + 6)
chk("Eks 2.1 f(0)", f21.subs(x, 0), 6)
chk("Eks 2.1 nullpunkter", nullp(f21), [-2, 1, 3])
chk("Eks 2.1 ledende", Poly(expand(f21), x).LC(), 1)
chk("Eks 2.1 f(-3)", f21.subs(x, -3), -24)
chk("Eks 2.1 f(2)", f21.subs(x, 2), -4)
chk("Eks 2.1 f(4)", f21.subs(x, 4), 18)
chk("Eks 2.1 f(-2)", f21.subs(x, -2), 0)
g21 = (x + 1)**2 * (x - 2)
chk("Graf g nullpunkter", nullp(g21), [-1, 2])
chk("Graf g(0)", g21.subs(x, 0), -2)
chk("Graf g(1)", g21.subs(x, 1), -4)

ulikhet("Eks 2.2", x**3 - 7*x + 6 > 0, Union(Interval(-3, 1, True, True), Interval(2, oo, True, True)))
chk("Eks 2.2 kontroll 0", (x**3 - 7*x + 6).subs(x, 0), 6)
chk("Eks 2.2 kontroll 1,5", (x**3 - 7*x + 6).subs(x, R(3, 2)), R(-9, 8))
chk("Eks 2.2 kontroll 3", (x**3 - 7*x + 6).subs(x, 3), 12)
chk("Eks 2.2 kontroll -4", (x**3 - 7*x + 6).subs(x, -4), -30)

# ---------- Vanlige feil del 2 ----------
sant("VF 2a", len(nullp(x**3 + x)) == 1, "x^3 + x har bare nullpunktet 0")
sant("VF 2b", set(nullp(x**3 - 4*x)) == {-2, 0, 2} and nullp(x**2 - 4) == [-2, 2], "x^3 = 4x har tre løsninger, ikke to")
chk("VF 2c", [((x - 2)**2 * (x + 1)).subs(x, v) for v in (1, 3, 5)], [2, 4, 54])
sant("VF 2c fortegn", ((x - 2)**2 * (x + 1)).subs(x, 1) > 0 and ((x - 2)**2 * (x + 1)).subs(x, 3) > 0,
     "ingen fortegnsskifte ved 2")
sant("VF 2 stor x", 100**3 - 5 * 100**2 > 0 and 1000**3 > 1000 * 1000 * 5, "ledende ledd dominerer")
chk("VF 2 stor x tall", [100**3, 5 * 100**2], [1000000, 50000])

# ---------- Del 2 ----------
chk("2.1a grad", Poly(2*x**3 - 5*x + 1, x).degree(), 3)
chk("2.1a LC", Poly(2*x**3 - 5*x + 1, x).LC(), 2)
sant("2.1a lim+", limit(2*x**3 - 5*x + 1, x, oo) == oo, "grenseverdi")
sant("2.1a lim-", limit(2*x**3 - 5*x + 1, x, -oo) == -oo, "grenseverdi")
chk("2.1b grad", Poly(-x**4 + 3*x**2, x).degree(), 4)
chk("2.1b LC", Poly(-x**4 + 3*x**2, x).LC(), -1)
sant("2.1b lim+", limit(-x**4 + 3*x**2, x, oo) == -oo, "grenseverdi")
sant("2.1b lim-", limit(-x**4 + 3*x**2, x, -oo) == -oo, "grenseverdi")
chk("2.1c grad", Poly(4 - x**3, x).degree(), 3)
chk("2.1c LC", Poly(4 - x**3, x).LC(), -1)
sant("2.1c lim+", limit(4 - x**3, x, oo) == -oo, "grenseverdi")
sant("2.1c lim-", limit(4 - x**3, x, -oo) == oo, "grenseverdi")

fa = (x - 1) * (x + 4) * (x - 5)
fb = x * (x + 2) * (x - 3)
fc = -2 * (x - 3) * (x + 1) * (x - 4)
chk("2.2a null", nullp(fa), [-4, 1, 5])
chk("2.2a y", fa.subs(x, 0), 20)
chk("2.2b null", nullp(fb), [-2, 0, 3])
chk("2.2b y", fb.subs(x, 0), 0)
chk("2.2c null", nullp(fc), [-1, 3, 4])
chk("2.2c y", fc.subs(x, 0), -24)

f23 = (x + 1) * (x - 2) * (x - 4)
ulikhet("2.3", f23 < 0, Union(Interval.open(-oo, -1), Interval.open(2, 4)))
chk("2.3 f(0)", f23.subs(x, 0), 8)

los("2.4a", Eq(x**3 - 3*x**2 - 10*x + 24, 0), [-3, 2, 4])
divchk("2.4a steg", x**3 - 3*x**2 - 10*x + 24, x - 2, x**2 - x - 12)
los("2.4b", Eq(x**3 + 4*x**2 + 4*x, 0), [-2, 0])
chk("2.4b faktor", factor(x**3 + 4*x**2 + 4*x), x * (x + 2)**2)
los("2.4c", Eq(x**3, 16*x), [-4, 0, 4])

ulikhet("2.5a", x**3 - 4*x**2 - 11*x + 30 < 0, Union(Interval.open(-oo, -3), Interval.open(2, 5)))
divchk("2.5a steg", x**3 - 4*x**2 - 11*x + 30, x - 2, x**2 - 2*x - 15)
ulikhet("2.5b", x**3 - 12*x + 16 > 0, Union(Interval.open(-4, 2), Interval.open(2, oo)))
divchk("2.5b steg", x**3 + 0*x**2 - 12*x + 16, x - 2, x**2 + 2*x - 8)
chk("2.5b faktor", factor(x**3 - 12*x + 16), (x - 2)**2 * (x + 4))
ulikhet("2.5c", x * (x - 3)**2 <= 0, Union(Interval(-oo, 0), FiniteSet(3)))

f26 = -(x + 3) * (x - 1)**2
chk("2.6 null", nullp(f26), [-3, 1])
chk("2.6 y", f26.subs(x, 0), -3)
chk("2.6 LC", Poly(expand(f26), x).LC(), -1)
sant("2.6 lim+", limit(f26, x, oo) == -oo, "grenseverdi")
sant("2.6 lim-", limit(f26, x, -oo) == oo, "grenseverdi")
chk("2.6 f(-1)", f26.subs(x, -1), -8)
sant("2.6 ingen skifte ved 1", f26.subs(x, R(1, 2)) < 0 and f26.subs(x, 2) < 0 and f26.subs(x, -4) > 0,
     "negativ på begge sider av 1, positiv til venstre for -3")

# 2.7 finn den første feilen: (x-2)^2 (x+1) < 0 ... bruker (x-1)^2 (x+3) < 0
f27 = (x - 1)**2 * (x + 3)
ulikhet("2.7 riktig", f27 < 0, Interval.open(-oo, -3))
sant("2.7 pil feil", f27.subs(x, 0) > 0 and f27.subs(x, 2) > 0, "ingen fortegnsskifte ved 1")
chk("2.7 f(0)", f27.subs(x, 0), 3)
chk("2.7 f(2)", f27.subs(x, 2), 5)
chk("2.7 f(-4)", f27.subs(x, -4), -25)

# 2.8 alltid / noen ganger / aldri
sant("2.8a alltid", limit(x**3 + 5*x**2 - x + 7, x, oo) == oo and limit(x**3 + 5*x**2 - x + 7, x, -oo) == -oo,
     "ned til venstre, opp til høyre")
sant("2.8b noen", len(nullp(x**4 + 1)) == 0 and len(nullp(x**4 - 1)) == 2, "x^4+1 ingen, x^4-1 to")
f28 = (x - 1)**2 * (x - 2)
sant("2.8c noen", f28.subs(x, R(3, 2)) < 0 and ((x - 1)**2).subs(x, 5) >= 0 and (x**2 * (x**2 + 1)).subs(x, 3) > 0,
     "x^2(x^2+1) >= 0 men (x-1)^2(x-2) < 0 for x = 3/2")
chk("2.8c f(3/2)", f28.subs(x, R(3, 2)), R(-1, 8))

# 2.9 lag selv
f29 = -2 * (x + 1) * (x - 3) * (x - 4)
chk("2.9 null", nullp(f29), [-1, 3, 4])
chk("2.9 f(0)", f29.subs(x, 0), -24)
chk("2.9 a", solve(Eq(a * (0 + 1) * (0 - 3) * (0 - 4), -24), a), [-2])
f29b = -2 * (x + 1) * (x - 3) * (x - 4) * (x**2 + 1)
chk("2.9b null", nullp(f29b), [-1, 3, 4])
chk("2.9b f(0)", f29b.subs(x, 0), -24)
chk("2.9b grad", Poly(expand(f29b), x).degree(), 5)
# fjerdegrad: f(0)=-24 med en ekstra faktor (x - 5)? nei: f(0) endres. Bruk (x^2+1) -> grad 5. Fjerdegrad:
f29c = (x + 1) * (x - 3) * (x - 4) * (x + 2)
sant("2.9c fjerdegrad mulig", Poly(expand(f29c * R(-24) / f29c.subs(x, 0)), x).degree() == 4
     and expand(f29c * R(-24) / f29c.subs(x, 0)).subs(x, 0) == -24, "ekstra nullpunkt gir fjerdegrad")

# 2.10 dobbelt nullpunkt
kof = solve([Eq(expand(x * (x - 2)**2), x**3 + a * x**2 + b * x)], [a, b])
chk("2.10a", expand(x * (x - 2)**2), x**3 - 4*x**2 + 4*x)
f210 = x**3 - 4*x**2 + 4*x
chk("2.10a dobbelt", factor(f210), x * (x - 2)**2)
ulikhet("2.10b", f210 >= 0, Union(Interval(0, oo)))
sant("2.10 b ulikhet", f210.subs(x, 2) == 0 and f210.subs(x, 1) > 0 and f210.subs(x, 3) > 0, "ingen skifte ved 2")

# Sjekk 2
chk("Sjekk 2a grad", Poly(5 - 2*x**4 + x, x).degree(), 4)
chk("Sjekk 2a LC", Poly(5 - 2*x**4 + x, x).LC(), -2)
sant("Sjekk 2a lim", limit(5 - 2*x**4 + x, x, oo) == -oo and limit(5 - 2*x**4 + x, x, -oo) == -oo, "ned begge veier")
chk("Sjekk 2b", nullp(x * (x - 3)**2), [0, 3])
aapen("Sjekk 2c", "Ledende ledd vokser raskest for stor |x|")

# ---------- Utfordring ----------
Q, r_ = dv(x**3 + 2, x - 1)
chk("U1 kvotient", Q, x**2 + x + 1)
chk("U1 rest", r_, 3)
chk("U1 sammen", simplify((x**3 + 2) / (x - 1) - (x**2 + x + 1 + 3 / (x - 1))), 0)
chk("U1 x=3", R(3**3 + 2, 3 - 1), R(29, 2))
chk("U1 x=3 høyre", 3**2 + 3 + 1 + R(3, 3 - 1), R(29, 2))
divchk("U1 steg", x**3 + 0*x**2 + 0*x + 2, x - 1, x**2 + x + 1, 3)

V = x * (20 - 2*x) * (30 - 2*x)
chk("U2 utvidet", expand(V), 4*x**3 - 100*x**2 + 600*x)
sant("U2a definisjon", V.subs(x, 0) == 0 and V.subs(x, 10) == 0 and V.subs(x, 5) > 0 and V.subs(x, 11) < 0,
     "0 < x < 10")
sant("U2b", V.subs(x, 5) == 1000, "x = 5")
chk("U2b faktor", factor(V - 1000), 4 * (x - 5) * (x**2 - 20*x + 50))
sol = [r.evalf() for r in solve(Eq(V, 1000), x)]
chk("U2b løsninger", sorted(round(float(s), 2) for s in sol if 0 < s < 10), [2.93, 5.0])
chk("U2b utenfor", round(float(max(sol)), 2), 17.07)
chk("U2c V(2)", V.subs(x, 2), 832)

chk("U3 faktor", factor(x**4 - 5*x**2 + 4), (x - 2) * (x - 1) * (x + 1) * (x + 2))
los("U3", Eq(x**4 - 5*x**2 + 4, 0), [-2, -1, 1, 2])
divchk("U3 steg 1", x**4 + 0*x**3 - 5*x**2 + 0*x + 4, x - 1, x**3 + x**2 - 4*x - 4)
chk("U3 steg 2", factor(x**3 + x**2 - 4*x - 4), (x + 1) * (x - 2) * (x + 2))

# U4 programmering: koden kjøres slik den står
def finn(p, d):
    ut = []
    for aa in range(-abs(d), abs(d) + 1):
        if aa != 0 and d % aa == 0 and p(aa) == 0:
            ut.append(aa)
    return ut


chk("U4a", finn(lambda t_: t_**3 - t_**2 - 10*t_ - 8, -8), [-2, -1, 4])
chk("U4a faktor", factor(x**3 - x**2 - 10*x - 8), (x + 1) * (x + 2) * (x - 4))
chk("U4b", finn(lambda t_: t_**4 - 5*t_**2 + 4, 4), [-2, -1, 1, 2])

# U5 bevis
# a^3 + b a^2 + c a + d = 0  =>  a(a^2 + b a + c) = -d
av, bv, cv, dv_ = symbols("av bv cv dv_")
chk("U5a", expand(av**3 + bv*av**2 + cv*av + dv_ - dv_) , av * (av**2 + bv*av + cv))
sant("U5c moteksempel", (x**3 - 2).subs(x, 2) != 0 and (-2) % 2 == 0, "2 går opp i -2, men P(2) = 6")
chk("U5c P(2)", (x**3 - 2).subs(x, 2), 6)

# U6
Pu = x**3 + a * x + b
lsn = solve([Eq(Pu.subs(x, 1), 5), Eq(Pu.subs(x, -1), -1)], [a, b])
chk("U6 a", lsn[a], 2)
chk("U6 b", lsn[b], 2)
Pu2 = x**3 + 2*x + 2
chk("U6 rest 1", dv(Pu2, x - 1)[1], 5)
chk("U6 rest -1", dv(Pu2, x + 1)[1], -1)
chk("U6c", dv(Pu2, x - 2)[1], 14)

# U7 utforsk
sant("U7", all(((x - 1)**nn).subs(x, 0) * ((x - 1)**nn).subs(x, 2) < 0 for nn in (1, 3, 5))
     and all(((x - 1)**nn).subs(x, 0) * ((x - 1)**nn).subs(x, 2) > 0 for nn in (2, 4, 6)),
     "fortegnsskifte bare når n er oddetall")

rapport()
