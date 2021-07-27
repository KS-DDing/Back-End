import bcrypt from 'bcrypt';
import strategy from 'passport-local';
import * as UserRepository from '../../src/repositories/UserRepository';

const LocalStrategy = strategy.Strategy;
export default passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await UserRepository.findUserByEmail(email);
          if (!user) {
            return done(null, false, { message: '이메일에 해당하는 유저가 없습니다.' });
          } else {
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
              return done(null, false, { message: '비밀번호가 틀렸습니다.' });
            }
          }
          return done(null, user);
        } catch (err) {
          console.log('hi');
          console.error(err);
        }
      }
    )
  );
};
