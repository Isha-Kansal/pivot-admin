import React, { useState } from "react";
import { TheContent, TheSidebar, TheHeader } from "./index";

const TheLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSideBar = () => {
    setSidebarOpen((prevState) => {
      if (prevState === "responsive") {
        return true;
      }

      return !prevState;
    });
  };

  const openSideBar = (val) => {
    setSidebarOpen(val);
  };

  return (
    <div className="c-app c-default-layout">
      {sidebarOpen && (
        <TheSidebar sidebarOpen={sidebarOpen} setSidebarOpen={openSideBar} />
      )}
      <div className="c-wrapper">
        <TheHeader sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar} />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
