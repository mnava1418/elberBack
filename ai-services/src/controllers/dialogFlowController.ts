import {Request, Response} from 'express'

const sendMessage = (req: Request, res: Response) => {
    res.status(200).json({message: 'Calling dialog flow'})
}

const dialogFlowController = {
    sendMessage
}

export default dialogFlowController