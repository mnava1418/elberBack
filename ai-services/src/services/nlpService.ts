import { ChatMessage } from "../interfaces/chatInterface"
import { IntentCategory, NLPResponse } from "../interfaces/nlpInterface"
import { saveChatMessages } from "./chatService"
import * as dialogflow from './dialogFlowService'

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?!,;.]/g, '')
        .trim()
}

export const generateResponse = async (text: string): Promise<NLPResponse> => {
    try {
        const normalizedText = normalizeText(text)
        const intentInfo =  await dialogflow.detectIntent(normalizedText, 'es')
        const intentCategory: IntentCategory = intentInfo.intentName.split('_')[1] as IntentCategory
        
        switch (intentCategory) {
            case 'general':
                return {text: intentInfo.responseText}
            default:
                throw new Error('Unknown category.')
        }
    } catch (error) {
        return{text: '¡Changos! Algo no jaló… fue culpa del becario imaginario, lo juro.'}
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