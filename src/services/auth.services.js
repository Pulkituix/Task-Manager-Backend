import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mailer.js';
import { generateOtp, checkExpired } from '../utils/otp.js';
import { where } from 'sequelize';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (name, email, password) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = await db.User.create({ name, email, password });

  const code = generateOtp();

  const expiresIn = new Date(Date.now() + 10 * 60 * 1000);

  await db.Otp.create({email, otp : code, expiresAt : expiresIn});

  const subject = 'Welcome to Task Manager, Verify your Email';
  const html = `<p>Your OTP is : <b>${code}</b></p>`;
  await sendMail(email, subject, html);

  return user;
};

export const verifyOtp = async(email, otp) => {
  const OTP = await db.Otp.findOne({where : {email, otp}, order : [['createdAt', 'DESC']]});

  if(!OTP || checkExpired(OTP.expiredAt)) throw new Error('Invalid or Expired OTP');

  await db.User.update({isVerified : true}, {where : {email}});
  await db.Otp.destroy({where : {email}});
}

export const loginUser = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d'
  });

  return { token, user };
};

export const forgotPasswordOtp = async(email) => {
  const user = await db.User.findOne({where : {email}});
  if(!user) throw new Error('Email not registered');

  const code = generateOtp();
  const expiresIn = new Date(Date.now() + 10*60*1000);

  await db.Otp.create({email, otp : code, expiresAt : expiresIn});
  await sendMail(email, 'Reset Password OTP', `<p>Your OTP : <b>${code}</b></p>`)
};

export const resetPasswordUsingOtp = async(email,otp,newPassword) => {
  const sentOtp = await db.Otp.findOne({where : {email,otp}, order : [['createdAt','DESC']]});

  if(!sentOtp || checkExpired(sentOtp.expiredAt)){
    throw new Error('Invalid or Expired OTP');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.User.update({password : hashedPassword}, {where : {email}});
  await db.Otp.destroy({where : {email}});
}