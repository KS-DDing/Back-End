const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const usersRouter = require('./routes/users');
import connectDB from './config/db_con';

const app = express();

connectDB.test_open(connectDB.init());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use('/users', usersRouter);

module.exports = app;
