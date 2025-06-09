import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mailer.js';
import { generateOtp, checkExpired } from '../utils/otp.js';
import { findUserByEmail, createUser, updateUserVerification , updatePassword} from '../repositories/user.repository.js';
import { createOtp, otpByEmail, deleteOtp } from '../repositories/otp.repository.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const user = await createUser({ name, email, password });

  const code = generateOtp();

  const expiresIn = new Date(Date.now() + 10 * 60 * 1000);

  await createOtp({email, otp : code, expiresAt : expiresIn});

  const subject = 'Welcome to Task Manager, Verify your Email';
  const html = `<p>Your OTP is : <b>${code}</b></p>`;
  await sendMail(email, subject, html);

  return user;
};

export const verifyOtp = async(email, otp) => {
  const OTP = await otpByEmail(email,otp);

  if(!OTP || checkExpired(OTP.expiredAt)) throw new Error('Invalid or Expired OTP');

  await updateUserVerification(email);
  await deleteOtp(email);
}

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
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
  const user = await findUserByEmail(email);
  if(!user) throw new Error('Email not registered');

  const code = generateOtp();
  const expiresIn = new Date(Date.now() + 10*60*1000);

  await createOtp({email, otp : code, expiresAt : expiresIn});
  await sendMail(email, 'Reset Password OTP', `<p>Your OTP : <b>${code}</b></p>`)
};

export const resetPasswordUsingOtp = async(email,otp,newPassword) => {
  const sentOtp = await otpByEmail(email,otp)

  if(!sentOtp || checkExpired(sentOtp.expiredAt)){
    throw new Error('Invalid or Expired OTP');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updatePassword(email,hashedPassword);
  await deleteOtp(email);
}