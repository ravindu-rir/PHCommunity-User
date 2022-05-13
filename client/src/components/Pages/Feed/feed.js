
import React from 'react'
import Header2 from '../../subComponents/Headers/Header2/Navbar2';
import Post from '../../subComponents/Post/post';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function feed() {
    toast("Cost Successfully Added");
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
