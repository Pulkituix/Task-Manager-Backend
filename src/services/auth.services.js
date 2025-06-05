import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (name, email, password) => {
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = await db.User.create({ name, email, password });
  return user;
};

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
