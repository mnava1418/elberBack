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

module.exports = {
    createList,
    getListByName
}