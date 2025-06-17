import db from '../models/index.js';

export async function createOtp(data){
    return await db.Otp.create(data);
}

export async function otpByEmail(email,otp){
    return await db.Otp.findOne({
    where: { email, otp },
    order: [['createdAt', 'DESC']]
  });
};

export async function deleteOtp (email){
    return await db.Otp.destroy({where : {email}});
};