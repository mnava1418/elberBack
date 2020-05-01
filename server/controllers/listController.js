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

module.exports = {
    createList,
    getLists
}