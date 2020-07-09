const puppeteer = require('puppeteer');

async function checkQ10Price(url) {
        let browser = await puppeteer.launch(); 
        let page = await browser.newPage();

        page.on('error', err=> {
            console.log('error happen at the page: ', err);
        });

        page.on('pageerror', pageerr=> {
            console.log('pageerror occurred: ', pageerr);
        })
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        let data = await page.evaluate(() => {
            let price = document.querySelector('dl[class="detailsArea lsprice"]').innerText
            if(price) {
                price = parseFloat(
                    price
                        //specific to Singapore version of website
                        .replace('S', '')
                        //general removal or dollar sign
                        .replace('$', '')
                        //for values above 1000
                        .replace(',', '')
                        //unwanted text in the results
                        .replace('Q-Price', '')
                )
            } else {
                return null;
            }
            return price;
        })


        console.log("in q10, data: " + data);
        return data;

       
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
    }
}

// checkQ10Price('https://www.qoo10.sg/gmkt.inc/Goods/Goods.aspx?goodscode=489940996')

exports.checkQ10Price = checkQ10Price;