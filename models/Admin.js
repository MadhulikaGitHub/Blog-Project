const mongoose = require('mongoose')

// Define Schema
const AdminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

// Create Collection
const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel