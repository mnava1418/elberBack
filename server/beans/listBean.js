const listDao = require('../data/listDao')

const createList = async(list) => {
    const newList = await listDao.createList(list)
    return newList
}

const getListByName = async(name, email) => {
    const list = await listDao.getListByName(name, email)
    return list
}

const getLists = async(email) => {
    const lists = await listDao.getLists(email)
    return lists
}

module.exports = {
    createList, 
    getListByName,
    getLists
}