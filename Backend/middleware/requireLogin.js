const jwt = require("jsonwebtoken");
const mongoose = require('mongoose'); 
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    //Verify thr token
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        //Get User by the token
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        }) 
        
        
    })
}