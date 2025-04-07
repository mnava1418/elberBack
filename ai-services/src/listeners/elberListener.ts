
import { DefaultEventsMap, Socket } from "socket.io";
import generateResponse from "../services/nlpService";

const elberListener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socket.on('message-to-elber', (message) => {
        generateResponse(message)
        .then(nlpResponse => {
            console.log(nlpResponse.text)
        })
    })
}

export default elberListener