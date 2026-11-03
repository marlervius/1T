"""Regner alle svar i 5.1 Sinus, cosinus og tangens på nytt. Kjøres av sjekk.py / bygg.py."""
import math
from kontroll import *

pi_ = pi


def gr(v):
    """Vinkel i grader -> radianer (sympy)."""
    return Rational(v) * pi_ / 180


def S_(v):
    return sin(gr(v))


def C_(v):
    return cos(gr(v))


def T_(v):
    return tan(gr(v))


def num(u):
    return float(N(u, 15))


def avr(u, d):
    """Avrund tall til d desimaler, og sjekk at vi ikke ligger nær en avrundingsgrense."""
    v = num(u)
    skala = 10**d
    rest = abs(v * skala - math.floor(v * skala) - 0.5)
    assert rest > 0.03, f"nær avrundingsgrense: {v}"
    return round(v, d)


def invsin(r):
    return num(asin(r) * 180 / pi_)


def invcos(r):
    return num(acos(r) * 180 / pi_)


def invtan(r):
    return num(atan(r) * 180 / pi_)


# =============== EKSEMPLER ===============
# Eks 1.1: hypotenus 8,0, v = 28 grader, motstående katet
chk("Eks 1.1", avr(8 * S_(28), 1), 3.8)
chk("Eks 1.1 hosl", avr(8 * C_(28), 1), 7.1)
sant("Eks 1.1 kontroll", num(8 * S_(28)) ** 2 + num(8 * C_(28)) ** 2 - 64 < 1e-9, "Pytagoras")
# Eks 1.2: motstående 5,0 og hosliggende 7,0
chk("Eks 1.2", avr(invtan(Rational(5, 7)), 1), 35.5)
chk("Eks 1.2 kontroll", avr(T_(Rational(355, 10)), 2), 0.71)
# DEG mot RAD
chk("Del 1 feil radianer", avr(sin(30), 3), -0.988)
chk("Del 1 feil sin^-1", [invsin(Rational(1, 2)), num(1 / S_(30))], [30, 2])

# Eks 2.1 likesidet trekant side 2
chk("Eks 2.1 steg 1", sqrt(2**2 - 1**2), sqrt(3))
chk("Eks 2.1 sin60", sqrt(3) / 2, S_(60))
chk("Eks 2.1 cos60", Rational(1, 2), C_(60))
chk("Eks 2.1 tan60", sqrt(3), T_(60))
chk("Eks 2.1 sin30", Rational(1, 2), S_(30))
chk("Eks 2.1 cos30", sqrt(3) / 2, C_(30))
chk("Eks 2.1 tan30", sqrt(3) / 3, T_(30))
chk("Eks 2.1 tan30 b", 1 / sqrt(3), sqrt(3) / 3)
# Halvt kvadrat
chk("Del 2 tabell 45", [1 / sqrt(2), sqrt(2) / 2, S_(45), C_(45), T_(45)], [sqrt(2) / 2] * 4 + [1])
chk("Del 2 diagonal", sqrt(1**2 + 1**2), sqrt(2))
# Eks 2.2
chk("Eks 2.2 sin150", S_(150), Rational(1, 2))
chk("Eks 2.2 cos150", C_(150), -sqrt(3) / 2)
chk("Eks 2.2 kontroll", Rational(1, 2) ** 2 + (sqrt(3) / 2) ** 2, 1)
# Vanlig feil del 2
chk("VF 2a", [S_(60), 2 * S_(30)], [sqrt(3) / 2, 1])
sant("VF 2a ulik", simplify(S_(60) - 2 * S_(30)) != 0, "sin60 != 2 sin30")
chk("VF 2b", [S_(30), S_(150)], [Rational(1, 2), Rational(1, 2)])
chk("VF 2c", [C_(30), C_(150)], [sqrt(3) / 2, -sqrt(3) / 2])
# Identiteten og tabell
for v in (30, 45, 60, 100, 150):
    chk(f"Del 2 identitet {v}", simplify(S_(v) ** 2 + C_(v) ** 2), 1)

