import * as PostViewRepository from '../repositories/PostViewRepository';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostViewRepository.getAllPosts();
    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await PostViewRepository.getUserPosts(parseInt(req.params.userid));
    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
