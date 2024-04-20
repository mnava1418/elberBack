const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    kafka: {
        clientId: 'dot-kafka',
        brokers: [process.env.KAFKA_HOST],
        topics: {
            email: 'email-events'
        }
    }
}