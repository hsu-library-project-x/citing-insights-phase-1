var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var rubricSchema = new Schema({
	'name' : String,
	'cards' : Array,
	'user_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('rubric', rubricSchema);
