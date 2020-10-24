/*
  File name: user.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 23/10/2020
*/

const { mongoose } = require('../../utils');

const postSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Users', postSchema);