var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var feedbackSchema = new Schema({
	'message' : String,
	'email' : String,
	'user_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('feedback', feedbackSchema);
