//For Amazon price scraping

require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const nightmare = require("nightmare")()

const args = process.argv.slice(2)
const rawUrl = args[0]
//remove tracking bits (part after ?)
const url = rawUrl.split('?')[0];
console.log(url);
const minPrice = args[1]

async function checkPrice() {
    try {
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
        await sendEmail('Price checker error', e.message)
        //error is thrown in async function, causing problems when run
        console.error(e);
    }
}
//TODO: include a third parameter - email to send to, dev or client
function sendEmail(subject, body) {
    const email = {
        //this is a temp email to be updated in the future
        to: 'fosamev799@whowlft.com',
        from: 'test@example.com',
        subject: subject,
        text: body,
        html: body
    }

    return sgMail.send(email)
}

checkPrice()

// export default checkPrice;