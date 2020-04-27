const skillDao = require('../data/skillDao')

const getSkills = async () => {
    const skills = await skillDao.getSkills()
    return skills
}

module.exports = {
    getSkills
}