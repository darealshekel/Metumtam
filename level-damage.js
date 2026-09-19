(function exactFD(root){
'use strict';
function resolve(c,row,options={}){
 if(!row||row.id.startsWith('hexaStat')||row.to!==row.from+1)return null;
 const mode=options.orderMode==='erda'?'erda':'fragments';
 const boss=options.bossMode==='kaling'&&c.kalingOrders?.[mode]?'kaling':'general';
 const calculated=root.HEXA_LEVEL_DAMAGE?.classes?.[c.id]?.[boss]?.[row.id]?.damageByLevel;
 const before=calculated?.[row.from],after=calculated?.[row.to];
 if(Number.isFinite(before)&&before>0&&Number.isFinite(after)&&after>0)return {fd:(after/before-1)*100,boss,resource:'calculated',alternate:false,calculated:true};
 const data=root.HEXA_DAMAGE?.classes?.[c.id]?.orders;
 // Resource limits change the ordering and grouping of source milestones.
 // A same-boss single-level reference remains useful when one path groups it.
 for(const resource of [mode,mode==='erda'?'fragments':'erda']){
  const match=data?.[boss+'_'+resource]?.find(r=>r.id===row.id&&r.from===row.from&&r.to===row.to&&Number.isFinite(r.fd));
  if(match)return {fd:match.fd,boss,resource,alternate:resource!==mode};
 }
 return null;
}
function lookup(c,row,options={}){return resolve(c,row,options)?.fd??null;}
function markup(c,next,options){
 const result=resolve(c,next,options),fd=result?.fd??null;
 const heading=next&&!next.id.startsWith('hexaStat')?`FD gain · Lv. ${next.from} → ${next.to}`:'FD gain · next level';
 const message=!next?'Your selected upgrade goals are complete.':next.id.startsWith('hexaStat')?'Next is a HEXA Stat completion milestone, not a skill level.':fd===null?(root.HEXA_DAMAGE?.classes?.[c.id]?'The source groups this level with other upgrades; single-level FD is unavailable.':'FD reference data has not been collected for this class.'):result.calculated?'Calculated for this single level at the General bosses reference setup, 380% PDR. Your other stats and node levels can change the gain.':`${result.boss==='kaling'?'Kaling':'General bosses'} · ${result.resource==='erda'?'Sol Erda':'Fragment'} reference. Estimate at the source’s stats and node levels${result.alternate?'; upgrade costs still follow your selected resource order':''}.`;
 return `<div class="next-level-fd" aria-label="Next level final damage gain"><span>${heading}</span><strong>${fd===null?'—':'≈ +'+fd.toFixed(3)+'%'}</strong><small>${message}</small></div>`;
}
const api={lookup,resolve,markup};if(typeof module!=='undefined')module.exports=api;else root.HexaLevelDamage=api;
})(typeof window!=='undefined'?window:globalThis);
