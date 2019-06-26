var in-text-citationModel = require('../models/in-text-citationModel.js');

/**
 * in-text-citationController.js
 *
 * @description :: Server-side logic for managing in-text-citations.
 */
module.exports = {

    /**
     * in-text-citationController.list()
     */
    list: function (req, res) {
        in-text-citationModel.find(function (err, in-text-citations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting in-text-citation.',
                    error: err
                });
            }
            return res.json(in-text-citations);
        });
    },

    /**
     * in-text-citationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        in-text-citationModel.findOne({_id: id}, function (err, in-text-citation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting in-text-citation.',
                    error: err
                });
            }
            if (!in-text-citation) {
                return res.status(404).json({
                    message: 'No such in-text-citation'
                });
            }
            return res.json(in-text-citation);
        });
    },

    /**
     * in-text-citationController.create()
     */
    create: function (req, res) {
        var in-text-citation = new in-text-citationModel({
			body : req.body.body,
			annotation : req.body.annotation,
			citation_id : req.body.citation_id

        });

        in-text-citation.save(function (err, in-text-citation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating in-text-citation',
                    error: err
                });
            }
            return res.status(201).json(in-text-citation);
        });
    },

    /**
     * in-text-citationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        in-text-citationModel.findOne({_id: id}, function (err, in-text-citation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting in-text-citation',
                    error: err
                });
            }
            if (!in-text-citation) {
                return res.status(404).json({
                    message: 'No such in-text-citation'
                });
            }

            in-text-citation.body = req.body.body ? req.body.body : in-text-citation.body;
			in-text-citation.annotation = req.body.annotation ? req.body.annotation : in-text-citation.annotation;
			in-text-citation.citation_id = req.body.citation_id ? req.body.citation_id : in-text-citation.citation_id;
			
            in-text-citation.save(function (err, in-text-citation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating in-text-citation.',
                        error: err
                    });
                }

                return res.json(in-text-citation);
            });
        });
    },

    /**
     * in-text-citationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        in-text-citationModel.findByIdAndRemove(id, function (err, in-text-citation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the in-text-citation.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
