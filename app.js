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

// app.get('/', (req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;