import { IntentName } from "../interfaces/nlpInterface"
import * as dialogflow from './dialogFlowService'

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?!,;.]/g, '')
        .trim()
}

const identifyIntentWithDialogFlow = async(normalizedText: string): Promise<IntentName> => {
    const intent = await dialogflow.detectIntent(normalizedText, 'es')
    .catch(() => {
        const defaultIntent: IntentName = 'elber_fallback' 
        return defaultIntent
    })

    
    
    return intent
}

export const generateResponse = async (text: string) => {
    const normalizedText = normalizeText(text)
    const intent = await identifyIntentWithDialogFlow(normalizedText)
    return(intent)
}



/*const intereact = async () => {
    while (true) {
        let pregunta = readlineSync.question('Martin: ')
        await nlpService.generateResponse(pregunta)
        .then(intent => {
            console.log('Elber:', intent)
        }) 
    }
}*/