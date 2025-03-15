import { Server } from "socket.io"
import http from 'http';
import admin from 'firebase-admin'

const socketIO = (httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.use(async (socket, next) => {
        try {
            if (socket.handshake.query && socket.handshake.query.token){
                await admin.auth().verifyIdToken(socket.handshake.query.token as string)
                next()
            } else {
                throw(new Error('Authentication error.'))
            }
        } catch (error) {
            socket.disconnect()
            next(new Error('Authentication error.'))
        }
    })

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id)
    })

    console.info('Socket Ready!')
}

export default socketIO