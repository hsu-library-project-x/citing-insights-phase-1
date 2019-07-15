var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var assignmentSchema = new Schema({
	'name' : String,
	'note' : String,
	'class_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'class'
	}
});

module.exports = mongoose.model('assignment', assignmentSchema);
