import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import LayoutAdmin from "../layouts/LayoutAdmin";

function PrivateRouter() {
  const accessToken = JSON.parse(localStorage.getItem("users"))?.accessToken;
  return accessToken ? <LayoutAdmin /> : <Navigate to="/login" />;
}

export default PrivateRouter;
