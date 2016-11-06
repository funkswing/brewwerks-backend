var Recipe     = require('../models/recipe');

// /recipes
// ----------------------------------------------------

// create a recipe (accessed at POST /recipes)
var create_recipe = function(req, res) {

	var recipe = new Recipe();    // create a new instance of the Recipe model
	recipe.name = req.body.name;  // set the recipes name (comes from the request)

	recipe.save(function(err) {
	  if (err)
	    res.send(err);

	  res.json({ message: 'Recipe created!' });
	});

}

// get all the recipes (accessed at GET /api/recipes)
var get_recipes = function(req, res) {
    Recipe.find(function(err, recipes) {
      if (err)
        res.send(err);

      res.json(recipes);
    });
}

var get_recipe = function(req, res) {
	Recipe.findById(
		req.params.recipe_id, 
		function(err, recipe) {
	      if (err)
	        res.send(err);
	      res.json(recipe);
	    }
    );
}

var put_recipe = function(req, res) {
	Recipe.findById(
		req.params.recipe_id, 
		function(err, recipe) {

	      if (err)
	        res.send(err);

	      recipe.name = req.body.name;
	      recipe.save(function(err) {
	        if (err)
	          res.send(err);

	        res.json({ message: 'Recipe updated!' });
  		}
      );
    });
}

var del_recipe = function(req, res) {
	Recipe.remove({
      _id: req.params.recipe_id
    }, 
    function(err, recipe) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
}


module.exports = {
    create: create_recipe,
    get_all: get_recipes,
    get_one: get_recipe,
    put_one: put_recipe,
    del_one: del_recipe
}
