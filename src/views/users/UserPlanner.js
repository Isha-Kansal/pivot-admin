import React, { useState, useEffect } from "react";
import Loader from "../../loader";
import { fetchOneUser } from "../store/action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
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
const UserPlanner = (props) => {
  const [user, setUser] = useState({});
  const [plannerData, setPlannerData] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    const user_id = props && props.match.params.id;
    dispatch(
      fetchOneUser(`user?id=${user_id}`, (value) => {
        setUser(value.data.user);
        setPlannerData(value.data.planner);
        setLoading(false);
      })
    );
  }, []);
  console.log("89546894896790487", plannerData);
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          <CCardHeader>
            Click on a module below to see the information
          </CCardHeader>
          {loading && <Loader />}
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
                  <Explore plannerData={plannerData} />
                </CTabPane>
                <CTabPane>
                  <Network plannerData={plannerData} />
                </CTabPane>
                <CTabPane>
                  <Learn plannerData={plannerData} />
                </CTabPane>
                <CTabPane>
                  <Prepare plannerData={plannerData} />
                </CTabPane>
                <CTabPane>
                  <Apply plannerData={plannerData} />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchOneUser,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPlanner)
);
