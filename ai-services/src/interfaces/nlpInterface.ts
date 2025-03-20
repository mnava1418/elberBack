export type IntentName = 'elber.say_hi' | 'elber.fallback' | 'elber.name'

export type NLPIntent = {
    name: IntentName,
    trainingPhrases: Array<string>,
    keyWords: Array<string>,
    responses: Array<string>
}

export type TrainData = {
    phrase: string,
    intent: IntentName
}