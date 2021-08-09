import * as PostsRepository from '../repositories/PostsRepository';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostsRepository.getAllPosts();
    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await PostsRepository.getUserPosts(parseInt(req.params.userid));
    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
