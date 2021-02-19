import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
import Tooltip from "../../common/toolTip";
import CommonModal from "../../common/commonModal";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { bindActionCreators } from "redux";
import Loader from "../../loader";
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
import {
  fetchResources,
  deleteResource,
  editResource,
  setResourceData,
} from "../store/action";
const Resources = (props) => {
  const offsetLimit = 10;
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [resourcesDetails, setResourcesDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idResource, setIdResource] = useState("");
  const [count, setCount] = useState(0);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/resources?page=${newPage}`);
    let limit = 10;
    setLoading(true);
    props.fetchResources(
      `resource/all?offset=${newPage}&limit=${limit}&search=${search}`,
      (value) => {
        setLoading(false);
        setResourcesDetails(value.data.resources);
        setCount(value.data.count);

        setPage(newPage);
      }
    );
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const addResource = () => {
    props.history.push("/addResource");
  };
  const editResource = (e, item) => {
    setIdResource(item._id);
    e.preventDefault();
    e.stopPropagation();
    console.log("856789956890589", item);
    props.setResourceData(item);

    props.history.push({
      state: item,
      pathname: `/editResource/${item._id}`,
    });
  };
  const onDelete = (e, id) => {
    setIdResource(id);
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
    console.log("89356893967893", id);
  };
  const deleteResource = (id) => {
    if (idResource === id) setModalOpen(false);
    setLoading(true);
    props.deleteResource(`resource/delete/${id}`, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Resource deleted successfully", "", 1000);
        setLoading(false);
        callApiToFetchAllResources();
      }
    });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  useEffect(() => {
    callApiToFetchAllResources();
  }, [search]);
  const callApiToFetchAllResources = () => {
    setLoading(true);

    let limit = 10;
    props.fetchResources(
      `resource/all?offset=${page}&limit=${limit}&search=${search}`,
      (value) => {
        if (value.status === 200) {
          // NotificationManager.success(
          //   "Resources fetched successfully",
          //   "",
          //   1000
          // );
          console.log("498679497898497", value);
          setLoading(false);
          setResourcesDetails(value.data.resources);
          setCount(value.data.count);
        }
      }
    );
  };

  console.log("4987849879849789", resourcesDetails);
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
          {loading && <Loader />}
          <CCardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-nowrap ">Name</th>

                  <th>Format</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resourcesDetails &&
                  resourcesDetails.length === 0 &&
                  !loading && (
                    <h3 className="text-center no-user-found">
                      No Resources Found!
                    </h3>
                  )}
                {resourcesDetails &&
                  resourcesDetails.length > 0 &&
                  resourcesDetails.map((item, index) => {
                    console.log("758738567838678", item);
                    let category =
                      item &&
                      item.category &&
                      item.category.length > 0 &&
                      item.category.join(", ");
                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/resources/${item._id}`,
                          })
                        }
                      >
                        <td>{item.title}</td>
                        <td>{item.format}</td>
                        <td>{item.price}</td>
                        <td>{category}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button
                              id={`edit-${index}`}
                              className="icon"
                              onClick={(e) => editResource(e, item)}
                            >
                              <img src={EDIT} className="ml-3" />
                            </button>
                            <Tooltip placement="left" target={`edit-${index}`}>
                              Edit
                            </Tooltip>
                            <button
                              className="icon"
                              onClick={(e) => onDelete(e, item._id)}
                              id={`delete-${index}`}
                            >
                              <img src={DELETE} className="ml-3" />
                            </button>
                            <Tooltip
                              placement="right"
                              target={`delete-${index}`}
                            >
                              Delete
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            <div className="text-center pagination-input">
              {count > 10 && (
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

            <div>
              {modalOpen && (
                <CommonModal
                  isOpen={modalOpen}
                  toggle={(e) => onDelete(e)}
                  block_delete={(e) => deleteResource(e, idResource)}
                  id={idResource}
                  type="deleteResource"
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
      fetchResources,
      deleteResource,
      editResource,
      setResourceData,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Resources)
);
