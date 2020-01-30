'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Right now most of this info is being passed through as props. 
//TODO: only pass what we need
var userSchema = new Schema({
	'name': String,
	googleProvider: {
		type: {
			id: String,
			token: String
		},
		select: false
	}

});

userSchema.set('toJSON', { getters: true, virtuals: true });


userSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
	var that = this;
	//Try to find user
	// ( using google id right now)
	return this.findOne({
		'googleProvider.id': profile.id
	}, function (err, user) {
		// no user was found, lets create a new one
		if (!user) {
			var newUser = new that({
				name: profile.displayName,
				googleProvider: {
					id: profile.id,
					token: accessToken
				}
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