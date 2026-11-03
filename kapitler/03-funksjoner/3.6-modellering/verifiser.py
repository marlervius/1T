"""Regner alle svar i 3.6 Modellering på nytt (numpy for regresjon, sympy for resten).
R^2 regnes slik et digitalt verktøy gjør det: 1 - SSE/SST på y-verdiene."""
from kontroll import *
import numpy as np

_chk = chk


def _py(v):
    if isinstance(v, (list, tuple)):
        return [_py(e) for e in v]
    if isinstance(v, np.generic):
        return v.item()
    return v


def chk(nr, verdi, forventet, tol=1e-9):
    return _chk(nr, _py(verdi), _py(forventet), tol)



def lin(xs, ys):
    a_, b_ = np.polyfit(xs, ys, 1)
    return float(a_), float(b_)


def eks(xs, ys):
    s, l = np.polyfit(xs, np.log(ys), 1)
    return float(np.exp(l)), float(np.exp(s))


def pot(xs, ys):
    s, l = np.polyfit(np.log(xs), np.log(ys), 1)
    return float(np.exp(l)), float(s)


def kv(xs, ys):
    return [float(v) for v in np.polyfit(xs, ys, 2)]


def r2(ys, pred):
    ys, pred = np.array(ys, float), np.array(pred, float)
    return float(1 - ((ys - pred) ** 2).sum() / ((ys - ys.mean()) ** 2).sum())


def type_av(xs, ys):
    """Gjenkjenn lineær, eksponentiell eller potens (som i 3.5)."""
    xs, ys = np.array(xs, float), np.array(ys, float)
    d = np.diff(ys)
    if np.allclose(d, d[0]):
        return "lineær"
    f = ys[1:] / ys[:-1]
    if np.allclose(np.diff(xs), 1) and np.allclose(f, f[0]):
        return "eksponentiell"
    # x dobles: sjekk at hvert par (x, 2x) gir samme faktor
    par = [ys[list(xs).index(2 * v)] / ys[i] for i, v in enumerate(xs) if 2 * v in xs]
    if len(par) >= 2 and np.allclose(par, par[0]):
        return "potens"
    return "ukjent"


# ================= DEL 1 =================
# ---------- Eksempel 1: app (tenkte data) ----------
xa = list(range(6))
ya = [2.1, 3.0, 4.3, 6.2, 9.0, 12.7]
chk("Eks 1.1 diff", [round(ya[i + 1] - ya[i], 1) for i in range(5)], [0.9, 1.3, 1.9, 2.8, 3.7])
chk("Eks 1.1 forhold", [round(ya[i + 1] / ya[i], 2) for i in range(4)], [1.43, 1.43, 1.44, 1.45], tol=0.006)
chk("Eks 1.1 type", type_av(xa, [2, 4, 8, 16, 32, 64]), "eksponentiell")
Aa, Ba = eks(xa, ya)
chk("Eks 1.1 a", round(Aa, 2), 2.09)
chk("Eks 1.1 b", round(Ba, 2), 1.44)
chk("Eks 1.1 vekst %", round((Ba - 1) * 100), 44)
chk("Eks 1.1 R2 eks", round(r2(ya, [Aa * Ba**v for v in xa]), 3), 1.0, tol=0.001)
a_l, b_l = lin(xa, ya)
chk("Eks 1.1 R2 lin", round(r2(ya, [a_l * v + b_l for v in xa]), 2), 0.94)
chk("Eks 1.1 f(5)", round(Aa * Ba**5, 1), 12.8)

# ---------- Eksempel 2: turlag, variabelvalg ----------
ar = list(range(2010, 2016))
yt = [212, 228, 247, 261, 280, 297]
a1, b1 = lin(ar, yt)
chk("Eks 1.2 årstall konstantledd", round(b1), -33958)
a2, b2 = lin(range(6), yt)
chk("Eks 1.2 stigning", round(a2, 1), 17.0)
chk("Eks 1.2 start", round(b2), 212)
chk("Eks 1.2 f(7)", round(a2 * 7 + b2), 331)
chk("Eks 1.2 diff", [yt[i + 1] - yt[i] for i in range(5)], [16, 19, 14, 19, 17])

