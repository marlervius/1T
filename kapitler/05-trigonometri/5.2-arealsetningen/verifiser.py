"""Regner alle svar i 5.2 Arealsetningen på nytt. Kjøres av sjekk.py / bygg.py."""
import math

from kontroll import *

v = symbols("v")


def rad(d):
    return d * pi / 180


def sn(d):
    """Eksakt sinus til en vinkel i grader."""
    return simplify(sin(rad(d)))


def areal(s1, s2, vinkel):
    return Rational(1, 2) * s1 * s2 * sn(vinkel)


def ar(s1, s2, vinkel):
    """Numerisk areal med kalkulator."""
    return 0.5 * s1 * s2 * math.sin(math.radians(vinkel))


def sinv(k):
    """Spiss og stump vinkel med sin v = k (grader)."""
    sp = math.degrees(math.asin(k))
    return round(sp, 1), round(180 - sp, 1)


# ---------- Teori og eksempler ----------
chk("Eks 1.1", areal(6, 5, 30), Rational(15, 2))
chk("Eks 1.1 kontroll 150", areal(6, 5, 150), Rational(15, 2))
chk("Eks 1.1 sin150", sn(150), Rational(1, 2))
chk("Teori rett vinkel", areal(7, 3, 90), Rational(21, 2))
chk("Teori sin(180-v)", sin(rad(180 - 117)) - sin(rad(117)), 0)
# Eks 2.1: a=8, b=5, T=10 sqrt3
chk("Eks 2.1 steg 1", Rational(1, 2) * 8 * 5, 20)
chk("Eks 2.1 steg 2", 10 * sqrt(3) / 20, sqrt(3) / 2)
chk("Eks 2.1 C=60", areal(8, 5, 60), 10 * sqrt(3))
chk("Eks 2.1 C=120", areal(8, 5, 120), 10 * sqrt(3))
chk("Eks 2.1 spiss+stump", 60 + 120, 180)
# Eks 2.2: firkant
t1 = ar(8, 10, 40)
t2 = ar(10, 7, 55)
chk("Eks 2.2 t1", round(t1, 1), 25.7)
chk("Eks 2.2 t2", round(t2, 1), 28.7)
chk("Eks 2.2 sum", round(25.7 + 28.7, 1), 54.4)
chk("Eks 2.2 sum nøyaktig", round(t1 + t2, 1), 54.4)
chk("Eks 2.2 sin40", round(math.sin(math.radians(40)), 4), 0.6428)
chk("Eks 2.2 sin55", round(math.sin(math.radians(55)), 4), 0.8192)

# ---------- Del 1 ----------
chk("1.1a", areal(4, 6, 30), 6)
chk("1.1b", areal(7, 4, 90), 14)
chk("1.1c", areal(10, 2, 150), 5)
chk("1.1d", areal(8, 3, 45), 6 * sqrt(2))

chk("1.2a", "B", "B")
chk("1.2b", areal(6, 8, 30), 12)

chk("1.3a", round(ar(7.5, 9.2, 64), 1), 31.0)
chk("1.3b", round(ar(12.4, 8.6, 118), 1), 47.1)

chk("1.4a", areal(12, 9, 120), 27 * sqrt(3))
chk("1.4b", areal(8, 5, 135), 10 * sqrt(2))
chk("1.4c", areal(10, 6, 60), 15 * sqrt(3))

# 1.5 pil for pil
sant("1.5 pil 1", Rational(1, 2) * 6 * 8 * sn(120) == areal(6, 8, 120), "innsatt")
sant("1.5 pil 2", Rational(1, 2) * 6 * 8 == 24, "1/2 * 6 * 8 = 24")
sant("1.5 pil 3 feil", sn(120) != -sqrt(3) / 2, "sin 120 er ikke -sqrt3/2")
chk("1.5 riktig", areal(6, 8, 120), 12 * sqrt(3))
chk("1.5 sin120", sn(120), sqrt(3) / 2)

