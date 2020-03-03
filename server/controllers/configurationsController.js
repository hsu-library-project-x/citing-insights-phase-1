let configurationsModel = require('../models/configurationsModel');
const IncomingForm = require("formidable").IncomingForm;
const fs = require("fs");
var Jimp = require('jimp');


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

    create: function (req, res) {
        let form = new IncomingForm();
        form.uploadDir = "./fileUpload";
        form.keepExtensions = true;
        form.type = "multipart";
        form.parse(req);

        let newData = {};
        let newItem = {};

        form.on('field', function (name, value) {
            newData[name] = value;

        });

        form.on('file', function (name, file) {

            let newImg = fs.readFileSync(file.path);


            newItem = {
                name: file.name,
                contentType: file.mimetype,
                size: file.size,
                img: Buffer(newImg, 'base64')
            };
        });

        form.on('error', function (err) {
            console.log('error');
            console.log(err);
        });

        form.on("end", () => {
            let configuration = new configurationsModel({
                primaryColor: newData['primaryColor'],
                secondaryColor: newData['secondaryColor'],
                institutionName: newData['institutionName'],
                oneSearchUrl: newData['oneSearchUrl'],
                images: newItem,
            });

            configuration.save(function (err, configuration) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when configuring',
                        error: err
                    });
                }
                return res.status(201).json(configuration);
            });
        });
    }

};