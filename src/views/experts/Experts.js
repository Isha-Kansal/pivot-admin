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
import CommonModal from "../../common/commonModal";
import Tooltip from "../../common/toolTip";
import EDIT from "../../assets/icons/edit.svg";
import DELETE from "../../assets/icons/delete.svg";
import { Table } from "reactstrap";
const Experts = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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

  const editExpert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.history.push("/editExpert");
  };
  const deleteExpert = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
    // alert("deleted");
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
            <Table>
              <thead>
                <tr>
                  <th className="text-nowrap ">Name</th>

                  <th>Designation</th>
                  <th>Expertise</th>

                  <th>Fields</th>
                </tr>
              </thead>
              <tbody>
                {expertsData && expertsData.length === 0 && (
                  <h3 className="text-center no-user-found">
                    No Experts Found!
                  </h3>
                )}
                {expertsData &&
                  expertsData.length > 0 &&
                  expertsData.map((item, index) => {
                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/experts/${item._id}`,
                          })
                        }
                      >
                        <td>{item.designation}</td>
                        <td>{item.expertise}</td>
                        <td>{item.fields}</td>
                        <td>
                          <button
                            id={`edit-${index}`}
                            className="icon"
                            onClick={editExpert}
                          >
                            <img src={EDIT} className="ml-3" />
                          </button>
                          <Tooltip placement="left" target={`edit-${index}`}>
                            Edit
                          </Tooltip>
                          <button
                            className="icon"
                            onClick={(e) => deleteExpert(e, item.id)}
                            id={`delete-${index}`}
                          >
                            <img src={DELETE} className="ml-3" />
                          </button>
                          <Tooltip placement="right" target={`delete-${index}`}>
                            Delete
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {/* <CDataTable
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
            /> */}
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
            <div>
              {modalOpen && (
                <CommonModal
                  isOpen={modalOpen}
                  toggle={(e) => deleteExpert(e)}
                  // blockUser={(e) => blockUser(e, idUser)}
                  // id={idUser}
                  // type={type}
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
