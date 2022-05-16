const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const topicSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
},{timestamps:true})

mongoose.model("Topic",topicSchema)