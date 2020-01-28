let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let configurationsSchema = new Schema({
    'primaryColor' : String,
    'secondaryColor' : String,
    'institutionName': String,
    'oneSearchUrl':String,
    'imageName': {
        type: String,
        default:"none",
        required: true
    },
    'imageData':{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('configurations', configurationsSchema);
