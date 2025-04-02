import fs from 'fs'
import path from 'path'
import natural from 'natural'
import { IntentName, KeywordRule, NLPIntents, TrainData } from "../interfaces/nlpInterface"
import admin from 'firebase-admin'
import NLPModel from "../models/NLPModel"
import * as dialogflow from './dialogFlowService'

const getModelPath = () => {
    const dir = path.join(__dirname, '../config/model');

    if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    }
    return path.join(dir, 'model.json' )
}

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?!,;.]/g, '')
        .trim()
}

const checkKeyWordIntent = (normalizedText: string): IntentName => {
    const keywordRules = NLPModel.getInstance().getKeyWordRules()
    
    for (let i = 0; i < keywordRules.length; i++) {
        const rule = keywordRules[i]
        if (rule.keywords.some(keyword => normalizedText.includes(keyword))) {
            return rule.intent
        }
    }
    
    return 'elber_fallback'
}

const identifyIntentWithDialogFlow = async(normalizedText: string): Promise<IntentName> => {
    const intent = await dialogflow.detectIntent(normalizedText, 'es')
    .catch(() => {
        const defaultIntent: IntentName = 'elber_fallback' 
        return defaultIntent
    })

    if (intent !== 'elber_fallback') {
        await saveTrainingPhrase(intent, normalizedText)
        .catch((error: Error) => {
            console.error(error.message)
        })
    }
    
    return intent
}

const identifyIntentWithNatural = (normalizedText: string, threshold: number = 0.8): IntentName => {
    if (NLPModel.getInstance().getClassifier().docs.length === 0) {        
        return 'elber_fallback'
    }

    try {
        const classifications = NLPModel.getInstance().getClassifier().getClassifications(normalizedText)

        if (classifications.length === 0) {
            return 'elber_fallback'
        }

        const bestMatch = classifications[0]

        if (bestMatch.value < threshold) {
            return 'elber_fallback'
        }

        return bestMatch.label as IntentName
    } catch (error) {
        return 'elber_fallback'
    }
}

const getIntent = async(text: string): Promise<IntentName> => {
    const normalizedText = normalizeText(text)
    
    let intent = checkKeyWordIntent(normalizedText)
    if (intent !== 'elber_fallback') {
        return intent
    }

    intent = identifyIntentWithNatural(normalizedText)
    if (intent !== 'elber_fallback') {
        return intent
    }

    intent = await identifyIntentWithDialogFlow(normalizedText)
    return intent
}

const getRandomIntentResponse = (responses: string[]) => {
    const randomIndex = Math.floor(Math.random() * responses.length)
    return responses[randomIndex]
}

export const generateResponse = async (text: string) => {
    const intent = await getIntent(text)
    return(intent)
}

export const loadModel = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const modelPath = getModelPath()
        natural.LogisticRegressionClassifier.load(modelPath, null, (err, classifier) => {
            if(!err && classifier) {
                NLPModel.getInstance().setClassifier(classifier)
                resolve(true)
            } else {
                reject('Unable to load model')
            }
        })
    })
}

export const trainModel = async () => {
    try {
        if (NLPModel.getInstance().getTrainData().length === 0) {
            return
        }
    
        NLPModel.getInstance().getTrainData().forEach(data => {
            const normalizedPhrase = normalizeText(data.phrase)
            NLPModel.getInstance().getClassifier().addDocument(normalizedPhrase, data.intent)
        })
            
        NLPModel.getInstance().getClassifier().train()
        await saveModel()
    } catch (error) {
        throw(new Error('Unable to train model.'))
    }
}

const saveModel = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const modelPath = getModelPath()
        NLPModel.getInstance().getClassifier().save(modelPath, (err, classifier) => {
            if(!err) {
                resolve(true)
            } else {
                reject('Unable to save Model')
            }
        })
    })
}

export const getIntentsData = async(): Promise<NLPIntents> => {
    try {
        const nlpIntents: NLPIntents = {keywordRules: []}
        const keywordRules: KeywordRule[] = []
        
        const db = admin.database()
        const ref = db.ref('/intents')
        const snapshot = await ref.once('value')
        const data = snapshot.toJSON() as Record<string, Record<string, Record<number, string>>>

        if(data) {
            Object.keys(data).forEach((intent => {
                const keywordRule: KeywordRule = {
                    intent: intent as IntentName,
                    keywords: Object.values(data[intent].keywords)
                }

                keywordRules.push(keywordRule)
            }))

            nlpIntents.keywordRules = keywordRules
        }

        return nlpIntents
    } catch (error) {
        throw new Error('Unable to get intents data');
    }
}

export const getTrainData = async(): Promise<TrainData[]> => {
    try {
        const db = admin.database()
        const ref = db.ref('/intents')
        const snapshot = await ref.once('value')
        const data = snapshot.toJSON() as Record<string, Record<string, Record<number, string>>>

        if(!data) {
            return []
        }

        const trainData: TrainData[] = []

        Object.keys(data).forEach(intent => {
            const trainingPhrases: string[] = Object.values(data[intent].training)
            trainingPhrases.forEach(phrase => {
                trainData.push({intent: intent as IntentName, phrase})
            })
        })
        
        return trainData
    } catch (error) {
        throw(new Error('Unable to get train data'))
    }
}

const saveTrainingPhrase = async(intent: string, phrase: string) => {
    try {
        const db = admin.database()
        const ref = db.ref(`/intents/${intent}/training`)

        await ref.transaction(data => {
            if (!Array.isArray(data)) {
                data = []
            }

            if (!data.includes(phrase)) {
                data.push(phrase)
            }

            return data
        })
    } catch (error) {
        throw(new Error('Unable to save training phrase.'))
    }
}
