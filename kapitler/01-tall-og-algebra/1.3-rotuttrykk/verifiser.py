"""Regner alle svar i 1.3 Rotuttrykk og brøkeksponenter på nytt. Kjøres av sjekk.py / bygg.py."""
from kontroll import *

p = symbols("p", positive=True)   # positivt tall (brøkeksponenter krever a > 0)
q = symbols("q", positive=True)
R = Rational

# ---------- Eksempler ----------
chk("Eks 1.1", sqrt(48) - sqrt(12) + sqrt(27), 5 * sqrt(3))
chk("Eks 1.1 trinn", [sqrt(48), sqrt(12), sqrt(27)], [4 * sqrt(3), 2 * sqrt(3), 3 * sqrt(3)])
chk("Eks 1.2", 10 / sqrt(5), 2 * sqrt(5))
chk("Eks 1.2 kontroll", 2 * sqrt(5) * sqrt(5), 10)
chk("Eks 2.1a", root(16, 4) ** 3, 8)
chk("Eks 2.1b", root(16**3, 4), 8)
chk("Eks 2.1c", 16 ** R(3, 4), 8)
chk("Eks 2.2", (p * sqrt(p)) / root(p, 3), p ** R(7, 6))
chk("Eks 2.2 kontroll", (64 * sqrt(64)) / root(64, 3), 128)
chk("Eks 2.2 kontroll2", 64 ** R(7, 6), 128)

# ---------- Del 1 ----------
chk("1.1a", sqrt(81), 9)
chk("1.1b", root(27, 3), 3)
chk("1.1c", real_root(-8, 3), -2)
chk("1.1d", sqrt(R(4, 25)), R(2, 5))

chk("1.2a", sqrt(12), 2 * sqrt(3))
chk("1.2b", sqrt(50), 5 * sqrt(2))
chk("1.2c", sqrt(45), 3 * sqrt(5))
chk("1.2d", sqrt(72), 6 * sqrt(2))


chk("1.3a", sqrt(18) + sqrt(50) - sqrt(8), 6 * sqrt(2))
chk("1.3b", sqrt(20) + sqrt(45), 5 * sqrt(5))
chk("1.3c", 3 * sqrt(12) - sqrt(27), 3 * sqrt(3))
chk("1.3d", sqrt(2) * sqrt(18), 6)

chk("1.4a", 6 / sqrt(3), 2 * sqrt(3))
chk("1.4b", 14 / sqrt(7), 2 * sqrt(7))
chk("1.4c", 4 / sqrt(8), sqrt(2))
chk("1.4d", 6 / sqrt(2), 3 * sqrt(2))

chk("1.5", sqrt(9 + 16), 5)
sant("1.5 feil", sqrt(9) + sqrt(16) != sqrt(9 + 16), "3 + 4 = 7, men sqrt(25) = 5")


sant("1.6a", sqrt((-3) ** 2) != -3 and sqrt(3**2) == 3, "sqrt(x^2) = |x|: x = -3 gir 3, ikke -3 -> noen ganger")
sant("1.6b", sqrt(9 + 16) != sqrt(9) + sqrt(16) and sqrt(0 + 16) == sqrt(0) + sqrt(16), "noen ganger: sant bare når a=0 eller b=0")
chk("1.6b alg", expand((sqrt(p) + sqrt(q)) ** 2 - (p + q)), 2 * sqrt(p) * sqrt(q))
chk("1.6c", sqrt(p) * sqrt(p), p)

chk("1.7a", sqrt(p**2 * q), p * sqrt(q))
chk("1.7b", sqrt(75 * p**2), 5 * p * sqrt(3))

chk("Sjekk 1a", sqrt(32), 4 * sqrt(2))
chk("Sjekk 1b", sqrt(27) + sqrt(3), 4 * sqrt(3))
aapen("Sjekk 1c", "sqrt(9+16) = 5, men sqrt(9)+sqrt(16) = 7")
chk("Sjekk 1c tall", [sqrt(9 + 16), sqrt(9) + sqrt(16)], [5, 7])

# ---------- Del 2 ----------
chk("2.1a", sqrt(7), 7 ** R(1, 2))
chk("2.1b", root(5, 3), 5 ** R(1, 3))
chk("2.1c", sqrt(p**3), p ** R(3, 2))
chk("2.1d", root(p, 3) ** 2, p ** R(2, 3))

chk("2.2a", 25 ** R(1, 2), 5)
chk("2.2b", 27 ** R(1, 3), 3)
chk("2.2c", 4 ** R(3, 2), 8)
chk("2.2d", 8 ** R(2, 3), 4)


chk("2.3a", 27 ** R(-1, 3), R(1, 3))
chk("2.3b", 16 ** R(-3, 4), R(1, 8))
chk("2.3c", R(4, 9) ** R(-1, 2), R(3, 2))
chk("2.3d", 32 ** R(2, 5), 4)

chk("2.4a", p * sqrt(p), p ** R(3, 2))
chk("2.4b", sqrt(p) * root(p, 3), p ** R(5, 6))
chk("2.4c", p**2 / root(p, 4), p ** R(7, 4))
chk("2.4d", root(p**2, 3) / sqrt(p), p ** R(1, 6))

