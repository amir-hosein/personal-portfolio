/*
  File name: insertUsers.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 23/10/2020
*/

const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://127.0.0.1/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const UserScherma = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: String,
  number: Number,
  displayName: String,
  created: {
    type: Date,
    default: new Date()
  },
  update: {
    type: Date,
    default: new Date()
  },
  salt: String,
  __v: Number
});

const User = mongoose.model('Users', UserScherma);

const users = [
  {
    "username" : "test",
    "email" : "test@test.com",
    "password" : "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "number": 3333333,
    "displayName" : "test",
    "created" : new Date(),
    "update" : new Date(),
    "__v" : 0
  },
  {
    "username" : "Jack",
    "email" : "jack@jack.com",
    "number": 3333333,
    "displayName" : "Jack",
    "created" : new Date(),
    "update" : new Date(),
    "__v" : 1
  },
  {
    "username" : "Tom",
    "email" : "Tom@Tom.com",
    "number": 3333333,
    "displayName" : "Tom",
    "created" : new Date(),
    "update" : new Date(),
    "__v" : 2
  },
  {
    "username" : "Sarah",
    "email" : "Sarah@Sarah.com",
    "number": 3333333,
    "displayName" : "Sarah",
    "created" : new Date(),
    "update" : new Date(),
    "__v" : 3
  },
  {
    "username" : "John",
    "email" : "John@John.com",
    "number": 3333333,
    "displayName" : "John",
    "created" : new Date(),
    "update" : new Date(),
    "__v" : 4
  }
]

User.insertMany(users, (err, data) => {
  if(err) console.error(err);
  mongoose.disconnect();
});