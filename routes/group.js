var express = require('express');
var router = express.Router();

/* GET ALL Groups */
router.get('/', function(req, res, next) {
    Group.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE Group BY ID */
  router.get('/:id', function(req, res, next) {
    Group.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* SAVE Group */
  router.post('/', function(req, res, next) {
    Group.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE Group */
  router.put('/:id', function(req, res, next) {
    Group.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE Group */
  router.delete('/:id', function(req, res, next) {
    Group.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
module.exports = router;