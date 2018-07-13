var express = require('express');
var router = express.Router();

/* GET ALL Resources */
router.get('/', function(req, res, next) {
    Resource.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE Resource BY ID */
  router.get('/:id', function(req, res, next) {
    Resource.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* SAVE Resource */
  router.post('/', function(req, res, next) {
    Resource.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE Resource */
  router.put('/:id', function(req, res, next) {
    Resource.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE Resource */
  router.delete('/:id', function(req, res, next) {
    Resource.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  module.exports = router;

module.exports = router;