chk("1.6a", round(ar(4.2, 3.5, 75), 1), 7.1)
chk("1.6b", round(ar(4.2, 3.5, 105), 1), 7.1)
chk("1.6 sin105=sin75", round(math.sin(math.radians(105)) - math.sin(math.radians(75)), 12), 0)

# 1.7: bevis med stump B. Vinkel CBD = 180 - B, h = a sin(180-B) = a sin B
chk("1.7 a", 180 - 110, 70)
chk("1.7 bevis (tallprøve B=110)", Rational(1, 2) * 7 * (5 * sin(rad(180 - 110))) - Rational(1, 2) * 7 * 5 * sin(rad(110)), 0)
chk("1.7 symbolsk", sin(pi - v) - sin(v), 0)

# 1.8
chk("1.8a eks", [areal(5, 8, 30), areal(5, 8, 150)], [10, 10])
chk("1.8a mot", [areal(5, 8, 30), areal(5, 8, 60)], [10, 10 * sqrt(3)])
sant("1.8a noen ganger", areal(5, 8, 30) == areal(5, 8, 150) and areal(5, 8, 30) != areal(5, 8, 60), "samme areal for v og 180-v, ellers ikke")
sant("1.8b noen ganger", areal(5, 8, 60) < areal(5, 8, 90) and areal(5, 8, 150) < areal(5, 8, 90), "øker til 90, minker etter")
chk("1.8b maks", areal(5, 8, 90), 20)

# 1.9
chk("1.9 areal 45", areal(4, 4, 45), 4 * sqrt(2))
chk("1.9 areal 90", areal(4, 4, 90), 8)
sant("1.9 moteksempel", areal(4, 4, 90) != 2 * areal(4, 4, 45), "8 != 8 sqrt2")

# 1.10
s = symbols("s", positive=True)
chk("1.10a", Rational(1, 2) * s * s * sn(60), sqrt(3) / 4 * s**2)
chk("1.10b", solve(Eq(sqrt(3) / 4 * s**2, 16 * sqrt(3)), s), [8])

chk("Sjekk 1a", areal(9, 4, 30), 9)
aapen("Sjekk 1b", "Mangler faktoren 1/2")
chk("Sjekk 1c", areal(7, 3, 90), Rational(7 * 3, 2))

# ---------- Del 2 ----------
los("2.1a", Eq(Rational(1, 2) * a * 8 * sn(90), 20), [5], var=a)
los("2.1b", Eq(Rational(1, 2) * a * 6 * sn(30), 12), [8], var=a)
los("2.1c", Eq(Rational(1, 2) * a * 4 * sn(60), 6 * sqrt(3)), [6], var=a)

chk("2.2a", Rational(1, 2) * 10 * 4, 20)
chk("2.2b sin", Rational(10, 20), Rational(1, 2))
chk("2.2b vinkler", [sn(30), sn(150)], [Rational(1, 2), Rational(1, 2)])
chk("2.2b areal", [areal(10, 4, 30), areal(10, 4, 150)], [10, 10])

chk("2.3a", sinv(0.6), (36.9, 143.1))
chk("2.3b", sinv(0.25), (14.5, 165.5))
chk("2.3c", sinv(0.9), (64.2, 115.8))

k24 = 2 * 28 / (9 * 7)
chk("2.4a", sinv(k24), (62.7, 117.3))
chk("2.4b", round(ar(9, 7, 117.3), 1), 28.0)

chk("2.5a sin", Rational(2 * 12, 6 * 8) * sqrt(2), sqrt(2) / 2)
chk("2.5a", [sn(45), sn(135)], [sqrt(2) / 2, sqrt(2) / 2])
chk("2.5a areal", [areal(6, 8, 45), areal(6, 8, 135)], [12 * sqrt(2), 12 * sqrt(2)])
chk("2.5b sin", Rational(2 * 14, 7 * 4), 1)
chk("2.5b", areal(7, 4, 90), 14)
chk("2.5c sin", Rational(2 * 15, 6 * 4), Rational(5, 4))
sant("2.5c ingen", Rational(2 * 15, 6 * 4) > 1 and areal(6, 4, 90) == 12, "maks areal er 12 < 15")

