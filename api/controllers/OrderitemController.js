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
 		// console.log(params)
 		Menuitem.findOne({id:parseInt(params.menuItemId)}, function (err,menuItem){
 			if (err || !menuItem) {
 				return res.json({err:"Item not found"})
 			};
 			// console.log(menuItem)
 			var cost = params.quantity * menuItem.price;
 			console.log("total cost: $" + cost)
 			Order.findOne({id:parseInt(params.orderId)}, function(err, order) {
 				if (err) {
 					console.log(err)
 				}		
 				// console.log(order)
 				order.addSum(cost);
 				Orderitem.create(params, function(err, orderItem) {
 					if (err) {
 						return res.json({err:"Cannot create"});
 					}			
 					orderItem["cost"] = cost;
 					// console.log(orderItem)
 					return res.json(orderItem);

 				});
 			});

 			
 		});
 		
 	},
 	destroy : function  (req, res) {

 		var id = req.param('id');
 		if (!id) return res.json({err:"Id not found"});

		id = parseInt(id) 		
		Orderitem.findOne({id:id}, function(err, orderitem) {
			if (err) return console.log(err);

			if (!orderitem) return res.json({err:"notfound"});
			console.log(orderitem)

			Menuitem.findOne({id:parseInt(orderitem.menuItemId)}, function (err,menuItem){
				if (err || !menuItem) return res.json({err:"Item not found"})

				console.log(menuItem)
				var cost = orderitem.quantity * menuItem.price;
				console.log("it cost: " + cost)
				Order.findOne({id:parseInt(orderitem.orderId)}, function(err, order) {
					if (err || !order) return res.json({err:"order not found"})

					console.log(order)
					order.subSum(cost);

					Orderitem.destroy(id, function(err) {
						if (err) return console.log("Unable to delete");
						return res.json(orderitem);
					});
				});
			});
		});
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to OrderitemController)
   */
   _config: {}


};
