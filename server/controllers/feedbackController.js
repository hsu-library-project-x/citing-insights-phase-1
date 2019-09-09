var feedbackModel = require('../models/feedbackModel.js');

/**
 * feedbackController.js
 *
 * @description :: Server-side logic for managing feedbacks.
 */
module.exports = {

    /**
     * feedbackController.list()
     */
    list: function (req, res) {
        feedbackModel.find(function (err, feedbacks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting feedback.',
                    error: err
                });
            }
            return res.json(feedbacks);
        });
    },

    /**
     * feedbackController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        feedbackModel.findOne({_id: id}, function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting feedback.',
                    error: err
                });
            }
            if (!feedback) {
                return res.status(404).json({
                    message: 'No such feedback'
                });
            }
            return res.json(feedback);
        });
    },

    /**
     * feedbackController.create()
     */
    create: function (req, res) {
        var feedback = new feedbackModel({
			message : req.body.message,
			email : req.body.email,
			user_id : req.body.user_id

        });

        feedback.save(function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating feedback',
                    error: err
                });
            }
            return res.status(201).json(feedback);
        });
    },

    /**
     * feedbackController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        feedbackModel.findOne({_id: id}, function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting feedback',
                    error: err
                });
            }
            if (!feedback) {
                return res.status(404).json({
                    message: 'No such feedback'
                });
            }

            feedback.message = req.body.message ? req.body.message : feedback.message;
			feedback.email = req.body.email ? req.body.email : feedback.email;
			feedback.user_id = req.body.user_id ? req.body.user_id : feedback.user_id;
			
            feedback.save(function (err, feedback) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating feedback.',
                        error: err
                    });
                }

                return res.json(feedback);
            });
        });
    },

    /**
     * feedbackController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        feedbackModel.findByIdAndRemove(id, function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the feedback.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
