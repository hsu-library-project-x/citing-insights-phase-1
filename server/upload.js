const IncomingForm = require('formidable').IncomingForm;
const mongoose = require('mongoose');
const fs = require('fs');
const shell = require('shelljs')
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
      res.json(JSON.stringify({ "raw": fs.readFileSync('output.txt').toString().replace(/\r+/g, "").replace(/\n+/g, "") }));  
    })
    .on('end', () => {
      console.log('ending');
    })
  form.parse(req);
}
