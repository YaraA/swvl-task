const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const group = require('./routes/group');
const resource = require('./routes/resource');
const user = require('./routes/user');

const app = express();
const mongoose = require('mongoose');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(resource);
app.use(group);
app.use(user);


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/swvl-task', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => {
    console.error(err); 
    process.exit();
  });

module.exports = app;