const listDao = require('../data/listDao')

const createList = async(list) => {
    const newList = await listDao.createList(list)
    return newList
}

const getListByName = async(name, email) => {
    const list = await listDao.getListByName(name, email)
    return list
}

module.exports = {
    createList, 
    getListByName
}