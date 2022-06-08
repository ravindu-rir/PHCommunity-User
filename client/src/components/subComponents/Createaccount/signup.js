import React, { useState, useMemo } from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import countryList from 'react-select-country-list'
import './signup.css';
import {Link} from 'react-router-dom'
import Google from '../../subComponents/GoogleBtn/googlebtn'

export default function Signup() {

      const [firstName , setFirstName] = useState("");
      const [lastName , setLastName] = useState("");
      const [emailAddress , setEmailAddress] = useState("");
      const [country , setCountry] = useState("");
      const [password , setPassword] = useState("");
      const [rePassword , setRePassword] = useState("");

      const countryOptions = useMemo(() => countryList().getData(), [])


      const PostSignup = () =>{
              console.log(firstName)
              
              document.getElementById("signup-alert").style.display = "hide";

            if(!firstName || !lastName || !emailAddress || !country || !password || !rePassword){
              
              document.getElementById("signup-alert").style.display = "flex";
              document.getElementById("signup-alert").innerHTML = "⚠️ Please fill all the field!";
              return
            }



                    fetch("/signup",{
                        method:"post",
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({

                          fName:firstName, 
                          lName:lastName, 
                          email:emailAddress, 
                          country:country, 
                          password:password,
                          rePassword:rePassword

                        })
                    }).then(res=>res.json())
                    .then(data => {

                        if(data.error){ 
                              document.getElementById("signup-alert").style.display = "flex";
                              document.getElementById("signup-alert").innerHTML = data.error;  
                        }
                        else{
                          toast.success(data.message,{
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          setTimeout(function(){
                            window.location.replace('/signin');
                          },1000);
                        }
                          

                      console.log("data create -", data)
                    }).catch((err)=>{
                      console.log("Error - ", err)
                    })
                  

      }



  return (
    <div>
          {/* //For Tost Messages */}
          <ToastContainer />

          {/* <!-- Section: Design Block --> */}
      <section>
      {/* <!-- Jumbotron --> */}
      <div>
      <div class="container-fluid">
        <div>
          <div class="">
            <div class="card">
            <h1 class="text-center mt-3 display-14 fw-bold ls-tight">Sign Up</h1>
              <div class="card-body py-1 px-md-5">
                {/* Signup Forum Start */}
              <div>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <div class="form-outline">

                        <label class="form-label" for="form3Example1">First name</label>

                        <input
                              type="text"
                              class="form-control"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                              />
                      
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                      <label class="form-label" >Last name</label >

                        <input
                              type="text"
                              class="form-control"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                              />
                        
                      </div>
                    </div>
                  </div>

                  {/* <!-- Email input --> */}
                  <div class="form-outline mb-3">
                  <label class="form-label" >Email address</label>
                    <input
                          type="email"
                          class="form-control"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          required
                          />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="form-outline mb-3">
                      <label class="form-label">Country</label>
                      <select type="country"
                              class="form-control" 
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              required
                              >                         
                          <option value="" default hidden> Select Your Country </option>
                      {countryOptions.map(countries=>{
                        return(                                
                          <option value={countries.value}>{countries.label}</option>
                         )
                      })}
                      </select>
                  </div>
                  <div class="form-outline mb-3">
                    <label class="form-label" >Password</label>
                      <input
                            type="password"
                            class="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                      />
                      <span> <i class="fa-solid fa-key text-danger"></i> Password must be at least 8 characters long.</span> <br/>
                      <span><i class="fa-solid fa-key text-danger"></i> Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character.</span>  <br/>
                  </div>

                  <div class="form-outline mb-3">
                    <label class="form-label" >Reenter Password</label>
                      <input
                            type="password"
                            class="form-control"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                      />
                  </div>
                  
                  {/* Validation Alerts */}
                  <div class="alert" id="signup-alert" role="alert"></div>

                  {/* <!-- Submit button --> */}
                  <button
                          type="submit"
                          class="mb-2 btn btn-primary btn-mg btn-block form-control"
                          onClick={() => PostSignup() }
                          >
                    Sign up
                  </button>
                </div>

                  {/* <!-- Register buttons --> */}
                  <div class="text-center">
                    <p>or sign up with:</p>
                    <Google/>
                  </div>

                  <hr/>
                        <div class="text-center">
                        <p>Do You have an account?</p>
                        <Link to='/signin' class="btn-success mt-0 btn btn-primary btn-lg btn-block mb-4 form-control">
                            Sign In
                        </Link>
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* <!-- Jumbotron --> */}
      </section>
      {/* <!-- Section: Design Block --> */}
</div>
  )
}
