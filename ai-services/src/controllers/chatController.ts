import {Response} from 'express'
import * as chatService from '../services/chatService'
import { ChatResponse } from '../interfaces/chatInterface';
import { CustomHttpHeaders, AuthenticationRequest } from 'common-services/src/interfaces/http.interface'

export const getMessages = async (req: AuthenticationRequest, res: Response) => {
    try {
        let{lastKey} = req.query
        const headers = req.headers as CustomHttpHeaders
        const uid = headers['x-user-uid']

        if(!uid) {
            res.status(500).json({error: 'User UID not provided.'})
            return
        }
                
        await chatService.getMessages(uid, lastKey ? lastKey.toString() : null)
        .then((response:ChatResponse) => {
            res.status(200).json(response)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Error Server.'})
    }
}

export const deleteMessages = async(req: AuthenticationRequest, res: Response) => {
    try {
        const messageId = req.params.messageId
        const headers = req.headers as CustomHttpHeaders
        const uid = headers['x-user-uid']

        if(!uid) {
            res.status(500).json({error: 'User UID not provided.'})
            return
        }

        await chatService.deleteMessages(uid, messageId ? messageId.toString() : null)
        .then(() => {
            res.status(200).json({})
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Error Server.'})
    }
}

export const setIsFavorite = async (req: AuthenticationRequest, res: Response) => {
    try {
        const {messageId, isFavorite} = req.body
        const headers = req.headers as CustomHttpHeaders
        const uid = headers['x-user-uid']
        
        if(messageId !== undefined && isFavorite !== undefined && uid !== undefined) {
            await chatService.setIsFavorite(uid, messageId, isFavorite)
            .then(() => {
                res.status(200).json({})
            })
            .catch((error: Error) => {
                res.status(500).json({error: error.message})
            })
        } else {
            res.status(500).json({error: 'Unable to process your request. Missing data.'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Error Server.'})
    }
}