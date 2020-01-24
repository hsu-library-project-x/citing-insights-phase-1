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
	'doi': String,
	'citationVelocity': String,
	'influentialCitationCount': String,
	's2PaperUrl': String,
	'intextCitations': Array,
	'arxivid': String,
	'paper_id': {
		type: Schema.Types.ObjectId,
		ref: 'paper'
	},
	'evaluated': Boolean
});

module.exports = mongoose.model('citation', citationSchema);