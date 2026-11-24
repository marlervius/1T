const fmt = new Intl.NumberFormat('nb-NO', {maximumFractionDigits: 2});
const n = x => fmt.format(Math.abs(x) < 1e-10 ? 0 : x);
const close = (a,b) => Math.abs(a-b) <= Math.max(.05, Math.abs(b)*.005);

export function tariffResult(a, b) {
  const delta = a.rate - b.rate;
  if (!Number.isFinite(a.fixed + a.rate + b.fixed + b.rate)) throw new Error('Ugyldige priser');
  if (Math.abs(delta) < 1e-10) return {type: Math.abs(a.fixed-b.fixed)<1e-10 ? 'same' : 'parallel'};
  const x = (b.fixed-a.fixed)/delta;
  return {type: x >= 0 ? 'cross' : 'outside', x, cost: a.fixed+a.rate*x};
}

export function statistics(data) {
  if (!Array.isArray(data) || !data.length || data.some(x=>!Number.isFinite(x))) throw new Error('Oppgi minst ett gyldig tall.');
  const sorted = [...data].sort((a,b)=>a-b), sum = sorted.reduce((a,b)=>a+b,0), len=sorted.length;
  const median = len%2 ? sorted[(len-1)/2] : (sorted[len/2-1]+sorted[len/2])/2;
  const frequency = [...new Set(sorted)].map(value=>({value,count:sorted.filter(x=>x===value).length}));
  return {sorted,sum,mean:sum/len,median,frequency};
}

