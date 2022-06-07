import React from 'react'
import { GoogleLogin } from 'react-google-login';
import {ToastContainer, toast} from 'react-toastify';


export default function googlebtn() {


    const responseSuccessGoogle = (response) =>{
        console.log(response);
        const tokenId = response.tokenId;

        fetch("/googleauth",{
          method:"post",
          headers:{
              "Content-Type":"application/json",
          },
          body:JSON.stringify({
            tokenId
          })
      }).then(res=>res.json())
      .then(data => {
        if(data.error){ 
          toast.error(data.error,{
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        else{
            window.location.replace('/');
        }
      })
    
      }
    
      const responseErrorGoogle = (response) =>{
        console.log(response);
      }


  return (
    <div>

                <GoogleLogin
                        clientId="688919940654-hm29qeu96n9i9ait295f553acvhh7m7o.apps.googleusercontent.com"
                        buttonText="Sign in / Sign up with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                 />



    </div>
  )
}
