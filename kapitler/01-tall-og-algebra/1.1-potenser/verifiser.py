"""Regner alle svar i 1.1 Potenser på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *

# ---------- Eksempler ----------
chk("Eks 1.1", ((2 * a**3) ** 2 * a) / (4 * a**5), a**2)
chk("Eks 1.1 kontroll", Rational((2 * 8) ** 2 * 2, 4 * 32), 4)
chk("Eks 2.1", (2 * x**-3 * x**5) / (x**0 * 4 * x), x / 2)
chk("Eks 2.2", (3 * 10**5) * (4 * Rational(1, 10**8)), Rational(12, 1000))
chk("Eks 2.2 std", Rational(12, 1000), Rational(12, 10) * Rational(1, 100))

# ---------- Del 1 ----------
chk("1.1a", 3**4 * 3**2, 3**6)
chk("1.1b", Rational(5**7, 5**3), 5**4)
chk("1.1c", (2**3) ** 4, 2**12)
chk("1.1d", a**5 * a, a**6)

chk("1.2a", (2 * 5) ** 3, 1000)
chk("1.2b", Rational(2, 3) ** 2, Rational(4, 9))
chk("1.2c", (-2) ** 4, 16)
chk("1.2d", -(2**4), -16)

chk("1.3a", a**4 * a**3, a**7)
chk("1.3b", a**4 * a**3 / a**2, a**5)

chk("1.4a", (3 * x**2) ** 3, 27 * x**6)
chk("1.4b", (6 * a**5 * b**2) / (2 * a**2 * b), 3 * a**3 * b)
chk("1.4c", (2 * x**3) ** 2 / x**4, 4 * x**2)
chk("1.4d", (x**2 / y) ** 3 * y**4, x**6 * y)

chk("1.5a", Rational(8**2, 2**5), 2)
chk("1.5b", Rational(9**3, 3**5), 3)
chk("1.5c", Rational(4**5, 8**3), 2)

chk("1.6", (3 * a**2) ** 2 / (3 * a**3), 3 * a)
sant("1.6 feil", (3 * a**2) ** 2 != 3 * a**4, "(3a^2)^2 er ikke 3a^4")

# 1.7a: a^5 = a^6 bare for a = 0 og a = 1  -> noen ganger
los("1.7a", Eq(a**2 * a**3, a**6), [0, 1], var=a)
# 1.7b: (a+b)^2 = a^2 + b^2  <=>  2ab = 0  -> noen ganger
chk("1.7b", expand((a + b) ** 2 - (a**2 + b**2)), 2 * a * b)
chk("1.7c", expand((a * b) ** 3), a**3 * b**3)

los("1.8", Eq(4**n * 2**3 / 8, 2**10), [5], var=n)

chk("Sjekk 1a", x**8 / x**2 * x, x**7)
chk("Sjekk 1b", [(-3) ** 2, -(3**2)], [9, -9])
aapen("Sjekk 1c", "2^3 * 2^4 = (2*2*2)*(2*2*2*2) = 7 faktorer")

# ---------- Del 2 ----------
chk("2.1a", 7**0, 1)
chk("2.1b", Rational(2) ** -3, Rational(1, 8))
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
chk("2.6", round(avstand_km / 1e8, 1), 1.5)

aapen("2.7", "a^3/a^3 = a^0 og = 1. Krever a != 0 fordi vi deler på a.")
# 2.8: 2^-10 = 1/1024 < 10^-3 = 1/1000 < 4^-4 = 1/256
sant("2.8", Rational(1, 2**10) < Rational(1, 10**3) < Rational(1, 4**4), "rekkefølge")
chk("2.8 størst", max(Rational(1, 2**10), Rational(1, 10**3), Rational(1, 4**4)), Rational(1, 256))

chk("Sjekk 2a", Rational(3) ** -2, Rational(1, 9))
chk("Sjekk 2b", Rational(45, 10) * Rational(1, 10**4), Rational(45, 100000))
chk("Sjekk 2c", 25 * 10**3, Rational(25, 10) * 10**4)

# ---------- Utfordring ----------
chk("U1", ((2 * a**2 * b**-1) ** 3 * (a * b) ** 2) / (4 * a**7 * b**-2), 2 * a * b)
chk("U2", Rational(2**5 * 6**3, 3**2 * 12**2), Rational(16, 3))
los("U3a", Eq(2**x, Rational(1, 32)), [-5])
los("U3b", Eq(9**x, 27), [Rational(3, 2)])
los("U3c", Eq(4 ** (x + 1), 8**x), [2])


def minste_n(grunntall, grense, streng=False):
    m = 0
    while (grunntall**m <= grense) if streng else (grunntall**m < grense):
        m += 1
    return m


chk("U4a", minste_n(2, 10**6), 20)
chk("U4b", minste_n(3, 10**9, streng=True), 19)

sant("U5", 2**100 > 3**60, "2^100 = 32^20 > 27^20 = 3^60")
chk("U6", len(str(4**6 * 5**10)), 11)
sant("U7a", (2**3) ** 2 != 2 ** (3**2), "m=3, n=2: 2^6 != 2^9")
par = [(m, nn) for m in range(1, 30) for nn in range(1, 30) if m * nn == m**nn]
sant("U7b", all(nn == 1 or (m, nn) == (2, 2) for m, nn in par) and (2, 2) in par, "n = 1 eller m = n = 2")

rapport()
