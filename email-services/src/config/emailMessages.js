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

const acceptRegistrationCodeMessage = (token, email) => {
    const result = `
        <p>
            Hola ${email}, 
            <br />
            <br />
            Tu solicitud de acceso ha sido aceptada. Aquí tienes tu código de acceso el cual sera válido por 24 horas. Sigue las instrucciones en la app. 
            <br />
            <br />
            ${token}
        </p>
    `

    return result
}

const rejectRegistrationCodeMessage = (email) => {
    const result = `
        <p>
            Hola ${email}, 
            <br />
            <br />
            Tu solicitud de acceso ha sido rechazada. Gracias por tu interes.            
        </p>
    `

    return result
}

const verifyAccountMessage = (email, link) => {
    const result = `
        <p>
            Hola ${email},
            <br />
            <br />
            Visita este vínculo para verificar tu dirección de correo electrónico.
            <br />
            <br />
            <a href='${link}'>${link}</a>
            <br />
            <br />
            Si no solicitaste la verificación de esta dirección, ignora este correo electrónico.
        </p>
    `

    return result
}

module.exports = {
    requestRegistrationCodeMessage,
    acceptRegistrationCodeMessage,
    rejectRegistrationCodeMessage,
    verifyAccountMessage
}