"""Regner alle svar i 4.1 Gjennomsnittlig og momentan vekstfart på nytt."""
import contextlib
import io

from kontroll import *

x1, x2, h = symbols("x1 x2 h")


def gv(uttrykk, fra, til):
    """Gjennomsnittlig vekstfart for uttrykk (i x) på [fra, til]."""
    u = sympify(uttrykk)
    return (u.subs(x, til) - u.subs(x, fra)) / (til - fra)


def sek(uttrykk, punkt, hh):
    """Sekantens stigningstall mellom x = punkt og x = punkt + hh."""
    return gv(uttrykk, punkt, punkt + hh)


R = Rational

# ---------- Eksempler del 1 ----------
f = x**2 - 2 * x
chk("Eks 1.1 steg 1", f.subs(x, 1), -1)
chk("Eks 1.1 steg 2", f.subs(x, 4), 8)
chk("Eks 1.1 steg 3", (8 - (-1)) / (4 - 1), 3)
chk("Eks 1.1 svar", gv(f, 1, 4), 3)
sant("Eks 1.1 kontroll sekant y=3x-4", (3 * 1 - 4 == -1) and (3 * 4 - 4 == 8), "linja går gjennom begge punkt")
# Eks 1.2: temperatur
chk("Eks 1.2", R(13 - 4, 12 - 6), R(3, 2))
# Vanlig feil del 1
chk("VF 1a gjennomsnitt av verdier", R(-1 + 8, 2), R(7, 2))
sant("VF 1a er feil", R(-1 + 8, 2) != gv(f, 1, 4), "3,5 er ikke 3")
chk("VF 1b fortegn", R(-1 - 8, 4 - 1), -3)
sant("VF 1b er feil", R(-1 - 8, 4 - 1) != gv(f, 1, 4), "-3 er ikke 3")
fx = x**2
chk("VF 1d gjennomsnitt 0 ikke konstant", gv(fx, -2, 2), 0)
sant("VF 1d ikke konstant", fx.subs(x, 0) != fx.subs(x, 2), "f(0)=0, f(2)=4")

# ---------- Del 1 ----------
g = x**2 + x
chk("1.1a", gv(g, 0, 3), 4)
chk("1.1b", gv(g, 1, 3), 5)
chk("1.1c", gv(g, -1, 2), 2)

g = x**2 - 6 * x
chk("1.2 p(1)", g.subs(x, 1), -5)
chk("1.2 p(3)", g.subs(x, 3), -9)
chk("1.2 Delta y", -9 - (-5), -4)
chk("1.2 svar", gv(g, 1, 3), -2)

s = {0: 0, 1: 70, 2: 150, 3: 210}
chk("1.3a", R(s[2] - s[0], 2 - 0), R(75))
chk("1.3b", R(s[3] - s[1], 3 - 1), R(70))
fart = [R(s[i + 1] - s[i], 1) for i in range(3)]
chk("1.3c", fart, [70, 80, 60])
chk("1.3c størst", fart.index(max(fart)), 1)

g = -x**2 + 4 * x
chk("1.4 punkt", [g.subs(x, v) for v in range(5)], [0, 3, 4, 3, 0])
chk("1.4a", gv(g, 0, 1), 3)
chk("1.4b", gv(g, 1, 4), -1)
chk("1.4c", gv(g, 0, 3), 1)
chk("1.4d", gv(g, 1, 3), 0)
sant("1.4e ikke konstant", g.subs(x, 2) != g.subs(x, 1), "f(2)=4, f(1)=3")

V = lambda t: 240000 * R(8, 10) ** t
chk("1.5 V(3)", V(3), R(122880))
chk("1.5 V(5)", V(5), R(78643.2).limit_denominator(10))
chk("1.5a", round(float((V(3) - V(0)) / 3), -2), -39000.0)
chk("1.5a eksakt", (V(3) - V(0)) / 3, R(-39040))
chk("1.5b", round(float((V(5) - V(3)) / 2), -2), -22100.0)
chk("1.5b eksakt", float((V(5) - V(3)) / 2), -22118.4, tol=1e-6)

aapen("1.5c", "Tapet er 20 % av en mindre verdi, så færre kroner per år.")
f6 = x**2 - 3 * x
chk("1.6 f(2)", f6.subs(x, 2), -2)
chk("1.6 f(6)", f6.subs(x, 6), 18)
sant("1.6 pil 1 riktig", f6.subs(x, 2) == -2 and f6.subs(x, 6) == 18, "f(2) og f(6)")
sant("1.6 pil 2 feil (Delta y feil vei)", (f6.subs(x, 2) - f6.subs(x, 6)) / (6 - 2) != gv(f6, 2, 6), "-5 er ikke 5")
chk("1.6 pil 3 følger av feilen", R(-2 - 18, 4), -5)
chk("1.6 riktig svar", gv(f6, 2, 6), 5)

