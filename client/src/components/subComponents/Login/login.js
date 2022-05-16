
import React,{useState} from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import Google from '../../subComponents/GoogleBtn/googlebtn'
import './login.css';

export default function Login() {


  const [emailAddress , setEmailAddress] = useState("");
  const [password , setPassword] = useState("");

  const PostSignin = () =>{
          
        document.getElementById("signin-alert").style.display = "hide";

        if(!emailAddress || !password){
          
          document.getElementById("signin-alert").style.display = "flex";
          document.getElementById("signin-alert").innerHTML = "Please fill all the field!";
          return
        }
        
                fetch("/signin",{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({

                      email:emailAddress, 
                      password:password

                    })
                }).then(res=>res.json())
                .then(data => {

                    if(data.error){ 
                          document.getElementById("signin-alert").style.display = "flex";
                          document.getElementById("signin-alert").innerHTML = data.error;  
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
                        window.location.replace('/');
                      },1000);
                    }
                      
                }).catch((err)=>{
                  console.log("Error - ", err)
                })
      
   }

  return (
    <div>
                {/* //For Tost Messages */}
                <ToastContainer />
        {/* <!-- Section: Design Block --> */}
          <section class="login-section ">
            {/* <!-- Jumbotron --> */}
            <div class="px-4 py-5 px-md-5 text-center text-lg-start" >
              <div class="">
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

                  <div class="col-lg-6 mb-0 mb-lg-0">
                    <div class="card">
                    <h1 class="text-center mt-5 display-14 fw-bold ls-tight">Sign In</h1>
                      <div class="card-body py-5 px-md-5">
                          <div class="alert alert-danger" id="signin-alert" role="alert"></div>
                      <div>
                          {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                          
                    

                          {/* <!-- Email input --> */}
                          <div class="form-outline mb-4">
                          <label class="form-label" for="form3Example3"
                                  >Email address</label>
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

                          <label class="form-label" for="form3Example4">Password</label>
                            <input
                                  type="password"
                                  id="form3Example"
                                  class="form-control"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                  />
                          </div>

                          {/* <!-- Submit button --> */}
                          <button
                              type="submit"
                              class="mb-3 btn btn-primary btn-mg btn-block form-control"
                              onClick={() => PostSignin()}
                            >
                            Sign In
                          </button>
                    </div>
                          <div class="d-flex justify-content-between align-items-center">
                              {/* <!-- Checkbox --> */}
                              <div class="form-check mb-0">
                                {/* <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label class="form-check-label" for="form2Example3">
                                  Remember me
                                </label> */}
                              </div>
                                <a href="#!" class="text-body text-decoration-none">Forgot password?</a>
                            </div>

                          {/* <!-- Register buttons --> */}
                          <div class="text-center">
                            <p>or Sign in with:</p>
                                <Google buttonText="Sign In  with hhh"/>    
                          </div>
                            <hr/>
                            <div class="text-center">
                            <p>Don't have an account?</p>
                              <Link to='/signup' class="btn-success mt-0 btn btn-primary btn-lg btn-block mb-4 form-control">
                              Create Account
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
