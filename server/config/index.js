module.exports = {
    mail: {
        messages: {
            welcome:{
                saludo: '<h3>Hola ',
                mensaje: '!</h3<br><h5>Gracias por registrarte, seremos grandes amigos :) <br><br> Tu código de activación es: ',
                footer: '<br><br>Atte. Elber Gun</h5>',
                subject: 'Bienvenido a Elber!'
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
            }
        }
    },
    userStatus: {
        isNew: '1'
    }
}