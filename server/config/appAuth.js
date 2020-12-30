const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    app: {
        iosName: process.env.IOS_APP_NAME,
        jwtPwd: process.env.JWT_PWD,
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }
}