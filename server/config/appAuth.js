const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    app: {
        iosName: process.env.IOS_APP_NAME,
        jwtPwd: process.env.JWT_PWD,
        yandexKey: process.env.YANDEX_API_KEY
    },
    mongoDB: {
        development: {
            dbURL: process.env.MONGO_DEV,
        },
        production: {
            dbURL: process.env.MONGO_PROD
        }
    },
    mail: {
        user: process.env.MAIL_FROM,
        password: process.env.MAIL_PASSWORD,
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }
}