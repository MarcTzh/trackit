// //For Amazon price scraping
// require('dotenv').config()
// const sgMail = require('@sendgrid/mail')
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const Nightmare = require('nightmare');
const { checkPrice } = require('./AmazonParser');
// const nightmare = Nightmare({ show: true })
const nightmare = Nightmare()

async function checkArrayPrice(urls) {
    try {
        // const urls = args;
        return urls.reduce((accumulator, url) => {
          return accumulator.then((results) => {
            return nightmare.goto(url)
              .wait("#priceblock_ourprice")
              .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
              .then((result) => {
                const price = parseFloat(
                  result
                      //specific to Singapore version of website
                      .replace('S', '')
                      //general removal or dollar sign
                      .replace('$', '')
                      //for values above 1000
                      .replace(',', '')
                )
                results.push(price);
                return results;
              });
          });
      }, Promise.resolve([])).then((results) => {
        console.log(results);
        return nightmare.end()
      });
    } catch (e) {
        //error is thrown in async function, causing problems when run
        console.error(e);
    }
}

const url1 = 'https://www.amazon.sg/dp/B07W69L5KK/ref=s9_acsd_al_bw_c2_x_0_i?pf_rd_m=ACT6OAM3OSC9S&pf_rd_s=merchandised-search-2&pf_rd_r=1NCYYBRC0AM2ENQBD96Q&pf_rd_t=101&pf_rd_p=d56c4fcb-4dab-4cff-9d67-da43b03b809b&pf_rd_i=6436080051';
const url2 = 'https://www.amazon.sg/Acer-XB271HU-Gaming-Monitor-Inches/dp/B06XYKBXRV?ref_=s9_apbd_orec_hd_bw_b6tKmeR&pf_rd_r=F856FMED8RHAQ5WV9ZYP&pf_rd_p=7372f16d-0efa-56c3-9ad0-f86ad456852e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';
const urlArray = [url1, url2];
// const urlArray = [url1];
checkArrayPrice(urlArray);
// checkPrice('https://www.amazon.com/dp/B07G7PMVR9/ref=dp_cerb_2')
// export default checkPrice;
exports.checkArrayPrice = checkArrayPrice;

// export { checkPrice };
