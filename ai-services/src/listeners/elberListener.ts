
import { DefaultEventsMap, Socket } from "socket.io";
import * as nlpServices from "../services/nlpService";

const elberListener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socket.on('message-to-elber', (uid, message) => {
        nlpServices.generateResponse(message)
        .then(nlpResponse => {
            nlpServices.saveMessages(uid, message, nlpResponse.text)
            socket.emit('response-from-elber', nlpResponse.text)
        })
    })
}

export default elberListener