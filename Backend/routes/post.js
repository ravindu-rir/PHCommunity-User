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
    .populate("postedBy","_id fName lName")
    .sort('-createdAt')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        console.log(result)
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id lName fName")
    .populate("postedBy","_id lName fName")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


module.exports = router