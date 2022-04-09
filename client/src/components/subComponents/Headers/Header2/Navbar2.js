import React from 'react';
import './navbar2.css';



function Navbar2() {
  return (
    <div>
                {/* <!-- Navbar--> */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light nav-box-main">
            <div className="container-fluid justify-content-between">
              {/* <!-- Left elements --> */}
              <div className="d-flex">
                {/* <!-- Brand --> */}
                <a className="navbar-brand me-2 mb-1 d-flex align-items-center" href="#PH">
                  <img
                    className='header-Logo logo-hight'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c6kRXTkFxUtq0kltMq5x49Ag97l5Kekp2Ch3yUzbQ-7eXi_xMOXRlMj12xUOBcijhg&usqp=CAU"
                    height="20"
                    alt="MDB Logo"
                    loading="lazy"
                  />
                </a>
                 
              </div>
              {/* <!-- Left elements --> */}

              {/* <!-- Center elements --> */}
               {/* <!-- Search form --> */}
  
               <form className="input-group w-25 my-auto d-none d-sm-flex">
                      <input
                        autocomplete="off"
                        type="search"
                        className="form-control rounded header-search"
                        placeholder="Search"
                      />
                      <span className="input-group-text border-0 d-none d-lg-flex">
                      <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                </form>
              
              {/* <!-- Center elements --> */}

              {/* <!-- Right elements --> */}
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-3 me-lg-1 active">
                  <a className="nav-link" href="#PH">
                    <span><i className="fas fa-home fa-lg"></i></span>
                  </a>
                </li>

                <li className="nav-item me-3 me-lg-1">
                  <a className="nav-link" href="#PH">
                    <span><i className="fas fa-users fa-lg"></i></span>
                    <span className="badge rounded-pill badge-notification bg-danger">2</span>
                  </a>
                </li>


                <li className="nav-item dropdown me-3 me-lg-1">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#PH"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-comments fa-lg"></i>

                    <span className="badge rounded-pill badge-notification bg-danger">6</span>
                  </a>
                </li>
                <li className="nav-item dropdown me-3 me-lg-1">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#PH"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bell fa-lg"></i>
                    <span className="badge rounded-pill badge-notification bg-danger">12</span>
                  </a>
                </li>

                <li className="nav-item me-3 me-lg-1">
                  <a className="nav-link d-sm-flex align-items-sm-center" href="#PH">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                      className="rounded-circle"
                      height="22"
                      alt="Black and White Portrait of a Man"
                      loading="lazy"
                    />
                    <strong className="d-none d-sm-block ms-1">Janith</strong>
                    <strong className="d-none d-sm-block ms-1">Dilshan</strong>
                  </a>
                </li>

                <li className="nav-item dropdown me-3 me-lg-1">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#PH"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                  <i className="fa-solid fa-gears"></i>
                  </a>
                </li>
              </ul>
              {/* <!-- Right elements --> */}
            </div>
          </nav>
          {/* <!-- Navbar --> */}
              </div>
  );
}

export default Navbar2;
