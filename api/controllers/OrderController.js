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
 		var phno = false;
 		req.params.all()
 		
 		if (req.param('phno')) {
 			phno = req.param('phno');
 		}
 		res.view("order/index",{
 			partials: {
 				head: '../partials/head',
 				tail: '../partials/tail',
 			},
 			title:"Order",
 			username: name,
 			phno : phno
 		});
 	},
 	create : function  (req, res) {
 		var params = req.params.all();
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
 					menuitems : found,
 				});
 			});
 		});
 	},
 	history : function (req,res){
 		var params = req.params.all();

 		params.customerid = parseInt(params.customerid) 		
 		Order.find(params, function(err, orders) {
 			if (err) {
 				console.log(err)
 			}			

 			return res.view("order/history",{
 				partials: {
 					head: '../partials/head',
 					tail: '../partials/tail',
 				},
 				title:"History",
 				orders:orders
 			});
 		});
 	},
 };

