import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import expertsData from "./ExpertsData";
import Pagination from "react-js-pagination";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CDataTable,
} from "@coreui/react";

const Experts = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/experts?page=${newPage}`);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const addExpert = () => {
    props.history.push("/addExpert");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <CRow>
      <CCol xl={12}>
        <form className="position-relative">
          <div className="text-center search-input">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              required
              onChange={handleSearch}
            />
          </div>
          <div className="text-right resource-btn">
            <CButton block color="info" onClick={addExpert}>
              Add Expert
            </CButton>
          </div>
        </form>
        <CCard>
          <CCardBody>
            <CDataTable
              items={expertsData}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "designation",
                "expertise",
                "fields",
              ]}
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/experts/${item.id}`)}
            />
            <div className="text-center pagination-input">
              {expertsData.length > 10 && (
                <Pagination
                  className="mt-3 mx-auto w-fit-content"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={expertsData.length}
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

export default withRouter(Experts);
