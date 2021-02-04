import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import usersData from "./UsersData";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };
  const handleSearch = (e) => {
    console.log("8e4568904867", e.target.value);
    setSearch(e.target.value);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  console.log("u48956485968945", usersData);
  const filterRecords = () => {
    console.log("48568485798497", usersData, search);
    // const search = search.trim().replace(/ +/g, " ");
    if (!search) return usersData;
    return (
      usersData &&
      usersData.filter((data) => {
        let isTrue =
          data.email.toLowerCase().includes(search) ||
          data.country.toLowerCase().includes(search) ||
          data.name.toLowerCase().includes(search);
        return isTrue;
      })
    );
  };
  const searchRecords = filterRecords();
  console.log("49856784987984", searchRecords);
  return (
    <CRow>
      <form>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          required
          onChange={handleSearch}
        />
      </form>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={searchRecords}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "email",
                "country",
                // "status",
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
            {usersData.length > 10 && (
              <Pagination
                className="mt-3 mx-auto w-fit-content"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={usersData.length}
                pageRangeDisplayed={5}
                onChange={pageChange}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
