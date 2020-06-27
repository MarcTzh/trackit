// //For Amazon price scraping
// require('dotenv').config()
// const sgMail = require('@sendgrid/mail')
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const nightmare = require("nightmare")();

async function checkPrice(rawUrl) {
    try {
        const url = rawUrl.split('?')[0];
        let priceString;
        let priceblock_ourprice;
        priceblock_ourprice = await nightmare
        .goto(url)
        .exists("#priceblock_ourprice")
        if(priceblock_ourprice) {
            priceblock_ourprice = priceblock_ourprice
            .wait("#priceblock_ourprice")
            .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
            .end()
            priceString = priceblock_ourprice
        } else {
            const priceblock_dealprice = await nightmare
            .goto(url)
            .wait("#priceblock_dealprice")
            .evaluate(() => document.getElementById("priceblock_dealprice").innerText)
            .end()
            if(priceblock_dealprice) {
                priceString = priceblock_dealprice;
            } else {
                //both also failed
                priceString = "0"; //added to prevent error
            }
        }

        const priceNumber = parseFloat(
            priceString
                //specific to Singapore version of website
                .replace('S', '')
                //general removal or dollar sign
                .replace('$', '')
                //for values above 1000
                .replace(',', '')
        )
        // console.log(priceNumber);

        return priceNumber;
        
    } catch (e) {
        //error is thrown in async function, causing problems when run
        console.error(e);
    }
}

// checkPrice('https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=Q8JXJJGZ570KZ05BZK33&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051')


// export default checkPrice;
exports.checkPrice = checkPrice;

// export { checkPrice };
