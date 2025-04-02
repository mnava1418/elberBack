export type IntentName = 'elber_say_hi' | 'elber_fallback' | 'elber_name'

export type NLPIntents = {
    keywordRules: KeywordRule[],
}

export type TrainData = {
    phrase: string,
    intent: IntentName
}

export type KeywordRule = {
    keywords: string[],
    intent: IntentName
}
