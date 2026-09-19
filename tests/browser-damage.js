function browserCheck(page){
return (async()=>{const browser=page.context().browser(),context=await browser.newContext({viewport:{width:1440,height:1000}}),p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));const check=(c,m)=>{if(!c)throw Error(m);};
await p.goto('http://127.0.0.1:4181/#class=ren');
await p.locator('#hexa-stats-panel').scrollIntoViewIfNeeded();
for(const [id,value]of [['hexa-roll-0-0','4'],['hexa-roll-0-1','8'],['hexa-roll-0-2','8']]){await p.locator('#'+id).fill(value);}
check((await p.locator('.stat-results strong').textContent())!=='+0.00%','Stats FD updated');
await p.locator('#compare-hexa-stats').click();check(await p.locator('#apply-hexa-stats').isVisible(),'Recommendation visible');
const levels=await p.evaluate(()=>JSON.parse(localStorage.getItem('hexa-planner-v1')).drafts.ren.levels);
await p.locator('#apply-hexa-stats').click();
check(JSON.stringify(levels)===await p.evaluate(()=>JSON.stringify(JSON.parse(localStorage.getItem('hexa-planner-v1')).drafts.ren.levels)),'Roll edits do not change matrix');
await p.reload();check(await p.locator('#hexa-roll-0-0').inputValue()==='4','Rolls persist');
let refocus=0;const roll=p.locator('#hexa-roll-0-0');await roll.focus();await roll.evaluate(el=>{window.rollRefocus=0;el.addEventListener('focus',()=>window.rollRefocus++);});await roll.press('ControlOrMeta+A');await roll.press('1');await roll.press('0');check(await roll.inputValue()==='10','Two digits work');check(await p.evaluate(()=>window.rollRefocus)===0,'Stable input focus');
check((await p.locator('.stat-validation').textContent()).includes('20 or less'),'Invalid total explained');
await roll.fill('4');await p.locator('[data-boss-mode=kaling]').click();check(await p.locator('[data-boss-mode=kaling]').getAttribute('aria-pressed')==='true','Kaling selected');
const nextBefore=await p.evaluate(()=>{const E=window.HexaEngine,c=window.HEXA_DATA.classes.find(x=>x.id==='ren'),s=JSON.parse(localStorage.getItem('hexa-planner-v1'));return E.nextEnhancement(c,E.clean(c,s.drafts.ren),s.settings);});
await p.locator('#enhance-node-button').click();const now=await p.evaluate(id=>JSON.parse(localStorage.getItem('hexa-planner-v1')).drafts.ren.levels[id],nextBefore.id);check(now===nextBefore.to,'Enhance still single level');
await p.locator('#hexa-stats-panel').scrollIntoViewIfNeeded();await p.screenshot({path:'output/playwright/stats-desktop.png'});
const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const m=await mobile.newPage();m.on('pageerror',e=>errors.push(e.message));await m.goto('http://127.0.0.1:4181/#class=ren');await m.locator('#hexa-stats-panel').scrollIntoViewIfNeeded();await m.locator('#hexa-roll-0-0').fill('10');check(await m.locator('#hexa-roll-0-0').inputValue()==='10','Touch roll entry');check(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');await m.screenshot({path:'output/playwright/stats-mobile.png'});
await m.goto('http://127.0.0.1:4181/#class=night_lord');check(await m.locator('[data-boss-mode=kaling]').isDisabled(),'Missing Kaling disabled');
await m.locator('.custom-efficiencies summary').click();await m.locator('#hexa-custom-basis').check();await m.locator('#hexa-eff-attack').fill('1');await m.locator('#hexa-eff-attack').press('Tab');await m.locator('#hexa-roll-0-0').fill('1');check((await m.locator('.stat-results strong').textContent())==='+5.00%','Custom efficiencies available on other classes');
await mobile.close();await context.close();check(errors.length===0,errors.join());return {passed:true,desktop:true,mobile:true,errors};})();
}
