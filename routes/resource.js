const express = require('express');
const router = express.Router();
const resourceCtrl = require('../controllers/resource');

/* GET ALL Resources */
router.get('/resource', resourceCtrl.getAllResources);

/* GET SINGLE Resource BY ID */
router.get('/resource/:id', resourceCtrl.getResourceById);


/* Create Resource */
router.post('/resource', resourceCtrl.AddResource);

module.exports = router;