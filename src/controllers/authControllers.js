import * as authServices from '../services/auth.services.js'

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function register(req,res){
  try{
    const {name, email, password} = req.body;
    const user = await authServices.registerUser (name, email, password);
    res.status(201).json({message : 'user registered', user});
  }
  catch(err){
    res.status(400).json({error : err.message});
  }
};

export async function verifyEmailOtp(req, res){
  try {
    const {email, otp} = req.body;
    await authServices.verifyOtp(email, otp);
    res.status(200).json({message : 'Email verified successfully'});
  } catch (error) {
    res.status(400).json({error : error.message});
  }
};

export async function login(req, res, next){
  try {
    const { email, password } = req.body;
    const { token, user } = await authServices.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export async function forgotPassword(req,res){
  try{
    const{email} = req.body;
    await authServices.forgotPasswordOtp(email);
    res.status(200).json({message : 'OTP sent to email'});
  }catch(error){
    res.status(400).json({error : error.message});
  }
};

export async function resetPassword(req, res){
  try {
    const{email, otp, newPassword} = req.body;
    await authServices.resetPasswordUsingOtp(email, otp, newPassword);
    res.status(200).json({message : 'Password reset successfully'});
  } catch (error) {
    res.status(400).json({error : error.message});
  }
}