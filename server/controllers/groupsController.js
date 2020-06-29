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

    /** find groups that belong to user (user is creator) */
    findOwner: function (req, res) {
        var userId = req.params.id;
        groupsModel.find({ creator: userId }, function (err, groupss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting groups.',
                    error: err
                });
            }
            return res.json(groupss);
        });
    },

      /** find groups that user belongs to (user is member) */
      findMember: function (req, res) {
        var userId = req.params.id;
        groupsModel.find({ members: {$in: userId }}, function (err, groupss) {
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

        let groupId = req.body.id;

        var group = {
            name: req.body.name,
            creator: req.body.creator,
            note: req.body.note,
            members: req.body.members
        };
        
        groupsModel.findOneAndUpdate(
            { _id: groupId },
            group,
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
     * groupsController.update()
     */
    pendingAdd: function (req, res) {
        var groupId = req.body.id;

        var pending = {
            "email": req.body.email,
            "message": req.body.message,
            "name": req.body.name
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
     * groupsController.pendingAdd()
     */
    pendingAccept: function (req, res) {
        var groupId = req.body.groupId;
        var pendingEmail = req.body.pendingEmail;
        var pendingId = req.body.pendingId;

        groupsModel.findOneAndUpdate(
            { _id: groupId },
            { $pull: { pendingMembers: { _id: pendingId } } },
            function (err, groups) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting groups.',
                        error: err
                    });
                }
                else {
                    groupsModel.findOneAndUpdate(
                        { _id: groupId },
                        { $push: { members: pendingEmail } },
                        function (err, groups) {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Error when getting groups.',
                                    error: err
                                });
                            }
                        });
                }
                return res.status(201).json(groups);
            });
    },

    pendingReject: function (req, res) {
        var groupId = req.body.groupId;
        var pendingId = req.body.pendingId;

        groupsModel.findOneAndUpdate(
            { _id: groupId },
            { $pull: { pendingMembers: { _id: pendingId } } },
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
    },

    removeMember: function (req, res) {
        var groupId = req.body.id;
        var member = req.body.member;
        groupsModel.findOneAndUpdate(
            { _id: groupId },
            { $pull: { members: member } },
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

    getGroupsByEmail: function(req,res){
      let email = req.params.email;

      groupsModel.find({ $or: [ {members: email}, {creator: email}]}, function(err, groups){
          if (err) {
              return res.status(500).json({
                  message: 'Error when getting groups.',
                  error: err
              });
          }

          return res.status(201).json(groups);
      });


    },
};
