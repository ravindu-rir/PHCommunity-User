const router = require("express").Router();
const mongoose = require('mongoose'); 
const express = require("express");
const Topic =  mongoose.model("Topic")


router.get('/topic/get',(req,res)=>{
    Topic.find()
    .sort('-createdAt')
    .then((topics)=>{
        res.json({topics})
    }).catch(err=>{
        console.log(err)
    })
})


router.post('/topic/create',async (req,res)=>{
    const { topic } = req.body 
    if(!topic ){
      return  res.status(422).json({error:"Please add all the fields"})
    }

    const post = new Topic({
        topic,
    })
    post.save().then(result=>{
        res.json({Topic:result})
    })
    .catch(err=>{
        console.log(err)
    })
})




module.exports = router