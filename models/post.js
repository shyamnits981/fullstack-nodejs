const mongoose = require('mongoose');

const {ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({

    activity:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    action:{
        type: String,
        required:true
    }
   
})

mongoose.model("Post",postSchema)