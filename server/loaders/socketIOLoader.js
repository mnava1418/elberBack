var io = require('socket.io')
const elberService = require('../services/elberService')

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
            let response = await elberService().callIntent(message)
            io.to(`${socket.id}`).emit('elber response', response);
        } )
    });
}