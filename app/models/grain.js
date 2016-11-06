var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GrainSchema   = new Schema({
	name: 		String, // Grain name
	origin: 	String, // Country of origin 
	srm: 	 	String, // SRM color
	pppg_sg: 	{       // Potential SG pppg
		type: Number, 
		min: 1.0, 
		max: 1.9 
	},
	type: 		{       // Allowed Grain types
		type: String, 
		enum : ["malt", "extract", "adjunct", "sugar"], 
		default : "malt" 
	},
});

module.exports = mongoose.model('Grain', GrainSchema);
