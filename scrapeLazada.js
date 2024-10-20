const puppeteer = require('puppeteer');

// Function to scrape Lazada product details using Puppeteer
const scrapeLazadaProductWithPuppeteer = async (productUrl) => {
  try {
    // Launch the Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser in action
    });

    const page = await browser.newPage();

    // Set user-agent to simulate a real browser request
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    );

    // Go to the product URL
    await page.goto(productUrl, { waitUntil: 'networkidle2' });

    // Wait for the elements to load
    await page.waitForSelector('.pdp-mod-product-badge-title');
    await page.waitForSelector('.pdp-price_size_xl');

    // Extract the product title, price, and image
    const product = await page.evaluate(() => {
      const title = document.querySelector('.pdp-mod-product-badge-title')?.innerText || '';
      const price = document.querySelector('.pdp-price_size_xl')?.innerText || '';
      const image = document.querySelector('img.pdp-mod-common-image')?.src || '';

      return {
        title,
        price,
        image,
      };
    });

    console.log('Product details:', product);

    // Close the browser
    await browser.close();

    return product;
  } catch (error) {
    console.error('Error scraping product data:', error);
    return null;
  }
};

scrapeLazadaProductWithPuppeteer('https://www.lazada.co.th/products/rexona-deodorant-spray-shower-clean-135-ml-x6-i4871716925-s20404551279.html');
