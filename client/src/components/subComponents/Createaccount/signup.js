import React,{useState} from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

      const PostSignup = () =>{
              
              document.getElementById("signup-alert").style.display = "hide";

            if(!firstName || !lastName || !emailAddress || !country || !password || !rePassword){
              
              document.getElementById("signup-alert").style.display = "flex";
              document.getElementById("signup-alert").innerHTML = "Please fill all the field!";
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
      <section class="">
      {/* <!-- Jumbotron --> */}
      <div
        class="px-4 py-5 px-md-5 text-center text-lg-start"

        >
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
              The best offer <br />
              <span class="text-primary">for your business</span>
            </h1>
            <p >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eveniet, itaque accusantium odio, soluta, corrupti aliquam
              quibusdam tempora at cupiditate quis eum maiores libero
              veritatis? Dicta facilis sint aliquid ipsum atque?
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card">
            <h1 class="text-center mt-5 display-14 fw-bold ls-tight">Sign Up</h1>
              <div class="card-body py-1 px-md-5">

              <div class="alert alert-danger" id="signup-alert" role="alert"></div>

                {/* Signup Forum Start */}
              <div>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">

                        <label class="form-label" for="form3Example1">First name</label>

                        <input
                              type="text"
                              id="form3Example1"
                              class="form-control"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                              />
                      
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                      <label class="form-label" for="form3Example2">Last name</label >

                        <input
                              type="text"
                              id="form3Example2"
                              class="form-control"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                              />
                        
                      </div>
                    </div>
                  </div>

                  {/* <!-- Email input --> */}
                  <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example3">Email address</label>
                    <input
                          type="email"
                          id="form3Example3"
                          class="form-control"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          required
                          />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example4">Country</label>
                      <select type="country"
                              id="form3Example4"
                              class="form-control" 
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              required
                              >
                          <option value="" default>--</option>
                          <option value="India">India</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                      </select>
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4">Password</label>
                      <input
                            type="password"
                            id="form3Example4"
                            class="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                      />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4">Reenter Password</label>
                      <input
                            type="password"
                            id="form3Example4"
                            class="form-control"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                      />
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                          type="submit"
                          class="mb-3 btn btn-primary btn-mg btn-block form-control"
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
