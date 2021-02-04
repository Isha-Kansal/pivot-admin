import React from "react";

import { withRouter } from "react-router-dom";
import { CHeader, CHeaderNav } from "@coreui/react";

// routes config

import { TheHeaderDropdown } from "./index";

const TheHeader = (props) => {
  return (
    <CHeader withSubheader>
      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown history={props.history} />
      </CHeaderNav>
    </CHeader>
  );
};

export default withRouter(TheHeader);
