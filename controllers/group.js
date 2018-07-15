const Group = require('../models/group');
const User = require('../models/user');

/* GET ALL Groups */
exports.getAllGroups = (req, res) => {
    Group.find({}, ['-__v', '-resources'])
        .then(groups => {
            res.status(200).json({ count: groups.length, items: groups });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

/* GET SINGLE Group BY ID */
exports.getGroupById = (req, res) => {
    Group.findById(req.params.id, ['-__v', '-resources'])
        .then(group => {
            if (group === null)
                res.status(500).send({
                    message: "No group found with id: " + req.params.id
                });
            res.status(200).json(group);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


/* Create Group */
exports.addGroup = (req, res) => {
    const newGroup = new Group(req.body);
    if (!newGroup.name) {
        return res.status(400).send({
            message: "Please specify the group name"
        });
    }

    Group.create(newGroup)
        .then(group => {
            res.status(200).json({id: group._id, name:group.name, description:group.description});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

/* Authorizes the group to access any of the resources in the request */
exports.addResourcesToGroup = (req, res) => {
    const listOfResourceIds = (req.body).map(resource => resource.resourceId);
    Group.findByIdAndUpdate(req.params.id, { $addToSet: { resources: listOfResourceIds } }).populate('resources', 'name -_id').select('resources')
        .then(group => {
            const resNames = group.resources.map(resource => resource.name);
            User.update({groups: req.params.id}, { $addToSet: { resources: resNames } }, {multi:true})
            .then(user => {
                res.status(204).json(group);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

/* Returns a list of resources this group can access and their total count */
exports.getResourcesOfGroup = (req, res) => {
    Group.findById(req.params.id).populate('resources', '-__v').select("resources")
    .then(resources => {
        if (resources === null)
        res.status(500).send({
            message: "The group does not have any resources"
        });
        res.status(200).json({ count: resources.resources.length, items: resources.resources });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};