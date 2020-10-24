/*
  File name: index.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 26/09/2020
*/

const express = require('express');
const router = express.Router();

const { hash, User } = require('../utils')

let logged = false;

/* Middleware to logout */
const logout = (req, res, next) => {
  logged = false;
  next();
}

/* Checks if the admin user is logged*/
const isLogged = (req, res, next) => {
  if(!logged) {
    res.redirect('/login');
  } else{
    next();
  }
}

/* GET home page. */
router.get('/', logout, (req, res, next) => {
  res.render('home', { title: 'home' });
});

/* GET others pages. */
router.get('/:page', logout, ({params: { page }}, res, next) => {
  res.render(page, { title: page });
});

/* POST login */
router.post('/login', (req, res, next) => {
  const { body: { username, password } } = req;
  const user = {
    username,
    password: hash.createHash('sha256').update(password).digest('hex')
  };
  User.find(user, (err, data) => {
    if(err) next(err);
    if([...data].length > 0) {
      logged = true;
      res.redirect('/user/business_contact_list');
    } else {
      res.redirect('/login');
    }
  })
})

/* Control auth */
router.all('/user/business_contact_list', isLogged)

/* Querying all the users from the database */
const getAllUsers = () => {
  return User.find({}).then(users => users.filter(user => user.username !== 'test'));
}

/* GET business_contact_list */
router.get('/user/business_contact_list', (req, res, next) => {
  getAllUsers()
    .then(users => {
      res.render('business_contact_list', { title: 'business_contact_list', users })
    })
    .catch(next)
})

/* DELETE user */
router.delete('/user/business_contact_list', ({ body: { username } }, res, next) => {
  User.findOneAndDelete({ username })
    .then(() => getAllUsers())
    .then(users => {
      res.render('business_contact_list', { title: 'business_contact_list', users })
    })
    .catch(next);
})

/* GET edit page for the user */
router.get('/user/business_contact_list/:username', (req, res, next) => {
  res.render(`edit_user`, { title: req.params.username })
})

/* POST user */
router.post('/user/business_contact_list/:username', (req, res, next) => {
  const { params: { username } } = req;
  const { body: { newUsername, newNumber, newEmail } } = req;

  User.findOneAndUpdate(
    { username },
    { username: newUsername, number: parseInt(newNumber), email: newEmail },
    err => {
      if(err) next(err);
      res.redirect('/user/business_contact_list');
    });
})

/* DELETE user from edit page */
router.delete('/user/business_contact_list/:username', ({ params: { username } }, res, next) => {
  User.findOneAndDelete({ username }, err => {
    if(err) next(err);
    res.json({
      url: '/user/business_contact_list'
    })
  });
})

module.exports = router;