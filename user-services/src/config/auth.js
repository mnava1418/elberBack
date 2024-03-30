const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    fireBase: {
        credential: process.env.FIREBASE_CERTIFICATE,
        dbURL: process.env.FIREBASE_DB_URL
    },

    kafka: {
        clientId: 'dot-kafka',
        brokers: [process.env.KAFKA_HOST],
        topics: {
            email: 'email-events'
        }
    }
}