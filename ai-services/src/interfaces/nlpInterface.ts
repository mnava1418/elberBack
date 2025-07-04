//FORMAT: elber_category_intentName
export enum IntentName {
    ELBER_GENERAL_FALLBACK = 'elber_general_fallback',
    ELBER_GENERAL_NAME = 'elber_general_name',
    ELBER_GENERAL_MOTIVATION = 'elber_general_motivation',
    ELBER_GENERAL_SKILLS = 'elber_general_skills',
    ELBER_VISION_MAIN = 'elber_vision_main'
}

export enum IntentCategory {
    GENERAL = 'general',
    VISION = 'vision'
}
    
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

export enum NLPActions {
    SHOW_TEXT = 'show_text',
    PLAY_AUDIO = 'play_audio',
    OPEN_CAMERA = 'open_camera',
}

export type GeneralPayload = {
    text: string
    errorKey?: 'responseError' | 'voiceError' | 'connectionError'
}

export type NLPResponse = {
    action: NLPActions,
    payload: GeneralPayload
}