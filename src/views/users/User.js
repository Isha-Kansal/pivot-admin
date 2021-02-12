import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { titleCase } from "../../common/stringFunction";

import { fetchUsers } from "../store/action";
const User = (props) => {
  const [usersDetails, setUsersDetails] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchUsers("user/all", (value) => {
        setUsersDetails(value.data.users);
      })
    );
  }, []);

  const user =
    usersDetails &&
    usersDetails.find((user) => user._id.toString() === props.match.params.id);

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
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Account Details</CCardHeader>
          <CCardBody>
            {user && (
              <table className="table">
                <tbody>
                  <tr>
                    <td>Action</td>

                    <td>
                      <CBadge
                        color={getBadge(
                          user.status === "blocked" ? "Blocked" : "Activated"
                        )}
                      >
                        {user.status === "blocked" ? "Blocked" : "Activated"}
                      </CBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>UID</td>
                    <td>
                      <strong>{user._id}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>

                    <td>
                      <CBadge
                        color={getBadge(
                          !user.is_verified ? "Not Verified" : "Verified"
                        )}
                      >
                        {!user.is_verified ? "Not Verified" : "Verified"}
                      </CBadge>
                    </td>
                  </tr>
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
                        <strong>{user.contact_no}</strong>
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
                  {user.reason_for_career_change && (
                    <tr>
                      <td>Career Change Reason</td>
                      <td>
                        <strong>{user.reason_for_career_change}</strong>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
      fetchUsers,
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
