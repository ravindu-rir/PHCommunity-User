const router = require("express").Router();
const mongoose = require('mongoose'); 
const User = mongoose.model("User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireLogin = require('../middleware/requireLogin');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("688919940654-hm29qeu96n9i9ait295f553acvhh7m7o.apps.googleusercontent.com");
const { response } = require("express");
const e = require("express");



router.get('/protected', requireLogin , (req, res)=>{

  res.send("Hello User")

});


//@desc Register user
//Access Public
router.post("/signup", async (req, res) => {
    const {fName, lName, email, country, password } = req.body;
  try {

        //Check if all fields are empty
        if(!fName || !lName || !email || !country || !password){
            return res.status(422).json({ error: "Please fill all the field" });
        }

        else{
            //Check if user exists
            let user = await User.findOne({ email:email });
            if (user) {
              return res.status(400).json({ error: "User already exists" });
            }

            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10)

            //Create User
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

        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
  }
});


//@desc SignIn(Login) User
//Access Public
router.post("/signin", async (req, res) => {

  const {email, password } = req.body;
  
  // Check if all fields are empty
  if(!email || !password){

    return res.status(422).json({ error: "Please enter email or password"});

  }

  //Check the user email
  let savedUser = await User.findOne({ email:email });
  
  if(!savedUser){

    return res.status(422).json({ error: "Invalid Email or Password"});

  }
  else{
        let ifUserActive = savedUser.AccountStatus;
        if(ifUserActive){
              //Check the user password
              let doMatch = await bcrypt.compare(password,savedUser.password);
              try{
                if(doMatch){

                  //Generate User Token
                  const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET, { expiresIn: '1d'}); 
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
        else{
          console.log("Your Account Deactivated");
          return res.status(400).json({ error: "Your Account Deactivated"  });
        }
      }

});



//@desc GoogleAuth
//Access Public
router.post('/googleauth', async (req, res) => {

  const {tokenId} = req.body;

  try{
    
        //Check if all fields are empty or not
        if(!tokenId){
          return res.status(422).json({ error: "Google has no Token try again" });
        }

        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: "688919940654-hm29qeu96n9i9ait295f553acvhh7m7o.apps.googleusercontent.com",  
        }).then(response =>{
          
          //Get Google Account Details
          const {email_verified,given_name, family_name, email , googleId} = response.payload;

          //email_verified has boolean value
          console.log("email - ", email_verified)
          if(email_verified){

              //Find User using Google Account Details (email)
               User.findOne({ email:email })
              .then( savedUser =>{

                    //Create User Password
                    const gpassword = email+process.env.JWT_GKEY;  
                
                  //***********User login using Google Account Details
                  if(savedUser){
                    try{
                        //Check google "gpassword" match or not
                        if(!savedUser.gpassword){
                          return res.status(400).json({ error: "Invalid Login"});
                        }
                        else{
                            try{
                              //Check the user password
                                bcrypt.compare(gpassword,savedUser.gpassword)
                                .then( doMatch =>{
                              
                                      if(doMatch){
                                        //Generate User Token
                                        const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET, { expiresIn: '1d'}); 
                                        res.json({token});        

                                      }
                                      else{
                                        return res.status(422).json({ error: "Invalid Email or Password"});
                                      }
                                  });
                              }catch (err) {
                                console.log(err);
                                return res.status(400).json({ error: "Something is Wrong. Please try again later"  });
                              }
                          }
                     }catch (err) {
                        console.log(err);
                        return res.status(400).json({ error: "Something is Wrong. Please try again later"  });
                     }
                  }
                  
                  //***********User Create using Google Account Details (google data dos't have country)
                  else{

                    //Hash Password
                    bcrypt.hash(gpassword, 10)
                    .then(hashedPassword =>{
          
                          //Create User
                            newUser = new User({
                              fName:given_name,
                              lName:family_name,
                              email:email,
                              country:"",
                              password:hashedPassword,
                              gpassword:hashedPassword,
                          });
                          newUser.save()
                          .then(userCreated=>{
          
                              if(userCreated){
                                  return res.status(201).json({ message: "User created successfully Created" });
                              } 
                              else{
                                return res.status(400).json({ error: "We can't Create user account at this time Try again later" });
                              }
                          })          
          
                    });
            
                  } 
              });
    
          }
          else {
            return res.status(400).json({ error: "Something went wrong... Try again later"});
          }
        });
       }catch(err){
              console.log(err);
        }

});




module.exports = router;