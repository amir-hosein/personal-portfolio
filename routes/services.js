const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('services', { title: 'Services' });
});

module.exports = router;