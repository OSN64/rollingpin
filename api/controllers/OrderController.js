/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	start: function(req, res) {
 		var name = false;
 		if (req.session.authenticated) name = req.session.user.email
 			else name = false;
 		var phNo = false;
 		req.params.all()
 		
 		if (req.param('phNo')) {
 			phNo = req.param('phNo');
 		}
 		res.view("order/index",{
 			partials: {
 				head: '../partials/head',
 				tail: '../partials/tail',
 			},
 			title:"Order",
 			user: req.session.user,
 			phNo : phNo
 		});
 	},
 	create : function  (req, res) {
 		var params = req.params.all();
 		params['priceSum'] = 0;
 		Order.create(params, function(err, order) {
 			if (err) {
 				req.session.flash = {
 					err: err.ValidationError
 				}
 				return res.redirect('/orderstart');

 			}			
 			res.status(201);

 			Menuitem.find("", function (err,found){
 				return res.view("order/create",{
 					partials: {
 						head: '../partials/head',
 						tail: '../partials/tail',
 					},
 					order: order,
 					title:"Order",
 					menuItems : found,
 					user: req.session.user
 				});
 			});
 		});
 	},
 	history : function (req,res){
 		var params = req.params.all();

 		params.customerId = parseInt(params.customerId) 		
 		Order.find(params, function(err, orders) {
 			if (err) {
 				console.log(err)
 				return res.json({err:"Order not found"})
 			}			
 			// console.log(orders)
 			var totalPrice = 0;	
 			for(var i=0, j=orders.length; i<j; i++) {
 				if (orders[i].priceSum !== undefined ) {
 					totalPrice += orders[i].priceSum;
 				};
 			}
 			return res.view("order/history",{
 				partials: {
 					head: '../partials/head',
 					tail: '../partials/tail',
 				},
 				title:"History",
 				orders:orders,
 				totalPrice:totalPrice,
 				user: req.session.user
 			});
 		});
 	},
 	find : function  (req, res) {

 		var id = req.param('id');
 		if (!id) return res.json({err:"Id not found"});
 		// console.log(id)	
 		
 		Orderitem.find({orderId:parseInt(id)}, function(err, orderItems) {
 			function isEmpty(obj) {
 				return !Object.keys(obj).length > 0;
 			}
 			if (err || isEmpty(orderItems)) {
 				console.log(err)
 				return res.redirect('/orderstart');
 			}			
 			var totalCost = 0;
 			var order = [];
 			// console.log(orderItems[0])

 			// for(var i=0, j=orderItems.length; i<j; i++) {
 				// if (orders[i].priceSum !== undefined ) {
 				// 	totalPrice += orders[i].priceSum;
 				// };
 				// console.log("order item id: "+orderItems[i].menuItemId)
 				// console.log("order quantity: "+orderItems[i].quantity)
 				// var orderItem = orderItems[i];
 				// console.log(orderItems)
 				var menuItemPrice;
 				var index = 0;
 				findMenuItem(index,totalCost);
 				function findMenuItem(index,totalCost){
 					// console.log("index: " + index + " length: " + orderItems.length)
 					if (orderItems.length == index) {
 						console.log(order)
 						return res.view("order/show",{
 							partials: {
 								head: '../partials/head',
 								tail: '../partials/tail',
 							},
 							title:"Order",
 							order: order,
 							totalCost : totalCost,
 							user: req.session.user
 						});

 					};
 					var orderItem = orderItems[index];
 					console.log(orderItem)
 					Menuitem.findOne({id:parseInt(orderItems[index].menuItemId)}, function (err,menuItem){
 						console.log(index)
	 					// console.log(err)
	 					// console.log(menuItem)
	 					// console.log(orderItem)
	 					// console.log("quantity" + orderItems[index].quantity )
	 					// console.log("price" + menuItem.price )
	 					menuItemPrice = orderItem.quantity * menuItem.price;
	 					totalCost = totalCost + menuItemPrice;
	 					var menuItemName =  menuItem.name;
	 					// // console.log(menuItemPrice)
	 					// // console.log(menuItemName)
	 					var orderVal = {
	 						"name": menuItemName,
	 						"price": menuItemPrice,
	 						"quantity": orderItem.quantity
	 					}
	 					order.push(orderVal)
	 					findMenuItem(index + 1,totalCost);
	 				});
 				} 			
 			});
},
index : function  (req, res) {
	return res.redirect("/orderstart");
},
};

