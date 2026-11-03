"""Regner alle svar i 5.3 Sinussetningen på nytt. Kjøres av sjekk.py / bygg.py."""
import io
import contextlib
from kontroll import *


def S_(v):
    return sin(rad(v))


def invs(k):
    """Spiss vinkel i grader med sin = k."""
    return asin(k) * 180 / pi


def side_(a_, A_, B_):
    """Sinussetningen: side overfor B når a overfor A er kjent."""
    return a_ * S_(B_) / S_(A_)


def tvetydig(A_, a_, b_):
    """Alle gyldige B (grader, avrundet til 1 desimal) for SSV."""
    s = b_ * float(S_(A_)) / a_
    if s > 1 + 1e-12:
        return []
    B1 = float(invs(min(s, 1)))
    res = [B1] if A_ + B1 < 180 - 1e-9 else []
    B2 = 180 - B1
    if A_ + B2 < 180 - 1e-9 and abs(B2 - B1) > 1e-9:
        res.append(B2)
    return res


# ---------- Eksempler ----------
chk("Eks 1.1 C", 180 - 30 - 45, 105)
chk("Eks 1.1 b", side_(4, 30, 45), 4 * sqrt(2))
chk("Eks 1.1 steg", 4 * (sqrt(2) / 2) / Rational(1, 2), 4 * sqrt(2))
avrund("Eks 1.2 C", 180 - 40 - 75, 0, 65)
avrund("Eks 1.2 b", side_(8, 40, 75), 1, 12.0)
avrund("Eks 1.2 c", side_(8, 40, 65), 1, 11.3)
chk("Eks 2.1 sinB", 8 * S_(30) / 5, Rational(4, 5))
avrund("Eks 2.1 B1", invs(Rational(4, 5)), 1, 53.1)
avrund("Eks 2.1 B2", 180 - invs(Rational(4, 5)), 1, 126.9)
sant("Eks 2.1 sum", 30 + 126.9 < 180, "30+126,9<180")
avrund("Eks 2.1 C1", 180 - 30 - invs(Rational(4, 5)), 1, 96.9)
avrund("Eks 2.1 C2", 180 - 30 - (180 - invs(Rational(4, 5))), 1, 23.1)
avrund("Eks 2.1 c1e", 4 * sqrt(3) + 3, 1, 9.9)
avrund("Eks 2.1 c2e", 4 * sqrt(3) - 3, 1, 3.9)

# ---------- Vanlige feil ----------
sant("VF1a", 30 + 150 == 180, "B2 = 180-B kan gi vinkelsum 180")
chk("VF 1 bevis", simplify((Rational(1, 2) * b * c * sin(a) / (Rational(1, 2) * a * b * c)) * a / sin(a)), 1)
sant("VF 3", len(tvetydig(62, 9, 6)) == 1, "a>b: bare én")

# ---------- Del 1 ----------
chk("1.1a", 180 - 50 - 70, 60)
chk("1.1b", 180 - 35 - 95, 50)
chk("1.1c", 180 - 90 - 37, 53)
chk("1.1d", 180 - 2 * 65, 50)

chk("1.2a sin", sin(rad(60)), sqrt(3) / 2)
chk("1.2a b", side_(6 * sqrt(3), 60, 30), 6)
chk("1.2b", Rational(6) * S_(60) / S_(30), 6 * sqrt(3))

avrund("1.3 C", 180 - 50 - 60, 0, 70)
avrund("1.3 b", side_(7, 50, 60), 1, 7.9)
avrund("1.3 c", side_(7, 50, 70), 1, 8.6)

avrund("1.4a", side_(12, 35, 80), 1, 20.6)
avrund("1.4b", side_(9.5, 71, 180 - 48 - 71), 1, 8.8)
avrund("1.4c", side_(5, 28, 112), 1, 9.9)

chk("1.5 A", 180 - 120 - 45, 15)
chk("1.5", side_(6 * sqrt(2), 45, 120), 6 * sqrt(3))
chk("1.5 b", simplify(6 * sqrt(2) * (sqrt(3) / 2) / (sqrt(2) / 2)), 6 * sqrt(3))

avrund("1.6a", 500 * S_(71) / S_(47), 1, 646.4)
avrund("1.6b", 500 * S_(62) / S_(47), 1, 603.6)
avrund("1.6c", 500 * S_(71) / S_(47) * S_(62), 0, 571)
chk("1.6 vinkel", 180 - 62 - 71, 47)

chk("1.7 C", 180 - 40 - 65, 75)
sant("1.7 pil 1", True, "C = 75 riktig")
sant("1.7 pil 2", True, "sin75/c = sin40/9 riktig")
sant("1.7 pil 3 feil", 9 * S_(40) / S_(75) != 9 * S_(75) / S_(40), "invertert brøk er feil")
avrund("1.7 feil svar", 9 * S_(40) / S_(75), 1, 6.0)
avrund("1.7 riktig", 9 * S_(75) / S_(40), 1, 13.5)
sant("1.7 størst", 75 > 40 and 9 * S_(75) / S_(40) > 9, "C>A gir c>a")

