const puppeteer = require('puppeteer');

async function checkLazadaPrice(url) {
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
            let price = document.querySelector('span[class=" pdp-price pdp-price_type_normal pdp-price_color_orange pdp-price_size_xl"]')

            if(!price) {
                price = document.querySelector('.pdp-price_size_xl')
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


// checkLazadaPrice('https://www.lazada.sg/products/mono-dsign-aluminium-enhanced-stability-foldable-compact-laptop-stand-i743462379-s2398834345.html?spm=a2o42.searchlistcategory.list.1.45e937215jsTOp&search=1')
// checkLazadaPrice('https://www.lazada.sg/products/dell-27-full-hd-monitor-freesync-75hz-se2719hr-i505970628-s1408408036.html?spm=a2o42.searchlistcategory.list.1.23e57d390hVXBm&search=1')
exports.checkLazadaPrice = checkLazadaPrice;