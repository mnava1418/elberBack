import dotenv from 'dotenv'
dotenv.config()

export const gateway = {
    secret: process.env.GATEWAY_SECRET
}