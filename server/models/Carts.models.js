const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    getuserID:{
        type:String,
    },
    productID:{
        type:String,
    },
    name:{
        type:String
    },
    brand:{
        type:String
    },
    img:{
        type:String
    },
    price:{
        type:Number
    },
    inStock:{
        type:Number
    },
    selected:{
        type:String,
    },
    quantity:{
        type:Number
    }
})


module.exports = mongoose.model("Cart", CartSchema)