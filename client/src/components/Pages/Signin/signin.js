import React from 'react';
import "./signin.css"
import Login from '../../subComponents/Login/login'
import Navbar from '../../subComponents/Headers/Header1/navbar'

export default function signin() {
  return (
    <div className='top-body-padding homeContainer'> 
      <Navbar/> 
      
          <div className='login-container'>
            <Login/>
          </div> 
    </div>
  )
}
