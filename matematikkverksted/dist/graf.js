import {mathHtml, texNumber, escapeHtml} from './matematikk.js';

const purple = '#6945cc';
const accent = '#a23a94';

function drawing(canvas) {
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  const {width, height} = canvas.getBoundingClientRect();
  if (!width || !height) return null;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil(height * ratio);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(ratio, ratio);
  return {ctx, width, height};
}

function segment(ctx, x1, y1, x2, y2, color, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function dot(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x,y,4.3,0,Math.PI*2);
  ctx.fill();
}

function plot(ctx, X, Y, min, max, f, color, width = 2.2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  for (let i = 0; i <= 200; i++) {
    const x = min + (max - min)*i/200;
    if (i === 0) ctx.moveTo(X(x),Y(f(x)));
    else ctx.lineTo(X(x),Y(f(x)));
  }
  ctx.stroke();
}

export function drawCover(canvas) {
  const draw = drawing(canvas);
  if (!draw) return;
  const {ctx,width,height} = draw;
  const s = Math.min(width/11, height/10);
  const X = x => width*.52 + x*s;
  const Y = y => height*.65 - y*s;
  const grid = ctx.createRadialGradient(X(.7),Y(1),10,X(.7),Y(1),Math.max(width,height)*.59);
  grid.addColorStop(0,'#a98bfa42');
  grid.addColorStop(.75,'#aa84fc32');
  grid.addColorStop(1,'#a98bfa00');
  for(let i=-14;i<=14;i++) {
    segment(ctx,X(i),0,X(i),height,grid);
    segment(ctx,0,Y(i),width,Y(i),grid);
  }
  segment(ctx,0,Y(0),width,Y(0),'#c4adfa85');
  segment(ctx,X(0),0,X(0),height,'#c4adfa85');
  ctx.fillStyle = '#d6c2f7';
  ctx.font = '12px monospace';
  ctx.fillText('x',width-19,Y(0)-8);
  ctx.fillText('y',X(0)+8,20);
  const f = x=>.23*x*x-1.8;
  ctx.save();
  ctx.shadowColor='#b986ff';
  ctx.shadowBlur=13;
  plot(ctx,X,Y,-7,7,f,'#d8adff',3);
  ctx.restore();
  ctx.setLineDash([6,5]);
  plot(ctx,X,Y,-7,7,x=>f(2.6)+1.196*(x-2.6),'#f1aaddb2',1.3);
  ctx.setLineDash([]);
  dot(ctx,X(2.6),Y(f(2.6)),'#ffd0ed');
  dot(ctx,X(0),Y(f(0)),'#efe0ff');
  for(const x of [-4,-2,2,4]) ctx.fillText(String(x).replace('-','−'),X(x)+4,Y(0)+15);
}

const nice = new Intl.NumberFormat('nb-NO', {maximumFractionDigits: 3});
const fmt = value => nice.format(Math.abs(value) < 1e-12 ? 0 : value);
const num = value => texNumber(fmt(value));
const signed = value => value < 0 ? '− ' + fmt(-value) : '+ ' + fmt(value);

function axes(draw, xmin, xmax, ymin, ymax, ys = 1, xlabel = 'x', ylabel = 'y') {
  const {ctx, width, height} = draw;
  const margin = 31;
  const X = x => margin + (x - xmin) * (width - margin * 2) / (xmax - xmin);
  const Y = y => height - margin - (y - ymin) * (height - margin * 2) / (ymax - ymin);
  ctx.font = '12px system-ui';
  ctx.fillStyle = '#494155';
  for (let x = Math.ceil(xmin); x <= xmax; x++) {
    segment(ctx, X(x), margin, X(x), height-margin, x === 0 ? '#7f7895' : '#e5def1');
    if (x !== 0 && (width > 380 || x % 2 === 0)) ctx.fillText(fmt(x), X(x)-4, Y(0)+15);
  }
  for (let y = Math.ceil(ymin/ys)*ys; y <= ymax; y += ys) {
    segment(ctx, margin, Y(y), width-margin, Y(y), y === 0 ? '#7f7895' : '#e5def1');
    if (y !== 0) ctx.fillText(fmt(y), Math.max(1, X(0)-25), Y(y)+4);
  }
  ctx.fillText(xlabel, width-25, Y(0)-6);
  ctx.fillText(ylabel, X(0)+6, 18);
  ctx.save();
  ctx.beginPath();
  ctx.rect(margin, margin, width-margin*2, height-margin*2);
  ctx.clip();
  return {X, Y, ctx};
}

function smallTable(headers, rows) {
  const head = headers.map(s => '<th scope="col">'+escapeHtml(s)+'</th>').join('');
  const body = rows.map(row => '<tr>'+row.map((v,i) => i === 0
    ? '<th scope="row">'+escapeHtml(v)+'</th>'
    : '<td>'+escapeHtml(v)+'</td>').join('')+'</tr>').join('');
  return '<table class="data-table"><thead><tr>'+head+'</tr></thead><tbody>'+body+'</tbody></table>';
}

const range = (label, min, max, step, value, unit = '') => ({label, min, max, step, value, unit});
const choice = (label, options) => ({label, options, value:0});

function markRect(draw,x,y,w,h,fill,label) {
  const {ctx} = draw;
  ctx.fillStyle = fill;
  ctx.fillRect(x,y,w,h);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(x,y,w,h);
  ctx.fillStyle = '#20283e';
  ctx.font = 'bold 15px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (Math.min(w,h)>22) ctx.fillText(label,x+w/2,y+h/2);
}

function reducedExpression(a,b = 0) {
  const term = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '-x' : fmt(a)+'x';
  if (!a) return fmt(b);
  return b === 0 ? term : term+signed(b);
}

const families = [
  {name:'Polynom', formula:'a x^2+b', at:(x,a,b) => a*x*x+b},
  {name:'Rasjonal', formula:'\\frac{a}{x}+b', at:(x,a,b) => x === 0 ? NaN : a/x+b},
  {name:'Eksponential', formula:'a\\cdot 2^x+b', at:(x,a,b) => a*2**x+b},
  {name:'Potens', formula:'a x^{3}', at:(x,a) => a*x**3}
];

const observations = [8, 13, 15, 20, 25, 27];
const sumSquares = (a,b) => observations.reduce((sum,y,x) => sum+(y-(a*x+b))**2,0);
const asModel = (a,b) => num(a)+'t + '+num(b);

const labs = {
  algebra:{
    title:'Bygg et kvadrat',
    intro:'Et kvadrat med side $a+b$ deles med ett vannrett og ett loddrett snitt. Hvilke to felt forklarer leddet $2ab$?',
    controls:[range('Side a',1,6,1,4), range('Side b',1,6,1,2)],
    draw(draw,[a,b]) {
      const {width,height,ctx} = draw;
      const d = Math.min(width-68,height-53);
      const x = (width-d)/2, y = 33, u = d*a/(a+b);
      ctx.save();
      markRect(draw,x,y,u,u,'#c4d0ff','a²');
      markRect(draw,x+u,y,d-u,u,'#f6c7e3','ab');
      markRect(draw,x,y+u,u,d-u,'#f6c7e3','ab');
      markRect(draw,x+u,y+u,d-u,d-u,'#ffdea5','b²');
      ctx.fillText('a = '+fmt(a),x+u/2,y-13);
      ctx.fillText('b = '+fmt(b),x+u+(d-u)/2,y-13);
      ctx.restore();
    },
    result([a,b]) { return `$(${a}+${b})^2=${a*a}+${2*a*b}+${b*b}=${(a+b)**2}$ arealenheter.`; },
    table([a,b]) { return smallTable(['Felt','Areal'],[['a²',a*a],['ab (øverst til høyre)',a*b],['ab (nederst til venstre)',a*b],['b²',b*b]]); },
    challenge:'Bytt om a og b. Hvilke felt bytter plass, og hvorfor er totalarealet uendret?'
  },
  likninger:{
    title:'Samme operasjon på begge sider',
    intro:'Begynn med $3x+2=x+8$. Bruk kontrollene til å trekke samme antall $x$-ledd og enere fra begge sider. Prikkene viser sidene for den valgte testverdien.',
    controls:[range('Trekk fra x-ledd',0,3,1,0),range('Trekk fra enere',0,8,1,0),range('Testverdi x',-2,5,1,2)],
    draw(draw,[m,n,x]) {
      const {ctx,width,height} = draw;
      const a=(3-m)*x+2-n, b=(1-m)*x+8-n;
      const end=Math.max(12,Math.abs(a),Math.abs(b))+2;
      const tx=v => 40+(v+end)*(width-80)/(2*end);
      const rows=[['Venstre side',a,purple],['Høyre side',b,accent]];
      rows.forEach(([label,val,color],i) => {
        const y = Math.round(height*(.35+.4*i));
        ctx.font='bold 14px system-ui';
        ctx.fillStyle='#39324c';
        ctx.fillText(label,24,y-26);
        segment(ctx,tx(-end),y,tx(end),y,'#87819b');
        for (let k = -end+1; k < end; k++) {
          segment(ctx,tx(k),y-3,tx(k),y+3,'#87819b');
          if (k % 5 === 0) {
            ctx.font='12px system-ui';
            ctx.fillText(fmt(k),tx(k)-4,y+19);
          }
        }
        dot(ctx,tx(val),y,color);
        ctx.font='bold 15px system-ui';
        ctx.fillText(fmt(val),tx(val)-3,y-8);
      });
    },
    result([m,n,x]) {
      const a=(3-m)*x+2-n, b=(1-m)*x+8-n;
      return `Den omformede likningen er $${reducedExpression(3-m,2-n)}=${reducedExpression(1-m,8-n)}$. Ved $x=${x}$ er venstre side $${a}$ og høyre side $${b}$. ${a===b?'Testverdien løser likningen.':'Sidene har ulike verdier.'}`;
    },
    table([m,n,x]) { return smallTable(['Ved x = '+fmt(x),'Før','Etter'],[['Venstre side',3*x+2,(3-m)*x+2-n],['Høyre side',x+8,(1-m)*x+8-n],['Venstre minus høyre',2*x-6,2*x-6]]); },
    challenge:'Lag likningen 2x = 6. Finn testverdien som gjør sidene like. Hold testverdien fast, og endre operasjonen. Hvorfor løser samme verdi også den opprinnelige likningen?'
  },
  andregrad:{
    title:'Parabelverksted',
    intro:'Endre $a$, $h$ og $k$ i $f(x)=a(x-h)^2+k$. Forutsi hvor ekstremalpunktet flytter seg før du endrer en verdi.',
    controls:[range('Faktor a',-2,2,.25,1),range('Forskyvning h',-4,4,.5,1),range('Forskyvning k',-5,5,.5,-2)],
    draw(draw,[a,h,k]) {
      const {ctx,X,Y}=axes(draw,-6,6,-8,8,2);
      plot(ctx,X,Y,-6,6,x=>a*(x-h)**2+k,purple,2.7);
      if (a!==0) {
        ctx.setLineDash([4,4]);
        segment(ctx,X(h),Y(-8),X(h),Y(8),accent);
        ctx.setLineDash([]);
        dot(ctx,X(h),Y(k),accent);
      }
      ctx.restore();
    },
    result([a,h,k]) {
      if (a===0) return k===0 ? 'Funksjonen er null for alle reelle x.' : `$a=0$ gir den konstante funksjonen $f(x)=${num(k)}$. Den har ingen nullpunkter.`;
      const r=-k/a;
      const roots = r<0 ? 'Ingen reelle nullpunkter.' : r===0 ? `Dobbeltrot ved $x=${num(h)}$.` :
        `Nullpunktene er $h\\pm\\sqrt{-k/a}$, med verdier omtrent $${num(h-Math.sqrt(r))}$ og $${num(h+Math.sqrt(r))}$.`;
      return `${a>0?'Bunnpunkt':'Toppunkt'} ved $x=${num(h)},\\, y=${num(k)}$. ${roots}`;
    },
    table([a,h,k]) { return smallTable(['x','f(x)'],[-2,-1,0,1,2].map(d=>[fmt(h+d),fmt(a*d*d+k)])); },
    challenge:'Hold a = 1 og h = 1. Finn én verdi av k som gir to nullpunkter, én som gir ett og én som gir ingen. Forklar med bunnpunktet.'
  },
  funksjoner:{
    title:'Sammenlikn funksjonsfamilier',
    intro:'Velg et funksjonsuttrykk og les av grafen ved samme $x$-verdi. I potensmodellen brukes bare $a$ for å bevare formen $a x^3$.',
    controls:[choice('Familie',families.map(f=>f.name)),range('Faktor a',.5,2,.5,1),range('Konstant b',-2,2,.5,0),range('Testverdi x',-3,3,.25,1)],
    disabled:([family]) => family===3 ? [2] : [],
    draw(draw,[index,a,b,x]) {
      const {ctx,X,Y}=axes(draw,-4,4,-8,8,2);
      const f=t=>families[index].at(t,a,b);
      if (index===1) {
        plot(ctx,X,Y,-4,-.001,f,purple);
        plot(ctx,X,Y,.001,4,f,purple);
        ctx.setLineDash([4,4]);
        segment(ctx,X(-4),Y(b),X(4),Y(b),accent);
        ctx.setLineDash([]);
      } else plot(ctx,X,Y,-4,4,f,purple);
      if (Number.isFinite(f(x))) dot(ctx,X(x),Y(f(x)),accent);
      ctx.restore();
    },
    result([i,a,b,x]) {
      const f=families[i], val=f.at(x,a,b);
      const text=Number.isFinite(val)?`$f(${num(x)})\\approx ${num(val)}$.`:'Ved $x=0$ er den rasjonale funksjonen udefinert.';
      return `$f(x)=${f.formula}$ med $a=${num(a)}$${i===3?'':` og $b=${num(b)}$`}. ${text}`;
    },
    table([i,a,b,x]) {
      return smallTable(['x','f(x), avrundet'],[x-1,x,x+1].map(t=>{
        const v=families[i].at(t,a,b);
        return [fmt(t),Number.isFinite(v)?fmt(v):'Udefinert'];
      }));
    },
    challenge:'Sett a = 1 og b = 0. Sammenlikn verdiene ved x = −1, 0 og 1 for alle familiene. Hvorfor får bare én av grafene et brudd ved x = 0?'
  },
  polynomdivisjon:{
    title:'Finn resten på grafen',
    intro:'Vi deler $P(x)=x^2+x-6$ på $x-c$. Punktets høyde viser $P(c)$. Prøv å finne de to verdiene av $c$ som gir null i rest.',
    controls:[range('Tall c',-4,4,.5,1)],
    draw(draw,[c]) {
      const f=t=>t*t+t-6, {ctx,X,Y}=axes(draw,-5,5,-8,16,4);
      plot(ctx,X,Y,-5,5,f,purple);
      ctx.setLineDash([4,3]);
      segment(ctx,X(c),Y(0),X(c),Y(f(c)),accent,2);
      ctx.setLineDash([]);
      dot(ctx,X(c),Y(f(c)),accent);
      ctx.restore();
    },
    result([c]) {
      const r=c*c+c-6;
      return `Kvotienten er $Q(x)=${reducedExpression(1,c+1)}$. Resten er $R=P(${num(c)})=${num(r)}$. ${r===0?'Divisoren er en faktor i polynomet.':'Prøv en annen divisor for å finne en faktor.'}`;
    },
    table([c]) { const r=c*c+c-6; return smallTable(['x','P(x)','(x − c)Q(x)','Differanse'],[-1,0,1,c].filter((t,i,v)=>v.indexOf(t)===i).map(t=>[fmt(t),fmt(t*t+t-6),fmt((t-c)*(t+c+1)),fmt(r)])); },
    challenge:'Bruk P(x) = (x − c)Q(x) + R til å forklare hvorfor avlesning ved x = c gir resten. Kontroller så faktoriseringen du fant.'
  },
  derivasjon:{
    title:'Sekant og tangent',
    intro:'For $f(x)=x^2$ går sekanten gjennom to punkter. Forutsi stigningstallet, undersøk så graf og verditabell mens $h$ nærmer seg null fra begge sider.',
    controls:[range('Punkt a',-2,2,.25,1),range('Endring h',-2,2,.05,1.5)],
    draw(draw,[a,h],revealed) {
      const {ctx,X,Y}=axes(draw,-5,5,-4,17,2);
      plot(ctx,X,Y,-5,5,x=>x*x,purple,2.7);
      if (h!==0) {
        plot(ctx,X,Y,-5,5,x=>a*a+(2*a+h)*(x-a),accent,1.8);
        dot(ctx,X(a+h),Y((a+h)**2),accent);
      }
      if (revealed) {
        ctx.setLineDash([5,4]);
        plot(ctx,X,Y,-5,5,x=>a*a+2*a*(x-a),'#285e9d',1.8);
        ctx.setLineDash([]);
      }
      dot(ctx,X(a),Y(a*a),purple);
      ctx.restore();
    },
    result([a,h]) {
      return h===0 ? `Ved $h=0$ får vi $0/0$. Den deriverte er grensen for stigningstallene og er her $${num(2*a)}$.` :
        `Sekantens stigningstall er $${num(2*a+h)}$. Tangentens stigningstall er $${num(2*a)}$.`;
    },
    table([a,h]) { return smallTable(['Størrelse','Verdi'],[['x i første punkt',fmt(a)],['y i første punkt',fmt(a*a)],['x i andre punkt',fmt(a+h)],['y i andre punkt',fmt((a+h)**2)],['Endring i x',fmt(h)],['Endring i y',fmt(h*(2*a+h))],['Endring i y / endring i x',h===0?'Udefinert':fmt(2*a+h)]]); },
    challenge:'Sett a = 1. Finn stigningstallene ved h = −0,1 og h = 0,1. Hva forteller de om tangenten? Hvorfor kan du ikke bare sette h = 0 i differansekvotienten?'
  },
  trigonometri:{
    title:'Enhetssirkelen',
    intro:'På enhetssirkelen er punktet $(\\cos v,\\sin v)$. Følg koordinatene når vinkelen går fra spiss til stump.',
    controls:[range('Vinkel',0,180,1,60,'°')],
    draw(draw,[v]) {
      const {ctx,width,height}=draw;
      const s=Math.min(width-24,height-28)*.35, cx=width/2, cy=height/2;
      const x=Math.cos(v*Math.PI/180), y=Math.sin(v*Math.PI/180);
      const px=cx+x*s, py=cy-y*s;
      segment(ctx,cx-1.3*s,cy,cx+1.3*s,cy,'#716784');
      segment(ctx,cx,cy+1.22*s,cx,cy-1.22*s,'#716784');
      ctx.beginPath();ctx.strokeStyle='#8977af';ctx.arc(cx,cy,s,0,Math.PI*2);ctx.stroke();
      segment(ctx,cx,cy,px,py,purple,2);
      segment(ctx,cx,cy,px,cy,'#3367aa',3);
      segment(ctx,px,cy,px,py,accent,3);
      dot(ctx,px,py,purple);
      ctx.font='13px system-ui';ctx.fillStyle='#504467';
      ctx.fillText('x',cx+1.3*s+4,cy+3);ctx.fillText('y',cx+5,cy-1.22*s);
    },
    result([v]) {
      const rad=v*Math.PI/180;
      return `Ved $${v}^{\\circ}$ er punktet omtrent $(${num(Math.cos(rad))};\\, ${num(Math.sin(rad))})$. ${v===90?'Tangens er udefinert fordi cosinus er null.':`$\\tan v = \\sin v/\\cos v\\approx ${num(Math.tan(rad))}$.`}`;
    },
    table([v]) { const rad=v*Math.PI/180; return smallTable(['Størrelse','Verdi, avrundet'],[['Vinkel',v+'°'],['x = cos v',fmt(Math.cos(rad))],['y = sin v',fmt(Math.sin(rad))],['tan v',v===90?'Udefinert':fmt(Math.tan(rad))]]); },
    challenge:'Sammenlikn 60° og 120°. Hvilken koordinat får motsatt fortegn? Bruk symmetrien i figuren til å forklare observasjonen.'
  },
  trekant:{
    title:'To sider og vinkelen mellom dem',
    intro:'Hold sidene $a$ og $b$ fast mens du åpner vinkelen $C$. Undersøk når den tredje siden blir størst, og når arealet blir størst.',
    controls:[range('Side a',2,8,.5,5,' cm'),range('Side b',2,8,.5,6,' cm'),range('Vinkel C',10,170,1,60,'°')],
    draw(draw,[a,b,C]) {
      const {ctx,width,height}=draw, rad=C*Math.PI/180;
      const ax=b, bx=a*Math.cos(rad), by=a*Math.sin(rad);
      const xmin=Math.min(0,bx), xmax=Math.max(ax,bx), gap=32;
      const scale=Math.min((width-2*gap)/(xmax-xmin),(height-2*gap)/by);
      const px=x=>(width-(xmax-xmin)*scale)/2+(x-xmin)*scale;
      const py=y=>height-gap-y*scale;
      ctx.fillStyle='#e9e3fc';ctx.beginPath();ctx.moveTo(px(0),py(0));
      ctx.lineTo(px(ax),py(0));ctx.lineTo(px(bx),py(by));ctx.closePath();ctx.fill();
      segment(ctx,px(0),py(0),px(ax),py(0),purple,2);
      segment(ctx,px(ax),py(0),px(bx),py(by),purple,2);
      segment(ctx,px(bx),py(by),px(0),py(0),purple,2);
      ctx.setLineDash([4,3]);
      segment(ctx,px(bx),py(by),px(bx),py(0),accent,1.6);
      if (bx<0 || bx>ax) segment(ctx,px(bx),py(0),px(bx<0?0:ax),py(0),accent);
      ctx.setLineDash([]);
      ctx.fillStyle='#403451';ctx.font='bold 14px system-ui';
      ctx.fillText('C',px(0)-12,py(0)+18);
      ctx.fillText('A',px(ax)+3,py(0)+17);
      ctx.fillText('B',px(bx)-3,py(by)-8);
    },
    result([a,b,C]) { const rad=C*Math.PI/180; return `Cosinussetningen gir $c=\\sqrt{a^2+b^2-2ab\\cos C}\\approx ${num(Math.sqrt(a*a+b*b-2*a*b*Math.cos(rad)))}$ cm. Arealet er $\\tfrac12 ab\\sin C\\approx ${num(.5*a*b*Math.sin(rad))}$ cm².`; },
    table([a,b,C]) { const rad=C*Math.PI/180; return smallTable(['Størrelse','Mål, avrundet'],[['BC = a',fmt(a)+' cm'],['CA = b',fmt(b)+' cm'],['AB = c',fmt(Math.sqrt(a*a+b*b-2*a*b*Math.cos(rad)))+' cm'],['Høyden fra B til grunnlinjen CA',fmt(a*Math.sin(rad))+' cm'],['Areal',fmt(.5*a*b*Math.sin(rad))+' cm²']]); },
    challenge:'Velg C = 45° og deretter C = 135°. Forklar hvorfor trekantene får like store arealer og ulike lengder på den tredje siden.'
  },
  modellering:{
    title:'Tilpass en modell til en måleserie',
    intro:'De simulerte målingene viser vannvolum i liter etter 0 til 5 minutter. Tilpass modellen $V(t)=at+b$. Strekene mellom punktene og linjen viser avvikene.',
    controls:[range('Vekst a',1,7,.25,3,' L/min'),range('Startverdi b',3,14,.5,10,' L')],
    draw(draw,[a,b]) {
      const {ctx,X,Y}=axes(draw,-.4,5.7,0,52,10,'min','L');
      plot(ctx,X,Y,0,5.6,t=>a*t+b,purple);
      ctx.setLineDash([4,3]);
      observations.forEach((v,t)=>segment(ctx,X(t),Y(v),X(t),Y(a*t+b),accent,2));
      ctx.setLineDash([]);
      observations.forEach((v,t)=>dot(ctx,X(t),Y(v),'#223a64'));
      ctx.restore();
    },
    result([a,b]) { return `Modellen er $V(t)=${asModel(a,b)}$. Summen av de kvadrerte avvikene er $${num(sumSquares(a,b))}$ L².`; },
    table([a,b]) { return smallTable(['Tid (min)','Målt (L)','Modell (L)','Målt − modell (L)'],observations.map((v,t)=>[t,v,fmt(a*t+b),fmt(v-a*t-b)])); },
    challenge:'Prøv først a = 3 og b = 10. Klarer du å få en mindre sum av kvadrerte avvik? Hva må du vite om vanntilførselen og beholderen før du bruker modellen ved t = 60 min?'
  }
};

function controlsHTML(key, controls) {
  return controls.map((control,i) => {
    const id='lab-'+key+'-'+i;
    if (control.options) {
      const options=control.options.map((label,j)=>'<option value="'+j+'">'+escapeHtml(label)+'</option>').join('');
      return '<label class="lab-select" for="'+id+'">'+escapeHtml(control.label)+'<select id="'+id+'">'+options+'</select></label>';
    }
    const {label,min,max,step,value,unit}=control;
    return `<label class="slider" for="${id}"><span>${escapeHtml(label)}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}" aria-valuetext="${fmt(value)+unit}"><span class="lab-value" aria-hidden="true">${escapeHtml(fmt(value)+unit)}</span></label>`;
  }).join('');
}

export function labMarkup(key) {
  const lab=labs[key];
  if (!lab) return '';
  const values=lab.controls.map(c=>c.value);
  const prediction = key === 'derivasjon' ? `<form class="lab-prediction"><label>Mitt anslag for sekantens stigningstall <input type="text" inputmode="decimal" placeholder="Skriv et tall" required></label><button type="submit">Undersøk</button></form><p class="lab-prediction-feedback" role="status"></p>` : '';
  const program = key === 'modellering' ? `<section class="program-lab"><h3>Lag og prøv en vekstalgoritme</h3><p>Du setter startbeløp, vekstfaktor, mål og stoppvilkår. Anslå året før du kjører programmet. Endre ett valg og prøv på nytt.</p><form class="program-form"><label>Startbeløp (kr) <input name="start" type="number" min="1" max="1000000" step="1" value="8000" required></label><label>Vekstfaktor <input name="factor" type="text" inputmode="decimal" value="1,03" required></label><label>Mål (kr) <input name="target" type="number" min="1" max="10000000" step="1" value="10000" required></label><label>Stopp når beløpet <select name="condition"><option value="pass">passerer målet (&gt;)</option><option value="reach">når målet (≥)</option></select></label><label>Mitt anslag (år) <input name="guess" type="number" min="0" max="1000" step="1" required></label><button type="submit">Prøv algoritmen</button></form><div class="program-result" role="status"></div></section>` : '';
  return `<section class="pane lab" data-lab="${key}" aria-labelledby="lab-title-${key}"><h2 id="lab-title-${key}">${lab.title}</h2>
    <p>${mathHtml(lab.intro)}</p><canvas role="img" aria-label="${lab.title}. En verditabell følger under kontrollene."></canvas>
    <div class="lab-controls">${controlsHTML(key,lab.controls)}</div>${prediction}<p class="lab-output" aria-live="polite" aria-atomic="true">${key === 'derivasjon' ? 'Skriv anslaget før du ser stigningstallet.' : mathHtml(lab.result(values))}</p>
    <details class="lab-values"${key === 'derivasjon' ? ' hidden' : ''}><summary>Vis verditabell</summary><div>${lab.table(values)}</div></details>
    <p class="lab-challenge"><strong>Utforsk videre</strong> ${mathHtml(lab.challenge)}</p>${program}</section>`;
}

