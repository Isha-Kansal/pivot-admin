import React, { useState } from "react";
import Loader from "../../loader";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CTabs,
  CNavItem,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
} from "@coreui/react";
const UserPlanner = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <CRow>
      <CCol lg={12}>
        {loading && <Loader />}
        <CCard className="position-relative">
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
                <CTabPane></CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default UserPlanner;
