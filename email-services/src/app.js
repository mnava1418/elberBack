const emailService = require('./services/emailService')

const startServer = async () => {
  emailService.consumeMessages()
  .catch(error => {
    console.error
    throw new Error(error.message)
  })
}

startServer()