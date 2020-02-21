module.exports = {
    mail: {
        messages: {
            welcome:{
                saludo: '<h3>Hola ',
                mensaje: '!</h3<br><h5>Gracias por registrarte, seremos grandes amigos :) <br><br> Tu código de activación es: ',
                footer: '<br><br>Atte. Elber Gun</h5>'
            }
        }
    },
    errorMessages: {
        userService: {
            accessDenied: {
                code: 401,
                errMessage: 'Acceso denegado'
            },
        }
    },
    userStatus: {
        isNew: '1'
    }
}