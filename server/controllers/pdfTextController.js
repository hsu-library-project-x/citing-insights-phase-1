const fetch = require('node-fetch');
const pdfreader = require('pdfreader');
const paperModel = require("../models/paperModel.js");


async function printRows(rows) {
    Object.keys(rows) // => array of y-positions (type: float)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
        .forEach(y =>{
            console.log(rows[y] || []).join("");
            return ((rows[y] || []).join(""));
        });
}

async function getText(filepath){
    var rows = {};
    let body=[];
    console.log("GET TEXT BITCHES");
    function callback(err){
        if(err) {
            console.log(err);
            return;
        }
        else return;
    }
    await new pdfreader.PdfReader().parseFileItems(filepath, async function(
        err,
        i
    ) {
        if (err) callback(err);
        else if ((!i) || (i.page)) {
                // end of file, or page
                let toPush = await printRows(i.page);
                console.log("chick a chick a");
                console.log(toPush);
                body.push(toPush);
                rows = {}; // clear rows for next page

        } else if (i.text) {
                console.log("boom chaka laka");
                // accumulate text items into rows object, per line
                (rows[i.y] = rows[i.y] || []).push(i.text);
        }
            return await body;
    });


}

async function buildRaw(data, paper) {

    const buildRaw = new paperModel(paper);
    buildRaw.set({
        "body": await data,
    });
    return buildRaw;
}


async function savePdfText(json) {
    json.save(function (err, paper) {
        if (err) {
            console.log(err);
        }
    });
    return await json;
}



module.exports = {
       getData: async (file, paper) => {
        let data = await getText(file);
        return data;
    }
};