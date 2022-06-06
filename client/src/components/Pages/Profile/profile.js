import React from 'react'
import Header from '../../subComponents/Headers/Navbar';
import ProfileHeaderBox from '../../subComponents/Profile/headerbox';



export default function profile() {
  return (
    <div className='top-body-padding'>
      <Header/>
      <ProfileHeaderBox/>
    </div>
  )
}
