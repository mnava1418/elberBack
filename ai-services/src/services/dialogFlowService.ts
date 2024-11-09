import fs from 'fs'
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuid } from 'uuid';
import { firebase as dialogFlow } from '../config/auth'
import { DialogFlowResponse } from '../interfaces/dialogFlowInterface';
import { ChatMessage } from '../interfaces/chatInterface';
import { saveChatMessages } from './chatService';

const credPath = dialogFlow.cred ? dialogFlow.cred : ''
const credentials = JSON.parse(fs.readFileSync(credPath as string, 'utf-8'))
const sessionClient = new SessionsClient();

const detectIntent =  async  (sessionId: string, query: string, languageCode: string) => {
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
    return result;
}

export const queryDialogflow = async (userId: string, query: string, sessionId: string = uuid()): Promise<DialogFlowResponse> => {
    try {
        const response = await detectIntent(sessionId, query, 'es')
        const responseText = response?.fulfillmentText ? response.fulfillmentText : ''
        const intentName = response?.intent?.displayName ? response.intent.displayName : ''


        const userMessage:ChatMessage = {message: query, sender: 'user', isFavorite: false}
        const botMessage:ChatMessage = {message: responseText, sender: 'bot', isFavorite: false}
        const messages: ChatMessage[] = [userMessage, botMessage]

        saveChatMessages(userId, messages)
        .catch(error => {
            console.error((error as Error).message)
        })
        
        return {responseText, intentName}

    } catch (error) {
        throw new Error('Error al conectar con dialogFlow')
    }
}
