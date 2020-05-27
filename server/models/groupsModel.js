var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var groupsSchema = new Schema({
	'creator' : String,
	'name' : String,
	'note' : String,
	'members' : Array
});

module.exports = mongoose.model('groups', groupsSchema);
