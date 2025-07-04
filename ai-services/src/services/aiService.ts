import { GeneralPayload, NLPActions, NLPResponse } from "../interfaces/nlpInterface"

const generateTextResponse = ({responseText, type}: {responseText: string, type: 'voice' | 'text'}): NLPResponse => {
    const payload: GeneralPayload = {text: responseText}
    const response: NLPResponse = {
        action: type == 'voice' ? NLPActions.PLAY_AUDIO : NLPActions.SHOW_TEXT,
        payload
    }
    
    return response
}

const generateVisionResponse = ({}): NLPResponse => {
    const response: NLPResponse = {
        action: NLPActions.OPEN_CAMERA,
        payload: {text: ''}
    }

    return response
}

const aiFunctionsMap = {
    generateTextResponse,
    generateVisionResponse
}

export default aiFunctionsMap