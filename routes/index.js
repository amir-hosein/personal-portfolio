/*
  File name: index.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 26/09/2020
*/

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

module.exports = router;
