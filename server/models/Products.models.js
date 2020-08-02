const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type:String
    },
    brand:{
        type:String
    },
    category:{
        type:String
    },
    img:{
        type:String,
        required: [true, "Image required"]
    },
    price:{
        type: Number
    },
    options: [{ 
        type : Object,
        ref: 'Option' }],
    description:{
        type:String,
        minlength: [3, "Description must be at least 3 characters or longer"] 
    },
    rate:{
        type:Number
    },
    inStock:{
        type:Number
    },
    isSold:{
        type:Number
    },
})

module.exports = mongoose.model("Product", ProductSchema)

