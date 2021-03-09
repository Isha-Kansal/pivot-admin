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

const UserResourceUsage = () => {
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          <CCardHeader>List of Resources</CCardHeader>
          <CCardBody>
            <CTabs></CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default UserResourceUsage;
