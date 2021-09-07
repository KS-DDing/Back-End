import express from 'express';
import * as AuthHander from '../../middleware/AuthHandler';
import ImageHandler from '../../middleware/ImageHandler';
import * as PostService from '../services/PostService';
const router = express.Router();

//게시글 불러오기
router.get('/');

//게시글 작성
router.post(
  '/',
  AuthHander.isLoggined,
  ImageHandler.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'contentImages' }]),
  PostService.WritePost
);
router.post('/edit', AuthHander.isLoggined, PostService.editPost);
router.post('/delete', AuthHander.isLoggined, PostService.deletePost);
export default router;
