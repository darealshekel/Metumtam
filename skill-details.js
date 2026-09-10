(function(root){
 'use strict';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const link=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
 function effects(part,level){const fixed=Object.keys(part.levels).length===1&&part.levels[1],value=fixed||part.levels[level];return value?`<div class="description-effects">${esc(value)}<span class="description-level">${fixed?'[Fixed effect · Skill level 1]':`[Level ${level}]`}</span></div>`:'<p class="description-unavailable">Level-specific effects are not listed for this level.</p>';}
 function markup(c,core,currentLevel,{target=false}={}){
  const data=root.HEXA_DESCRIPTIONS,level=Math.max(1,Math.min(core.max,Number(currentLevel)||0));
  const entry=data.classes[c.id]?.cores[core.id];
  const parts=data.shared[core.id]||entry?.parts||[];
  const missing=['skillCore3','generalCore3'].includes(core.id)?'A wiki description is not available for this node yet.':entry?.unavailable||'A matching wiki description is not available for this skill yet.';
  const stat=core.type==='HEXA Stat';
  return `<div class="skill-description"><header class="description-heading"><img src="${esc(core.icon)}" alt="" width="36" height="36"><div><h3>${esc(core.name)}</h3><span>${stat?'HEXA Stat milestone':currentLevel===0?'Not unlocked · Level 1 preview':`${target?'Milestone target':'Current level'} · Level ${level}`}</span></div></header>${stat?'<p>Tracks completion of this HEXA Stat milestone in the reference order. Individual main and additional stat rolls are not tracked by this planner.</p>':parts.length?`${entry?.base?`<p class="description-base">${esc(entry.base.description)}</p>`:''}${parts.map(part=>`<section class="description-part"><h4>${esc(part.name)}</h4><p>${esc(part.description)}</p>${effects(part,level)}${link(part.url,'Wiki skill page')}</section>`).join('')}`:`<p class="description-unavailable">Description unavailable</p><p>${esc(missing)}</p>`}<footer class="description-source">${stat?'':`${link(data.classes[c.id]?.url||data.sourceUrl,'MapleStory Wiki')} · ${link(data.license,'CC BY-NC-SA 3.0')}<br>`}Wiki snapshot: 10 September 2026. Skills may differ by region or patch.</footer></div>`;
 }
 let panel,anchor,timer,resolve,touchInput=false;
 const selector='[data-describe],button[data-matrix-core],button[data-step]';
 function hide(){clearTimeout(timer);if(anchor){anchor.removeAttribute('aria-describedby');anchor=null;}if(panel?.matches(':popover-open'))panel.hidePopover();}
 function position(){if(!anchor?.isConnected)return hide();const r=anchor.getBoundingClientRect(),p=panel.getBoundingClientRect(),gap=12;
  let x=r.right+gap;if(x+p.width>innerWidth-12)x=r.left-p.width-gap;if(x<12)x=Math.max(12,Math.min(r.left,innerWidth-p.width-12));
  const y=Math.max(12,Math.min(r.top,innerHeight-p.height-12));panel.style.left=x+'px';panel.style.top=y+'px';
 }
 function show(el){const info=resolve(el);if(!info||!el.isConnected)return;hide();anchor=el;panel.innerHTML=markup(info.c,info.core,info.level,{target:info.target});anchor.setAttribute('aria-describedby',panel.id);panel.showPopover();position();}
 function schedule(el){clearTimeout(timer);if(anchor===el)return;timer=setTimeout(()=>show(el),240);}
 function laterHide(){clearTimeout(timer);timer=setTimeout(hide,180);}
 function mount(resolver){resolve=resolver;panel=document.createElement('div');panel.id='skill-tooltip';panel.className='skill-tooltip';panel.setAttribute('popover','manual');panel.setAttribute('role','tooltip');document.body.append(panel);
  document.addEventListener('pointerover',e=>{if(e.pointerType==='touch')return;if(panel.contains(e.target)){clearTimeout(timer);return;}const el=e.target.closest(selector);if(el&&!el.disabled)schedule(el);});
  document.addEventListener('pointerout',e=>{if(e.pointerType==='touch')return;const el=e.target.closest(selector);if((el||panel.contains(e.target))&&!el?.contains(e.relatedTarget)&&!panel.contains(e.relatedTarget))laterHide();});
  document.addEventListener('pointerdown',e=>{touchInput=e.pointerType==='touch';if(touchInput)hide();});
  document.addEventListener('focusin',e=>{if(panel.contains(e.target)){clearTimeout(timer);return;}const el=e.target.closest(selector);if(el&&!touchInput)schedule(el);else hide();});
  document.addEventListener('focusout',e=>{if(!panel.contains(e.relatedTarget)&&!anchor?.contains(e.relatedTarget))laterHide();});
  document.addEventListener('keydown',e=>{touchInput=false;if(e.key==='Escape'&&panel.matches(':popover-open')){e.preventDefault();e.stopPropagation();hide();}},true);
  document.addEventListener('scroll',e=>{if(!panel.contains(e.target))hide();},true);addEventListener('resize',hide);
  document.getElementById('dialog').addEventListener('close',hide);
 }
 root.HexaSkillDetails={markup,mount,hide};
})(window);
