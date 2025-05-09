import fs from 'fs'
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuid } from 'uuid';
import { firebase as dialogFlow } from '../config/auth'
import { IntentName } from '../interfaces/nlpInterface';
import { DialogFlowResponse } from '../interfaces/dialogFlowInterface';

const credPath = dialogFlow.cred ? dialogFlow.cred : ''
const credentials = JSON.parse(fs.readFileSync(credPath as string, 'utf-8'))
const sessionClient = new SessionsClient();

export const detectIntent =  async  (query: string, languageCode: string, sessionId: string = uuid()): Promise<DialogFlowResponse> => {
    try {
        const projectId = credentials['project_id']
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode,
                },
            },
        };

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        const responseText = result?.fulfillmentText ? result.fulfillmentText : ''
        const intentName: IntentName = result?.intent?.displayName ? result.intent.displayName as IntentName : IntentName.ELBER_GENERAL_FALLBACK
        return {intentName, responseText}
    } catch (error) {
        console.error(error)
        throw(new Error('Unable to detect intent.'))
    }
}
