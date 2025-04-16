const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    email: {
        from: 'martin@namart.tech'
    },

    urls: {
        authService: process.env.BACK_URL
    }
}