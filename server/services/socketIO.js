var io = require('socket.io')

module.exports = (server) => {
    io = io(server)
    
    //Init  socket.io
    io.on('connection', (socket) => {
    console.log(`a user connected to socket: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`a user disconnected from: ${socket.id}`)
    })

    socket.on('elber request', (message) =>{
        console.log(message)
        io.to(`${socket.id}`).emit('elber response', 'Que pedo cabron!');
    } )
    });
}