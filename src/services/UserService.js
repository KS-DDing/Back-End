import bcrypt from 'bcrypt';
import passport from 'passport';
import * as UserRepository from '../repositories/UserRepository';

//회원가입. 비밀번호 당연히 암호화.
export const SignUp = async (req, res, next) => {
  const user = await UserRepository.findUserByEmail(req.body.email);
  try {
    if (user) {
      return res.send('이미 가입된 이메일입니다.');
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 11);
      const response = await UserRepository.createUser(req.body);
      return res.send(response);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const Login = (req, res, next) => {
  //여기 req, res, next 받을 수 있게 한번 감싸줄 수 있는 거 기억 잘하기!
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info.message);
    }
    console.log(user);
    req.logIn(user, err => {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};

export const Logout = (req, res, next) => {
  req.logOut();
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      //connect.sid : 고유식별자 --> 고유식별자 쿠키에서 지우겠다는 의미.
      return res.clearCookie('connect.sid').status(200).send('로그아웃되었습니다.');
    }
  });
};

//임시용
export const userInfo = async (req, res, next) => {
  const user = await UserRepository.getUsers();
  return res.send(user);
};
