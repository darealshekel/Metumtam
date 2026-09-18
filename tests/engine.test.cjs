const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const E = require('../engine.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../data.js'), 'utf8'), context);
const classes = context.window.HEXA_DATA.classes.filter(c => c.available);
for (const invalid of [null, [], 'old value', 42]) {
 assert.deepEqual(E.clean(classes[0], invalid), E.defaults(classes[0]), 'Malformed saved profiles recover to defaults');
}
let enhancements = 0, splitMilestones = 0, scenarios = 0;

for (const c of classes) {
 for (const orderMode of ['fragments', 'erda']) {
  for (const includeThirdSkill of [false, true]) {
   const options = { orderMode, includeThirdSkill }, p = E.defaults(c);
   const original = E.plan(c, p, options), expected = original.at(-1);
   let fragments = 0, erda = 0, iterations = 0;
   for (let next; (next = E.nextEnhancement(c, p, options));) {
    assert.ok(++iterations < 1000, `${c.id}: upgrades must converge`);
    const milestone = E.plan(c, p, options)[0];
    const core = c.cores.find(core => core.id === next.id);
    assert.equal(next.id, milestone.id);
    assert.equal(next.n, milestone.n);
    assert.equal(next.from, p.levels[next.id]);
    if (core.type === 'HEXA Stat') {
     assert.equal(next.to, core.max, 'Stat completion markers must remain atomic');
    } else {
     assert.equal(next.to, next.from + 1, `${c.id}: exactly one skill level per enhancement`);
     assert.ok(next.to <= p.goals[next.id]);
     assert.equal(next.f, c.costs[next.id].f[next.to] - c.costs[next.id].f[next.from]);
     assert.equal(next.e, c.costs[next.id].e[next.to] - c.costs[next.id].e[next.from]);
     if (milestone.to > next.to) splitMilestones++;
    }
    if (!includeThirdSkill) assert.notEqual(next.id, 'skillCore3');
    fragments += next.f; erda += next.e;
    p.levels[next.id] = next.to;
    enhancements++;
   }
   assert.equal(fragments, expected.totalF, `${c.id}: split costs must match the full order`);
   assert.equal(erda, expected.totalE);
   assert.equal(E.nextEnhancement(c, p, options), null);
   const limited = E.defaults(c);
   for (const core of c.cores) limited.goals[core.id] = limited.levels[core.id];
   const skill = c.cores.find(core => core.type !== 'HEXA Stat' && core.id !== 'skillCore3');
   limited.levels[skill.id] = 19; limited.goals[skill.id] = 20;
   const single = E.nextEnhancement(c, limited, options);
   assert.equal(single.id, skill.id);
   assert.equal(single.from, 19); assert.equal(single.to, 20);
   limited.levels[skill.id] = 20;
   assert.equal(E.nextEnhancement(c, limited, options), null, 'Custom goals must stop enhancement');
   scenarios++;
  }
 }
}
assert.ok(splitMilestones > 0);
console.log(JSON.stringify({ classes: classes.length, scenarios, enhancements, splitMilestones, passed: true }));
