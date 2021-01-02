const intentsConfig = require('../../config/intents')
const dateIntent = require('./dateIntent')
const spotifyIntent = require('./spotifyIntent')
const fallbackIntent = require('./falbackIntent')
const cryptoIntent = require('./cryptoIntent')

const getResponse = async(intent, parameters, fulfillmentText, query) => {
    let response = {elberResponse: fulfillmentText, nextAction: "", localFunction: "", parameters:{}, confirmNextAction: false}
    const intentId = intent.split('.')[0]

    try{
        switch (intentId) {
        case intentsConfig.date.id :
            response = await dateIntent.processIntent(intent, parameters, response)
            break;
        case intentsConfig.cryptos.id :
            response = await cryptoIntent.processIntent(intentsConfig, intent, response, parameters)
            break
        case intentsConfig.spotify.id :
            response = await spotifyIntent.processIntent(intentsConfig, intent, response, parameters)
            break;
        case intentsConfig.fallback.id : 
            response = await fallbackIntent.processIntent(intentsConfig, response, fulfillmentText, query)
            break
        default:
            response.elberResponse = fulfillmentText
            break;
        }
    } catch(err) {
        console.log(err)
        response.elberResponse = "No se que quieres"
    }
    return response
}

module.exports = {
    getResponse
}