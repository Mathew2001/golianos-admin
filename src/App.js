import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import OwnerLayout from "./components/owner/layout/OwnerLayout";
import OwnerRoutes from "./routes/OwnerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLayout from "./components/admin/layout/AdminLayout";
import { ROUTE_PATHS } from "./const";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";
import { ownerRoutes , adminRoutes} from "./routes/routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* public */}
          <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

          {/* protected */}
          <Route element={<PrivateRoute />}>
            <Route element={<OwnerRoutes />}>
              <Route path={"/owner"} element={<OwnerLayout />}>
                {/* default protected page */}
                <Route index element={<Navigate to={ROUTE_PATHS.OWNER_DASHBOARD} replace />} />

                {ownerRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
              </Route>
            </Route>

            <Route element={<AdminRoutes />}>
              <Route path={"/admin"} element={<AdminLayout />}>
                <Route index element={<Navigate to={ROUTE_PATHS.ADMIN_DASHBOARD} replace />} />
                {adminRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
              </Route>
            </Route>
          </Route>

          {/* fallback */}
          <Route path="/" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
          {/* <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} /> */}
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
