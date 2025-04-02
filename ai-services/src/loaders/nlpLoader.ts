import * as nlpService from '../services/nlpService'
import * as readlineSync from 'readline-sync';
import initApp from './firebaseLoader';
import NLPModel from '../models/NLPModel';

const loadNLP = async() => {
    try {
        await nlpService.loadModel()
        .then(() => {
            console.info('1. Model loaded.')
        })

        await nlpService.getIntentsData()
        .then(intentsData => {
            NLPModel.getInstance().setKeyWordRules(intentsData.keywordRules)
            console.info('2. Keywords loaded.')
        })
    } catch (error) {
        console.error(error)
    }
}

const intereact = async () => {
    while (true) {
        let pregunta = readlineSync.question('Martin: ')
        await nlpService.generateResponse(pregunta)
        .then(intent => {
            console.log('Elber:', intent)
        }) 
    }
}

const localInteraction = () => {
    initApp()
    loadNLP()
    .then(() => {
        intereact()
    })
}

//localInteraction()

export default loadNLP

