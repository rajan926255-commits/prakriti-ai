import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/calculator', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('--- Before Click ---');
  let h2s = await page.$$eval('h2', els => els.map(e => e.textContent));
  console.log('H2s:', h2s);
  
  const nextBtn = await page.getByRole('button', { name: /next/i }).first();
  console.log('Clicking Next button...');
  await nextBtn.click({ force: true });
  
  await page.waitForTimeout(2000);
  
  console.log('--- After Click ---');
  h2s = await page.$$eval('h2', els => els.map(e => e.textContent));
  console.log('H2s:', h2s);
  
  await browser.close();
})();
