import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import Pagination from "react-js-pagination";
import CommonModal from "../../common/commonModal";
import { NotificationManager } from "react-notifications";
import { Table } from "reactstrap";
import { CBadge, CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import Loader from "../../loader";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { fetchUsers, userStatus } from "../store/action";

const Users = (props) => {
  const offsetLimit = 10;
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");

  const [idUser, setIdUser] = useState("");
  const [usersDetails, setUsersDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
    setLoading(true);

    let limit = 10;
    props.fetchUsers(
      `user/all?offset=${newPage}&limit=${limit}&search=${search}`,
      (value) => {
        setLoading(false);
        setUsersDetails(value.data.users);
        setCount(value.data.count);

        setPage(newPage);
      }
    );
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    callApiToFetchAllUsers();
  }, [search]);

  const callApiToFetchAllUsers = () => {
    setLoading(true);

    let limit = 10;
    props.fetchUsers(
      `user/all?offset=${page}&limit=${limit}&search=${search}`,
      (value) => {
        setLoading(false);
        setUsersDetails(value.data.users);
        setCount(value.data.count);
      }
    );
  };

  const getBadge = (status) => {
    switch (status) {
      case "Verified":
        return "success";

      case "Not Verified":
        return "danger";
      default:
        return "primary";
    }
  };

  const onBlock = (e, type, item) => {
    setIdUser(item._id);
    setType(type);
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
  };
  const blockUser = (id) => {
    if (idUser === id) {
      setModalOpen(false);

      callApi(type, id);
    }
  };

  const callApi = (type, id) => {
    let obj = {
      type: type,
      id: id,
    };

    props.userStatus("user/change-status", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success(value.message, "", 1000);
        callApiToFetchAllUsers();
      }
    });
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
        <CCard className="position-relative">
          {loading && <Loader />}

          <CCardBody>
            <Table
              responsive
              className={`table ${
                usersDetails.length === 0 ? "tableHeight" : ""
              }`}
            >
              <thead>
                <tr>
                  <th className="text-nowrap ">Name</th>

                  <th>Email</th>
                  <th>Status</th>

                  <th>Country</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersDetails && usersDetails.length === 0 && !loading && (
                  <h3 className="text-center no-user-found">No Users Found!</h3>
                )}
                {usersDetails &&
                  usersDetails.length > 0 &&
                  usersDetails.map((item, index) => {
                    let istDate = new Date(item.createdAt);

                    let createdAt = moment(istDate).format(
                      "DD-MM-YYYY, hh:mm a"
                    );

                    return (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/users/${item._id}`,
                            state: usersDetails,
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
                        <td>
                          <CBadge
                            color={getBadge(
                              !item.is_verified ? "Not Verified" : "Verified"
                            )}
                          >
                            {!item.is_verified ? "Not Verified" : "Verified"}
                          </CBadge>
                        </td>
                        <td>{item.country ? item.country : "-"}</td>
                        <td>
                          {createdAt !== "Invalid date" ? createdAt : "-"}
                        </td>
                        <td>
                          {item.status === "blocked" ? (
                            <CButton
                              onClick={(e) => onBlock(e, "unblock", item)}
                              className="Unblock-btn block-btn"
                            >
                              UnBlock
                            </CButton>
                          ) : item.status === "activated" ? (
                            <div>
                              <CButton
                                onClick={(e) => onBlock(e, "block", item)}
                                className="block-btn block-btn"
                              >
                                Block
                              </CButton>{" "}
                            </div>
                          ) : item.status === "deactivated" ? (
                            <div>
                              <CButton
                                onClick={(e) => onBlock(e, "block", item)}
                                className="block-btn block-btn"
                              >
                                Block
                              </CButton>
                            </div>
                          ) : (
                            <CButton
                              onClick={(e) => onBlock(e, "block", item)}
                              className="block-btn block-btn"
                            >
                              Block
                            </CButton>
                          )}
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
                  toggle={(e) => onBlock(e, type, idUser)}
                  block_delete={(e) => blockUser(e, idUser)}
                  id={idUser}
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
      fetchUsers,
      userStatus,
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
