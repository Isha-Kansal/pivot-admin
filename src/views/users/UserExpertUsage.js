import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PaginationCommon from "../../common/pagination";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import Search from "../../common/search";
import { Table } from "reactstrap";
import Pagination from "react-js-pagination";
import { fetchOneUser } from "../store/action";
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
      fetchOneUser(
        `user?id=${user_id}&offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { appointments, appointmentsCount, user } = value.data;

          setUser(user);
          setAppointments(appointments);
          setLoading(false);
          setCount(appointmentsCount);
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
      fetchOneUser(
        `user?id=${user_id}&offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { appointments, appointmentsCount, user } = value.data;

          setUser(user);
          setAppointments(appointments);
          setLoading(false);
          setCount(appointmentsCount);
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
          {/* <div className="text-center search-input">
            <input
              type="search"
              className="form-control"
              placeholder="Search by ID"
              required
              onChange={handleSearch}
            />
          </div> */}
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
                            // state: usersDetails,
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

            {/* <div className="text-center pagination-input">
              {count > offsetLimit && !loading && (
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
            </div> */}
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
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserExpertUsage)
);
