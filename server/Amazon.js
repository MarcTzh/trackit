const puppeteer = require('puppeteer');

async function checkAmazonPrice(url) {
    let price = null;
    let browser = await puppeteer.launch(); 
    let page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        page.on('error', err=> {
            console.log('error happen at the page: ', err);
        });
    
        page.on('pageerror', pageerr=> {
            console.log('pageerror occurred: ', pageerr);
        })

        let data = await page.evaluate(() => {
            //check if dealprice
            price = document.querySelector("#priceblock_dealprice")

            if(!price) { //sale price
                price = document.querySelector("#priceblock_saleprice")
            }
            
            if(!price) { //regular price
                price = document.querySelector("#priceblock_ourprice")
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
                )
            } else {
                return null;
            }
            return price;
        })

        return data;
       
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
    }
}

//regular price
// checkAmazonPrice('https://www.amazon.sg/Acer-XB271HU-Gaming-Monitor-Inches/dp/B06XYKBXRV?ref_=s9_apbd_orec_hd_bw_b71Z65b&pf_rd_r=K5F4N7P3E80AYSQ864T7&pf_rd_p=2dc72da2-c92e-5045-b35c-42026e8a8793&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6436071051')
//deal price
// checkAmazonPrice('https://www.amazon.sg/Fisher-Price-Thomas-Friends-imaginative-characters/dp/B07N4PHKWP?ref_=Oct_DLandingS_PC_a0b7797c_0&smid=ARPIJN329XQ0D')
exports.checkAmazonPrice = checkAmazonPrice;