# =============== DEL 1 ===============
# 1.1: 5, 12, 13
h13 = sqrt(5**2 + 12**2)
chk("1.1a", Rational(5) / h13, Rational(5, 13))
chk("1.1 hyp", sqrt(5**2 + 12**2), 13)
chk("1.1 sin/cos/tan", [5 / h13, 12 / h13, Rational(5, 12)], [Rational(5, 13), Rational(12, 13), Rational(5, 12)])
# 1.2 fullfør: sin v = 0,8 og hypotenus 15
chk("1.2a", Rational(8, 10) * 15, 12)
chk("1.2b", sqrt(15**2 - 12**2), 9)
chk("1.2c", Rational(9, 15), Rational(3, 5))
# 1.3
chk("1.3a", avr(S_(25), 3), 0.423)
chk("1.3b", avr(C_(64), 3), 0.438)
chk("1.3c", avr(T_(55), 3), 1.428)
chk("1.3d", avr(invtan(2), 1), 63.4)
# 1.4: 9 og 40
chk("1.4a", sqrt(9**2 + 40**2), 41)
h41 = sqrt(9**2 + 40**2)
chk("1.4b", [9 / h41, 40 / h41, Rational(9, 40)], [Rational(9, 41), Rational(40, 41), Rational(9, 40)])
# 1.5
chk("1.5a", avr(12 * C_(37), 1), 9.6)
chk("1.5b", avr(9 * T_(42), 1), 8.1)
chk("1.5c", avr(Rational(55, 10) / S_(33), 1), 10.1)
# 1.6 stige
chk("1.6a", avr(invcos(Rational(15, 10) / 5), 1), 72.5)
chk("1.6b", avr(sqrt(25 - Rational(225, 100)), 1), 4.8)
chk("1.6b alt", avr(5 * S_(Rational(725, 10)), 1), 4.8)
# 1.7 feil: første feil er overgangen til 14 * (-0,667)
sant("1.7 pil 1", abs(num(C_(40)) * 14 - 14 * num(C_(40))) < 1e-12, "cos 40 = x/14 gir x = 14 cos 40")
chk("1.7 radianer", avr(cos(40), 3), -0.667)
chk("1.7 riktig", avr(14 * C_(40), 1), 10.7)
chk("1.7 feil svar", avr(14 * cos(40), 1), -9.3)
# 1.8
sant("1.8a", all(num(S_(v)) < 1 for v in range(1, 90)), "sin v < 1 for spisse v")
sant("1.8b", num(Rational(3, 4)) < 1 < num(Rational(4, 3)), "tan v < 1 noen ganger")
sant("1.8c", all(num(S_(v) + C_(v)) > 1 for v in range(1, 90)), "sin v + cos v > 1 for spisse v")
sant("1.8c ulikhet", (3 + 4) > 5 and (5 + 12) > 13, "a + b > c")
# 1.9
a_, b_, c_ = symbols("a_ b_ c_", positive=True)
chk("1.9", simplify((a_ / c_) / (b_ / c_) - a_ / b_), 0)
# 1.10 tan v = 7/24, hypotenus 50
k_ = Rational(50, 25)
chk("1.10 sider", [7 * k_, 24 * k_], [14, 48])
chk("1.10 pytagoras", 14**2 + 48**2, 50**2)
chk("1.10 tan", Rational(14, 48), Rational(7, 24))
# Sjekk 1
chk("Sjekk 1a", Rational(sqrt(25**2 - 7**2), 25), Rational(24, 25))
chk("Sjekk 1b", avr(S_(50), 2), 0.77)
aapen("Sjekk 1c", "Trekantene er formlike (samme vinkler), så forholdet mellom sidene er likt.")

