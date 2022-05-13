import React from 'react'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';


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
        console.log("data create -", data)
      })
    
      }
    
      const responseErrorGoogle = (response) =>{
        console.log(response);
      }


  return (
    <div>

                <GoogleLogin
                        clientId="688919940654-hm29qeu96n9i9ait295f553acvhh7m7o.apps.googleusercontent.com"
                        buttonText="Sign in  with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                 />



    </div>
  )
}
