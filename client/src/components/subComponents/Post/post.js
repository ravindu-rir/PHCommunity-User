import React from 'react'
import ('./post.css')

export default function 

() {
  return (
    <div>
        {/* <!--- \\\\\\\Post--> */}
                <div class="card gedf-card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle mr-9" width="45" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                </div>
                                <div class="post-user-box">
                                    <div class="h5 m-0">Janith Dilshan</div>
                                    <div class="text-start h7 text-muted float-l">@JanithDil</div>
                                </div>
                            </div>
                            <div class="text-muted h7-text mb-2"> <i class="fa fa-clock-o"></i>10 min ago</div>
                        </div>

                    </div>
                    <div class="card-body">
                        <a class="card-link" href="#">
                            <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                        </a>

                        <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor
                            sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste voluptates.
                        </p>
                    </div>

                    <div class="d-flex justify-content-around m-2">
                        <a href="#" class="text-decoration-none">76 Likes</a>
                        <a href="#" class="text-decoration-none">6 Comments</a>
                    </div>

                    <div class="d-flex justify-content-around card-footer ">
                        <a href="#" class="card-link text-decoration-none"><i class="fa fa-gittip "></i> Like</a>
                        <a href="#" class="card-link text-decoration-none"><i class="fa fa-comment"></i> Comment</a>
                        <a href="#" class="card-link text-decoration-none"><i class="fa fa-mail-forward"></i> Share</a>
                    </div>
                </div>
                {/* <!-- Post /////--> */}
    
    </div>
  )
}
