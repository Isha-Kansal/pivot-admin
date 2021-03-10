import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table } from "reactstrap";
import Pagination from "react-js-pagination";
const offsetLimit = 10;
const UserExpertUsage = (props) => {
  const { appointments } = props;
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState("");
  const [page, setPage] = useState(1);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };
  const pageChange = (newPage) => {
    // setLoading(true);

    props
      .fetchOneUser
      // `user/all?offset=${offset}&limit=${offsetLimit}&search=${search}`,
      // (value) => {
      //   const { users, count } = value.data;
      //   setLoading(false);
      //   setUsersDetails(users);
      //   setCount(count);
      //   setOffset(users.length && users[users.length - 1]._id);
      //   setPage(newPage);
      // }
      ();
  };
  return (
    <CRow>
      <CCol lg={12}>
        <CCard className="position-relative">
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
              {15 > offsetLimit && (
                <Pagination
                  className="mt-3 mx-auto w-fit-content"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  activePage={page}
                  itemsCountPerPage={offsetLimit}
                  totalItemsCount={10}
                  pageRangeDisplayed={15}
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
export default UserExpertUsage;
