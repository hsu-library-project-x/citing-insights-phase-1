var groupsModel = require('../models/groupsModel.js');

/**
 * groupsController.js
 *
 * @description :: Server-side logic for managing groupss.
 */
module.exports = {

    /**
     * groupsController.list()
     */
    list: function (req, res) {
        groupsModel.find(function (err, groupss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting groups.',
                    error: err
                });
            }
            return res.json(groupss);
        });
    },

    /**
     * groupsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        groupsModel.findOne({ _id: id }, function (err, groups) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting groups.',
                    error: err
                });
            }
            if (!groups) {
                return res.status(404).json({
                    message: 'No such groups'
                });
            }
            return res.json(groups);
        });
    },

    /**
     * groupsController.create()
     */
    create: function (req, res) {
        var groups = new groupsModel({
            creator: req.body.creator,
            name: req.body.name,
            note: req.body.note,
            members: req.body.members

        });

        groups.save(function (err, groups) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating groups',
                    error: err
                });
            }
            return res.status(201).json(groups);
        });
    },

    /**
     * groupsController.update()
     */
    update: function (req, res) {
        var groupId = req.body.id;

        console.log(groupId);
        var pending = {
            "email": req.body.email,
            "message": req.body.message
        };

        groupsModel.findOneAndUpdate(
            { _id: groupId },
            { $push: { pendingMembers: pending } },
            function (err, groups) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting groups.',
                        error: err
                    });
                }
                return res.status(201).json(groups);
            });
    },

    /**
     * groupsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        groupsModel.findByIdAndRemove(id, function (err, groups) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the groups.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
