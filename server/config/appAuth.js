const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    app: {
        iosName: process.env.IOS_APP_NAME,
        jwtPwd: process.env.JWT_PWD
    },
    mongoDB: {
        development: {
            dbURL: process.env.MONGO_DEV,
        }
    },
    mail: {
        user: process.env.MAIL_FROM,
        password: process.env.MAIL_PASSWORD,
    }
}