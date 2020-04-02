const UserModel = require('../models/mongoose/userModel');
const FBUserModel = require('../models/mongoose/faceBookUserModel');

const getUser = async (email) => {
    const user = await UserModel.findOne({email:email});
    return user;
}

const getFBUser = async (email) => {
    const user = await FBUserModel.findOne({email:email});
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

const createFBUser = async (currentUser) => {
    let newUser = new FBUserModel(currentUser.getFBUserAsObject());

    newUser = await newUser.save().catch((err) => {
        return {errMessage: err.message};
    })
    
    return newUser
}

const updateUser = async (existingUser) => {
    await existingUser.save().catch((err) => {
        return {errMessage: err.message};
    })
    return existingUser
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    getFBUser,
    createFBUser,
}
