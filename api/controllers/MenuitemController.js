/**
 * MenuitemController
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

 	index : function (req,res){
 		var params = req.params.all();

 		Menuitem.find({}, function(err, menuItems) {
 			if (err) {
 				console.log(err)
 			}			

 			return res.view("menuitem/index",{
 				partials: {
 					head: '../partials/head',
 					tail: '../partials/tail',
 				},
 				title:"Menu Items",
 				menuItems:menuItems
 			});
 		});
 	},
 	create : function  (req, res) {
 		var params = req.params.all();
 		Menuitem.create(params, function(err, menuitems) {
 			if (err) {
 				req.session.flash = {
 					err: err.ValidationError
 				}
 				return res.redirect('/menuitem');

 			}			
 			res.status(201);
 			return res.redirect('/menuitem');
 		});
 	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MenuitemController)
   */
   _config: {}


};
