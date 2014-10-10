/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */
 var Handlebars = require('handlebars');
 module.exports.bootstrap = function (cb) {

	//set seed values here
	function seed () {
		Menuitem.destroy().exec(console.log);
		Counter.destroy().exec(console.log);
		User.destroy().exec(console.log);
		Orderitem.destroy().exec(console.log);
		Order.destroy().exec(console.log);
		Customer.destroy().exec(console.log);
		Counter.create({amount:'0', model_name:'Menuitem'}).exec(console.log);
		Counter.create({amount:'0', model_name:'User'}).exec(console.log);
		Counter.create({amount:'0', model_name:'Orderitem'}).exec(console.log);
		Counter.create({amount:'0', model_name:'Order'}).exec(console.log);
		Counter.create({amount:'0', model_name:'Customer'}).exec(console.log);
	}

	// seed();




	Handlebars.registerHelper('list', function(context, options) {
		var ret = "<ul>";

		Object.keys(context).forEach(function(error){
			console.log(error)
			for(var i=0, j=context[error].length; i<j; i++) {
				// console.log(error.length)
				ret = ret + "<li>" + error + options.fn(context[error][i]) + "</li>";
			}
		})
		return ret + "</ul>";
	});
  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};