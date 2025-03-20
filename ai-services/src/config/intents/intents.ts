import { IntentName, TrainData } from "../../interfaces/nlpInterface";
import welcomeIntent from "./welcomeIntent";
import nameIntent from "./nameIntent";

const welcomeTraingData: TrainData[] = welcomeIntent.trainingPhrases.map(phrase => {    
    return {phrase, intent: welcomeIntent.name}
})

const nameTrainingData: TrainData[] = nameIntent.trainingPhrases.map(phrase => {    
    return {phrase, intent: nameIntent.name}
})

export const trainData: TrainData[] = [
    ...welcomeTraingData,
    ...nameTrainingData
]

export const keywordRules: Record<IntentName, string[]> = {
    'elber.say_hi': welcomeIntent.keyWords,
    'elber.name': nameIntent.keyWords,
    'elber.fallback': []
}

export const intentResponses: Record<IntentName, string[]> = {
    'elber.say_hi': welcomeIntent.responses,
    'elber.name': nameIntent.responses,
    'elber.fallback': []
}