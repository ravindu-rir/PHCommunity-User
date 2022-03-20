const router = require("express").Router();
const mongoose = require('mongoose'); 
const User = mongoose.model("User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireLogin = require('../middleware/requireLogin');

router.get('/protected', requireLogin , (req, res)=>{

  res.send("Hello User")

});


// Register user
router.post("/signup", async (req, res) => {
    const {fName, lName, email, country, password } = req.body;
  try {
        if(!fName || !lName || !email || !country || !password){
            return res.status(422).json({ error: "Please fill all the field" });
        }
        let user = await User.findOne({ email:email });
        if (user) {
          return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        newUser = new User({
            fName,
            lName,
            email,
            country,
            password:hashedPassword,
         });
        const userCreated = await newUser.save()
        if(userCreated){
            return res.status(201).json({ message: "User created successfully" });
        } 

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
  }
});


//SignIn(Login) User
router.post("/signin", async (req, res) => {

  const {email, password } = req.body;

  if(!email || !password){

    return res.status(422).json({ error: "Please enter email or password"});

  }

  let savedUser = await User.findOne({ email:email });
  if(!savedUser){

    return res.status(422).json({ error: "Invalid Email or Password"});

  }
  else{
    let doMatch = await bcrypt.compare(password,savedUser.password);
    try{
      if(doMatch){

        const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET);
        res.json({token});        

      }
      else{
        return res.json({ error: "Invalid Email or Password"});
      }
    }catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Something is Wrong. Please try again later"  });
    }
  }

});



module.exports = router;