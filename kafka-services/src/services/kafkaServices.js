const { Kafka, Partitioners } = require('kafkajs')
const auth = require('../config/auth').kafka

const kafka = new Kafka({
    clientId: auth.clientId,
    brokers: auth.brokers,
})

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
})

const sendMessage = async(topic, key, message) => {
    await producer.connect()    
    .catch(error => {
        console.error(error)
        throw new Error(`Unable to connect to kafka`)
    })
    
    await producer.send({
        topic,
        messages: [{key, value: message}]
    })
    .catch(async(error) => {
        await producer.disconnect()
        console.error(error)
        throw new Error(`Unable to send message to topic: ${topic}`)
    })

    await producer.disconnect()
}

module.exports = {
    sendMessage
}