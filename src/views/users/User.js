import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
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
        console.log("4978984578948", value);

        setUsersDetails(value.data.users);
      })
    );
  }, []);
  // let userDetailsData = [];
  // userDetailsData = props && props.history.location.state;
  // console.log("4897894784675687568ghjnghj987", userDetailsData);
  const user =
    usersDetails &&
    usersDetails.find((user) => user._id.toString() === props.match.params.id);
  console.log("48956784987984957", user);
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

  const result = detailsOfUser.map(({ __v, index, ...rest }) => ({ ...rest }));
  console.log("498799487984987", result);
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardBody>
            <table className="table">
              <tbody>
                {detailsOfUser.map(([key, value], index) => {
                  console.log("detailsOfUser", key, value);
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
