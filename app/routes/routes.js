var express    = require('express');
var router     = express.Router();
var Recipe     = require('../models/recipe');

// API ROUTES
// =============================================================================

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Middleware hook...');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the BrewWerks API!' }); 
});

// on routes that end in /recipes
// ----------------------------------------------------
router.route('/recipes')

  // create a recipe (accessed at POST http://localhost:8080/recipes)
  .post(function(req, res) {
    
    var recipe = new Recipe();    // create a new instance of the Recipe model
    recipe.name = req.body.name;  // set the recipes name (comes from the request)

    recipe.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Recipe created!' });
    });

    
  })

  // get all the recipes (accessed at GET http://localhost:8080/api/recipes)
  .get(function(req, res) {
    Recipe.find(function(err, recipes) {
      if (err)
        res.send(err);

      res.json(recipes);
    });
  });

// on routes that end in /recipes/:recipe_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')

  // get the recipe with that id
  .get(function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);
      res.json(recipe);
    });
  })

  // update the recipe with this id
  .put(function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {

      if (err)
        res.send(err);

      recipe.name = req.body.name;
      recipe.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Recipe updated!' });
      });

    });
  })

  // delete the recipe with this id
  .delete(function(req, res) {
    Recipe.remove({
      _id: req.params.recipe_id
    }, function(err, recipe) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


module.exports = router;
