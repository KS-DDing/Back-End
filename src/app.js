import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import passport from 'passport';
import env from '../config';
import passportSession from '../config/Passport/index';
import UserController from './controllers/UserController';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser(env.COOKIE_SECRET));
passportSession(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', UserController);
app.listen(env.PORT, () => {
  console.log('서버시작');
});

module.exports = app;
