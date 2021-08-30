import * as PostRepository from '../repositories/PostRepository';

export const WritePost = async (req, res, next) => {
  try {
    const currentUser = req.session.passport.user;
    console.log(currentUser);
    const post = await PostRepository.createPost(currentUser.id, req.body);
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const editedPost = await PostRepository.updatePost(req.body);
    if (!editedPost) {
      res.send('게시글 수정중 오류가 발생하였습니다.');
    } else {
      res.status(200).send('게시글을 수정하였습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const toDelete = await PostRepository.deletePost(req.body.postId);
    if (!toDelete) {
      res.send('게시글 삭제도중 오류가 발생하였습니다.');
    } else {
      res.status(200).send('게시글을 삭제하였습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
