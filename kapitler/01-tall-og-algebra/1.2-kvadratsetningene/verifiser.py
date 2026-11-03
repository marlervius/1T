"""Regner alle svar i 1.2 Kvadratsetningene og faktorisering på nytt. Kjøres av sjekk.py / bygg.py."""
import contextlib
import io

from kontroll import *

m, d = symbols("m d")
p, q = symbols("p q")

# ---------- Eksempler ----------
chk("Eks 1.1", expand((3 * x - 2) ** 2), 9 * x**2 - 12 * x + 4)
chk("Eks 1.1 kontroll", (3 * 1 - 2) ** 2, 9 - 12 + 4)
chk("Eks 1.2", 49 * 51, (50 - 1) * (50 + 1))
chk("Eks 1.2 std", (50 - 1) * (50 + 1), 50**2 - 1)
chk("Eks 2.1", factor(2 * x**3 - 18 * x), 2 * x * (x - 3) * (x + 3))
chk("Eks 2.1 kontroll", expand(2 * x * (x - 3) * (x + 3)), 2 * x**3 - 18 * x)
chk("Eks 2.2", factor(x**2 + 6 * x + 9), (x + 3) ** 2)
chk("Eks 2.2 kontroll", (1 + 3) ** 2, 1 + 6 + 9)

# ---------- Del 1 ----------
chk("1.1a", expand((x + 5) ** 2), x**2 + 10 * x + 25)
chk("1.1b", expand((a - 3) ** 2), a**2 - 6 * a + 9)
chk("1.1c", expand((2 * b + 1) ** 2), 4 * b**2 + 4 * b + 1)
chk("1.1d", expand((m + n) ** 2), m**2 + 2 * m * n + n**2)

chk("1.2a", expand((x + 4) * (x - 4)), x**2 - 16)
chk("1.2b", expand((a + 7) * (a - 7)), a**2 - 49)
chk("1.2c", expand((2 * p + 3) * (2 * p - 3)), 4 * p**2 - 9)
chk("1.2d", expand((5 - y) * (5 + y)), 25 - y**2)

chk("1.3a", expand((a + b) ** 2 - a**2 - b**2), 2 * a * b)
chk("1.3b", expand(a**2 - b**2), expand((a + b) * (a - b)))

chk("1.4a", expand((x + 3) ** 2 - (x - 3) ** 2), 12 * x)
chk("1.4b", expand((2 * a - 1) ** 2 + 4 * a), 4 * a**2 + 1)
chk("1.4c", expand((3 * x - 2) * (3 * x + 2) - 5 * x**2), 4 * x**2 - 4)
chk("1.4d", expand((m + 2) ** 2 - (m + 2) * (m - 2)), 4 * m + 8)

chk("1.5a", 51**2, 2601)
chk("1.5b", 98**2, 9604)
chk("1.5c", 29 * 31, 899)

chk("1.6a", expand((x - 3) * (x - 3)), x**2 - 6 * x + 9)
sant("1.6b", (-3) * (-3) == 9, "(-3)(-3) = +9, ikke -9")

chk("1.7a", expand((a - b) ** 2 - (b - a) ** 2), 0)
los("1.7b", Eq((x + 2) ** 2, x**2 + 4), [0])
chk("1.7c", expand((2 * a + b) ** 2 - (4 * a**2 + b**2)), 4 * a * b)

sol = solve(Poly(expand((x + p) ** 2 - (x**2 + 10 * x + q)), x).all_coeffs(), [p, q], dict=True)[0]
chk("1.8", (sol[p], sol[q]), (5, 25))
chk("1.8 kontroll", expand((x + 5) ** 2), x**2 + 10 * x + 25)

chk("1.9a", expand((a + b) ** 2 - (a - b) ** 2), 4 * a * b)
chk("1.9b", 103**2 - 97**2, 4 * 100 * 3)

