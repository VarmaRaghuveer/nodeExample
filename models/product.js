const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let products = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type: Array
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    insDate:{
        type:Date,
        default:Date.now    
    },
    updDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('product',products);