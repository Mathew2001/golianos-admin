import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATHS } from "../const";

const PrivateRoute = () => {
  const {userInfo} = useSelector((state) => state.userReducer);
  // If no user, redirect to login
  if (!userInfo) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }
  // Otherwise, render the nested route
  return <Outlet />;
};

export default PrivateRoute;

