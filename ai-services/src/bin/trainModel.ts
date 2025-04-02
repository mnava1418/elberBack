import * as nlpService from '../services/nlpService'
import initApp from '../loaders/firebaseLoader'
import NLPModel from '../models/NLPModel'
import { exit } from 'process'

const traindModel = async() => {
    try {
        initApp()
        const trainData = await nlpService.getTrainData()
        NLPModel.getInstance().setTrainData(trainData)
        await nlpService.trainModel()
    } catch (error) {
        throw(new Error('Unable to train model'))
    }
}

traindModel()
.then(() => {
    console.info('Model has been trained!')
    exit()
})
.catch(error => {
    console.error(error)
})