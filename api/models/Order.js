/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		customerid : {
			type: "integer",
			required: true
		},
		pricesum : {
			type: "integer",
		},
		method: {
			type: 'string',
			enum: ['take-away', 'home-delivery']
		}

  	// function to calculate the sum of the price
  },

};