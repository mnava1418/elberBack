const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET
    },
    firebase: {
        cred: process.env.GOOGLE_APPLICATION_CREDENTIALS
    }
}
