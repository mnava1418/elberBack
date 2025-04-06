import { IntentCategory, NLPResponse } from "../interfaces/nlpInterface"
import * as dialogflow from './dialogFlowService'

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?!,;.]/g, '')
        .trim()
}

const generateResponse = async (text: string): Promise<NLPResponse> => {
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

export default generateResponse