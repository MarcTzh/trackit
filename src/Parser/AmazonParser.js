// //For Amazon price scraping
// require('dotenv').config()
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const nightmare = require("nightmare")();

// //original code
// const args = process.argv.slice(2)
// const rawUrl = args[0]
// //remove tracking bits (part after ?)
// const url = rawUrl.split('?')[0];
// // console.log(url);
// // const minPrice = args[1]

export async function checkPrice(rawUrl) {
    try {
        //remove tracking bits (part after ?)
        const url = rawUrl.split('?')[0];

        //original code
        const priceString = await nightmare
        .goto(url)
        .wait("#priceblock_ourprice")
        .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
        .end()
        const priceNumber = parseFloat(
            priceString
                //specific to Singapore version of website
                .replace('S', '')
                //general removal or dollar sign
                .replace('$', '')
                //for values above 1000
                .replace(',', '')
        )
        console.log(priceNumber);
        return priceNumber;
        // if(priceNumber < minPrice) { //TODO: send to client
        //     sendEmail(
        //         //subject of email
        //         'Price is low',
        //         //body of email
        //         `The price on ${url} has dropped below ${minPrice}`
        //     )
        //     console.log("Below price floor: " + priceNumber)
        // }
    } catch (e) {
        //TODO: to send to developer
        // await sendEmail('Price checker error', e.message)
        //error is thrown in async function, causing problems when run
        console.error(e);
    }
}

checkPrice('https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=Q8JXJJGZ570KZ05BZK33&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051')
//TODO: include a third parameter - email to send to, dev or client
// function sendEmail(subject, body) {
//     const email = {
//         //this is a temp email to be updated in the future
//         to: 'fosamev799@whowlft.com',
//         from: 'test@example.com',
//         subject: subject,
//         text: body,
//         html: body
//     }

//     return sgMail.send(email)
// }

// while(true) {
//     checkPrice()
// }

// export default checkPrice;