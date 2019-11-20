const IncomingForm = require("formidable").IncomingForm;
const mongoose = require("mongoose");
const fs = require("fs");
const shell = require("shelljs");

var Chance = require("chance");
var chance = new Chance();

var paperModel = require("./models/paperModel.js");
var citationModel = require("./models/citationModel.js");

var check = true;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
  }

module.exports = function upload(req, res) {

    console.log("goin into it");
    var form = new IncomingForm();

    //Set the directory where uploads will be placed
    //Can be changed with fs.rename
    form.uploadDir = "./fileUpload";

    //We want original extensions, for anystyle
    form.keepExtensions = true;

    //Either multipart or urlencoded
    form.type = "multipart";

    console.log('attempting to print params');
    //console.log(req.headers);

    form
        .on("file", (field, file) => {

            // this length be increased if there are collisions
            var file_name = chance.string({
                pool: "abcdefghijklmnopqrstuvwxyz",
                length: 10
            });
            console.log('attempting to print field');
            console.log(field);

            //Ghostscript strips pdf into raw text
            //var txt_path = __dirname + "/tmp/txt/" + file_name + ".txt"
            //console.log(txt_path);

            //shell.exec("gs -sDEVICE=txtwrite -o " + txt_path + " " + file.path);


            //the replace functions just get rid of carriage returns

            var textByLine = fs.readFileSync(file.path);

            var raw_text = {
                "body": "",
                "pdf": textByLine,
                "title": file.name,
                "name": null,
                "assignment_id": field
            };
            // we actually want to set a variable to see whether or not things happenned successfully
            // instantiate the paper and save to db
            var paper = new paperModel(raw_text);

            paper.save(function (err, paper) {
                if (err) {
                    check = false;
                    console.log(err);
                }
            });


            //** citations start */

            var json_path = "./tmp/json";

            //Need to now run anystyle on pdf
            shell.exec("anystyle -w -f json find " + file.path + " " + json_path);

            //successful parse
            var json_file = require(
                json_path + file.path
                    .replace("fileUpload", "")
                    .replace(".pdf", ".json")
            );

            var full_json_path = json_path + file.path
                .replace("fileUpload", "")
                .replace(".pdf", ".json");


            for (index in json_file) {
                var citation = new citationModel(json_file[index]);
                console.log(citation);
                citation.set({ "paper_id": paper.id });

                //// This section has been moved from citationController /////
                var author_name = "";
                if (citation.author.length > 0 && "given" in citation.author[0] && "family" in citation.author[0]) {
                    author_name = citation.author[0]["family"] + "+" + citation.author[0]["given"];
                }
                var title_name = "";
                if (citation.title.length > 0) {
                    title_name = citation.title[0];
                }

                console.log(author_name);
                console.log(title_name);

                var json_obj = JSON.parse(Get("https://api.crossref.org/works?query.author=" + author_name + "&query.bibliographic=" + title_name + '&mailto=citinginsightsheroku@gmail.com'));
                ///////////////////////////////////////////////////////////
                console.log(json_obj);
                citation.save(function (err, citation) {
                    if (err) {
                        check = false;
                        console.log(err);
                    }
                })
            }

            console.log(full_json_path + '\n' + file.path);

            shell.exec('rm ' + full_json_path);
            shell.exec('rm ' + file.path);
            //  shell.exec('rm ' + txt_path);

            //after creating a citation model, save to db
        })
        .on("end", () => {
            //we want to check a bool set in paper.save to see if we cool
            if (check) {
                res.send("we cool");
            }
            else {
                res.send("we Not cool");
            }
            console.log("ending");
            //shell.exec('rm ' + txt_path);
        });
    form.parse(req);
}
