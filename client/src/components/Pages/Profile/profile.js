import { useState, useEffect} from "react";
import Header from '../../subComponents/Headers/Navbar';
import ProfileHeaderBox from '../../subComponents/Profile/headerbox';
import Post from '../../subComponents/Post/post';




export default function Profile() {

  const [mypost,setMyPost] = useState([])


  useEffect(()=>{        
    PostRetrieve();
  },[])

const PostRetrieve = () =>{

       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result.mypost)
           setMyPost(result.mypost)
       })
}

  return (
    <div className='top-body-padding'>
      <Header/>

      <div class="row m-0">
          <div class="col ">
              <p><a href="#">Side one</a></p>
          </div>

            <div class="col-8"> 
                <ProfileHeaderBox/>

                {/* Profile Tab Component */}
                <div>
                   {/* Profile Tab Bar Start */}
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a href="#profile" className="nav-link active" data-bs-toggle="tab">Profile</a>
                        </li>
                        <li className="nav-item">
                          <a href="#followers" className="nav-link" data-bs-toggle="tab">Followers</a>
                        </li>
                        <li className="nav-item">
                          <a href="#messages" className="nav-link" data-bs-toggle="tab">3rd</a>
                        </li>
                      </ul>
                   {/* Profile Tab Bar End */}

                     {/*Tab Body Start */}
                      <div className="tab-content">

                        {/*Profile Tab Start */}
                        <div className="tab-pane fade show active" id="profile">
                          <br/>
                                <div class="row">
                                      <div class="col-6 col-md-4">
                                        Personal data & Friends Side
                                      </div>
                                      <div class="col-12 col-md-8">
                                          <Post SetPostData={mypost}/>
                                      </div>
                                </div>
                        </div>
                        {/*Profile Tab End */}

                        {/*Followers Tab Start */}
                        <div className="tab-pane fade" id="followers">
                          <p>Profile tab content ...</p>
                        </div>
                        {/*Followers Tab End */}

                        {/*Tab Start */}
                        <div className="tab-pane fade" id="messages">
                          <p>Messages tab content ...</p>
                        </div>
                        {/*Tab End */}
                        
                      </div>
                       {/*Tab Body End */}
                  </div>
                 {/* Profile Tab End */}


            </div>

            <div class="col">
                <div class="well">
                    <p>ADS</p>
                </div>
                <div class="well">
                    <p>ADS</p>
                </div>
            </div>
        </div>
    </div>
  )
}
