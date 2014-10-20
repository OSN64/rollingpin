/**
 * HomeController
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
 	index: function(req, res) {
 		var midnight = new Date();
 		midnight.setHours(0,0,0,0) // set date instance to midnight today
 		console.log("midnight: " + midnight)
 		// var fOQuery = Order.
 		var fOQuery = Order.find("").where({"createdAt": { '>=': midnight,'<=' : new Date()}});
 		fOQuery.exec(function (err,orders){
 			if (err) {
 				console.log(err)
 				return ;
 			}
 			console.log(orders)
 			var totalPrice = 0;	
 			for(var i=0, j=orders.length; i<j; i++) {
 				if (orders[i].priceSum !== undefined && orders[i].paid == true) {
 					totalPrice += orders[i].priceSum;
 				};
 			}
 			res.view("home/index",{
 				partials: {
 					head: '../partials/head',
 					tail: '../partials/tail',
 				},
 				title:"Home",
 				user: req.session.user,
 				totalPrice:totalPrice,
 			});
 		});
 	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
   _config: {}


};

