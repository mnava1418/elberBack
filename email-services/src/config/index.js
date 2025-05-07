const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '../../.env')})

module.exports = {
    email: {
        from: 'martin@namart.tech'
    },

    urls: {
        authService: process.env.BACK_URL
    }
}