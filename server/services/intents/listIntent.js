const listService = require('../listService')
const processParameters = require('./processParameters')

const getLists = async(email, response, fulfillmentText) => {
    const result = await listService.getLists(email)
    const currentLists = result.json.lists
    
    if(currentLists.length > 0 ) {
        for(let i = 0; i < currentLists.length; i++){
            fulfillmentText = `${fulfillmentText} ${currentLists[i].name},`
        }
        fulfillmentText = fulfillmentText.substr(0, fulfillmentText.length - 1)
    } else {
        fulfillmentText = 'Aún no tienes listas pero puedo ayudarte a crear una. Quieres crear una lista?'
        response.nextAction = "Crea una lista"
    }

    response.elberResponse = fulfillmentText
    return response
}

const createList = async(listName, listItem, email, fulfillmentText) => {
    if(listName.trim() == "") {
        return fulfillmentText
    } else {
        const list = {name: listName, items: []}

        if(listItem.trim() != "") {
            list.items.push(listItem)
        }
        const result = await listService.createList(list, email)

        if(result.json.errMessage != undefined){
            fulfillmentText = result.json.errMessage
        }

        return fulfillmentText
    }
}

const deleteList = async(listName, email, fulfillmentText) => {
    if(listName.trim() != "") {
        await listService.deleteList(listName, email)
    }
    
    return fulfillmentText
}

const addItem = async(listName, listItem, email, response, fulfillmentText) => {
    if(listName.trim() != "" && listItem.trim() != "") {
        let result = await listService.getListbyName(listName, email)
        existingList = result.json.list

        if(existingList == undefined){
            fulfillmentText = `La lista ${listName} no existe. Quieres crearla?`
            response.nextAction = `Crea una lista de ${listName} y agrega ${listItem}`
        } else{
            let currentItems = existingList.items
            currentItems.push(listItem)
            await listService.updateListItems(listName, email, currentItems)
            fulfillmentText = `Listo! He agregado ${listItem} en tu lista de ${listName}`
        }
    }

    response.elberResponse = fulfillmentText
    return response
}

const removeItem = async(listName, listItem, email, response, fulfillmentText) => {
    if(listName.trim() != "" && listItem.trim() != "") {
        let result = await listService.getListbyName(listName, email)
        existingList = result.json.list
        if(existingList == undefined){
            fulfillmentText = `La lista ${listName} no existe. Quieres crearla?`
            response.nextAction = `Crea una lista de ${listName}`
        } else{
            let currentItems = existingList.items
            let tempItem = listItem.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let newItems = []
            
            for(let i = 0; i < currentItems.length; i++){
                let element = currentItems[i]
                let tempElement = element.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if(tempElement.trim().toLowerCase() != tempItem.trim().toLowerCase()){
                    newItems.push(element)
                }
            }
            
            await listService.updateListItems(listName, email, newItems)
            fulfillmentText = `Listo! He eliminado ${listItem} de tu lista ${listName}`
        }
    }

    response.elberResponse = fulfillmentText
    return response
}

const getListContent = async(listName, email, response, fulfillmentText) => {
    if(listName.trim() != "") {
        const result = await listService.getListbyName(listName, email)
        const currentList = result.json.list

        if(currentList != undefined) {
            const currentItems = currentList.items
            if(currentItems.length > 0) {
                fulfillmentText = `Tu lista ${listName} contiene: ${currentItems.toString()}`
            } else {
                fulfillmentText = `Tu lista ${listName} está vacía. Quieres que agregue algo?`
                response.nextAction = `agrega a lista ${listName}`
            }

        } else{
            fulfillmentText = `${fulfillmentText}. Quieres crearla?`
            response.nextAction = `Crea una lista de ${listName}`
        }
    }

    response.elberResponse = fulfillmentText
    return response
}

const processIntent = async(intentsConfig, intent, parameters, response, email, fulfillmentText) => {
    let listName = ""
    let listItems = ""

    switch (intent) {
        case intentsConfig.lists.getLists :
            response = await getLists(email, response, fulfillmentText)
            break;
        case intentsConfig.lists.createList :
            listName = await processParameters.getListName(parameters)
            listItems = await processParameters.getListItem(parameters)
            response.elberResponse = await createList(listName, listItems, email, fulfillmentText)
            break;
        case intentsConfig.lists.deleteList :
            listName = await processParameters.getListName(parameters)
            response.elberResponse = await deleteList(listName, email, fulfillmentText)
            break;
        case intentsConfig.lists.addItems :
            listName = await processParameters.getListName(parameters)
            listItems = await processParameters.getListItem(parameters)
            response = await addItem(listName, listItems, email, response, fulfillmentText)
            break;
        case intentsConfig.lists.listContent :
            listName = await processParameters.getListName(parameters)
            response = await getListContent(listName, email, response, fulfillmentText)
            break;
        case intentsConfig.lists.removeItem :
            listName = await processParameters.getListName(parameters)
            listItems = await processParameters.getListItem(parameters)
            response = await removeItem(listName, listItems, email, response, fulfillmentText)
        default:
            response = response
            break;
    }

    return response
}

module.exports = {
    processIntent
}