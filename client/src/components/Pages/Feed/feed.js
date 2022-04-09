
import React from 'react'
import Header2 from '../../subComponents/Headers/Header2/Navbar2';
import Post from '../../subComponents/Post/post';


export default function feed() {
  return (
    <div className='top-body-padding'>
        <Header2/>

        <div class="container-fluid text-center">    
            <div class="row content">

                <div class="col-sm-3 sidenav">
                    <p><a href="#">Side one</a></p>
                </div>

                <div class="col-sm-5 mt-2"> 
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>

                <div class="col-sm-3 sidenav">
                    <div class="well">
                        <p>ADS</p>
                    </div>
                    <div class="well">
                        <p>ADS</p>
                    </div>
                </div>
            </div>
            </div>
        
         </div>
  )
}
