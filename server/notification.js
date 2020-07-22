// import Mailer from './Mailer'
const Mailer = require('./Mailer')

function notify(email, product, error) {
    
    try {
        if(error) {
            Mailer.sendEmail(
                //subject of email
                'Broken link',
                //body of email
                `The product: ${product.name} has a broken link, please update it`,
                //address
                email
            )
            console.log("Sent error email to " + email)
        }
        if(product.priceNumber < product.minPrice) {
            Mailer.sendEmail(
                //subject of email
                'Price alert',
                //body of email
                `The price on ${product.name} has dropped below ${product.minPrice}
                and is now ${product.price}`,
                //address
                email
            )
            console.log("Sent price drop email to " + email)
        }
    } catch (e) {
        // sendEmail('Price checker error', e.message, "marcustanzh@gmail.com");
        console.log(e);
    }
}

exports.notify = notify;
//for testing
// const user = {
//     "address": "marcustanzh@gmail.com"
// }

// const product = {
//     "priceNumber": 100,
//     "minPrice": 120,
//     "name": "test product"
// }
// notify(user, product);
