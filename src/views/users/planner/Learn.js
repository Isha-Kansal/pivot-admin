import React, { useState } from "react";
import Loader from "../../../loader";
import Search from "../../../common/search";
import PaginationCommon from "../../../common/pagination";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CTabs,
  CNavItem,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
  CButton,
  CCollapse,
} from "@coreui/react";
import { Table } from "reactstrap";
const Learn = (props) => {
  const { learn } = props;
  const [accordion, setAccordion] = useState(0);
  const getBadge = (status) => {
    switch (status) {
      case "Done":
        return "green";

      case "To-Do":
        return "orange";
      case "Doing":
        return "yellow";
      case "Ask an Expert":
        return "purple";
      case "Not Applicable":
        return "gray";
      default:
        return "primary";
    }
  };
  const handleSearch = (e) => {
    // setSearch(e.target.value);
    // setOffset("");
    // setPage(1);
  };
  const pageChange = (newPage) => {};
  let skillsData = learn && learn.skills && learn.skills.data;
  let learning_platformsData =
    learn && learn.learning_platforms && learn.learning_platforms.data;
  let experiential_learningData =
    learn && learn.experiential_learning && learn.experiential_learning.data;

  if (!learn) {
    return (
      <div className="no-records-planner">
        <h5 className="mb-0">
          <i>No Records Found</i>
        </h5>
      </div>
    );
  } else {
    return (
      <div id="accordion">
        <CCard className="mb-0">
          <CCardHeader id="headingOne">
            <CButton
              block
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setAccordion(accordion === 0 ? null : 0)}
            >
              <h5 className="m-0 p-0">Skills</h5>
            </CButton>
          </CCardHeader>
          <CCollapse show={accordion === 0}>
            <CCardBody>
              <CCardHeader>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td>
                        <CBadge
                          color={getBadge(
                            learn && learn.skills && learn.skills.status
                          )}
                        >
                          {learn && learn.skills && learn.skills.status}
                        </CBadge>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <Search handleSearch={handleSearch} /> */}
              </CCardHeader>
              <Table responsive>
                <thead>
                  <th className="text-nowrap ">ID</th>
                  <th>My Hard Skills</th>

                  <th>My Soft Skills</th>
                  <th>Required Hard Skills</th>

                  <th>Required Soft Skills</th>
                </thead>
                {skillsData &&
                  skillsData.length > 0 &&
                  skillsData.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id ? item.id : "-"}</td>
                        <td>
                          {item.fields[0].value ? item.fields[0].value : "-"}
                        </td>
                        <td>
                          {item.fields[1].value ? item.fields[1].value : "-"}
                        </td>
                        <td>
                          {item.fields[2].value ? item.fields[2].value : "-"}
                        </td>
                        <td>
                          {item.fields[3].value ? item.fields[3].value : "-"}
                        </td>
                      </tbody>
                    );
                  })}
                {skillsData && skillsData.length === 0 && (
                  <div className="no-records">
                    <h5 className="mb-0">
                      <i>No Records Found</i>
                    </h5>
                  </div>
                )}
              </Table>
              {/* <PaginationCommon pageChange={pageChange} /> */}
            </CCardBody>
          </CCollapse>
        </CCard>
        <CCard className="mb-0">
          <CCardHeader id="headingTwo">
            <CButton
              block
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setAccordion(accordion === 1 ? null : 1)}
            >
              <h5 className="m-0 p-0">Learning Platforms</h5>
            </CButton>
          </CCardHeader>
          <CCollapse show={accordion === 1}>
            <CCardBody>
              <CCardHeader>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td>
                        {" "}
                        <CBadge
                          color={getBadge(
                            learn &&
                              learn.learning_platforms &&
                              learn.learning_platforms.status
                          )}
                        >
                          {learn &&
                            learn.learning_platforms &&
                            learn.learning_platforms.status}
                        </CBadge>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <Search handleSearch={handleSearch} /> */}
              </CCardHeader>
              <Table responsive>
                <thead>
                  <th className="text-nowrap ">ID</th>
                  <th>Skills</th>

                  <th>Platform Name</th>
                  <th>Course Topic</th>
                  <th>Course Type</th>
                </thead>
                {learning_platformsData &&
                  learning_platformsData.length > 0 &&
                  learning_platformsData.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id ? item.id : "-"}</td>
                        <td>
                          {item.fields[0].value ? item.fields[0].value : "-"}
                        </td>
                        <td>
                          {item.fields[1].value ? item.fields[1].value : "-"}
                        </td>
                        <td>
                          {item.fields[2].value ? item.fields[2].value : "-"}
                        </td>
                        <td>
                          {item.fields[3].value ? item.fields[3].value : "-"}
                        </td>
                      </tbody>
                    );
                  })}
                {learning_platformsData && learning_platformsData.length === 0 && (
                  <div className="no-records">
                    <h5 className="mb-0">
                      <i>No Records Found</i>
                    </h5>
                  </div>
                )}
              </Table>
              {/* <PaginationCommon pageChange={pageChange} /> */}
            </CCardBody>
          </CCollapse>
        </CCard>
        <CCard className="mb-0">
          <CCardHeader id="headingThree">
            <CButton
              block
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setAccordion(accordion === 2 ? null : 2)}
            >
              <h5 className="m-0 p-0">Experimental Learning</h5>
            </CButton>
          </CCardHeader>
          <CCollapse show={accordion === 2}>
            <CCardBody>
              <CCardHeader>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td>
                        {" "}
                        <CBadge
                          color={getBadge(
                            learn &&
                              learn.experiential_learning &&
                              learn.experiential_learning.status
                          )}
                        >
                          {learn &&
                            learn.experiential_learning &&
                            learn.experiential_learning.status}
                        </CBadge>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <Search handleSearch={handleSearch} /> */}
              </CCardHeader>
              <Table responsive>
                <thead>
                  <th className="text-nowrap ">ID</th>
                  <th>Skills</th>

                  <th>Organization</th>
                  <th>Role</th>
                  <th>Role Type</th>
                </thead>
                {experiential_learningData &&
                  experiential_learningData.length > 0 &&
                  experiential_learningData.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id ? item.id : "-"}</td>
                        <td>
                          {item.fields[0].value ? item.fields[0].value : "-"}
                        </td>
                        <td>
                          {item.fields[1].value ? item.fields[1].value : "-"}
                        </td>
                        <td>
                          {item.fields[2].value ? item.fields[2].value : "-"}
                        </td>
                        <td>
                          {item.fields[3].value ? item.fields[3].value : "-"}
                        </td>
                      </tbody>
                    );
                  })}
                {experiential_learningData &&
                  experiential_learningData.length === 0 && (
                    <div className="no-records">
                      <h5 className="mb-0">
                        <i>No Records Found</i>
                      </h5>
                    </div>
                  )}
              </Table>
              {/* <PaginationCommon pageChange={pageChange} /> */}
            </CCardBody>
          </CCollapse>
        </CCard>
      </div>
    );
  }
};
export default Learn;
