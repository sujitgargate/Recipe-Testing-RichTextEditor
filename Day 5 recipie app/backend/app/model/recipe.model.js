const mongoose = require('mongoose')
const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true
    },

    imageUrl: {
        type: String,

    },
    description: {
        type: String
    },
    calories: {
        type: Number
    },
    recipeCreatedDate: {
        type: String,
    },
    ingredient: {
        type: Array
    }

})

module.exports = mongoose.model('Recipe', RecipeSchema)