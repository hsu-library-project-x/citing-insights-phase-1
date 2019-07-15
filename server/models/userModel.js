'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var db = mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
	

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
		}
	});

	userSchema.set('toJSON', { getters: true, virtuals: true });


	userSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
		var that = this;
		//Try to find user
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

	mongoose.model('user', userSchema);


	return db;
};

