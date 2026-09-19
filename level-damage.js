(function exactFD(root){
'use strict';
function lookup(c,row,options={}){
 if(!row||row.id.startsWith('hexaStat')||row.to!==row.from+1)return null;
 const mode=options.orderMode==='erda'?'erda':'fragments';
 const boss=options.bossMode==='kaling'&&c.kalingOrders?.[mode]?'kaling':'general';
 const rows=root.HEXA_DAMAGE?.classes?.[c.id]?.orders?.[boss+'_'+mode]||[];
 const match=rows.find(r=>r.id===row.id&&r.from===row.from&&r.to===row.to);
 return Number.isFinite(match?.fd)?match.fd:null;
}
function markup(c,next,options){
 const fd=lookup(c,next,options);
 const heading=next&&!next.id.startsWith('hexaStat')?`FD gain · Lv. ${next.from} → ${next.to}`:'FD gain · next level';
 const message=!next?'Your selected upgrade goals are complete.':next.id.startsWith('hexaStat')?'Next is a HEXA Stat completion milestone, not a skill level.':fd===null?'No verified FD value for this single level in the source data.':'Estimate at the source’s reference stats and node levels.';
 return `<div class="next-level-fd" aria-label="Next level final damage gain"><span>${heading}</span><strong>${fd===null?'—':'≈ +'+fd.toFixed(3)+'%'}</strong><small>${message}</small></div>`;
}
const api={lookup,markup};if(typeof module!=='undefined')module.exports=api;else root.HexaLevelDamage=api;
})(typeof window!=='undefined'?window:globalThis);
