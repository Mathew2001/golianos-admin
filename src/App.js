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
          {/* public */}
          <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

          {/* protected */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              {/* default protected page */}
              <Route index element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />

              {routes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          </Route>

          {/* fallback */}
          {/* <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} /> */}
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
