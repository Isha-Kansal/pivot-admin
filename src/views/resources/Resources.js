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
import { CCard, CCardBody, CCol, CRow, CButton } from "@coreui/react";

import EDIT from "../../assets/icons/edit.svg";
import DELETE from "../../assets/icons/delete.svg";
import {
  fetchResources,
  deleteResource,
  editResource,
  setResourceData,
} from "../store/action";
const offsetLimit = 10;
const Resources = (props) => {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [resourcesDetails, setResourcesDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idResource, setIdResource] = useState("");
  const [count, setCount] = useState(0);
  const pageChange = (newPage) => {
    setLoading(true);
    props.fetchResources(
      `resource/all?offset=${offset}&limit=${offsetLimit}&search=${search}`,
      (value) => {
        const { resources, count } = value.data;
        setLoading(false);
        setResourcesDetails(resources);
        setCount(count);
        setOffset(resources.length && resources[resources.length - 1]._id);
        setPage(newPage);
      }
    );
  };

  const addResource = () => {
    props.history.push("/addResource");
  };
  const editResource = (e, item) => {
    setIdResource(item._id);
    e.preventDefault();
    e.stopPropagation();

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
  };
  const deleteResource = (id) => {
    if (idResource === id) setModalOpen(false);
    setLoading(true);
    props.deleteResource(`resource/delete?id=${id}`, (value) => {
      if (value.status === 200) {
        NotificationManager.success("Resource deleted successfully", "", 1000);
        setLoading(false);
        callApiToFetchAllResources(true);
      }
    });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };
  useEffect(() => {
    callApiToFetchAllResources();
  }, [search]);
  const callApiToFetchAllResources = (isDelete) => {
    if (isDelete) {
      setLoading(true);

      props.fetchResources(
        `resource/all?offset=&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { resources, count } = value.data;
          if (value.status === 200) {
            setLoading(false);
            setResourcesDetails(resources);
            setCount(count);
            setOffset(resources.length && resources[resources.length - 1]._id);
          }
        }
      );
    } else {
      setLoading(true);

      props.fetchResources(
        `resource/all?offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { resources, count } = value.data;
          if (value.status === 200) {
            setLoading(false);
            setResourcesDetails(resources);
            setCount(count);
            setOffset(resources.length && resources[resources.length - 1]._id);
          }
        }
      );
    }
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
                        <td>{item.resource_format}</td>
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
                            <Tooltip placement="top" target={`edit-${index}`}>
                              Edit
                            </Tooltip>
                            <button
                              className="icon"
                              onClick={(e) => onDelete(e, item._id)}
                              id={`delete-${index}`}
                            >
                              <img src={DELETE} className="ml-3" />
                            </button>
                            <Tooltip placement="top" target={`delete-${index}`}>
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
