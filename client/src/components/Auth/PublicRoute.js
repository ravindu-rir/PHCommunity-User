import { Navigate } from "react-router-dom";
import React, {useState}  from 'react';

const PublicRoute = ({isLoggedIn, children }) => {

    

    if (isLoggedIn) {
    return <Navigate to="/" replace />;
    }
    return children;

};
export default PublicRoute;