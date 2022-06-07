import React from 'react';
import "./signin.css"
import Login from '../../subComponents/Login/login'

export default function signin() {
  return (

    <div className='Signup-Page-Container container-fluid d-flex align-items-center justify-content-center p-5'>  
          <div className= 'row align-items-center m-0'>

            <div className= 'col-sm m-0'>
                <div>
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
            </div>

            <div className= 'col-sm m-0'>
            <Login/>
            </div>

          </div> 
    </div>
  )
}
