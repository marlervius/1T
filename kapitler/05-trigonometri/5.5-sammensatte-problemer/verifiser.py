"""Regner alle svar i 5.5 Sammensatte problemer på nytt. Kjøres av sjekk.py / bygg.py."""
import io
import math
import contextlib
from kontroll import *


def S_(v):
    return sin(rad(v))


def C_(v):
    return cos(rad(v))


def T_(v):
    return tan(rad(v))


def num(u):
    return float(N(u, 15))


def kurs(dx, dy):
    """Kurs i grader fra nord (med klokka) til vektor (dx = øst, dy = nord)."""
    k = math.degrees(math.atan2(dx, dy))
    return k % 360


def pol(kursgrader, lengde):
    """Kurs og lengde -> (øst, nord)."""
    k = math.radians(kursgrader)
    return (lengde * math.sin(k), lengde * math.cos(k))


# =============== DEL 1 — EKSEMPLER ===============
# Eks 1.1: firkant ABCD, AB = AD = 4, A = 60, BC = 3, DBC = 90
chk("Eks 1.1 BD^2", 4**2 + 4**2 - 2 * 4 * 4 * C_(60), 16)
chk("Eks 1.1 BD", sqrt(4**2 + 4**2 - 2 * 4 * 4 * C_(60)), 4)
chk("Eks 1.1 CD^2", 4**2 + 3**2, 25)
chk("Eks 1.1 CD", sqrt(4**2 + 3**2), 5)
chk("Eks 1.1 T_ABD", Rational(1, 2) * 4 * 4 * S_(60), 4 * sqrt(3))
chk("Eks 1.1 T_BCD", Rational(1, 2) * 4 * 3, 6)
chk("Eks 1.1 T", 4 * sqrt(3) + 6, Rational(1, 2) * 4 * 4 * S_(60) + 6)
sant("Eks 1.1 kontroll", (180 - 60) / 2 == 60, "ABD likebeint med toppvinkel 60: base-vinkler 60, likesidet")
# figur: C = B + 3*(sqrt3/2, 1/2), D = (2, 2 sqrt3)
sant("Eks 1.1 figur", abs(3 * math.sqrt(3) / 2 - 2.598) < 1e-3 and abs((4 + 2.598) - 6.598) < 1e-3, "koordinater")

# Eks 1.2: ABC, D paa BC med AD vinkelrett, B = 45, C = 30, BC = 2 + 2 sqrt3
chk("Eks 1.2 tan45", T_(45), 1)
h_ = symbols("h", positive=True)
chk("Eks 1.2 BD", h_ / T_(45), h_)
chk("Eks 1.2 DC", h_ / T_(30), sqrt(3) * h_)
los("Eks 1.2 h", Eq(h_ + sqrt(3) * h_, 2 + 2 * sqrt(3)), [2], var=h_)
chk("Eks 1.2 T", Rational(1, 2) * (2 + 2 * sqrt(3)) * 2, 2 + 2 * sqrt(3))
chk("Eks 1.2 kontroll", 2 / T_(45) + 2 / T_(30), 2 + 2 * sqrt(3))
chk("Eks 1.2 figur C", 2 + 2 * sqrt(3), 5.4641016, tol=1e-6)

# =============== DEL 1 — VANLIGE FEIL ===============
chk("VF 1a", [S_(60), Integer(1)], [sqrt(3) / 2, 1])
sant("VF 1a ulik", S_(60) != 1, "motstaaende/hypotenus = 1 i likesidet, men sin 60 = sqrt3/2")
chk("VF 1b", 180 - 60, 120)
aapen("VF 1c", "SVS har ingen vinkel-side-par; sinussetningen trenger et par")

# =============== DEL 1 — OPPGAVER ===============
# 1.1 hvilken setning (kjent -> setning)
def velg(kjent):
    if kjent == "to vinkler og en side" or kjent == "SSV":
        return "sinussetningen"
    if kjent in ("SVS", "SSS"):
        return "cosinussetningen"
    if kjent == "areal":
        return "arealsetningen"
    return "?"


