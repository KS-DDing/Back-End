import bcrypt from 'bcrypt';
import passport from 'passport';
import * as UserRepository from '../repositories/UserRepository';

//회원가입. 비밀번호 당연히 암호화.
export const SignUp = async (req, res, next) => {
  const user = req.body;
  try {
    if (!user) {
      return res.send('Error.');
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 11);
      const response = await UserRepository.createUser(req.body);
      return res.status(200).send(response);
    }
  } catch (err) {
    console.error(err);
    next('에러입니다');
  }
};

//회원가입시 이메일 따로 중복검사
export const CheckEmail = async (req, res, next) => {
  const user = await UserRepository.findUserByEmail(req.body.email);
  try {
    if (user) {
      return res.send('이미 가입된 이메일입니다.');
    } else {
      return res.status(200).send(req.body.email);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//회원가입시 닉네임 따로 중복검사
export const CheckName = async (req, res, next) => {
  const name = await UserRepository.findUserByName(req.body.name);
  try {
    if (name) {
      return res.send('이미 있는 닉네임입니다.');
    } else {
      return res.status(200).send(req.body.name);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//로그인
//email, password 값중 빈값이 오면 오류

export const Login = (req, res, next) => {
  //여기 req, res, next 받을 수 있게 한번 감싸줄 수 있는 거 기억 잘하기!
  passport.authenticate('local', (err, user, info) => {
    console.log('hello');
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info.message);
      return res.send(info.message);
    }
    req.logIn(user, err => {
      if (err) {
        console.error(err);
        return next('에러가 발생하였습니다.');
      }
      return res.send(user);
    });
  })(req, res, next);
};

//로그아웃. 성공시 success:true 전달
export const Logout = (req, res, next) => {
  req.logOut();
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      //connect.sid : 고유식별자 --> 고유식별자 쿠키에서 지우겠다는 의미.
      return res.clearCookie('connect.sid').status(200).send({ success: true });
    }
  });
};

//유저정보 다 끌어오는거. 임시용
export const UserInfo = async (req, res, next) => {
  try {
    const user = await UserRepository.getUsers();
    return res.send(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UserProfile = async (req, res, next) => {
  try {
    const userProfile = await UserRepository.findUserById(req.session.passport.user.id);
    return res.send({ id: userProfile.id, name: userProfile.name, email: userProfile.email });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
