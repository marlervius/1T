"""Regner alle svar i 5.4 Cosinussetningen på nytt. Kjøres av sjekk.py / bygg.py."""
import io
import math
from contextlib import redirect_stdout

from kontroll import *

A_, B_, C_ = symbols("A_ B_ C_")
cA = symbols("cA")


def cn(d):
    """Eksakt cosinus til en vinkel i grader."""
    return simplify(cos(rad(d)))


def side(b1, c1, vinkel):
    """Eksakt tredje side (SVS) med cosinussetningen."""
    return simplify(sqrt(b1**2 + c1**2 - 2 * b1 * c1 * cn(vinkel)))


def cosv(a1, b1, c1):
    """Eksakt cosinus til vinkelen overfor a1 (SSS)."""
    return simplify(Rational(1) * (b1**2 + c1**2 - a1**2) / (2 * b1 * c1))


def sidek(b1, c1, v):
    return math.sqrt(b1**2 + c1**2 - 2 * b1 * c1 * math.cos(math.radians(v)))


def vink(a1, b1, c1):
    return math.degrees(math.acos((b1**2 + c1**2 - a1**2) / (2 * b1 * c1)))


# ---------- Teori del 1: beviset ----------
# spiss A: x = b cos A, b^2 = h^2 + x^2, a^2 = h^2 + (c-x)^2
h, xx = symbols("h xx")
chk("Bevis spiss", expand((h**2 + (c - xx) ** 2) - (h**2 + xx**2) - c**2 + 2 * c * xx), 0)
chk("Bevis spiss a2", expand(b**2 + c**2 - 2 * c * (b * cA) - ((b**2 - (b * cA) ** 2) + (c - b * cA) ** 2)), 0)
# stump A: x = b cos(180-A) = -b cos A, a^2 = h^2 + (c+x)^2
chk("Bevis stump", expand((h**2 + (c + xx) ** 2) - (h**2 + xx**2) - c**2 - 2 * c * xx), 0)
chk("Bevis stump a2", expand(b**2 + c**2 + 2 * c * (-b * cA) - ((b**2 - (-b * cA) ** 2) + (c - b * cA) ** 2)), 0)
chk("Teori cos(180-v)", cos(rad(180 - 120)) + cos(rad(120)), 0)
chk("Teori A=90", expand(b**2 + c**2 - 2 * b * c * cos(pi / 2)), b**2 + c**2)

# ---------- Vanlige feil ----------
sant("VF 1a", simplify((b**2 + c**2 - 2 * b * c) * cA - (b**2 + c**2 - 2 * b * c * cA)) != 0, "feil formel er ikke lik riktig")
chk("VF 1c", expand(b**2 + c**2 - 2 * b * c * cn(120)), b**2 + c**2 + b * c)
sant("VF 2b", -16 < 0, "negativ rot er ikke en lengde")
# ---------- Eksempler del 1 ----------
chk("Eks 1.1 steg 1", 3**2 + 5**2 - 2 * 3 * 5 * cn(120), 49)
chk("Eks 1.1 steg 2", cn(120), -Rational(1, 2))
chk("Eks 1.1 a", side(3, 5, 120), 7)
chk("Eks 1.2 steg 1", Rational(5**2 + 8**2 - 7**2, 2 * 5 * 8), Rational(1, 2))
chk("Eks 1.2 A", acos(Rational(1, 2)), rad(60))
chk("Eks 1.2 kontroll", vink(5, 7, 8) + vink(7, 5, 8) + vink(8, 5, 7), 180, tol=1e-6)
chk("Eks 1.2 vinkel 7", vink(7, 5, 8), 60, tol=1e-6)

# ---------- Del 1 ----------
chk("1.1a", side(6, 8, 90), 10)
chk("1.1b", side(4, 6, 60), 2 * sqrt(7))
chk("1.1c", side(2, 3, 120), sqrt(19))

chk("1.2a", Rational(6**2 + 16**2 - 14**2), 96)
chk("1.2b", 2 * 6 * 16, 192)
chk("1.2c", Rational(96, 192), Rational(1, 2))
chk("1.2d", acos(Rational(1, 2)), rad(60))

avrund("1.3a", sidek(12, 15, 48), 1, 11.3)
avrund("1.3b", vink(11, 6, 8), 1, 102.6)

chk("1.4a", cosv(2 * sqrt(3), 2, 2), -Rational(1, 2))
chk("1.4a v", acos(-Rational(1, 2)), rad(120))
chk("1.4b", cosv(2, sqrt(2), sqrt(2)), 0)
chk("1.4b v", acos(0), rad(90))

