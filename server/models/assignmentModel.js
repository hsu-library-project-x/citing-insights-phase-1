var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var assignmentSchema = new Schema({
	'name' : String,
	'note' : String,
	'class_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'class'
	},
	'user_id': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('assignment', assignmentSchema);
