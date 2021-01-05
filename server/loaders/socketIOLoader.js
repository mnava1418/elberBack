var io = require('socket.io')
const elberService = require('../services/elberService')
const utilityService = require('../services/utilityService')

module.exports = (server) => {
    console.log('Initializing socketIO...')
    io = io(server)
    
    io.on('connection', (socket) => {
        console.log(`a user connected to socket: ${socket.id}`);
      
        socket.on('disconnect', () => {
            console.log(`a user disconnected from socket: ${socket.id}`)
        })
      
        socket.on('elber request', async (message) =>{
            console.log(`${socket.id} is sending a request to elber`)

            let response = "Maldito intruso! No tienes permiso para estar haciendo esto."
            let messageArr = message.split('|')
            let jwt = messageArr[0]
            let user = utilityService.validateJWT(jwt)

            if(messageArr.length >= 2 && user != undefined){
                message = messageArr[1]
                response = await elberService().callIntent(message)
            }

            io.to(`${socket.id}`).emit('elber response', response);
        } )
    });
}