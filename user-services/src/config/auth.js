const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    fireBase: {
        credential: process.env.FIREBASE_CERTIFICATE,
        dbURL: process.env.FIREBASE_DB_URL
    }
}