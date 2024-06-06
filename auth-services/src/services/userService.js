const tokenService = require('./tokenService')
const {sendMessage, topics} = require('kafka-services')
const admin = require('firebase-admin')

const REQUEST_ACCEPT_ACTION = 'accept'
const REQUEST_REJECT_ACTION = 'reject'

const requestRegistrationCode = async(email) => {
    const payload = {sender: email}
    const acceptToken = tokenService.getAdminToken({...payload, action: REQUEST_ACCEPT_ACTION})
    const rejectToken = tokenService.getAdminToken({...payload, action: REQUEST_REJECT_ACTION})
    const encodedAcceptToken = encodeURIComponent(acceptToken)
    const encodedRejectToken = encodeURIComponent(rejectToken)

    await sendMessage(topics.email, 'request_access', JSON.stringify({sender: email, acceptToken: encodedAcceptToken, rejectToken: encodedRejectToken}))
    .catch(error => {
        throw new Error(error.message)
    })
}

const responseRegistrationCode = async (payload) => {
    const {sender, action} = payload
    let resgitrationToken = ''

    if(action === REQUEST_ACCEPT_ACTION) {
        resgitrationToken = tokenService.generateToken({email: sender}, {expiresIn: '24h'})
    }
    
    await sendMessage(topics.email, 'response_access', JSON.stringify({sender, action, token: resgitrationToken}))
    .catch(error => {
        throw new Error(error.message)
    })
}

const sendVerificationLink = async(email) => {
    try {
        const verificationLink = await admin.auth().generateEmailVerificationLink(email)    
        await sendMessage(topics.email, 'verify_account', JSON.stringify({email, verificationLink}))
    } catch (error) {
        throw new Error('Error al generar link de verificación.')
    }
}

const registerUser = async(email, password, name) => {
    await admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
        emailVerified: false
    })    
    .catch((error) => {
        let errorMessage = 'Error al registrar el usuario.'
        switch (error.code) {
            case 'auth/email-already-exists':
                errorMessage = 'El correo electrónico ya está registrado.'
                break;
            case 'auth/invalid-password':
                errorMessage = 'La contraseña es inválida. Debe tener al menos 6 caracteres.'
                break;
            case 'auth/invalid-email':
                errorMessage = 'El correo electrónico es inválido.'
                break;
            default:
                break;
        }

        throw new Error(errorMessage)
    })
}

module.exports = {
    requestRegistrationCode,
    responseRegistrationCode,
    registerUser,
    sendVerificationLink
}
