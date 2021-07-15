import express from 'express';
import * as UserService from '../services/UserService';

const router = express.Router();

router.get('/', UserService.findUser);

export default router;
