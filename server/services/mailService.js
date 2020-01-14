const nodemailer = require('nodemailer')
const config = require('../config/index')

const sendMail  = (to, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.mail.user,
            pass: config.mail.password,
        }
    })

    var mailOptions = {
        from: 'Elber <elbergun1418@gmail.com>',
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error) {
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}

module.exports = () => {
    return {
        sendMail
    }
}