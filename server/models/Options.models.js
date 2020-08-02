const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema({
    itemid:{
        type:String,
        required: [true, "Enter Item ID"]
    },
    type:{
      type:String,
      required: [true, "Add Type"]
    },
    extra:{
        type:Number,
        default: 0
    }
})


module.exports = mongoose.model("Option", OptionSchema)