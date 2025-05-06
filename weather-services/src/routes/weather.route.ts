import { Router } from "express";
import * as weatherController from '../controllers/weather.controller'

const router = Router()

router.get('/current', weatherController.getCurrentWeather)

export default router