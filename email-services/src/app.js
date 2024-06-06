const messageServices = require('./services/messageService')

const startServer = () => {
  messageServices.consumeMessages()
  .catch(error => {    
    throw new Error(error.message)
  })
}

startServer()