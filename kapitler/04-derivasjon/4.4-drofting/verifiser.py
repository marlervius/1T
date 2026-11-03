"""Regner alle svar i 4.4 Drøfting av funksjoner på nytt med sympy."""
import contextlib
import io

from kontroll import *


def d(u):
    return diff(sympify(u), x)


def fverdi(u, p):
    return sympify(u).subs(x, p)


def fortegn(u, p):
    """Fortegnet (+1, -1 eller 0) til u(x) i x = p."""
    return sign(sympify(u).subs(x, p))


def verdier(u, punkter):
    return {p: fverdi(u, p) for p in punkter}


def storst_minst(u, a_, b_):
    """Kandidater: endepunkt og nullpunkt for u' inni intervallet. Returnerer (største, minste)."""
    kand = [a_, b_] + [r for r in solve(d(u), x) if r.is_real and a_ < r < b_]
    v = [fverdi(u, p) for p in kand]
    return max(v), min(v)


# =====================================================================
# DEL 1
# =====================================================================
# Eks 1: f = x^3 - 3x^2
f = x**3 - 3 * x**2
chk("Eks 1.1 f'", d(f), 3 * x**2 - 6 * x)
chk("Eks 1.1 faktorisert", d(f), 3 * x * (x - 2))
los("Eks 1.1 f'=0", Eq(d(f), 0), [0, 2])
chk("Eks 1.1 fortegn f'(-1)", fortegn(d(f), -1), 1)
chk("Eks 1.1 fortegn f'(1)", fortegn(d(f), 1), -1)
chk("Eks 1.1 fortegn f'(3)", fortegn(d(f), 3), 1)
chk("Eks 1.1 f(0)", fverdi(f, 0), 0)
chk("Eks 1.1 f(2)", fverdi(f, 2), -4)
los("Eks 1.1 nullpunkter", Eq(f, 0), [0, 3])
chk("Eks 1.1 faktorisert f", f, x**2 * (x - 3))
chk("Eks 1.1 f(-1)", fverdi(f, -1), -4)

# Eks 2: g = x^3 - 6x^2 + 12x, terrassepunkt
g = x**3 - 6 * x**2 + 12 * x
chk("Eks 1.2 g'", d(g), 3 * x**2 - 12 * x + 12)
chk("Eks 1.2 g' faktorisert", d(g), 3 * (x - 2) ** 2)
los("Eks 1.2 g'=0", Eq(d(g), 0), [2])
chk("Eks 1.2 g'(1)", fortegn(d(g), 1), 1)
chk("Eks 1.2 g'(3)", fortegn(d(g), 3), 1)
chk("Eks 1.2 g(2)", fverdi(g, 2), 8)
sant("Eks 1.2 g voksende", all(d(g).subs(x, p) >= 0 for p in range(-20, 21)), "g' >= 0")

# VF del 1
sant("VF 1a", d(g).subs(x, 2) == 0 and fortegn(d(g), 1.9) == fortegn(d(g), 2.1), "g'(2)=0 men ingen fortegnsskifte")
chk("VF 1b", fverdi(f, 0), 0)  # toppunktet (0,0) har y-verdi 0, ikke bare x = 0

# ---- 1.1: f(x) = 2x^3 - 6x
f11 = 2 * x**3 - 6 * x
chk("1.1a", d(f11), 6 * x**2 - 6)
chk("1.1b", d(f11), 6 * (x - 1) * (x + 1))
los("1.1c", Eq(d(f11), 0), [-1, 1])

# ---- 1.2: fortegnslinje for f'(x) = (x+2)(x-1)
f12d = (x + 2) * (x - 1)
chk("1.2a", [fortegn(f12d, -3), fortegn(f12d, 0), fortegn(f12d, 2)], [1, -1, 1])
ulikhet("1.2b voksende", f12d >= 0, Union(Interval(-oo, -2), Interval(1, oo)))
ulikhet("1.2b avtagende", f12d <= 0, Interval(-2, 1))
sant("1.2c topp", fortegn(f12d, -3) == 1 and fortegn(f12d, 0) == -1, "+ til - i x=-2")
sant("1.2c bunn", fortegn(f12d, 0) == -1 and fortegn(f12d, 2) == 1, "- til + i x=1")