# ---------- Teoriboks: tabell over typer ----------
chk("Teori type lin", type_av([0, 1, 2, 3], [3, 7, 11, 15]), "lineær")

# ---------- Vanlige feil ----------
sant("VF 1a", round(b1) == -33958 and round(b2) == 212, "årstall som x gir konstantledd -33958, ikke 212")
chk("VF 1b", round((Ba - 1) * 100), 44)
chk("VF 1c type", type_av([1, 2, 3, 4], [4, 7, 10, 13]), "lineær")

# ---------- Nivå 1 ----------
chk("1.1a", type_av([1, 2, 3, 4], [5, 9, 13, 17]), "lineær")
chk("1.1b", type_av([0, 1, 2, 3], [5, 15, 45, 135]), "eksponentiell")
chk("1.1c", type_av([1, 2, 4, 8], [5, 20, 80, 320]), "potens")
sant("1.1c uttrykk", all(5 * v**2 == w for v, w in zip([1, 2, 4, 8], [5, 20, 80, 320])), "y = 5x^2")
chk("1.2a", [45 * 0 + 120, 45 * 10 + 120], [120, 570])
chk("1.2b", [800 * Rational(115, 100) ** 0, 800 * Rational(115, 100) ** 2], [800, 1058])
chk("1.2c V(10)", 45 * 10 + 120, 570)
chk("1.2c N(2)", 800 * Rational(115, 100) ** 2, 1058)

xe = list(range(6))
ye = [120, 171, 226, 272, 331, 379]
ae, be = lin(xe, ye)
chk("1.3a", type_av(xe, [10, 20, 30, 40, 50, 60]), "lineær")
chk("1.3b stigning", round(ae, 1), 52.0)
chk("1.3b start", round(be), 120)
chk("1.3c", round(ae * 10 + be), 640)
chk("1.3d R2", round(r2(ye, [ae * v + be for v in xe]), 3), 0.999, tol=0.001)

# ---------- Nivå 2 ----------
xv = list(range(7))
yv = [120, 160, 215, 290, 380, 510, 690]
chk("1.4a forhold", [round(yv[i + 1] / yv[i], 2) for i in range(6)], [1.33, 1.34, 1.35, 1.31, 1.34, 1.35], tol=0.006)
chk("1.4a diff", [yv[i + 1] - yv[i] for i in range(6)], [40, 55, 75, 90, 130, 180])
av, bv = eks(xv, yv)
chk("1.4b a", round(av), 120)
chk("1.4b b", round(bv, 2), 1.34)
chk("1.4c vekst %", round((bv - 1) * 100), 34)
chk("1.4d", float(f"{av * bv**8:.2g}"), 1200)
chk("1.4d med avrundet modell", float(f"{120 * 1.34**8:.2g}"), 1200)
al, bl = lin(xv, yv)
chk("1.4 R2 eks", round(r2(yv, [av * bv**v for v in xv]), 2), 1.0, tol=0.006)
chk("1.4 R2 lin", round(r2(yv, [al * v + bl for v in xv]), 2), 0.94)

xp = [0.25, 0.5, 1.0, 1.5, 2.0]
yp = [1.0, 1.42, 2.01, 2.46, 2.84]
chk("1.5a", [round(1.42 / 1.0, 2), round(2.01 / 1.42, 2)], [1.42, 1.42], tol=0.006)
ap, bp = pot(xp, yp)
chk("1.5b a", round(ap, 2), 2.01)
chk("1.5b b", round(bp, 2), 0.50)
chk("1.5c", round(ap * 3**bp, 1), 3.5)
chk("1.5c avrundet modell", round(2.01 * 3**0.502, 1), 3.5)
chk("1.5d", round(2**bp, 1), 1.4)
chk("1.5 R2", round(r2(yp, [ap * v**bp for v in xp]), 3), 1.0, tol=0.001)

