const mongoose = require('mongoose')

// Define Schema
const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{timestamps:true})

// Create Collection
const ContactModel = mongoose.model('contact', ContactSchema)

module.exports = ContactModel