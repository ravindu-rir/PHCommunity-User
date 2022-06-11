
import React, { useState, useEffect } from 'react'
import Header from '../../subComponents/Headers/Navbar';
import PostCreate from '../../subComponents/PostCreate/postcreate';
import Post from '../../subComponents/Post/post';

import "./feed.css"


export default function Feed() {

    const [post,setPost] = useState([])

    useEffect(()=>{        
        PostRetrieve();
    },[])

    const PostRetrieve = () =>{

           fetch('/allpost',{
               headers:{
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               }
           }).then(res=>res.json())
           .then(result=>{
               console.log(result.posts)
               setPost(result.posts)
           })
    }

  return (
    <div className='top-body-padding'>
        <Header/>

        <div class="container-fluid text-center">    
            <div class="row content">

                <div class="col-sm-3 sidenav">
                    <p><a href="#">Side one</a></p>
                </div>

                <div class="col-sm-5 mt-2"> 
                    <PostCreate/> 

                    <Post SetPostData={post}/>
                    
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
