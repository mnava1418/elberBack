import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'
import { Socket, DefaultEventsMap } from 'socket.io'
import { ChatMessage } from "../interfaces/chatInterface"
import { GeneralPayload, IntentCategory, IntentName, NLPActions, NLPResponse } from "../interfaces/nlpInterface"
import { saveChatMessages } from "./chatService"
import * as dialogflow from './dialogFlowService'
import { aws } from '../config/auth'
import mcpHandleRequest from './mcpService'
import { MCPAction } from '../interfaces/mcpInterface'

const pollyClient = new PollyClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: aws.access_key as string,
        secretAccessKey: aws.secret_key as string
    }
})

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?!,;.]/g, '')
        .trim()
}

export const generateResponse = async (text: string, type: 'voice' | 'text'): Promise<NLPResponse> => {
    try {
        const normalizedText = normalizeText(text)
        const intentInfo =  await dialogflow.detectIntent(normalizedText, 'es')
        const intentCategory: IntentCategory = intentInfo.intentName.split('_')[1] as IntentCategory

        let mcpAction: MCPAction
        
        switch (intentCategory) {
            case IntentCategory.GENERAL:
                mcpAction = {category: intentCategory, intent: IntentName.ELBER_GENERAL_FALLBACK, 
                    params: {responseText: intentInfo.responseText, type}
                }
                break;
            default:
                throw new Error('Unknown category.')
        }

        const mcpResponse = mcpHandleRequest(mcpAction)
        return mcpResponse
    } catch (error) {
        const payload: GeneralPayload = {text: '¡Changos! Algo no jaló… fue culpa del becario imaginario, lo juro.', errorKey: 'responseError'}
        const response: NLPResponse = {
            action: type == 'text' ? NLPActions.SHOW_TEXT : NLPActions.PLAY_AUDIO,
            payload
        }
        
        return response
    }
}

export const saveMessages = (uid: string, userText: string, elberText: string) => {
    const idMessage = Date.now()

    const userMessage: ChatMessage = {
        id: idMessage.toString(),
        isFavorite: false,
        sender: 'user',
        text: userText
    }

    const elberMessage: ChatMessage = {
        id: (idMessage + 1).toString(),
        isFavorite: false,
        sender: 'bot',
        text: elberText
    }

    saveChatMessages(uid, [userMessage, elberMessage])
    .catch(error => {
        console.error(error)
    })
}

export const textToAudio = async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, nlpResponse: NLPResponse) => {
    try {
        const payload: GeneralPayload = nlpResponse.payload
        const command = new SynthesizeSpeechCommand({
            Text: payload.text,
            TextType: 'text',
            OutputFormat: 'mp3',
            VoiceId: 'Andres',
            Engine: 'neural',
            LanguageCode: 'es-MX'
        })

        const result = await pollyClient.send(command)
        const { AudioStream } = result
  
        if (!AudioStream) {          
            throw new Error('AudioStream undefined')
        }
  
        const webStream = await AudioStream.transformToWebStream?.()
        if (!webStream) {          
            throw new Error('webStream undefined')
        }
  
        const reader = webStream.getReader?.()
        if (!reader) {          
            throw new Error('reader undefined')
        }  
        
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            socket.emit('audio-chunk-elber', value)
        }
    } catch (error) {
        console.error(error)
        throw new  Error('Unable to generate audio.')
    }
}
