/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		customerId : {
			type: "integer",
			required: true
		},
		priceSum : {
			type: "integer",
		},
		method: {
			type: 'string',
			enum: ['take-away', 'home-delivery'],
			required: true
		},
		deliveryAddr: {
			type: "string",
            required: true
        },
        // function to calculate the sum of the price
        addSum: function(cost) {
            // var obj = .toObject();
            console.log(this)

            console.log(this.priceSum)
            this.priceSum = this.priceSum + cost;
            console.log(this.priceSum)
            this.save( function(err,s){});
        },
        subSum: function(cost) {
            // var obj = .toObject();
            console.log(this)

            console.log(this.priceSum)
            this.priceSum = this.priceSum - cost;
            console.log(this.priceSum)
            this.save( function(err,s){});
        },
    },

    beforeCreate : function(item, cb){
        //Auto increment workaround
        var incModel = "Order";

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