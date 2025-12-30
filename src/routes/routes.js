import { ROUTE_PATHS } from '../const';
import { lazy } from 'react';

const Dashboard = lazy(() => import('../components/pages/Dashboard'));
const Business = lazy(() => import('../components/pages/Business'));
const Reviews = lazy(() => import('../components/reviews/ReviewsButton'));
const ContactUs = lazy(() => import('../components/contact-us/ContactUsButton'));
const NewPage = lazy(() => import('../components/pages/NewPage'));

const routes = [
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTE_PATHS.ADD_BUSINESS,
    element: <Business />,
  },
  {
    path: ROUTE_PATHS.EDIT_BUSINESS,
    element: <Business />,
  },
  {
    path: ROUTE_PATHS.REVIEWS,
    element: <Reviews />,
  },
  {
    path: ROUTE_PATHS.CONTACT_US,
    element: <ContactUs />,
  },
  {
    path: ROUTE_PATHS.NEW_PAGE,
    element: <NewPage />,
  },
  {
    path: ROUTE_PATHS.EDIT_PAGE,
    element: <NewPage />,
  },
]

export default routes;