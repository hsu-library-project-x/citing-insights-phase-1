var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var courseSchema = new Schema({
	'name' : String,
	'coursenote': String,
	'user_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('course', courseSchema);
