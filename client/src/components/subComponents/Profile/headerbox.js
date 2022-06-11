import React from 'react'
import ("./headerbox.css")


export default function headerbox(){
    
  return (
    <div className="row py-2">
            <div className="col-md-8 w-100">
                    {/* Profile widget */}
                    <div className="bg-white shadow rounded overflow-hidden">
                            <div className="profile-cover-box">
                                <img src="https://cdn.quotesgram.com/img/79/32/2031475158-if-you-never-failed.jpg" />
                            </div>
                            <div className="px-4 pt-0 pb-auto profile-details-div">
                                <div className="media align-items-end profile-head">
                                <div className="profile-img-box d-flex text-white profile mr-3">
                                    <div>
                                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="..." width={130} className="rounded mb-2 img-thumbnail" />
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap profile-details">
                                    <h4>Janith Dilshan</h4>
                                </div>
                                <br />
                                <div className="media-body mb-1 text-white">
                                    <a href="#" className="follow-btn-profile btn btn-primary btn-md">Follow</a>
                                </div>
                                </div>
                            </div>

                            <br />

                            <div className="bg-light  p-4 d-flex justify-content-end text-center">
                                <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className=" font-weight-bold mb-0 d-block">745</h5><small className="text-muted"> Followers</small>
                                </li>
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">340</h5><small className="text-muted"> Following</small>
                                </li>
                                </ul>
                            </div>

                            <div className="px-4 py-3">
                                <h5 className="mb-0">About</h5>
                                <div className="p-4 rounded shadow-sm bg-light">
                                <p className="font-italic mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at 
                                    cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?</p>
                                </div>
                            </div>
                    </div>
            </div>
    </div>

  )
}