chk("Sjekk 1a", expand((x - 2) ** 2), x**2 - 4 * x + 4)
chk("Sjekk 1b", ((a + b) * (a - b)).subs({a: 5, b: 2}), 21)
aapen("Sjekk 1c", "Forklaring med arealfiguren eller et talleksempel, for eksempel a = 1, b = 1.")

# ---------- Del 2 ----------
chk("2.1a", factor(3 * x + 9), 3 * (x + 3))
chk("2.1b", factor(4 * a - 8 * b), 4 * (a - 2 * b))
chk("2.1c", factor(x**2 + x), x * (x + 1))
chk("2.1d", factor(6 * m**2 - 3 * m), 3 * m * (2 * m - 1))

chk("2.2a", factor(x**2 - 4), (x + 2) * (x - 2))
chk("2.2b", factor(a**2 - 25), (a + 5) * (a - 5))
chk("2.2c", factor(9 - y**2), (3 + y) * (3 - y))

chk("2.3a", factor(x**2 + 8 * x + 16), (x + 4) ** 2)
chk("2.3b", factor(4 * x**2 + 12 * x + 9), (2 * x + 3) ** 2)

chk("2.4a", factor(5 * x**2 - 10 * x), 5 * x * (x - 2))
chk("2.4b", factor(2 * a**3 - 8 * a), 2 * a * (a - 2) * (a + 2))
chk("2.4c", factor(3 * x**2 - 12), 3 * (x - 2) * (x + 2))
chk("2.4d", factor(x**3 - x), x * (x - 1) * (x + 1))

aapen("2.5a", "Nei. Vi kan trekke ut x av x^2 + 2x, så faktoriseringen er ikke fullstendig.")
chk("2.5b", factor(4 * x**2 + 8 * x), 4 * x * (x + 2))

chk("2.6", cancel((x**2 - 9) / (x + 3)), x - 3)

chk("2.7a", expand((x - 2) ** 2), x**2 - 4 * x + 4)
chk("2.7b", expand((x + 3) * (x - 3) - (x**2 + 9)), -18)
los("2.7c", Eq(x**2 - 9, (x - 3) ** 2), [3])
chk("2.8", factor(x**2 + 6 * x - 16), (x - 2) * (x + 8))

chk("Sjekk 2a", factor(3 * a**2 - 6 * a), 3 * a * (a - 2))
chk("Sjekk 2b", factor(x**2 - 49), (x + 7) * (x - 7))
chk("Sjekk 2c", factor(2 * x**2 + 8 * x + 8), 2 * (x + 2) ** 2)

# ---------- Ekstra utfordring ----------
chk("U1", expand((2 * x + 3) ** 2 - (2 * x - 3) ** 2), 24 * x)
chk("U2a", factor(3 * x**3 - 27 * x), 3 * x * (x - 3) * (x + 3))
chk("U2b", factor(12 * a**2 - 3 * b**2), 3 * (2 * a - b) * (2 * a + b))

chk("U3", expand((n + 1) ** 2 - n**2), 2 * n + 1)

los("U4", Eq(k**2, 100), [10, -10], var=k)
chk("U4a", factor(x**2 + 10 * x + 25), (x + 5) ** 2)
chk("U4b", factor(x**2 - 10 * x + 25), (x - 5) ** 2)

KODE = """for n in range(1, 11):
    v = (n + 1)**2 - n**2
    h = 2*n + 1
    print(n, v == h)
"""
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    exec(KODE, {})
sant(
    "U5a",
    buf.getvalue().strip().splitlines() == [f"{i} True" for i in range(1, 11)],
    "programmet skriver True for n = 1 til 10",
)
aapen("U5b", "Sjekken dekker bare n = 1 til 10. Et bevis må gjelde for alle heltall n.")

chk("U6a", expand((m - d) * (m + d)), m**2 - d**2)
chk("U6b", 47 * 53, 50**2 - 3**2)

chk("U7a", factor(x**4 - 16), (x - 2) * (x + 2) * (x**2 + 4))
aapen("U7b", "x^2 + 4 har ingen reelle nullpunkter, så den kan ikke faktoriseres videre med reelle tall.")

rapport()
