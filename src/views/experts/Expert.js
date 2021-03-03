import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
  CTabs,
  CNavItem,
  CBadge,
} from "@coreui/react";
import moment from "moment";

import Loader from "../../loader";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { fetchOneExpert } from "../store/action";
const Expert = (props) => {
  const [expert, setExpert] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    const expert_id = props && props.match.params.id;
    dispatch(
      fetchOneExpert(`expert?id=${expert_id}`, (value) => {
        setExpert(value.data.expert);
        setLoading(false);
      })
    );
  }, []);

  let istDate = new Date(expert.createdAt);

  let createdAt = moment(istDate).format("DD-MM-YYYY, hh:mm a");
  let fields =
    expert && expert.expert_fields && expert.expert_fields.join(", ");
  let info = expert && expert.info && expert.info.join(", ");

  let skills =
    expert.skills &&
    expert.skills[0] &&
    expert.skills[0].values &&
    expert.skills[0].values.join(", ");

  const getBadge = (status) => {
    switch (status) {
      case "Deactivated":
        return "danger";

      case "Activated":
        return "success";

      default:
        return "primary";
    }
  };

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          {loading && <Loader />}
          {/* <CCardHeader>Expert Details</CCardHeader> */}

          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Expert Details</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    List of Users that the expert has had calls with
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {expert && (
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
                                  expert.expert_status === "deactivated"
                                    ? "Deactivated"
                                    : "Activated"
                                )}
                              >
                                {expert.expert_status === "deactivated"
                                  ? "Deactivated"
                                  : "Activated"}
                              </CBadge>
                            </td>
                          </tr>
                        )}
                        {!loading && (
                          <tr>
                            <td>EID</td>
                            <td>
                              <strong>{expert._id}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.profile_pic && (
                          <tr>
                            <td>Picture</td>
                            <td>
                              <img
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "4px",
                                }}
                                src={expert.profile_pic}
                                alt="profile"
                              />
                            </td>
                          </tr>
                        )}
                        {expert.first_name && (
                          <tr>
                            <td>First name</td>
                            <td>
                              <strong>{expert.first_name}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.last_name && (
                          <tr>
                            <td>Last name</td>
                            <td>
                              <strong>{expert.last_name}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.email && (
                          <tr>
                            <td>Email</td>
                            <td>
                              <strong>{expert.email}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.contact_no && (
                          <tr>
                            <td>Contact</td>
                            <td>
                              <strong>{expert.contact_no}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.gender && (
                          <tr>
                            <td>Gender</td>
                            <td>
                              <strong>{expert.gender}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.country && (
                          <tr>
                            <td>Country</td>
                            <td>
                              <strong>{expert.country}</strong>
                            </td>
                          </tr>
                        )}
                        {info && (
                          <tr>
                            <td>About</td>
                            <td>
                              <strong>{info}</strong>
                            </td>
                          </tr>
                        )}

                        {expert.current_role && (
                          <tr>
                            <td>Current Role</td>
                            <td>
                              <strong>{expert.current_role}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.industry && (
                          <tr>
                            <td>Current Industry</td>
                            <td>
                              <strong>{expert.industry}</strong>
                            </td>
                          </tr>
                        )}

                        {expert.designation && (
                          <tr>
                            <td>Designation</td>
                            <td>
                              <strong>{expert.designation}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.linkedIn && (
                          <tr>
                            <td>LinkedIn Link</td>
                            <td>
                              <strong>{expert.linkedIn}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.calendar_id && (
                          <tr>
                            <td>Calendar Id</td>
                            <td>
                              <strong>{expert.calendar_id}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.price && (
                          <tr>
                            <td>Rate</td>
                            <td>
                              <strong>{expert.price}</strong>
                            </td>
                          </tr>
                        )}
                        {expert.service && (
                          <tr>
                            <td>Service</td>
                            <td>
                              <strong>{expert.service}</strong>
                            </td>
                          </tr>
                        )}
                        {fields && (
                          <tr>
                            <td>Fields</td>
                            <td>
                              <strong>{fields}</strong>
                            </td>
                          </tr>
                        )}
                        {skills && (
                          <tr>
                            <td>Skills</td>
                            <td>
                              <strong>{skills}</strong>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </CTabPane>
                <CTabPane>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Users List</td>
                      </tr>
                    </tbody>
                  </table>
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
      fetchOneExpert,
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Expert));
