import { Request, Response} from 'express'

export const getCurrentWeather = (req: Request, res: Response) => {
    res.status(200).json({message: 'Getting current weather'})
}