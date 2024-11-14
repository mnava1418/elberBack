import {Response} from 'express'
import { AuthenticationRequest } from "../interfaces/dialogFlowInterface";
import * as chatService from '../services/chatService'
import { ChatResponse } from '../interfaces/chatInterface';

export const getMessages = async (req: AuthenticationRequest, res: Response) => {
    let{lastKey} = req.query
    const user = req.user
    
    await chatService.getMessages(user!.uid, lastKey ? lastKey.toString() : null)
    .then((response:ChatResponse) => {
        res.status(200).json(response)
    })
    .catch((error: Error) => {
        res.status(500).json({error: error.message})
    })
}

export const deleteMessages = async(req: AuthenticationRequest, res: Response) => {
    const messageId = req.params.messageId
    const user = req.user

    await chatService.deleteMessages(user!.uid, messageId ? messageId.toString() : null)
    .then(() => {
        res.status(200).json({})
    })
    .catch((error: Error) => {
        res.status(500).json({error: error.message})
    })
}