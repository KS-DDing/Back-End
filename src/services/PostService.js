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

export const getPost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postid);
    const posts = await PostRepository.getPost(postId);
    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
