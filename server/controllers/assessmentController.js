var assessmentModel = require('../models/assessmentModel.js');

module.exports = {

    create: function (req, res) {

        var assessment = new assessmentModel({
            user_id: req.body.user_id,
            annotation: req.body.annotation,
            citation_id: req.body.citation_id,
            rubric_id: req.body.rubric_id,
            rubric_card_index: req.body.rubric_card_index,
        });

        assessment.save(function (err, assessment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating assessment',
                    error: err
                });
            }
            return res.status(201).json(assessment);
        });
    },
}