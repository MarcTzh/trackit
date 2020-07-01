import Mailer from './Mailer'

function notify(user, product) {
    
    try {
        if(product.priceNumber < product.minPrice) { //TODO: send to client
            Mailer.sendEmail(
                //subject of email
                'Price alert',
                //body of email
                `The price on ${product.name} has dropped below ${product.minPrice}`,
                //address
                user.address
            )
            console.log("Below price floor: " + product.priceNumber)
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
