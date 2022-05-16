import { useState, useEffect , useRef} from "react";
import './postcreate.css';
import {ToastContainer, toast} from 'react-toastify';
import { ref, uploadBytes, getDownloadURL, listAll,list } from "firebase/storage";
import { storage } from "../../firebase storage/firebase";
import {useNavigate} from 'react-router-dom'

export default function Postcreate() {

    const imgFileRef = useRef();
    const navigate = useNavigate()
    const [topic,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    const [topicdata , setTopicData] = useState([]);

    useEffect(() => {
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

        getTopicData();

      });

      const getTopicData = () =>{
        fetch("/topic/get")
        .then(res=>res.json())
        .then(response=>{
          console.log(response.topics);
          setTopicData(response);
        })
        .catch((err)=>{
           console.log("Error - ",err)
        })
      }

      const PostCreateData = () =>{

        if(!topic || !body){
          
            document.getElementById("signin-alert").style.display = "flex";
            document.getElementById("signin-alert").innerHTML = "Please fill all the field!";
            return
          }
          
                  fetch("/signin",{
                      method:"post",
                      headers:{
                          "Content-Type":"application/json",
                      },
                      body:JSON.stringify({
  
                        topic, 
                        body
  
                      })
                  }).then(res=>res.json())
                  .then(data => {
  
                      if(data.error){ 
                            document.getElementById("signin-alert").style.display = "flex";
                            document.getElementById("signin-alert").innerHTML = data.error;  
                      }
                      else{
                        toast.success(data.message,{
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        setTimeout(function(){
                          window.location.replace('/');
                        },1000);
                      }
                        
                  }).catch((err)=>{
                    console.log("Error - ", err)
                  })

      }

      

  return (
    <div>
       <div>
            <div class="card shadow-sm p-2 mb-5 bg-white rounded">
                    <div>
                            <select  class="form-select mb-2 " name="cars" id="cars">
                                <option  selected disabled hidden>Select Topic</option>
                                <option value={topicdata.topic}>{topicdata.topic}</option>
                            </select>

                        <textarea class="min-vh-15 mb-2 resize-none post-create-textarea"   name="w3review"  placeholder="Say Something..."></textarea>
                        <div className="d-flex flex-row justify-content-between">
                            <input 
                                ref={imgFileRef}
                                className="d-none" 
                                type="file" 
                            />        

                            <button  
                              onClick={() => imgFileRef.current.click()}
                              type="button" 
                              class="btn btn-outline-dark ImageUpload-btn"> 
                              <i class="fa-light fa-folder-image"></i> 
                              Add Image
                           </button>  

                            <div className="d-flex flex-row justify-content-end">
                                <button type="button" class="btn btn-primary post-btn">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
       </div>
    </div>
  )
}
