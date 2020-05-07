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

const updateList = async(existingList) => {
    const list = await listDao.updateList(existingList)
    return list
}

const deleteList = async(name, email) => {
    await listDao.deleteList(name, email)
}

module.exports = {
    createList, 
    getListByName,
    getLists,
    updateList,
    deleteList
}