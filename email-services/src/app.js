const messageServices = require('./services/messageService')

const startServer = () => {
  messageServices.consumeMessages()
  .catch(error => {
    console.error
    throw new Error(error.message)
  })
}

startServer()