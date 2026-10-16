import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync('src/data/course.ts','utf8');
const compiled = ts.transpile(source,{module:ts.ModuleKind.CommonJS});
const holder={exports:{}}; new Function('exports','module',compiled)(holder.exports,holder);
const {getPricing,audiences,refundRules}=holder.exports;
assert.equal(getPricing(new Date('2026-11-30T23:59:59+08:00')).amount,6000);
assert.equal(getPricing(new Date('2026-12-01T00:00:00+08:00')).amount,7800);
assert.equal(getPricing(new Date('2026-12-01T00:00:00+08:00')).early,false);
assert.equal(audiences.length,5); assert.equal(refundRules.length,3);
for(const route of ['/','/refund','/privacy','/terms','/llms.txt','/sitemap.xml','/robots.txt']) {
 const r=await fetch('http://127.0.0.1:3102'+route); assert.equal(r.status,200,route);
 const text=await r.text(); assert.ok(!/GEO 落地師|2026\/8\/22|forms.gle|恕不退費|11\/4|五天|15,000|19,800|10\/27|12\/20|12\/30|9,800/.test(text),route);
}
console.log('PASS: 11/30 price cutover, five audiences, refund periods, seven routes and stale-content scan');
