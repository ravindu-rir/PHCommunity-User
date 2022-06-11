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


  const makeComment = (text,postId)=>{
    console.log("hi" + postId)
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            text
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
        setgetPostData(newData);
    }).catch(err=>{
        console.log(err)
    })
 }


  return (
    <div>
        {( getPostData.length != 0  || !getPostData ? 
                            
                        getPostData.map(postData=>{ 
                            return( 
                                <div className="card gedf-card mb-4">
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

                                                <a className="text-decoration-none">{postData.comments.length} 
                                                        {( postData.comments.length > 1 || postData.comments.length == 0   ?  " Comments" : " Comment" )}
                                                </a>
                                        </div>
                                        <div className="d-flex justify-content-around card-footer ">
                                                { !postData.likes.includes(user._id)
                                                  ?  <a className="card-link text-decoration-none" onClick={()=> {likePost(postData._id)}} ><i className="fa fa-gittip " /> Like</a>
                                                  :  <a className="card-link text-decoration-none text-danger" onClick={()=> {unlikePost(postData._id)}} ><i className="fa fa-gittip " /> Like</a>

                                                }
                                                
                                                <a href="#" className="card-link text-decoration-none"><i className="fa fa-comment" /> Comment</a>
                                                <a href="#" className="card-link text-decoration-none"><i className="fa fa-mail-forward" /> Share</a>
                                        </div>

                                        <div className="p-2 overflow-hidden">
                                               <form   onSubmit={(e)=>{
                                                    e.preventDefault()
                                                    makeComment(e.target[0].value, postData._id)
                                                }}>
                                                    <div class="row p-0 m-0">
                                                        <div class="col-10">
                                                             <textarea type="text" rows="1" class="form-control m-0" placeholder="Comment"/>
                                                        </div>
                                                        <div class="col-2 pl-0">
                                                             <button type="submit" class="btn btn-primary"> <i class="fa-solid fa-paper-plane"></i> </button>
                                                        </div>
                                                    </div>
                                               </form>
                                        </div>

                                        <div>
                                            {
                                                postData.comments.map(record=>{
                                                    return(         
                                                        <div key={record._id} className="d-flex align-items-center m-2">
                                                            <div>
                                                                <img className="rounded-circle m-2" width={30} src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"/>
                                                            </div>
                                                            <div className="ml-2">
                                                                    <div>
                                                                        <p className="m-0 p-0 fs-6 fw-bolder">{record.postedBy.fName} {record.postedBy.lName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="m-0  p-0 text-start">{record.text}</p>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                            )
                                                                })
                                            }
                                        </div>
                                </div>
                        ) })
        : <div>No Post Available</div> )}
    </div>
  )
}
