let configurationsModel = require('../models/configurationsModel');

module.exports = {

    /**
     * configurationsController.find()
     */
    list: function (req, res) {
        configurationsModel.find(function (err, configurations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting configurations.',
                    error: err
                });
            }
            return res.json(configurations);
        });
    }

};