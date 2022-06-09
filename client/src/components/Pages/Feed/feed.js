
import React, { useState, useEffect } from 'react'
import Header from '../../subComponents/Headers/Navbar';
import PostCreate from '../../subComponents/PostCreate/postcreate';
import "./feed.css"


export default function Feed() {

    const [post,setPost] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))

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
               console.log(result)
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
                    
            {post.map(postData=>{ 
                   return( 
                    <div className="card gedf-card">
                            <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-between align-items-center">
                                        <div className="mr-2">
                                            <img className="rounded-circle mr-9" width={45} src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                        </div>
                                        <div className="post-user-box">
                                            <div className="h5 m-0">{postData.postedBy.fName} {postData.postedBy.lName}</div>
                                            <div className="text-start text-muted float-l"> <i className="fa fa-clock-o" /> 10 min ago</div>
                                        </div>
                                        </div>

                                        <div> 
                                            <div className="dropdown dropdown-menu-end">
                                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
                                                            <i class="fa-solid fa-ellipsis"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                    {postData.postedBy._id == user._id  &&
                                                        <>
                                                            <li><a className="dropdown-item" href="#">Edit Post</a></li>
                                                            <li><a className="dropdown-item" href="#">Delete Post</a></li>
                                                        </>
                                                    }
                                                    {postData.postedBy._id != user._id  &&
                                                        <>
                                                            <li><a className="dropdown-item" href="#">Report Post</a></li>

                                                        </>
                                                    }
                                                    </ul>
                                            </div>
                                        </div>

                                    </div>
                            </div>

                            <div className="card-body p-0">
                                <div className="card-body-p1 p-3">
                                    <h5 className="card-title">{postData.title}</h5>
                                    <p>{postData.body}</p>
                                </div>
                            {postData.photo && 
                                <div className="card-body-p2">
                                    <img src={postData.photo} alt="" />
                                </div>
                            } 
                            </div>
                            <div className="d-flex justify-content-around mt-2">
                                    <a href="#" className="text-decoration-none">76 Likes</a>
                                    <a href="#" className="text-decoration-none">6 Comments</a>
                                    </div>
                                    <div className="d-flex justify-content-around card-footer ">
                                    <a href="#" className="card-link text-decoration-none"><i className="fa fa-gittip " /> Like</a>
                                    <a href="#" className="card-link text-decoration-none"><i className="fa fa-comment" /> Comment</a>
                                    <a href="#" className="card-link text-decoration-none"><i className="fa fa-mail-forward" /> Share</a>
                            </div>
                    </div>
              ) })}

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
