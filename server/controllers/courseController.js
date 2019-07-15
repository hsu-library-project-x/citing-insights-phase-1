var courseModel = require('../models/courseModel.js');

/**
 * courseController.js
 *
 * @description :: Server-side logic for managing courses.
 */
module.exports = {

    /**
     * courseController.list()
     */
    list: function (req, res) {
        courseModel.find(function (err, courses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            }
            return res.json(courses);
        });
    },

    /**
     * courseController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        courseModel.findOne({_id: id}, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            }
            if (!course) {
                return res.status(404).json({
                    message: 'No such course'
                });
            }
            return res.json(course);
        });
    },

    /**
     * courseController.create()
     */
    create: function (req, res) {
        console.log("test output");
        console.log(req.body);
        var course = new courseModel({
			name : req.body.name,
            course_note: req.body.note,
			user_id : req.body.user_id

        });

        course.save(function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating course',
                    error: err
                });
            }
            return res.status(201).json(course);
        });
    },

    /**
     * courseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        courseModel.findOne({_id: id}, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course',
                    error: err
                });
            }
            if (!course) {
                return res.status(404).json({
                    message: 'No such course'
                });
            }

            course.name = req.body.name ? req.body.name : course.name;
			course.user_id = req.body.user_id ? req.body.user_id : course.user_id;
			
            course.save(function (err, course) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating course.',
                        error: err
                    });
                }

                return res.json(course);
            });
        });
    },

    /**
     * courseController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        courseModel.findByIdAndRemove(id, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the course.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
