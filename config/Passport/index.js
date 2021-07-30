import { findUserById } from '../../src/repositories/UserRepository';
import localStrategy from './localStrategy';

export default passport => {
  passport.serializeUser((user, done) => {
    //유저아이디를 전달해서 session을 구분.
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await findUserById(id);
    try {
      if (user) {
        done(null, user);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  localStrategy(passport);
};
