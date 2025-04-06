//FORMAT: elber_category_intentName
export type IntentName = 'elber_general_fallback' | 'elber_general_name'
export type IntentCategory = 'general'

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

export type NLPResponse = {
    text: string
}