# =============== DEL 2 ===============
# 2.1
chk("2.1a", S_(30), Rational(1, 2))
chk("2.1b", C_(60), Rational(1, 2))
chk("2.1c", T_(45), 1)
chk("2.1d", C_(45), sqrt(2) / 2)
# 2.2
chk("2.2a", 14 * S_(30), 7)
chk("2.2b", 14 * C_(30), 7 * sqrt(3))
chk("2.2 pytagoras", 7**2 + (7 * sqrt(3)) ** 2, 14**2)
# 2.3
chk("2.3a", cos(0), 1)
chk("2.3b", sin(pi_ / 2), 1)
chk("2.3c", cos(pi_), -1)
chk("2.3d", sin(pi_), 0)
# 2.4
chk("2.4a", S_(120), sqrt(3) / 2)
chk("2.4b", S_(135), sqrt(2) / 2)
chk("2.4c", C_(135), -sqrt(2) / 2)
chk("2.4d", C_(120), -Rational(1, 2))
# 2.5
chk("2.5a", [avr(invsin(Rational(8, 10)), 1), avr(180 - invsin(Rational(8, 10)), 1)], [53.1, 126.9])
chk("2.5b", avr(invcos(-Rational(1, 4)), 1), 104.5)
chk("2.5c", [avr(invsin(Rational(92, 100)), 1), avr(180 - invsin(Rational(92, 100)), 1)], [66.9, 113.1])
chk("2.5 sjekk", [avr(S_(Rational(1269, 10)), 2), avr(S_(Rational(531, 10)), 2)], [0.8, 0.8])
# 2.6
chk("2.6a", [S_(90), 2 * S_(45)], [1, sqrt(2)])
sant("2.6a ulik", simplify(S_(90) - 2 * S_(45)) != 0, "sin 90 != 2 sin 45")
chk("2.6b", [sin(2 * 0), 2 * sin(0)], [0, 0])
# 2.7
chk("2.7 steg 2", 1 - Rational(8, 17) ** 2, Rational(225, 289))
chk("2.7 steg 3", sqrt(Rational(225, 289)), Rational(15, 17))
sant("2.7 feil", Rational(15, 17) > 0, "stump vinkel har negativ cosinus; første feil er steget til cos v = 15/17")
chk("2.7 riktig cos", -Rational(15, 17), -sqrt(Rational(225, 289)))
chk("2.7 v", avr(invcos(-Rational(15, 17)), 1), 151.9)
chk("2.7 kontroll", avr(S_(Rational(1519, 10)), 3), 0.471)
chk("2.7 kontroll 8/17", avr(Rational(8, 17), 3), 0.471)
chk("2.7 feil v", avr(invcos(Rational(15, 17)), 1), 28.1)
# 2.8
sant("2.8a", C_(60) > 0 and C_(120) < 0, "cos v > 0 noen ganger")
chk("2.8b", [S_(45), C_(45)], [sqrt(2) / 2, sqrt(2) / 2])
sant("2.8b bare 45", [v for v in range(0, 181) if abs(num(S_(v)) - num(C_(v))) < 1e-12] == [45], "kun v = 45")
sant("2.8c", len({round(num(C_(v)), 12) for v in range(0, 181)}) == 181, "cosinus er forskjellig for alle hele grader")
# 2.9
sant("2.9", all(not (v1 + (180 - v1) < 180) for v1 in range(1, 180)), "v1 + (180 - v1) = 180, ikke mulig i en trekant")
sant("2.9 b", all(abs(num(S_(v)) - num(S_(180 - v))) < 1e-12 for v in range(0, 181)), "sin v = sin(180 - v)")
# Sjekk 2
chk("Sjekk 2a", T_(60), sqrt(3))
los("Sjekk 2b", Eq(sin(x), sqrt(3) / 2), [pi_ / 3, 2 * pi_ / 3], var=x, domene=Interval(0, pi_))
chk("Sjekk 2c", simplify(S_(100) ** 2 + C_(100) ** 2), 1)

# =============== UTFORDRING ===============
chk("U1a", avr(Rational(15, 10) / S_(8), 1), 10.8)
chk("U1b", avr(Rational(15, 10) / T_(8), 1), 10.7)
chk("U2a", C_(30) ** 2 - S_(30) ** 2, Rational(1, 2))
chk("U2b", 2 * S_(45) * C_(45), 1)
chk("U2c", S_(135) * C_(135), -Rational(1, 2))
chk("U3a", 8 * S_(60), 4 * sqrt(3))
chk("U3a b", sqrt(8**2 - 4**2), 4 * sqrt(3))
chk("U3b", Rational(1, 2) * 8 * 4 * sqrt(3), 16 * sqrt(3))
s_ = symbols("s_", positive=True)
chk("U3c", Rational(1, 2) * s_ * (s_ * S_(60)), sqrt(3) / 4 * s_**2)
# U4 programmering: kjører koden fra oppgaven
paar = []
tabell = {}
for v in range(0, 181, 15):
    tabell[v] = (round(math.sin(math.radians(v)), 3), round(math.cos(math.radians(v)), 3))
for v in tabell:
    for w in tabell:
        if v < w and tabell[v][0] == tabell[w][0]:
            paar.append((v, w))
chk("U4a", len(tabell), 13)
sant("U4b", paar == [(0, 180), (15, 165), (30, 150), (45, 135), (60, 120), (75, 105)], "seks par")
sant("U4b sum", all(v + w == 180 for v, w in paar), "parene summerer til 180")
sant("U4 cos", len({tabell[v][1] for v in tabell}) == 13, "cos aldri lik for to vinkler")
chk("U4 rad", round(math.sin(30), 3), -0.988)
# U5: tre
h_ = symbols("h_", positive=True)
l = solve([Eq(x * T_(50), h_), Eq((x + 20) * T_(30), h_)], [x, h_], dict=True)[0]
chk("U5 h", avr(l[h_], 1), 22.4)
chk("U5 x", avr(l[x], 1), 18.8)
chk("U5 alt", avr(20 / (1 / T_(30) - 1 / T_(50)), 1), 22.4)
aapen("U6", "Bevis: P = (cos v, sin v) ligger på enhetssirkelen, så x^2 + y^2 = 1. Alternativt: symmetri med 180 - v.")
chk("U6 symmetri", simplify(S_(135) ** 2 + C_(135) ** 2), 1)
# U7: sin v < tan v
sant("U7", all(num(S_(v)) < num(T_(v)) for v in range(1, 90)), "sin v < tan v for spisse v")
chk("U7 omskriving", simplify(tan(x) - sin(x) / cos(x)), 0)
aapen("U7b", "Begrunnelse: tan v = sin v / cos v og 0 < cos v < 1.")

rapport()
