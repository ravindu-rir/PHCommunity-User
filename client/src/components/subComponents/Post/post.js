import { useState, useEffect} from "react";
import "./post.css"

export default function Post({ SetPostData }) {

    const user = JSON.parse(localStorage.getItem("user"))
    const [getPostData, setgetPostData] = useState([])

    useEffect(()=>{        
        console.log("SetPostData");
        if(SetPostData){
           setgetPostData(SetPostData)
        }
    }, [SetPostData])



    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = getPostData.map(post => {
                if(post._id == result._id){
                    return result
                }
                else{
                    return post
                }
            })
            setgetPostData(newData)

        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id)=>{

        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
          //   console.log(result)
          const newData = getPostData.map(post => {
                if(post._id == result._id){
                    return result
                }
                else{
                    return post
                }
            })
            setgetPostData(newData)

        }).catch(err=>{
          console.log(err)
      })
  }

  return (
    <div>
        {( getPostData.length != 0  || !getPostData ? 
                            
                        getPostData.map(postData=>{ 
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
                                                                {postData.postedBy._id === user._id  &&
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
                                                <a className="text-decoration-none">{postData.likes.length} 
                                                        {( postData.likes.length > 1 || postData.likes.length == 0   ?  " Likes" : " Like" )}
                                                </a>

                                                <a href="#" className="text-decoration-none">{postData.comments.length} Comments</a>
                                                </div>
                                                <div className="d-flex justify-content-around card-footer ">
                                                { !postData.likes.includes(user._id)
                                                  ?  <a className="card-link text-decoration-none" onClick={()=> {likePost(postData._id)}} ><i className="fa fa-gittip " /> Like</a>
                                                  :  <a className="card-link text-decoration-none text-danger" onClick={()=> {unlikePost(postData._id)}} ><i className="fa fa-gittip " /> Like</a>

                                                }
                                                <a href="#" className="card-link text-decoration-none"><i className="fa fa-comment" /> Comment</a>
                                                <a href="#" className="card-link text-decoration-none"><i className="fa fa-mail-forward" /> Share</a>
                                        </div>
                                </div>
                        ) })
        : <div>No Post Available</div> )}
    </div>
  )
}
