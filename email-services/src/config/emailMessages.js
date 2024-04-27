const urls = require('../config').urls

const requestRegistrationCodeMessage = (messageInfo) => {
    const {sender, acceptToken, rejectToken} = messageInfo
    const responseUrl = `${urls.authService}/auth/users/responseCode?token=`

    const result = `
        <p>
            Hola Martin, 
            <br />
            <br />
            El usuario ${sender} ha solicitado un código de registro:
            <br />
            <br />
            <a href='${responseUrl}${acceptToken}'>Aceptar</a>
            <br />
            <a href='${responseUrl}${rejectToken}'>Rechazar</a>
        </p>
    `

    return result
}

module.exports = {
    requestRegistrationCodeMessage
}