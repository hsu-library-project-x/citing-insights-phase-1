var rubricModel = require('../models/rubricModel.js');

/**
 * rubricController.js
 *
 * @description :: Server-side logic for managing rubrics.
 */
module.exports = {

    /**
     * rubricController.list()
     */
    list: function (req, res) {
        rubricModel.find(function (err, rubrics) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting rubric.',
                    error: err
                });
            }
            return res.json(rubrics);
        });
    },

    /**
     * rubricController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        rubricModel.findOne({_id: id}, function (err, rubric) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting rubric.',
                    error: err
                });
            }
            if (!rubric) {
                return res.status(404).json({
                    message: 'No such rubric'
                });
            }
            return res.json(rubric);
        });
    },

    /**
     * rubricController.create()
     */
    create: function (req, res) {
        var rubric = new rubricModel({
			name : req.body.name,
			cards : req.body.cards,
			user_id : req.body.user_id

        });

        rubric.save(function (err, rubric) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating rubric',
                    error: err
                });
            }
            return res.status(201).json(rubric);
        });
    },

    /**
     * rubricController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        rubricModel.findOne({_id: id}, function (err, rubric) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting rubric',
                    error: err
                });
            }
            if (!rubric) {
                return res.status(404).json({
                    message: 'No such rubric'
                });
            }

            rubric.name = req.body.name ? req.body.name : rubric.name;
			rubric.cards = req.body.cards ? req.body.cards : rubric.cards;
			rubric.user_id = req.body.user_id ? req.body.user_id : rubric.user_id;
			
            rubric.save(function (err, rubric) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating rubric.',
                        error: err
                    });
                }

                return res.json(rubric);
            });
        });
    },

    /**
     * rubricController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        rubricModel.findByIdAndRemove(id, function (err, rubric) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the rubric.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
