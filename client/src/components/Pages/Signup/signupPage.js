import React from 'react'
import './signuppage.css';
import Signup from '../../subComponents/Createaccount/signup'
import Navbar from '../../subComponents/Headers/Header1/navbar'


export default function signup() {
  return (
    <div className='top-body-padding Signup-Page-Container'> 
      <Navbar/> 
      
          <div className='SignupContainer'>
          <Signup/>
          </div> 
    </div>
  )
}
