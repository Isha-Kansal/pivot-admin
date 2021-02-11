import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

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
                  let keyDetails;
                  if (key === "is_verified") {
                    keyDetails = "Status";

                    if (!value) {
                      value = "Not Verified";
                    } else {
                      value = "Verified";
                    }
                  }
                  if (key === "_id") {
                    keyDetails = "ID";
                  }
                  if (key === "email") {
                    keyDetails = "Email";
                  }
                  if (key === "password") {
                    keyDetails = "Password";
                  }
                  if (key === "__v") {
                    keyDetails = "";
                    value = "";
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
