import React, { useState, useEffect } from "react";
import Loader from "../../loader";
import Pagination from "react-js-pagination";
import { Table } from "reactstrap";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
const offsetLimit = 10;
const UserResourceUsage = () => {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState("");
  const [page, setPage] = useState(1);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };
  const pageChange = (newPage) => {};
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
              // className={`table ${
              //   appointments.length === 0 ? "tableHeight" : ""
              // }`}
            >
              {/* {appointments && appointments.length > 0 && ( */}
              <thead>
                <tr>
                  <th className="text-nowrap ">Id</th>

                  <th>Name</th>

                  <th>Format</th>
                  <th>Price</th>
                </tr>
              </thead>
              {/* )} */}
              <tbody></tbody>
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
export default UserResourceUsage;
