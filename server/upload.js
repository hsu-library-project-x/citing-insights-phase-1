const IncomingForm = require("formidable").IncomingForm;
const mongoose = require("mongoose");
const fs = require("fs");
const pdf = require('pdf-parse');
const pdfreader = require('pdfreader');
const shell = require("shelljs");

//let Chance = require("chance");
// let chance = new Chance();

let paperModel = require("./models/paperModel.js");
let citationModel = require("./models/citationModel.js");

//For use with CrossRef + SemanticScholar calls
const controller = require("./controllers/webCallsController.js");

let check = true;

function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    };
    return pageData.getTextContent(render_options)
        .then(function(textContent) {
            let lastY, text = '';
            for (let item of textContent.items) {
                // console.log('-------------------');
                // console.log(item.transform[5]);
                // console.log(textContent.items.indexOf(item));
                // console.log(item);
                // console.log('-------------------');
                if (lastY === item.transform[5] || !lastY){
                    text += item.str;
                }
                else{
                    text += '\n' + item.str;
                }
                lastY = item.transform[5];
            }
            return text;
        });

}


let options = {
    pagerender: render_page
};

module.exports = function upload(req, res) {


    let form = new IncomingForm();

    //Set the directory where uploads will be placed
    //Can be changed with fs.rename
    form.uploadDir = "./fileUpload";

    //We want original extensions, for anystyle
    form.keepExtensions = true;

    //Either multipart or urlencoded
    form.type = "multipart";

    form
        .on("file", (field, file) => {
            function printRows() {
                Object.keys(rows) // => array of y-positions (type: float)
                    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
                    .forEach(y => console.log((rows[y] || []).join("")));
            }
            let textByLine = fs.readFileSync(file.path);
            let body="";
            var rows = {};
            new pdfreader.PdfReader().parseFileItems(file.path, function(
                err,
                i
            ) {
                if ( (!i) || (i.page)) {
                    // end of file, or page
                    printRows();
                    rows = {}; // clear rows for next page
                } else if (i.text) {
                    // accumulate text items into rows object, per line
                    (rows[i.y] = rows[i.y] || []).push(i.text);
                }
            });

            pdf(textByLine, options).then((data)=>{
                body = JSON.stringify(data.text);
                // console.log(body);
                let raw_text = {
                    "body": body,
                    "pdf": textByLine,
                    "title": file.name,
                    "name": null,
                    "assignment_id": field
                };

                // we actually want to set a variable to see whether or not things happenned successfully
                // instantiate the paper and save to db
                let paper = new paperModel(raw_text);

                paper.save(function (err, paper) {
                    if (err) {
                        check = false;
                        console.log(err);
                    }
                });

                /*
                citations start
                */

                let json_path = "./tmp/json";

                //Need to now run anystyle on pdf
                shell.exec("anystyle -w -f json find " + file.path + " " + json_path);

                //successful parse
                let json_file = require(
                    json_path + file.path
                        .replace("fileUpload", "")
                        .replace(".pdf", ".json")
                );

                let full_json_path = json_path + file.path
                    .replace("fileUpload", "")
                    .replace(".pdf", ".json");

                //Need a default citation that will represent the entire paper, to be envaluated with a rubric later
                //(Overall Student Paper)
                let defaultCitation = {
                    "author": [
                        {
                            "family": "Overall Student Paper"
                        }
                    ],
                    "paper_id": paper.id
                };
                let studentPaperCtitaion = new citationModel(defaultCitation);
                studentPaperCtitaion.save(function (err, studentPaperCtitaion) {
                    if (err) {
                        check = false;
                        console.log(err);
                    }
                });

                //Assign all citations to the paper.
                for (index in json_file) {
                    let citation = json_file[index];

                    //Give each citation the paper's id
                    citation.paper_id = paper.id;

                    //Do web calls here for Semantic Scholar MetaData
                    let author = controller.checkAuthor(citation.author);
                    let title = controller.checkTitle(citation.title);
                    let URL = "https://api.crossref.org/works?query.author=" + author + "&query.bibliographic=" + title +  "&mailto=citinginsightsheroku@gmail.com&rows=1&offset=0&select=DOI";

                    let dummy = controller.getData(URL, citation).then((result) => {
                    })
                }


                shell.exec('rm ' + full_json_path);
                shell.exec('rm ' + file.path);
            })
            .catch((error)=>{
                console.log(error);
            });


        })
        .on("end", () => {
            //we want to check a bool set in paper.save to see if we cool
            if (check) {
                res.send("we cool");
            }
            else {
                res.send("we Not cool");
            }
        });
    form.parse(req);
};
