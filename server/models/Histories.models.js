const mongoose = require("mongoose");
const HistorySchema = new mongoose.Schema({
    getuserID:{
        type:String,
    },
    item: [{ 
        type : Object,
        ref: 'Cart' }],
    shipped: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


module.exports = mongoose.model("History", HistorySchema)