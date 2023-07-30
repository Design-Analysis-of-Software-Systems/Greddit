const { error } = require("console");
const express = require("express");
const routers = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')
routers.get('/allPosts',(req,resp)=>{
    Post.find()
    // if we dont do the below line postedBy will just show an ID and not the values...
    .populate("postedBy","username _id")
    // the second parameter defines which all fields to show
    .then(posts=>{
        resp.json({posts:posts})

    })
    .catch(error=>{
        console.log(error)
    })
})
routers.post('/createPost',requireLogin,(req,resp)=>{
    const {title,body}= req.body
    if(!title||!body){
        return resp.status(422).json({error:"Fill up title and body fields"})
    }
    // console.log(req.user)
    // resp.send("ok")
    // this prevents from storing password of the user who posted...
    req.user.password = undefined
    const post = new Post({
        title:title,
        body:body,
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        resp.json({post:result})
    })
    .catch(error=>{
        console.log(error)
    })
})
routers.get('/myPosts',requireLogin,(req,resp)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","username _id")
    .then(myPosts=>{
        resp.json({myPosts:myPosts})
    })
    .catch(error=>{
        console.log(error)
    })
})
module.exports = routers