aapen("1.8a", "A=B gir a=b; alltid")
sant("1.8a", True, "sin A/a = sin B/b med sin A = sin B gir a = b")
chk("1.8b", sin(rad(120)), sin(rad(60)))
aapen("1.8c", "SSS: ingen vinkel kjent, to ukjente i hver likning; aldri")
chk("1.9", S_(90), 1)
aapen("1.9", "sin B = b/a stemmer med definisjonen")
# 1.10: lag selv, b = sqrt(3) a
chk("1.10 eks1", S_(60) / S_(30), sqrt(3))
chk("1.10 eks2", S_(120) / S_(30), sqrt(3))
chk("1.10 sum", [30 + 60 + 90, 30 + 120 + 30], [180, 180])

chk("Sjekk 1a", 180 - 75 - 45, 60)
chk("Sjekk 1b", 3 * S_(90) / S_(30), 6)
aapen("Sjekk 1c", "Trenger vinkel-side-par; vinkelsummen gir den tredje vinkelen")

# ---------- Del 2 ----------
chk("2.1a", [30, 150], [30, 180 - 30])
chk("2.1b", sin(rad(150)), Rational(1, 2))
chk("2.1c", sin(rad(90)), 1)
sant("2.1d", 2 > 1, "sin v = 2 umulig")
chk("2.1e", [sin(rad(60)), sin(rad(120))], [sqrt(3) / 2, sqrt(3) / 2])

chk("2.2 sinB", 6 * sqrt(3) * S_(30) / 6, sqrt(3) / 2)
chk("2.2 B", [60, 120], [60, 180 - 60])
sant("2.2 sum", 30 + 60 < 180 and 30 + 120 < 180, "begge")
chk("2.2 C", [180 - 30 - 60, 180 - 30 - 120], [90, 30])
chk("2.2 c", [side_(6, 30, 90), side_(6, 30, 30)], [12, 6])

avrund("2.3 sinB", 7 * S_(40) / 6, 2, 0.75)
avrund("2.3 B1", invs(7 * S_(40) / 6), 1, 48.6)
avrund("2.3 B2", 180 - invs(7 * S_(40) / 6), 1, 131.4)
sant("2.3 sum", 40 + 131.4 < 180, "to trekanter")

sB = 9 * S_(35) / 7
B1 = invs(sB)
avrund("2.4 sinB", sB, 2, 0.74)
avrund("2.4 B1", B1, 1, 47.5)
avrund("2.4 B2", 180 - B1, 1, 132.5)
avrund("2.4 C1", 180 - 35 - B1, 1, 97.5)
avrund("2.4 C2", 180 - 35 - (180 - B1), 1, 12.5)
avrund("2.4 c1", 7 * sin(rad(180 - 35) - asin(sB)) / S_(35), 1, 12.1)
avrund("2.4 c2", 7 * sin(rad(180 - 35) - (pi - asin(sB))) / S_(35), 1, 2.6)

chk("2.5a antall", len(tvetydig(62, 9, 6)), 1)
sB5 = 6 * S_(62) / 9
avrund("2.5a B", invs(sB5), 1, 36.1)
avrund("2.5a C", 180 - 62 - invs(sB5), 1, 81.9)
avrund("2.5a c", 9 * sin(rad(180 - 62) - asin(sB5)) / S_(62), 1, 10.1)
chk("2.5b antall", len(tvetydig(40, 3, 7)), 0)
avrund("2.5b sinB", 7 * S_(40) / 3, 2, 1.50)
sB5c = 7 * S_(110) / 10
chk("2.5c antall", len(tvetydig(110, 10, 7)), 1)
avrund("2.5c B", invs(sB5c), 1, 41.1)
sant("2.5c sum", 110 + (180 - 41.1) > 180, "B2 gir sum over 180")

sB6 = 8 * S_(25) / 6
avrund("2.6 sinB", sB6, 2, 0.56)
avrund("2.6 B1", invs(sB6), 1, 34.3)
avrund("2.6 B2", 180 - invs(sB6), 1, 145.7)
sant("2.6 sum", 25 + 145.7 < 180, "begge")
avrund("2.6 AB1", 6 * sin(rad(155) - asin(sB6)) / S_(25), 1, 12.2)
avrund("2.6 AB2", 6 * sin(rad(155) - (pi - asin(sB6))) / S_(25), 1, 2.3)
chk("2.6 antall", len(tvetydig(25, 6, 8)), 2)

sB7 = 9 * S_(48) / 7
avrund("2.7 B1", invs(sB7), 1, 72.8)
avrund("2.7 B2", 180 - invs(sB7), 1, 107.2)
sant("2.7 sum", 48 + 107.2 < 180, "begge gir trekant")
avrund("2.7 c1", 7 * sin(rad(132) - asin(sB7)) / S_(48), 1, 8.1)
avrund("2.7 c2", 7 * sin(rad(132) - (pi - asin(sB7))) / S_(48), 1, 4.0)
chk("2.7 antall", len(tvetydig(48, 7, 9)), 2)

