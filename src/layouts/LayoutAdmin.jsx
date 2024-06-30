import React from "react";
import Dashboard from "../components/Dashboard";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <>
      <Dashboard />
      <Outlet />
    </>
  );
}

export default LayoutAdmin;
