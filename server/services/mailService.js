const nodemailer = require('nodemailer')
const appAuth = require('../auth/appAuth')

const sendMail  = (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: appAuth.mail.user,
            pass: appAuth.mail.password,
        }
    })

    const mailOptions = {
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