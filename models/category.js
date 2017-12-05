const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let category = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true
    },
    products:{
        type: Array
    },
    child:{
        type:Object
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

module.exports = mongoose.model('category',category);