require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


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

exports.sendEmail = sendEmail