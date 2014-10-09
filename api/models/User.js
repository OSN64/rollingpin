/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

 	attributes: {
 		name: {
 			type: 'string',
 			unique: true, 			
 			required: true
 		},
 		email: {
 			type: 'string',
 			unique: true, 			
      required: true
 		},
 		password: {
 			type: 'string',
 			required: true,
 			minLength: 6
 		},
 		admin: {
 			type: 'boolean',
 			defaultsTo: false
 		},
 		online: {
 			type: 'boolean',
 			defaultsTo: false
 		},

 	},

 	beforeCreate: function (attrs, next) {
 		var bcrypt = require('bcrypt');

        // This checks to make sure the password and password confirmation match before creating record
        if (!attrs.password || attrs.password != attrs.pasConfirmation) {
        	return next({err: ["Password doesn't match password confirmation."]});
        }
    	delete attrs.pasConfirmation; // so that it does not store the confirmation

        //hashes password befor creation
        bcrypt.genSalt(10, function(err, salt) {
        	if (err) return next(err);

        	bcrypt.hash(attrs.password, salt, function(err, hash) {
        		if (err) return next(err);

        		attrs.password = hash;
        		next();
        	});
        });

    },
    toJSON: function() {
      var obj = this.toObject();
      // Remove the password object value
      delete obj.password;
      // return the new object without password
      return obj;
    },


 // setOnline: function (attrs, next) {
 // 	console.log("set online val" + attr.online)
 // 	next();

 // },



};
