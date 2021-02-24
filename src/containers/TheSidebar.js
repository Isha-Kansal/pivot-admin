import React from "react";

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import { LogoFull, LogoMinimized } from "../containers/logo";

import navigation from "./_nav";

const TheSidebar = (props) => {
  return (
    <>
      <CSidebar
        show={props.sidebarOpen}
        onShowChange={(val) => props.setSidebarOpen(val)}
        hideOnMobileClick={true}
      >
        <CSidebarBrand className="" to="/users">
          <LogoFull className="c-sidebar-brand-full" height={35} />
          <LogoMinimized className="c-sidebar-brand-minimized" height={35} />
        </CSidebarBrand>
        <CSidebarNav>
          <CCreateElement
            items={navigation}
            className="sidebar-nav"
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </CSidebarNav>
      </CSidebar>
    </>
  );
};

export default TheSidebar;
