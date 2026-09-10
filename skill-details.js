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
  return `<div class="skill-description"><header class="description-heading"><img src="${esc(core.icon)}" alt="" width="36" height="36"><div><h3>${esc(core.name)}</h3><span>${stat?'HEXA Stat milestone':currentLevel===0?'Not unlocked · Level 1 preview':`${target==='next'?'Next level':target?'Milestone target':'Current level'} · Level ${level}`}</span></div></header>${stat?'<p>Tracks completion of this HEXA Stat milestone in the reference order. Individual main and additional stat rolls are not tracked by this planner.</p>':parts.length?`${entry?.base?`<p class="description-base">${esc(entry.base.description)}</p>`:''}${parts.map(part=>`<section class="description-part"><h4>${esc(part.name)}</h4><p>${esc(part.description)}</p>${effects(part,level)}${link(part.url,'Wiki skill page')}</section>`).join('')}`:`<p class="description-unavailable">Description unavailable</p><p>${esc(missing)}</p>`}<footer class="description-source">${stat?'':`${link(data.classes[c.id]?.url||data.sourceUrl,'MapleStory Wiki')} · ${link(data.license,'CC BY-NC-SA 3.0')}<br>`}Wiki snapshot: 10 September 2026. Skills may differ by region or patch.</footer></div>`;
 }
 function preview(info){
  const {c,core,level,target}=info,data=root.HEXA_DESCRIPTIONS,entry=data.classes[c.id]?.cores[core.id],parts=data.shared[core.id]||entry?.parts||[],part=parts[0],lv=Math.max(1,level);
  const description=part?.description||entry?.unavailable||'Description unavailable for this node.';
  const effect=part?(part.levels[lv]||(Object.keys(part.levels).length===1?part.levels[1]:'')):'';
  return `<div class="hover-skill-name">${esc(core.name)}</div><div class="hover-skill-level">${level===0?'Locked · Level 1 preview':`${target?'Target':'Current'} level ${level}`}</div><p class="hover-skill-copy">${esc(description)}</p>${effect?`<div class="hover-skill-effect">${esc(effect)}</div>`:''}<div class="hover-skill-hint">Select this skill for full details.</div>`;
 }
 let panel,anchor,timer,resolve;
 const selector='[data-describe],button[data-matrix-core],button[data-step]';
 function hide(){clearTimeout(timer);if(anchor){anchor.removeAttribute('aria-describedby');anchor=null;}if(panel?.matches(':popover-open'))panel.hidePopover();}
 function position(){if(!anchor?.isConnected)return hide();const r=anchor.getBoundingClientRect(),p=panel.getBoundingClientRect(),gap=14;
  let x=r.right+gap;if(x+p.width>innerWidth-12)x=r.left-p.width-gap;if(x<12)x=Math.max(12,Math.min(r.left,innerWidth-p.width-12));
  panel.style.left=x+'px';panel.style.top=Math.max(12,Math.min(r.top,innerHeight-p.height-12))+'px';
 }
 function show(el){if(!el.isConnected||!el.matches(':hover'))return;const info=resolve(el);if(!info)return;hide();anchor=el;panel.innerHTML=preview(info);anchor.setAttribute('aria-describedby',panel.id);panel.showPopover();position();}
 function mount(resolver){resolve=resolver;panel=document.createElement('div');panel.id='skill-tooltip';panel.className='skill-tooltip';panel.setAttribute('popover','manual');panel.setAttribute('role','tooltip');document.body.append(panel);
  document.addEventListener('pointerover',e=>{if(e.pointerType==='touch')return;const el=e.target.closest(selector);if(!el||el.disabled)return;if(el===anchor)return;hide();timer=setTimeout(()=>show(el),110);});
  document.addEventListener('pointerout',e=>{const el=e.target.closest(selector);if(el&&!el.contains(e.relatedTarget))hide();});
  document.addEventListener('pointerdown',hide);
  document.addEventListener('focusin',hide);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.matches(':popover-open')){e.preventDefault();e.stopPropagation();hide();}},true);
  document.addEventListener('scroll',hide,true);addEventListener('resize',hide);
  document.getElementById('dialog').addEventListener('close',hide);
 }
 root.HexaSkillDetails={markup,mount,hide,preview};
})(window);
