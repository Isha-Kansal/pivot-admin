import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
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
  console.log("7490568875085608", props);

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
      fetchOneUser(`user?id=${user_id}`, (value) => {
        setUser(value.data.user);
        setAppointments(value.data.appointments);
        setLoading(false);
      })
    );
  }, []);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };

  const pageChange = (newPage) => {
    // setLoading(true);
    // const user_id = props && props.user_id;
    // const appointments = props && props.appointments;
    // console.log("8456704789847984", props);
    // props.fetchOneUser(
    //   `user?id=${user_id}?offset=${offset}&limit=${offsetLimit}&search=${search}`,
    //   (value) => {
    //     const { users, count } = value.data;
    //     setUser(value.data.user);
    //     // setAppointments(value.data.appointments);
    //     setLoading(false);
    //     setCount(count);
    //     setOffset(
    //       appointments.length && appointments[appointments.length - 1]._id
    //     );
    //     setPage(newPage);
    //   }
    // );
  };

  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
          {loading && <Loader />}
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
                        <td>{/* {item.meeting.calendar} */}</td>

                        <td>{`${item.meeting.date} & ${item.meeting.time}`}</td>
                        <td>{item.appointment_status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            <div className="text-center pagination-input">
              {25 > offsetLimit && !loading && (
                <Pagination
                  className="mt-3 mx-auto w-fit-content"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  activePage={page}
                  itemsCountPerPage={offsetLimit}
                  totalItemsCount={25}
                  pageRangeDisplayed={5}
                  onChange={pageChange}
                />
              )}
            </div>
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
