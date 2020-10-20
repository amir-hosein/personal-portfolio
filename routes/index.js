/*
  File name: index.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 26/09/2020
*/

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { promisify } = require('util');
const { writeFile, readFile, access } = require('fs');
const { EOL } = require('os');

const writeFilePromise = promisify(writeFile);
const readFilePromise = promisify(readFile);

/* Credentials*/
const user = {};

/* Contacts */
let contactsList = []

/* GET home page. */
router.get('/', (req, res, next) => {
  delete user.username;
  delete user.password;
  console.log(user)
  res.render('home', { title: 'home' });
});

/* GET others pages. */
router.get('/:page', ({params: { page }}, res, next) => {
  res.render(page, { title: page });
});

/* Middleware for authentication*/
const requireAuthentication = (req, res, next) => {
  if(!user.username || !user.password) {
    res.redirect('../login')
  }
  next();
}

/* POST login page. */
router.post('/login', ({ body: { username, password } }, res, next) => {
  readFilePromise(`${__dirname}/../database.csv`, 'utf8')
  .then(data => {
    const headers = data.split(EOL)[0].split(', ');
    const usersList = data.split(EOL).slice(1).map(row => {
      const values = row.split(', ');
      return values.reduce((user, value, index) => {
        return {
          ...user,
          [headers[index]]: value
        }
      }, {})
    });

    contactsList = usersList.filter(user => !user.Password)

    const isAdmin = usersList.filter(user => {
      return user.Password && user.ContactName === username && user.Password === password
    }).length === 1;

    if(isAdmin) {
      user.username = username;
      user.password = password;
      res.redirect('users/business_contact_list');
    } else {
      res.redirect('login');
    }
  })
  .catch(next)
})

/* Control auth */
router.all('/users/*', requireAuthentication)

/* GET business_contact_list page */
router.get(`/users/business_contact_list`, (req , res, next) => {
  res.render('business_contact_list', { title: 'business_contact_list', users: contactsList});
})

module.exports = router;