// src/components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <Outlet />
      <Navbar />
    </div>
  );
};

export default MainLayout;