import app from './app.js';

app.listen('4000', 'localhost', err => {
  if (err) {
    console.error(err);
  }
  console.log('server is running on localhost:3000');
});
