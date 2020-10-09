const recipeService = require('../services/recipe.service')
exports.create = function (req, res) {
    req.assert("name", "Name should not be empty").notEmpty();
    req.assert("calories", "Calories should be in numeric.").isNumeric()
    var error = req.validationErrors();
    if (error) {
        return res.status(400).send(error);
    }
    recipeService.createRecipe(req, res);
}

exports.update = function (req, res) {
    req.assert("name", "Name should not be empty").notEmpty();
    req.assert("calories", "Calories should be in numeric.").isNumeric()
    var error = req.validationErrors();
    if (error) {
        return res.status(400).send(error);
    }
    recipeService.update(req, res);
}

exports.get = function (req, res) {
    recipeService.get(req, res)
}

exports.delete = function (req, res) {
    recipeService.delete(req, res);
}

exports.getById = function(req, res){
    recipeService.getById(req, res);
}

exports.getByName = function(req, res){
    console.log('testing ');
    recipeService.getByName(req, res);
}