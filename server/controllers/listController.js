const listService = require('../services/listService')

const createList = async(req, res) => {
    const email = req.user.email
    const result = await listService.createList(req.body, email)
    res.status(result.status).json(result.json);
}

const getLists = async(req, res) => {
    const email = req.user.email
    const result = await listService.getLists(email)
    res.status(result.status).json(result.json);
}

const updateListItems = async(req, res) => {
    const email = req.user.email
    const name = req.body.name
    let items = []

    if(req.body.items.trim() != "") {
        items = req.body.items.split(',')
    }
    
    const result = await listService.updateListItems(name, email, items)
    res.status(result.status).json(result.json);
}

const deleteList = async(req, res) => {
    const email = req.user.email
    const name = req.body.name
    const result = await listService.deleteList(name, email)
    res.status(result.status).json(result.json);
}

module.exports = {
    createList,
    getLists,
    updateListItems,
    deleteList
}