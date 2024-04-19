const { Kafka } = require('kafkajs')
const auth = require('../config/auth').kafka

const consumeMessages = async() => {
    const kafka = new Kafka({clientId: auth.clientId, brokers: auth.brokers})
    const consumer = kafka.consumer({groupId: auth.groupId})
    
    await consumer.connect()
    await consumer.subscribe({ topic: auth.topics.email })

    await consumer.run({
        eachMessage: ({ topic, partition, message}) => {
            console.log('key', message.key.toString())
            console.log('message', message.value.toString())
        }
    })
}

module.exports = {
    consumeMessages
}