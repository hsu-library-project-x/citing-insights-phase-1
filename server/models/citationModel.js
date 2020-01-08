var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citationSchema = new Schema({
	'author': [{
		'family': String,
		'given': String
	}],
	'date': [
		String
	],
	'editor': [{
		'family': String,
		'given': String
	}],
	'edition': [
		String
	],
	'volume': [
		String
	],
	'pages': [
		String
	],
	'type': String,
	'title': [
		String
	],
	'annotation': String,
	'doi':String,
	'citationVelocity': String,
	'influentialCitationCount': String,
	's2PaperUrl': String,
	'rubricId': { type: Schema.Types.ObjectId, ref: 'rubric' },
	'rubricTitle': String,
	'rubricScore': String,
	'intextCitations': Array,
	'arxivid': String,
	'annotation': String,
	'paper_id': {
		type: Schema.Types.ObjectId,
		ref: 'paper'
	},
	'evaluated' : Boolean
});

module.exports = mongoose.model('citation', citationSchema);