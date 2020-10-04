/*
  File name: about.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 26/09/2020
*/

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('about', { title: 'About' });
});

module.exports = router;
