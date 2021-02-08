import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CLabel,
  CRow,
} from "@coreui/react";

import usersData from "./UsersData";
import { cibRubygems } from "@coreui/icons";

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
  const getBadge = (status) => {
    switch (status) {
      case "Verified":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Not Verified":
        return "danger";
      default:
        return "primary";
    }
  };
  const searchRecords = filterRecords();
  console.log("49856784987984", searchRecords);
  const onBlock = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("user Blocked");
  };
  return (
    <CRow>
      <CCol xl={12}>
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
      </CCol>

      <CCol xl={12}>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={searchRecords}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "email",
                "status",
                "country",
                "action",
              ]}
              // scopedSlots={{

              // }}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                  // <td>

                  // </td>
                ),
                action: (item) => (
                  <td>
                    <CButton
                      style={{ backgroundColor: "rgb(200,200,200)" }}
                      onClick={onBlock}
                    >
                      Block
                    </CButton>
                  </td>
                ),
              }}
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
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
