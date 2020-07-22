const puppeteer = require('puppeteer');

async function q10CheckPrice(url) {
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
            //check if there are discounts
            let price = document.querySelector("#discount_info dd strong")
            
            if(!price) { //if not group buy promo
                price = document.querySelector("#div_GroupBuyRegion .prc strong")
            }
            if(!price) { //if no promos at all, regular price
                price= document.querySelector('dl[class="detailsArea lsprice"]')
            }
            if(!price) { //time sale price
                price = document.querySelector('#discount_info dd strong')
            }
            if(!price) { //last resort, shopping cart
                price = document.querySelector('#sub_ProcessBtn_cart .prc')
            }

            
            if(price) {
                price = parseFloat(
                    price.innerText
                        //specific to Singapore version of website
                        .replace('S', '')
                        //general removal or dollar sign
                        .replace('$', '')
                        //for values above 1000
                        .replace(',', '')
                        //unwanted text in the results
                        .replace('Q-Price', '')
                        .replace('Group Buy Price', '')
                )
            } else {
                return 0;
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
// checkQ10Price('https://www.qoo10.sg/item/NINTENDO-SWITCH-READY-STOCK-NINTENDO-SWITCH-RING-FIT-ADVENTURE/6737187733')
// checkQ10Price('https://www.qoo10.sg/item/NEW-ARRIVAL-MEMORY-FOAM-PILLOW-ERGONOMIC-DESIGN-RELIEF-FOR-NECK/679430267?sid=16375')
// checkQ10Price('https://www.qoo10.sg/item/FLASH-DEAL-D24-DURIAN-PUFF-15PCS-BOX-4CM-EACH/651235357?sid=196626');
exports.q10CheckPrice = q10CheckPrice;