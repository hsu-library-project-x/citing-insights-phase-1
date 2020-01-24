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
    },

    create: function(req,res){
        let  configuration = new configurationsModel({
        primaryColor : req.body.primaryColor,
        secondaryColor : req.body.secondaryColor,
        institutionName : req.body.institutionName,
        oneSearchUrl: req.params.oneSearchUrl
        });

        configuration.save(function (err, configuration) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating assignment',
                    error: err
                });
            }
            return res.status(201).json(configuration);
        });
    }

};