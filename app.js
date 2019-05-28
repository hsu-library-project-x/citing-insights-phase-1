const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
let shell = require('shelljs');
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

//file reader
var fs = require('fs');



// even though the command is in a conditional, it will still do the processing
// in the future we need to know which paper to process
// We need to update the url to pass the name(id?) of paper that needs processing

app.get('/process_paper', function (req, res) {
  if (shell.exec('anystyle -w -f json find samplebibliography.pdf  json').code == 0) {
    res.json(JSON.stringify({"status": 200}));
  } else {
    res.json(JSON.stringify({"status": 400}));
  }
});

app.get('/get_paper', function (req, res) {
  shell.exec('gs -sDEVICE=txtwrite -o output.txt samplebibliography.pdf');
  // the replace functions just get rid of carriage returns 
  res.json(JSON.stringify({"raw": fs.readFileSync('output.txt').toString().replace(/\r+/g, "").replace(/\n+/g, "") }));
});

app.get('/get_citations', function (req, res) {
  const data = require('./json/samplebibliography.json')
  res.json(data);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
