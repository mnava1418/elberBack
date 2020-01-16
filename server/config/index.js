module.exports = {
    mongoDB: {
        development : {
            dbURL: 'mongodb://localhost:37017/Elber',
        }
    },
    mail: {
        user: 'elbergun1418@gmail.com',
        password: 'etbzobdrhigddfik',
        messages: {
            welcome:{
                saludo: '<h3>Hola ',
                mensaje: '!</h3<br><h5>Gracias por registrarte, seremos grandes amigos :) <br><br> Tu código de activación es: ',
                footer: '<br><br>Atte. Elber Gun</h5>'
            }
        }
    }
}