chk("1.1a", velg("to vinkler og en side"), "sinussetningen")
chk("1.1b", velg("SVS"), "cosinussetningen")
chk("1.1c", velg("SSS"), "cosinussetningen")
chk("1.1d", velg("areal"), "arealsetningen")

# 1.2 AD høyde, B = 60, AB = 6, C = 45
chk("1.2a", 6 * S_(60), 3 * sqrt(3))
chk("1.2b", 6 * S_(60) / S_(45), 3 * sqrt(6))
chk("1.2 kontroll", (3 * sqrt(6)) ** 2, 54)

# 1.3
chk("1.3a", [Rational(360, 6), Rational(360, 8), Rational(360, 12)], [60, 45, 30])
chk("1.3b", Rational(180 - 45, 2), Rational(135, 2))

# 1.4 firkant ABCD: AB = 8, BC = 15, B = 60, CD = 5, DA = 12
AC2 = 8**2 + 15**2 - 2 * 8 * 15 * C_(60)
chk("1.4a", sqrt(AC2), 13)
cosD = Rational(5**2 + 12**2 - 13**2, 2 * 5 * 12)
chk("1.4b", cosD, 0)
chk("1.4b pyt", 5**2 + 12**2, 13**2)
chk("1.4c", Rational(1, 2) * 8 * 15 * S_(60) + Rational(1, 2) * 5 * 12, 30 * sqrt(3) + 30)
# figurkoordinater: A (8,0), B (0,0), C (7.5, 12.99), D (12.19, 11.25)
Cx, Cy = 7.5, 15 * math.sin(math.radians(60))
Dx, Dy = 12.185934, 11.246242
sant("1.4 figur", abs(math.hypot(Dx - 8, Dy) - 12) < 1e-4 and abs(math.hypot(Dx - Cx, Dy - Cy) - 5) < 1e-4, "D passer")

# 1.5 AB = 6, B = 45, ADB = 60, C = 30
AD = 6 * S_(45) / S_(60)
chk("1.5a", AD, 2 * sqrt(6))
chk("1.5 ADC", 180 - 60, 120)
chk("1.5 DAC", 180 - 120 - 30, 30)
AC = AD * S_(120) / S_(30)
chk("1.5b", AC, 6 * sqrt(2))
DC = AD  # likebeint: DAC = C = 30
chk("1.5c", Rational(1, 2) * AD * DC * S_(120), 6 * sqrt(3))
chk("1.5c alt", Rational(1, 2) * AD * AC * S_(30), 6 * sqrt(3))
sant("1.5 figur", abs(math.hypot(11.59 - 6.692, 0) - 4.899) < 0.01 and abs(math.hypot(2.449, 4.243) - 4.899) < 0.01, "koordinater")

# 1.6 regulær femkant, side 4,0
R6 = 2 / S_(36)
avrund("1.6a", R6, 1, 3.4)
avrund("1.6b", 5 * Rational(1, 2) * R6**2 * S_(72), 1, 27.5)
avrund("1.6 rundet R", 5 * Rational(1, 2) * 3.4**2 * float(S_(72)), 1, 27.5)  # samme svar med avrundet mellomsvar
chk("1.6 sentralvinkel", Rational(360, 5), 72)

# 1.7 første feil: AB = 10, B = 30, C = 45, AD vinkelrett på BC
chk("1.7 pil1", 10 * S_(30), 5)
chk("1.7 pil2", 5 / S_(45), 5 * sqrt(2))
chk("1.7 pil3", 10 * C_(30), 5 * sqrt(3))
sant("1.7 pil4 feil", simplify(5 * sqrt(2) * C_(30) - 5) != 0, "DC = AC cos 30 er feil")
chk("1.7 pil4 riktig", 5 * sqrt(2) * C_(45), 5)
chk("1.7 pil4 alt", 5 / T_(45), 5)
chk("1.7 BC", 5 * sqrt(3) + 5, 5 + 5 * sqrt(3))

