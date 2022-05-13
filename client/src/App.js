import React from 'react';
import {BrowserRouter, Router , Routes , Route} from "react-router-dom"

import Home from './components/Pages/Feed/feed';
import Signin from './components/Pages/Signin/signin';
import Signup from './components/Pages/Signup/signupPage';
import Profile from './components/Pages/Profile/profile';
import Testn from './components/test';
import NotFound from './components/Pages/404/notfound';



import './App.css';


function App() {
  return (
    <BrowserRouter>
        <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/signin" element={<Signin/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/test" element={<Testn/>}/>
              <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
