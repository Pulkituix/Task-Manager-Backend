import express from 'express';
import { register, login, verifyEmailOtp, forgotPassword, resetPassword} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verifyOTP', verifyEmailOtp);
authRouter.post('/login', login);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword', resetPassword)

export default authRouter;