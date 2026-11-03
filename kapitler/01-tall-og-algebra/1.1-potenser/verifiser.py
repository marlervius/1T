"""Regner alle svar i 1.1 Potenser på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *

# ---------- Eksempler (hvert steg) ----------
start = ((2 * a**3) ** 2 * a) / (4 * a**5)
chk("Eks 1.1 steg 1", (4 * a**6 * a) / (4 * a**5), start)
chk("Eks 1.1 steg 2", (4 * a**7) / (4 * a**5), start)
chk("Eks 1.1 steg 3", a**2, start)
chk("Eks 1.1 kontroll", Rational((2 * 8) ** 2 * 2, 4 * 32), 4)
chk("Eks 1.1 kontroll 2", 2**2, 4)
start = (2 * x**-3 * x**5) / (x**0 * 4 * x)
chk("Eks 2.1 steg 1", (2 * x**2) / (1 * 4 * x), start)
chk("Eks 2.1 steg 2", Rational(2, 4) * x ** (2 - 1), start)
chk("Eks 2.1 steg 2b", x / 2, start)
start = (3 * 10**5) * (4 * Rational(1, 10**8))
chk("Eks 2.2 steg 1", (3 * 4) * Rational(10) ** (5 + (-8)), start)
chk("Eks 2.2 steg 2", 12 * Rational(10) ** -3, start)
chk("Eks 2.2 steg 3", Rational(12, 10) * 10 * Rational(10) ** -3, start)
chk("Eks 2.2 std", Rational(12, 10) * Rational(10) ** -2, start)

# ---------- Vanlige feil ----------
los("VF 1a", Eq(a**3 * a**4, a**12), [0, 1], var=a)
chk("VF 1a tall", [2**7, 2**12], [128, 4096])
chk("VF 1a riktig", a**3 * a**4, a**7)
sant("VF 1b", (2 * 1) ** 3 == 8 and 2 * 1**3 == 2 and 8 != 2, "a=1: 8 != 2")
chk("VF 1b riktig", (2 * a) ** 3, 8 * a**3)
sant("VF 1c", -(2**4) == -16 and (-2) ** 4 == 16, "-2^4 = -16, (-2)^4 = 16")
sant("VF 1d", (1 + 1) ** 2 == 4 and 1**2 + 1**2 == 2, "a=b=1: 4 != 2")
chk("VF 2a", Rational(2) ** -3, Rational(1, 8))
chk("VF 2b", 5**0, 1)
sant("VF 2c", 12 > 10 and 12 * Rational(10) ** -3 == Rational(12, 10) * Rational(1, 100), "12 > 10")

# ---------- Del 1 ----------
chk("1.1a", 3**4 * 3**2, 3**6)
chk("1.1b", Rational(5**7, 5**3), 5**4)
chk("1.1c", (2**3) ** 4, 2**12)
chk("1.1d", a**5 * a, a**6)

chk("1.2a", (2 * 5) ** 3, 1000)
chk("1.2b", Rational(2, 3) ** 2, Rational(4, 9))
chk("1.2c", (-5) ** 2, 25)
chk("1.2d", -(5**2), -25)

chk("1.3a", a**4 * a**3, a**7)
chk("1.3b", a**4 * a**3 / a**2, a**5)

chk("1.4a", (3 * x**2) ** 3, 27 * x**6)
chk("1.4b", (6 * a**5 * b**2) / (2 * a**2 * b), 3 * a**3 * b)
chk("1.4c", (2 * x**3) ** 2 / x**4, 4 * x**2)
chk("1.4d", (x**2 / y) ** 3 * y**4, x**6 * y)

chk("1.5a", Rational(8**2, 2**5), 2)
chk("1.5b", Rational(9**3, 3**5), 3)
chk("1.5c", Rational(4**5, 8**3), 2)

k0 = ((2 * b**3) ** 3 * b**2) / (4 * b**6)
k1 = (8 * b**9 * b**2) / (4 * b**6)
k2 = (8 * b**18) / (4 * b**6)
k3 = 2 * b**12
sant("1.6 pil 1", simplify(k0 - k1) == 0, "riktig")
sant("1.6 pil 2", simplify(k1 - k2) != 0, "feil: b^9*b^2 = b^11, ikke b^18")
chk("1.6 b^9*b^2", b**9 * b**2, b**11)
sant("1.6 pil 3", simplify(k2 - k3) == 0, "riktig")
chk("1.6 riktig", k0, 2 * b**5)

# 1.7a: a^5 = a^6 bare for a = 0 og a = 1  -> noen ganger
los("1.7a", Eq(a**2 * a**3, a**6), [0, 1], var=a)
# 1.7b: (-a)^3 = -a^3 alltid
chk("1.7b", expand((-a) ** 3 - (-(a**3))), 0)
# 1.7c: a^6/a^2 = a^3 bare for a = 1 (a = 0 er ikke tillatt)
# sympy forkorter a^6/a^2 til a^4 og mister a != 0, så vi fjerner a = 0 selv
sant("1.7c", [v for v in solve(Eq(a**4, a**3), a) if v != 0] == [1], "a^4 = a^3 gir a = 1 (a = 0 ikke tillatt)")
# 1.7d: 3^n + 3^n = 3^(n+1) aldri; 2^n + 2^n = 2^(n+1) alltid
los("1.7d", Eq(3**n + 3**n, 3 ** (n + 1)), [], var=n)
chk("1.7d forskjell", 3**n + 3**n - 3 ** (n + 1), -(3**n))
chk("1.7d 2^n", simplify(2**n + 2**n - 2 ** (n + 1)), 0)

sant("1.8 grunntall 4, 8, 16", 2**12 == 4**6 and 2**12 == 8**4 and 2**12 == 16**3, "4^6, 8^4, 16^3")
sant("1.8 grunntall 32", all(32**k != 2**12 for k in range(0, 20)) and Rational(12, 5).q != 1, "5x = 12 gir x = 12/5")

chk("Sjekk 1a", x**8 / x**2 * x, x**7)
chk("Sjekk 1b", [(-3) ** 2, -(3**2)], [9, -9])
aapen("Sjekk 1c", "2^3 * 2^4 = (2*2*2)*(2*2*2*2) = 7 faktorer")

# ---------- Del 2 ----------
chk("2.1a", 7**0, 1)
chk("2.1b", Rational(6) ** -2, Rational(1, 36))
chk("2.1c", Rational(10) ** -2, Rational(1, 100))
chk("2.1d", Rational(1, 2) ** -1, 2)

chk("2.2a", Rational(52, 10) * 10**4, 52000)
chk("2.2b", Rational(71, 10) * Rational(1, 10**3), Rational(71, 10000))
chk("2.2c", 340 * 10**5, Rational(34, 10) * 10**7)

chk("2.3a", x**-2, 1 / x**2)
chk("2.3b", 3 * a**-1, 3 / a)
chk("2.3c", 1 / b**-4, b**4)

chk("2.4a", a**-2 * a**6 / a**3, a)
chk("2.4b", (2 * x**-1) ** 3, 8 / x**3)
chk("2.4c", (6 * x**2 * y**-1) / (3 * x**-1 * y**2), 2 * x**3 / y**3)
chk("2.4d", (a**-1 / b**2) ** -2, a**2 * b**4)

chk("2.5a", (2 * 10**3) * (Rational(45, 10) * Rational(1, 10**7)), 9 * Rational(1, 10**4))
chk("2.5b", (6 * 10**4) / (Rational(15, 10) * Rational(1, 10**2)), 4 * 10**6)
chk("2.5c", (3 * Rational(1, 10**2)) ** 3, Rational(27, 10) * Rational(1, 10**5))

avstand_km = 8.3 * 60 * 3.0e8 / 1000
avrund("2.6", avstand_km / 1e8, 1, 1.5)
avrund("2.6 mellomsvar", 8.3 * 60 * 3.0e8 / 1000 / 1e8, 1, 1.5)
chk("2.6 sekunder", Rational(83, 10) * 60, 498)

# 2.7a: 2^-n = 1/2^n > 0 for alle heltall n  -> aldri
sant("2.7a", all(Rational(2) ** -k > 0 for k in range(-20, 21)), "aldri negativ")
# 2.7b: a^-1 < a  <=>  sann for a > 1 og -1 < a < 0
ulikhet("2.7b", 1 / a < a, Union(Interval.open(-1, 0), Interval.open(1, oo)), var=a)
sant("2.7b tall", Rational(1, 2) < 2 and not (2 < Rational(1, 2)), "a=2 ja, a=1/2 nei")
# 2.7c: standardform bevares ikke alltid
chk("2.7c ja", (2 * 10**3) * (3 * 10**4), 6 * 10**7)
chk("2.7c nei", (5 * 10**3) * (4 * 10**2), 20 * 10**5)
sant("2.7c std", 1 <= 6 < 10 and not (1 <= 20 < 10), "6 er standardform, 20 ikke")
# 2.8: 2^-10 = 1/1024 < 10^-3 = 1/1000 < 4^-4 = 1/256
sant("2.8", Rational(1, 2**10) < Rational(1, 10**3) < Rational(1, 4**4), "rekkefølge")
chk("2.8 størst", max(Rational(1, 2**10), Rational(1, 10**3), Rational(1, 4**4)), Rational(1, 256))

chk("Sjekk 2a", Rational(3) ** -2, Rational(1, 9))
chk("Sjekk 2b", Rational(45, 10) * Rational(1, 10**4), Rational(45, 100000))
chk("Sjekk 2c", 25 * 10**3, Rational(25, 10) * 10**4)

# ---------- Utfordring ----------
chk("U1", ((2 * a**2 * b**-1) ** 3 * (a * b) ** 2) / (4 * a**7 * b**-2), 2 * a * b)
chk("U2", Rational(2**5 * 6**3, 3**2 * 12**2), Rational(16, 3))
chk("U2 steg 1", Rational(2**5 * (2 * 3) ** 3, 3**2 * (2**2 * 3) ** 2), Rational(16, 3))
chk("U2 steg 2", Rational(2**5 * 2**3 * 3**3, 3**2 * 2**4 * 3**2), Rational(16, 3))
chk("U2 steg 3", Rational(2**8 * 3**3, 2**4 * 3**4), Rational(16, 3))
chk("U2 steg 4", Rational(2**4, 3), Rational(16, 3))
los("U3a", Eq(2**x, Rational(1, 32)), [-5])
los("U3b", Eq(9**x, 27), [Rational(3, 2)])
los("U3c", Eq(4 ** (x + 1), 8**x), [2])


import io
import contextlib


def kjor(kode):
    ut = io.StringIO()
    with contextlib.redirect_stdout(ut):
        exec(kode, {})
    return ut.getvalue().strip()


# Koden slik den står i oppgaven (U4)
kode_oppgave = """n = 0
while 2**n < 10**6:
    n = n + 1
print(n)
"""
# Fasitens endrede linje 2
kode_fasit = kode_oppgave.replace("while 2**n < 10**6:", "while 3**n <= 10**9:")
sant("U4 linje endret", kode_fasit != kode_oppgave and "while 3**n <= 10**9:" in kode_fasit, "linje 2 byttet")
chk("U4a", kjor(kode_oppgave), "20")
chk("U4b", kjor(kode_fasit), "19")
sant("U4 begrunnelse", 2**19 == 524288 and 2**20 == 1048576 and 2**19 < 10**6 < 2**20, "tallene i fasiten")

sant("U5", 2**100 > 3**60 and 2**100 == 32**20 and 3**60 == 27**20, "2^100 = 32^20 > 27^20 = 3^60")
chk("U6", len(str(4**6 * 5**10)), 11)
sant("U7a", (2**3) ** 2 != 2 ** (3**2), "m=3, n=2: 2^6 != 2^9")
par = [(m, nn) for m in range(1, 30) for nn in range(1, 30) if m * nn == m**nn]
sant("U7b", all(nn == 1 or (m, nn) == (2, 2) for m, nn in par) and (2, 2) in par, "n = 1 eller m = n = 2")

rapport()