# ---- 1.3: f(x) = x^2 - 6x + 5
f13 = x**2 - 6 * x + 5
chk("1.3a", d(f13), 2 * x - 6)
los("1.3b", Eq(d(f13), 0), [3])
sant("1.3c", fortegn(d(f13), 2) == -1 and fortegn(d(f13), 4) == 1, "- til +: bunnpunkt")
chk("1.3d", fverdi(f13, 3), -4)

# ---- 1.4: f(x) = x^3 + 3x^2 - 9x
f14 = x**3 + 3 * x**2 - 9 * x
chk("1.4a f'", d(f14), 3 * x**2 + 6 * x - 9)
chk("1.4a faktorisert", d(f14), 3 * (x + 3) * (x - 1))
los("1.4a nullpunkt f'", Eq(d(f14), 0), [-3, 1])
chk("1.4a fortegn", [fortegn(d(f14), -4), fortegn(d(f14), 0), fortegn(d(f14), 2)], [1, -1, 1])
chk("1.4c topp", fverdi(f14, -3), 27)
chk("1.4c bunn", fverdi(f14, 1), -5)
chk("1.4b", [fortegn(d(f14), -4), fortegn(d(f14), 0), fortegn(d(f14), 2)], [1, -1, 1])

# ---- 1.5: g(x) = x^3 - 3x^2 - 9x + 11
g15 = x**3 - 3 * x**2 - 9 * x + 11
chk("1.5a g(1)", fverdi(g15, 1), 0)
kv, rest = div(g15, x - 1, x)
chk("1.5a kvotient", kv, x**2 - 2 * x - 11)
chk("1.5a rest", rest, 0)
chk("1.5a faktorisert", expand((x - 1) * (x**2 - 2 * x - 11)), g15)
los("1.5a nullpunkter", Eq(g15, 0), [1, 1 - 2 * sqrt(3), 1 + 2 * sqrt(3)])
chk("1.5a omtrent", [N(1 - 2 * sqrt(3), 3), N(1 + 2 * sqrt(3), 3)], [-2.46, 4.46], tol=0.01)
chk("1.5b g'", d(g15), 3 * (x + 1) * (x - 3))
los("1.5b g'=0", Eq(d(g15), 0), [-1, 3])
chk("1.5b fortegn", [fortegn(d(g15), -2), fortegn(d(g15), 0), fortegn(d(g15), 4)], [1, -1, 1])
chk("1.5b topp", fverdi(g15, -1), 16)
chk("1.5b bunn", fverdi(g15, 3), -16)
chk("1.5c y-akse", fverdi(g15, 0), 11)

# ---- 1.6: f(x) = x^4 - 4x^3
f16n = x**4 - 4 * x**3
chk("1.6 f'", d(f16n), 4 * x**2 * (x - 3))
los("1.6 f'=0", Eq(d(f16n), 0), [0, 3])
chk("1.6 fortegn", [fortegn(d(f16n), -1), fortegn(d(f16n), 1), fortegn(d(f16n), 4)], [-1, -1, 1])
chk("1.6 f(0)", fverdi(f16n, 0), 0)
chk("1.6 f(3)", fverdi(f16n, 3), -27)

