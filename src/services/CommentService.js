import * as CommentRepository from '../repositories/CommentRepository';

export const createComment = async (req, res, next) => {
  try {
    const comment = await CommentRepository.createComment(req.body);
    if (!comment) {
      res.status(400).send('comment 작성중 오류가 발생하였습니다.');
    } else {
      res.status(200).send('댓글을 달았습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await CommentRepository.updateComment(req.body);
    if (!comment) {
      res.status(400).send('comment 작성중 오류가 발생하였습니다.');
    } else {
      res.status(200).send('댓글을 수정하였습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deleted = await CommentRepository.deleteComment(req.body);
    if (!deleted) {
      res.status(400).send('comment 삭제도중 오류가 발생하였습니다.');
    } else {
      res.status(200).send(deleted);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
