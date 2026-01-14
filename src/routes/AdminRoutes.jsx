import { ROUTE_PATHS } from '../const';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../const';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const { accessToken,userInfo,initialized } = useSelector((state) => state.userReducer);
  if(!initialized){
    return <div>Loading...</div>;
  }
  if(!accessToken){
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }
  const isAdmin = userInfo?.role === USER_ROLES.SUPER_ADMIN;
  return isAdmin ? <Outlet /> : <Navigate to={ROUTE_PATHS.LOGIN} replace />;
}

export default AdminRoutes;