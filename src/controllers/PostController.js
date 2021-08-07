import express from 'express';
import * as AuthHander from '../../middleware/AuthHandler';
import * as PostService from '../services/PostService';

const router = express.Router();

//게시글 불러오기
router.get('/');

//게시글 작성
router.post('/', AuthHander.isLoggined, PostService.WritePost);
router.get('/:postid', PostService.getPost);

export default router;
