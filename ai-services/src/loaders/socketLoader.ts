import { Server } from "socket.io"
import http from 'http';
import socketSetListeners from "../controllers/socketController";
import { CustomHttpHeaders } from "common-services/src/interfaces/http.interface";
import { auth } from 'common-services'

const socketIO = (httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.use(async (socket, next) => {
        try {
            if (socket.handshake.headers && auth.validateGatewaySync(socket.handshake.headers as CustomHttpHeaders)){
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
        console.info('New client connected:', socket.id)
        socketSetListeners(socket)
    })

    console.info('Socket Ready!')
}

export default socketIO