k_, m_ = symbols("k m")
chk("1.7a", simplify(((k_ * b + m_) - (k_ * a + m_)) / (b - a)), k_)
chk("1.7b", simplify((b**2 - a**2) / (b - a)), a + b)
sant("1.7b positiv", gv(fx, 1, 2) > 0, "[1,2]: 3")
sant("1.7b negativ", gv(fx, -3, 2) < 0, "[-3,2]: -1")
chk("1.7b eks", gv(fx, -3, 2), -1)
sant("1.7c ikke mellom", not (fx.subs(x, 10) < gv(fx, 10, 11) < fx.subs(x, 11)), "[10,11]: 21 ligger ikke mellom 100 og 121")
sant("1.7c mellom", fx.subs(x, 0) < gv(fx, 0, 2) < fx.subs(x, 2), "[0,2]: 2 ligger mellom 0 og 4")

chk("1.8a", 5 + (-3) * (6 - 2), -7)
los("1.8b", Eq(gv(x**2 + a * x, 1, 5), 3), [-3], var=a)

gS = x**2 + 3 * x
chk("Sjekk 1a", gv(gS, 0, 2), 5)
chk("Sjekk 1b", R(6 - 12, 17 - 14), -2)
aapen("Sjekk 1c", "Negativ gjennomsnittlig vekstfart: funksjonen synker i snitt.")

# ---------- Eksempler del 2 ----------
fk = x**2
chk("Eks 2.1 h=1", sek(fk, 3, 1), 7)
chk("Eks 2.1 h=0,1", sek(fk, 3, R(1, 10)), R(61, 10))
chk("Eks 2.1 h=0,01", sek(fk, 3, R(1, 100)), R(601, 100))
chk("Eks 2.1 h=0,001", sek(fk, 3, R(1, 1000)), R(6001, 1000))
chk("Eks 2.1 f(3,1)", R(31, 10) ** 2, R(961, 100))
chk("Eks 2.1 f(3,01)", R(301, 100) ** 2, R(90601, 10000))
chk("Eks 2.1 f(3,001)", R(3001, 1000) ** 2, R(9006001, 1000000))
gk = x**2 / 4
sant("Eks 2.2 punkt på tangent y=x-1", (0 - 1 == -1) and (4 - 1 == 3) and gk.subs(x, 2) == 1 and (2 - 1 == 1), "(0,-1),(4,3),(2,1)")
chk("Eks 2.2 stigningstall", R(3 - (-1), 4 - 0), 1)
chk("Eks 2.2 h=0,1", sek(gk, 2, R(1, 10)), R(1025, 1000))
chk("Eks 2.2 h=0,01", sek(gk, 2, R(1, 100)), R(10025, 10000))
# Vanlige feil del 2
chk("VF 2a f(3)", fk.subs(x, 3), 9)
sant("VF 2a er feil", fk.subs(x, 3) != 6, "f(3)=9, tilnærmet vekstfart 6")
sant("VF 2c h=1 er ikke eksakt", sek(fk, 3, 1) != 6, "7 er ikke 6")
chk("VF 2c rett linje", sek(3 * x + 2, 5, 1), 3)
chk("VF 2c x^3 i -1/3 med h=1", sek(x**3, R(-1, 3), 1), R(1, 3))
chk("VF 2c x^3 momentan i -1/3 er 1/3", [sek(x**3, R(-1, 3), R(1, 10**i)) for i in (4,)][0].evalf(6), R(1, 3).evalf(6), tol=1e-3)

# ---------- Del 2 ----------
chk("2.1 h=1", sek(fk, 1, 1), 3)
chk("2.1 f(1,1)", R(11, 10) ** 2, R(121, 100))
chk("2.1 h=0,1", sek(fk, 1, R(1, 10)), R(21, 10))
chk("2.1 f(1,01)", R(101, 100) ** 2, R(10201, 10000))
chk("2.1 h=0,01", sek(fk, 1, R(1, 100)), R(201, 100))
chk("2.1 tilnærming", [sek(fk, 1, R(1, 10**i)) for i in (3, 4)], [R(2001, 1000), R(20001, 10000)])

