const step = (q, answer, hint, solution) => ({ q, answer, hint, solution });

export const mellomsteg = {
  r1: {
    grenser: step('Prøv x = 1,9 i brøken (x²−4)/(x−2) etter forkorting. Hvilken verdi får du?', 3.9,
      'Faktoriser telleren som (x−2)(x+2).', 'Siden x ≠ 2, kan vi forkorte. Ved x = 1,9 får vi 1,9+2 = 3,9.'),
    derivert: step('Hva er sekantens stigningstall når h = 0,5 i eksemplet med f(x)=x² ved x=2?', 4.5,
      'Bruk den forenklede differansekvotienten 4+h.', 'Sekanten har stigningstall 4+0,5 = 4,5.'),
    analyse: step('Ved hvilken x-verdi er f′(x)=−2x+6 lik null?', 3,
      'Flytt 2x over på den andre siden.', '−2x+6=0 gir 2x=6, så x=3.'),
    logaritmer: step('I likningen ln(x−1)=ln 3 kan vi sammenligne argumentene. Hva må x−1 være?', 3,
      'ln er strengt voksende på de positive tallene.', 'Like logaritmer har like argumenter, så x−1=3.'),
    invers: step('Når f(x)=x² på x≥0, hvilken verdi av x gir f(x)=4?', 2,
      'På den valgte definisjonsmengden bruker vi den ikke-negative kvadratroten.', 'x=√4=2, så f⁻¹(4)=2.'),
    vekstmodeller: step('Hva er tidsforskjellen i døgn mellom første og andre måling i Orange-serien?', 366,
      'Bruk døgnkolonnen for observasjonene med stammeomkrets 30 og 58 mm.', 'Andre måling er på døgn 484 og første på døgn 118. Forskjellen er 484−118=366 døgn.'),
    vektorer: step('Hvor mye øker y-koordinaten fra A=(1,2) til B=(4,6)?', 4,
      'Trekk startkoordinaten fra sluttkoordinaten.', '6−2=4, som blir andrekoordinaten til vektoren AB.'),
    parameter: step('Hvor langt flytter punktet seg i x-retningen fra t=0 til t=2 når x(t)=1+3t?', 6,
      'Startposisjonen inngår i både x(0) og x(2).', 'Endringen er x(2)−x(0)=7−1=6.')
  },
  r2: {
    rekker: step('I rekken 100+50+25+… får vi hvert ledd ved å gange med hvilken kvotient?', 0.5,
      'Del andre ledd på første ledd.', 'Kvotienten er 50/100=0,5.'),
    rekursjon: step('Bruk a₂=7 og regelen aₙ₊₁=0,5aₙ+3. Hva er a₃?', 6.5,
      'Sett a₂ inn som forrige ledd i regelen.', 'a₃=0,5·7+3=6,5.'),
    integral: step('Hvor bredt blir hvert delintervall når [0,2] deles i fire like deler?', 0.5,
      'Del intervallengden på antall deler.', 'Hvert delintervall har bredde (2−0)/4=0,5.'),
    fundamentalteorem: step('I ∫₁³ 2x dx bruker vi G(x)=x². Hvilken verdi skal trekkes fra G(3)?', 1,
      'Sett den nedre integrasjonsgrensen inn i G.', 'Trekk fra G(1)=1²=1.'),
    numerisk: step('Hva er gjennomsnittshøyden i trapeset for f(x)=x² på [0,2]?', 2,
      'Ta gjennomsnittet av funksjonsverdiene i endepunktene.', '(f(0)+f(2))/2=(0+4)/2=2.'),
    modeller: step('I modellen f(t)=100·1,02ᵗ er økningen første år 2. Hvilken startverdi deler vi på for å finne relativ økning?', 100,
      'Relativ endring måles fra verdien før endringen.', 'Startverdien er f(0)=100·1,02⁰=100.'),
    modellendring: step('Hvor mange liter per time er tilsiget ved t=3 i modellen q(t)=2t+4?', 10,
      'Sett t=3 inn i raten q.', 'q(3)=2·3+4=10 liter per time.'),
    omdreining: step('Når området under f(x)=x roteres om x-aksen, hva er tverrsnittsarealet delt på π ved x=1,5?', 2.25,
      'Tverrsnittet er en sirkel med radius 1,5.', 'A/π=r²=1,5²=2,25.'),
    parameter: step('Hva er den vertikale hastigheten i m/s ved t=2 når y(t)=4t−t²?', 0,
      'Deriver høyden før du setter inn t=2.', 'vᵧ(2)=4−2·2=0 m/s.'),
    romvektorer: step('Hvilket bidrag gir andrekoordinatene i u=(1,2,2) og v=(2,−1,0) til skalarproduktet?', -2,
      'Multipliser andrekoordinaten i u med andrekoordinaten i v.', 'Bidraget er 2·(−1)=−2.'),
    trigonometri: step('Når f(t)=3+2 sin(πt/6) først når maksimum for t≥0, hva er verdien til sin(πt/6)?', 1,
      'Sinusleddet må være så stort som mulig siden koeffisienten er positiv.', 'Sinus har maksimalverdi 1. Første gang er når πt/6=π/2.'),
    bevis: step('Test faktoriseringen med m=3 og n=4. Hvilket heltall står i parentesen i 2(m+n)?', 7,
      'Når 2 trekkes ut som felles faktor, blir summen m+n igjen.', '2·3+2·4=2(3+4)=2·7. Samme faktorisering virker for alle heltall m og n.')
  }
};
