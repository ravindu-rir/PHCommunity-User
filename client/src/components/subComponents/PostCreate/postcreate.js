import { useState, useEffect , useRef} from "react";
import './postcreate.css';
import {ToastContainer, toast} from 'react-toastify';
import { ref, uploadBytes, getDownloadURL, listAll,list } from "firebase/storage";
import { storage } from "../../firebase storage/firebase";
import { v4 } from "uuid";
import {useNavigate} from 'react-router-dom'

export default function Postcreate() {

    const imgFileRef = useRef();
    const navigate = useNavigate()
    const [topic,setTopic] = useState("")
    const [body,setBody] = useState("")
    const [imageUpload, setImageUpload] = useState("");
    const [url,setUrl] = useState("")

    const [topicdata , setTopicData] = useState([]);

    useEffect(() => {
       
        textareaResizing();
        getTopicData();

      }, []);

      useEffect(() => {

        if(url){
          PostCreate();
        }

      }, [url]);

      const getTopicData = () =>{
        fetch("/topic/get")
        .then(res=>res.json())
        .then(result=>{
          setTopicData(result.Topics);
        })
        .catch((err)=>{
           console.log("Error - ",err)
        })
      }

      const textareaResizing = () =>{
           // textarea auto resizing limit=250px
        const textarea = document.querySelector("textarea");
        textarea.addEventListener("keyup", e =>{
          textarea.style.height = `45px`
          let scHeight = e.target.scrollHeight;
            if(scHeight < 250){
                textarea.style.height = `${scHeight}px`;
            }
            else{
                textarea.style.height = `250px`
            }
        });
      }


      const uploadFile =  () => {
        if (imageUpload == null){
          return;
        }     
        else{
              const imageRef = ref(storage, `posts/${imageUpload.name + v4()}`);
               uploadBytes(imageRef, imageUpload).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((imageurl) => {
                    console.log(imageurl) //test
                    setUrl(imageurl)
                    
                });
              });
        }   
    
      };


      const PostCreateData =  () =>{

        if(imageUpload){
              uploadFile()
              console.log("URL - " + url)
        }
        else{
          PostCreate();
        }


      }

      const PostCreate = () =>{
        console.log("hello upload")
        if(!topic || !body ){
          
          document.getElementById("createPost-alert").style.display = "flex";
          document.getElementById("createPost-alert").innerHTML = "Please fill all the field!";
          return
        }
        
                fetch("/createpost",{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer " + localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({

                      topic, 
                      body,
                      url

                    })
                }).then(res=>res.json())
                .then(data => {

                    if(data.error){ 
                          document.getElementById("createPost-alert").style.display = "flex";
                          document.getElementById("createPost-alert").innerHTML = data.error;  
                    }
                    else{
                      toast.success("Post Created",{
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      setTimeout(function(){
                        window.location.replace('/');
                        navigate.push('/')
                      },1000);
                    }
                      
                }).catch((err)=>{
                  console.log("Error - ", err)
                })
      }
      

  return (
    <div>
                {/* //For Tost Messages */}
                <ToastContainer />
       <div>
            <div class="card shadow-sm p-2 mb-5 bg-white rounded">
                    
                    <div>
                    
                    {/* //Create Drop Down using topic Tabale in DB */}
                    <select  
                    class="form-select mb-2 "  
                    name="topic" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    >
                                  <option key="" value="" selected disabled hidden>Select Topic</option>
                      {topicdata.map(topicItem=>{
                         return(                                
                                    <option key={topicItem.topic} value={topicItem.topic}>{topicItem.topic}</option>
                         )
                      })}
                         </select>


                        <textarea class="min-vh-15 mb-2 resize-none post-create-textarea"    
                          name="w3review"  
                          placeholder="Say Something..."
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          required
                          ></textarea>

                        {/* Alert */}
                        <div class="text-danger mb-1" id="createPost-alert" role="alert"></div>

                        
                        <div className="d-flex flex-row justify-content-between">
                            <input 
                                ref={imgFileRef}
                                className="d-none" 
                                type="file" 
                                onChange={(event) => {
                                  setImageUpload(event.target.files[0]);
                                }}
                            />        

                            <button  
                              onClick={() => imgFileRef.current.click()}
                              type="button" 
                              class="btn btn-outline-dark ImageUpload-btn"> 
                              <i class="fa-light fa-folder-image"></i> 
                              Add Image
                           </button>  

                            <div className="d-flex flex-row justify-content-end">
                                <button type="button" 
                                  class="btn btn-primary post-btn"
                                  onClick={() => PostCreateData() }
                                  >Post</button>
                            </div>
                        </div>
                    </div>
                </div>
       </div>
    </div>
  )
}
