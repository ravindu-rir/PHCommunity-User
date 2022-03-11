const router = require("express").Router();
const mongoose = require('mongoose'); 
const User = mongoose.model("User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user
router.post("/signup", async (req, res) => {
    const {fName, lName, email, country, password } = req.body;
  try {
        if(!fName || !lName || !email || !country || !password){
            return res.status(422).json({ error: "Please fill all the field" });
        }
        let user = await User.findOne({ email });
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

module.exports = router;