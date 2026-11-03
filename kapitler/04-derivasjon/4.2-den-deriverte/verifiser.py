"""Regner alle svar i 4.2 Den deriverte på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *

h = symbols("h")


def dq(f, p):
    """Differansekvotient (f(p+h) - f(p)) / h for et uttrykk f i x."""
    return (f.subs(x, p + h) - f.subs(x, p)) / h


def grense(f, p):
    """Grenseverdi av differansekvotienten når h -> 0."""
    return limit(simplify(dq(f, p)), h, 0)


def deriv(f):
    return grense(f, x)


# =====================================================================
# DEL 1
# =====================================================================
# ---------- Eksempel 1: f(x) = x^2, a = 3 ----------
f = x**2
chk("Eks 1.1 steg 1", dq(f, 3), ((3 + h) ** 2 - 9) / h)
chk("Eks 1.1 steg 2", ((3 + h) ** 2 - 9) / h, (9 + 6 * h + h**2 - 9) / h)
chk("Eks 1.1 steg 3", (9 + 6 * h + h**2 - 9) / h, (6 * h + h**2) / h)
chk("Eks 1.1 steg 4", (6 * h + h**2) / h, 6 + h)
chk("Eks 1.1 faktorisering", factor(6 * h + h**2), h * (6 + h))
chk("Eks 1.1 grense", grense(f, 3), 6)
for hv, fv in [(1, 7), (Rational(1, 10), Rational(61, 10)), (Rational(1, 100), Rational(601, 100))]:
    chk(f"Eks 1.1 tabell h={hv}", dq(f, 3).subs(h, hv), fv)

# ---------- Eksempel 2: f(x) = x^2 - 4x ----------
f = x**2 - 4 * x
chk("Eks 1.2 steg 1", dq(f, x), ((x + h) ** 2 - 4 * (x + h) - (x**2 - 4 * x)) / h)
chk("Eks 1.2 steg 2", ((x + h) ** 2 - 4 * (x + h) - (x**2 - 4 * x)) / h,
    (x**2 + 2 * x * h + h**2 - 4 * x - 4 * h - x**2 + 4 * x) / h)
chk("Eks 1.2 steg 3", (x**2 + 2 * x * h + h**2 - 4 * x - 4 * h - x**2 + 4 * x) / h, (2 * x * h + h**2 - 4 * h) / h)
chk("Eks 1.2 steg 4", (2 * x * h + h**2 - 4 * h) / h, 2 * x + h - 4)
chk("Eks 1.2 grense", deriv(f), 2 * x - 4)
chk("Eks 1.2 f'(1)", deriv(f).subs(x, 1), -2)
chk("Eks 1.2 f(1)", f.subs(x, 1), -3)
chk("Eks 1.2 f'(1) direkte", grense(f, 1), -2)

# ---------- Vanlige feil ----------
chk("VF 1a nevner", h.subs(h, 0), 0)
chk("VF 1a teller", ((3 + h) ** 2 - 9).subs(h, 0), 0)
chk("VF 1b", expand((x + h) ** 2 - (x**2 + h**2)), 2 * x * h)
chk("VF 1b tall", [(2 + 1) ** 2, 2**2 + 1**2], [9, 5])
chk("VF 1c f(1)", (x**2 - 4 * x).subs(x, 1), -3)
chk("VF 1c f'(1)", grense(x**2 - 4 * x, 1), -2)
chk("VF 1d", grense(x**2, 2), 4)
chk("VF 1d kvotient", simplify(dq(x**2, 2)), 4 + h)

# ---------- Oppgaver del 1 ----------
f = x**2
chk("1.1a f(5)", f.subs(x, 5), 25)
chk("1.1a f(5+h)", expand(f.subs(x, 5 + h)), 25 + 10 * h + h**2)
chk("1.1b", simplify(dq(f, 5)), 10 + h)
chk("1.1c", grense(f, 5), 10)

f = x**2 + x
chk("1.2 f(2)", f.subs(x, 2), 6)
chk("1.2 f(2+h)", expand(f.subs(x, 2 + h)), 6 + 5 * h + h**2)
chk("1.2 kvotient", simplify(dq(f, 2)), 5 + h)
chk("1.2 grense", grense(f, 2), 5)

chk("1.3a", grense(5 * x - 2, 4), 5)
chk("1.3b", grense(7 - 3 * x, 1), -3)

f = x**2 + 6 * x
chk("1.4 steg", simplify(dq(f, x)), 2 * x + h + 6)
chk("1.4a", deriv(f), 2 * x + 6)
chk("1.4b", deriv(f).subs(x, 2), 10)
chk("1.4c", deriv(f).subs(x, -1), 4)
chk("1.4b direkte", grense(f, 2), 10)

s = 2 * x**2 + x  # x spiller rollen til t
chk("1.5 s(3)", s.subs(x, 3), 21)
chk("1.5 kvotient", simplify(dq(s, 3)), 13 + 2 * h)
chk("1.5a", grense(s, 3), 13)
aapen("1.5b", "Tolkning: farten er 13 m/s ved t = 3 s")

# 1.6 finn første feil: f(x) = x^2 - 3x, a = 4
f = x**2 - 3 * x
chk("1.6 f(4)", f.subs(x, 4), 4)
p1 = ((4 + h) ** 2 - 3 * (4 + h) - 4) / h
p2 = (16 + 8 * h + h**2 - 12 - 3 * h - 4) / h
p3_feil = (11 * h + h**2) / h
p3_riktig = (5 * h + h**2) / h
sant("1.6 pil 1", simplify(dq(f, 4) - p1) == 0, "innsatt")
sant("1.6 pil 2", simplify(p1 - p2) == 0, "utvidet")
sant("1.6 pil 3 feil", simplify(p2 - p3_feil) != 0, "8h - 3h er 5h, ikke 11h")
sant("1.6 pil 3 riktig", simplify(p2 - p3_riktig) == 0, "riktig")
chk("1.6 riktig svar", grense(f, 4), 5)
chk("1.6 feil svar", limit(simplify(p3_feil), h, 0), 11)

# 1.7 CAS
f = 2 * x**2 - 5 * x
chk("1.7 f(3)", f.subs(x, 3), 3)
chk("1.7 f(3+h)-f(3)", expand(f.subs(x, 3 + h) - f.subs(x, 3)), 7 * h + 2 * h**2)
chk("1.7a kvotient", simplify(dq(f, 3)), 7 + 2 * h)
chk("1.7a", grense(f, 3), 7)
chk("1.7b CAS", limit((f.subs(x, 3 + h) - f.subs(x, 3)) / h, h, 0), 7)

# 1.8 alltid / noen ganger / aldri
# a) noen ganger: f(x) = x^2 - 6x i x = 4: f'(4) = 2 > 0, f(4) = -8 < 0
f = x**2 - 6 * x
chk("1.8a f'(4)", grense(f, 4), 2)
chk("1.8a f(4)", f.subs(x, 4), -8)
f = x**2
chk("1.8a eksempel der det stemmer", [grense(f, 3), f.subs(x, 3)], [6, 9])
# b) alltid: rett linje
k_, m_ = symbols("k_ m_")
lin = k_ * x + m_
chk("1.8b", simplify(dq(lin, a)), k_)
# c) noen ganger
chk("1.8c x^2 i 0", grense(x**2, 0), 0)
chk("1.8c x^3 i 0", grense(x**3, 0), 0)
chk("1.8c x^3 kvotient", simplify(dq(x**3, 0)), h**2)
sant("1.8c x^3 vokser", ((-1) ** 3 < 0 ** 3 < 1**3), "x^3 er voksende, ikke topp/bunn")

# 1.9 baklengs
f = 3 * x**2 + 2 * x
chk("1.9 kvotient", simplify(dq(f, 1)), 8 + 3 * h)
chk("1.9a", grense(f, 1), 8)
chk("1.9b alternativ", simplify(dq(f + 7, 1)), 8 + 3 * h)
aapen("1.9c", "Uendelig mange: konstanten kan velges fritt")

# 1.10 parameter
pp = symbols("pp")
f = pp * x**2 - x
chk("1.10 kvotient", simplify(dq(f, 2)), 4 * pp + pp * h - 1)
chk("1.10 f'(2)", grense(f, 2), 4 * pp - 1)
los("1.10", Eq(4 * pp - 1, 11), [3], var=pp)
chk("1.10 kontroll", grense(3 * x**2 - x, 2), 11)

# Sjekk 1
f = x**2 + 5
chk("Sjekk 1a", grense(f, 2), 4)
chk("Sjekk 1b f(2)", f.subs(x, 2), 9)
chk("Sjekk 1b f'(2)", grense(f, 2), 4)
aapen("Sjekk 1c", "0/0 har ingen verdi; forenkle og forkort h først")

# =====================================================================
# DEL 2
# =====================================================================
# ---------- Teoriboks ----------
kk = symbols("kk")
chk("Teori 2 (k)'", simplify(((kk) - (kk)) / h), 0)
chk("Teori 2 (kx)'", simplify((kk * (x + h) - kk * x) / h), kk)
chk("Teori 2 (x^2) steg", expand((x + h) ** 2 - x**2), 2 * x * h + h**2)
chk("Teori 2 (x^2)'", deriv(x**2), 2 * x)
chk("Teori 2 (x^3)'", deriv(x**3), 3 * x**2)
for n_ in range(1, 9):
    chk(f"Mønster n={n_}", deriv(x**n_), n_ * x ** (n_ - 1))

# ---------- Eksempel 1: (x^3)' ----------
chk("Eks 2.1 utvidet", expand((x + h) ** 3), x**3 + 3 * x**2 * h + 3 * x * h**2 + h**3)
chk("Eks 2.1 produkt", (x + h) * (x**2 + 2 * x * h + h**2), expand((x + h) ** 3))
chk("Eks 2.1 steg 3", (x**3 + 3 * x**2 * h + 3 * x * h**2 + h**3 - x**3) / h, (3 * x**2 * h + 3 * x * h**2 + h**3) / h)
chk("Eks 2.1 steg 4", (3 * x**2 * h + 3 * x * h**2 + h**3) / h, 3 * x**2 + 3 * x * h + h**2)
chk("Eks 2.1 grense", deriv(x**3), 3 * x**2)

# ---------- Eksempel 2: (f+g)' = f' + g' ----------
F, G = Function("F"), Function("G")
chk("Eks 2.2 omskriving",
    ((F(x + h) + G(x + h)) - (F(x) + G(x))) / h,
    (F(x + h) - F(x)) / h + (G(x + h) - G(x)) / h)
chk("Eks 2.2 eksempel", deriv(x**3 + x), 3 * x**2 + 1)
chk("Eks 2.2 eksempel steg", simplify(dq(x**3 + x, x)), 3 * x**2 + 3 * x * h + h**2 + 1)

# ---------- Vanlige feil ----------
chk("VF 2a tall", [(1 + 1) ** 3, 1**3 + 1**3], [8, 2])
chk("VF 2a", expand((x + h) ** 3 - (x**3 + h**3)), 3 * x**2 * h + 3 * x * h**2)
chk("VF 2b", deriv(x**4), 4 * x**3)
sant("VF 2b ikke", simplify(deriv(x**4) - 4 * x**4) != 0, "4x^3 er ikke 4x^4")
chk("VF 2c", deriv(Integer(5)), 0)
chk("VF 2d n=4", deriv(x**4), 4 * x**3)

# ---------- Oppgaver del 2 ----------
chk("2.1a", diff(x**5, x), 5 * x**4)
chk("2.1b", diff(x**9, x), 9 * x**8)
chk("2.1c", diff(x, x), 1)
chk("2.1d", deriv(Integer(12)), 0)

f = x**3
chk("2.2a f(2)", f.subs(x, 2), 8)
chk("2.2a f(2+h)", expand(f.subs(x, 2 + h)), 8 + 12 * h + 6 * h**2 + h**3)
chk("2.2b teller", expand(f.subs(x, 2 + h) - 8), 12 * h + 6 * h**2 + h**3)
chk("2.2b kvotient", simplify(dq(f, 2)), 12 + 6 * h + h**2)
chk("2.2c", grense(f, 2), 12)

chk("2.3a", diff(x**2, x).subs(x, 5), 10)
chk("2.3b", diff(x**3, x).subs(x, -1), 3)
los("2.3c", Eq(2 * x, 8), [4])
chk("2.3c kontroll", deriv(x**2).subs(x, 4), 8)

f = 2 * x**2 + 5 * x
chk("2.4 steg 1", expand(f.subs(x, x + h) - f), 4 * x * h + 2 * h**2 + 5 * h)
chk("2.4 steg 2", simplify(dq(f, x)), 4 * x + 2 * h + 5)
chk("2.4", deriv(f), 4 * x + 5)

f = 5 * x**2  # x spiller rollen til t
chk("2.5 kvotient", simplify(dq(f, x)), 10 * x + 5 * h)
chk("2.5a", deriv(f), 10 * x)
chk("2.5b", deriv(f).subs(x, 2), 20)
chk("2.5b direkte", grense(f, 2), 20)

# 2.6 finn første feil: f(x) = x^3 + 4x
f = x**3 + 4 * x
q1 = ((x + h) ** 3 + 4 * (x + h) - x**3 - 4 * x) / h
q2 = (x**3 + 3 * x**2 * h + 3 * x * h**2 + h**3 + 4 * x + 4 * h - x**3 - 4 * x) / h
q3_riktig = (3 * x**2 * h + 3 * x * h**2 + h**3 + 4 * h) / h
q4_feil = 3 * x**2 + 3 * x * h + h**2 + 4 * h
q4_riktig = 3 * x**2 + 3 * x * h + h**2 + 4
sant("2.6 pil 1", simplify(dq(f, x) - q1) == 0, "innsatt")
sant("2.6 pil 2", simplify(q1 - q2) == 0, "utvidet")
sant("2.6 pil 3", simplify(q2 - q3_riktig) == 0, "forenklet teller")
sant("2.6 pil 4 feil", simplify(q3_riktig - q4_feil) != 0, "4h / h er 4, ikke 4h")
sant("2.6 pil 4 riktig", simplify(q3_riktig - q4_riktig) == 0, "riktig")
chk("2.6 feil svar", limit(q4_feil, h, 0), 3 * x**2)
chk("2.6 riktig svar", deriv(f), 3 * x**2 + 4)

# 2.7 CAS, x^5
chk("2.7a", limit(((x + h) ** 5 - x**5) / h, h, 0), 5 * x**4)
chk("2.7b", expand((x + h) ** 5), x**5 + 5 * x**4 * h + 10 * x**3 * h**2 + 10 * x**2 * h**3 + 5 * x * h**4 + h**5)
chk("2.7c mønster", 5 * x ** (5 - 1), 5 * x**4)

# 2.8 (k f)' = k f'
kf = symbols("kf")
chk("2.8", ((kf * F(x + h)) - kf * F(x)) / h, kf * (F(x + h) - F(x)) / h)
chk("2.8 eksempel", deriv(7 * x**3), 7 * deriv(x**3))

# 2.9 alltid / noen / aldri
# a) (f g)' = f' g' : noen ganger. f = g = x: (x^2)' = 2x, men 1 * 1 = 1
chk("2.9a moteksempel", [deriv(x * x), diff(x, x) * diff(x, x)], [2 * x, 1])
# f = 1 (konstant), g = x: (1 * x)' = 1, 0 * 1 = 0  -> ikke lik. f = g = 0: 0 = 0
chk("2.9a stemmer", [deriv(Integer(0) * x), 0 * 0], [0, 0])
# b) alltid: f = g + 5
chk("2.9b", simplify(dq(G(x) + 5, x) - dq(G(x), x)), 0)

# 2.10 baklengs: f'(x) = 2x + 3, f(0) = 1
f = x**2 + 3 * x + 1
chk("2.10 f'", deriv(f), 2 * x + 3)
chk("2.10 f(0)", f.subs(x, 0), 1)
chk("2.10 med konstant c", deriv(x**2 + 3 * x + c), 2 * x + 3)
aapen("2.10b", "Uendelig mange: x^2 + 3x + c for hvilken som helst konstant c")

# Sjekk 2
chk("Sjekk 2a", diff(x**6, x), 6 * x**5)
chk("Sjekk 2b", deriv(x**2 + 9), 2 * x)
chk("Sjekk 2c", [(2 + 1) ** 3, 2**3 + 1**3], [27, 9])

# =====================================================================
# UTFORDRING
# =====================================================================
# U1
f = x**2 - 3 * x + 1
chk("U1 f(2)", f.subs(x, 2), -1)
chk("U1 kvotient", simplify(dq(f, 2)), 1 + h)
chk("U1a", grense(f, 2), 1)
tang = 1 * (x - 2) + f.subs(x, 2)
chk("U1b", tang, x - 3)

# U2
los("U2", Eq(deriv(x**2).subs(x, a), 8), [4], var=a)
chk("U2 punkt", (x**2).subs(x, 4), 16)
chk("U2 tangent", 8 * (x - 4) + 16, 8 * x - 16)

# U3 programmering: kjør koden slik den står
def derivert(fu, xv, hv):
    return (fu(xv + hv) - fu(xv)) / hv


def symmetrisk(fu, xv, hv):
    return (fu(xv + hv) - fu(xv - hv)) / (2 * hv)


def fp(xv):
    return xv**2


chk("U3a forover", round(derivert(fp, 3, 0.001), 4), 6.001)
chk("U3a symmetrisk", round(symmetrisk(fp, 3, 0.001), 4), 6.0)


def fk(xv):
    return xv**3


chk("U3b x^3 forover", round(derivert(fk, 2, 0.001), 4), 12.006)
chk("U3b x^3 symmetrisk", round(symmetrisk(fk, 2, 0.001), 4), 12.0)


def fi(xv):
    return 1 / xv


chk("U3b 1/x forover", round(derivert(fi, 2, 0.001), 4), -0.2499)
chk("U3b 1/x symmetrisk", round(symmetrisk(fi, 2, 0.001), 4), -0.25)
chk("U3c forover h=0.1", round(derivert(fp, 3, 0.1), 4), 6.1)
chk("U3c forover h=0.01", round(derivert(fp, 3, 0.01), 4), 6.01)
chk("U3c symmetrisk h=0.1", round(symmetrisk(fp, 3, 0.1), 4), 6.0)
chk("U3c x^3 symmetrisk h=0.1", round(symmetrisk(fk, 2, 0.1), 4), 12.01)

# U4 (x^4)'
chk("U4a kvadrert", expand((x**2 + 2 * x * h + h**2) ** 2),
    x**4 + 4 * x**3 * h + 6 * x**2 * h**2 + 4 * x * h**3 + h**4)
chk("U4a (x+h)^4", expand((x + h) ** 4), x**4 + 4 * x**3 * h + 6 * x**2 * h**2 + 4 * x * h**3 + h**4)
chk("U4a Pascal", [binomial(4, i) for i in range(5)], [1, 4, 6, 4, 1])
chk("U4b steg", simplify(dq(x**4, x)), 4 * x**3 + 6 * x**2 * h + 4 * x * h**2 + h**3)
chk("U4b", deriv(x**4), 4 * x**3)
chk("U4c", [binomial(n_, 1) for n_ in range(1, 8)], list(range(1, 8)))

# U5 (1/x)'
f = 1 / x
chk("U5 steg 1", dq(f, x), (1 / (x + h) - 1 / x) / h)
chk("U5 steg 2", (1 / (x + h) - 1 / x) / h, (x / (x * (x + h)) - (x + h) / (x * (x + h))) / h)
chk("U5 steg 3", (x / (x * (x + h)) - (x + h) / (x * (x + h))) / h, (-h / (x * (x + h))) / h)
chk("U5 steg 4", (-h / (x * (x + h))) / h, -1 / (x * (x + h)))
chk("U5a", deriv(f), -1 / x**2)
sant("U5b", all((-1 / v**2) < 0 for v in [-3, -1, Rational(1, 2), 2, 5]), "f'(x) < 0 overalt")

# U6 sqrt(x)'
f = sqrt(x)
xp = symbols("xp", positive=True)
fq = sqrt(xp)
steg1 = (sqrt(xp + h) - sqrt(xp)) / h
steg2 = (sqrt(xp + h) - sqrt(xp)) * (sqrt(xp + h) + sqrt(xp)) / (h * (sqrt(xp + h) + sqrt(xp)))
chk("U6 steg 1", steg1, steg2)
chk("U6 steg 2", steg2, h / (h * (sqrt(xp + h) + sqrt(xp))))
chk("U6 steg 3", h / (h * (sqrt(xp + h) + sqrt(xp))), 1 / (sqrt(xp + h) + sqrt(xp)))
chk("U6a", limit(steg1, h, 0), 1 / (2 * sqrt(xp)))
chk("U6b mønster", Rational(1, 2) * xp ** (Rational(1, 2) - 1), 1 / (2 * sqrt(xp)))

# U7 symmetrisk differansekvotient
chk("U7a", simplify(((x + h) ** 2 - (x - h) ** 2) / (2 * h)), 2 * x)
chk("U7b x^3 symmetrisk", simplify(((x + h) ** 3 - (x - h) ** 3) / (2 * h)), 3 * x**2 + h**2)
chk("U7b x^3 forover", simplify(dq(x**3, x)), 3 * x**2 + 3 * x * h + h**2)
chk("U7b x^2 forover", simplify(dq(x**2, x)), 2 * x + h)
aapen("U7c", "Forklaring: feilen er h^2 mot h")

rapport()
