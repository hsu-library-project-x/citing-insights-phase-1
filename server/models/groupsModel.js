var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var groupsSchema = new Schema({
	'creator' : String,
	'name' : String,
	'note' : String,
	'members' : Array,
	'pendingMembers': [{
		email:String,
		message: String
	}]
});

module.exports = mongoose.model('groups', groupsSchema);
