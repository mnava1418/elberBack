
import { DefaultEventsMap, Socket } from "socket.io";
import generateResponse from "../services/nlpService";
import { ChatMessage } from "../interfaces/chatInterface";
import { saveChatMessages } from '../services/chatService'

const elberListener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socket.on('message-to-elber', (uid, message) => {
        generateResponse(message)
        .then(nlpResponse => {
            const idMessage = Date.now()

            const userMessage: ChatMessage = {
                id: idMessage.toString(),
                isFavorite: false,
                sender: 'user',
                text: message
            }

            const elberMessage: ChatMessage = {
                id: (idMessage + 1).toString(),
                isFavorite: false,
                sender: 'bot',
                text: nlpResponse.text
            }

            saveChatMessages(uid, [userMessage, elberMessage])
            .then(() => {
                socket.emit('response-from-elber', nlpResponse.text)
            })
            .catch(error => {
                console.error(error)
            })
        })
    })
}

export default elberListener