# ---- 1.7: finn første feil, f(x) = x^3 - 3x^2 - 24x
f16 = x**3 - 3 * x**2 - 24 * x
sant("1.7 pil 1", d(f16) == 3 * x**2 - 6 * x - 24, "f' riktig")
sant("1.7 pil 2", expand(3 * (x - 4) * (x + 2)) == 3 * x**2 - 6 * x - 24, "faktorisering riktig")
sant("1.7 pil 3", set(solve(d(f16), x)) == {4, -2}, "f'=0 for x=4 og x=-2")
sant("1.7 pil 4 feil", fortegn(d(f16), -3) == 1, "f' er positiv for x<-2 (ikke negativ)")
chk("1.7 riktig fortegn", [fortegn(d(f16), -3), fortegn(d(f16), 0), fortegn(d(f16), 5)], [1, -1, 1])
chk("1.7 f(4)", fverdi(f16, 4), -80)
chk("1.7 f(-2)", fverdi(f16, -2), 28)

# ---- 1.8: alltid / noen ganger / aldri
sant("1.8a", d(x**3).subs(x, 0) == 0 and fortegn(d(x**3), -1) == fortegn(d(x**3), 1) == 1, "x^3 er voksende, men f'(0)=0")
sant("1.8a eks2", d(x**2).subs(x, 1) == 2 and d(x**3).subs(x, 1) == 3, "f'>0 i vanlig tilfelle")
p7, q7, r7 = symbols("p7 q7 r7", real=True)
sant("1.8b", solve(d(p7 * x**2 + q7 * x + r7), x) == [-q7 / (2 * p7)] and diff(d(x**2 + 3 * x), x) != 0, "f'=2px+q har én rot og skifter fortegn")
chk("1.8b fortegn", [fortegn(d(x**2 - 4 * x + 1), 1), fortegn(d(x**2 - 4 * x + 1), 3)], [-1, 1])
sant("1.8c", d(x**2) == d(x**2 + 5) and x**2 != x**2 + 5, "samme f', ulike f")

# ---- 1.9: lag selv, topp x=-1, bunn x=2
k8 = symbols("k8", positive=True)
f18 = integrate(6 * (x + 1) * (x - 2), x)   # k = 6
chk("1.9 f", f18, 2 * x**3 - 3 * x**2 - 12 * x)
chk("1.9 f'", d(f18), 6 * (x + 1) * (x - 2))
chk("1.9 fortegn", [fortegn(d(f18), -2), fortegn(d(f18), 0), fortegn(d(f18), 3)], [1, -1, 1])
chk("1.9 topp", fverdi(f18, -1), 7)
chk("1.9 bunn", fverdi(f18, 2), -20)
chk("1.9b k<0 gir omvendt", [fortegn(-6 * (x + 1) * (x - 2), -2), fortegn(-6 * (x + 1) * (x - 2), 0)], [-1, 1])

# ---- Sjekk 1
s1 = x**2 - 8 * x + 3
chk("Sjekk 1a f'", d(s1), 2 * x - 8)
chk("Sjekk 1a bunn", fverdi(s1, 4), -13)
sant("Sjekk 1a bunnpunkt", fortegn(d(s1), 3) == -1 and fortegn(d(s1), 5) == 1, "- til +")
aapen("Sjekk 1b", "f' skifter fra + til - gir toppunkt")
sant("Sjekk 1b", True, "+ til - er toppunkt (definisjon)")
aapen("Sjekk 1c", "Tangentens stigningstall er f'(x); positivt stigningstall betyr at tangenten stiger")

# =====================================================================
# DEL 2
# =====================================================================
# Eks 1: f = x^3 - 3x^2 på [-1, 4]
chk("Eks 2.1 f(-1)", fverdi(f, -1), -4)
chk("Eks 2.1 f(0)", fverdi(f, 0), 0)
chk("Eks 2.1 f(2)", fverdi(f, 2), -4)
chk("Eks 2.1 f(4)", fverdi(f, 4), 16)
st, mi = storst_minst(f, -1, 4)
chk("Eks 2.1 største", st, 16)
chk("Eks 2.1 minste", mi, -4)

