const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const S=require('../hexa-stats.js'),E=require('../engine.js');
const ctx={window:{}};for(const file of ['data.js','damage-data.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);
global.HEXA_DAMAGE=ctx.window.HEXA_DAMAGE;
const ren=ctx.window.HEXA_DATA.classes.find(c=>c.id==='ren');
assert.equal(S.amount(ren,'attack',4,true),20);
assert.equal(S.amount(ren,'attack',5,true),30);
assert.equal(S.amount(ren,'critical',10,true),7);
assert.equal(S.amount(ren,'critical',10,false),3.5);
assert.equal(S.amount({id:'demon_avenger'},'main',10,true),42000);
assert.equal(S.amount({id:'xenon'},'main',10,true),960);
assert.equal(S.result(ren,S.defaults()).fd,0);
assert.equal(S.clean(null).nodes.length,3);
const p=S.defaults();p.nodes[0].levels=[10,10,1];assert.match(S.validate(p).join(),/20 or less/);
p.nodes[0].levels=[4,8,8];p.nodes[1].enabled=true;p.nodes[1].stats[0]='attack';assert.match(S.validate(p).join(),/one active/);
p.nodes[1].enabled=false;
const t=S.totals(ren,[{enabled:true,stats:['ied','boss','attack'],levels:[10,0,0]},{enabled:true,stats:['critical','ied','main'],levels:[0,10,0]}]);assert.ok(Math.abs(t.ied-28)<1e-9,'20% and 10% IED combine to 28%');
const e={attack:.001,main:.00001,boss:.002,critical:.003,ied:.0004};
const total=S.totals(ren,p.nodes),expected=(1+total.attack*e.attack)*(1+(total.boss+total.damage)*e.boss)*(1+total.critical*e.critical)*(1+total.main*e.main)*(1+total.ied*e.ied);
assert.ok(Math.abs(S.result(ren,p,e).fd-(expected-1)*100)<1e-9);
// Exhaustive two-node comparison independently checks the optimizer and its pruning.
p.nodes[1].enabled=true;p.nodes[1].levels=[6,7,7];p.nodes[1].stats=['main','damage','ied'];
const rec=S.recommend(ren,p,e);assert.deepEqual(S.validate(rec.state),[]);assert.ok(rec.fd>=S.result(ren,p,e).fd);
const choices=[];for(const a of S.keys)for(const b of S.keys)for(const c of S.keys)if(new Set([a,b,c]).size===3)choices.push([a,b,c]);
let best=-Infinity;for(const a of choices)for(const b of choices){const q=S.clean(p);q.nodes[0].stats=a;q.nodes[1].stats=b;if(S.validate(q).length)continue;best=Math.max(best,S.result(ren,q,e).fd);}
assert.ok(Math.abs(rec.fd-best)<1e-9,'Optimized result matches exhaustive search');
p.nodes[2].enabled=true;p.nodes[2].levels=[5,8,7];const all=S.recommend(ren,p,e);assert.deepEqual(S.validate(all.state),[]);
assert.ok(all.state.nodes.every((n,i)=>JSON.stringify(n.levels)===JSON.stringify(p.nodes[i].levels)),'Recommendation preserves all rolls');
const clean=E.clean(ren,{hexaStats:p});assert.deepEqual(clean.hexaStats,p,'Engine preserves the separate stat editor');
const custom=S.defaults();custom.basis='custom';assert.equal(S.result(ren,custom).fd,null);custom.custom.attack=1;custom.nodes[0].levels=[1,0,0];assert.ok(Math.abs(S.result(ren,custom).fd-5)<1e-9,'1% FD per attack gives 5% for 5 attack');
let scenarios=0;for(const c of ctx.window.HEXA_DATA.classes){for(const bossMode of ['general','kaling'])for(const orderMode of ['fragments','erda'])for(const includeThirdSkill of [true,false]){const p=E.defaults(c),opts={bossMode,orderMode,includeThirdSkill};let n=0;while(true){const next=E.nextEnhancement(c,p,opts);if(!next)break;assert.ok(++n<1000);assert.ok(next.f>=0&&next.e>=0);assert.equal(next.to,next.id.startsWith('hexaStat')?c.cores.find(x=>x.id===next.id).max:next.from+1);p.levels[next.id]=next.to;}for(const core of E.activeCores(c,opts))assert.equal(p.levels[core.id],p.goals[core.id],c.id+' '+core.id);scenarios++;}}
for(const [id,d] of Object.entries(ctx.window.HEXA_DAMAGE.classes))for(const rows of Object.values(d.orders))for(const r of rows){assert.ok(Number.isFinite(r.fd)&&r.fd>=0,id+' valid FD');}
console.log(JSON.stringify({passed:true,scenarios,referenceClasses:Object.keys(ctx.window.HEXA_DAMAGE.classes).length,optimizerMatchesExhaustive:true}));
