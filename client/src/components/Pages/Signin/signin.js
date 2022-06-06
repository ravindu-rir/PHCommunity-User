import React from 'react';
import "./signin.css"
import Login from '../../subComponents/Login/login'

export default function signin() {
  return (
    <div className='homeContainer'>       
          <div className='login-container'>
            <Login/>
          </div> 
    </div>
  )
}
