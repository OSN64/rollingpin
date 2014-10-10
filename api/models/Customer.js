/**
 * Customer
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	namefirst: {
  		type: "string",
  		required: true
  	},
  	namelast: {
  		type: "string",
  		required: true
  	},
  	phoneno: {
  		type: "string",
  		required: true
  	},
  	ccardno: {
  		type: "string",
  		required: true
  	},
  	ccardexpmon: {
  		type: "string",
  		required: true,
  	},
  	ccardexpyear: {
  		type: "string",
  		required: true,
  	},
  	ccardname: {
  		type: "string",
  		required: true
  	},
  	addr: {
  		type: "string",
  		required: true
  	},
    
  },
  beforeCreate : function(item, cb){
        //Auto increment workaround
        var incModel = "Customer";

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

};
