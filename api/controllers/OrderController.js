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
 		if (req.params.phno) {
 			phno = req.params.phno;
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
				// return res.serverError(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('/orderstart');

			}			
			res.status(201);
			
			return res.view("order/create",{
				partials: {
					head: '../partials/head',
					tail: '../partials/tail',
				},
				order: order,
 				title:"Order",

			});

		});
		
	},
};

