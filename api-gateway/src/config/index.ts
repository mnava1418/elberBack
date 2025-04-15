import dotenv from 'dotenv'
dotenv.config()

import paths from './paths'
import * as auth from './auth'

const config = {paths, auth}

export default config