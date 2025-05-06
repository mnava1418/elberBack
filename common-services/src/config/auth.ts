import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({path: resolve(__dirname, '../../.env')})

export const gateway = {
    secret: process.env.GATEWAY_SECRET
}