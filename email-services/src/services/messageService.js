const {topics, consumeMessagesFromTopic} = require('kafka-services')
const userService = require('./userService')

const processMessage = (key, message) => {
    console.info('Kafka Message', key, message)

    switch (key) {
        case 'request_access':
            userService.requestRegistrationCode(message)
            break;
    
        default:
            console.info('Unable to identify message type')
            break;
    }
}

const consumeMessages = async() => {
    await consumeMessagesFromTopic(topics.email, processMessage)
    .catch(error => {
        console.error(error)
        throw new Error(error.message)
    })
}

module.exports = {
    consumeMessages
}