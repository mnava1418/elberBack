const userDao = require('../data/userDao')

const getUser = async (email) => {
    const user = await userDao.getUser(email);
    return user;
}

module.exports = {
    getUser
}