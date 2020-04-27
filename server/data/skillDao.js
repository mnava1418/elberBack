const SkillModel = require('../models/mongoose/skillModel')

const getSkills = async() => {
    const skills = await SkillModel.find({}).sort({name: 1})
    return skills
}

module.exports = {
    getSkills
}