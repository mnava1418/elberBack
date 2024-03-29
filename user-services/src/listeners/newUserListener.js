const admin = require('firebase-admin')
const service = require('../services/newUsersService')

const newUsersListener = () => {
    const db = admin.database()
    const ref = db.ref('users')

    ref.on('child_added', (snapshot) => {
        if(snapshot.exists()) {
            const newUser = snapshot.toJSON()
            if(newUser.hasOwnProperty('isActive') && !newUser.isActive) {
                service.notifyNewUser(newUser)
            }
        }
    })
}

module.exports = newUsersListener