import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Search from "../../common/search";
import moment from "moment";

import CommonModal from "../../common/commonModal";
import { NotificationManager } from "react-notifications";
import { Table } from "reactstrap";
import { CBadge, CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import Loader from "../../loader";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { fetchUsers, userStatus } from "../store/action";
import PaginationCommon from "../../common/pagination";
const offsetLimit = 2;
const Users = (props) => {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [offset, setOffset] = useState("");
  const [idUser, setIdUser] = useState("");
  const [usersDetails, setUsersDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const pageChange = async (newPage) => {
    setLoading(true);
    const diff = newPage - page;
    if (newPage === 1 || diff === 1) {
      props.fetchUsers(
        `user/all?offset=${
          newPage === 1 ? "" : offset
        }&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { users, count } = value.data;
          setLoading(false);
          setUsersDetails(users);
          setCount(count);
          setOffset(users.length && users[users.length - 1]._id);
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
      const users = await new Promise((resolve) => {
        return props.fetchUsers(
          `user/all?offset=${
            diff > 0 ? offset : ""
          }&limit=${totalLimit}&search=${search}`,
          (value) => {
            const { users } = value.data;
            resolve(users);
          }
        );
      });
      if (users) {
        props.fetchUsers(
          `user/all?offset=${
            users[users.length - 1]._id
          }&limit=${offsetLimit}&search=${search}`,
          (value) => {
            const { users, count } = value.data;
            setLoading(false);
            setUsersDetails(users);
            setCount(count);
            setOffset(users.length && users[users.length - 1]._id);
            setPage(newPage);
          }
        );
      }
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setOffset("");
  };

  useEffect(() => {
    callApiToFetchAllUsers();
  }, [search]);

  const callApiToFetchAllUsers = (isBlock) => {
    if (isBlock) {
      setLoading(true);

      props.fetchUsers(
        `user/all?offset=&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { users, count } = value.data;
          setLoading(false);
          setUsersDetails(users);
          setCount(count);
          setOffset(users.length && users[users.length - 1]._id);
        }
      );
    } else {
      setLoading(true);

      props.fetchUsers(
        `user/all?offset=${offset}&limit=${offsetLimit}&search=${search}`,
        (value) => {
          const { users, count } = value.data;
          setLoading(false);
          setUsersDetails(users);
          setCount(count);
          setOffset(users.length && users[users.length - 1]._id);
        }
      );
    }
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
      user_type: "user",
    };

    props.userStatus("common/change-status", obj, (value) => {
      if (value.status === 200) {
        NotificationManager.success(value.message, "", 1000);
        callApiToFetchAllUsers(true);
      }
    });
  };

  return (
    <CRow>
      <CCol xl={12}>
        <Search handleSearch={handleSearch} />
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
                          {item.user_status === "blocked" ? (
                            <CButton
                              onClick={(e) => onBlock(e, "unblock", item)}
                              className="Unblock-btn block-btn"
                            >
                              UnBlock
                            </CButton>
                          ) : item.user_status === "activated" ? (
                            <div>
                              <CButton
                                onClick={(e) => onBlock(e, "block", item)}
                                className="block-btn block-btn"
                              >
                                Block
                              </CButton>{" "}
                            </div>
                          ) : item.user_status === "deactivated" ? (
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
