import { Outlet } from 'react-router-dom';
import Sidebar from '../styles/Sidebar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBusinessByUserId } from '../../redux/actions/businessActions';
import { getUserById } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPagesByBusinessId } from '../../redux/actions/PageActions';

const Layout = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { businessByUserId } = useSelector((state) => state.businessReducer);

  useEffect(() => {
    if (userInfo._id) {
      dispatch(getBusinessByUserId(userInfo._id));
    }
  }, [dispatch, userInfo._id]);

  if(!userInfo || !businessByUserId){
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid d-flex" dir="rtl">
      <Sidebar businessId={businessByUserId._id}/>
      <main className="container-fluid flex-grow-1" style={{ marginRight: '16.66%' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;