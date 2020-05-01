const listBean = require('../beans/listBean')

const createList = async(list, email) => {
    let result = {}
    list.email = email
    const existingList = await listBean.getListByName(list.name, list.email)

    if(existingList) {
        result.status = 500
        result.json = {errMessage: `La lista ${list.name} ya existe`}
    } else {
        const newList = await listBean.createList(list)
        let status = 200

        if(newList.errMessage ) {
            status = 500
        } 

        result.status = status
        result.json = {list: newList.name}
    }

    return result
}

module.exports = {
    createList
}