# 1.8 alltid / noen ganger / aldri
chk("1.8a", [4**2 * S_(30), 4**2 * S_(90)], [8, 16])
d1 = 2 * 4**2 * (1 - C_(60))
d2 = 2 * 4**2 * (1 + C_(60))
chk("1.8b ulike", [d1, d2], [16, 48])
chk("1.8b kvadrat", [2 * 4**2 * (1 - C_(90)), 2 * 4**2 * (1 + C_(90))], [32, 32])
v_ = symbols("v_")
chk("1.8b generelt", simplify((2 * 16 * (1 + cos(v_))) - (2 * 16 * (1 - cos(v_)))), 64 * cos(v_))
sant("1.8c", simplify(sqrt(3) * 8 * 5 / 4) == 10 * sqrt(3) and (10 * sqrt(3)).is_rational is False, "ab*sqrt3/4 er irrasjonalt")
chk("1.8c eks", Rational(1, 2) * 5 * 8 * S_(60), 10 * sqrt(3))

# 1.9 hoyde fra C
A_, B_ = symbols("A_ B_", positive=True)
c_ = symbols("c_", positive=True)
bb = c_ * sin(B_) / sin(A_ + B_)       # sinussetningen, C = pi - (A+B)
hh = bb * sin(A_)
chk("1.9a", simplify(hh - c_ * sin(A_) * sin(B_) / sin(A_ + B_)), 0)
chk("1.9a tall", (hh.subs({c_: 7, A_: 0.5, B_: 0.9})), 7 * math.sin(0.5) * math.sin(0.9) / math.sin(1.4), tol=1e-9)
chk("1.9b", 6 * sqrt(3) * S_(30) * S_(30) / S_(120), 3)
chk("1.9b kontroll", 3 * sqrt(3) * T_(30), 3)

# Sjekk 1
aapen("Sjekk 1a", "cosinussetningen (SSS)")
chk("Sjekk 1b", Rational(360, 18), 20)
aapen("Sjekk 1c", "definisjonen krever rett vinkel; trekk en høyde eller bruk setningene")

# =============== DEL 2 — EKSEMPLER ===============
# Eks 2.1: mast, PQ = 30, hoydevinkler 28 (P) og 41 (Q)
chk("Eks 2.1 T", 41 - 28, 13)
chk("Eks 2.1 Q", 180 - 41, 139)
QT = 30 * S_(28) / S_(13)
avrund("Eks 2.1 QT", QT, 1, 62.6)
avrund("Eks 2.1 h", QT * S_(41), 1, 41.1)
avrund("Eks 2.1 h rundet QT", 62.6 * S_(41), 1, 41.1)
chk("Eks 2.1 kontroll", 30 / (1 / T_(28) - 1 / T_(41)), QT * S_(41))
# figur
sant("Eks 2.1 figur", abs(math.degrees(math.atan2(2.88, 5.41)) - 28) < 0.3 and abs(math.degrees(math.atan2(2.88, 3.31)) - 41) < 0.3, "koordinater")
# VF avrunding
feil_h = 30 * 0.47 / 0.22 * 0.66
sant("VF 2b", 41.0 < feil_h - 1 and abs(feil_h - 42.3) < 0.05, f"rundet sinus gir {feil_h:.1f}")

# Eks 2.2: kurs 40 i 8 km, kurs 100 i 6 km
chk("Eks 2.2 vinkel P", 180 - (100 - 40), 120)
HQ2 = 9**2 + 6**2 - 2 * 9 * 6 * C_(120)
chk("Eks 2.2 HQ^2", HQ2, 171)
avrund("Eks 2.2 HQ", sqrt(HQ2), 1, 13.1)
sinH = 6 * S_(120) / sqrt(HQ2)
avrund("Eks 2.2 H", asin(sinH) * 180 / pi, 1, 23.4)
avrund("Eks 2.2 H rundet HQ", asin(6 * S_(120) / 13.1) * 180 / pi, 1, 23.4)
px, py = pol(40, 9)
qx, qy = pol(100, 6)
avrund("Eks 2.2 kurs (koordinater)", kurs(px + qx, py + qy), 1, 63.4)
# VF kurs
chk("VF 2a", 90 - 40, 50)

