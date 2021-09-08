import CategoryRepository from '../repositories/CategoryRepository';

export const createCategory = async (req, res, next) => {
  try {
    const currentUser = req.session.passport.user;
    const category = await CategoryRepository.createCategory(req.body, currentUser.id);
    if (!category) {
      res.status(400).send('잘못된 요청입니다.');
    } else {
      res.status(200).send('카테고리 생성이 완료되었습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editCategory = async (req, res, next) => {
  try {
    const currentUser = req.session.passport.user;
    const category = await CategoryRepository.updateCategory(req.body, currentUser.id);
    if (!category) {
      res.status(400).send('잘못된 요청입니다.');
    } else {
      res.status(200).send('카테고리 수정이 완료되었습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await CategoryRepository.deleteCategory(req.body);
    if (!category) {
      res.status(400).send('카테고리 삭제에 실패하였습니다.');
    } else {
      res.status(200).send('삭제성공');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
