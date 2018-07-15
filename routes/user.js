const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

/* Adds group to each user's list of groups  */
router.post('/group/:id/user', userCtrl.addGroupToUsers);

/* Retrieves a list of userIds belonging to the group with id and their total count */
router.get('/group/:id/user', userCtrl.getUsersInGroup);


/* Checks whether this user has access to the resource through any of the groups the user belongs to*/
router.get('/authorized', userCtrl.isAuthorized);

/*  Get all Users */
router.get('/users', userCtrl.getAllUsers);

module.exports = router;