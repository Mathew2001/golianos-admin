import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../const";
import { ROUTE_PATHS } from "../const";

const OwnerRoutes = () => {
  const { accessToken,userInfo,initialized } = useSelector((state) => state.userReducer);
  if(!initialized){
    return <div>Loading...</div>;
  }
  if(!accessToken){
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }
  const isOwner = userInfo?.role === USER_ROLES.OWNER;
  return isOwner ? <Outlet /> : <Navigate to={ROUTE_PATHS.LOGIN} replace />;
}

export default OwnerRoutes;