# 2.8: a = 6, b = 9, A varierer. sin B = 1,5 sin A. Grense: sin A = 2/3
avrund("2.8 grense", asin(Rational(2, 3)) * 180 / pi, 1, 41.8)
chk("2.8 sinB", 9 * S_(30) / 6, Rational(3, 4))
chk("2.8 A=30", len(tvetydig(30, 6, 9)), 2)
chk("2.8 A=41", len(tvetydig(41, 6, 9)), 2)
chk("2.8 A=42", len(tvetydig(42, 6, 9)), 0)
chk("2.8 A=150", len(tvetydig(150, 6, 9)), 0)
sant("2.8 alle",
     all(len(tvetydig(Av / 2, 6, 9)) == (2 if Av / 2 < 41.81 else 0) for Av in range(1, 359)),
     "A<41,8: to; ellers ingen")
sant("2.8 stump", all(float(S_(Av)) * 1.5 < 1 and len(tvetydig(Av, 6, 9)) == 0 for Av in range(139, 180)), "stump A: ingen")
sant("2.9a", all(len(tvetydig(Av, av / 4, 8)) <= 1 for Av in range(91, 180) for av in range(1, 80)), "A stump: høyst én")
avrund("2.7 C1", 180 - 48 - invs(sB7), 1, 59.2)
avrund("2.7 C2", 180 - 48 - (180 - invs(sB7)), 1, 24.8)
avrund("2.5c C", 180 - 110 - invs(sB5c), 1, 28.9)
avrund("2.5c c", 10 * sin(rad(70) - asin(sB5c)) / S_(110), 1, 5.1)
chk("2.9a eks", len(tvetydig(120, 10, 7)), 1)
sant("2.9b", len(tvetydig(30, 7, 10)) == 2 and len(tvetydig(30, 3, 10)) == 0 and 3 < 10, "a<b: noen ganger to, noen ganger ingen")
chk("2.10 to", len(tvetydig(30, 7, 10)), 2)
chk("2.10 én", len(tvetydig(30, 12, 10)), 1)
aapen("2.10", "Lag selv; eksempel i fasit")

avrund("Sjekk 2a", invs(Rational(3, 5)), 1, 36.9)
avrund("Sjekk 2a2", 180 - invs(Rational(3, 5)), 1, 143.1)
chk("Sjekk 2b h", 6 * S_(30), 3)
chk("Sjekk 2b", len(tvetydig(30, 2, 6)), 0)
aapen("Sjekk 2c", "A + (180-B) må være under 180")

# ---------- Utfordring ----------
chk("U1", side_(4 * sqrt(2), 45, 60), 4 * sqrt(3))
chk("U1 steg", 4 * sqrt(2) * (sqrt(3) / 2) / (sqrt(2) / 2), 4 * sqrt(3))
avrund("U2 AC", 70 * S_(71) / S_(61), 1, 75.7)
avrund("U2 h", 70 * S_(71) / S_(61) * S_(48), 1, 56.2)
chk("U2 C", 180 - 48 - 71, 61)
bU = side_(10, 50, 70)
avrund("U3 b", bU, 1, 12.3)
avrund("U3 T", Rational(1, 2) * 10 * bU * S_(60), 1, 53.1)
avrund("U3 T2", Rational(1, 2) * 10 * 10 * S_(70) * S_(60) / S_(50) , 1, 53.1)

# U4 programmering
kode = '''
import math

def ssv(a, b, A):
    s = b * math.sin(math.radians(A)) / a
    if s > 1:
        return 0, []
    B1 = round(math.degrees(math.asin(s)), 1)
    vinkler = []
    for B in [B1, round(180 - B1, 1)]:
        if A + B < 180 and B not in vinkler:
            vinkler.append(B)
    return len(vinkler), vinkler

for a in [2, 3, 4, 8]:
    print(a, ssv(a, 6, 30))
print(ssv(9, 6, 62))
'''
ut = io.StringIO()
with contextlib.redirect_stdout(ut):
    exec(kode, {})
print(ut.getvalue())
linjer = ut.getvalue().strip().split("\n")
sant("U5 ut", linjer == ["2 (0, [])", "3 (1, [90.0])", "4 (2, [48.6, 131.4])", "8 (1, [22.0])", "(1, [36.1])"], "utskrift")

# U5: største vinkel / lengste side
sant("U4 sjekk", all(float(S_(Av)) > float(S_(Bv)) for Av in range(1, 180) for Bv in range(1, 180 - Av) if Av > Bv), "A>B, A+B<180 gir sin A > sin B")
aapen("U4", "Begrunnelse med sinussetningen og enhetssirkelen")
aapen("U6", "Bevis for a/sin A = 2R")
chk("U6c", Rational(13, 1) / 1, 13)
chk("U6c R", Rational(13, 2), Rational(13, 2))

rapport()
