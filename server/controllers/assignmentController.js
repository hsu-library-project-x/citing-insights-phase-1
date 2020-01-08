var assignmentModel = require('../models/assignmentModel.js');

/**
 * assignmentController.js
 *
 * @description :: Server-side logic for managing assignments.
 */
module.exports = {

    /**
     * assignmentController.list()
     */
    list: function (req, res) {
        assignmentModel.find(function (err, assignments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting assignment.',
                    error: err
                });
            }
            return res.json(assignments);
        });
    },

    //assignmentController.by_class_id

    by_user_id: function (req, res) {
        var id = req.params.id;
        assignmentModel.find({user_id: id}, function (err, assignment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting assignment.',
                    error: err
                });
            }
            if (!assignment) {
                return res.status(404).json({
                    message: 'No such assignment'
                });
            }
            return res.json(assignment);
        });
    },

    by_class_id: function (req, res) {
        var id = req.params.id;
        assignmentModel.find({class_id: id}, function (err, assignment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting assignment.',
                    error: err
                });
            }
            if (!assignment) {
                return res.status(404).json({
                    message: 'No such assignment'
                });
            }
            return res.json(assignment);
        });
    },



    /**
     * assignmentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        assignmentModel.findOne({_id: id}, function (err, assignment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting assignment.',
                    error: err
                });
            }
            if (!assignment) {
                return res.status(404).json({
                    message: 'No such assignment'
                });
            }
            return res.json(assignment);
        });
    },

    /**
     * assignmentController.create()
     */
    create: function (req, res) {
        var assignment = new assignmentModel({
			name : req.body.name,
            note : req.body.note,
            class_id : req.body.class_id,
            user_id: req.params.user_id
        });

        assignment.save(function (err, assignment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating assignment',
                    error: err
                });
            }
            return res.status(201).json(assignment);
        });
    },

    /**
     * assignmentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        assignmentModel.findOne({_id: id}, function (err, assignment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting assignment',
                    error: err
                });
            }
            if (!assignment) {
                return res.status(404).json({
                    message: 'No such assignment'
                });
            }

            assignment.name = req.body.name ? req.body.name : assignment.name;
			assignment.class_id = req.body.class_id ? req.body.class_id : assignment.class_id;
			
            assignment.save(function (err, assignment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating assignment.',
                        error: err
                    });
                }

                return res.json(assignment);
            });
        });
    },

    /**
     * assignmentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        
        assignmentModel.findByIdAndRemove(id, function (err, assignment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the assignment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
