const UserModel = require('../models/mongoose/userModel');

const getUser = async (email) => {
    const user = await UserModel.findOne({email:email});
    return user;
}

const createUser = async (currentUser) => {
    let newUser = new UserModel(currentUser.getUserAsObject());
    
    newUser = await newUser.save().catch((err) => {
        return {errMessage: err.message};
    })
    newUser.password = undefined
    return newUser
}

module.exports = {
    getUser,
    createUser
}
