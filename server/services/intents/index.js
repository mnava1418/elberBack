const intents = require('../../config/intents')
const processParameters = require('./processParameters')
const dateServices = require('../dateService')

const getResponse = async(intent, parameters, fulfillmentText) => {
    let response = "No se que quieres"

    try{
        switch (intent) {
        case intents.hora :
            const location = await processParameters.getLocation(parameters)
            response = await dateServices.getTime(location, 'LT')
            break;
        default:
            response = fulfillmentText
            break;
        }
    } catch {
        response = "No se que quieres"
    }
    return response
}

module.exports = {
    getResponse
}