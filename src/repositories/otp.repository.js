import db from '../models/index.js';

export const createOtp = async(data) => {
    return await db.Otp.create(data);
}

export const otpByEmail = async(email,otp) => {
    return await db.Otp.findOne({
    where: { email, otp },
    order: [['createdAt', 'DESC']]
  });
};

export const deleteOtp = async(email) => {
    return await db.Otp.destroy({where : {email}});
};