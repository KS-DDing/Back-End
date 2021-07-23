import { findUserById } from '../../src/repositories/UserRepository';
import localStrategy from './localStrategy';

export default passport => {
  passport.serializeUser((user, done) => {
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
