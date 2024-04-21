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

const consumeMessagesFromTopic = async(topic, onMessage) => {
    const kafka = new Kafka({clientId: auth.clientId, brokers: auth.brokers})
    const consumer = kafka.consumer({groupId: auth.groupId})
    
    await consumer.connect()
    .catch(error => {
        console.error(error)
        throw new Error('Unable to connect to kafka')
    })

    await consumer.subscribe({topic, fromBeginning: false})
    .catch(error => {
        console.error(error)
        throw new Error(`Unable to subscribe to topic ${topic}`)
    })

    try {
        await consumer.run({
            eachMessage: ({ topic, partition, message}) => {
                onMessage(message.key.toString(), message.value.toString() )
            }
        })    
    } catch (error) {
        console.error(error)
        throw new Error('Unable to process message')
    }
}

module.exports = {
    sendMessage,
    consumeMessagesFromTopic
}