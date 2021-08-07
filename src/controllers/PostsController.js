import express from 'express';
import * as PostsService from '../services/PostsService';

const router = express.Router();

//한 유저의 게시글 목록을 보고싶을 때
router.get('/', PostsService.getAllPosts);
router.get('/:userid', PostsService.getUserPosts);

export default router;
