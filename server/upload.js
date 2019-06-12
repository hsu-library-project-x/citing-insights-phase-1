const IncomingForm = require('formidable').IncomingForm;
const mongoose = require('mongoose');
const fs = require('fs');
const shell = require('shelljs')

var Chance = require('chance');
var chance = new Chance();


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

      // this length be increased if there are collisions
      var file_name = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 10});

      //Ghostscript strips pdf into raw text
      var txt_path = './tmp/txt/' + file_name + '.txt'
      shell.exec('gs -sDEVICE=txtwrite -o ' + txt_path + ' ' + file.path);
      

      //the replace functions just get rid of carriage returns
      var raw_text = { "body": fs.readFileSync(txt_path).toString().replace(/\r+/g, "").replace(/\n+/g, ""), "title" : null, "name": null };  

      var paper = new paperModel(raw_text);

      paper.save(function (err, paper) {

        // we actually want to set a variable to see whether or not things happenned successfully

        /*
        if (err) {
          return res.status(500).json({
            message: 'Error when creating paper',
            error: err
          });
        }
        return res.status(201).json(paper);
        */
      });
    })
    .on('end', () => {
      //we want to check a bool set in paper.save to see if we cool
      res.send("we cool");
      console.log('ending');
      //shell.exec('rm ' + txt_path);
    })
  form.parse(req);
}
