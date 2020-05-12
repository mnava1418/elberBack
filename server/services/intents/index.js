const intents = require('../../config/intents')
const processParameters = require('./processParameters')
const dateServices = require('../dateService')
const listIntents = require('./listIntent')

const getResponse = async(email, intent, parameters, fulfillmentText) => {
    let response = "No se que quieres"
    let location = ""
    let listName = ""
    let listItems = []

    try{
        switch (intent) {
        case intents.date.hora :
            location = await processParameters.getLocation(parameters)
            response = await dateServices.getTime(location, 'LT')
            break;
        case intents.date.fecha :
            location = await processParameters.getLocation(parameters)
            response = await dateServices.getTime(location, 'LLLL')
            break;
        case intents.lists.getLists :
            response = await listIntents.getLists(email, fulfillmentText)
            break;
        case intents.lists.createList :
            listName = await processParameters.getListName(parameters)
            response = await listIntents.createList(listName, email, fulfillmentText)
            break;
        case intents.lists.deleteList :
            listName = await processParameters.getListName(parameters)
            response = await listIntents.deleteList(listName, email, fulfillmentText)
            break;
        case intents.lists.addItems :
            listName = await processParameters.getListName(parameters)
            listItems = await processParameters.getListItem(parameters)
            response = await listIntents.addItem(listName, listItems, email, fulfillmentText)
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