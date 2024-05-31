const admin = require('firebase-admin')
const {firebase} = require('../config/auth')

const initApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert(firebase.cred)
    })
}

module.exports = initApp