import React from "react";

import { withRouter } from "react-router-dom";
import {
  CHeader,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";

import routes from "../routes";
import { TheHeaderDropdown } from "./index";

const TheHeader = (props) => {
  return (
    <CHeader withSubheader>
      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown history={props.history} />
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
