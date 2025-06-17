import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mailer.js';
import { generateOtp, checkExpired } from '../utils/otp.js';
import * as authRepo from '../repositories/user.repository.js';
import * as otpRepo from '../repositories/otp.repository.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(name, email, password){
  const existingUser = await authRepo.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const user = await authRepo.createUser({ name, email, password });

  const code = generateOtp();

  const expiresIn = new Date(Date.now() + 10 * 60 * 1000);

  await otpRepo.createOtp({email, otp : code, expiresAt : expiresIn});

  const subject = 'Welcome to Task Manager, Verify your Email';
  const html = `<p>Your OTP is : <b>${code}</b></p>`;
  await sendMail(email, subject, html);

  return user;
};

export async function verifyOtp(email, otp) {
  const OTP = await otpRepo.otpByEmail(email,otp);

  if(!OTP || checkExpired(OTP.expiredAt)) throw new Error('Invalid or Expired OTP');

  await authRepo.updateUserVerification(email);
  await otpRepo.deleteOtp(email);
}

export async function loginUser(email, password){
  const user = await authRepo.findUserByEmail(email);
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

export async function forgotPasswordOtp(email) {
  const user = await authRepo.findUserByEmail(email);
  if(!user) throw new Error('Email not registered');

  const code = generateOtp();
  const expiresIn = new Date(Date.now() + 10*60*1000);

  await otpRepo.createOtp({email, otp : code, expiresAt : expiresIn});
  await sendMail(email, 'Reset Password OTP', `<p>Your OTP : <b>${code}</b></p>`)
};

export async function resetPasswordUsingOtp (email,otp,newPassword) {
  const sentOtp = await otpRepo.otpByEmail(email,otp)

  if(!sentOtp || checkExpired(sentOtp.expiredAt)){
    throw new Error('Invalid or Expired OTP');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await authRepo.updatePassword(email,hashedPassword);
  await otpRepo.deleteOtp(email);
}