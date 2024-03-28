const admin = require('firebase-admin')
const auth = require('../config/auth').fireBase

const init = () => {
    admin.initializeApp({
        credential: admin.credential.cert(auth.credential),
        databaseURL: auth.dbURL
    })

    console.info("Firebase initialized...")
}

module.exports = init