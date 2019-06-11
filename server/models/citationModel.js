var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var citationSchema = new Schema({
	'author' : String,
	'date' : String,
	'editor' : String,
	'edition' : String,
	'volume' : String,
	'pages' : String,
	'type' : String,
	'title' : String,
	'annotation' : Array,
	'doi' : String,
	'paper_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'paper'
	}
});

module.exports = mongoose.model('citation', citationSchema);
