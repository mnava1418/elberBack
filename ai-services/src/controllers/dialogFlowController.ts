import {Response} from 'express'
import {queryDialogflow} from '../services/dialogFlowService'
import { AuthenticationRequest, DialogFlowResponse } from '../interfaces/dialogFlowInterface'

const sendMessage = async (req: AuthenticationRequest, res: Response) => {
    const {query} = req.body
    const user = req.user

    if(query) {
        await queryDialogflow(user!.uid, query)
        .then((response: DialogFlowResponse) => {
            const {intentName, responseText} = response
            res.status(200).json({intentName, responseText})
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })    
    } else {
        res.status(500).json({error: 'Query es un campo obligatorio'})
    }
}

const dialogFlowController = {
    sendMessage
}

export default dialogFlowController
