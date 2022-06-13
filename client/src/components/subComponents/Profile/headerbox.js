import React, { useEffect } from 'react'
import ("./headerbox.css")


export default function headerbox(){

    const profile = ()=>{
        useEffect(()=>{
            fetch('/mypost',{
                headers:{
                    "Authorization":"Bearer"+
                }
            })
        },[])
  return (
    <div class="row py-2">
    <div class="col-md-8 mx-auto">
        {/* <!-- Profile widget --> */}
        <div class="bg-white shadow rounded overflow-hidden">
            <div className='profile-cover-box'>
                <img src="https://cdn.quotesgram.com/img/79/32/2031475158-if-you-never-failed.jpg" />
            </div>
            <div class="px-4 pt-0 pb-auto profile-details-div">
                <div class="media align-items-end profile-head">
                    <div class="profile-img-box d-flex text-white profile mr-3">
                      <div>
                          <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
                          alt="..." width="130" class="rounded mb-2 img-thumbnail"/>
                      </div>
                    </div>

                    <div className='d-flex flex-wrap profile-details'>
                         <h4>Janith Dilshan</h4>
                         <p><i class="fas fa-map-marker-alt "></i>&nbsp;Sri Lanka</p>
                    </div>
                    <br/>
                    <div class="media-body mb-1 text-white">
                      <a href="#" class="follow-btn-profile btn btn-primary btn-md">Follow</a>
                    </div>
                </div>
            </div>
            <br/>
            <div class="bg-light  p-4 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                        <h5 class=" font-weight-bold mb-0 d-block">745</h5><small class="text-muted"> Followers</small>
                    </li>
                    <li class="list-inline-item">
                        <h5 class="font-weight-bold mb-0 d-block">340</h5><small class="text-muted"> Following</small>
                    </li>
                </ul>
            </div>
            <div class="px-4 py-3">
                <h5 class="mb-0">About</h5>
                <div class="p-4 rounded shadow-sm bg-light">
                    <p class="font-italic mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at 
                    cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
}


