import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Login from "./components/pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/layout/Layout";
import routes from "./routes/routes";
import { ROUTE_PATHS } from "./const";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* when user opens / */}
          <Route path="/" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />

          <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

          {/* protected area */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
