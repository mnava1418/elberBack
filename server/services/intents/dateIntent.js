const intents = require('../../config/intents')
const processParameters = require('./processParameters')
const dateServices = require('../dateService')

const processIntent = async(intent,parameters, response) => {
    const location = await processParameters.getLocation(parameters)
    let format =  'LT'

    if(intent == intents.date.fecha){
        format = 'LLLL'
    }

    response.elberResponse = await dateServices.getTime(location, format)

    return response
}

module.exports = {
    processIntent
}