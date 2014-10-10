/**
* Orderitem.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		menuItemId : {
			type : "string",
			required : true,
		},
		quantity : {
			type: "integer",
			required: true,
		},
		orderId:{
			type: "integer",
			required:true,
		},
	},
	beforeCreate : function(item, cb){
        //Auto increment workaround
        var incModel = "Orderitem";

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
