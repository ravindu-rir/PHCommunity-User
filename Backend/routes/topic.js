const router = require("express").Router();
const mongoose = require('mongoose'); 
const express = require("express");
const Topic =  mongoose.model("Topic")


router.get('/topic/get', async(req,res)=>{
    try{
        const Topics = await Topic.find().sort('-createdAt')
        return res.status(200).json({ 
            Topics, 
        });
    }catch{
        return res.status(400).json({ error: "Can't read topics" });
    }
    
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