function el(tag, attrs={}, children=[]) {
  const node=document.createElement(tag);
  for (const [key,value] of Object.entries(attrs)) {
    if(key==='text') node.textContent=value;
    else if(key==='class') node.className=value;
    else node.setAttribute(key,value);
  }
  for(const child of children) node.append(child);
  return node;
}
function field(label,value,min,max,step) {
  const input=el('input',{type:'number',value,min,max,step,required:'', 'aria-label':label});
  return [el('label',{},[el('span',{text:label}),input]),input];
}
function canvasDraw(canvas, draw) {
  const width=canvas.clientWidth, height=canvas.clientHeight;
  if(!width || !height) return;
  const ratio=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
  const ctx=canvas.getContext('2d'); if(!ctx)return;
  ctx.scale(ratio,ratio);
  draw(ctx,width,height);
}
function line(ctx,x1,y1,x2,y2,color='#ded9ee',width=1) {
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
}
function drawTariffs(canvas,a,b,result) {
  canvasDraw(canvas,(ctx,w,h)=>{
    const left=58,right=17,top=24,bottom=42;
    const xmax=Math.max(10,Math.ceil(Math.max(result.type==='cross'?result.x*1.4:0,20)/10)*10);
    const ymax=Math.max(a.fixed+a.rate*xmax,b.fixed+b.rate*xmax,1)*1.1;
    const X=x=>left+x*(w-left-right)/xmax, Y=y=>h-bottom-y*(h-top-bottom)/ymax;
    ctx.font='12px system-ui';ctx.fillStyle='#4d4765';
    for(let k=0;k<=4;k++){
      const x=xmax*k/4,y=ymax*k/4;
      line(ctx,X(x),top,X(x),h-bottom); line(ctx,left,Y(y),w-right,Y(y));
      ctx.fillText(n(x),X(x)-6,h-bottom+16);ctx.fillText(n(y),2,Y(y)+4);
    }
    line(ctx,left,top,left,h-bottom,'#84769c');line(ctx,left,h-bottom,w-right,h-bottom,'#84769c');
    ctx.fillText('Bruk (GB)',Math.max(left,w-78),h-5);
    ctx.fillText('Pris (kr)',left,14);
    for(const [tariff,color,name] of [[a,'#6245c9','A'],[b,'#b23f73','B']]){
      line(ctx,X(0),Y(tariff.fixed),X(xmax),Y(tariff.fixed+tariff.rate*xmax),color,3);
      ctx.fillStyle=color;ctx.font='bold 13px system-ui';ctx.fillText(name,Math.max(left+3,X(xmax)-14),Y(tariff.fixed+tariff.rate*xmax)-8);
    }
    if(result.type==='cross' && result.x<=xmax){
      ctx.setLineDash([4,4]);line(ctx,X(result.x),Y(result.cost),X(result.x),h-bottom,'#524778');ctx.setLineDash([]);
      ctx.fillStyle='#181a35';ctx.beginPath();ctx.arc(X(result.x),Y(result.cost),5,0,Math.PI*2);ctx.fill();
    }
  });
}
function tariffTable(a,b,result) {
  const xs=[0,5,10,20]; if(result.type==='cross') xs.push(result.x);
  const values=[...new Set(xs)].sort((x,y)=>x-y);
  const table=el('table',{class:'data-table'});
  table.append(el('thead',{},[el('tr',{},['Bruk (GB)','A (kr)','B (kr)','Rimeligst'].map(t=>el('th',{scope:'col',text:t})))]));
  const body=el('tbody');
  for(const x of values){const ca=a.fixed+a.rate*x,cb=b.fixed+b.rate*x;
    body.append(el('tr',{},[n(x),n(ca),n(cb),Math.abs(ca-cb)<1e-8?'Likt':ca<cb?'A':'B'].map(t=>el('td',{text:t}))));}
  table.append(body);return table;
}
function tariffConclusion(a,b,r){
  const formula=`A(x) = ${n(a.fixed)} + ${n(a.rate)}x; B(x) = ${n(b.fixed)} + ${n(b.rate)}x.`;
  if(r.type==='same')return `${formula} Abonnementene koster alltid det samme.`;
  if(r.type==='parallel')return `${formula} Lik pris kan ikke oppstå: samme pris per GB gir parallelle grafer. ${a.fixed<b.fixed?'A':'B'} er alltid rimeligst.`;
  if(r.type==='outside')return `${formula} Linjene møtes ved x = ${n(r.x)} GB, men negativ bruk gir ingen praktisk skjæring. ${a.fixed<b.fixed?'A':'B'} er rimeligst ved all bruk fra 0 GB.`;
  if(r.x===0)return `${formula} Ved 0 GB er fastprisen den samme. For positiv bruk er ${a.rate<b.rate?'A':'B'} rimeligst fordi enhetsprisen er lavere.`;
  const before=a.fixed<b.fixed?'A':'B', after=before==='A'?'B':'A';
  return `${formula} Lik pris når ${n(a.fixed)} + ${n(a.rate)}x = ${n(b.fixed)} + ${n(b.rate)}x, altså x = ${n(r.x)} GB. Da koster begge ${n(r.cost)} kr. Under dette er ${before} rimeligst; over er ${after} rimeligst.`;
}
function mountTariff(root){
  const heading=el('h3',{text:'1P · Hva lønner seg?'}),intro=el('p',{text:'Sammenlign to mobilabonnementer. Endre månedspris og pris per GB, og anslå når de blir like dyre.'});
  const controls=el('div',{class:'pl-controls'});
  const fields=[];
  for(const [title,fixed,rate] of [['A',99,18],['B',199,8]]){
    const box=el('fieldset');box.append(el('legend',{text:`Abonnement ${title}`}));
    const [f,fi]=field('Fast pris (kr)',fixed,0,10000,1),[v,vi]=field('Pris per GB (kr)',rate,0,1000,1);
    box.append(f,v);controls.append(box);fields.push([fi,vi]);
  }
  const [guessLabel,guess]=field('Lik pris ved ca. GB','',0,100000,.1);
  const choice=el('select',{'aria-label':'Forutsig skjæring'},[
    el('option',{value:'cross',text:'De blir like dyre ved en bruksmengde'}),
    el('option',{value:'none',text:'Ingen lik pris ved bruk fra 0 GB'}),
    el('option',{value:'same',text:'Alltid samme pris'})]);
  const predict=el('form',{class:'pl-predict'},[el('label',{},[el('span',{text:'Din hypotese'}),choice]),guessLabel,el('button',{type:'submit',text:'Sjekk og vis resultat'})]);
  const feedback=el('p',{class:'pl-feedback',role:'status','aria-live':'polite'});
  const resultArea=el('div',{class:'pl-result',hidden:''});
  root.append(heading,intro,controls,predict,feedback,resultArea);
  function read(){const vals=fields.map(pair=>pair.map(input=>input.valueAsNumber));
    if(vals.flat().some(x=>!Number.isFinite(x)||x<0))return null;
    return [{fixed:vals[0][0],rate:vals[0][1]},{fixed:vals[1][0],rate:vals[1][1]}];}
  function reset(){resultArea.hidden=true;feedback.textContent='Endring registrert. Lag en ny hypotese før du ser resultatet.';}
  controls.addEventListener('input',reset);
  choice.addEventListener('change',()=>{guessLabel.hidden=choice.value!=='cross';guess.disabled=choice.value!=='cross';});
  predict.addEventListener('submit',e=>{
    e.preventDefault();const params=read();if(!params || fields.flat().some(input=>!input.validity.valid)){feedback.textContent='Bruk hele kroner innenfor grensene i prisfeltene.';return;}
    const [a,b]=params,r=tariffResult(a,b);
    const expected=r.type==='cross'?'cross':r.type==='same'?'same':'none';
    const right=choice.value===expected && (expected!=='cross'||Number.isFinite(guess.valueAsNumber)&&close(guess.valueAsNumber,r.x));
    feedback.textContent=right?'Hypotesen stemmer.':`Se hva grafen og utregningen viser. ${expected==='cross'?'Sjekk også om anslaget ditt er nær skjæringen.':''}`;
    resultArea.replaceChildren(el('h4',{text:'Graf og beregning'}),el('p',{text:tariffConclusion(a,b,r)}));
    const chart=el('canvas',{role:'img','aria-label':`Pris mot bruk. ${tariffConclusion(a,b,r)}`});
    resultArea.append(chart,el('div',{class:'pl-tablewrap'},[tariffTable(a,b,r)]));resultArea.hidden=false;
    drawTariffs(chart,a,b,r);
  });
  const observer=new ResizeObserver(()=>{const canvas=resultArea.querySelector('canvas');if(canvas&&!resultArea.hidden){const params=read();if(params)drawTariffs(canvas,...params,tariffResult(...params));}});
  observer.observe(root);return ()=>observer.disconnect();
}

