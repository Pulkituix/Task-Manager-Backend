import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.js'
import {registerUser, loginUser} from '../services/auth.services.js'
const UserModel = db.User;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function register(req,res){
  try{
    const {name, email, password} = req.body;
    const user = await registerUser (name, email, password);
    res.status(201).json({message : 'user registered', user});
  }
  catch(err){
    res.status(400).json({error : err.message});
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
