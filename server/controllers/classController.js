var classModel = require('../models/classModel.js');

/**
 * classController.js
 *
 * @description :: Server-side logic for managing classs.
 */
module.exports = {

    /**
     * classController.list()
     */
    list: function (req, res) {
        classModel.find(function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class.',
                    error: err
                });
            }
            return res.json(classs);
        });
    },

    /**
     * classController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        classModel.findOne({_id: id}, function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class.',
                    error: err
                });
            }
            if (!class) {
                return res.status(404).json({
                    message: 'No such class'
                });
            }
            return res.json(class);
        });
    },

    /**
     * classController.create()
     */
    create: function (req, res) {
        var class = new classModel({
			name : req.body.name,
			user_id : req.body.user_id

        });

        class.save(function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating class',
                    error: err
                });
            }
            return res.status(201).json(class);
        });
    },

    /**
     * classController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        classModel.findOne({_id: id}, function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class',
                    error: err
                });
            }
            if (!class) {
                return res.status(404).json({
                    message: 'No such class'
                });
            }

            class.name = req.body.name ? req.body.name : class.name;
			class.user_id = req.body.user_id ? req.body.user_id : class.user_id;
			
            class.save(function (err, class) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating class.',
                        error: err
                    });
                }

                return res.json(class);
            });
        });
    },

    /**
     * classController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        classModel.findByIdAndRemove(id, function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the class.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
