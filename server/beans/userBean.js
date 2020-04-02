const userDao = require('../data/userDao')

const getUser = async (email) => {
    const user = await userDao.getUser(email);
    return user;
}

const getFBUser = async (email) => {
    const user = await userDao.getFBUser(email);
    return user;
}

const createUser = async (currentUser) => {
    const newUser = await userDao.createUser(currentUser);
    return newUser;
}

const createFBUser = async (currentUser) => {
    const newUser = await userDao.createFBUser(currentUser);
    return newUser
}

const updateUser = async (existingUser) => {
    existingUser = await userDao.updateUser(existingUser);
    return existingUser;
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    getFBUser,
    createFBUser
}