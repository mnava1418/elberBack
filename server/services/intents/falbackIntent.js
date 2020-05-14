
const processIntent = (intentsConfig, response, fulfillmentText, query) => {
    response.elberResponse = `${fulfillmentText} Quieres que lo busque en internet?`
    response.parameters = {searchText: query.trim()}
    response.localFunction = intentsConfig.localFunctions.internetSearch
    response.confirmNextAction = true
    return response
}

module.exports = {
    processIntent
}