# Eks 2: eskeoppgaven
V = x * (20 - 2 * x) * (30 - 2 * x)
chk("Eks 2.2 V utmultiplisert", expand(V), 4 * x**3 - 100 * x**2 + 600 * x)
chk("Eks 2.2 V'", d(V), 12 * x**2 - 200 * x + 600)
los("Eks 2.2 V'=0", Eq(d(V), 0), [(25 - 5 * sqrt(7)) / 3, (25 + 5 * sqrt(7)) / 3])
chk("Eks 2.2 x", N((25 - 5 * sqrt(7)) / 3, 4), 3.924, tol=0.001)
chk("Eks 2.2 andre rot", N((25 + 5 * sqrt(7)) / 3, 4), 12.74, tol=0.01)
chk("Eks 2.2 ligning", Eq(3 * x**2 - 50 * x + 150, 0).lhs * 4, d(V))
chk("Eks 2.2 sqrt", sqrt(2500 - 1800), 10 * sqrt(7))
chk("Eks 2.2 V(0)", fverdi(V, 0), 0)
chk("Eks 2.2 V(10)", fverdi(V, 10), 0)
chk("Eks 2.2 V(maks)", N(fverdi(V, (25 - 5 * sqrt(7)) / 3), 5), 1056.3, tol=0.1)
chk("Eks 2.2 fortegn", [fortegn(d(V), 3), fortegn(d(V), 5)], [1, -1])
chk("Eks 2.2 felt", [N(50 - 10 * sqrt(7), 4) / 6, N(50 + 10 * sqrt(7), 4) / 6], [3.924, 12.74], tol=0.01)

# VF del 2
fvf = x**3 - 6 * x**2 + 9 * x
st_vf, mi_vf = storst_minst(fvf, 0, 5)
chk("VF 2a lokal topp", fverdi(fvf, 1), 4)
chk("VF 2a største verdi", st_vf, 20)
sant("VF 2b", solve(d(x**2), x) == [0] and not (1 < 0 < 3) and fverdi(x**2, 3) == 9, "x^2 på [1,3]: x=0 utenfor, største verdi i endepunktet")
sant("VF 2c V'=0 utenfor", N((25 + 5 * sqrt(7)) / 3, 3) > 10, "x=12,74 ligger utenfor [0,10]")

# Teorifigur: f = x^3 - 6x^2 + 9x på [0,5]
chk("Teorifigur f(1)", fverdi(fvf, 1), 4)
chk("Teorifigur f(3)", fverdi(fvf, 3), 0)
chk("Teorifigur f(5)", fverdi(fvf, 5), 20)

# ---- 2.1: f(x) = x^2 - 4x på [0,5]
f21 = x**2 - 4 * x
chk("2.1a f'", d(f21), 2 * x - 4)
los("2.1a f'=0", Eq(d(f21), 0), [2])
chk("2.1b", [fverdi(f21, 0), fverdi(f21, 2), fverdi(f21, 5)], [0, -4, 5])
st, mi = storst_minst(f21, 0, 5)
chk("2.1c største", st, 5)
chk("2.1c minste", mi, -4)

# ---- 2.2
f22a = x**3 - 12 * x
st, mi = storst_minst(f22a, -3, 3)
chk("2.2a største", st, 16)
chk("2.2a minste", mi, -16)
chk("2.2a f'", d(f22a), 3 * (x - 2) * (x + 2))
chk("2.2a verdier", [fverdi(f22a, p) for p in (-3, -2, 2, 3)], [9, 16, -16, -9])
f22b = -x**2 + 4 * x
st, mi = storst_minst(f22b, 3, 6)
chk("2.2b største", st, 3)
chk("2.2b minste", mi, -12)
los("2.2b f'=0", Eq(d(f22b), 0), [2])

# ---- 2.3: gjerde mot vegg
A = x * (40 - 2 * x)
chk("2.3a utmultiplisert", expand(A), 40 * x - 2 * x**2)
chk("2.3b A'", d(A), 40 - 4 * x)
los("2.3b A'=0", Eq(d(A), 0), [10])
chk("2.3c", [fverdi(A, 0), fverdi(A, 10), fverdi(A, 20)], [0, 200, 0])
chk("2.3d lengde", 40 - 2 * 10, 20)
sant("2.3 definisjon", 40 - 2 * 20 == 0, "x opp til 20")

