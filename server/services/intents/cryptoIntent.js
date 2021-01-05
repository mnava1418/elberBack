const processParameters = require('./processParameters')
const cryptoServices = require('../cryptoService')

const getCryptoInfo = async (crypto, from, to, response) => {
    const cryptoInfo = await cryptoServices.getCurrencyInfo(from, to)

    if(cryptoInfo.spot == undefined) {
        response.elberResponse = `No pude obtener el precio del ${crypto}`
    } else {
        response.elberResponse = response.elberResponse.replace('@crypto', crypto).replace('@price', cryptoInfo.spot)
        response.parameters = cryptoInfo
    }
    
    return response
}

const processIntent = async (intentsConfig, intent, response, parameters) => {
    const crypto = processParameters.getCustomParameter(parameters, 'crypto')

    if(crypto.trim() == '') {
        return response
    }

    switch (intent) {
        case intentsConfig.cryptos.info:
            response = await getCryptoInfo(crypto, intentsConfig.cryptos.tickerMapping[crypto], 'USD', response)
            break
        default:
            response = response
            break
    }

    return response
}

module.exports = {
    processIntent
}