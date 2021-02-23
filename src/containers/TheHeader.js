import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import {
  CHeader,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CToggler,
} from "@coreui/react";

import routes from "../routes";
import { TheHeaderDropdown, TheSidebar } from "./index";

const TheHeader = (props) => {
  console.log("0569305909079307903", props);
  const toggleSidebar = () => {
    props.toggleSideBar();
  };
  const toggleSidebarMobile = () => {
    props.toggleSideBar();
  };
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown history={props.history} />
        <TheSidebar sidebarOpen={props.sidebarOpen} />
      </CHeaderNav>
      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default withRouter(TheHeader);
