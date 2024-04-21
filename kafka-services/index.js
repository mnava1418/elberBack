const kafkaServices = require('./src/services/kafkaServices')
const kafkaInfo = require('./src/config/auth').kafka

module.exports = {
    topics: kafkaInfo.topics,
    sendMessage: kafkaServices.sendMessage,
    consumeMessagesFromTopic: kafkaServices.consumeMessagesFromTopic
}
