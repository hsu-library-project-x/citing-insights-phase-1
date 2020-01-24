let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let configurationsSchema = new Schema({
    'primaryColor' : String,
    'secondaryColor' : String,
    'institutionName': String,
    'oneSearchUrl':String,
});

module.exports = mongoose.model('configurations', configurationsSchema);
