const puppeteer = require('puppeteer');


const pageurl = 'https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=WEKRF9Q28BVNXK9VJ0QG&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';

async function webscraping(url) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    let dataObj = {};
    try {
        await page.goto(url);

        // const [el] = await page.$x('//*[@id="landingImage"]');
        // const src = await el.getProperty('src');
        // const imgURL = await src.jsonValue();

        // const [el2] = await page.$x('//*[@id="productTitle"]');
        // const txt = await el2.getProperty('textContent');
        // const rawtitle = await txt.jsonValue();
        // const title = rawtitle
        //             //to remove linebreaks
        //             .replace(/(\r\n|\n|\r)/gm, "");

        const [el3] = await page.$x('//*[@id="priceblock_ourprice"]');
        const txt2 = await el3.getProperty('textContent');
        const priceString = await txt2.jsonValue();
        const price = parseFloat(
            priceString
                //specific to Singapore version of website
                .replace('S', '')
                //general removal or dollar sign
                .replace('$', '')
                //for values above 1000
                .replace(',', '')
        );
        browser.close()
        dataObj = {
            // image: imgURL,
            // name: title,
            price: price
        };
        console.log(dataObj.price);

        return price;
    } catch (e) {
        console.log('error in Scraper.js: ' + e);
    }
}

webscraping(pageurl).catch(console.error);


module.exports = webscraping;