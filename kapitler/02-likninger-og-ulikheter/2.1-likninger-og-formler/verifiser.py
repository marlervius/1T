"""Regner alle svar i 2.1 Likninger og formler på nytt."""
from kontroll import *

C, F, P, A, h, s, v, u, m, G, V, O, l, T = symbols("C F P A h s v u m G V O l T")

# ---------- Eksempler ----------
chk("Eks 1.1 moteksempel", (1 - 2) ** 2 - (1**2 - 4), 4)
chk("Eks 1.1 riktig", expand((x - 2) ** 2), x**2 - 4 * x + 4)
los("Eks 1.2a", (2 * (x + 3), 2 * x + 6), "alle")
los("Eks 1.2b", (2 * (x + 3), 2 * x + 5), [])
los("Eks 2.1", Eq((x - 1) / 3 - (x + 2) / 4, 1), [22])
chk("Eks 2.1 kontroll", Rational(21, 3) - Rational(24, 4), 1)
chk("Eks 2.2", solve(Eq(A, (a + b) * h / 2), b)[0].subs({A: 30, a: 4, h: 5}), 8)
chk("Eks 2.2 snudd", solve(Eq(A, (a + b) * h / 2), b)[0], 2 * A / h - a)
chk("Eks 2.2 kontroll", Rational((4 + 8) * 5, 2), 30)

# ---------- Del 1 ----------
aapen("1.1a", "uttrykk")
los("1.1b", Eq(4 * x - 1, 11), [Rational(3)])
aapen("1.1c", "funksjon")
los("1.1d", (3 * (x + 4), 3 * x + 12), "alle")

sant("1.2a", 3 * 4 - 5 == 7, "x = 4 er løsning")
sant("1.2b", 2 * 4 + 1 != 4 + 6, "x = 4 er ikke løsning")
los("1.2b løsning", Eq(2 * x + 1, x + 6), [5])
sant("1.2c", 4**2 == 3 * 4 + 4, "x = 4 er løsning")

aapen("1.3a", "0 = 0: alle tall er løsninger")
aapen("1.3b", "0 = 7: ingen løsning")
los("1.3c", Eq(3 * x, 15), [5])

chk("1.4a moteksempel", (1 + 5) ** 2 - (1**2 + 25), 10)
chk("1.4a riktig", expand((x + 5) ** 2), x**2 + 10 * x + 25)
chk("1.4b", expand((x - 4) * (x + 4)), x**2 - 16)
los("1.4b alle", ((x - 4) * (x + 4), x**2 - 16), "alle")
sant("1.4c x=1", 1**2 + 2 == 3 * 1, "stemmer")
sant("1.4c x=2", 2**2 + 2 == 3 * 2, "stemmer")
sant("1.4c x=3", 3**2 + 2 != 3 * 3, "moteksempel")
los("1.4c", Eq(x**2 + 2, 3 * x), [1, 2])

los("1.5a", (2 * (3 * x - 1), 6 * x - 2), "alle")
los("1.5b", (5 * x - 2 * (x + 1), 3 * x + 4), [])
chk("1.5b forenklet", expand(5 * x - 2 * (x + 1)), 3 * x - 2)
los("1.5c", Eq(4 * (x - 2) + x, 3 * x + 6), [7])

los("1.6a", (3 * (x + 2) - (x - 4), 2 * x + 10), "alle")
chk("1.6b", expand(3 * (x + 2) - (x - 4)), 2 * x + 10)

chk("1.7a", expand((x + 6) ** 2 - (x - 6) ** 2), 24 * x)
los("1.7a alle", ((x + 6) ** 2 - (x - 6) ** 2, 24 * x), "alle")
los("1.7b", Eq(x**2, 2 * x), [0, 2])
los("1.7c", Eq(x**2 + 1, 0), [])

los("1.8a", Eq(x / 2 + 1, x - Rational(1, 2)), [3])
los("1.8b", (x / 3 + 1, x / 3 + 2), [])
los("1.8c", (x / 2 + x / 2, x), "alle")

sant("1.9a", sqrt(2**2) == 2, "x>=0 er løsning")
sant("1.9b", sqrt((-1) ** 2) != -1, "moteksempel")
chk("1.9c", simplify(sqrt(Symbol("p", positive=True) ** 2)), Symbol("p", positive=True))

aapen("Sjekk 1a", "7x + 2 er et uttrykk")
los("Sjekk 1b", (3 * x + 4, 3 * x - 1), [])
aapen("Sjekk 1c", "Tall kan vise moteksempel, men aldri bevise alle x")

