var io = require('socket.io')

module.exports = (server) => {
    io = io(server)
    
    io.on('connection', (socket) => {
        console.log(`a user connected to socket: ${socket.id}`);
      
        socket.on('disconnect', () => {
            console.log(`a user disconnected from socket: ${socket.id}`)
        })
      
        socket.on('elber request', (message) =>{
            io.to(`${socket.id}`).emit('elber response', message);
        } )
    });
}