# 1.6: finn første feil
x6 = list(range(5))
y6 = [50, 60, 72, 86, 104]
sant("1.6 pil 1", [y6[i + 1] - y6[i] for i in range(4)] == [10, 12, 14, 18], "differansene 10, 12, 14, 18 er ikke like")
sant("1.6 pil 2", all(abs(y6[i + 1] / y6[i] - 1.2) < 0.01 for i in range(4)), "forholdet er omtrent 1,2")
a6, b6 = eks(x6, y6)
sant("1.6 pil 3", abs(a6 - 50) < 0.1 and abs(b6 - 1.2) < 0.01, "regresjon gir 50 * 1,2^x")
sant("1.6 pil 4 feil", 50 * 1.2 * 5 != 50 * 1.2**5, "50*1,2*5 er ikke 50*1,2^5")
chk("1.6 riktig", round(50 * 1.2**5, 1), 124.4)

# ---------- Nivå 3 ----------
# 1.7a: like store tillegg => lineær (alltid)
chk("1.7a", type_av([1, 2, 3, 4, 5], [9, 14, 19, 24, 29]), "lineær")
# 1.7b: regresjonskurven går ikke gjennom alle punkter, med mindre dataene passer nøyaktig
sant("1.7b nei", abs(a_l * 2 + b_l - ya[2]) > 0.1, "lineær modell for app-data treffer ikke punktet")
sant("1.7b ja", abs(lin([0, 1], [3, 8])[0] * 1 + lin([0, 1], [3, 8])[1] - 8) < 1e-9, "to punkter: linja treffer begge")
# 1.7c: stigningstall per måned er 1/12 av stigningstall per år
a_mnd, _ = lin([12 * v for v in xe], ye)
chk("1.7c", a_mnd, ae / 12, tol=1e-9)

# 1.8: lag selv
x8 = list(range(5))
y8 = [20, 30, 45, 68, 101]
a8, b8 = eks(x8, y8)
l8 = lin(x8, y8)
sant("1.8 eks R2", r2(y8, [a8 * b8**v for v in x8]) > 0.999, "eksponentiell R2 > 0,999")
sant("1.8 lin R2", r2(y8, [l8[0] * v + l8[1] for v in x8]) < 0.96, "lineær R2 under 0,96")
chk("1.8 b", round(b8, 2), 1.5)
aapen("1.8 begrunnelse", "Forklar valget: faktor 1,5 for hvert steg")

# 1.9: x dobles og y dobles, men x øker ikke med 1
chk("1.9", type_av([1, 2, 4, 8], [6, 12, 24, 48]), "potens")
sant("1.9 y=6x", all(6 * v == w for v, w in zip([1, 2, 4, 8], [6, 12, 24, 48])), "y = 6x")
chk("1.9 fra x=1 til 3 med 6x", [6 * 3], [18])
sant("1.9 eks passer ikke", abs(eks([1, 2, 4, 8], [6, 12, 24, 48])[0] * eks([1, 2, 4, 8], [6, 12, 24, 48])[1] ** 3 - 18) > 3, "eksponentiell modell gir feil verdi for x=3")

# Sjekk 1
chk("Sjekk 1a", type_av([0, 1, 2, 3], [80, 40, 20, 10]), "eksponentiell")
chk("Sjekk 1a faktor", Rational(40, 80), Rational(1, 2))
aapen("Sjekk 1b", "x = år etter 2010 gir konstantledd som betyr noe")
chk("Sjekk 1c", [3.5 * 0 + 12, 3.5 * 10 + 12], [12, 47])

