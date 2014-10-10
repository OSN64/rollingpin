/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {
 	registration: function(req,res){
 		res.view("user/registration",{
 			partials: {
 				head: '../partials/head',
 				tail: '../partials/tail',
 			},
 			title:"Registration"
 		});
 	},
 	login: function(req,res){
 		res.view("user/login",{
 			partials: {
 				head: '../partials/head',
 				tail: '../partials/tail',
 			},
 			title:"Login"
 		});
 	},
 	process: function (req, res) {
 		var bcrypt = require('bcrypt');

 		User.findOneByEmail(req.body.email).done(function (err, user) {
 			if (err) {
 				req.session.flash = {err: { AuthenticationError: { server: 'DB Error'} }}
 				return res.redirect('/login');
 			}

 			if (user) {
 				bcrypt.compare(req.body.password, user.password, function (err, match) {
 					if (err) {
 						req.session.flash = {err: { AuthenticationError: { server: 'Server error'} }}
 						return res.redirect('/login');
 					}

 					if (match) {
 						// update online user
 						User.update({id: user.id},{online: true}).exec(function afterwards(err,updated){});
 						user.online = true;
			            // password match
						delete user.password; //delete the user password to return the user object
						
						req.session.user = user;
						req.session.authenticated = true;
						return res.redirect('/');
					} else {
			            // invalid password
			            req.session.user = null;
			            req.session.flash = {err: {Password: [ {data: "not valid"} ] }}
			            return res.redirect('/login');
			        }
			    });
 			} else {
 				req.session.flash = {err: {Email: [ {data: "not found"} ] }}
 				return res.redirect('/login');
 			}
 		});
},
logout: function(req, res) {
	if (req.session.user) {
		User.update({id: req.session.user.id},{online: false}).exec(function afterwards(err,updated){});
	};
	req.session.user = null;
	req.session.authenticated = false;
	res.redirect("/");
},
create : function  (req, res) {
	var Model = User;
		// // Create monolithic parameter object
		var params = req.params.all();
		// console.log(params);
		// Create user using params
		params['online'] = true;
		User.create(params, function(err, user) {
			
			// 	// TODO: differentiate between waterline-originated validation errors
			// 	//			and serious underlying issues
			// 	// TODO: Respond with badRequest if an error is encountered, w/ validation info
			if (err) {
				// return res.serverError(err);
				req.session.flash = {
					err: err.ValidationError
				}
				// console.log(err)

				return res.redirect('/register');

			}			
			res.status(201);
			delete user.password; //delete the user password to return the user object
			// console.log(user);

			req.session.user = user;
			req.session.authenticated = true;
			return res.redirect("/orderstart"); 
			// res.view("home/index",{
			// 	partials: {
			// 		head: '../partials/head',
			// 		tail: '../partials/tail',
			// 	},
			// 	username: user.email,
 		// 		title:"Home",
			// });

	});
		
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
   _config: {}

   
};
