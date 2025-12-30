import LinkButton from '../buttons/LinkButton'
import { ROUTE_PATHS } from '../../const'
import Pages from './Pages'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllPagesByBusinessId } from '../../redux/actions/PageActions'
import { getBusinessByUserId } from '../../redux/actions/businessActions'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { businessByUserId } = useSelector((state) => state.businessReducer);
  const { pagesByBusinessId } = useSelector((state) => state.pageReducer);

  useEffect(() => {
    if (userInfo._id) {
      dispatch(getBusinessByUserId(userInfo._id));
    }
  }, [dispatch, userInfo._id]);

  useEffect(() => {
    if (businessByUserId._id) {
      dispatch(getAllPagesByBusinessId(businessByUserId._id));
    }
  }, [dispatch, businessByUserId._id]);

  if (!userInfo || !businessByUserId || !pagesByBusinessId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <h1 className="fw-bold text-center mb-0">הדפים שלי</h1>
      {/* <div className="d-flex justify-content-start mb-4">
        <LinkButton
          text="דף חדש"
          to={ROUTE_PATHS.NEW_PAGE}
          className="btn btn-outline-primary fw-bold shadow-sm py-2"
        />
      </div> */}
      <div className="mb-4">
        <Pages/>
      </div>
    </div>
  )
}

export default Dashboard;