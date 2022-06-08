import React, {useState, useEffect}  from 'react';
import {BrowserRouter, Router , Routes , Route} from "react-router-dom"
import './App.css';


import Home from './components/Pages/Feed/feed';
import Signin from './components/Pages/Signin/signin';
import Signup from './components/Pages/Signup/signupPage';
import Profile from './components/Pages/Profile/profile';
import Testn from './components/test';
import NotFound from './components/Pages/404/notfound';

//If user is not login user can't access Protected Routes
import Protected from "./components/Auth/Protected";

//If user is login user can't access Public Routes
import PublicRoute from "./components/Auth/PublicRoute";




function App() {

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <BrowserRouter>
        <Routes>
              <Route exact path="/" element={ <Protected isLoggedIn={user}> <Home/> </Protected> }/>
              <Route path="/profile" element={ <Protected isLoggedIn={user}> <Profile/> </Protected> }/>

              <Route path="/signup" element={ <PublicRoute isLoggedIn={user}> <Signup/> </PublicRoute> }/>
              <Route path="/signin" element={ <PublicRoute isLoggedIn={user}> <Signin/> </PublicRoute> } />

              <Route path="/test" element={<Testn/>}/>
              <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
