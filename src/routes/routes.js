import { ROUTE_PATHS } from '../const';
import { lazy } from 'react';

const OwnerDashboard = lazy(() => import('../components/owner/pages/Dashboard'));
const OwnerBusiness = lazy(() => import('../components/owner/pages/Business'));
const OwnerNewPage = lazy(() => import('../components/owner/pages/NewPage'));

const AdminDashboard = lazy(() => import('../components/admin/pages/Dashboard'));
const AdminBusiness = lazy(() => import('../components/admin/pages/Business'));
const AdminNewPage = lazy(() => import('../components/admin/pages/NewPage'));

const ReviewButton = lazy(() => import('../components/reviews/ReviewsButton'));
const ContactUsButton = lazy(() => import('../components/contact-us/ContactUsButton'));


const ownerRoutes = [
  {
    path: ROUTE_PATHS.OWNER_DASHBOARD,
    element: <OwnerDashboard />,
  },
  {
    path: ROUTE_PATHS.OWNER_EDIT_BUSINESS,
    element: <OwnerBusiness />,
  },
  {
    path: ROUTE_PATHS.OWNER_REVIEWS,
    element: <ReviewButton />,
  },
  {
    path: ROUTE_PATHS.OWNER_CONTACT_US,
    element: <ContactUsButton />,
  },
  {
    path: ROUTE_PATHS.OWNER_EDIT_PAGE,
    element: <OwnerNewPage />,
  },
]

const adminRoutes = [
  {
    path: ROUTE_PATHS.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  {
    path: ROUTE_PATHS.ADMIN_ADD_BUSINESS,
    element: <AdminBusiness />,
  },
  {
    path: ROUTE_PATHS.ADMIN_EDIT_BUSINESS,
    element: <AdminBusiness />,
  },
  {
    path: ROUTE_PATHS.ADMIN_NEW_PAGE,
    element: <AdminNewPage />,
  },
  {
    path: ROUTE_PATHS.ADMIN_EDIT_PAGE,
    element: <AdminNewPage />,
  },
  {
    path: ROUTE_PATHS.ADMIN_REVIEWS,
    element: <ReviewButton />,
  },
  {
    path: ROUTE_PATHS.ADMIN_CONTACT_US,
    element: <ContactUsButton />,
  },
]
export { ownerRoutes, adminRoutes };