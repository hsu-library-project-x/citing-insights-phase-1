var paperModel = require('../models/paperModel.js');


/**
 * paperController.js
 *
 * @description :: Server-side logic for managing papers.
 */
module.exports = {

    /**
     * paperController.list()
     */
    list: function (req, res) {
        paperModel.find(function (err, papers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paper.',
                    error: err
                });
            }
            return res.json(papers);
        });
    },

    /**
     * paperController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        paperModel.findOne({_id: id}, function (err, paper) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paper.',
                    error: err
                });
            }
            if (!paper) {
                return res.status(404).json({
                    message: 'No such paper'
                });
            }
            return res.json(paper);
        });
    },

    by_assignment_id: function (req, res) {
        var id = req.params.id;
        paperModel.find({assignment_id: id}, "_id title",   function (err, paper) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paper.',
                    error: err
                });
            }
            if (!paper) {
                return res.status(404).json({
                    message: 'No such paper'
                });
            }
            return res.json(paper);
        });
    },
    /**
     * paperController.create()
     */
    create: function (req, res) {
        
        var paper = new paperModel({
			title : req.body.title,
			name : req.body.name,
			assignment_id : req.body.assignment_id,
        });

        paper.save(function (err, paper) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating paper',
                    error: err
                });
            }
            return res.status(201).json(paper);
        });
    },

    /**
     * paperController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        paperModel.findOne({_id: id}, function (err, paper) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paper',
                    error: err
                });
            }
            if (!paper) {
                return res.status(404).json({
                    message: 'No such paper'
                });
            }

            paper.title = req.body.title ? req.body.title : paper.title;
			paper.name = req.body.name ? req.body.name : paper.name;
			paper.assignment_id = req.body.assignment_id ? req.body.assignment_id : paper.assignment_id;
			
            paper.save(function (err, paper) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating paper.',
                        error: err
                    });
                }

                return res.json(paper);
            });
        });
    },

    /**
     * paperController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        paperModel.findByIdAndRemove(id, function (err, paper) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the paper.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
