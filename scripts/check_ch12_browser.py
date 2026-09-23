"""Check deployed-style MkDocs pages in a real browser; report actual evidence."""
import asyncio,json,os
from pathlib import Path
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH','/tmp/ch12-browsers')
if Path('/tmp/ch12-fonts.conf').exists(): os.environ['FONTCONFIG_FILE']='/tmp/ch12-fonts.conf'
from playwright.async_api import async_playwright
OUT=Path('/tmp/ch12-browser');OUT.mkdir(exist_ok=True)
async def main():
 report={'pages':[],'downloads':[],'errors':[]};assets=set()
 async with async_playwright() as pw:
  browser=await pw.chromium.launch(headless=True)
  page=await browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  for n in range(20,61):
   response=await page.goto(f'http://127.0.0.1:8000/circuits/basic-feedback/12-{n}/',wait_until='networkidle')
   await page.wait_for_function('window.MathJax && MathJax.startup && MathJax.startup.promise',timeout=30000)
   await page.evaluate('MathJax.startup.promise')
   await page.evaluate('document.fonts.ready')
   # Lazy-loaded images require scrolling into view before testing naturalWidth.
   await page.evaluate("document.querySelectorAll('img').forEach(x => x.loading='eager')")
   await page.wait_for_function("Array.from(document.querySelectorAll('article img')).every(x=>x.complete)")
   checks=await page.evaluate('''() => ({
      formulaWrappers:document.querySelectorAll('article .arithmatex').length,
      renderedMath:document.querySelectorAll('article mjx-container').length,
      mathErrors:Array.from(document.querySelectorAll('mjx-merror')).map(x=>x.textContent),
      brokenImages:Array.from(document.querySelectorAll('article img')).filter(x=>!x.naturalWidth).map(x=>x.src),
      images:document.querySelectorAll('article img').length,
      bodyOverflow:document.documentElement.scrollWidth>innerWidth+2,
      grids:Array.from(document.querySelectorAll('.p1240-results-grid')).map(x=>{
        const a=x.children[0].getBoundingClientRect(),b=x.children[1].getBoundingClientRect();
        return {horizontal:Math.abs(a.top-b.top)<3 && b.left>a.left,width:x.clientWidth};
      })
   })''')
   assert response.status==200,(n,response.status)
   assert checks['renderedMath']==checks['formulaWrappers'] and checks['renderedMath']>0 and not checks['mathErrors'],(n,checks)
   assert not checks['brokenImages'],(n,checks)
   assert not checks['bodyOverflow'],(n,checks)
   assert all(g['horizontal'] for g in checks['grids']),(n,checks)
   links=await page.locator('article a[href]').evaluate_all('(xs)=>xs.map(x=>x.href)')
   images=await page.locator('article img').evaluate_all('(xs)=>xs.map(x=>x.src)')
   assets.update(x for x in links+images if x.startswith('http://127.0.0.1:8000/assets/'))
   report['pages'].append({'problem':n,'desktop':checks})
   if n in (20,40,43,60):
    await page.screenshot(path=str(OUT/f'12-{n}-desktop.png'))
    if checks['grids']:await page.locator('.p1240-results-grid').first.screenshot(path=str(OUT/f'12-{n}-comparison.png'))
   if n==20:
    label=page.locator('label.md-nav__link').filter(has_text='Chapter 12 — Basic Feedback')
    key=await label.first.get_attribute('for');toggle=page.locator('#'+key)
    before=await toggle.is_checked();await label.first.click();after=await toggle.is_checked();await label.first.click()
    assert before!=after
    report['sidebar']={'checkbox':key,'before':before,'after':after,'restored':await toggle.is_checked()}
   await page.set_viewport_size({'width':390,'height':844})
   mobile=await page.evaluate('''() => ({overflow:document.documentElement.scrollWidth>innerWidth+2,
      grids:Array.from(document.querySelectorAll('.p1240-results-grid')).map(x=>{
       const a=x.children[0].getBoundingClientRect(),b=x.children[1].getBoundingClientRect();
       return {vertical:b.top>=a.bottom-2 && Math.abs(a.left-b.left)<3};})})''')
   assert all(x['vertical'] for x in mobile['grids']),(n,mobile)
   assert not mobile['overflow'],(n,mobile)
   report['pages'][-1]['mobile']=mobile
   if mobile['overflow']:
    print('OVERFLOW',n,await page.evaluate("Array.from(document.querySelectorAll('article *')).filter(x=>x.getBoundingClientRect().right>innerWidth+2).slice(0,8).map(x=>[x.tagName,x.className,x.textContent.slice(0,60)])"),flush=True)
   if n in (40,60):
    await page.screenshot(path=str(OUT/f'12-{n}-mobile.png'))
    await page.locator('.p1240-results-grid').first.screenshot(path=str(OUT/f'12-{n}-mobile-comparison.png'))
   await page.set_viewport_size({'width':1440,'height':1000})
   print('checked',n,checks['renderedMath'],'math blocks',flush=True)
  for url in sorted(assets):
   r=await page.request.get(url)
   assert r.status==200,(url,r.status)
   b=await r.body()
   if url.endswith('.zip'):assert b[:2]==b'PK',url
   report['downloads'].append({'url':url.replace('http://127.0.0.1:8000/',''),'status':r.status})
  await browser.close()
 (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 assert not report['errors'],report['errors']
 print('PASS',len(report['pages']),'pages',len(report['downloads']),'assets; collapsible sidebar and desktop/mobile grids')
asyncio.run(main())
