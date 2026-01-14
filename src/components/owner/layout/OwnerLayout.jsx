import { Outlet } from 'react-router-dom';
import Sidebar from '../styles/Sidebar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBusiness } from '../../../redux/actions/businessActions';
import { useDispatch } from 'react-redux';

const OwnerLayout = () => {

  const dispatch = useDispatch();

  const { business } = useSelector((state) => state.businessReducer);

  useEffect(() => {
      dispatch(getBusiness());
  }, [dispatch]);

  if(!business){
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid d-flex" dir="rtl">
      <Sidebar businessId={business._id}/>
      <main className="container-fluid flex-grow-1" style={{ marginRight: '16.66%' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;