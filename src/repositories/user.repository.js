import db from'../models/index.js';

export async function findUserByEmail(email){
    return await db.User.findOne({where : {email}});
}

export async function createUser(data){
    return await db.User.create(data);
}

export async function updateUserVerification(email){
    return await db.User.update({isVerified : true}, {where : {email}});
}

export async function updatePassword(email, hashedPassword){
    return await db.User.update({password : hashedPassword}, {where : {email}});
}