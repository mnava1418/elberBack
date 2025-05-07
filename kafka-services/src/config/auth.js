const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '../../.env')})

module.exports = {
    kafka: {
        clientId: 'dot-kafka',
        groupId: 'dot-group',
        brokers: [process.env.KAFKA_HOST],
        topics: {
            email: 'email-events'
        }
    }
}