# ---- 2.4: åpen eske, kvadratisk bunn, overflate 300
h_ = (300 - x**2) / (4 * x)
chk("2.4a overflate", x**2 + 4 * x * h_, 300)
V24 = simplify(x**2 * h_)
chk("2.4a V", V24, 75 * x - x**3 / 4)
chk("2.4b grense", solve(Eq(x**2, 300), x)[-1], 10 * sqrt(3))
chk("2.4c V'", d(V24), 75 - 3 * x**2 / 4)
los("2.4c V'=0", Eq(d(V24), 0), [-10, 10])
chk("2.4c fortegn", [fortegn(d(V24), 5), fortegn(d(V24), 12)], [1, -1])
chk("2.4c V(10)", fverdi(V24, 10), 500)
chk("2.4c h", h_.subs(x, 10), 5)
chk("2.4 V(10sqrt3)", fverdi(V24, 10 * sqrt(3)), 0)

# ---- 2.5: finn første feil, f(x) = 2x^3 - 9x^2 + 12x på [0,4]
f25 = 2 * x**3 - 9 * x**2 + 12 * x
sant("2.5 pil 1", d(f25) == 6 * x**2 - 18 * x + 12, "f' riktig")
sant("2.5 pil 2", expand(6 * (x - 1) * (x - 2)) == 6 * x**2 - 18 * x + 12, "faktorisering riktig")
sant("2.5 pil 3", set(solve(d(f25), x)) == {1, 2}, "x=1 eller x=2")
sant("2.5 pil 4", fverdi(f25, 1) == 5 and fverdi(f25, 2) == 4, "f(1)=5 og f(2)=4")
st, mi = storst_minst(f25, 0, 4)
chk("2.5 største", st, 32)
chk("2.5 minste", mi, 0)
chk("2.5 f(0)", fverdi(f25, 0), 0)
chk("2.5 f(4)", fverdi(f25, 4), 32)

# ---- 2.6: K(t) = -0,5 t^3 + 4,5 t^2 på [0,8]
K = -Rational(1, 2) * x**3 + Rational(9, 2) * x**2
chk("2.6a K'", d(K), -Rational(3, 2) * x**2 + 9 * x)
los("2.6a K'=0", Eq(d(K), 0), [0, 6])
chk("2.6a fortegn", [fortegn(d(K), 3), fortegn(d(K), 7)], [1, -1])
chk("2.6a verdier", [fverdi(K, 0), fverdi(K, 6), fverdi(K, 8)], [0, 54, 32])
st, mi = storst_minst(K, 0, 8)
chk("2.6a største", st, 54)
st1, mi1 = storst_minst(K, 1, 8)
chk("2.6b minste på [1,8]", mi1, 4)
chk("2.6b verdier", [fverdi(K, 1), fverdi(K, 6), fverdi(K, 8)], [4, 54, 32])
chk("2.6b K'(1)", d(K).subs(x, 1), Rational(15, 2))
chk("2.6c avtagende", [fortegn(d(K), 6.5), fortegn(d(K), 7.9)], [-1, -1])

