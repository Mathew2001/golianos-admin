import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATHS } from "../const";


const PrivateRoute = () => {
  const {initialized,accessToken} = useSelector((state) => state.userReducer);
  if(!initialized){
    return <div>Loading...</div>;
  }
  const isAuth = !!accessToken;
  return isAuth ? <Outlet /> : <Navigate to={ROUTE_PATHS.LOGIN} replace />;
};

export default PrivateRoute;

