const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  const searchBox = await page.$('input[type=text]');
  await searchBox.type('cookies');
  const inputElement = await page.$(
    'input[type=submit][value="Google Search"]',
  );
  await inputElement.click();
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.once('load', () => console.log('Cookies loaded!')),
  ]);

  await page.screenshot({ path: 'cookies.png' });
  await browser.close();
})();
