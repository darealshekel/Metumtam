(function moduleCode(root) {
'use strict';
const keys=['attack','main','boss','damage','critical','ied'];
const names={attack:'ATT / Magic ATT',main:'Main Stat',boss:'Boss Damage',damage:'Damage',critical:'Critical Damage',ied:'Ignore Defense'};
const weights=[0,1,2,3,4,6,8,10,13,16,20];
const cap=(v,a,b)=>Math.max(a,Math.min(b,Number.isFinite(+v)?Math.floor(+v):a));
function defaults(){return {basis:'reference',custom:{attack:0,main:0,boss:0,critical:0,ied:0},nodes:Array.from({length:3},(_,i)=>({enabled:i===0,stats:[['attack','boss','critical'],['critical','attack','main'],['main','boss','attack']][i],levels:[0,0,0]}))};}
function clean(value){const d=defaults();return {basis:value?.basis==='custom'?'custom':'reference',custom:Object.fromEntries(Object.keys(d.custom).map(k=>[k,Math.max(0,Math.min(100,Number(value?.custom?.[k])||0))])),nodes:d.nodes.map((node,i)=>{const n=value?.nodes?.[i];return {enabled:typeof n?.enabled==='boolean'?n.enabled:node.enabled,stats:node.stats.map((s,j)=>keys.includes(n?.stats?.[j])?n.stats[j]:s),levels:[0,1,2].map(j=>cap(n?.levels?.[j],0,10))};})};}
function unit(c,key){return key==='main'?(c.id==='demon_avenger'?2100:c.id==='xenon'?48:100):({attack:5,boss:1,damage:.75,critical:.35,ied:1}[key]);}
function label(c,key){return key==='main'?(c.id==='demon_avenger'?'Max HP':c.id==='xenon'?'All Stats':'Main Stat'):names[key];}
function amount(c,key,level,main){return unit(c,key)*(main?weights[level]:level);}
function validate(value){const nodes=clean(value).nodes,errors=[],primary=new Set(),additional={};let any=false;
 nodes.forEach((n,i)=>{if(!n.enabled)return;any=true;if(n.levels.reduce((a,b)=>a+b,0)>20)errors.push('Node '+(i+1)+': line levels must total 20 or less.');
 if(new Set(n.stats).size!==3)errors.push('Node '+(i+1)+': choose three different stats.');
 if(primary.has(n.stats[0]))errors.push('A main-line stat can only be assigned to one active node.');primary.add(n.stats[0]);
 for(const s of n.stats.slice(1))additional[s]=(additional[s]||0)+1;
 });
 if(Object.values(additional).some(n=>n>2))errors.push('An additional-line stat can appear on at most two active nodes.');
 if(!any)errors.push('Enable at least one node.');
 return [...new Set(errors)];
}
function efficiencies(c){const s=root.HEXA_DAMAGE?.classes?.[c.id]?.eff;if(!s)return null;return {attack:s.atkeff1,main:c.id==='xenon'?s.mainStatAbseff1+s.subStatAbseff1+s.ssubStatAbseff1:s.mainStatAbseff1,boss:s.dmgeff1,damage:s.dmgeff1,critical:s.cridmgeff1,ied:s.igreff1_380};}
function effective(c,value){const state=clean(value);if(state.basis!=='custom')return efficiencies(c);if(!Object.values(state.custom).some(n=>n>0))return null;const e=Object.fromEntries(Object.entries(state.custom).map(([k,v])=>[k,v/(k==='main'?10000:100)]));e.damage=e.boss;return e;}
function totals(c,nodes){const t={attack:0,main:0,boss:0,damage:0,critical:0,ied:0};let defense=1;
 for(const n of nodes)if(n.enabled)n.stats.forEach((key,j)=>{const value=amount(c,key,n.levels[j],j===0);if(key==='ied')defense*=1-value/100;else t[key]+=value;});
 t.ied=(1-defense)*100;return t;
}
function multiplier(t,e){return (1+t.attack*e.attack)*(1+t.main*e.main)*(1+(t.boss+t.damage)*e.boss)*(1+t.critical*e.critical)*(1+t.ied*e.ied);}
function result(c,value,e=effective(c,value)){const errors=validate(value);if(errors.length||!e)return {errors,fd:null,totals:totals(c,clean(value).nodes)};const t=totals(c,clean(value).nodes);return {errors,fd:(multiplier(t,e)-1)*100,totals:t};}
function recommend(c,value,e=effective(c,value)){
 const state=clean(value);if(state.nodes.some(n=>n.enabled&&n.levels.reduce((a,b)=>a+b,0)>20)||!e)return null;
 const active=state.nodes.map((n,i)=>({...n,index:i})).filter(n=>n.enabled);if(!active.length)return null;
 const choices=active.map(n=>{const out=[];for(const a of keys)for(const b of keys)for(const d of keys)if(a!==b&&a!==d&&b!==d){const node={...n,stats:[a,b,d]};out.push({node,score:multiplier(totals(c,[node]),e)});}return out.sort((a,b)=>b.score-a.score);});
 const bound=choices.map(a=>a[0].score);let best=-1,answer=null;
 function walk(i,chosen,main,adds,upper){
  if(i===active.length){const score=multiplier(totals(c,chosen),e);if(score>best){best=score;answer=chosen.map(n=>({...n,stats:[...n.stats]}));}return;}
  for(const choice of choices[i]){const n=choice.node,[a,b,d]=n.stats;if(main.has(a)||(adds[b]||0)>=2||(adds[d]||0)>=2)continue;
   const nextUpper=upper*choice.score;if(nextUpper*bound.slice(i+1).reduce((x,y)=>x*y,1)<best)continue;
   main.add(a);adds[b]=(adds[b]||0)+1;adds[d]=(adds[d]||0)+1;chosen.push(n);walk(i+1,chosen,main,adds,nextUpper);chosen.pop();main.delete(a);adds[b]--;adds[d]--;
  }
 }
 walk(0,[],new Set(),{},1);
 if(!answer)return null;answer.forEach(n=>{state.nodes[n.index].stats=n.stats;});
 return {state,fd:(best-1)*100};
}
const api={keys,names,weights,defaults,clean,unit,label,amount,validate,efficiencies,effective,totals,multiplier,result,recommend};
if(typeof module!=='undefined')module.exports=api;else root.HexaStats=api;
})(typeof window!=='undefined'?window:globalThis);
