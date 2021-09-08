import fs from 'fs';
import * as ImageRepository from '../repositories/ImageRepository';
import * as PostRepository from '../repositories/PostRepository';
import { getPost } from '../repositories/PostViewRepository';
import * as ThumbnailRepository from '../repositories/ThumbnailRepository';
export const WritePost = async (req, res, next) => {
  try {
    const currentUser = req.session.passport.user;
    const post = await PostRepository.createPost(currentUser.id, req.body);
    let images;
    let thumbnail;
    //게시글 업로드 오류발생시.
    if (!post) {
      return res.send('게시글을 올리는 도중 오류가 발생하였습니다.');
    }
    if (!req.files) {
      //사진을 첨부하지 않았을 시.
      return res.status(200).send(post);
    } else {
      //사진 첨부시.
      thumbnail = await ThumbnailRepository.createThumbnail(post.id, req.files['thumbnail'][0].path);

      images = await req.files.contentImages.map(element => {
        ImageRepository.createImage(post.id, element.path);
      });
    }
    //image, post 업로드 뒤에 오류 체크.
    if (!thumbnail) {
      return res.status(400).send('썸네일 업로드 실패. 게시글 수정을 통해 다시 올려주세요');
    } else if (!images) {
      return res.status(400).send('이미지 업로드 실패. 게시글 수정을 통해 다시 올려주세요');
    } else {
      return res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const user = req.body.author;
    if (user !== req.session.passport.user.id) {
      res.send('잘못된 요청입니다.');
    } else {
      const data = {
        title: req.body.title,
        content: req.body.content,
      };
      const editedPost = await PostRepository.updatePost(parseInt(req.body.postid), data);
      if (!editedPost) {
        res.send('게시글 수정중 오류가 발생하였습니다.');
      } else {
        res.status(200).send('게시글을 수정하였습니다.');
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await getPost(req.body.postId);
    if (post.thumbnail.src) {
      fs.unlinkSync(__dirname + '/../../' + post.thumbnail.src);
    }

    if (post.images[0]) {
      post.images.forEach(element => {
        console.log(element.src);
        fs.unlinkSync(__dirname + '/../../' + element.src);
      });
    }
    await PostRepository.deletePost(parseInt(req.body.postId));
    const toDelete = await getPost(req.body.postId);
    console.log(toDelete);
    if (toDelete) {
      res.send('게시글 삭제도중 오류가 발생하였습니다.');
    } else {
      res.status(200).send('게시글을 삭제하였습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
