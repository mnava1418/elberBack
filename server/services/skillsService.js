const skillBean = require('../beans/skillBean')

const getSkills = async () => {
    const skills = await skillBean.getSkills()
    let result = {
        status: 200,
        json: {skills: skills}
    }

    return result
}

module.exports = {
    getSkills
}