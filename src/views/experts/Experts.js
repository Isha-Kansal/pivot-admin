import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Search from "../../common/search";

import moment from "moment-timezone";
import { CCard, CCardBody, CCol, CRow, CButton } from "@coreui/react";
import PaginationCommon from "../../common/pagination";
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

const offsetLimit = 10;

const Experts = (props) => {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [idExpert, setIdExpert] = useState("");
  const [loading, setLoading] = useState(false);
  const [expertsDetails, setExpertsDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const [offset, setOffset] = useState("");

  const pageChange = async (newPage) => {
    setLoading(true);
    const diff = newPage - page;
    if (newPage === 1 || diff === 1) {
      props.fetchExperts(
        `expert/all?offset=${
          newPage === 1 ? "" : offset
        }&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { experts, count } = value.data;
          setLoading(false);
          setExpertsDetails(experts);
          setCount(count);
          setOffset(experts.length && experts[experts.length - 1]._id);
          setPage(newPage);
        }
      );
    } else {
      let totalLimit = 0;
      if (diff > 1) {
        totalLimit = offsetLimit * (diff - 1);
      } else {
        totalLimit = offsetLimit * (newPage - 1);
      }
      const experts = await new Promise((resolve) => {
        return props.fetchExperts(
          `expert/all?offset=${
            diff > 0 ? offset : ""
          }&limit=${totalLimit}&search=${search}`,
          (value) => {
            const { experts } = value.data;
            resolve(experts);
          }
        );
      });

      if (experts) {
        props.fetchExperts(
          `expert/all?offset=${
            experts[experts.length - 1]._id
          }&limit=${offsetLimit}&search=${search}`,
          (value) => {
            const { experts, count } = value.data;
            setLoading(false);
            setExpertsDetails(experts);
            setCount(count);
            setOffset(experts.length && experts[experts.length - 1]._id);
            setPage(newPage);
          }
        );
      }
    }
  };

  const addExpert = () => {
    props.history.push("/addExpert");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setOffset("");
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
    setPage(1);
  };

  const deleteExpert = (id) => {
    if (type === "deleteExpert") {
      if (idExpert === id) setModalOpen(false);
      setLoading(true);
      props.deleteExpert(`expert/delete?id=${id}`, (value) => {
        if (value.status === 200) {
          NotificationManager.success("Expert deleted successfully", "", 1000);
          setLoading(false);

          callApiToFetchAllExperts(true);
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
        if (value.status === 200) {
          NotificationManager.success(value.message, "", 1000);

          callApiToFetchAllExperts(true);
        }
      });
    }
  };
  useEffect(() => {
    callApiToFetchAllExperts();
  }, [search]);
  const callApiToFetchAllExperts = (isDelete) => {
    if (isDelete) {
      setLoading(true);

      props.fetchExperts(
        `expert/all?offset=&limit=${offsetLimit}&search=${search}`,
        (value) => {
          if (value.status === 200) {
            const { experts, count } = value.data;
            setLoading(false);
            setExpertsDetails(experts);
            setCount(count);
            setOffset(experts.length && experts[experts.length - 1]._id);
          }
        }
      );
    } else {
      setLoading(true);

      props.fetchExperts(
        `expert/all?offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          if (value.status === 200) {
            const { experts, count } = value.data;
            setLoading(false);
            setExpertsDetails(experts);
            setCount(count);
            setOffset(experts.length && experts[experts.length - 1]._id);
          }
        }
      );
    }
  };
  const onBlock = (e, type, item) => {
    setIdExpert(item._id);
    setType(type);
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
    setPage(1);
  };

  return (
    <CRow>
      <CCol xl={12}>
        <form className="position-relative">
          <Search handleSearch={handleSearch} />
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
                  {/* <th>Role</th> */}
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
                        {/* <td>{item.current_role}</td> */}
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
                            {item.expert_status !== "deactivated" && (
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

                            {item.expert_status === "deactivated" && (
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

            <PaginationCommon
              pageChange={pageChange}
              count={count}
              offsetLimit={offsetLimit}
              page={page}
              loading={loading}
            />
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
