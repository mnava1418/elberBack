const fs = require('fs')
const nodemailer = require('nodemailer')
const { from } = require('../config').email

const createTransporter = () => {
    const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS))
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: from,
            serviceClient: credentials['client_id'],
            privateKey: credentials['private_key']
        }        
    })

    return transporter
}

const sendEmail = async (to, subject, html ) => {
    const mailOptions = { from, subject, html }

    to = to.split(',')

    if(to.length > 1) {
        mailOptions.bcc = to
    } else {
        mailOptions.to = to[0]
    }
    
    const transporter = createTransporter()

    transporter.sendMail(mailOptions)
    .then(info => {
        console.info(`Email sent: ${info.messageId}`)        
        transporter.close()
    })
    .catch(error => {
        console.error(`Error: ${error}`)  
        transporter.close()      
    })
}

module.exports = {
    sendEmail
}