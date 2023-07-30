const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    text:{type:String,required:true},
    postedBy:{type:String,required:true},
    postedIn:{type:String,required:true},
    upvotes:Array,
    downvotes:Array,
})
mongoose.model("Post",postSchema)