import app from './app.js';

app.listen(3000, 'localhost', err => {
  if (err) {
    console.error(err);
  }
  console.log('server is running on localhost:3000');
});
