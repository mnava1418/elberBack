const admin = require('firebase-admin')
const auth = require('../config/auth').fireBase
const newUsersListener = require('../listeners/newUserListener')

const init = () => {
    admin.initializeApp({
        credential: admin.credential.cert(auth.credential),
        databaseURL: auth.dbURL
    })

    console.info("Firebase initialized...")

    //Start listeners
    newUsersListener()
}

module.exports = init