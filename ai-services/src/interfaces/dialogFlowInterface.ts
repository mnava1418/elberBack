import { IntentName } from './nlpInterface'

export interface DialogFlowResponse {
    responseText: string,
    intentName: IntentName,
}