# =============== DEL 2 — OPPGAVER ===============
# 2.1 kurs
sant("2.1a", abs(70 - 90) < abs(70 - 0), "70 er naermere 90 (ost) enn 0 (nord)")
chk("2.1b", (70 + 180) % 360, 250)
chk("2.1c", 150 - 70, 80)

# 2.2 flaggstang
avrund("2.2", 45 * T_(32), 1, 28.1)

# 2.3 boye
chk("2.3a", 180 - 50 - 64, 66)
avrund("2.3b", 200 * S_(64) / S_(66), 1, 196.8)
avrund("2.3c", 200 * S_(50) / S_(66), 1, 167.7)

# 2.4 elv, AB = 75, TAB = 58, TBA = 74
chk("2.4 T", 180 - 58 - 74, 48)
AT = 75 * S_(74) / S_(48)
avrund("2.4 AT", AT, 1, 97.0)
avrund("2.4", AT * S_(58), 1, 82.3)
avrund("2.4 rundet AT", 97.0 * S_(58), 1, 82.3)
bt_ = 75 * S_(58) / S_(48)
avrund("2.4 kontroll", bt_ * S_(74), 1, 82.3)

# 2.5 skip, kurs 30 i 15 km, kurs 160 i 10 km
chk("2.5a", 180 - (160 - 30), 50)
HQ = sqrt(15**2 + 10**2 - 2 * 15 * 10 * C_(50))
avrund("2.5b", HQ, 1, 11.5)
cosH = (15**2 + num(HQ) ** 2 - 10**2) / (2 * 15 * num(HQ))
Hv = math.degrees(math.acos(cosH))
avrund("2.5c", Hv, 1, 41.8)
avrund("2.5c rundet HQ", math.degrees(math.acos((15**2 + 11.5**2 - 10**2) / (2 * 15 * 11.5))), 1, 41.8)
x1, y1 = pol(30, 15)
x2, y2 = pol(160, 10)
avrund("2.5d koordinater", kurs(x1 + x2, y1 + y2), 1, 71.8)
avrund("2.5d tilbake", (kurs(x1 + x2, y1 + y2) + 180) % 360, 1, 251.8)
avrund("2.5b koordinater", math.hypot(x1 + x2, y1 + y2), 1, 11.5)

# 2.6 første feil, fjell: AB = 300, hoydevinkler 20 (A) og 32 (B)
chk("2.6 pil1", 32 - 20, 12)
chk("2.6 pil2", 180 - 32, 148)
BT6 = 300 * S_(20) / S_(12)
avrund("2.6 pil3", BT6, 1, 493.5)
avrund("2.6 pil4 feil", BT6 * S_(20), 1, 168.8)
avrund("2.6 riktig", BT6 * S_(32), 1, 261.5)
avrund("2.6 rundet BT", 493.5 * S_(32), 1, 261.5)
avrund("2.6 kontroll", 300 / (1 / T_(20) - 1 / T_(32)), 1, 261.5)

# 2.7 tak: bredde 10, 35 og 50
chk("2.7 topp", 180 - 35 - 50, 95)
avrund("2.7a venstre", 10 * S_(50) / S_(95), 1, 7.7)
avrund("2.7a hoyre", 10 * S_(35) / S_(95), 1, 5.8)
avrund("2.7a hoyde", 10 * S_(50) / S_(95) * S_(35), 1, 4.4)
avrund("2.7a hoyde rundet", 7.7 * S_(35), 1, 4.4)
avrund("2.7 kontroll", 10 / (1 / T_(35) + 1 / T_(50)), 1, 4.4)
sant("2.7 figur", abs(4.41 / math.tan(math.radians(35)) - 6.30) < 0.01, "toppunkt")

