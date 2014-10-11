/**
 * OrderitemController
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
 	create : function  (req, res) {
 		var params = req.params.all();
 		console.log(params)
 		Menuitem.findOne({id:parseInt(params.menuItemId)}, function (err,menuItem){
 			if (err || !menuItem) {
 				return res.json({err:"Item notfound"})
 			};
 			console.log(menuItem)
 			var cost = params.quantity * menuItem.price;
 			console.log("total cost: $" + cost)
 			Order.findOne({id:parseInt(params.orderId)}, function(err, order) {
 				if (err) {
 					console.log(err)
 				}		
 				// console.log(order)
 				order.addSum(cost);
 			});

 			// Orderitem.create(params, function(err, orderItem) {
	 		// 	if (err) {
	 		// 		return res.serverError(err);
	 		// 	}			

	 		// 	console.log()
	 		// 	/

	 		// 	return res.json(orderItem);

	 		// });
 	});
 		
 	},
 	destroy : function  (req, res) {

 		var id = req.param('id');
 		if (!id) {
 			return res.json({});
 		}

		// // Otherwise, find and destroy the model in question

		id = parseInt(id) 		
		Orderitem.findOne({id:id}, function(err, result) {
			if (err) return console.log(err);

			if (!result) return res.json({err:"notfound"});
			// console.log(result)

			Orderitem.destroy(id, function(err) {
				if (err) return console.log("Unable to delete");
				return res.json(result);
			});
		});
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to OrderitemController)
   */
   _config: {}


};