avrund("1.5a", sidek(420, 310, 72), 1, 438.2)
avrund("1.5b", vink(310, 420, sidek(420, 310, 72)), 1, 42.3)

# 2.3 finn første feil: b=10, c=6, A=120
chk("1.6 riktig", 10**2 + 6**2 - 2 * 10 * 6 * cn(120), 196)
chk("1.6 steg 2", 100 + 36 - 120 * (-Rational(1, 2)), 196)
sant("1.6 feil steg", 136 - 60 != 196, "136 - 60 er ikke 196")
chk("1.6 a", side(10, 6, 120), 14)

# 2.4 beviset med tall: b=8, c=10, A=60
chk("1.7a x", 8 * cn(60), 4)
chk("1.7a h", sqrt(8**2 - 4**2), 4 * sqrt(3))
chk("1.7b", (4 * sqrt(3)) ** 2 + (10 - 4) ** 2, 84)
chk("1.7c", 8**2 + 10**2 - 2 * 8 * 10 * cn(60), 84)

# 3.1 bevis for C: c^2 = a^2 + b^2 - 2ab cos C
aapen("1.8", "Bevis for c^2 = a^2 + b^2 - 2ab cos C, høyde fra A eller B")
# kontroll av algebraen: høyde fra A på a, a = y + (a - y), y = b cos C
yy = symbols("yy")
chk("1.8 algebra", expand(((b**2 - (b * cA) ** 2) + (a - b * cA) ** 2) - (a**2 + b**2 - 2 * a * b * cA)), 0)
# 3.2 alltid/noen/aldri
chk("1.9a", expand((b + c) ** 2 - (b**2 + c**2 - 2 * b * c * cA)), 2 * b * c * (1 + cA))
sant("1.9a cos>-1", cos(rad(179)).evalf() > -1 and cos(rad(1)).evalf() < 1, "cos A > -1 for 0<A<180")
sant("1.9b stor", side(3, 4, 90) > 4 and side(3, 4, 30) < 3, "a > begge ved 90, a < begge ved 30")
chk("1.9b 30", side(3, 4, 30), sqrt(25 - 12 * sqrt(3)))
chk("1.9c", expand(b**2 + c**2 - 2 * b * c * cn(60)), b**2 + c**2 - b * c)
# 3.3 sidene x, x+1, x+2, cos til største vinkel = 1/8
los("1.10", Eq(((x) ** 2 + (x + 1) ** 2 - (x + 2) ** 2) / (2 * x * (x + 1)), Rational(1, 8)), [4])
chk("1.10 kontroll", cosv(6, 4, 5), Rational(1, 8))

chk("Sjekk 1a", side(3, 8, 60), 7)
aapen("Sjekk 1b", "cos A = (b^2 + c^2 - a^2) / (2bc)")
aapen("Sjekk 1c", "Stump A: cos A < 0, så -2bc cos A > 0")

# ---------- Teori del 2: SSV-eksempel ----------
# A = 30, a = 5, b = 8
chk("Eks 2 steg 1", 8**2 + c**2 - 2 * 8 * c * cn(30), c**2 - 8 * sqrt(3) * c + 64)
los("Eks 2 løsning", Eq(25, 64 + c**2 - 8 * sqrt(3) * c), [4 * sqrt(3) - 3, 4 * sqrt(3) + 3], var=c)
chk("Eks 2 disc", (8 * sqrt(3)) ** 2 - 4 * 39, 36)
sant("Eks 2 positive", 4 * sqrt(3) - 3 > 0, "begge positive")
avrund("Eks 2 c1", 4 * math.sqrt(3) + 3, 1, 9.9)
avrund("Eks 2 c2", 4 * math.sqrt(3) - 3, 1, 3.9)
# sinussetningen gir samme (5.3)
B1 = math.degrees(math.asin(0.8))
C1 = 180 - 30 - B1
C2 = 180 - 30 - (180 - B1)
avrund("Eks 2 sinus c1", 5 * math.sin(math.radians(C1)) / math.sin(math.radians(30)), 1, 9.9)
avrund("Eks 2 sinus c2", 5 * math.sin(math.radians(C2)) / math.sin(math.radians(30)), 1, 3.9)