# ---------- Del 2 ----------
los("2.1a", Eq(x / 3 + 2, 5), [9])
los("2.1b", Eq(x / 2, x / 5 + 6), [20])
los("2.1c", Eq((x + 1) / 3, 4), [11])

los("2.2", Eq((x + 3) / 2 + x / 3, 4), [3])
chk("2.2 fellesnevner", expand(6 * ((x + 3) / 2 + x / 3)), 5 * x + 9)
chk("2.2 høyre side", 6 * 4, 24)
chk("2.2 kontroll", Rational(3 + 3, 2) + Rational(3, 3), 4)

chk("2.3b", Rational(9, 5) * 25 + 32, 77)
los("2.3c", Eq(50, Rational(9, 5) * C + 32), [10], var=C)
aapen("2.3a", "F og C er variable, 1,8 og 32 er konstanter")

chk("2.4a", solve(Eq(v, s / t), s)[0], v * t)
chk("2.4b", solve(Eq(v, s / t), t)[0], s / v)

los("2.5a", Eq((2 * x - 1) / 3 - (x + 4) / 6, 2), [6])
los("2.5b", Eq(x / 2 - (x - 3) / 5, 3), [8])
los("2.5c", Eq((x + 2) / 4 - (x - 1) / 3, Rational(1, 2)), [4])

los("2.6a", Eq((x + 5) / 2 - (x - 1) / 3, 4), [7])
chk("2.6b", expand(6 * ((x + 5) / 2 - (x - 1) / 3)), x + 17)
chk("2.6c", solve(Eq(x + 13, 24), x)[0], 11)

chk("2.7a", solve(Eq(O, 2 * (l + b)), b)[0], O / 2 - l)
chk("2.7b", solve(Eq(s, (v + u) * t / 2), u)[0], 2 * s / t - v)
chk("2.7c", solve(Eq(V, G * h / 3), h)[0], 3 * V / G)

chk("2.8a", 15 + 2 * 5, 25)
los("2.8b", Eq(15 + 2 * t, 95), [40], var=t)
chk("2.8c", solve(Eq(P, 15 + 2 * t), t)[0], (P - 15) / 2)

los("2.9a", Eq((x - 4) / 3, (x - 4) / 6), [4])
sant("2.9b", Rational(1, 3) != Rational(1, 6), "1/3 er ikke 1/6")
chk("2.10a", solve(Eq(x / a + x / b, 1), x)[0], a * b / (a + b))
los("2.10a tall", Eq(x / 2 + x / 3, 1), [Rational(6, 5)])
los("2.10b", (x / 2 + x / (-2), 1), [])

los("Sjekk 2a", Eq(x / 4 + 1, x / 2), [4])
chk("Sjekk 2b", solve(Eq(F, m * a), a)[0], F / m)
aapen("Sjekk 2c", "Gang hvert ledd, også 6 * (x+7)/2 = 3(x+7)")

# ---------- Utfordring ----------
los("U1", Eq(x - (x - 2) / 3, (x + 4) / 2 - 1), [2])
los("U2b", (2 * (x - 1), 2 * x + 4), [])
chk("U2d", expand(a * (x - 1) - (2 * x + 4)), (a - 2) * x - a - 4)
chk("U2a", solve(Eq(3 * (x - 1), 2 * x + 4), x)[0], 7)
sant("U2c", all((a_ - 2 != 0) or (a_ + 4 != 0) for a_ in range(-10, 11)), "a-2=0 og a+4=0 samtidig er umulig")
los("U3", Eq(C, Rational(9, 5) * C + 32), [-40], var=C)
los("U4a", Eq(49 + 16 * x, 89 + 12 * x), [10])
chk("U4b A 6", 49 + 16 * 6, 145)
chk("U4b B 6", 89 + 12 * 6, 161)
chk("U4b A 25", 49 + 16 * 25, 449)
chk("U4b B 25", 89 + 12 * 25, 389)


def losning(p, q, r, s_):
    if p != r:
        return "én løsning: " + str((s_ - q) / (p - r))
    elif q == s_:
        return "alle tall er løsninger"
    else:
        return "ingen løsning"


chk("U5a", losning(3, 1, 1, 5), "én løsning: 2.0")
chk("U5b", losning(2, 3, 2, 3), "alle tall er løsninger")
chk("U5c", losning(2, 1, 2, 4), "ingen løsning")
los("U6", (1 / x - 1 / (x + 1), 1 / (x * (x + 1))), "alle")
chk("U6 teller", together(1 / x - 1 / (x + 1)), 1 / (x * (x + 1)))
sant("U7a", sqrt((-1) ** 2) != -1, "x = -1")
chk("U7b", sqrt(0**2), 0)

rapport()
