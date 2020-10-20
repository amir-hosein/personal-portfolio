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
const { writeFile, readFile } = require('fs');
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

const createContactList = data => {
  //database headers
  const headers = data.split(EOL)[0].split(', ');

  return data.split(EOL).slice(1).map(row => {
    const values = row.split(', ');
    return values.reduce((user, value, index) => {
      return {
        ...user,
        [headers[index]]: value
      }
    }, {})
  });
}

/* POST login page. */
router.post('/login', ({ body: { username, password } }, res, next) => {
  readFilePromise(`${__dirname}/../database.csv`, 'utf8')
  .then(data => {
    const isAdmin = createContactList(data).filter(user => {
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
router.get('/users/business_contact_list', (req , res, next) => {
  readFilePromise(`${__dirname}/../database.csv`, 'utf8')
  .then(data => {
    contactsList = createContactList(data).filter(user => !user.Password)
    contactsList.sort((a, b) => {
      if (a.ContactName < b.ContactName){
        return -1;
      }
      if (a.ContactName > b.ContactName){
        return 1;
      }
      return 0;
    })
    res.render('business_contact_list', { title: 'business_contact_list', users: contactsList});
  })
  .catch(next)
})

const contactToString = list => {
  return contactsList.reduce((str, contact) => {
    return `${str}${EOL}${contact.ContactName}, ${contact.ContactNumber}, ${contact.EmailAddress}`
  }, `ContactName, ContactNumber, EmailAddress, Password${EOL}Admin, 0, 0, admin`);
}

router.post('/users/business_contact_list', ({ body: { name, number, email, newName, newNumber, newEmail } } , res, next) => {
  console.log(name, number, email, newName, newNumber, newEmail)
  let contactToEditIndex;
  contactsList.forEach((contact, index) => {
    if(contact.ContactName === name &&
      contact.ContactNumber === number &&
      contact.EmailAddress === email) {
      contactToEditIndex = index;
    }
  })

  contactsList[contactToEditIndex].ContactName = newName;
  contactsList[contactToEditIndex].ContactNumber = newNumber;
  contactsList[contactToEditIndex].EmailAddress = newEmail;

  writeFilePromise(`${__dirname}/../database.csv`, contactToString(contactsList), 'utf8')
  .then(() => {
    console.log(contactsList)
    res.render('business_contact_list', { title: 'business_contact_list', users: contactsList});
  })
  .catch(next)
})

router.delete('/users/business_contact_list', ({ body: { name, number, email } } , res, next) => {
  contactsList = contactsList.filter(contact => {
    return contact.ContactName !== name || contact.ContactNumber !== number || contact.EmailAddress !== email;
  })

  writeFilePromise(`${__dirname}/../database.csv`, contactToString(contactsList), 'utf8')
    .then(() => {
      res.render('business_contact_list', { title: 'business_contact_list', users: contactsList});
    })
    .catch(next)
})

module.exports = router;