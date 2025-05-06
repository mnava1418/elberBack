import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({path: resolve(__dirname, '../../.env')})

export const firebase = {
    cred: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    db: process.env.FIREBASE_DB
}

export const aws = {
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY
}
