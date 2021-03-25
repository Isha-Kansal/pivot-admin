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
const Prepare = (props) => {
  const { prepare } = props;
  const [accordion, setAccordion] = useState(1);
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
  let job_application_prepData =
    prepare &&
    prepare.job_application_prep &&
    prepare.job_application_prep.data;
  let interview_prepData =
    prepare && prepare.interview_prep && prepare.interview_prep.data;
  console.log("845869497848794", job_application_prepData);
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
            <h5 className="m-0 p-0">Job Application Prep</h5>
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
                      {" "}
                      <CBadge
                        color={getBadge(
                          prepare &&
                            prepare.job_application_prep &&
                            prepare.job_application_prep.status
                        )}
                      >
                        {prepare &&
                          prepare.job_application_prep &&
                          prepare.job_application_prep.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <table className="table">
              {job_application_prepData &&
                job_application_prepData.length > 0 &&
                job_application_prepData.map((item) => {
                  return (
                    <tbody>
                      {/* <tr>
                        <td>Resume</td>
                      </tr>
                      <tr>
                        <td>Cover Letter Template</td>
                      </tr>
                      <tr>
                        <td>Portfolio / Work Sample</td>
                      </tr>
                      <tr>
                        <td>Video Profile</td>
                      </tr>
                      <tr>
                        <td>LinkedIn Profile</td>
                      </tr> */}
                    </tbody>
                  );
                })}
              <tbody>
                <tr>
                  <td>Resume</td>
                </tr>
                <tr>
                  <td>Cover Letter Template</td>
                </tr>
                <tr>
                  <td>Portfolio / Work Sample</td>
                </tr>
                <tr>
                  <td>Video Profile</td>
                </tr>
                <tr>
                  <td>LinkedIn Profile</td>
                </tr>
              </tbody>
            </table>
            <PaginationCommon pageChange={pageChange} />
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
            <h5 className="m-0 p-0">Interview Prep</h5>
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
                          prepare &&
                            prepare.interview_prep &&
                            prepare.interview_prep.status
                        )}
                      >
                        {prepare &&
                          prepare.interview_prep &&
                          prepare.interview_prep.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>Topic</th>

                <th>Description</th>
                <th>Sample Question</th>
                <th>Talking Points</th>
              </thead>
              {interview_prepData &&
                interview_prepData.length > 0 &&
                interview_prepData.map((item) => {
                  console.log("568907905697950970", item);
                  return (
                    <tbody>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tbody>
                  );
                })}
            </Table>

            <PaginationCommon pageChange={pageChange} />
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Prepare;
