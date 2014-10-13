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
 				console.log(err)
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
 			console.log(orders)
 			var totalPrice = 0;	
 			for(var i=0, j=orders.length; i<j; i++) {
 				if (orders[i].priceSum !== undefined ) {
 					totalPrice += orders[i].priceSum;
 				};
 			}
 			if (req.isSocket) {
 				res.json({orders:orders,totalPrice:totalPrice})
 			}else{
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
 			}
 		});
 	},
 	find : function  (req, res) {

 		var ordId = req.param('id');
 		if (!ordId) {
 			console.log("Id not found")
 			return res.redirect("/orderstart");
 		};
 		// console.log(ordId)	
 		ordId = parseInt(ordId);
 		Orderitem.find({orderId:ordId}, function(err, orderItems) {
 			function isEmpty(obj) {
 				return !Object.keys(obj).length > 0;
 			}
 			if (err || isEmpty(orderItems)) {
 				console.log(err)
 				console.log("Empty order " + ordId)
 				console.log("Del order")

 				Order.findOne({id:ordId}, function(err, order) {
					if (err || !order) return res.redirect('/orderstart');
					console.log(order)
					Order.destroy(ordId, function(err) {
 						return res.redirect('/orderstart');
					});
				});


 			}
 			Order.findOne({id:ordId}, function(err, sOrder) {
 				if (err) console.log(err);
 				console.log(sOrder)
 				if (typeof sOrder === 'undefined' )	return res.redirect('/orderstart');
 				// console.log(sOrder)
 				Customer.findOne({id:parseInt(sOrder.customerId)}, function(err, customer) {
 					if (err) console.log(err);

	 				var totalCost = 0;
	 				var order = [];
	 				var menuItemPrice;
	 				var index = 0;

	 				findMenuItem(index,totalCost,ordId,sOrder,customer);

	 				function findMenuItem(index,totalCost,ordId,sOrder,customer){
	 					// console.log("index: " + index + " length: " + orderItems.length)
	 					if (orderItems.length == index) {

	 						return res.view("order/show",{
	 							partials: {
	 								head: '../partials/head',
	 								tail: '../partials/tail',
	 							},
	 							title:"Order",
	 							orderItems: order,
	 							order: sOrder,
	 							customer:customer,
	 							totalCost : totalCost,
	 							user: req.session.user
	 						});

	 					}
	 					var orderItem = orderItems[index];
	 					// console.log(orderItem)
	 					Menuitem.findOne({id:parseInt(orderItems[index].menuItemId)}, function (err,menuItem){
	 						menuItemPrice = orderItem.quantity * menuItem.price;
		 					totalCost = totalCost + menuItemPrice;
		 					var menuItemName =  menuItem.name;
		 					
		 					var orderVal = {
		 						"name": menuItemName,
		 						"price": menuItemPrice,
		 						"quantity": orderItem.quantity
		 					}
		 					order.push(orderVal)
		 					findMenuItem(index + 1,totalCost,ordId,sOrder,customer);
		 				});
	 				}
 				});

 			});

 		});
	},
	index : function  (req, res) {
		return res.redirect("/orderstart");
	},
	setPaid : function  (req, res) {
		if (!req.isSocket) return res.redirect("/orderstart");
		var id = req.param('id');
		var paid = req.param('paid');
 		if (!paid || !id) {
 			return res.json({err:"No Id or Paid value"});
 		};
 		id = parseInt(id);
 		paid = JSON.parse(paid);

 		Order.update({id:id},{paid:paid}).exec(function afterwards(err,updated){

			if (err) {
				return res.json({err:"Unable to update paid status of order " + id});
			}
			return res.json({err:"Updated order " +updated[0] });		  
		});
	},
	search : function (req,res){
 		var params = req.params.all();
 		delete params.submit;
 		if (params.paid){ 
 			params.paid = JSON.parse(params.paid);
 		}else delete params.paid;
 		if(params.customerPhoneNo){ 
 			params["customerId"] = 0;				
 			params.customerPhoneNo = params.customerPhoneNo.toString();
 		}else delete params.customerPhoneNo;
 		console.log("find customer with phNo of: " + params.customerPhoneNo)
 		Customer.find({phoneNo:params.customerPhoneNo},function(err,customer){
 			function isEmpty(obj) {
 				return !Object.keys(obj).length > 0;
 			}
 			console.log("customer is empty = " + isEmpty(customer))
 			// console.log(customer)
 			console.log(customer.length)
 			if (customer && !isEmpty(customer)) {
  				console.log("sustomer founcd id: ")
 				console.log(customer)
 				params["customerId"] = customer[0].id;
 			} 				
	 		console.log(params)
	 		delete params.customerPhoneNo; 		
	 		Order.find(params, function(err, orders) {
	 			if (err) {
	 				console.log(err)
	 				return res.json({err:"Order not found"})
	 			}
	 			// console.log(orders)
				return res.view("order/search",{
					partials: {
						head: '../partials/head',
						tail: '../partials/tail',
					},
					title:"Search Order",
					orders:orders,
					user:req.session.user
				});
	 		});
 		});

 	},
};

