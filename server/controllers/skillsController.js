const skillsService = require('../services/skillsService')

const getSkills = async (req, res) => {
    const result = await skillsService.getSkills()
    res.status(result.status).json(result.json)
}

module.exports = {
    getSkills
}