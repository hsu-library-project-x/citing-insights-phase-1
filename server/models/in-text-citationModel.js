var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var inTextCitationSchema = new Schema({
	'body' : String,
	'annotation' : String,
	'citation_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'citation'
	}
});

module.exports = mongoose.model('in-text-citation', inTextCitationSchema);
