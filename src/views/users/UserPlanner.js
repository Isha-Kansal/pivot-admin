import React from "react";
import Loader from "../../loader";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTabs,
  CNavItem,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
} from "@coreui/react";

import Network from "./planner/Network";
import Explore from "./planner/Explore";
import Learn from "./planner/Learn";
import Prepare from "./planner/Prepare";
import Apply from "./planner/Apply";
const UserPlanner = () => {
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          <CCardHeader>
            Click on a module below to see the information
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Explore</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Network</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Learn</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Prepare</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Apply</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <Explore />
                </CTabPane>
                <CTabPane>
                  <Network />
                </CTabPane>
                <CTabPane>
                  <Learn />
                </CTabPane>
                <CTabPane>
                  <Prepare />
                </CTabPane>
                <CTabPane>
                  <Apply />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default UserPlanner;
