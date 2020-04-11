module.exports = {
    mail: {
        messages: {
            welcome:{
                saludo: '<h3>Hola ',
                mensaje: '!</h3<br><h5>Gracias por registrarte, seremos grandes amigos :) <br><br> Tu código de activación es: ',
                footer: '<br><br>Atte. Elber Drops</h5>',
                subject: 'Bienvenido a Elber!'
            },
            recoverPwd:{
                saludo: '<h3>Hola!</h3><br>',
                mensaje: '<h5>Tu password ha sido restablecido. Si tu no lo solicitaste, cámbialo inmediatamente desde tu celular que ya te chingaron.<br><br>Tu nuevo password es: ',
                footer: '<br><br>Para mayor seguridad, cambia tu password en cuanto inicies sesión.<br><br>Atte. Elber Drops</h5>',
                subject: 'Restablecer Password!'
            }
        }
    },
    errorMessages: {
        userService: {
            accessDenied: {
                code: 401,
                errMessage: 'Acceso denegado'
            },
            invalidEmail: {
                code: 500,
                errMessage: 'El email no es válido'
            },
            invalidUser: {
                code: 401,
                errMessage: 'Email/Password incorrecto'
            }
        }
    }
}