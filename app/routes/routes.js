var express    = require('express');
var router     = express.Router();
var recipes    = require('./recipes');

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
    recipes.create(req, res)
  })

  // get all the recipes (accessed at GET http://localhost:8080/api/recipes)
  .get(function(req, res) {
    recipes.get_all(req, res)
  });

// on routes that end in /recipes/:recipe_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')

  // get the recipe with that id
  .get(function(req, res) {
    recipes.get_one(req, res)
  })

  // update the recipe with this id
  .put(function(req, res) {
    recipes.put_one(req, res)
  })

  // delete the recipe with this id
  .delete(function(req, res) {
    recipes.del_one(req, res)
  });


module.exports = router;
