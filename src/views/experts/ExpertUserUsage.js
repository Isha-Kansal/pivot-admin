import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table } from "reactstrap";
import Pagination from "react-js-pagination";
import { fetchOneExpert } from "../store/action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Loader from "../../loader";
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
      fetchOneExpert(
        `expert?id=${expert_id}&offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { appointments, count, expert } = value.data;
          setExpert(expert);
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
    // dispatch(
    //   fetchOneExpert(`expert?id=${expert_id}`, (value) => {
    //     setExpert(value.data.expert);
    //     setAppointments(value.data.appointments);
    //     setLoading(false);
    //   })
    // );

    dispatch(
      fetchOneExpert(
        `expert?id=${expert_id}&offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { appointments, count, expert } = value.data;
          setExpert(expert);
          setAppointments(appointments);
          setLoading(false);
          setCount(count);
          setOffset(
            appointments.length && appointments[appointments.length - 1]._id
          );
        }
      )
    );
  }, []);
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          {loading && <Loader />}
          {appointments && appointments.length > 0 && (
            <CCardHeader>
              {" "}
              <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                    onChange={handleSearch}
                  />
                </div>
              </form>
            </CCardHeader>
          )}
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

                        <td>
                          {" "}
                          {item.meeting.firstName && item.meeting.lastName
                            ? item.meeting.firstName +
                              " " +
                              item.meeting.lastName
                            : "-"}
                        </td>
                        <td>{`${item.meeting.date} & ${item.meeting.time}`}</td>
                        <td>
                          {item.appointment_status === "paid"
                            ? "Completed"
                            : "Pending"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {appointments && appointments.length > 0 && (
              <div className="text-center pagination-input">
                {count > offsetLimit && (
                  <Pagination
                    className="mt-3 mx-auto w-fit-content"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="active"
                    activePage={page}
                    itemsCountPerPage={offsetLimit}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    onChange={pageChange}
                  />
                )}
              </div>
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
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExpertUserUsage)
);
