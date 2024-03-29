const { Kafka, Partitioners } = require('kafkajs')
const auth = require('../config/auth').kafka

const kafka = new Kafka({
    clientId: auth.clientId,
    brokers: auth.brokers,
})

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
})

const sendMessage = async(key, message) => {
    let isConnected = await producer.connect()
    .then(() => true)
    .catch(error => {
        console.log(error)
        return false
    })

    if(isConnected) {
        await producer.send({
            topic: 'email-events',
            messages: [{key, value: message}]
        })
        .catch(error => {console.error(error)})

        await producer.disconnect()
    }
}

module.exports = {
    sendMessage
}