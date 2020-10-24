/*
  File name: utils.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 23/10/2020
*/

const { exports: exp } = module;
const mongoose = require('mongoose');
const promisify = require('util').promisify;

exp.writeFile = promisify(require('fs').writeFile);
exp.readFile = promisify(require('fs').readFile);
exp.EOL = require('os').EOL;
exp.hash = require('crypto');
exp.mongoose = mongoose;
exp.dbConnection = mongoose.connect('mongodb://127.0.0.1/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
exp.User = require('./routes/models/user')