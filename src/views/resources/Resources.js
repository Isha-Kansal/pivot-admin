import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
import Tooltip from "../../common/toolTip";
import CommonModal from "../../common/commonModal";
import { Table } from "reactstrap";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CDataTable,
  CPagination,
} from "@coreui/react";
import resourcesData from "./ResourcesData";
import EDIT from "../../assets/icons/edit.svg";
import DELETE from "../../assets/icons/delete.svg";
const Resources = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/resources?page=${newPage}`);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const addResource = () => {
    props.history.push("/addResource");
  };
  const editResource = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.history.push("/editResource");
  };
  const deleteResource = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
    // alert("deleted");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const filterRecords = () => {
    // const search = search.trim().replace(/ +/g, " ");
    if (!search) return resourcesData;

    return (
      resourcesData &&
      resourcesData.filter((data) => {
        let isTrue;

        if (data.name) {
          isTrue = data.name.toLowerCase().includes(search);
        }

        return isTrue;
      })
    );
  };
  const searchRecords = filterRecords();
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
            <CButton block color="info" onClick={addResource} id="addResource">
              Add Resource
            </CButton>
          </div>
        </form>
      </CCol>
      <CCol xl={12}></CCol>

      <CCol xl={12}>
        <CCard>
          <CCardBody>
            <Table>
              <thead>
                <tr>
                  <th className="text-nowrap ">Name</th>

                  <th>Format</th>
                  <th>Pricing</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchRecords && searchRecords.length === 0 && (
                  <h3 className="text-center no-user-found">
                    No Resources Found!
                  </h3>
                )}
                {searchRecords &&
                  searchRecords.length > 0 &&
                  searchRecords.map((item, index) => {
                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/resources/${item._id}`,
                          })
                        }
                      >
                        <td>{item.name}</td>
                        <td>{item.format}</td>
                        <td>{item.pricing}</td>
                        <td>
                          <button
                            id={`edit-${index}`}
                            className="icon"
                            onClick={editResource}
                          >
                            <img src={EDIT} className="ml-3" />
                          </button>
                          <Tooltip placement="left" target={`edit-${index}`}>
                            Edit
                          </Tooltip>
                          <button
                            className="icon"
                            onClick={(e) => deleteResource(e, item.id)}
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

            <div className="text-center pagination-input">
              {resourcesData.length > 10 && (
                <Pagination
                  className="mt-3 mx-auto w-fit-content"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={resourcesData.length}
                  pageRangeDisplayed={5}
                  onChange={pageChange}
                />
              )}
            </div>

            <div>
              {modalOpen && (
                <CommonModal
                  isOpen={modalOpen}
                  toggle={(e) => deleteResource(e)}
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

export default withRouter(Resources);
