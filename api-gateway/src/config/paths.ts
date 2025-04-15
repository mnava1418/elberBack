import dotenv from 'dotenv'
dotenv.config()

const paths = {
    ai_services: `${process.env.BACKEND_URL}:4042`
}

export default paths