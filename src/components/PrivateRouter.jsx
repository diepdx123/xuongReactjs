import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import AccessDeniedPage from "../pages/AccessDeniedPage";

function PrivateRouter() {
  const { isAuth, user } = useContext(AuthContext);
  console.log(isAuth, user);
  if (user?.role !== "admin") {
    return <AccessDeniedPage />;
  }
  return <Outlet />;
}

export default PrivateRouter;
