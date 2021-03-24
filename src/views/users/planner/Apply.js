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
const Apply = (props) => {
  console.log("89r56784897894", props);
  const { apply } = props;
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
            <h5 className="m-0 p-0">Job Application Tracker</h5>
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
                          apply &&
                            apply.job_application_tracker &&
                            apply.job_application_tracker.status
                        )}
                      >
                        {apply &&
                          apply.job_application_tracker &&
                          apply.job_application_tracker.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Company</th>

                <th>Position</th>
                <th>Location</th>

                <th>Application Deadline</th>
                <th>Date Applied</th>
                <th>Job Post URL</th>
              </thead>
            </Table>
            <PaginationCommon pageChange={pageChange} />
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Apply;
