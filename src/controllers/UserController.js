import express from 'express';
import * as AuthHander from '../../middleware/AuthHandler';
import * as UserService from '../services/UserService';

const router = express.Router();

router.post('/', AuthHander.isNotLoggined, UserService.SignUp);
router.post('/signup/email', AuthHander.isLoggined, UserService.CheckEmail);
router.post('/signup/name', AuthHander.isLoggined, UserService.CheckName);
router.post('/login', AuthHander.isNotLoggined, UserService.Login);
router.get('/logout', AuthHander.isLoggined, UserService.Logout);
router.get('/alluser', UserService.UserInfo);
router.get('/profile', AuthHander.isLoggined, UserService.UserProfile);

export default router;
