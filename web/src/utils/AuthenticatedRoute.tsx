import React from "react";
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuth } from "./auth-provider";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const auth = useAuth();
  const isAuthenticated = !!auth.cookies?.il;

  if (false) {
    return <p>Checking authentication..</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
