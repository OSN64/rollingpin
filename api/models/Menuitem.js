/**
 * Menuitem
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

 	attributes: {
 		name : {
 			type: "string"
 		},
 		price : {
 			type: "integer",
 		},    
 	},

 	beforeCreate : function(item, cb){
        //Auto increment workaround
        var incModel = "Menuitem";

        Counter.findOne({"model_name": incModel}).exec(function(err, counter){
            if (err) return err;
            if(counter){
                var newAmount = counter.amount + 1;
                counter.amount = newAmount;

                counter.save(function(err, c){
                    //Error handling...
                    item.id = newAmount;
                    cb();
                });
            }else{
                cb();
            }
        });
    },
    //add this to everything

 };
