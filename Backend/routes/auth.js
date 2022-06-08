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

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;




router.get('/protected', requireLogin , (req, res)=>{
  console.log("Hi protected")
  return res.status(201).json({ states:true });
});


//@desc Register user
//Access Public
router.post("/signup", async (req, res) => {
    const {fName, lName, email, country, password , rePassword } = req.body;
  try {

            //Check if all fields are empty
            if(!fName || !lName || !email || !country || !password || !rePassword){
                return res.status(422).json({ error: "Please fill all the field" });
            }

            if(!email.match(validRegex)){
              return res.status(422).json({ error: "Please Entre Valid email!" });
            }

            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            // Password must be at least 8 characters long.
            // Password must contain at least 
            // one uppercase letter, 
            // one lowercase letter, 
            // one digit, 
            // one special character.

            if(!password.match(strongPassword)){
              return res.status(422).json({ error: "Password doesn't meet the requirements!" });
            }
            
            //Check Password is match or not
            if(password != rePassword){
              return res.status(422).json({ error: "Password doesn't match!" });
            }

            else{

                //Check if user exists
                let user = await User.findOne({ email:email });
                if (user) {
                  return res.status(400).json({ error: "User already exists" });
                }

                else{
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

  if(!email.match(validRegex)){
    return res.status(422).json({ error: "Please Entre Valid email!" });
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
                  const {_id,fName,lName,email} = savedUser
                  res.json({token , user:{_id,fName,lName,email } });        
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
          if(email_verified){

              //Find User using Google Account Details (email)
               User.findOne({ email:email })
              .then( savedUser =>{

                    //Create User Password
                    const gpassword = email+process.env.JWT_GKEY;  
                
                  //***********User login using Google Account Details
                  if(savedUser){

                    let ifUserActive = savedUser.AccountStatus;
                    if(ifUserActive){
                          try{
                              //Check google "gpassword" match or not
                              if(!savedUser.gpassword){
                                return res.status(400).json({ error: "Invalid Google Login"});
                              }
                              else{
                                  try{
                                    //Check the user password
                                      bcrypt.compare(gpassword,savedUser.gpassword)
                                      .then( doMatch =>{
                                    
                                            if(doMatch){
                                              //Generate User Token
                                              const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET, { expiresIn: '1d'}); 
                                              const {_id,fName,lName,email} = savedUser
                                              res.json({token , user:{_id,fName,lName,email } });         

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
                    else{
                      console.log("Your Account Deactivated");
                      return res.status(400).json({ error: "Your Account Deactivated"  });
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
                                  return res.status(201).json({ message: "User  successfully Created" });
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