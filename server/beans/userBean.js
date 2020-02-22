const userDao = require('../data/userDao')

const getUser = async (email) => {
    const user = await userDao.getUser(email);
    return user;
}

const createUser = async (currentUser) => {
    const newUser = await userDao.createUser(currentUser);
    return newUser;
}

module.exports = {
    getUser,
    createUser,
}