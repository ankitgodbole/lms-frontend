import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((store) => store.auth);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  return <Navigate to="/denied" />;
};

export default RequireAuth;
