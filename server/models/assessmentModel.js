var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assessmentSchema = new Schema({
    'annotation': String,
    'user_id': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'citation_id': {
        type: Schema.Types.ObjectId,
        ref: 'citation'
    },
    'rubric_id': {
        type: Schema.Types.ObjectId,
        ref: 'rubric'
    },
    'rubric_card_index': Number
});

module.exports = mongoose.model('assessment', assessmentSchema);
