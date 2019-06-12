const IncomingForm = require('formidable').IncomingForm;
const mongoose = require('mongoose');
const fs = require('fs');
const shell = require('shelljs')

var paperModel = require('./models/paperModel.js');


module.exports = function upload(req, res) {

  console.log('goin into it');
  var form = new IncomingForm();

  //Set the directory where uploads will be placed
  //Can be changed with fs.rename
  form.uploadDir = './fileUpload';

  //We want original extensions, for anystyle
  form.keepExtensions = true;

  //Either multipart or urlencoded
  form.type = 'multipart';

  form
    .on('file', (field, file) => {
      console.log('received');
      console.log(file.path);

      //Ghostscript strips pdf into raw text
      shell.exec('gs -sDEVICE=txtwrite -o output.txt ' + file.path);

      //the replace functions just get rid of carriage returns
      var raw_text = { "body": fs.readFileSync('output.txt').toString().replace(/\r+/g, "").replace(/\n+/g, ""), "title" : null, "name": null };  

      var paper = new paperModel(raw_text);

      paper.save(function (err, paper) {
        if (err) {
          return res.status(500).json({
            message: 'Error when creating paper',
            error: err
          });
        }
        return res.status(201).json(paper);
      });

    })
    .on('end', () => {
      console.log('ending');
    })
  form.parse(req);
}
