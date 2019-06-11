const IncomingForm = require('formidable').IncomingForm
var mongoose = require('mongoose');
var fs = require('fs');

module.exports = function upload(req, res) {
  var form = new IncomingForm()

  //access file with file.path
  form.on('file', (field, file) => {
    
    //store path of incoming file
    var file_name = file.path;

    //set directory for uploads
    form.uploadDir = "./tempJSON";
    
    //strip pdf's bibliography into Json, and store its code in check variable
    var check = shell.exec('anystyle -w -f json find' + file_name + 'tempJSON');

    //grab json
    var json = require('./tempJSON/' + file_name + '.json');
    
    console.log(JSON.stringify(json));
  });

  form.on('end', () => {
    res.json()
  });

  form.parse(req);
}