# ================= DEL 2 =================
# ---------- Eksempel 1: temperatur ----------
xt = [6, 8, 10, 12, 14, 16, 18, 20]
yt2 = [7.8, 11.5, 14.1, 16.4, 17.0, 16.3, 13.9, 10.4]
ct = kv(xt, yt2)
chk("Eks 2.1 a", round(ct[0], 3), -0.157)
chk("Eks 2.1 b", round(ct[1], 2), 4.30)
chk("Eks 2.1 c", round(ct[2], 1), -12.7)
chk("Eks 2.1 R2", round(r2(yt2, np.polyval(ct, xt)), 3), 0.992, tol=0.001)
chk("Eks 2.1 T(2)", round(float(np.polyval(ct, 2)), 1), -4.7)
chk("Eks 2.1 T(0)", round(float(np.polyval(ct, 0)), 1), -12.7)
chk("Eks 2.1 T(13)", round(float(np.polyval(ct, 13)), 1), 16.7)
chk("Eks 2.1 toppunkt", round(-ct[1] / (2 * ct[0]), 1), 13.7)
chk("Eks 2.1 forskjell", round(8.5 - float(np.polyval(ct, 2)), 1), 13.2)

# ---------- Eksempel 2: avisutdrag ----------
chk("Eks 2.2 vekst", Rational(15600, 12000), Rational(13, 10))
chk("Eks 2.2 lineær", 12000 + (15600 - 12000) / 3 * 20, 36000)
chk("Eks 2.2 eksp", round(12000 * 1.3 ** (20 / 3), -3), 69000)
chk("Eks 2.2 prosent per år", round((1.3 ** (1 / 3) - 1) * 100, 1), 9.1)

# ---------- Vanlige feil ----------
sant("VF 2a", abs(r2([1, 3], [1, 3]) - 1) < 1e-9, "linje gjennom to punkter har R2 = 1")
chk("VF 2b", -3 * 20 + 45, -15)

# ---------- Nivå 1 ----------
chk("2.1a", -2 * 4 + 60, 52)
chk("2.1b", -2 * 35 + 60, -10)
los("2.1c", Eq(-2 * x + 60, 0), [30])
aapen("2.2", "tre omskrivinger med forbehold")
chk("2.3a", r2([1, 2, 3], [1, 2, 3]), 1)
aapen("2.3b", "R2 = 0,12: modellen passer dårlig")
aapen("2.3c", "R2 = 0,6: se på punktplott, prøv annen modelltype")

# ---------- Nivå 2 ----------
xb = list(range(8))
yb = [12, 25, 33, 38, 36, 31, 22, 9]
cb = kv(xb, yb)
chk("2.4a a", round(cb[0], 2), -2.19)
chk("2.4a b", round(cb[1], 1), 14.8)
chk("2.4a c", round(cb[2], 1), 12.3, tol=0.06)
chk("2.4a R2", round(r2(yb, np.polyval(cb, xb)), 3), 0.998, tol=0.001)
chk("2.4b x", round(-cb[1] / (2 * cb[0]), 1), 3.4)
chk("2.4b y", round(float(np.polyval(cb, -cb[1] / (2 * cb[0]))), 1), 37.3, tol=0.06)
chk("2.4c f(8)", round(float(np.polyval(cb, 8)), 1), -9.5, tol=0.06)
chk("2.4d nullpunkt", round(max(np.roots(cb)), 1), 7.5)

# 2.5 Fjellvik
chk("2.5a", [6080 - 5200, Rational(6080 - 5200, 8)], [880, 110])
chk("2.5b", round((6080 - 5200) / 5200 * 100, 1), 16.9)
chk("2.5c tre punkter", [5200 + 110 * 4, 5200 + 110 * 8], [5640, 6080])
chk("2.5c 2040", 5200 + 110 * 25, 7950)
chk("2.5d", Rational(8500 - 5200, 25), Rational(132))

# 2.6 finn første feil
los("2.6 pil 1", Eq(Rational(5, 2) * x + 40, 100), [24])
chk("2.6 pil 2", 100 - 40, 60)
chk("2.6 pil 3 riktig", Rational(60) / Rational(5, 2), 24)
sant("2.6 pil 3 feil", Rational(60) / Rational(5, 2) != 25, "60 / 2,5 er 24, ikke 25")
chk("2.6 år", 2020 + 24, 2044)