# 2.6 firkant
ar26 = ar(9, 12, 35) + ar(12, 8, 50)
chk("2.6 t1", round(ar(9, 12, 35), 1), 31.0)
chk("2.6 t2", round(ar(12, 8, 50), 1), 36.8)
chk("2.6", round(ar26, 1), 67.7)

# 2.7
chk("2.7 pil 1", Rational(1, 2) * 6 * 8, 24)
chk("2.7 pil 2", 12 * sqrt(3) / 24, sqrt(3) / 2)
chk("2.7 riktig", [areal(6, 8, 60), areal(6, 8, 120)], [12 * sqrt(3), 12 * sqrt(3)])

# 2.8
chk("2.8a", areal(6, 8, 30), 12)
aapen("2.8b", "Uendelig mange: alle a og b med a*b = 48")
chk("2.8b prøve", [areal(4, 12, 30), areal(2, 24, 30)], [12, 12])
chk("2.8c sin", Rational(2 * 12, 3 * 8), 1)
chk("2.8c", areal(3, 8, 90), 12)

# 2.9
Tt = symbols("T", positive=True)
chk("2.9 maks", areal(6, 10, 90), 30)
chk("2.9 sinC", 2 * 12 / (6 * 10), Rational(2, 5))
sant("2.9 to", 0 < Rational(2 * 12, 60) < 1, "T = 12: to løsninger")
sant("2.9 én", Rational(2 * 30, 60) == 1, "T = 30: én løsning")
sant("2.9 ingen", Rational(2 * 35, 60) > 1, "T = 35: ingen løsning")

chk("Sjekk 2a", areal(8, 9, 30), 18)
los("Sjekk 2a likning", Eq(Rational(1, 2) * a * 9 * sn(30), 18), [8], var=a)
chk("Sjekk 2b", sinv(0.3), (17.5, 162.5))
aapen("Sjekk 2c", "sin v = sin(180 - v): to vinkler, samme høyde")

# ---------- Utfordring ----------
chk("U1", 6 * areal(4, 4, 60), 24 * sqrt(3))
chk("U2 sin", 2 * 1600 / (50 * 80), Rational(4, 5))
chk("U2", sinv(0.8), (53.1, 126.9))
chk("U3", areal(7, 12, 90), 42)
sant("U3 sin<=1", all(areal(7, 12, d) <= 42 for d in range(1, 180)), "sin v <= 1")
aapen("U4", "Diagonal deler parallellogram i to like trekanter; hver har areal 1/2 ab sin v")
chk("U4 tallprøve", 2 * areal(5, 4, 30), 5 * 4 * sn(30))
chk("U5 T4", Rational(4, 2) * sn(90), 2)
chk("U5 T6", Rational(6, 2) * sn(60), 3 * sqrt(3) / 2)
chk("U5 T12", Rational(12, 2) * sn(30), 3)

# U6 kjør koden slik den står i oppgaven
kode = """
import math
n = 6
res = []
while n <= 1536:
    T = n / 2 * math.sin(math.radians(360 / n))
    res.append((n, round(T, 4)))
    n = n * 2
"""
ns = {}
exec(kode, ns)
res = dict(ns["res"])
chk("U6a", res[12], 3.0)
chk("U6a n=6", res[6], 2.5981)
chk("U6b", round(res[1536], 3), round(math.pi, 3))
sant("U6c", all(res[m] <= 3.1416 for m in res), "T_n nærmer seg pi nedenfra")
aapen("U6d", "Polygonet fyller sirkelen i grensen; sirkelens areal er pi * 1^2")

rapport()
