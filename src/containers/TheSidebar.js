import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import { LogoFull, LogoMinimized } from "../containers/logo";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <>
      <CSidebar
        show={props.sidebarOpen}
        // onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
        onShowChange={props.setSidebarOpen}
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
        {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
      </CSidebar>
    </>
  );
};

export default React.memo(TheSidebar);
