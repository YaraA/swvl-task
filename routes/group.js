const express = require('express');
const router = express.Router();
const groupCtrl = require('../controllers/group');

/* GET ALL Groups */
router.get('/group', groupCtrl.getAllGroups);

/* GET SINGLE Group BY ID */
router.get('/group/:id', groupCtrl.getGroupById);


/* Create Group */
router.post('/group', groupCtrl.addGroup);

/* Authorizes the group to access any of the resources in the request */
router.post('/group/:id/authorize', groupCtrl.addResourcesToGroup);

// /* Returns a list of resources this group can access and their total count */
router.get('/group/:id/resource', groupCtrl.getResourcesOfGroup);



module.exports = router;