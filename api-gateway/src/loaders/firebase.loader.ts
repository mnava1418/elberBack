import admin from 'firebase-admin'
import config from '../config'

const { firebase } = config.auth

const initFireBase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(firebase.cred as string)
    })

    console.info('Firebase Ready')
}

export default initFireBase