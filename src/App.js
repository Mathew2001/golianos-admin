import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATHS } from './const';
import {Suspense} from 'react';
import Login from './components/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/layout/Layout';
import routes from './routes/routes';
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
          <Route path="" element={<PrivateRoute />} >
            <Route path="" element={<Layout />} >
               {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
               ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