# 2.8 usikkerhet
avrund("2.8a nom", 80 * T_(25), 1, 37.3)
avrund("2.8a min", 80 * T_(24), 1, 35.6)
avrund("2.8a maks", 80 * T_(26), 1, 39.0)
avrund("2.8b nom", 80 * T_(60), 1, 138.6)
avrund("2.8b min", 80 * T_(59), 1, 133.1)
avrund("2.8b maks", 80 * T_(61), 1, 144.3)
spenn_a = num(80 * T_(26) - 80 * T_(24))
spenn_b = num(80 * T_(61) - 80 * T_(59))
sant("2.8c", spenn_b > 3 * spenn_a and abs(spenn_a - 3.4) < 0.05 and abs(spenn_b - 11.2) < 0.05, f"spenn {spenn_a:.1f} og {spenn_b:.1f}")

# 2.9 to skip: A kurs 30, 30 km/t, 2 t; B kurs 90; avstand 52 km
chk("2.9a", 90 - 30, 60)
xx = symbols("xx", positive=True)
los("2.9b", Eq(52**2, 60**2 + xx**2 - 2 * 60 * xx * C_(60)), [28, 32], var=xx)
ax, ay = pol(30, 60)
for bx in (28, 32):
    chk(f"2.9 koord {bx}", sqrt((bx - ax) ** 2 + ay**2), 52, tol=1e-9)
chk("2.9 fart", [Rational(28, 2), Rational(32, 2)], [14, 16])
sant("2.9 midtpunkt", 60 * math.sin(math.radians(60)) < 52, "52 er over minimumsavstanden 51,96: to løsninger")

# Sjekk 2
chk("Sjekk 2a", (310 + 180) % 360, 130)
chk("Sjekk 2b", 30 * T_(45), 30)
aapen("Sjekk 2c", "Mellomsvar lagres uavrundet; avrunding bare til slutt")

# =============== UTFORDRING ===============
# U1 åttekant, radius 1
chk("U1a", 8 * Rational(1, 2) * S_(45), 2 * sqrt(2))
s8sq = 2 - 2 * C_(45)
chk("U1b", sqrt(s8sq), sqrt(2 - sqrt(2)))
chk("U1b alt", sqrt(s8sq) , 2 * S_(Rational(45, 2)))
avrund("U1c", 8 * sqrt(2 - sqrt(2)), 2, 6.12, margin=0.0)
sant("U1c sammenlign", 8 * math.sqrt(2 - math.sqrt(2)) < 2 * math.pi, "omkrets < 2 pi")

# U2 usikkerhet
avrund("U2a min", 50 * T_(39), 0, 40, margin=0.0)
avrund("U2a nom", 50 * T_(40), 0, 42, margin=0.0)
avrund("U2a maks", 50 * T_(41), 0, 43, margin=0.0)
chk("U2 nom1", round(num(50 * T_(40)), 1), 42.0)
chk("U2b spenn", round(num(50 * T_(41) - 50 * T_(39)), 0), 3)
sant("U2 mellom", num(50 * T_(39)) < num(50 * T_(40)) < num(50 * T_(41)), "monotont")

# U3 SSV med cosinussetningen: A = 45, a = 5, b = 4 sqrt2
cc = symbols("cc", positive=True)
los("U3a", Eq(5**2, (4 * sqrt(2)) ** 2 + cc**2 - 2 * 4 * sqrt(2) * cc * C_(45)), [1, 7], var=cc)
chk("U3b", 4 * sqrt(2) * S_(45) / 5, Rational(4, 5))
Bs = [math.degrees(math.asin(0.8)), 180 - math.degrees(math.asin(0.8))]
avrund("U3c B1", Bs[0], 1, 53.1)
avrund("U3c B2", Bs[1], 1, 126.9)
for Bv, cv in zip(Bs, (7, 1)):
    Cv = 180 - 45 - Bv
    avrund(f"U3c c={cv}", 5 * math.sin(math.radians(Cv)) / math.sin(math.radians(45)), 1, cv, margin=0.0)

