const kafka = require('./services/kafkaService')

const startServer = () => {
  kafka.consumeMessages()
  .catch(error => {
    console.log(error)
  })
}

startServer()