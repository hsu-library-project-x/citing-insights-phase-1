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

async function callback(err){
    if(err) {
        console.log(err);
        return;
    }
    else return;
}

async function readlines(buffer, xwidth) {
    return new Promise((resolve, reject) => {
        var pdftxt = new Array();
        var pg = 0;
        new pdfreader.PdfReader().parseBuffer(buffer, function(err, item) {
            if (err) console.log("pdf reader error: " + err);
            else if (!item) {
                pdftxt.forEach(function(a, idx) {
                    pdftxt[idx].forEach(function(v, i) {
                        pdftxt[idx][i].splice(1, 2);
                    });
                });
                resolve(pdftxt);
            } else if (item && item.page) {
                pg = item.page - 1;
                pdftxt[pg] = [];
            } else if (item.text) {
                var t = 0;
                var sp = "";
                pdftxt[pg].forEach(function(val, idx) {
                    if (val[1] == item.y) {
                        if (xwidth && item.x - val[2] > xwidth) {
                            sp += " ";
                        } else {
                            sp = "";
                        }
                        pdftxt[pg][idx][0] += sp + item.text;
                        t = 1;
                    }
                });
                if (t == 0) {
                    pdftxt[pg].push([item.text, item.y, item.x]);
                }
            }
        });
    });
}

// async function getText(file){
//     console.log("GET TEXT");
//     return new pdfreader.PdfReader().parseBuffer(file, function(err, item) {
//         if (err) callback(err);
//         else if (!item) callback();
//         else if (item.text) console.log(item.text);
//     });
        // await new pdfreader.PdfReader().parseBuffer(file,  function(
        //     err,
        //     item
        //     ) {
        //     let rows ={};
        //     let body = [];
        //         if (err) callback(err);
        //         else if ((!item) || (item.page)) {
        //             console.log("chick a chick a");
        //             // end of file, or page
        //             if (item) {
        //                 console.log("i");
        //                 let toPush =  printRows(i.page);
        //                 console.log(toPush);
        //                  body.push(toPush);
        //             }
        //             rows = {}; // clear rows for next page
        //
        //         } else if (item.text) {
        //             console.log("boom chaka laka");
        //             // accumulate text items into rows object, per line
        //             (rows[item.y] = rows[item.y] || []).push(item.text);
        //         }
        //         console.log('-------------------');
        //         console.log(body);
        //         return body;
        //     });
        //
        // console.log("End");
// }

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



// module.exports = {
//        getData: async (file) => {
//        console.log('getData');
//        return await getText(file);
//     }
// };

module.exports ={
    getData: async (buffer) => {
        let lines = await readlines(buffer);
        lines = await JSON.parse(JSON.stringify(lines));
        return lines;
    }
};