# U4 program
kode_u4 = '''
import math

def vinkel_fra_sider(a, b, c):
    return math.degrees(math.acos((b**2 + c**2 - a**2) / (2 * b * c)))

def side_fra_svs(b, c, A):
    return math.sqrt(b**2 + c**2 - 2 * b * c * math.cos(math.radians(A)))

def ssv(a, b, A):
    s = b * math.sin(math.radians(A)) / a
    if s > 1:
        return []
    B1 = math.degrees(math.asin(s))
    B2 = 180 - B1
    losninger = [B1]
    if A + B2 < 180:
        losninger.append(B2)
    return losninger

print(round(vinkel_fra_sider(7, 5, 8), 1))
print(round(side_fra_svs(3, 5, 120), 1))
print([round(v, 1) for v in ssv(5, 8, 30)])
print([round(v, 1) for v in ssv(9, 8, 30)])
print([round(v, 1) for v in ssv(3, 8, 30)])
'''
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    exec(kode_u4, {})
ut = buf.getvalue().strip().splitlines()
sant("U4a", ut == ["60.0", "7.0", "[53.1, 126.9]", "[26.4]", "[]"], str(ut))
aapen("U4b", "Forklaring: sin B = sin(180 - B); to vinkler kan gi trekant")
chk("U4c", [round(math.degrees(math.asin(8 * 0.5 / 9)), 1), round(180 - math.degrees(math.asin(8 * 0.5 / 9)), 1)], [26.4, 153.6])

# U5 Herons formel
a_, b_, c2_ = symbols("a_ b_ c2_", positive=True)
s_ = (a_ + b_ + c2_) / 2
cosC = (a_**2 + b_**2 - c2_**2) / (2 * a_ * b_)
T2 = (a_ * b_) ** 2 / 4 * (1 - cosC**2)
chk("U5a", simplify(T2 - s_ * (s_ - a_) * (s_ - b_) * (s_ - c2_)), 0)
chk("U5 steg 1", simplify((1 - cosC) * (1 + cosC) - (1 - cosC**2)), 0)
chk("U5 steg 2", simplify(1 - cosC - (c2_**2 - (a_ - b_) ** 2) / (2 * a_ * b_)), 0)
chk("U5 steg 3", simplify(1 + cosC - ((a_ + b_) ** 2 - c2_**2) / (2 * a_ * b_)), 0)
chk("U5 fire faktorer", simplify((c2_ - a_ + b_) * (c2_ + a_ - b_) * (a_ + b_ - c2_) * (a_ + b_ + c2_) - 16 * s_ * (s_ - a_) * (s_ - b_) * (s_ - c2_)), 0)
chk("U5c", sqrt(Rational(10) * 5 * 3 * 2), 10 * sqrt(3))
chk("U5c alt", Rational(1, 2) * 5 * 8 * S_(60), 10 * sqrt(3))
chk("U5c vinkel", Rational(5**2 + 8**2 - 7**2, 2 * 5 * 8), Rational(1, 2))

# U6 lag selv — fasiteksempel: AB = 7, BC = 8, B = 120, ACD = 90, CD = 84
AC6 = sqrt(7**2 + 8**2 - 2 * 7 * 8 * C_(120))
chk("U6 AC", AC6, 13)
chk("U6 AD", sqrt(AC6**2 + 84**2), 85)
chk("U6 areal", Rational(1, 2) * 7 * 8 * S_(120) + Rational(1, 2) * 13 * 84, 14 * sqrt(3) + 546)

# U7 Hele 1T
xs = symbols("xs", positive=True)
Tx = Rational(1, 2) * xs * (20 - xs) * S_(30)
chk("U7a", expand(Tx), 5 * xs - xs**2 / 4)
chk("U7b toppunkt", -Rational(5) / (2 * Rational(-1, 4)), 10)
chk("U7b derivert", solve(Eq(diff(Tx, xs), 0), xs), [10])
chk("U7b areal", Tx.subs(xs, 10), 25)
chk("U7c", sqrt(10**2 + 10**2 - 2 * 10 * 10 * C_(30)), 10 * sqrt(2 - sqrt(3)))
chk("U7c ekvivalent", 10 * sqrt(2 - sqrt(3)), 5 * (sqrt(6) - sqrt(2)))
avrund("U7c tall", 10 * sqrt(2 - sqrt(3)), 1, 5.2)

rapport()
