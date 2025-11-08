// sum_tables.js
import { chromium } from 'playwright';

const seeds = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
const baseUrl = 'https://example.com/seed'; // Replace with the actual base URL
let totalSum = 0;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    totalSum += sum;
    console.log(`Sum for Seed ${seed}: ${sum}`);
  }

  console.log(`\n✅ Total Sum Across All Seeds: ${totalSum}`);
  await browser.close();
})();