# ---------- Nivå 3 ----------
# 2.7a: høyest R2 er ikke alltid best for prognose (se bilpris-data i U7: R2 høyest for andregrad)
xbil = list(range(1, 9))
ybil = [310, 262, 224, 193, 170, 153, 142, 138]
cbil = kv(xbil, ybil)
abil, bbil = eks(xbil, ybil)
sant("2.7a", r2(ybil, np.polyval(cbil, xbil)) > r2(ybil, [abil * bbil**v for v in xbil]) and np.polyval(cbil, 15) > np.polyval(cbil, 8),
     "andregrad har høyere R2, men gir stigende pris etter 8 år")
# 2.7b: negativt stigningstall gir negative verdier til slutt
los("2.7b", Eq(-0.5 * x + 20, 0), [40])
# 2.7c: skift av x endrer a, ikke b
xs_ar = [2010 + v for v in range(6)]
ys_e = [100, 111, 124, 137, 152, 168]
ar_, br_ = eks(range(6), ys_e)
ar2_, br2_ = eks(xs_ar, ys_e)
sant("2.7c", abs(br_ - br2_) < 1e-6 and abs(ar2_ - ar_ * br_ ** (-2010)) / ar2_ < 1e-6, "b er lik, a skaleres med b^(-2010)")

# 2.8 fiber
xf = list(range(6))
yf = [100, 111, 124, 137, 152, 168]
alf, blf = lin(xf, yf)
aef, bef = eks(xf, yf)
chk("2.8a lin a", round(alf, 1), 13.6)
chk("2.8a lin b", round(blf), 98)
chk("2.8a eks a", round(aef), 100)
chk("2.8a eks b", round(bef, 2), 1.11)
chk("2.8a R2 lin", round(r2(yf, [alf * v + blf for v in xf]), 3), 0.996, tol=0.001)
chk("2.8a R2 eks", round(r2(yf, [aef * bef**v for v in xf]), 4), 0.9998, tol=0.0002)
chk("2.8b lin", round(alf * 15 + blf), 302)
chk("2.8b eks", float(f"{aef * bef**15:.2g}"), 480)
chk("2.8b eks avrundet modell", float(f"{100 * 1.11**15:.2g}"), 480)
aapen("2.8c", "Argumenter ut fra situasjonen: markedet metter seg, vekst i prosent kan ikke fortsette")

# 2.9 befolkning
chk("2.9a", round(5 * 1.015**200), 98)
aapen("2.9b", "Ressurser og plass er begrenset")
aapen("2.9c", "Kurve som flater ut mot en øvre grense")

# Sjekk 2
los("Sjekk 2a", Eq(-4 * x + 50, 0), [Rational(25, 2)])
aapen("Sjekk 2b", "Ifølge modellen ...")
aapen("Sjekk 2c", "Prognose utenfor dataene er usikker")

# ================= UTFORDRING =================
# U1: modelltype ut fra situasjon
chk("U1a", type_av(range(5), [1000 * Rational(88, 100) ** i for i in range(5)]), "eksponentiell")
chk("U1b", type_av(range(5), [30 + 4 * i for i in range(5)]), "lineær")
chk("U1c", type_av([1, 2, 4, 8], [v**2 for v in [1, 2, 4, 8]]), "potens")
chk("U1d", type_av(range(5), [3 * 2**i for i in range(5)]), "eksponentiell")

