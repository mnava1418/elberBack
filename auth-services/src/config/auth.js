const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '../../.env')})

module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET
    },
    firebase: {
        cred: process.env.GOOGLE_APPLICATION_CREDENTIALS
    }
}
