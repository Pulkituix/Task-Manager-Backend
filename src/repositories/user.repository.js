import db from'../models/index.js';

export const findUserByEmail = async(email) => {
    return await db.User.findOne({where : {email}});
}

export const createUser = async(data) => {
    return await db.User.create(data);
}

export const updateUserVerification = async(email) => {
    return await db.User.update({isVerified : true}, {where : {email}});
}

export const updatePassword = async(email, hashedPassword) => {
    return await db.User.update({password : hashedPassword}, {where : {email}});
}