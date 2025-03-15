import admin from 'firebase-admin'
import { firebase } from '../config/auth'

const initApp = () => {
    admin.initializeApp({
        credential: admin.credential.cert(firebase.cred as string),
        databaseURL: firebase.db
    })

    console.info('Firebase Ready!')
}

export default initApp