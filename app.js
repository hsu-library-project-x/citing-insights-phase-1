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

app.get('/process_paper/:prof/:name', function (req, res) {
  if (shell.exec('anystyle -w -f json find ./json/' + req.params.prof + '/'+ req.params.name + '.pdf json/' + req.params.prof).code == 0) {
    res.status(200).send("Success");
  } else {
    res.status(400).send("Failure");
  }
});

app.get('/get_paper/:prof/:name', function (req, res) {
  // we may want to change how this path is structured. 
  // im imagining each prof having a directory that holds all of their papers.
  // ideally the path wouldnt matter because we would query from a dtabase instead. 
  shell.exec('gs -sDEVICE=txtwrite -o output.txt ./json/' + req.params.prof + '/' + req.params.name  + '.pdf');
  // the replace functions just get rid of carriage returns 
  res.json(JSON.stringify({"raw": fs.readFileSync('output.txt').toString().replace(/\r+/g, "").replace(/\n+/g, "") }));
});


app.get('/get_citations/:prof/:name', function (req, res) {
  const data = require('./json/' + req.params.prof + '/' + req.params.name + '.json')
  res.json(data);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
