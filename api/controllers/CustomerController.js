/**
 * CustomerController
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
 		res.view("customer/registration",{
 			partials: {
 				head: '../partials/head',
 				tail: '../partials/tail',
 			},
 			title:"Customer Registration"
 		});
 	},
 	create : function  (req, res) {
		var params = req.params.all();
		Customer.create(params, function(err, customer) {
			if (err) {
				// return res.serverError(err);
				// return json error

			}			
			res.status(201);
			

			return res.redirect('/orderstart?phno' +customer.phoneno );
			
		});
		
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CustomerController)
   */
  _config: {}

  
};