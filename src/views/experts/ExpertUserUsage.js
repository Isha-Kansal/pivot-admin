import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table } from "reactstrap";

import { fetchOneExpert, fetchUserExpert } from "../store/action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import PaginationCommon from "../../common/pagination";
import Loader from "../../loader";
import Search from "../../common/search";
const offsetLimit = 10;
const ExpertUserUsage = (props) => {
  const [expert, setExpert] = useState({});
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState({});
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };
  const pageChange = (newPage) => {
    setLoading(true);
    const expert_id = props && props.match.params.id;

    dispatch(
      fetchUserExpert(
        `appointment/all?id=${expert_id}&type=expert&offset=${offset}&limit=${offsetLimit}&search=${search}`,
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
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    const expert_id = props && props.match.params.id;

    dispatch(
      fetchUserExpert(
        `appointment/all?id=${expert_id}&type=expert&offset=${offset}&limit=${offsetLimit}&search=${search}`,
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

  return (
    <CRow>
      <CCol lg={12}>
        <form>
          <Search handleSearch={handleSearch} />
          {!loading && appointments !== undefined && (
            <div className="calls-with-experts">
              {!loading && <h5>Number of calls with users:{count}</h5>}
            </div>
          )}
        </form>
        <CCard className="position-relative">
          {loading && <Loader />}

          <CCardBody>
            <Table
              responsive
              className={`table ${
                appointments && appointments.length === 0 ? "tableHeight" : ""
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
                            pathname: `/users/${item.user_id}`,
                          })
                        }
                      >
                        <td>{item.user_id}</td>

                        {/* <td>
                          {" "}
                          {item.meeting &&
                          item.meeting.firstName &&
                          item.meeting.lastName
                            ? item.meeting.firstName +
                              " " +
                              item.meeting.lastName
                            : "-"}
                        </td> */}

                        <td>
                          {" "}
                          {item.user &&
                          item.user.first_name &&
                          item.user.last_name
                            ? item.user.first_name +
                              " " +
                              item.user.last_name
                            : "-"}
                        </td>


                        <td>
                          {item.meeting
                            ? `${item.meeting.date} & ${item.meeting.time}`
                            : "-"}
                        </td>
                        <td>
                          {item.payment_status === "paid"
                            ? "Completed"
                            : "Pending"}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {appointments && appointments.length > 0 && !loading && (
              <PaginationCommon
                pageChange={pageChange}
                count={count}
                offsetLimit={offsetLimit}
                page={page}
                loading={loading}
              />
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
      fetchOneExpert,
      fetchUserExpert,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExpertUserUsage)
);
