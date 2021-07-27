import express from 'express';
import * as UserService from '../services/UserService';

const router = express.Router();

router.post('/', UserService.SignUp);
router.post('/signup/email', UserService.CheckEmail);
router.post('/signup/name', UserService.CheckName);
router.post('/login', UserService.Login);
router.post('/logout', UserService.Logout);
router.get('/alluser', UserService.userInfo);

export default router;