# ---- 2.7: alltid / noen ganger / aldri
los("2.7a", Eq(expand(x**3 - 3 * x - 2), 0), [-1, 2])
chk("2.7a faktorisert", x**3 - 3 * x - 2, (x + 1) ** 2 * (x - 2))
chk("2.7a b-verdier", [storst_minst(x**3 - 3 * x, -2, bb)[0] for bb in (-1, 0, 2)], [2, 2, 2])
sant("2.7a b>2", storst_minst(x**3 - 3 * x, -2, 3)[0] == 18 > 2, "f(3)=18")
sant("2.7a b<-1", storst_minst(x**3 - 3 * x, -2, Rational(-3, 2))[0] < 2, "f(-1,5)<2")
sant("2.7a noen ganger 1", storst_minst(x**2 - 2 * x, 0, 2)[0] == 0 and fverdi(x**2 - 2 * x, 1) == -1, "x^2-2x på [0,2]: største verdi i endepunkt")
st_b, _ = storst_minst(-x**2 + 4 * x, 0, 4)
sant("2.7 eks 2", st_b == 4 and fverdi(-x**2 + 4 * x, 2) == 4, "-x^2+4x på [0,4]: største verdi i toppunktet")
sant("2.7b", all(fverdi(u, bb) >= fverdi(u, p) for u, bb in [(x**3, 3), (2 * x + 1, 3)] for p in [0, 1, 2, 3]), "voksende: største verdi i høyre endepunkt")
# 2.7b bakgrunn: f' >= 0 på intervallet gir f(b) >= f(p)
sant("2.7b voksende", all(fortegn(d(x**3), p) >= 0 for p in [0, 1, 2]), "f' >= 0")

# ---- 2.8: f(x) = x^3 - 27x + k på [0,6]
f28 = x**3 - 27 * x
los("2.8a f'=0", Eq(d(f28), 0), [-3, 3])
chk("2.8a verdier", [fverdi(f28, 0), fverdi(f28, 3), fverdi(f28, 6)], [0, -54, 54])
st, mi = storst_minst(f28, 0, 6)
chk("2.8b største uten k", st, 54)
chk("2.8b minste uten k", mi, -54)
k_ = symbols("k_")
los("2.8b k", Eq(54 + k_, 100), [46], var=k_)
chk("2.8b minste", -54 + 46, -8)

# ---- Sjekk 2
s2 = x**2 - 6 * x
st, mi = storst_minst(s2, 1, 5)
chk("Sjekk 2a største", st, -5)
chk("Sjekk 2a minste", mi, -9)
chk("Sjekk 2a verdier", [fverdi(s2, 1), fverdi(s2, 3), fverdi(s2, 5)], [-5, -9, -5])
chk("Sjekk 2b", expand(x * (12 - x)), 12 * x - x**2)
aapen("Sjekk 2c", "Endepunktet kan ha størst verdi uten at f' = 0 der; vi må sammenligne verdiene")

# =====================================================================
# UTFORDRING
# =====================================================================
# U1: f = x^3 - 3x + 2
u1 = x**3 - 3 * x + 2
chk("U1 f(1)", fverdi(u1, 1), 0)
kv, rest = div(u1, x - 1, x)
chk("U1 kvotient", kv, x**2 + x - 2)
chk("U1 rest", rest, 0)
chk("U1 faktorisert", u1, (x - 1) ** 2 * (x + 2))
los("U1 nullpunkter", Eq(u1, 0), [-2, 1])
chk("U1 f'", d(u1), 3 * (x - 1) * (x + 1))
chk("U1 fortegn", [fortegn(d(u1), -2), fortegn(d(u1), 0), fortegn(d(u1), 2)], [1, -1, 1])
chk("U1 topp", fverdi(u1, -1), 4)
chk("U1 bunn", fverdi(u1, 1), 0)

# U2: F(x) = -0,02 x^2 + 40 x - 8000, 0 <= x <= 1500
F = -Rational(2, 100) * x**2 + 40 * x - 8000
chk("U2 F'", d(F), -Rational(4, 100) * x + 40)
los("U2 F'=0", Eq(d(F), 0), [1000])
chk("U2 verdier", [fverdi(F, 0), fverdi(F, 1000), fverdi(F, 1500)], [-8000, 12000, 7000])
chk("U2 salg ved 1500", fverdi(F, 1500), 7000)