# ---------- Del 2 ----------
aapen("2.1", "Klassifisering: a) SSS cos b) SVS cos c) SVV sinus d) SSV sinus (eller cos)")
avrund("2.2a", sidek(9, 14, 65), 1, 13.1, margin=0.05)
avrund("2.2b", 10 * math.sin(math.radians(65)) / math.sin(math.radians(48)), 1, 12.2)
avrund("2.2c", vink(13, 8, 11), 1, 84.8)
sant("2.3a", 40 + 60 + 80 == 180 and 7 > 6, "vinkelsum ok, men b=7 er lengste side og ligger ikke overfor 80")
sant("2.3b", 62 + 71 + 57 == 190, "vinkelsum 190")

los("2.4a", Eq(169, 225 + c**2 - 2 * 15 * c * cn(60)), [7, 8], var=c)
los("2.4b", Eq(361, 25 + c**2 - 2 * 5 * c * cn(60)), [21, -16], var=c)
los("2.4c", Eq(36, 64 + c**2 - 2 * 8 * c * cn(60)), [], var=c)
chk("2.4b rot", 21**2 - 5 * 21 - 336, 0)
sant("2.4c disc", 8**2 - 4 * 28 < 0, "negativ diskriminant")
sant("2.4c sin", 8 * sin(rad(60)) / 6 > 1, "sin B > 1")

avrund("2.5 C", vink(12, 7, 9), 1, 96.4)
avrund("2.5 A", vink(7, 9, 12), 1, 35.4)
avrund("2.5 B", vink(9, 7, 12), 1, 48.2)
# via sinussetningen fra C
avrund("2.5 sinus", math.degrees(math.asin(7 * math.sin(math.radians(vink(12, 7, 9))) / 12)), 1, 35.4)
sant("2.5 sum", abs(vink(7, 9, 12) + vink(9, 7, 12) + vink(12, 7, 9) - 180) < 1e-9, "sum 180")

# 2.3 feil
A_ = vink(4, 5, 6)
avrund("2.6 A", A_, 1, 41.4)
avrund("2.6 sin B", 5 * math.sin(math.radians(A_)) / 4, 3, 0.827)
avrund("2.6 B spiss", math.degrees(math.asin(5 * math.sin(math.radians(A_)) / 4)), 1, 55.8)
avrund("2.6 B stump", 180 - math.degrees(math.asin(5 * math.sin(math.radians(A_)) / 4)), 1, 124.2)
avrund("2.6 feil C", 180 - 41.4 - 124.2, 1, 14.4)
avrund("2.6 riktig B", vink(5, 4, 6), 1, 55.8)
avrund("2.6 riktig C", vink(6, 4, 5), 1, 82.8)

avrund("2.7", 0.5 * 9 * 10 * math.sin(math.acos(Rational(1, 3).evalf())), 1, 42.4)
chk("2.7 cos", cosv(11, 9, 10), Rational(1, 3))
chk("2.7 eksakt", Rational(1, 2) * 9 * 10 * sqrt(1 - Rational(1, 9)), 30 * sqrt(2))

sant("2.8a", cosv(sqrt(10), 1, 2) < 0 and 10 > 1 + 4, "a^2 > b^2+c^2 gir cos A < 0")
sant("2.8b", cosv(5, 4, 4) > 0 and cosv(5, 3, 4) == 0, "lengste side 5 i 4-4-5 gir spiss vinkel")
sant("2.8c", cosv(11, 4, 6) < -1, "cos < -1, ingen trekant")
# 3.2 A=60, b=10: for hvilke a?
for aa, ant in [(8, 0), (5 * sqrt(3), 1), (9, 2), (10, 1), (12, 1)]:
    lsg = [r for r in solve(Eq(aa**2, 100 + c**2 - 10 * c), c) if r.is_real and r > 0]
    chk(f"2.9 a={aa}", len(lsg), ant)
chk("2.9 disk", (10) ** 2 - 4 * (100 - a**2), 4 * a**2 - 300)
chk("2.9 røtter", solve(Eq(c**2 - 10 * c + 100 - a**2, 0), c), [5 - sqrt(a**2 - 75), 5 + sqrt(a**2 - 75)])
aapen("2.10", "Forklaring: cos entydig mellom 0 og 180, sin har to vinkler")

aapen("Sjekk 2a", "sinussetningen (SVV)")
aapen("Sjekk 2b", "cosinussetningen (SSS)")
aapen("Sjekk 2c", "cos er entydig")

