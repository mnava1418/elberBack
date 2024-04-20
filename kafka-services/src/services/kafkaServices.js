const { Kafka, Partitioners } = require('kafkajs')
const auth = require('../config/auth').kafka

const getProducer = () => {
    const myKafka = new Kafka({
        clientId: auth.clientId,
        brokers: auth.brokers,
    })

    const producer = myKafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner
    })

    return producer
}

const sendMessage = async(topic, key, message) => {
    const producer = getProducer()
    
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