import React from 'react'
import {Link} from 'react-router-dom'

export default function signup() {
  return (
    <div>
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
                <form>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">

                        <label class="form-label" for="form3Example1">First name</label>

                        <input
                              type="text"
                              id="form3Example1"
                              class="form-control"
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
                          />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example4">Country</label>
                      <select type="country"
                              id="form3Example4"
                              class="form-control" 
                              name="country">
                          <option value="">--</option>
                          <option value="India">India</option>
                      </select>
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4">Password</label>
                      <input
                            type="password"
                            id="form3Example4"
                            class="form-control"
                      />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4">Reenter Password</label>
                      <input
                            type="password"
                            id="form3Example4"
                            class="form-control"
                      />
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                          type="submit"
                          class="mb-3 btn btn-primary btn-mg btn-block form-control"
                          >
                    Sign up
                  </button>

                  {/* <!-- Register buttons --> */}
                  <div class="text-center">
                    <p>or sign up with:</p>
                    <button
                            type="button"
                            class="btn btn-link btn-floating mx-1"
                            >
                      <i class="fab fa-facebook-f"></i>
                    </button>

                    <button
                            type="button"
                            class="btn btn-link btn-floating mx-1"
                            >
                      <i class="fab fa-google"></i>
                    </button>

                    <button
                            type="button"
                            class="btn btn-link btn-floating mx-1"
                            >
                      <i class="fab fa-twitter"></i>
                    </button>

                    <button
                            type="button"
                            class="btn btn-link btn-floating mx-1"
                            >
                      <i class="fab fa-github"></i>
                    </button>
                  </div>

                  <hr/>
                        <div class="text-center">
                        <p>Do You have an account?</p>
                        <Link to='/' class="btn-success mt-0 btn btn-primary btn-lg btn-block mb-4 form-control">
                            Sign In
                        </Link>
                      </div>


                </form>
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