# U2 fisk
xfi = [10, 15, 20, 30, 40]
yfi = [12, 40, 95, 320, 760]
chk("U2a", [round(95 / 12, 1), round(760 / 95, 1)], [7.9, 8.0], tol=0.06)
afi, bfi = pot(xfi, yfi)
chk("U2b a", round(afi, 4), 0.0121)
chk("U2b b", round(bfi, 2), 2.99)
chk("U2c", round(2**bfi), 8)
chk("U2d", float(f"{afi * 60**bfi:.2g}"), 2600, tol=60)
chk("U2d avrundet modell", float(f"{0.0121 * 60**2.99:.2g}"), 2500, tol=60)
chk("U2 R2", round(r2(yfi, [afi * v**bfi for v in xfi]), 3), 1.0, tol=0.001)

# U3 app-avis
chk("U3a", [Rational(90000, 50000), Rational(162000, 90000)], [Rational(9, 5), Rational(9, 5)])
sant("U3 tall", 50000 * 1.8**8 > 5.5e6 and 50000 * 1.8**7 < 5.5e6, "5,5 millioner nås etter 8 år, ikke 7")
chk("U3c", 2023 + 8, 2031)
chk("U3 lineær", 50000 + 80000 * 8, 690000)
aapen("U3d", "Vurder: modellen bygger på tre punkter, 'alle' er urealistisk, vekst må flate ut")

# U4 program
xs_p = [14, 17, 20, 23, 26, 29]
ys_p = [22, 31, 36, 47, 52, 63]
kode = """
x = [14, 17, 20, 23, 26, 29]
y = [22, 31, 36, 47, 52, 63]
n = len(x)
x_snitt = sum(x) / n
y_snitt = sum(y) / n
teller = 0
nevner = 0
for i in range(n):
    teller = teller + (x[i] - x_snitt) * (y[i] - y_snitt)
    nevner = nevner + (x[i] - x_snitt) ** 2
a = teller / nevner
b = y_snitt - a * x_snitt
"""
ns = {}
exec(kode, ns)
a_np, b_np = lin(xs_p, ys_p)
chk("U4a", [round(ns["a"], 4), round(ns["b"], 2)], [2.6571, -15.30], tol=0.006)
chk("U4b", [round(a_np, 4), round(b_np, 2)], [2.6571, -15.30], tol=0.006)
chk("U4 snitt", [ns["x_snitt"], ns["y_snitt"]], [21.5, 41.8333333], tol=1e-6)

# U5 lag selv: potens
x5 = [1, 2, 4, 8, 16]
y5 = [2, 6, 17, 50, 150]
a5, b5 = pot(x5, y5)
sant("U5 pot", r2(y5, [a5 * v**b5 for v in x5]) > 0.999, "potens R2 over 0,999")
sant("U5 eks", r2(y5, [eks(x5, y5)[0] * eks(x5, y5)[1] ** v for v in x5]) < 0.7, "eksponentiell passer dårlig")
chk("U5 forhold", [round(y5[i + 1] / y5[i], 1) for i in range(4)], [3.0, 2.8, 2.9, 3.0], tol=0.06)
aapen("U5", "Lag selv: x dobles, y ganges med omtrent samme tall")

# U6 bevis og tall
xm, ym, am, bm = symbols("xm ym am bm")
chk("U6a", (am * xm + (ym - am * xm)) - ym, 0)
chk("U6b", 20 - 3.0 * 4, 8)

# U7 bilpris
chk("U7a a", round(cbil[0], 2), 3.54)
chk("U7a b", round(cbil[1], 1), -56.1)
chk("U7a c", round(cbil[2]), 361)
chk("U7a R2", round(r2(ybil, np.polyval(cbil, xbil)), 4), 0.9998, tol=0.0002)
chk("U7b", round(float(np.polyval(cbil, 15))), 315)
chk("U7b vertex", round(-cbil[1] / (2 * cbil[0]), 1), 7.9)
chk("U7c a", round(abil), 327)
chk("U7c b", round(bbil, 2), 0.89)
chk("U7c R2", round(r2(ybil, [abil * bbil**v for v in xbil]), 2), 0.97)
chk("U7c 15", round(abil * bbil**15), 55)
aapen("U7d", "Forklar hvorfor en bruktbil ikke blir dyrere av å bli eldre")

rapport()
