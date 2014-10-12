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
 };

