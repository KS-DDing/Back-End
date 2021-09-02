import express from 'express';
import * as Auth from '../../middleware/AuthHandler';
import * as CommentService from '../services/CommentService';

const router = express.Router();

router.post('/', Auth.isLoggined, CommentService.createComment);
router.post('/edit', Auth.isLoggined, CommentService.editComment);
router.post('/delete', Auth.isLoggined, CommentService.deleteComment);
export default router;
