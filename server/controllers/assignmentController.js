var assignmentModel = require('../models/assignmentModel.js');
let paperModel = require('../models/paperModel.js');
let citationModel = require('../models/citationModel.js');

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
        if (req.session.user !== undefined) {
            assignmentModel.find(function (err, assignments) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting assignment.',
                        error: err
                    });
                }
                return res.json(assignments);
            });
        }
    },

    //assignmentController.get_groups
    get_groups: function(req,res){
        let id = req.params.id;

        if (req.session.user !== undefined) {
            assignmentModel.findOne({_id: id}, 'group_ids', function (err, groupIds) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting assignment.',
                        error: err
                    });
                }

                return res.status(201).json(groupIds);


            });
        }
    },

    //assignmentController.by_class_id

    by_user_id: function (req, res) {
        if (req.session.user !== undefined) {

            var id = req.params.id;
            assignmentModel.find({ user_id: id }, function (err, assignment) {
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
                console.log(assignment);
                return res.json(assignment);
            });
        }
    },

    by_class_id: function (req, res) {
        if (req.session.user !== undefined) {

            var id = req.params.id;
            assignmentModel.find({ class_id: id }, function (err, assignment) {
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
        }
    },



    /**
     * assignmentController.show()
     */
    show: function (req, res) {
        if (req.session.user !== undefined) {

            var id = req.params.id;
            assignmentModel.findOne({ _id: id }, function (err, assignment) {
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
        }
    },

    /**
     * assignmentController.create()
     */
    create: function (req, res) {
        if (req.session.user !== undefined) {

            var assignment = new assignmentModel({
                name: req.body.name,
                note: req.body.note,
                class_id: req.body.class_id,
                user_id: req.params.user_id,

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
        }
    },

    /**
     * assignmentController.update()
     */
    update: function (req, res) {
        if (req.session.user !== undefined) {

            let id = req.params.id;
            console.log(id);

            assignmentModel.findOneAndUpdate({ _id: id },
                {  $push: {group_ids: req.body} }, function (err, assignment) {
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

                    return res.status(201).json(assignment);
                });

        }
    },

    removeGroup: function (req, res) {
        if (req.session.user !== undefined) {

            let id = req.params.id;

            assignmentModel.findOneAndUpdate({ _id: id },
                {$pull: {group_ids: req.body._id}}, function (err, assignment) {
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


                    return res.status(202).json(assignment);
                });

        }
    },

    /**
     * assignmentController.remove()
     */
    remove: function (req, res) {
        if (req.session.user !== undefined) {

            var id = req.params.id;


            paperModel.find({ 'assignment_id': id }, function (err, papers) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when finding the papers of the assignment.',
                        error: err
                    });
                }

                for (let j = 0; j < papers.length; j++) {
                    citationModel.deleteMany({ 'paper_id': papers[j]['_id'] }, function (err, citations) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when deleting the citations of the paper.',
                                error: err
                            });
                        }
                    });
                }
            });

            paperModel.deleteMany({ 'assignment_id': id }, function (err, papers) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when deleting the papers of the assignment.',
                        error: err
                    });
                }
            });

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
    }
};
