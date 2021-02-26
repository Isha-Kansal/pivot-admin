import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Pagination from "react-js-pagination";
import moment from "moment-timezone";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CDataTable,
} from "@coreui/react";

import { fetchExperts, deleteExpert, userStatus } from "../store/action";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { bindActionCreators } from "redux";
import Loader from "../../loader";
import CommonModal from "../../common/commonModal";
import Tooltip from "../../common/toolTip";
import EDIT from "../../assets/icons/edit.svg";
import DELETE from "../../assets/icons/delete.svg";

import ACTIVATE from "../../assets/icons/activate.svg";
import DEACTIVATE from "../../assets/icons/deactivate.svg";
import { Table } from "reactstrap";
const Experts = (props) => {
  const offsetLimit = 10;
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const [idExpert, setIdExpert] = useState("");
  const [loading, setLoading] = useState(false);
  const [expertsDetails, setExpertsDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/experts?page=${newPage}`);
    let limit = 10;
    setLoading(true);
    props.fetchExperts(
      `expert/all?offset=${newPage}&limit=${limit}&search=${search}`,
      (value) => {
        setLoading(false);
        setExpertsDetails(value.data.experts);
        setCount(value.data.count);

        setPage(newPage);
      }
    );
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const addExpert = () => {
    props.history.push("/addExpert");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const editExpert = (e, item) => {
    setIdExpert(item.id);
    e.preventDefault();
    e.stopPropagation();
    props.history.push(`/editExpert/${item._id}`);
  };

  const onDelete = (e, type, id) => {
    setIdExpert(id);
    setType(type);
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
  };

  const deleteExpert = (id) => {
    console.log("84598948597594789", type);
    if (type === "deleteExpert") {
      if (idExpert === id) setModalOpen(false);
      setLoading(true);
      props.deleteExpert(`expert/delete/${id}`, (value) => {
        if (value.status === 200) {
          NotificationManager.success("Expert deleted successfully", "", 1000);
          setLoading(false);

          callApiToFetchAllExperts();
        }
      });
    } else {
      if (idExpert === id) setModalOpen(false);
      setLoading(true);
      let obj = {
        type: type,
        id: id,
        user_type: "expert",
      };

      props.userStatus("common/change-status", obj, (value) => {
        console.log("89457894879470", value);
        if (value.status === 200) {
          NotificationManager.success(value.message, "", 1000);

          callApiToFetchAllExperts();
        }
      });
    }
  };
  useEffect(() => {
    callApiToFetchAllExperts();
  }, [search]);
  const callApiToFetchAllExperts = () => {
    setLoading(true);

    let limit = 10;
    props.fetchExperts(
      `expert/all?offset=${page}&limit=${limit}&search=${search}`,
      (value) => {
        if (value.status === 200) {
          setLoading(false);
          setExpertsDetails(value.data.experts);
          setCount(value.data.count);
        }
      }
    );
  };
  const onBlock = (e, type, item) => {
    setIdExpert(item._id);
    setType(type);
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
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
          {loading && <Loader />}
          <CCardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-nowrap ">Name</th>

                  <th>Email</th>

                  <th>Designation</th>

                  <th>Country</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expertsDetails && expertsDetails.length === 0 && !loading && (
                  <h3 className="text-center no-user-found">
                    No Experts Found!
                  </h3>
                )}
                {expertsDetails &&
                  expertsDetails.length > 0 &&
                  expertsDetails.map((item, index) => {
                    let istDate = new Date(item.createdAt);

                    let createdAt = moment(istDate).format(
                      "DD-MM-YYYY, hh:mm a"
                    );
                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/experts/${item._id}`,
                          })
                        }
                      >
                        <td>
                          {" "}
                          {item.first_name && item.last_name
                            ? item.first_name + " " + item.last_name
                            : "-"}
                        </td>
                        <td>{item.email ? item.email : "-"}</td>
                        <td>{item.designation}</td>
                        <td>{item.country}</td>
                        <td>{item.role}</td>
                        <td>
                          {" "}
                          {createdAt !== "Invalid date" ? createdAt : "-"}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button
                              id={`edit-${index}`}
                              className="icon"
                              onClick={(e) => editExpert(e, item)}
                            >
                              <img src={EDIT} className="ml-3" />
                            </button>
                            <Tooltip placement="top" target={`edit-${index}`}>
                              Edit
                            </Tooltip>
                            <button
                              className="icon"
                              onClick={(e) =>
                                onDelete(e, "deleteExpert", item._id)
                              }
                              id={`delete-${index}`}
                            >
                              <img src={DELETE} className="ml-3" />
                            </button>
                            <Tooltip placement="top" target={`delete-${index}`}>
                              Delete
                            </Tooltip>
                            {item.status !== "deactivated" && (
                              <>
                                <button
                                  onClick={(e) =>
                                    onBlock(e, "deactivate", item)
                                  }
                                  className="icon"
                                  id={`deactivate-${index}`}
                                >
                                  <img src={DEACTIVATE} className="ml-3" />
                                </button>
                                <Tooltip
                                  placement="top"
                                  target={`deactivate-${index}`}
                                >
                                  Deactivate
                                </Tooltip>
                              </>
                            )}

                            {item.status === "deactivated" && (
                              <>
                                <button
                                  onClick={(e) => onBlock(e, "activate", item)}
                                  className="icon"
                                  id={`activate-${index}`}
                                >
                                  <img src={ACTIVATE} className="ml-3" />
                                </button>
                                <Tooltip
                                  placement="top"
                                  target={`activate-${index}`}
                                >
                                  Activate
                                </Tooltip>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

            <div className="text-center pagination-input">
              {count > 10 && !loading && (
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
                  block_delete={(e) => deleteExpert(e, idExpert)}
                  id={idExpert}
                  type={type}
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
      fetchExperts,
      deleteExpert,
      userStatus,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Experts)
);
