import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

// This component represents the layout for the application.
const AppLayout = () => {
  return (
    <div>
      {/* Include the Header component with the 'isHome' prop set to 'false'. */}
      <Header isHome={false} />

      {/* The <Outlet /> component is a placeholder where nested routes will be rendered. */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