# ---------- Utfordring ----------
chk("U1a", 6**2 + 7**2 - 10**2, -15)
chk("U1b diff", 64 + 81 - 144, 1)
chk("U1c diff", 400 + 441 - 841, 0)
aapen("U1d", "Forklaring: b^2+c^2-a^2 har samme fortegn som cos A")

# U2 tomt
B2 = vink(60, 35, 48)
D2 = vink(60, 42, 52)
avrund("U2a B", B2, 1, 91.2)
avrund("U2a D", D2, 1, 78.5)
avrund("U2b areal", 0.5 * 35 * 48 * math.sin(math.radians(B2)) + 0.5 * 42 * 52 * math.sin(math.radians(D2)), 0, 1910)

# U3 programmet: koden slik den står i oppgaven, med hullet fylt inn
kode = '''
from math import acos, degrees

def vinkel(a, b, c):
    """Vinkelen overfor siden a."""
    return degrees(acos((b**2 + c**2 - a**2) / (2 * b * c)))

a = SIDE_A
b = SIDE_B
c = SIDE_C

if a + b <= c or a + c <= b or b + c <= a:
    print("Ingen trekant")
else:
    A = vinkel(a, b, c)
    B = vinkel(b, a, c)
    C = vinkel(c, a, b)
    print(round(A, 1), round(B, 1), round(C, 1))
    storst = max(A, B, C)
    if abs(storst - 90) < 0.0001:
        print("rett")
    elif storst < 90:
        print("spiss")
    else:
        print("stump")
'''


def kjor(a1, b1, c1):
    ut = io.StringIO()
    src = kode.replace("SIDE_A", str(a1)).replace("SIDE_B", str(b1)).replace("SIDE_C", str(c1))
    with redirect_stdout(ut):
        exec(src, {})
    return ut.getvalue().split("\n")[:-1]


sant("U3 3-4-5", kjor(3, 4, 5) == ["36.9 53.1 90.0", "rett"], str(kjor(3, 4, 5)))
sant("U3 5-7-8", kjor(5, 7, 8) == ["38.2 60.0 81.8", "spiss"], str(kjor(5, 7, 8)))
sant("U3 1-2-4", kjor(1, 2, 4) == ["Ingen trekant"], str(kjor(1, 2, 4)))
aapen("U3c", "Uten trekantulikheten feiler acos med domenefeil")
sant("U3a flyt", math.degrees(math.acos((1 + 1 - math.sqrt(2) ** 2) / 2)) != 90.0, "sidene 1, 1, sqrt(2) gir ikke nøyaktig 90.0")
sant("U3a flyt2", abs(math.degrees(math.acos((1 + 1 - math.sqrt(2) ** 2) / 2)) - 90) < 1e-4, "men innenfor toleransen")

# U4 parallellogramloven
d1 = a**2 + b**2 - 2 * a * b * cos(pi - symbols("v"))
d2 = a**2 + b**2 - 2 * a * b * cos(symbols("v"))
chk("U4", simplify(d1 + d2), 2 * a**2 + 2 * b**2)
chk("U4 tall", simplify(d1 + d2).subs({a: 5, b: 3, symbols("v"): rad(50)}) - (2 * 25 + 2 * 9), 0)
# U5: 120 grader
chk("U5 formel", expand(b**2 + c**2 - 2 * b * c * cn(120)), b**2 + b * c + c**2)
chk("U5 eksempel", 7**2 + 7 * 8 + 8**2, 13**2)
chk("U5 cos", cosv(13, 7, 8), -Rational(1, 2))
chk("U5 60", cosv(7, 5, 8), Rational(1, 2))

# ---------- Mellomsvar avrundet vs urundet ----------
avrund("Rund 1.5b", vink(310, 420, 438.2), 1, 42.3)
avrund("Rund 2.5 A", math.degrees(math.asin(7 * math.sin(math.radians(96.4)) / 12)), 1, 35.4)
avrund("Rund 2.5 B", 180 - 96.4 - 35.4, 1, 48.2)
avrund("Rund 2.6 B", math.degrees(math.asin(5 * math.sin(math.radians(41.4)) / 4)), 1, 55.8)
avrund("Rund 2.7", 0.5 * 9 * 10 * math.sin(math.radians(70.5)), 1, 42.4)
avrund("Rund U2 areal", 0.5 * 35 * 48 * math.sin(math.radians(91.2)) + 0.5 * 42 * 52 * math.sin(math.radians(78.5)), 0, 1910)
avrund("Rund 1.3b", vink(11, 6, 8), 1, 102.6)

rapport()
