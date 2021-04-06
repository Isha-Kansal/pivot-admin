import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PaginationCommon from "../../common/pagination";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import Search from "../../common/search";
import { Table } from "reactstrap";

import { fetchOneUser, fetchUserExpert } from "../store/action";
import { connect } from "react-redux";
import Loader from "../../loader";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
const offsetLimit = 10;
const UserExpertUsage = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState("");
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState({});
  const [count, setCount] = useState(0);
  useEffect(() => {
    setLoading(true);

    const user_id = props && props.match.params.id;

    dispatch(
      fetchUserExpert(
        `appointment/all?id=${user_id}&type=user&offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { appointments, count } = value.data;

          setAppointments(appointments);
          setLoading(false);
          setCount(count);
          setOffset(
            appointments.length && appointments[appointments.length - 1]._id
          );
        }
      )
    );
  }, [search]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };

  const pageChange = (newPage) => {
    setLoading(true);
    const user_id = props && props.match.params.id;
    dispatch(
      fetchUserExpert(
        `appointment/all?id=${user_id}&type=user&offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { appointments, count } = value.data;

          setAppointments(appointments);
          setLoading(false);
          setCount(count);
          setOffset(
            appointments.length && appointments[appointments.length - 1]._id
          );
          setPage(newPage);
        }
      )
    );
  };

  return (
    <CRow>
      <CCol lg={12}>
        <form>
          <Search handleSearch={handleSearch} />
          {!loading && (
            <div className="calls-with-experts">
              {!loading && appointments !== undefined && (
                <h5>
                  Number of calls with experts:<span>{count}</span>
                </h5>
              )}
            </div>
          )}
        </form>
        <CCard className="position-relative">
          {loading && <Loader />}

          <CCardBody>
            <Table
              responsive
              className={`table ${
                appointments.length === 0 ? "tableHeight" : ""
              }`}
            >
              {appointments && appointments.length > 0 && (
                <thead>
                  <tr>
                    <th className="text-nowrap ">Id</th>

                    <th>Name</th>

                    <th>Date & Time</th>
                    <th>Payment Status</th>
                    <th>Service</th>
                    <th>Topics</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {appointments && appointments.length === 0 && (
                  <h3 className="text-center no-user-found">
                    No Appointments Found!
                  </h3>
                )}
                {appointments &&
                  appointments.length > 0 &&
                  appointments.map((item, index) => {
                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/experts/${item.expert_id}`,
                          })
                        }
                      >
                        <td>{item.expert_id}</td>
                        <td>
                          {" "}
                          {item.expert &&
                          item.expert.first_name &&
                          item.expert.last_name
                            ? item.expert.first_name +
                              " " +
                              item.expert.last_name
                            : "-"}
                        </td>

                        <td>
                          {item.meeting
                            ? `${item.meeting.date} & ${item.meeting.time}`
                            : "-"}
                        </td>
                        {console.log("9487894587985978",)}
                        <td>
                          {item.payment_status === "paid"
                            ? "Completed"
                            : "Pending"}
                        </td>
                        <td>
                          {item.meeting
                            ? item.meeting.type
                            : "-"}
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            <PaginationCommon
              pageChange={pageChange}
              count={count}
              offsetLimit={offsetLimit}
              page={page}
              loading={loading}
            />
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
      fetchUserExpert,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserExpertUsage)
);
