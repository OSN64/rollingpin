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
	login: function(req,res){
	    res.view({
 			partials: {
 				head: '../partials/head',
 				tail: '../partials/tail',
 			},
 		title:"Login"
 		});
	  },
// if (err) res.redirect('/login');
    process: function (req, res) {
	    var bcrypt = require('bcrypt');

	    User.findOneByEmail(req.body.email).done(function (err, user) {
	      if (err) res.json({ error: 'DB error' }, 500);

	      if (user) {
	        bcrypt.compare(req.body.password, user.password, function (err, match) {
	          if (err) res.json({ error: 'Server error' }, 500);

	          if (match) {
	            // password match
	            req.session.user = user.id;
	            req.session.authenticated = true;
	            res.json(user);
	          } else {
	            // invalid password
	            if (req.session.user) req.session.user = null;
	            res.json({ error: 'Invalid password' }, 400);
	          }
	        });
	      } else {
	        res.json({ error: 'User not found' }, 404);
	      }
	    });
  },
  logout: function(req, res) {
    req.session.user = null;
    req.session.authenticated = false;
    res.redirect("/");
  },
  create : function  (req, res) {
		var Model = User;
		// // Create monolithic parameter object
		var params = req.params.all();
		// 		// Create user using params
		User.create(params, function(err, user) {
			
		// 	// TODO: differentiate between waterline-originated validation errors
		// 	//			and serious underlying issues
		// 	// TODO: Respond with badRequest if an error is encountered, w/ validation info
			if (err) return res.serverError(err);

			res.status(201);
			console.log("user: " + user.email +" just loged in")
			// return res.json(user);
			req.session.user = user.id;
	        req.session.authenticated = true;
			return res.view("home/index",{
		 			partials: {
		 				head: '../partials/head',
		 				tail: '../partials/tail',
		 			},
		 				username: user.email
		 			});

		});
		
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
