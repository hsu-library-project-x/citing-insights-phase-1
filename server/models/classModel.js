var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var classSchema = new Schema({
	'name' : String,
	'user_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('class', classSchema);
