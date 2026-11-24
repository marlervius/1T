const fmt=new Intl.NumberFormat('nb-NO',{maximumFractionDigits:2});
const f=n=>fmt.format(n);
export function budget({units,price,service,months,discount}){
 const purchase=units*price*(1-discount/100),operating=service*months;
 return {purchase,operating,total:purchase+operating};
}
export function triangle(base,angle){
 const rad=angle*Math.PI/180, height=base*Math.tan(rad),hypotenuse=base/Math.cos(rad);
 return {height,hypotenuse,area:base*height/2,sin:Math.sin(rad),cos:Math.cos(rad),tan:Math.tan(rad)};
}
export function mountVocationalLab(root,fag){
 const ho=fag==='1P-Y HO';
 const fields=ho?[['units','Antall enheter',10,1,50,1],['price','Innkjøpspris per enhet (kr)',1500,0,10000,100],['service','Driftskostnad per måned (kr)',250,0,3000,50],['months','Antall måneder',12,1,60,1],['discount','Rabatt (%)',10,0,50,1]]:[['base','Hosliggende katet (m)',4,1,12,.5],['angle','Vinkel (grader)',35,5,80,1]];
 root.innerHTML='<section class="panel reading"><h2>'+ (ho?'Planlegg et fiktivt innkjøp av velferdsteknologi':'Utforsk en rettvinklet trekant')+'</h2><p>'+(ho?'Forutsi hva som skjer med totalkostnaden hvis antallet eller driftsperioden dobles. Test så hypotesen.':'Forutsi hva som skjer med høyden når vinkelen øker, men den hosliggende kateten holdes fast. Test hypotesen.')+'</p>'+fields.map(([id,label,value,min,max,step])=>`<p><label for="${id}">${label}: <output id="${id}-out">${value}</output></label><br><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}" style="width:100%"></p>`).join('')+'<div id="lab-result" aria-live="polite"></div><div id="lab-figure"></div><h3>Reflekter</h3><p>'+(ho?'Hvilken kostnad er størst etter 12 og 36 måneder? Hva er ikke med i modellen?':'Når er motstående og hosliggende katet like lange? Hvordan kan du kontrollere hypotenusen med Pytagoras?')+'</p></section>';
 function update(){
  const v=Object.fromEntries(fields.map(([id])=>{const val=Number(root.querySelector('#'+id).value);root.querySelector('#'+id+'-out').textContent=f(val);return [id,val]}));
  const result=root.querySelector('#lab-result'),fig=root.querySelector('#lab-figure');
  if(ho){const b=budget(v),max=Math.max(b.purchase,b.operating,1);result.innerHTML=`<table><tbody><tr><th>Innkjøp etter rabatt</th><td>${f(b.purchase)} kr</td></tr><tr><th>Drift</th><td>${f(b.operating)} kr</td></tr><tr><th>Totalt</th><td>${f(b.total)} kr</td></tr></tbody></table>`;fig.innerHTML=`<svg viewBox="0 0 340 100" role="img" aria-label="Innkjøp ${f(b.purchase)} kr, drift ${f(b.operating)} kr"><text x="0" y="20">Innkjøp</text><rect x="85" y="5" height="20" width="${240*b.purchase/max}" fill="#4f8a6d"/><text x="0" y="60">Drift</text><rect x="85" y="45" height="20" width="${240*b.operating/max}" fill="#b07a2a"/></svg>`;}
  else{const t=triangle(v.base,v.angle),s=Math.min(250/v.base,150/t.height),x=30+v.base*s,y=180-t.height*s;result.innerHTML=`<p>Motstående katet = ${f(t.height)} m · Hypotenus = ${f(t.hypotenuse)} m · Areal = ${f(t.area)} m²</p><p>sin v = ${f(t.sin)}, cos v = ${f(t.cos)}, tan v = ${f(t.tan)}</p>`;fig.innerHTML=`<svg viewBox="0 0 340 210" role="img" aria-label="Rettvinklet trekant, vinkel ${v.angle} grader"><path d="M30 180H${x}V${y}Z" fill="#e1f1e5" stroke="#153e3c" stroke-width="2"/><path d="M${x-12} 180v-12h12" fill="none" stroke="#153e3c"/><text x="32" y="200">${f(v.base)} m</text><text x="${x+5}" y="${(180+y)/2}">${f(t.height)} m</text><text x="35" y="174">${v.angle}°</text></svg>`;}
 }
 root.addEventListener('input',update);update();return ()=>root.removeEventListener('input',update);
}
