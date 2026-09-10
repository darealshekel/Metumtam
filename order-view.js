(function(root){
 'use strict';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const colors={skillCore:['#6e497e','#926539','#4f467a'],masteryCore:['#951a42','#41427e','#872d37','#642844'],reinCore:['#68304f','#672854','#353064','#304d76'],generalCore:['#42487b','#184d85','#385e8a'],statCore:['#6935a0','#6935a0','#6935a0']};
 let observer;
 function color(core){const group=core.id.replace(/\d+$/,''),n=Number(core.id.match(/\d+$/)?.[0]||1);return colors[group]?.[(n-1)%colors[group].length]||'#654082';}
 function markup(c,rows){
  if(!rows.length)return '<div class="order-empty"><strong>Your plan is complete.</strong><p>All selected skill goals have been reached.</p></div>';
  const cores=Object.fromEntries(c.cores.map(core=>[core.id,core]));
  return `<p class="order-instruction">Read each row left to right. Select a skill for upgrade costs and details.</p><div class="order-chart"><div class="order-start">Start here <span aria-hidden="true">↘</span></div><svg class="order-connectors" aria-hidden="true"></svg><ol class="full-order-grid" aria-label="${esc(c.name)} upgrade milestones">${rows.map((s,i)=>{
   const core=cores[s.id],stat=core.type==='HEXA Stat',label=stat||s.to===core.max?'MAX':s.to;
   const roman=stat?['I','II','III'][(Number(core.id.match(/\d+$/)?.[0])||1)-1]:'';
   const description=`Step ${i+1}: ${core.name}, ${stat?'complete':`level ${s.to}${s.to===core.max?' (MAX)':''}`}. ${s.f.toLocaleString('en-US')} fragments, ${s.e.toLocaleString('en-US')} Sol Erda.`;
   return `<li><button class="order-tile${i===0?' order-tile-next':''}${stat?' order-tile-stat':''}" data-step="${i}" data-core="${esc(core.id)}" data-target="${s.to}" style="--tile-color:${color(core)}" aria-label="${esc(description)}" title="${esc(description)}"><span class="order-tile-art"><img src="${esc(core.icon)}" alt="" loading="lazy">${roman?`<span class="order-stat-roman" aria-hidden="true">${roman}</span>`:''}</span><span class="order-tile-level" aria-hidden="true">${label}</span></button></li>`;
  }).join('')}</ol><div class="order-finish">Goal reached <span aria-hidden="true">✓</span></div></div>`;
 }
 function unmount(){observer?.disconnect();observer=null;}
 function mount(dialog){
  unmount();const chart=dialog.querySelector('.order-chart'),grid=dialog.querySelector('.full-order-grid');if(!chart||!grid)return;
  const svg=chart.querySelector('svg');
  function draw(){
   if(!dialog.open)return;
   const box=chart.getBoundingClientRect(),items=[...grid.children].map(el=>{const r=el.getBoundingClientRect();return {x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height};});
   const rows=[];for(const item of items){const row=rows.at(-1);if(!row||Math.abs(row[0].y-item.y)>2)rows.push([item]);else row.push(item);}
   svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
   svg.innerHTML='<defs><marker id="order-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 6 3 0 6" fill="none" stroke="currentColor"/></marker></defs>'+rows.slice(0,-1).map((row,i)=>{
    const end=row.at(-1),next=rows[i+1][0],right=box.width-9,left=9,start=end.x+end.w+5,y=end.y+end.h/2,bend=end.y+end.h+16,finish=next.y+next.h/2;
    return `<path d="M${start} ${y} H${right-10} Q${right} ${y} ${right} ${y+10} V${bend-10} Q${right} ${bend} ${right-10} ${bend} H${left+10} Q${left} ${bend} ${left} ${bend+10} V${finish-10} Q${left} ${finish} ${left+10} ${finish} H${next.x-6}" marker-end="url(#order-arrow)"/>`;
   }).join('');
  }
  observer=new ResizeObserver(draw);observer.observe(chart);draw();
 }
 root.HexaOrderView={markup,mount,unmount};
})(typeof window!=='undefined'?window:globalThis);
