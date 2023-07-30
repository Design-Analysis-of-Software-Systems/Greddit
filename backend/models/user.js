const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    first : {type:String,required:true},
    last : {type:String,required:true},
    username : {type:String,required:true,unique:true},
    number : {type:String,required:true},
    age : {type:String,required:true},
    email  : {type:String,required:true},
    password : {type:String,required:true},
    about : String,
    followers:Array,
    following:Array,
    mysubgreddit:Array,
    savedposts:Array
})
mongoose.model("User",userSchema)