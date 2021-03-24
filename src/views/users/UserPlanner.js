import React, { useState, useEffect } from "react";
import Loader from "../../loader";
import { fetchOneUser } from "../store/action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
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
  let istDate = new Date(plannerData && plannerData.createdAt);

  let createdAt = moment(istDate).format("DD-MM-YYYY, hh:mm a");
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          {!loading && (
            <CCardHeader>Planner created at :{createdAt}</CCardHeader>
          )}
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
                  <Explore explore={plannerData && plannerData.explore} />
                </CTabPane>
                <CTabPane>
                  <Network network={plannerData && plannerData.network} />
                </CTabPane>
                <CTabPane>
                  <Learn learn={plannerData && plannerData.learn} />
                </CTabPane>
                <CTabPane>
                  <Prepare prepare={plannerData && plannerData.prepare} />
                </CTabPane>
                <CTabPane>
                  <Apply apply={plannerData && plannerData.apply} />
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
