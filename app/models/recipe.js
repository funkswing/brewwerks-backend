var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema   = new Schema({
	name: 		String,
	style: 		String,
	creator: 	String,
});

module.exports = mongoose.model('Recipe', RecipeSchema);
