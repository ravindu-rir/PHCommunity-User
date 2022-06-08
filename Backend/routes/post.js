const router = require("express").Router();
const mongoose = require('mongoose'); 
const express = require("express");
const requireLogin = require("../middleware/requireLogin")
const Post =  mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id fName lName")
    .populate("comments.postedBy","_id fName lName")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})


router.post('/createpost', requireLogin , (req,res)=>{
    const {topic,body,url} = req.body 
    if(!topic || !body){
      return  res.status(422).json({error:"Please add all the fields " + body})
    }
    req.user.password = undefined
    const post = new Post({
        title:topic,
        body,
        photo:url,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports = router