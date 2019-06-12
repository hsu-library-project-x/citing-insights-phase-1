var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var paperSchema = new Schema({
	'title' : String,
	'name' : String,
	'assignment_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'assignment'
	}
});

module.exports = mongoose.model('paper', paperSchema);