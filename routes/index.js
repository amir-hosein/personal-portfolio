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
  res.render('home', { title: 'Home' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});

/* GET services listing. */
router.get('/services', (req, res, next) => {
  res.render('services', { title: 'Services' });
});

/* GET projects listing. */
router.get('/projects', (req, res, next) => {
  res.render('projects', { title: 'Projects' });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;