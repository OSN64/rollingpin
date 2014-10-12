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
    var request = require("request");


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
    
    //default users

    User.create({name:'dave', email:'Da@gmail.com',password:'12345',pasConfirmation:'12345'}).exec(console.log);
    

    request("https://www.kimonolabs.com/api/ck4h8vp8?apikey=r9T5X56o63Gt2qyDqFuEmMnVc0BOCEGA",
      function(err1, response1, foodie) {
        var foodArr = ("" + JSON.parse(foodie).results.words[0].word).split(/\n/);
        function randomDescription(next){
          var wordCount = (Math.floor(Math.random() * 6) + 1);
          var description = foodArr[(Math.floor(Math.random() * foodArr.length) + 0)];
          for (;wordCount > 0; wordCount-- ){
            description += ( ", " + foodArr[( Math.floor(Math.random() * ( foodArr.length - 1 ) ) + 0 )] );
            if (wordCount == 1)
              return next( (description + " and " + foodArr[( Math.floor(Math.random() * ( foodArr.length - 1 ) ) + 0 )]) );
          }
        }
        request("https://www.kimonolabs.com/api/axhcy3qu?apikey=r9T5X56o63Gt2qyDqFuEmMnVc0BOCEGA",
        function(err, response, body) {
          body = JSON.parse(body);
          function populate(item){
            var params = {};
            randomDescription(function(description){
              params.name = body.results.appetizers[item].appetizer.text;
              params.price = (Math.floor(Math.random() * 45) + 10);
              params.description = description;

              Menuitem.create(params, function(err, menuitem) {
                if (err) {
                  console.log(err);
                }
                console.log("Added: " + menuitem.name + "\n\t Price: $" + 
                  menuitem.price + "\n\t Description: " + menuitem.description);
                if ( body.results.appetizers.hasOwnProperty([ (item + 1) ]) ){
                  populate( (item + 1) );
                }
                else
                  return;
              });
            });
        
          }
          populate(0);
        });
      });
}

   // seed();


  Handlebars.registerHelper('listerr', function(context, options) {
    var ret = "";
    Object.keys(context).forEach(function(error){
      console.log(error)
      for(var i=0, j=context[error].length; i<j; i++) {
        // console.log(error.length)
        ret = ret + "<li>" + error + options.fn(context[error][i]) + "</li>";
      }
    })
    return ret ;
  });
  Handlebars.registerHelper('each', function(context, options) {
    var ret = "";   
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + options.fn(context[i]);
    }

    return ret;
  });

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