export function parseData(text){
  const tokens=text.trim().split(/[\s;]+/).filter(Boolean);
  if(!tokens.length || tokens.length>40)throw new Error('Skriv inn 1–40 tall, atskilt med mellomrom eller semikolon.');
  const data=tokens.map(token=>/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(token) ? Number(token.replace(',','.')) : NaN);
  if(data.some(x=>!Number.isFinite(x)||Math.abs(x)>10000))throw new Error('Bruk gyldige tall mellom −10 000 og 10 000. Eksempel: 2,5  3,5; 4.');
  return data;
}
function drawBars(canvas,stats){
  canvasDraw(canvas,(ctx,w,h)=>{
    const entries=stats.frequency,L=48,R=14,T=25,B=54,plotW=w-L-R,plotH=h-T-B,max=Math.max(...entries.map(x=>x.count),1);
    ctx.font='12px system-ui';ctx.fillStyle='#4d4765';
    for(let i=0;i<=max;i++){
      const y=h-B-i*plotH/max;line(ctx,L,y,w-R,y);ctx.fillText(String(i),L-23,y+4);
    }
    ctx.fillText('Frekvens',L,16);ctx.fillText('Verdi',Math.max(L,w-45),h-4);
    entries.forEach(({value,count},i)=>{
      const slot=plotW/entries.length,x=L+i*slot+slot*.15,barW=slot*.7;
      ctx.fillStyle='#6245c9';ctx.fillRect(x,h-B-count*plotH/max,barW,count*plotH/max);
      ctx.fillStyle='#403853';ctx.textAlign='center';ctx.fillText(n(value),x+barW/2,h-B+17);ctx.fillText(String(count),x+barW/2,h-B-count*plotH/max-5);
    });ctx.textAlign='start';
  });
}
function statsTable(stats){
  const table=el('table',{class:'data-table'});table.append(el('thead',{},[el('tr',{},['Verdi x','Frekvens f','x · f','Kumulativ f'].map(t=>el('th',{scope:'col',text:t})))]));
  const tbody=el('tbody');let cumulative=0;
  stats.frequency.forEach(({value,count})=>{cumulative+=count;tbody.append(el('tr',{},[n(value),n(count),n(value*count),n(cumulative)].map(t=>el('td',{text:t}))));});
  tbody.append(el('tr',{},[el('th',{scope:'row',text:'Sum'}),el('td',{text:n(stats.sorted.length)}),el('td',{text:n(stats.sum)}),el('td',{text:'—'})]));table.append(tbody);return table;
}
function mountStatistics(root){
  const heading=el('h3',{text:'2P · Hva forteller datasettet?'});
  const intro=el('p',{text:'Skriv inn observasjoner og forutsi gjennomsnitt og median. Prøv deretter å legge til en ekstremverdi og sammenlign.'});
  const input=el('textarea',{rows:'2',spellcheck:'false','aria-label':'Observasjoner, atskilt med mellomrom eller semikolon'});input.value='4 5 5 6 7 8 9';
  const outlier=el('input',{type:'checkbox'});
  const [outLabel,outValue]=field('Ekstremverdi',50,-10000,10000,.1);
  const [meanLabel,meanGuess]=field('Forutsi gjennomsnitt','',-10000,10000,'any');
  const [medianLabel,medianGuess]=field('Forutsi median','',-10000,10000,'any');
  const form=el('form',{class:'pl-predict'},[el('label',{class:'pl-data'},[el('span',{text:'Datasett (mellomrom eller semikolon mellom tall, f.eks. 2,5  3,5; 4)'}),input]),el('label',{class:'pl-check'},[outlier,el('span',{text:'Legg til ekstremverdi'})]),outLabel,meanLabel,medianLabel,el('button',{type:'submit',text:'Sjekk og vis fordeling'})]);
  const feedback=el('p',{class:'pl-feedback',role:'status','aria-live':'polite'}),resultArea=el('div',{class:'pl-result',hidden:''});
  root.append(heading,intro,form,feedback,resultArea);
  function read(){const data=parseData(input.value);if(outlier.checked){const x=outValue.valueAsNumber;if(!Number.isFinite(x))throw new Error('Oppgi en gyldig ekstremverdi.');data.push(x);}return data;}
  function reset(){resultArea.hidden=true;feedback.textContent='Datasettet er endret. Forutsi målene på nytt.';}
  input.addEventListener('input',reset);outlier.addEventListener('change',reset);outValue.addEventListener('input',reset);
  form.addEventListener('submit',e=>{
    e.preventDefault();let data,stats;try{data=read();stats=statistics(data);}catch(err){feedback.textContent=err.message;return;}
    const correct=close(meanGuess.valueAsNumber,stats.mean)&&close(medianGuess.valueAsNumber,stats.median);
    feedback.textContent=correct?'Begge anslagene stemmer.':'Sammenlign anslagene dine med beregningene nedenfor.';
    const middle=stats.sorted.length%2 ? `midtverdien ${n(stats.median)}` : `gjennomsnittet av de to midterste verdiene, ${n(stats.sorted[data.length/2-1])} og ${n(stats.sorted[data.length/2])}`;
    let explanation=`Sortert: ${stats.sorted.map(n).join(', ')}. Gjennomsnitt = ${n(stats.sum)} / ${data.length} = ${n(stats.mean)}. Median = ${middle} = ${n(stats.median)}.`;
    if(outlier.checked){const base=statistics(parseData(input.value));explanation+=` Uten ekstremverdien var gjennomsnittet ${n(base.mean)} og medianen ${n(base.median)}. Endring: ${n(stats.mean-base.mean)} i gjennomsnitt og ${n(stats.median-base.median)} i median.`;}
    resultArea.replaceChildren(el('h4',{text:'Fordeling og beregning'}),el('p',{text:explanation}));
    const chart=el('canvas',{role:'img','aria-label':`Søylediagram over frekvens: ${stats.frequency.map(({value,count})=>`${n(value)} forekommer ${count} ganger`).join('; ')}.`});
    resultArea.append(chart,el('div',{class:'pl-tablewrap'},[statsTable(stats)]));resultArea.hidden=false;drawBars(chart,stats);
  });
  const observer=new ResizeObserver(()=>{const canvas=resultArea.querySelector('canvas');if(canvas&&!resultArea.hidden){try{drawBars(canvas,statistics(read()));}catch{}}});
  observer.observe(root);return ()=>observer.disconnect();
}

export function mountLab(element,course){
  if(!(element instanceof Element))throw new TypeError('mountLab trenger et DOM-element.');
  element.replaceChildren();element.classList.add('pl-lab','lab');
  if(course==='1P')return mountTariff(element);
  if(course==='2P')return mountStatistics(element);
  throw new Error(`Ukjent kurs: ${course}`);
}
