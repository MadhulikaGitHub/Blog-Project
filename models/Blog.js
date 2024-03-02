const mongoose = require('mongoose')

// Define Schema
const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        public_id:{
            type: String
        },
        url:{
            type: String
        }
    }
},{timestamps:true})

// Create Collection
const BlogModel = mongoose.model('blog', BlogSchema)
                              //(Collection Name, Collection Field)

module.exports = BlogModel