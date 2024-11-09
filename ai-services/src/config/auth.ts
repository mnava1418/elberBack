import dotenv from 'dotenv'
dotenv.config()

export const  firebase = {
    cred: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    db: process.env.FIREBASE_DB
}