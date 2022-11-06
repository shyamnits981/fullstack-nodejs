
const { application } = require('express');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Post = mongoose.model("Post")


router.post("/addlist",async(req,res)=>{
let post = new Post(req.body);
let result = await post.save();
res.send(result)
})



router.get("/addlist",async(req,res)=>{
    let post = await Post.find();
    if(post.length>0){
        res.send(post)
    }else{
        res.send({result:"No product found"})
    }
})




module.exports = router