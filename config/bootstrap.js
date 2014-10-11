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
		//menue items 
		// change exec to somethng else
		// Menuitem.create({name:'simething', price:'234',description:'quasdad'}).exec(console.log);
		// Menuitem.create({name:'asd', price:'54',description:'asd'}).exec(console.log);
		// Menuitem.create({name:'qwe', price:'34',description:'quasasdasddad'}).exec(console.log);
		// Menuitem.create({name:'qwe', price:'566',description:'asdasd'}).exec(console.log);
		// Menuitem.create({name:'ert', price:'234',description:'asd'}).exec(console.log);
		// Menuitem.create({name:'wer', price:'45',description:'asd'}).exec(console.log);
}

	 // seed();




	Handlebars.registerHelper('listerr', function(context, options) {
		var ret = "";
		console.log("asasdsad")
		Object.keys(context).forEach(function(error){
			console.log(error)
			for(var i=0, j=context[error].length; i<j; i++) {
				// console.log(error.length)
				ret = ret + "<li>" + error + options.fn(context[error][i]) + "</li>";
			}
		})
		return ret ;
	});
	// Handlebars.registerHelper('listarr', function(context, options) {
	// 	console.log(context[i])

	// 	var ret = "<ul>";
	// 	for (var i = 0; i < context.length; i++) {
	// 		console.log(context[i])
	// 	}
	// 	// Object.keys(context).forEach(function(error){
	// 	// 	// console.log(error)
	// 	// 	for(var i=0, j=context[error].length; i<j; i++) {
	// 	// 		// console.log(error.length)
	// 	// 		ret = ret + "<li>"  + options.fn(context[error][i]) + "</li>";
	// 	// 	}
	// 	// })

	// 		return ret + "</ul>";
	// 	});


	Handlebars.registerHelper('each', function(context, options) {
		var ret = "";
		
		// console.log(context)
		// console.log(options.fn(context[0]))
		
		for(var i=0, j=context.length; i<j; i++) {
			ret = ret + options.fn(context[i]);
		}

		return ret;
	});

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
