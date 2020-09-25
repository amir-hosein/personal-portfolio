const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('about', { title: 'About' });
});

module.exports = router;
