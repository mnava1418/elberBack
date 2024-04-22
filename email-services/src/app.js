const emailService = require('./services/emailService')

const startServer = () => {
  emailService.consumeMessages()
  .catch(error => {
    console.error
    throw new Error(error.message)
  })
}

startServer()