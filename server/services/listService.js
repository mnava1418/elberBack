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

module.exports = {
    createList,
    getLists
}