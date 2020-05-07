const listBean = require('../beans/listBean')

const createList = async(list, email) => {
    let result = {}
    list.email = email
    list.listId = email+list.name
    const existingList = await listBean.getListByName(list.name, list.email)

    if(existingList) {
        result.status = 500
        result.json = {errMessage: `La lista ${list.name} ya existe`}
    } else {
        const newList = await listBean.createList(list)
        
        if(newList.errMessage ) {
            result.status = 500
            result.json = newList
        } else {
            result = await getLists(email)
        }
    }

    return result
}

const getLists = async(email) => {
    const lists = await listBean.getLists(email)
    let result = {
        status: 200,
        json: {lists: lists}
    }

    return result
}

const updateListItems = async(name, email, items) => {
    let result = {}
    let existingList = await listBean.getListByName(name, email)

    if(existingList){
        existingList.items = items
        existingList = await listBean.updateList(existingList)

        if(existingList.errMessage ) {
            result.status = 500
            result.json = existingList
        } else {
            result.status = 200
            result.json = {items: existingList.items}
        }
    } else {
        result.status = 500
        result.json = {errMessage: `La lista ${list.name} no existe`}
    }

    return result
}

const deleteList = async(name, email) => {
    await listBean.deleteList(name, email)
    let result = await getLists(email)
    return result
}

module.exports = {
    createList,
    getLists,
    updateListItems, 
    deleteList
}