const userService = require('../services/userService')

const requestRegistrationCode = async(req, res) => {
    const {email} = req.body

    await userService.requestRegistrationCode(email)
    .then(() => {
        res.status(200).json({message: `Hemos recibido tu solicitud. Si esta es aprobada, recibirás un correo electrónico en ${email} con las instrucciones necesarias para continuar con tu registro.`})
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
}

const responseRegistrationCode = async(req, res) => {
    const tokenPayload = req.tokenPayload

    await userService.responseRegistrationCode(tokenPayload)
    .then(() => {
        res.status(200).json({message: `Hemos enviado tu respuesta a ${tokenPayload.sender}.`})
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
}

module.exports = {
    requestRegistrationCode,
    responseRegistrationCode
}