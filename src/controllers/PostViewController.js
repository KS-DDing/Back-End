import express from 'express';
import * as PostViewService from '../services/PostViewService';

const router = express.Router();

//한 유저의 게시글 목록을 보고싶을 때
router.get('/', PostViewService.getAllPosts);
router.get('/user', PostViewService.getUserPosts);
router.get('/single', PostViewService.getPost);
export default router;
