const ListModel = require('../models/mongoose/listModel')

const createList = async(list) => {
    let newList = new ListModel(list)
    newList = await newList.save().catch((err) => {
        return {errMessage: err.message};
    })

    return newList
}

const getListByName = async(name, email) => {
    let list = await ListModel.findOne({name: name, email: email})
    return list
}

const getLists = async(email) => {
    const lists = await ListModel.find({email: email}).sort({updatedAt: -1})
    return lists
}

const updateList = async (existingList) => {
    await existingList.save().catch((err) => {
        return {errMessage: err.message};
    })
    return existingList
}

module.exports = {
    createList,
    getListByName,
    getLists,
    updateList
}