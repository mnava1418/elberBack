const listService = require('../listService')

const getLists = async(email, response) => {
    const result = await listService.getLists(email)
    const currentLists = result.json.lists

    if(currentLists.length > 0 ) {
        for(let i = 0; i < currentLists.length; i++){
            response = `${response} ${currentLists[i].name},`
        }
        response = response.substr(0, response.length - 1)
    } else {
        response = 'Aún no tienes listas pero puedo ayudarte a crear una.'
    }

    return response
}

const createList = async(listName, email, response) => {
    if(listName.trim() == "") {
        return response
    } else {
        const list = {name: listName, items: []}
        const result = await listService.createList(list, email)

        if(result.json.errMessage != undefined){
            response = result.json.errMessage
        }

        return response
    }
}

const deleteList = async(listName, email, response) => {
    if(listName.trim() != "") {
        await listService.deleteList(listName, email)
    }
    
    return response
}

const addItem = async(listName, listItem, email, response) => {
    if(listName.trim() != "" && listItem.trim() != "") {
        let result = await listService.getListbyName(listName, email)
        existingList = result.json.list

        if(existingList == undefined){
            response = `La lista ${listName} no existe`
        } else{
            let currentItems = existingList.items
            currentItems.push(listItem)
            await listService.updateListItems(listName, email, currentItems)
            response = `Listo! He agregado ${listItem} en tu lista de ${listName}`
        }
    }

    return response
}

module.exports = {
    getLists,
    createList,
    deleteList,
    addItem
}