import React, { useState, useEffect } from "react";
import moment from "moment";
import UserPlanner from "../users/UserPlanner";
import UserExpertUsage from "../users/UserExpertUsage";
import UserResourceUsage from "../users/UserResourceUsage";

import {
  CCard,
  CCardBody,
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
import Loader from "../../loader";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { fetchOneUser } from "../store/action";
const User = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    const user_id = props && props.match.params.id;
    dispatch(
      fetchOneUser(`user?id=${user_id}`, (value) => {
        setUser(value.data.user);
        setAppointments(value.data.appointments);
        setLoading(false);
      })
    );
  }, []);

  const getBadge = (status) => {
    switch (status) {
      case "Verified":
        return "success";

      case "Not Verified":
        return "danger";
      case "Activated":
        return "success";

      case "Blocked":
        return "danger";
      default:
        return "primary";
    }
  };

  let reasonForCareerChange =
    user &&
    user.reason_for_career_change &&
    user.reason_for_career_change.join(", ");

  let istDate = new Date(user.createdAt);

  let createdAt = moment(istDate).format("DD-MM-YYYY, hh:mm a");

  const onClickExpert = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}/expert-features`);
  };
  const onClickResource = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}/resource-features`);
  };

  const onClickPlanner = () => {
    const user_id = props && props.match.params.id;
    props.history.push(`/users/${user_id}/planner-activity`);
  };
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          {loading && <Loader />}

          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Account Details</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink onClick={onClickPlanner}>Planner Activity</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink onClick={onClickExpert}>
                    Usage of expert features
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink onClick={onClickResource}>
                    Usage of resource features
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {user && (
                    <table className="table">
                      <tbody>
                        {createdAt !== "Invalid date" && (
                          <tr>
                            <td>Created At</td>
                            <td>
                              <strong> {createdAt}</strong>
                            </td>
                          </tr>
                        )}
                        {!loading && (
                          <tr>
                            <td>Status</td>

                            <td>
                              <CBadge
                                color={getBadge(
                                  user.user_status === "blocked"
                                    ? "Blocked"
                                    : "Activated"
                                )}
                              >
                                {user.user_status === "blocked"
                                  ? "Blocked"
                                  : "Activated"}
                              </CBadge>
                            </td>
                          </tr>
                        )}
                        {!loading && (
                          <tr>
                            <td>UID</td>
                            <td>
                              <strong>{user._id}</strong>
                            </td>
                          </tr>
                        )}
                        {!loading && (
                          <tr>
                            <td>Email Verification</td>

                            <td>
                              <CBadge
                                color={getBadge(
                                  !user.is_verified
                                    ? "Not Verified"
                                    : "Verified"
                                )}
                              >
                                {!user.is_verified
                                  ? "Not Verified"
                                  : "Verified"}
                              </CBadge>
                            </td>
                          </tr>
                        )}
                        {user.first_name && (
                          <tr>
                            <td>First name</td>
                            <td>
                              <strong>{user.first_name}</strong>
                            </td>
                          </tr>
                        )}
                        {user.last_name && (
                          <tr>
                            <td>Last name</td>
                            <td>
                              <strong>{user.last_name}</strong>
                            </td>
                          </tr>
                        )}
                        {user.contact_no && (
                          <tr>
                            <td>Contact</td>
                            <td>
                              <strong>
                                {user.contact_no.value || user.contact_no}
                              </strong>
                            </td>
                          </tr>
                        )}
                        {user.email && (
                          <tr>
                            <td>Email</td>
                            <td>
                              <strong>{user.email}</strong>
                            </td>
                          </tr>
                        )}
                        {user.gender && (
                          <tr>
                            <td>Gender</td>
                            <td>
                              <strong>{user.gender}</strong>
                            </td>
                          </tr>
                        )}
                        {user.role && (
                          <tr>
                            <td>Role</td>
                            <td>
                              <strong>{user.role}</strong>
                            </td>
                          </tr>
                        )}
                        {user.country && (
                          <tr>
                            <td>Country</td>
                            <td>
                              <strong>{user.country}</strong>
                            </td>
                          </tr>
                        )}
                        {user.industry && (
                          <tr>
                            <td>Industry</td>
                            <td>
                              <strong>{user.industry}</strong>
                            </td>
                          </tr>
                        )}
                        {user.full_time_work_experience && (
                          <tr>
                            <td>Work Experience</td>
                            <td>
                              <strong>{user.full_time_work_experience}</strong>
                            </td>
                          </tr>
                        )}

                        {reasonForCareerChange && (
                          <tr>
                            <td>Career Change Reason</td>
                            <td>
                              <strong>{reasonForCareerChange}</strong>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </CTabPane>
                <CTabPane>
                  <UserPlanner />
                </CTabPane>
                <CTabPane>
                  <UserExpertUsage
                    appointments={appointments}
                    user_id={user._id}
                  />
                </CTabPane>
                <CTabPane>
                  <UserResourceUsage />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
