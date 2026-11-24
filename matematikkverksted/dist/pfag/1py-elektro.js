const result = (q, answer, unit, hint, solution, wrong, feedback) => ({q, answer: Math.round(answer * 100) / 100, unit, hint, solution, wrong: Math.round(wrong * 100) / 100, feedback});
const n = (s, mod, offset = 0) => Math.abs(Math.trunc(s)) % mod + offset;
export const course = {
  title:'1P-Y Elektro',
  intro:'Matematikk 1P-Y for elektro og datateknologi knytter prosent, økonomi, formler og geometri til situasjoner fra arbeidsliv og hverdag. Eksemplene er fiktive og matematiske. Vis hvordan du regner, og vurder enheter og forutsetninger.',
  source:'https://www.udir.no/lk20/mat08-01/kompetansemaal-og-vurdering/kv28?lang=nob',
  chapters:[
    {
      id:'prosent', title:'Prosent og andeler', summary:'Finn delen, helheten og prosentandelen.',
      theory:['Prosent betyr hundredeler. Andel = del / helhet, og prosentandelen er 100 ganger andelen. Når vi kjenner prosent og helhet, finner vi delen ved å multiplisere helheten med prosenttallet delt på 100.','For å finne helheten fra en kjent del deler vi på andelen som desimaltall. Kontroller alltid hvilket tall som er grunnlaget.'],
      example:['Av 200 fiktive komponenter er 30 kontrollert. Andelen er 30/200 · 100 = 15 %.','Hvis 30 er 15 % av alle komponentene, er antallet 30/0,15 = 200. Kontroll: 0,15 · 200 = 30.'],
      activity:'En fiktiv levering inneholder 240 komponenter. Av dem er 36 kontrollert. Finn prosentandelen, og beregn hvor mange som svarer til 25 %. Undersøk deretter hvor stor leveringen er hvis 36 i stedet er 20 % av hele leveringen.',
      criteria:['Velger riktig grunnlag.','Viser beregninger og kontrollerer svaret.','Forklarer forskjellen på del og helhet.'],
      model:'36/240 · 100 = 15 %. 25 % av 240 er 60. Hvis 36 er 20 %, er helheten 36/0,20 = 180. Kontroll: 20 % av 180 er 36.',
      teacher:'Forkunnskaper: brøk og desimaltall. Vanlig feil: dele på 20 i stedet for 0,20. Be elevene forklare hva 100 % representerer.',
      goals:['Beregne og begrunne prosentandeler, deler og helheter.'],
      task(level,seed){let p=n(seed,8,2)*5, total=n(seed,9,2)*100, part=total*p/100;if(level===0)return result(`En fiktiv levering har ${total} deler. Hvor mange er ${p} % av leveringen?`,part,'deler','Gjør prosentandelen om til desimaltall.',`${total} · ${p}/100 = ${part}.`,total+p,'Multipliser antallet med prosentandelen.');if(level===1)return result(`${part} av ${total} deler er kontrollert. Hvor mange prosent er dette?`,p,'%','Del antallet kontrollerte på hele antallet og gang med 100.',`${part}/${total} · 100 = ${p} %.`,part/total,'Dette er andelen som desimaltall; gang med 100.');return result(`${part} deler utgjør ${p} % av en levering. Hvor mange deler er det i hele leveringen?`,total,'deler','Del delen på prosentandelen skrevet som desimaltall.',`${part}/(${p}/100) = ${total}.`,part*p/100,'Her er delen kjent; del på andelen for å finne helheten.');}
    },
    {
      id:'prisendring', title:'Prisendring og vekstfaktor', summary:'Regn med rabatt, økning og flere endringer.',
      theory:['Ved økning på p % er vekstfaktoren 1 + p/100. Ved nedgang er den 1 − p/100. Ny verdi er gammel verdi multiplisert med vekstfaktoren.','Gjentatte endringer beregnes med én faktor for hver endring. Like mange prosent opp og ned gir vanligvis ikke opprinnelig pris, fordi grunnlaget endres.'],
      example:['En fiktiv vare koster 1000 kr og settes ned 20 %. Ny pris: 1000 · 0,80 = 800 kr.','En senere økning på 20 % gir 800 · 1,20 = 960 kr. Kontroll: 200 kr ned og 160 kr opp.'],
      activity:'Sammenlign en rabatt på 10 % etterfulgt av 20 % med én rabatt på 30 % for en pris på 2000 kr. Bruk tabell og vekstfaktorer og forklar forskjellen.',
      criteria:['Bruker riktig vekstfaktor for hver endring.','Sammenligner beløp og prosent.','Forklarer hvorfor grunnlaget endres.'],
      model:'To rabatter gir 2000 · 0,90 · 0,80 = 1440 kr. Én rabatt på 30 % gir 2000 · 0,70 = 1400 kr. Den andre rabatten i første alternativ beregnes av 1800 kr.',
      teacher:'Forkunnskaper: prosent. Vanlig feil: legge sammen prosentsatsene. Spør hvilket beløp den andre endringen gjelder.',
      goals:['Bruke vekstfaktor og vurdere gjentatte prosentendringer.'],
      task(level,seed){let p=n(seed,5,1)*5,x=n(seed,9,2)*100,f=1-p/100;if(level===0)return result(`En fiktiv vare koster ${x} kr og settes ned ${p} %. Finn ny pris.`,x*f,'kr','Bruk vekstfaktoren 1 − p/100.',`${x} · ${f} = ${x*f} kr.`,x*p/100,'Dette er rabatten, ikke den nye prisen.');if(level===1)return result(`En pris på ${x} kr øker ${p} % to ganger. Finn sluttprisen, avrundet til to desimaler.`,x*(1+p/100)**2,'kr','Multipliser med vekstfaktoren to ganger.',`${x} · (1 + ${p}/100)² = ${(x*(1+p/100)**2).toFixed(2)} kr.`,x*(1+2*p/100),'Den andre økningen gjelder den nye prisen.');return result(`En pris er ${x*f} kr etter ${p} % rabatt. Hva var prisen før rabatten?`,x,'kr','Del ny pris på nedgangsfaktoren.',`${x*f}/${f} = ${x} kr.`,x*f*(1+p/100),'En like stor prosentvis økning opphever ikke rabatten.');}
    },
    {
      id:'lan', title:'Lån, kreditt og privatøkonomi', summary:'Undersøk renter, gebyrer og totale kostnader.',
      theory:['Kreditt er penger som må betales tilbake. Rentekostnad beregnes ut fra gjeld, rentesats og tid; i en enkel modell for ett år med uendret gjeld er rente = gjeld · årlig rentesats.','Totalkostnad omfatter renter og gebyrer i tillegg til tilbakebetaling av lånet. Effektiv rente uttrykker årlig kredittkostnad inklusive relevante gebyrer og er nyttig ved sammenligning, men faktiske tilbud må vurderes etter betingelsene. Nedbetaling endrer normalt gjelden og dermed rentegrunnlaget.'],
      example:['Et fiktivt lån på 10 000 kr har 8 % årlig rente, 300 kr i gebyrer og uendret gjeld i ett år.','Rente 10 000 · 0,08 = 800 kr. Samlet tilbakebetaling i denne enkle modellen er 10 000 + 800 + 300 = 11 100 kr.'],
      activity:'Sammenlign to fiktive ettårige lån på 10 000 kr med uendret gjeld: A har 8 % rente og 300 kr gebyr, B har 10 % rente og 50 kr gebyr. Finn totalkostnad, og drøft hvorfor en realistisk nedbetalingsplan kan gi andre beløp.',
      criteria:['Skiller mellom lånebeløp, renter, gebyrer og totalkostnad.','Oppgir forutsetninger for beregningen.','Sammenligner alternativene med tall.'],
      model:'A koster 800 + 300 = 900 kr utover lånebeløpet. B koster 1000 + 50 = 1050 kr. A er 150 kr billigere i denne modellen; ved avdrag synker rentegrunnlaget etter hvert.',
      teacher:'Forkunnskaper: prosent og budsjett. Skille nominell og effektiv rente uten å kalle en enkel summering effektiv rente. Spør når gjeld og gebyrer betales.',
      goals:['Undersøke og sammenligne privatøkonomiske valg med lån og kreditt.'],
      task(level,seed){let principal=n(seed,8,2)*1000,p=n(seed,7,3),fee=n(seed,5,1)*50,r=principal*p/100;if(level===0)return result(`Et fiktivt lån på ${principal} kr har ${p} % årlig rente. Gjelden er uendret i ett år. Hvor mye blir renten?`,r,'kr','Multipliser lånebeløpet med rentesatsen som desimaltall.',`${principal} · ${p}/100 = ${r} kr.`,principal+r,'Dette inkluderer lånebeløpet; spørsmålet gjelder bare renten.');if(level===1)return result(`Et lån på ${principal} kr har ${p} % årlig rente og ${fee} kr i gebyrer. Gjelden er uendret i ett år. Finn samlet tilbakebetaling.`,principal+r+fee,'kr','Legg sammen lån, rente og gebyr.',`${principal} + ${r} + ${fee} = ${principal+r+fee} kr.`,r+fee,'Dette er kostnaden utover lånebeløpet.');let pay=n(seed,5,2)*500;return result(`Et fiktivt budsjett har ${principal+pay} kr til overs etter andre utgifter. En månedlig kredittbetaling er ${pay} kr. Hvor mye er igjen?`,principal,'kr','Trekk kredittbetalingen fra beløpet til overs.',`${principal+pay} − ${pay} = ${principal} kr.`,principal+pay,'Betalingen må trekkes fra.');}
    },
    {
      id:'formler', title:'Formler og variabler', summary:'Sett inn, omform og kontroller formler.',
      theory:['En formel uttrykker en sammenheng mellom størrelser. Skriv opp hva symbolene betyr og bruk konsistente enheter. For en idealisert modell er effekt P = U · I, med spenning U i volt, strøm I i ampere og effekt P i watt.','En ukjent kan isoleres ved å gjøre samme operasjon på begge sider. Fra P = U · I følger I = P/U når U ≠ 0. Kontrollér ved innsetting og vurder om modellen gjelder.'],
      example:['I en fiktiv lavspenningsmodell er U = 12 V og I = 2 A. Da er P = 12 · 2 = 24 W.','Hvis P = 24 W og U = 12 V, er I = 24/12 = 2 A. Innsetting gir 12 · 2 = 24 W.'],
      activity:'Bruk modellen P = U · I for en fiktiv enhet med konstant spenning 12 V. Lag en tabell for strøm 0, 1, 2 og 3 A og tilhørende effekt. Tegn en graf, finn strømmen når effekten er 30 W, og forklar forutsetningen om konstant spenning.',
      criteria:['Definerer størrelser og enheter.','Viser omforming og innsetting.','Knytter grafen til forutsetningene.'],
      model:'Effektene er 0, 12, 24 og 36 W. Grafen er en rett linje gjennom origo. I = 30/12 = 2,5 A. Dette er en matematisk modell med konstant spenning.',
      teacher:'Forkunnskaper: multiplikasjon, divisjon og likhet. Feil: bytte om teller og nevner. Bruk tall og enheter til å kontrollere.',
      goals:['Tolke, bruke og omforme formler fra programområdet.'],
      task(level,seed){let u=n(seed,5,2)*3,i=n(seed,7,1),p=u*i;if(level===0)return result(`I en fiktiv modell er P = U · I. U = ${u} V og I = ${i} A. Finn P.`,p,'W','Multipliser spenning med strøm.',`${u} · ${i} = ${p} W.`,u+i,'Størrelsene multipliseres.');if(level===1)return result(`P = U · I. I en matematisk modell er P = ${p} W og U = ${u} V. Finn I.`,i,'A','Del effekt på spenning.',`I = ${p}/${u} = ${i} A.`,p*u,'Isoler I ved å dividere med U.');return result(`P = U · I. I en matematisk modell er P = ${p} W og I = ${i} A. Finn U.`,u,'V','Del effekt på strøm.',`U = ${p}/${i} = ${u} V.`,p*i,'Isoler U ved å dividere med I.');}
    },
    {
      id:'enheter', title:'Sammensatte måleenheter', summary:'Regn med effekt, energi, tid og datahastighet.',
      theory:['En sammensatt enhet viser hvordan størrelser er satt sammen: kWh er effekt i kW multiplisert med tid i timer, mens MB/s er datamengde per sekund. Energi og effekt er ulike størrelser.','Bruk enhetene til kontroll. 1000 W = 1 kW og 60 min = 1 time. I denne modulen regner vi 1 GB = 1000 MB når datamengder oppgis desimalt.'],
      example:['En fiktiv enhet med konstant effekt 60 W brukes i 5 timer. 60 W = 0,06 kW.','Energien er 0,06 kW · 5 h = 0,30 kWh. Med 2 kr/kWh er energikostnaden 0,60 kr.'],
      activity:'Sammenlign to fiktive enheter på 40 W og 60 W som brukes 5 timer daglig i 30 dager. Finn energi i kWh og kostnad ved 2 kr/kWh. Undersøk hvordan svaret endres hvis brukstiden halveres.',
      criteria:['Omregner W til kW og bruker tid i timer.','Viser enhetsregning.','Forklarer modellens forutsetninger.'],
      model:'40 W gir 0,04 · 150 = 6 kWh og 12 kr. 60 W gir 9 kWh og 18 kr. Halvert brukstid halverer både energi og kostnad når effekt og pris er konstante.',
      teacher:'Forkunnskaper: enhetsomregning. Vanlig feil: forveksle kW og kWh eller glemme å dele W på 1000. Spør hva enheten forteller.',
      goals:['Tolke og bruke sammensatte måleenheter i programfaglige situasjoner.'],
      task(level,seed){let w=n(seed,8,2)*20,t=n(seed,7,2),e=w*t/1000;if(level===0)return result(`En fiktiv enhet bruker konstant ${w} W i ${t} timer. Finn energien i kWh.`,e,'kWh','Gjør W om til kW og multipliser med timer.',`${w}/1000 · ${t} = ${e} kWh.`,w*t,'Dette er Wh; del på 1000 for kWh.');if(level===1){let rate=n(seed,8,2),sec=n(seed,9,2)*10;return result(`En overføring går med konstant ${rate} MB/s i ${sec} sekunder. Hvor mange MB overføres?`,rate*sec,'MB','Multipliser hastighet med tid.',`${rate} · ${sec} = ${rate*sec} MB.`,rate/sec,'Hastighet multipliseres med tid.');}let price=n(seed,4,2);return result(`En enhet bruker ${w} W i ${t} timer. Energiprisen er ${price} kr/kWh. Finn energikostnaden i kroner.`,e*price,'kr','Regn først om til kWh, og multipliser med prisen.',`${w}/1000 · ${t} · ${price} = ${e*price} kr.`,w*t*price,'Del watt på 1000 før du beregner kWh.');}
    },
    {
      id:'likninger', title:'Likninger og løsningsstrategier', summary:'Løs med balanse, tabell, graf og kontroll.',
      theory:['En likning uttrykker at to uttrykk er like. Balansemetoden bevarer likheten ved å utføre samme operasjon på begge sider. En løsning kan kontrolleres ved innsetting i den opprinnelige likningen.','En tabell kan finne eller avgrense løsningen. Grafisk svarer løsningen av f(x) = g(x) til x-koordinaten til et skjæringspunkt. Grafisk avlesning kan være omtrentlig.'],
      example:['Løs 3x + 4 = 19: trekk fra 4 på begge sider, så 3x = 15. Del på 3: x = 5.','Kontroll: 3 · 5 + 4 = 19. Grafene y = 3x + 4 og y = 19 skjærer hverandre ved (5, 19).'],
      activity:'Løs 4x + 20 = 2x + 60 med balansemetoden. Lag også en verditabell og tegn begge sidene som grafer. Forklar hva skjæringspunktets to koordinater betyr.',
      criteria:['Viser en gyldig algebraisk løsning.','Bruker tabell eller graf til selvstendig kontroll.','Tolker begge koordinatene i skjæringspunktet.'],
      model:'4x + 20 = 2x + 60 gir 2x = 40 og x = 20. Begge uttrykk gir 100 ved x = 20, så skjæringspunktet er (20, 100).',
      teacher:'Forkunnskaper: regnerekkefølge og koordinater. Unngå regelen «flytt og bytt» uten begrunnelse. Spør hvorfor samme operasjon på begge sider bevarer likheten.',
      goals:['Løse likninger med ulike strategier og kontrollere løsninger.'],
      task(level,seed){let a=n(seed,7,2),x=n(seed,9,2),b=n(seed,8,2);if(level===0)return result(`Løs likningen ${a}x = ${a*x}. Hva er x?`,x,'','Del begge sider på koeffisienten.',`${a}x = ${a*x} gir x = ${a*x}/${a} = ${x}.`,a*x,'Del høyresiden på koeffisienten.');if(level===1)return result(`Løs likningen ${a}x + ${b} = ${a*x+b}. Hva er x?`,x,'','Trekk fra konstantleddet og del deretter.',`${a}x = ${a*x}, så x = ${x}. Kontroll: ${a} · ${x} + ${b} = ${a*x+b}.`,(a*x+b)/a,'Trekk fra konstantleddet før du deler.');let c=a+1,d=x+b;return result(`Grafene y = ${c}x + ${b} og y = ${a}x + ${d} skjærer hverandre. Finn x-koordinaten.`,x,'','Sett uttrykkene lik hverandre.',`${c}x + ${b} = ${a}x + ${d} gir x = ${x}.`,d,'Konstantleddet er ikke skjæringspunktets x-koordinat.');}
    },
    {
      id:'pythagoras', title:'Pytagoras i rettvinklede trekanter', summary:'Finn ukjente sider og kontroller trekantens form.',
      theory:['I en rettvinklet trekant er summen av katetenes kvadrater lik hypotenusens kvadrat: a² + b² = c². Hypotenusen c ligger mot den rette vinkelen og er den lengste siden.','Finn hypotenusen med c = √(a² + b²). En katet finnes ved å trekke den andre katetens kvadrat fra hypotenusens kvadrat før du tar kvadratroten.'],
      example:['En matematisk trekant har kateter 3 cm og 4 cm. c = √(3² + 4²) = √25 = 5 cm.','Kontroll: 3² + 4² = 5². Har trekanten hypotenus 5 cm og én katet 3 cm, er den andre √(25 − 9) = 4 cm.'],
      activity:'En rektangulær skisse er 6 cm bred og 8 cm høy. Finn diagonalen med Pytagoras, tegn trekanten og undersøk hvordan diagonalen endres når begge sidene dobles.',
      criteria:['Identifiserer hypotenus og kateter.','Viser kvadrering og kvadratrot.','Kontrollerer med innsetting og enhet.'],
      model:'Diagonalen er √(6² + 8²) = √100 = 10 cm. Dobbel bredde og høyde gir √(12² + 16²) = 20 cm. Alle sidene er doblet.',
      teacher:'Forkunnskaper: kvadrattall og kvadratrøtter. Vanlig feil: bruke formelen for trekanter som ikke er rettvinklede eller legge sammen sidene direkte.',
      goals:['Bruke Pytagoras og vurdere løsningen i en geometrisk situasjon.'],
      task(level,seed){let k=n(seed,8,1),a=3*k,b=4*k,c=5*k;if(level===0)return result(`En rettvinklet trekant har kateter ${a} cm og ${b} cm. Finn hypotenusen.`,c,'cm','Bruk kvadratroten av summen av katetenes kvadrater.',`c = √(${a}² + ${b}²) = ${c} cm.`,a+b,'Legg sammen kvadratene, ikke sidelengdene.');if(level===1)return result(`En rettvinklet trekant har hypotenus ${c} cm og én katet ${a} cm. Finn den andre kateten.`,b,'cm','Trekk katetens kvadrat fra hypotenusens kvadrat.',`b = √(${c}² − ${a}²) = ${b} cm.`,c-a,'Trekk fra kvadratene før du tar kvadratroten.');let w=6*k,h=8*k;return result(`Et rektangel er ${w} cm bredt og ${h} cm høyt. Finn diagonalen.`,10*k,'cm','Diagonalen er hypotenus i en rettvinklet trekant.',`d = √(${w}² + ${h}²) = ${10*k} cm.`,w+h,'Diagonalen er ikke summen av sidene.');}
    },
    {
      id:'trigonometri', title:'Sinus, cosinus og tangens', summary:'Forstå sideforhold og grafisk sammenheng med vinkel.',
      theory:['For en spiss vinkel v i en rettvinklet trekant er sin v = motstående katet / hypotenus, cos v = hosliggende katet / hypotenus og tan v = motstående / hosliggende. Hvilken katet som er motstående, avhenger av vinkelen.','Tegner vi forholdene mot vinkelen fra 0° til 90°, stiger sinus fra 0 til 1, mens cosinus synker fra 1 til 0. Tangens stiger og vokser uten grense når vinkelen nærmer seg 90°; den er ikke definert ved 90°. Bruk gradmodus på kalkulatoren.'],
      example:['I en rettvinklet trekant er motstående katet 3, hosliggende 4 og hypotenus 5. Da er sin v = 3/5 = 0,6, cos v = 4/5 = 0,8 og tan v = 3/4 = 0,75.','v = sin⁻¹(0,6) ≈ 36,87°. Kontroll: tan(36,87°) ≈ 0,75.'],
      activity:'Tegn grafer for sin v, cos v og tan v for 0° ≤ v < 90° i et digitalt verktøy. Sammenlign verdiene ved 30°, 45° og 60°. Tegn trekanter og forklar hvorfor forholdene er uavhengige av trekantenes størrelse.',
      criteria:['Knytter hvert forhold til riktige sider.','Beskriver utviklingen i grafene og gradmodus.','Forklarer formlikhet og kontroll.'],
      model:'sin 30° = 0,5, cos 60° = 0,5 og tan 45° = 1. Sinus stiger og cosinus synker; tangens vokser kraftig mot 90°. Rettvinklede trekanter med samme spisse vinkel er formlike og har samme sideforhold.',
      teacher:'Forkunnskaper: forhold og rettvinklede trekanter. Vanlig feil: velge motstående side uten å angi vinkel eller bruke radianmodus. La elevene variere vinkelen i dynamisk geometri.',
      goals:['Definere og tolke sinus, cosinus og tangens grafisk og geometrisk.'],
      task(level,seed){let k=n(seed,8,1),a=3*k,b=4*k,c=5*k;if(level===0)return result(`For en vinkel v er motstående katet ${a} cm og hypotenusen ${c} cm. Finn sin v som desimaltall.`,0.6,'','Sinus er motstående katet delt på hypotenus.',`sin v = ${a}/${c} = 0,6.`,0.8,'Dette er forholdet for den andre kateten; bruk motstående.');if(level===1)return result(`For en vinkel v er hosliggende katet ${b} cm og hypotenusen ${c} cm. Finn cos v som desimaltall.`,0.8,'','Cosinus er hosliggende katet delt på hypotenus.',`cos v = ${b}/${c} = 0,8.`,0.6,'Bruk hosliggende katet i telleren.');return result(`For en vinkel v er motstående katet ${a} cm og hosliggende katet ${b} cm. Finn tan v som desimaltall.`,0.75,'','Tangens er motstående delt på hosliggende.',`tan v = ${a}/${b} = 0,75.`,b/a,'Bytt om: motstående skal stå i telleren.');}
    },
    {
      id:'trekanter', title:'Lengder, vinkler og areal', summary:'Bruk trigonometri til å beregne sider, vinkler og areal.',
      theory:['I en rettvinklet trekant kan en ukjent side finnes ved å velge forholdet som inneholder den kjente og den ukjente siden. Eksempelvis er motstående katet = hypotenus · sin v.','En ukjent vinkel finnes med inversfunksjon, for eksempel v = tan⁻¹(motstående / hosliggende). Arealet av enhver trekant er grunnlinje · tilhørende høyde / 2; i en rettvinklet trekant kan katetene brukes som grunnlinje og høyde.'],
      example:['En rettvinklet trekant har hypotenus 10 cm og vinkel 30°. Motstående katet er 10 · sin 30° = 5 cm.','Hosliggende katet er 10 · cos 30° ≈ 8,66 cm. Arealet er 5 · 8,66/2 ≈ 21,65 cm².'],
      activity:'På en fiktiv måltegning av en montasjeplate ligger to festepunkter 6 cm fra hverandre i én retning og 8 cm i den andre. Tegn den rettvinklede trekanten mellom punktene. Finn diagonalen, begge spisse vinkler og arealet. Kontroller vinkelsummen og sammenlign arealet med halvparten av et rektangel.',
      criteria:['Velger riktig trigonometrisk forhold.','Oppgir avrunding og riktige enheter.','Kontrollerer vinkelsum og areal.'],
      model:'Hypotenusen er 10 cm. En vinkel er tan⁻¹(6/8) ≈ 36,87°, den andre 53,13°. Sammen med 90° gir de 180°. Arealet er 6 · 8/2 = 24 cm².',
      teacher:'Forkunnskaper: Pytagoras og sideforhold. Vanlig feil: multiplisere med forholdet når det ukjente står i nevneren. Sjekk gradmodus og om vinkel og lengde er rimelige.',
      goals:['Beregne lengder, vinkler og areal i rettvinklede trekanter.'],
      task(level,seed){let k=n(seed,8,1),a=3*k,b=4*k,c=5*k;if(level===0)return result(`En rettvinklet trekant har hypotenus ${c} cm og en spiss vinkel v med sin v = 0,6. Finn motstående katet.`,a,'cm','Multipliser hypotenusen med sinusverdien.',`${c} · 0,6 = ${a} cm.`,b,'Bruk sinusverdien for motstående katet.');if(level===1)return result(`En rettvinklet trekant har motstående katet ${a} cm og hosliggende katet ${b} cm til vinkelen v. Finn v i grader, avrundet til to desimaler.`,Math.atan(a/b)*180/Math.PI,'grader','Bruk invers tangens i gradmodus.',`v = tan⁻¹(${a}/${b}) ≈ ${(Math.atan(a/b)*180/Math.PI).toFixed(2)}°.`,Math.atan(b/a)*180/Math.PI,'Dette er den andre spisse vinkelen; bruk motstående delt på hosliggende.');return result(`En rettvinklet trekant har kateter ${a} cm og ${b} cm. Finn arealet.`,a*b/2,'cm²','Bruk én katet som grunnlinje og den andre som høyde.',`A = ${a} · ${b}/2 = ${a*b/2} cm².`,a*b,'Dette er arealet av hele rektangelet; trekanten er halvparten.');}
    }
  ]
};