export function runGrowthProgram(start, factor, target, condition = 'pass') {
  if (![start,factor,target].every(Number.isFinite) || start <= 0 || factor <= 1 || target <= 0) return null;
  const trace = [{year:0, amount:start}];
  let amount=start;
  let year=0;
  const more = () => condition === 'reach' ? amount < target : amount <= target;
  while (more() && year < 1000) {
    amount *= factor;
    year++;
    trace.push({year, amount});
  }
  return !more() ? trace : null;
}

export function mountGraphs(main) {
  const cleanups=[];
  function observe(canvas,paint) {
    if (typeof ResizeObserver !== 'undefined') {
      const observer=new ResizeObserver(paint);
      observer.observe(canvas);
      cleanups.push(()=>observer.disconnect());
    } else {
      window.addEventListener('resize',paint);
      cleanups.push(()=>window.removeEventListener('resize',paint));
    }
    paint();
  }
  const cover=main.querySelector('#hero-plot');
  if (cover) observe(cover,()=>drawCover(cover));
  main.querySelectorAll('[data-lab]').forEach(element=>{
    const lab=labs[element.dataset.lab];
    const fields=[...element.querySelectorAll('.lab-controls input, .lab-controls select')];
    const canvas=element.querySelector('canvas');
    let values=fields.map(field=>Number(field.value));
    let revealed=element.dataset.lab!=='derivasjon';
    const renderGraph=()=>{
      const draw=drawing(canvas);
      if (draw) lab.draw(draw,values,revealed);
    };
    const syncValues=()=>{
      values=fields.map(field=>Number(field.value));
      const disabled=lab.disabled?.(values) || [];
      fields.forEach((field,i)=>{
        field.disabled=disabled.includes(i);
        if (field.type==='range') {
          const label=fmt(values[i])+lab.controls[i].unit;
          field.setAttribute('aria-valuetext',label);
          field.nextElementSibling.textContent=field.disabled?'–':label;
        }
      });
      element.querySelector('.lab-output').innerHTML=revealed ? mathHtml(lab.result(values)) : 'Skriv anslaget før du ser stigningstallet.';
      element.querySelector('.lab-values div').innerHTML=lab.table(values);
    };
    let pending;
    const update=()=>{
      if (element.dataset.lab==='derivasjon') {
        revealed=false;
        element.querySelector('.lab-prediction-feedback').textContent='';
        element.querySelector('.lab-values').hidden=true;
      }
      syncValues();
      if (pending===undefined) pending=window.requestAnimationFrame(()=>{pending=undefined;renderGraph();});
    };
    syncValues();
    element.addEventListener('input',update);
    const prediction=element.querySelector('.lab-prediction');
    prediction?.addEventListener('submit',event=>{
      event.preventDefault();
      const guess=Number(prediction.querySelector('input').value.trim().replace(',','.'));
      if (!Number.isFinite(guess)) return;
      revealed=true;
      element.querySelector('.lab-values').hidden=false;
      const [a,h]=values;
      element.querySelector('.lab-prediction-feedback').textContent=`Du anslo ${fmt(guess)}. For x² er sekantens stigningstall ${h===0?'udefinert når h = 0':fmt(2*a+h)}. Flytt h nærmere null og gi et nytt anslag.`;
      syncValues();
      renderGraph();
    });
    const program=element.querySelector('.program-form');
    program?.addEventListener('submit',event=>{
      event.preventDefault();
      const data=new FormData(program);
      const trace=runGrowthProgram(Number(data.get('start')),Number(String(data.get('factor')).replace(',','.')),Number(data.get('target')),String(data.get('condition')));
      const output=element.querySelector('.program-result');
      if (!trace) { output.textContent='Velg positive beløp og vekstfaktor over 1. Målet må kunne nås innen 1000 år.'; return; }
      const last=trace.at(-1), before=trace.at(-2);
      output.innerHTML=`<p>Du anslo ${escapeHtml(data.get('guess'))} år. Programmet stopper etter ${last.year} år. ${before ? 'Året før: '+fmt(before.amount)+' kr. ' : ''}Ved stopp: ${fmt(last.amount)} kr. Kan du endre vekstfaktoren og forutsi om året øker eller minker?</p>${smallTable(['År','Beløp (kr)'],trace.length <= 16 ? trace.map(({year,amount})=>[year,fmt(amount)]) : [...trace.slice(0,7),...trace.slice(-7)].map(({year,amount})=>[year,fmt(amount)]))}`;
    });
    observe(canvas,renderGraph);
    cleanups.push(()=>{
      element.removeEventListener('input',update);
      if (pending!==undefined) window.cancelAnimationFrame(pending);
    });
  });
  return ()=>cleanups.forEach(remove=>remove());
}
