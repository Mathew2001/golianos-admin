import { useState, useEffect } from 'react';
import { ROUTE_PATHS } from '../../const';
import SidebarRoutes from '../../routes/SidebarRoutes';
import { useSelector } from 'react-redux'; 
import pageReducer from '../../redux/reducers/PageReducer';
import { getAllPagesByBusinessId } from '../../redux/actions/PageActions';
import { useDispatch } from 'react-redux';
const Sidebar = ({businessId}) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pagesByBusinessId } = useSelector((state) => state.pageReducer);

  useEffect(() => {
    if (businessId) {

      dispatch(getAllPagesByBusinessId(businessId));
    }
  }, [dispatch, businessId]);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  if(!businessId || !pagesByBusinessId){
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar-container" dir="rtl">
      {/* Hamburger Button */}
      <button
        className="btn d-lg-none position-fixed"
        style={{ zIndex: 1051, top: 16, right: 16, background: 'transparent', border: 'none', boxShadow: 'none' }}
        onClick={handleSidebarToggle}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <rect y="4" width="24" height="3" rx="1.5" />
          <rect y="10.5" width="24" height="3" rx="1.5" />
          <rect y="17" width="24" height="3" rx="1.5" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className="position-fixed top-0 left-0 d-lg-none"
        style={{
          background: isSidebarOpen ? 'transparent' : 'rgba(0,0,0,0.3)',
          zIndex: 1050,
          width: isSidebarOpen ? '100vw' : '0vw',
          height: '100vh',
          transition: 'width 0.3s ease, background 0.3s ease',
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
        }}
        onClick={isSidebarOpen ? handleSidebarToggle : undefined}
      />

      {/* Animated sidebar slide-in/out from the right */}
      <div
        className="sidebar-mobile position-fixed bg-info vh-100 d-lg-none"
        style={{
          width: '30vw',
          maxWidth: 560,
          minWidth: 180,
          top: 0,
          right: 0,
          left: 'auto',
          zIndex: 1051,
          backgroundColor: '#e6f0fa',
          transform: isSidebarOpen ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: isSidebarOpen ? '-2px 0 8px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="p-3" dir="rtl">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h4 m-0">Sidebar</h1>
            <button className="btn btn-light btn-sm" onClick={handleSidebarToggle} aria-label="Close sidebar">
              &times;
            </button>
          </div>
          <SidebarRoutes businessId={businessId} pages={pagesByBusinessId}/>
        </div>
      </div>

      {/* Desktop Sidebar (always visible), aligned to the right */}
      <div className="sidebar d-none d-lg-block col-lg-2 vh-100 position-fixed bg-info"
        style={{
          backgroundColor: '#e6f0fa',
          top: 0,
          right: 0,
          left: 'auto'
        }}>
        <div className="p-3">
          <SidebarRoutes businessId={businessId} pages={pagesByBusinessId}/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;