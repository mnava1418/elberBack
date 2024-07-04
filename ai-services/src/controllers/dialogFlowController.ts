import {Request, Response} from 'express'
import {queryDialogflow} from '../services/dialogFlowService'
import { DialogFlowResponse } from '../interfaces/dialogFlowInterface'

const sendMessage = async (req: Request, res: Response) => {
    const {query} = req.body

    if(query) {
        await queryDialogflow(query)
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
