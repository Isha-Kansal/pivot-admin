import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
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

  const detailsOfUser = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Account Details</CCardHeader>
          <CCardBody>
            <table className="table">
              <tbody>
                {detailsOfUser.map(([key, value], index) => {
                  console.log("489678948798", key, value);
                  let keyDetails = titleCase(key);
                  if (key === "first_name") {
                    keyDetails = "First Name";
                  }
                  if (key === "role") {
                    keyDetails = "Current Role";
                  }
                  if (key === "last_name") {
                    keyDetails = "Last Name";
                  }
                  if (key === "full_time_work_experience") {
                    keyDetails = "Work Experience";
                  }
                  if (key === "reason_for_career_change") {
                    keyDetails = "Career Change Reason";
                  }

                  if (key === "contact_no") {
                    keyDetails = "Contact";
                  }

                  if (key === "is_verified") {
                    keyDetails = "Status";

                    if (!value) {
                      value = "Not Verified";
                    } else {
                      value = "Verified";
                    }
                  }
                  if (key === "status") {
                    return null;
                  }
                  if (key === "_id") {
                    keyDetails = "UID";
                  }

                  if (key === "password") {
                    return null;
                  }
                  if (key === "__v") {
                    return null;
                  }
                  return (
                    <tr key={index.toString()}>
                      <td>{`${keyDetails}`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
