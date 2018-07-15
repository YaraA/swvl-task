const User = require('../models/user');
const async = require('async');

/* Adds group to each user's list of groups  */
exports.addGroupToUsers = (req, res) => {
    console.log("Hereee");
    const listOfIds = (req.body).map(user => user.userId);
    async.each(listOfIds, function(userId){
        User.findByIdAndUpdate(userId, { $addToSet: { groups: req.params.id } }, { upsert: true, multi: true })
        .then(user => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    });
};

/* Retrieves a list of userIds belonging to the group with id and their total count */
exports.getUsersInGroup = (req, res) => {
    User.find({ groups: req.params.id })
        .then(users => {
            const userIds = users.map(user => JSON.parse(JSON.stringify({ userId: user._id })));
            res.status(200).json({ count: users.length, items: userIds });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


/* Checks whether this user has access to the resource through any of the groups the user belongs to*/
exports.isAuthorized = (req, res) => {
    User.find({ _id: req.query.userId, resources: req.query.resourceName })
        .then(users => {
            if (users === null || users.length === 0)
                res.status(403).json({ authorized: false });
            else
                res.status(200).json({ authorized: true });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

/* GET ALL Users */
exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json({ count: users.length, items: users });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};