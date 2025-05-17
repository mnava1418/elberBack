
import { DefaultEventsMap, Socket } from "socket.io";
import * as nlpServices from "../services/nlpService";
import { NLPActions } from "../interfaces/nlpInterface";

const elberListener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socket.on('message-to-elber', (uid: string, message: string, type: 'voice' | 'text') => {
        nlpServices.generateResponse(message, type)
        .then(async (nlpResponse) => {            
            nlpServices.saveMessages(uid, message, nlpResponse.payload.text)

            if(nlpResponse.action == NLPActions.PLAY_AUDIO && nlpResponse.payload.errorKey === undefined) {
                await nlpServices.textToAudio(socket, nlpResponse)
                .catch(() => {
                    nlpResponse.payload.errorKey = 'responseError'
                })
            }
            
            const responseString = JSON.stringify(nlpResponse)
            socket.emit('response-from-elber', responseString)  
        })
    })
}

export default elberListener