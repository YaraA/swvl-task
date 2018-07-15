const Resource = require('../models/resource');

/* GET ALL Resources */
exports.getAllResources = (req, res) => {
    Resource.find().select("-__v")
        .then(resources => {
            res.status(200).json({count: resources.length, items: resources});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

/* GET SINGLE Resource BY ID */
exports.getResourceById = (req, res) => {
    Resource.findById(req.params.id).select("-__v")
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


/* Create Resource */
exports.AddResource = (req, res) => {
    const newResource = new Resource(req.body);
    if (!newResource.name) {
        return res.status(400).send({
            message: "Please specify the resource name"
        });
    }

    Resource.create(newResource)
        .then(resource => {
            res.status(200).json({id: resource._id, name: resource.name});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};