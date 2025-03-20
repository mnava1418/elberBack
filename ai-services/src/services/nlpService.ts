import natural from 'natural'
import { IntentName } from "../interfaces/nlpInterface"
import * as intentsConfig from '../config/intents/intents'

const classifier = new natural.LogisticRegressionClassifier()

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?!,;.]/g, '')
        .trim()
}

const checkKeyWordIntent = (text: string): IntentName => {
    const keywordRulesMap = Object.entries(intentsConfig.keywordRules) as [IntentName, string[]][]

    for (const [intent, keywords] of keywordRulesMap) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return intent
        }
    }
    
    return 'elber.fallback'
}

const identifyIntentWithNatural = (text: string, threshold: number = 0.8): IntentName => {
    if (classifier.docs.length === 0) {        
        return 'elber.fallback'
    }

    try {
        const classifications = classifier.getClassifications(text)

        if (classifications.length === 0) {
            return 'elber.fallback'
        }

        const bestMatch = classifications[0]

        if (bestMatch.value < threshold) {
            return 'elber.fallback'
        }

        return bestMatch.label as IntentName
    } catch (error) {
        return 'elber.fallback'
    }
}

const getIntent = (text: string): IntentName => {
    let intent = checkKeyWordIntent(text)
    if (intent !== 'elber.fallback') {
        return intent
    }

    intent = identifyIntentWithNatural(text)
    if (intent !== 'elber.fallback') {
        return intent
    }

    return 'elber.fallback'
}

const getRandomIntentResponse = (responses: string[]) => {
    const randomIndex = Math.floor(Math.random() * responses.length)
    return responses[randomIndex]
}

export const generateResponse = (text: string) => {
    const normalizedText = normalizeText(text)
    const intent = getIntent(normalizedText)

    switch (intent) {
        case 'elber.say_hi':
        case 'elber.name':
            console.log(getRandomIntentResponse(intentsConfig.intentResponses[intent]))
            break
        default:
            console.log('No entendi')
            break
    }
}

export const trainModel = () => {
    return new Promise((resolve, reject) => {
        try {
            if (!intentsConfig.trainData || intentsConfig.trainData.length === 0) {
                throw new Error('No train data.')
            }

            intentsConfig.trainData.forEach(data => {
                const normalizedPhrase = normalizeText(data.phrase)
                classifier.addDocument(normalizedPhrase, data.intent)
            })

            classifier.train()            
            resolve('')
        } catch (error) {
            console.error(error)
            reject(new Error('Unable to train model.'))
        }
    })
}