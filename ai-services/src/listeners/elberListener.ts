
import { DefaultEventsMap, Socket } from "socket.io";
import * as nlpServices from "../services/nlpService";

const elberListener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socket.on('message-to-elber', (uid: string, message: string, type: 'voice' | 'text') => {
        nlpServices.generateResponse(message)
        .then(nlpResponse => {
            nlpServices.saveMessages(uid, message, nlpResponse.text)
            if(type === 'text') {
                socket.emit('text-response-elber', nlpResponse.text)  
            } else {
                nlpServices.textToAudio(socket, nlpResponse.text)
            }
        })
    })
}

export default elberListener