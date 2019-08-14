'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Right now most of this info is being passed through as props. 
//TODO: only pass what we need
var userSchema = new Schema({
	'name': String,
	'email': {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	googleProvider: {
		type: {
			id: String,
			token: String
		},
		select: false
	},
	rubrics: [{
		type: Schema.Types.ObjectId,
		ref: 'rubric'
	}]

});

userSchema.set('toJSON', { getters: true, virtuals: true });


userSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
	var that = this;
	//Try to find user
	fetch('http://localhost:5000/rubrics')
	// ( using google id right now)
	return this.findOne({
		'googleProvider.id': profile.id
	}, function (err, user) {
		// no user was found, lets create a new one
		if (!user) {
			var newUser = new that({
				name: profile.displayName,
				email: profile.emails[0].value,
				googleProvider: {
					id: profile.id,
					token: accessToken
				},
				rubrics: [
					ObjectId("5d5481b4ef4362ef5d11a547"),
					ObjectId("5d548271ef4362ef5d11a548")
				]
			});

			newUser.save(function (error, savedUser) {
				if (error) {
					console.log(error);
				}
				return cb(error, savedUser);
			});
		} else {
			return cb(err, user);
		}
	});
};


module.exports = mongoose.model('user', userSchema);


//return db