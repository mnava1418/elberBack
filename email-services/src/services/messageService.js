const {topics, consumeMessagesFromTopic} = require('kafka-services')
const userService = require('./userService')

const processMessage = (key, message) => {
    try {
        console.info('Kafka Message', key, message)

        switch (key) {
            case 'request_access':
                userService.requestRegistrationCode(message)
                break;
            case 'response_access':
                userService.responseRegistrationCode(message)
                break;
            default:
                console.info('Unable to identify message type')
                break;
        }    
    } catch (error) {
        console.error(error)
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