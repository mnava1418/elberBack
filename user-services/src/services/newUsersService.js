const kafka = require('./kafkaService')

const notifyNewUser = (user) => {
    kafka.sendMessage('new_user', JSON.stringify(user))
    .catch(error => {
        console.error(error)
    })
}

module.exports = {
    notifyNewUser
}