d = x**2 - 4 * x + 5
chk("2.2 punkt", [d.subs(x, v) for v in range(5)], [5, 2, 1, 2, 5])
sant("2.2 tangent y=-2x+4 gjennom (1,2), (0,4), (2,0)", all(-2 * p + 4 == q for p, q in [(1, 2), (0, 4), (2, 0)]), "punkt")
chk("2.2a", R(0 - 4, 2 - 0), -2)
sant("2.2b avtagende", sek(d, 1, R(1, 1000)) < 0, "negativ")
chk("2.2c", sek(d, 1, R(1, 100)), R(-199, 100))
chk("2.2d", [sek(d, 2, R(1, 10**i)) for i in (2, 3)], [R(1, 100), R(1, 1000)])
sant("2.2d tilnærmer 0", sek(d, 2, R(1, 10**6)) < R(1, 10**5), "nær 0")

aapen("2.3a", "momentan: 70 km/h i et øyeblikk")
chk("2.3b", R(270, 3), 90)
chk("2.3c", R(10 - 4, 9 - 6), 2)
aapen("2.3d", "momentan: 3 °C per time akkurat nå")

k3 = x**3
chk("2.4a h=1", sek(k3, 1, 1), 7)
chk("2.4a h=0,1", sek(k3, 1, R(1, 10)), R(331, 100))
chk("2.4a h=0,01", sek(k3, 1, R(1, 100)), R(30301, 10000))
chk("2.4a h=0,001", sek(k3, 1, R(1, 1000)), R(3003001, 1000000))
sant("2.4b nærmer seg 3", abs(sek(k3, 1, R(1, 10**6)) - 3) < R(1, 10**5), "tre")
chk("2.4c h=0,01", sek(k3, 2, R(1, 100)), R(120601, 10000))
chk("2.4c h=0,001", sek(k3, 2, R(1, 1000)), R(12006001, 1000000))

sd = {0: 0, 10: 60, 20: 150, 30: 270, 40: 400, 50: 520, 60: 620}
chk("2.5a", R(sd[60] - sd[0], 60), R(31, 3))
sant("2.5a avrundet", round(float(R(31, 3)), 1) == 10.3, "10,3 m/s")
chk("2.5b [20,30]", R(sd[30] - sd[20], 10), 12)
chk("2.5b [30,40]", R(sd[40] - sd[30], 10), 13)
chk("2.5b anslag", R(12 + 13, 2), R(25, 2))
aapen("2.5c", "Gjennomsnittsfart gjelder et intervall; farten ved t=30 er fart i et øyeblikk.")

f26 = x**2 - x
chk("2.6 f(2)", f26.subs(x, 2), 2)
chk("2.6 f(2,1)", f26.subs(x, R(21, 10)), R(231, 100))
sant("2.6 pil 1 riktig", R(21, 10) ** 2 - R(21, 10) - 2 == R(441, 100) - R(21, 10) - 2, "f(2,1) satt inn")
chk("2.6 pil 2 riktig", (R(441, 100) - R(21, 10) - 2) / R(1, 10), (R(231, 100) - 2) / R(1, 10))
chk("2.6 pil 3 riktig", (R(231, 100) - 2) / R(1, 10), R(31, 100) / R(1, 10))
sant("2.6 siste pil feil", R(31, 100) / R(1, 10) != R(31, 1000), "0,31/0,1 = 3,1, ikke 0,031")
chk("2.6 riktig svar", sek(f26, 2, R(1, 10)), R(31, 10))

chk("2.7a", gv(fk, 2, 8), 10)
chk("2.7b h=0,1", sek(fk, 5, R(1, 10)), R(101, 10))
chk("2.7b h=0,01", sek(fk, 5, R(1, 100)), R(1001, 100))
chk("2.7c snitt", gv(fk, -3, 1), -2)
chk("2.7c h=0,01", sek(fk, -1, R(1, 100)), R(-199, 100))
chk("2.7c h=0,001", sek(fk, -1, R(1, 1000)), R(-1999, 1000))
chk("2.7c generelt", simplify(gv(fk, x1, x2).subs({x1: 2, x2: 8})), 10)

# 2.8: tabell 5; 4,1; 4,01 hører til x^2 i x = 2
chk("2.8 passer x^2", [sek(fk, 2, R(1, 10**i)) for i in (0, 1, 2)], [5, R(41, 10), R(401, 100)])
aapen("2.8a", "Anslag 4")
aapen("2.8b", "4,5 er ikke mulig: tallene faller fra 5 mot 4")
sant("2.8c", all(sek(fk, 2, R(1, 10**i)) > 4 for i in range(0, 4)), "x^2: alltid over 4")

