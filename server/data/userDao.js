const UserModel = require('../models/mongoose/userModel');

const getUser = async (email) => {
    const user = await UserModel.findOne({email:email});
    return user;
}

module.exports = {
    getUser
}