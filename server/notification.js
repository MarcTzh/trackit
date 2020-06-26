require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function notify(user, product) {
    
    try {
        if(product.priceNumber < product.minPrice) { //TODO: send to client
            sendEmail(
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


function sendEmail(subject, body, address) {
    const email = {
        to: address,
        from: 'marcustanzh@gmail.com',
        subject: subject,
        text: body,
        html: body
    }

    return sgMail.send(email).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}


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

exports.notify = notify;