import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
const languages=['de','en','fr','it','zh'];
for(const lang of languages)test(`${lang}: translated form, manual email fallback, accessible labels, local links`,async()=>{
 const html=await readFile(`dist/${lang}/partner-access/index.html`,'utf8');
 assert.match(html,new RegExp(`<html[^>]*\\blang="${lang==='zh'?'zh-Hans':lang}"`));assert.match(html,/<fieldset id="fields">/);assert.match(html,/<button(?=[^>]*id="submit")(?=[^>]*disabled)[^>]*>/);assert.match(html,/id="prepare-email"/);assert.match(html,/aria-live="polite"/);
 assert.doesNotMatch(html,/onclick=|<script>.*|localStorage|RESEND_API_KEY/);
 for(const name of ['name','company','email','country','project'])assert.ok(html.includes(`for="${name}"`));
 for(const [,link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if(!link.startsWith('/'))continue;
  const path=link.split(/[?#]/)[0];assert.ok(await stat(resolve('dist','.'+path)));
 }
});
test('build excludes source, secrets, tests and documentation',async()=>{
 const files=await readdir('dist',{recursive:true});
 assert.ok(!files.some(f=>/^(functions|lib|scripts|tests|docs|node_modules|\.git|\.env|\.dev.vars)/.test(f)));
 assert.deepEqual(JSON.parse(await readFile('dist/_routes.json','utf8')).include,['/partner-api','/partner-api/*']);
});
test('existing headers preserved and partner pages use scoped CSP',async()=>{
 const headers=await readFile('dist/_headers','utf8');assert.ok(headers.startsWith(await readFile('_headers','utf8')));assert.equal((headers.match(/! Content-Security-Policy/g)||[]).length,languages.length);
 for(const lang of languages) {const html=await readFile(`dist/${lang}/partner-access/index.html`,'utf8');const policy=html.match(/<meta(?=[^>]*http-equiv="Content-Security-Policy")[^>]*content="([^"]+)"/)[1];
 const script=policy.split(';').map(x=>x.trim()).find(x=>x.startsWith('script-src '));
 assert.deepEqual(script.split(/\s+/),['script-src',"'self'",'https://challenges.cloudflare.com']);assert.doesNotMatch(html,/unsafe-inline|unsafe-eval/);}
});

test('build includes reviewed R19 pages, Chinese pages and release marker without rewriting source',async()=>{
 assert.match(await readFile('dist/version.html','utf8'),/20261027-R24/);
 for(const lang of languages){
  assert.equal(await readFile(`dist/${lang}/partner-access/index.html`,'utf8'),await readFile(`${lang}/partner-access/index.html`,'utf8'));
  for(const route of ['', 'thailand/','cirpal/']){
   const page=await readFile(`dist/${lang}/${route}index.html`,'utf8');assert.match(page,/20261026-R19/);
  }
 }
 const dirs=await readdir('dist');assert.ok(!dirs.includes('es'));assert.ok(!dirs.includes('ja'));
});
