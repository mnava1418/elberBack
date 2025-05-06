import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({path: resolve(__dirname, '../../.env')})

import paths from './paths'
import * as auth from './auth'

const config = {paths, auth}

export default config