f1 = x**2 + 1
chk("Sjekk 2a f(0,1)", f1.subs(x, R(1, 10)), R(101, 100))
chk("Sjekk 2a", sek(f1, 0, R(1, 10)), R(1, 10))
chk("Sjekk 2b", R(5 - 1, 2 - 0), 2)
aapen("Sjekk 2c", "Sekanten dreier mot tangenten når det andre punktet nærmer seg det første.")

# ---------- Utfordring ----------
u1 = 2 * x**2 - 3 * x + 1
chk("U1a", gv(u1, 1, 3), 5)
chk("U1b", gv(u1, -1, 2), -1)
los("U1c", Eq(gv(u1, 0, a), 5), [4], var=a)

u2 = 2**x
chk("U2 verdier", [gv(u2, 0, 2), gv(u2, 2, 4), gv(u2, 4, 6)], [R(3, 2), 6, 24])
chk("U2 faktor", simplify(gv(2**x, a + 2, a + 4) / gv(2**x, a, a + 2)), 4)

T = lambda t: 20 + 60 * 0.9**t
chk("U3a", round(float((T(5) - T(0)) / 5), 1), -4.9)
chk("U3b", round(float((T(10) - T(5)) / 5), 1), -2.9)
chk("U3c", round(float((T(5.01) - T(5)) / 0.01), 2), -3.73)
chk("U3c h=0,001", round(float((T(5.001) - T(5)) / 0.001), 2), -3.73)


def kjor(kode):
    ut = io.StringIO()
    with contextlib.redirect_stdout(ut):
        exec(kode, {})
    return ut.getvalue().strip().splitlines()


KODE = """def f(x):
    return 2**x

for k in range(9):
    h = 10**(-k)
    print(h, (f(0 + h) - f(0)) / h)
"""
linjer = kjor(KODE)
chk("U4a antall linjer", len(linjer), 9)
chk("U4a første linje", linjer[0], "1 1.0")
sant("U4b nærmer seg 0,693", abs(float(linjer[8].split()[1]) - 0.693147) < 1e-6, linjer[8])
KODE3 = KODE.replace("f(0 + h) - f(0)", "f(3 + h) - f(3)")
l3 = kjor(KODE3)
sant("U4c x=3 gir ca. 5,545", abs(float(l3[8].split()[1]) - 5.5452) < 1e-4, l3[8])
sant("U4c forhold 8", abs(float(l3[8].split()[1]) / float(linjer[8].split()[1]) - 8) < 1e-3, "8 ganger så stor")

l17 = kjor(KODE.replace("range(9)", "range(17)"))
sant("U7 k=15 avviker", abs(float(l17[15].split()[1]) - 0.6931) > 0.02, l17[15])
chk("U7 k=16", l17[16].split()[1], "0.0")
bedre = min(range(17), key=lambda i: abs(float(l17[i].split()[1]) - 0.693147180559945))
sant("U7 beste h er rundt 1e-8", bedre in (7, 8), l17[bedre])
aapen("U7b", "Forklaring: avrundingsfeil når 2**h - 1 er ekstremt liten.")

aapen("U5c", "Vekstfart x1+x2 for x^2; midtpunkt m gir 2m = x1+x2.")
chk("U5c", sek(x**2, (x1 + x2) / 2, h).subs(h, 0) if False else simplify(gv(x**2, x1, x2) - 2 * (x1 + x2) / 2), 0)
# U5 bevis
A, B, C = symbols("A B C")
q = A * x**2 + B * x + C
chk("U5a", simplify((q.subs(x, x2) - q.subs(x, x1)) / (x2 - x1)), A * (x1 + x2) + B)
chk("U5b", simplify(((A * x**2 + B * x + C).subs(x, x + h) - (A * x**2 + B * x + C)) / h).subs({A: 1, B: 0, C: 0, x: 3}), 6 + h)

u6 = -x**2 + 6 * x
los("U6a", Eq(gv(u6, 1, b), 0), [5], var=b)
chk("U6a b=1 er ikke et intervall", gv(u6, 1, 5), 0)
chk("U6b generelt", simplify(gv(u6, a, b)), 6 - a - b)
chk("U6b sum 6", [gv(u6, p, 6 - p) for p in (0, 1, 2, R(5, 2))], [0, 0, 0, 0])
chk("U6c toppunkt", u6.subs(x, 3), 9)
chk("U6d eksempel", gv(x * (x - 4), 0, 4), 0)
sant("U6d ikke konstant", (x * (x - 4)).subs(x, 1) != (x * (x - 4)).subs(x, 0), "-3 mot 0")

rapport()