# U3: rektangel under y = 12 - x^2
A3 = 2 * x * (12 - x**2)
chk("U3 A", expand(A3), 24 * x - 2 * x**3)
chk("U3 A'", d(A3), 24 - 6 * x**2)
los("U3 A'=0", Eq(d(A3), 0), [-2, 2])
chk("U3 verdier", [fverdi(A3, 0), fverdi(A3, 2), fverdi(A3, 2 * sqrt(3))], [0, 32, 0])
chk("U3 mål", [2 * 2, 12 - 2**2], [4, 8])

# U4: programmet
kode = """
def V(x):
    return x * (20 - 2 * x) * (30 - 2 * x)

beste_x = 0
beste_V = 0
for i in range(0, 1001):
    x = i / 100
    if V(x) > beste_V:
        beste_V = V(x)
        beste_x = x
print(round(beste_x, 2), round(beste_V, 4))
"""
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode, {})
chk("U4a utskrift", ut.getvalue().strip(), "3.92 1056.3052")
kode2 = kode.replace("range(0, 1001)", "range(0, 10001)").replace("i / 100", "i / 1000").replace("round(beste_x, 2)", "round(beste_x, 3)")
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode2, {})
chk("U4c utskrift", ut.getvalue().strip(), "3.924 1056.3059")
xe = (25 - 5 * sqrt(7)) / 3
chk("U4b eksakt x", N(xe, 6), 3.92375, tol=1e-4)
chk("U4b eksakt V", N(fverdi(V, xe), 8), 1056.3059, tol=1e-3)
sant("U4b feil x", abs(N(xe) - 3.92) < 0.005, "x stemmer til 2 desimaler")
sant("U4b feil V", abs(N(fverdi(V, xe)) - fverdi(V, Rational(392, 100))) < 0.001, "V stemmer bedre")

# U5: f = x^3 + a x
a5 = symbols("a5")
f5 = x**3 + a5 * x
chk("U5 f'", d(f5), 3 * x**2 + a5)
sant("U5 a>0", all(d(f5).subs({a5: 2, x: p}) > 0 for p in range(-5, 6)), "a=2: f'>0 overalt")
sant("U5 a=0", d(f5).subs(a5, 0) == 3 * x**2 and fortegn(3 * x**2, -1) == fortegn(3 * x**2, 1), "a=0: terrassepunkt")
sant("U5 a<0", fortegn(d(f5).subs(a5, -3), 0) == -1 and fortegn(d(f5).subs(a5, -3), 2) == 1, "a=-3: to ekstremalpunkter")
los("U5 a<0 nullpunkter", Eq(d(f5).subs(a5, -3), 0), [-1, 1])

# U6: bevis, diskriminant
p6, q6, r6, s6 = symbols("p6 q6 r6 s6")
f6 = p6 * x**3 + q6 * x**2 + r6 * x + s6
chk("U6 f'", d(f6), 3 * p6 * x**2 + 2 * q6 * x + r6)
chk("U6 diskriminant", discriminant(d(f6), x), 4 * q6**2 - 12 * p6 * r6)
sant("U6 eks D>0", discriminant(d(x**3 - 3 * x), x) > 0, "x^3-3x: to")
sant("U6 eks D<0", discriminant(d(x**3 + x), x) < 0, "x^3+x: ingen")
sant("U6 eks D=0", discriminant(d(x**3), x) == 0, "x^3: terrasse")

# U7: baklengs
u7 = x**3 - 3 * x + 5
chk("U7 f'", d(u7), 3 * (x + 1) * (x - 1))
chk("U7 fortegn", [fortegn(d(u7), -2), fortegn(d(u7), 0), fortegn(d(u7), 2)], [1, -1, 1])
chk("U7 topp", fverdi(u7, -1), 7)
chk("U7 bunn", fverdi(u7, 1), 3)
k7, c7 = symbols("k7 c7")
losn = solve([Eq(fverdi(k7 / 3 * x**3 - k7 * x + c7, -1), 7), Eq(fverdi(k7 / 3 * x**3 - k7 * x + c7, 1), 3)], [k7, c7])
chk("U7 entydig", [losn[k7], losn[c7]], [3, 5])

rapport()