chk("2.5", 25 ** R(-1, 2), R(1, 5))
sant("2.5 feil", -sqrt(25) != 25 ** R(-1, 2), "negativ eksponent gir brøk, ikke negativt tall")

chk("2.6a", round(1.52**1.5, 1), 1.9)
chk("2.6a grov", 1.52**1.5, 1.874, tol=1e-3)
chk("2.6b", 8 ** R(2, 3), 4)
chk("2.6b kontroll", 4 ** R(3, 2), 8)

los("2.7a", Eq(x ** R(3, 2), 27), [9])
los("2.7b", Eq(x ** R(-1, 2), R(1, 5)), [25])

# 2.9a: a^(-1/2) = -sqrt(a) aldri (venstre side > 0, høyre side < 0)
sant("2.8a", all(R(av) ** R(-1, 2) > 0 > -sqrt(R(av)) for av in [R(1, 4), 1, 4, 9, 100]), "aldri: positiv mot negativ")
# 2.9b: a^(1/2) = a/2 bare for a = 4 (a > 0)
los("2.8b", Eq(x ** R(1, 2), x / 2), [4], domene=Interval.open(0, oo))
# 2.9c: a^(1/2) < a bare for a > 1
sant("2.8c", all((R(av) ** R(1, 2) < av) == (av > 1) for av in [R(1, 4), R(1, 2), 1, 2, 4, 9]), "noen ganger: a > 1")

chk("Sjekk 2a", 9 ** R(3, 2), 27)
chk("Sjekk 2b", 8 ** R(-1, 3), R(1, 2))
aapen("Sjekk 2c", "a^(1/2) squared = a^1 = a, derfor er a^(1/2) = sqrt(a)")
chk("Sjekk 2c tall", (7 ** R(1, 2)) ** 2, 7)

# ---------- Utfordring ----------
chk("U1a", 1 / (sqrt(5) + 2), sqrt(5) - 2)
chk("U1b", 6 / (sqrt(7) - 1), sqrt(7) + 1)
chk("U1 eks", 1 / (sqrt(3) - 1), (sqrt(3) + 1) / 2)
chk("U1a nevner", (sqrt(5) + 2) * (sqrt(5) - 2), 1)
chk("U1b nevner", (sqrt(7) - 1) * (sqrt(7) + 1), 6)

chk("U2a", expand((2 + sqrt(3)) ** 2), 7 + 4 * sqrt(3))
chk("U2b", expand((sqrt(5) + sqrt(2)) * (sqrt(5) - sqrt(2))), 3)
chk("U2c", expand((sqrt(3) + sqrt(2)) ** 2 - (sqrt(3) - sqrt(2)) ** 2), 4 * sqrt(6))

los("U3a", Eq(2**x, sqrt(8)), [R(3, 2)])
los("U3b", Eq(9**x, root(3, 3)), [R(1, 6)])
los("U3c", Eq(8**x, 1 / sqrt(2)), [R(-1, 6)])

# Herons metode
def heron(tall, grense=1e-10):
    xx = 1.0
    runder = 0
    while abs(xx * xx - tall) > grense:
        xx = (xx + tall / xx) / 2
        runder += 1
    return runder, xx

chk("U4a runde1", (1 + 2 / R(1)) / 2, R(3, 2))
chk("U4a runde2", (R(3, 2) + 2 / R(3, 2)) / 2, R(17, 12))
chk("U4a kode", heron(2)[0], 4)
chk("U4c", heron(10)[0], 6)
chk("U4c verdi", heron(10)[1], sqrt(10), tol=1e-5)
aapen("U4b", "Hvis x er for stor er 2/x for liten; gjennomsnittet ligger mellom")
print("Herons metode, 2:", heron(2), " 10:", heron(10))

sant("U5", 3 ** 2 > 2**3, "3^(1/3) = 3^(2/6) -> 9^(1/6); 2^(1/2) = 8^(1/6); 9 > 8")
sant("U5 tall", root(3, 3).evalf() > sqrt(2).evalf(), "kontroll numerisk")
chk("U5 pot", [root(3, 3) ** 6, sqrt(2) ** 6], [9, 8])

aapen("U6a", "p^2 = 2 q^2")
aapen("U6b", "p^2 partall -> p partall (oddetall^2 er oddetall)")
chk("U6c", (2 * k) ** 2 / 2, 2 * k**2)
aapen("U6d", "q^2 = 2k^2 partall -> q partall, selvmotsigelse")
aapen("U6e", "sqrt(4): q^2 = k^2 sier ingenting om q er partall")
sant("U6 tall", all(((2 * kk) ** 2 == 4 * qq**2) == (kk == qq) for kk in range(1, 6) for qq in range(1, 6)), "q^2=k^2 gir q=k")

aapen("U7", "Åpen: lag selv. Eksempel 4/(sqrt(7)+sqrt(3)) = sqrt(7)-sqrt(3)")
chk("U7 eks", 4 / (sqrt(7) + sqrt(3)), sqrt(7) - sqrt(3))

rapport()
