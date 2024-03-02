const mongoose = require('mongoose')

// Define Schema
const CategorySchema = new mongoose.Schema({
    cat_name:{
        type: String,
        required: true
    }
},{timestamps:true})

// Create Collection
const CategoryModel = mongoose.model('category', CategorySchema)
                                  //(Collection Name, Collection Field)

module.exports = CategoryModel