const express = require('express');
// const mysql_dbc = require('../config/db_con')();
// const connection = mysql_dbc.init();
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
