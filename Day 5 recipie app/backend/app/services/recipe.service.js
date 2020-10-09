const moment = require('moment')
const { findByIdAndUpdate, findOneAndUpdate } = require('../model/recipe.model.js')
const Recipe = require('../model/recipe.model.js')


exports.createRecipe = async function (req, res) {
    console.log("in create");
    var recipeExists = await Recipe.findOne({
        name: req.body.name
    })
    if (recipeExists) {
        res.status(400).send({
            message: 'Recipe Name already exists, please try with different name. '
        })
    }
    else {
        console.log(req.body);
    
    var newDate = moment(req.body.recipeCreatedDate).format('YYYY-MM-DD')
        var imageUrl ='http://localhost:5000/' + req.file.filename 
        
        let recipe = new Recipe({
          name: req.body.name,
          imageUrl :imageUrl,
          description: req.body.description,
          calories: req.body.calories,
          ingredient: req.body.ingredient,
          recipeCreatedDate:newDate
        })
        
        let recipeCreated = await Recipe.create(recipe)
        res.status(200).send(recipeCreated)
    }
}


exports.update = async function (req, res) {
    console.log('in update '+req.body.name);
    var recipeExists = await Recipe.findOne({
        name: req.body.name
    })
    if(req.file){
        var imageUrl ='http://localhost:5000/' + req.file.filename
        req.body.imageUrl = imageUrl
    }
    if (recipeExists) {
        if(recipeExists._id !== req.body._id){
            res.status(400).send({
                message: 'Recipe Name already exists, please try with another name..'
            }) 
        }
        else{
            
            var updatedRecipe = await Recipe.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
            res.status(200).send(updatedRecipe);
        }
    }
    else{
        var updatedRecipe = await Recipe.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
        res.status(200).send(updatedRecipe);
    }

}

exports.get = async function (req, res) {
    var allRecipe = await Recipe.find();
    res.send(allRecipe)
}

exports.delete = async function (req, res) {
    await Recipe.findByIdAndDelete(req.params.id)
}


exports.getById = async function(req, res){
    var recipe = await Recipe.findById(req.params.id)
    res.send(recipe);
}

exports.getByName = async function(req, res){
    debugger;
    console.log("value.."+req.body.name);
    var recipe = await Recipe.findOne({
        name: req.body.name
    })

    res.send(recipe);
}