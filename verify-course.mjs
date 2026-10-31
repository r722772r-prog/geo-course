import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync('src/data/course.ts','utf8');
const compiled = ts.transpile(source,{module:ts.ModuleKind.CommonJS});
const holder={exports:{}}; new Function('exports','module',compiled)(holder.exports,holder);
const {getPricing,audiences,refundRules,units,outcomes,takeaways,notes,faqs,courseTitle}=holder.exports;
assert.equal(getPricing(new Date('2026-11-30T23:59:59+08:00')).amount,4900);
assert.equal(getPricing(new Date('2026-12-01T00:00:00+08:00')).amount,4900);
assert.equal(audiences.length,5); assert.equal(refundRules.length,3);
assert.equal(units.length,2); assert.ok(units.every(d=>d.length===5),'five units per day');
assert.equal(outcomes.length,3); assert.equal(takeaways.length,4); assert.equal(notes.length,4);
assert.ok(courseTitle.startsWith('AI IP 兩日班'));
// 對外紅線：不出現保證、變現、陪跑；不保證派案要講清楚
const publicCopy=JSON.stringify({audiences,units,outcomes,takeaways,notes,faqs});
assert.ok(!/變現|陪跑|(?<!不)保證紅|一定紅|月入/.test(publicCopy),'forbidden wording');
assert.ok(/不保證派案/.test(publicCopy),'must state no guaranteed assignments');
for(const route of ['/','/refund','/privacy','/terms','/llms.txt','/sitemap.xml','/robots.txt']) {
 const r=await fetch('http://127.0.0.1:3102'+route); assert.equal(r.status,200,route);
 const text=await r.text(); assert.ok(!/GEO 落地師|2026\/8\/22|forms.gle|恕不退費|11\/4|五天|15,000|19,800|10\/27|12\/20|12\/30|9,800|7,800|6,000|11\/30 止|AI 行銷影片實戰班|60 秒行銷影片|飲品製作紀錄/.test(text),route);
}
console.log('PASS: price, five audiences, refund periods, 2x5 units, outcomes/takeaways/notes, wording red lines, seven routes and stale-content scan');
