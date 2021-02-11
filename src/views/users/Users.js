import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import CommonModal from "../../common/commonModal";
import { NotificationManager } from "react-notifications";
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
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import usersData from "./UsersData";
import { fetchUsers, userStatus } from "../store/action";

const Users = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [unBlock, setUnblock] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [usersDetails, setUsersDetails] = useState([]);
  const dispatch = useDispatch();
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    callApiToFetchAllUsers();
  }, []);

  const callApiToFetchAllUsers = () => {
    props.fetchUsers("user/all", (value) => {
      console.log("7586783869839869", value);
      setUsersDetails(value.data.users);
    });
  };
  // useEffect(() => {
  //   dispatch(
  //     fetchUsers("user/all", (value) => {
  //       console.log("7586783869839869", value);
  //       setUsersDetails(value.data.users);
  //     })
  //   );
  // }, []);

  const filterRecords = () => {
    // const search = search.trim().replace(/ +/g, " ");
    if (!search) return usersDetails;

    return (
      usersDetails &&
      usersDetails.filter((data) => {
        console.log("4576489678947", data);
        let isTrue;
        if (data.email) {
          isTrue = data.email.toLowerCase().includes(search);
        }
        if (data.country) {
          isTrue = data.country.toLowerCase().includes(search);
        }
        if (data.name) {
          isTrue = data.name.toLowerCase().includes(search);
        }

        return isTrue;
      })
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
  const searchRecords = filterRecords();

  const onBlock = (e, type, item) => {
    console.log("48978948798", type, item);
    setIdUser(item._id);
    setType(type);
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
  };
  const blockUser = (id) => {
    if (idUser === id) {
      setModalOpen(false);
      console.log("47899456798", type);
      // let arr = unBlock.slice();
      // arr.push(id);
      // setUnblock(arr);
      callApi(type, id);
    }
  };
  console.log("945789849hdfgdj879894", unBlock);
  const callApi = (type, id) => {
    let obj = {
      type: type,
      id: id,
    };
    console.log("457978948794857", obj);
    props.userStatus("user/change-status", obj, (value) => {
      console.log("95689859859", value, id);
      if (value.status === 200) {
        NotificationManager.success(value.message, "", 1000);
        callApiToFetchAllUsers();
      }
    });
  };
  console.log("4986784987984978", usersDetails);
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
          {/* <CCardHeader>Users</CCardHeader> */}
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
              scopedSlots={{
                name: (item) => (
                  <td>
                    {item.first_name && item.last_name
                      ? item.first_name + " " + item.last_name
                      : "-"}
                  </td>
                ),
                email: (item) => <td>{item.email ? item.email : "-"}</td>,
                status: (item) => (
                  <td>
                    <CBadge
                      color={getBadge(
                        !item.is_verified ? "Not Verified" : "Verified"
                      )}
                    >
                      {!item.is_verified ? "Not Verified" : "Verified"}
                    </CBadge>
                  </td>
                ),
                country: (item) => <td>{item.country ? item.country : "-"}</td>,
                action: (item) => (
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
                        {/* <CButton
                          onClick={(e) => onBlock(e, "deactivate", item)}
                          className="Deactive-btn block-btn"
                        >
                          Deactivate
                        </CButton> */}
                      </div>
                    ) : item.status === "deactivated" ? (
                      <div>
                        {/* <CButton
                          onClick={(e) => onBlock(e, "activate", item)}
                          className="Unblock-btn block-btn"
                        >
                          Activate
                        </CButton> */}
                        <CButton
                          onClick={(e) => onBlock(e, "block", item)}
                          className="block-btn block-btn"
                        >
                          Block
                        </CButton>
                      </div>
                    ) : (
                      ""
                    )}

                    {/* {item.status !== "blocked" && (
                      <CButton
                        onClick={(e) => onBlock(e, "block", item)}
                        className="block-btn block-btn"
                      >
                        Block
                      </CButton>
                    )}
                    {item.status === "blocked" && (
                      <CButton
                        onClick={(e) => onBlock(e, "unblock", item)}
                        className="Unblock-btn block-btn"
                      >
                        UnBlock
                      </CButton>
                    )}

                    {item.status !== "inactivated" && (
                      <CButton
                        onClick={(e) => onBlock(e, "deactivate")}
                        className="Deactive-btn block-btn"
                      >
                        Deactivate
                      </CButton>
                    )}
                    {item.status === "inactivated" && (
                      <CButton
                        onClick={(e) => onBlock(e, "activate")}
                        className="Unblock-btn block-btn"
                      >
                        Activate
                      </CButton>
                    )} */}
                  </td>
                ),
              }}
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) =>
                history.push({
                  pathname: `/users/${item._id}`,
                  state: usersDetails,
                })
              }
            />

            <div className="text-center pagination-input">
              {usersDetails.length > 10 && (
                <Pagination
                  className="mt-3 mx-auto w-fit-content"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={usersDetails.length}
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
                  blockUser={(e) => blockUser(e, idUser)}
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
