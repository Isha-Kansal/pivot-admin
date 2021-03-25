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
  let job_application_trackerData =
    apply &&
    apply.job_application_tracker &&
    apply.job_application_tracker.data;
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
                <th className="text-nowrap ">ID</th>
                <th>Company</th>

                <th>Position</th>
                <th>Location</th>

                <th>Application Deadline</th>
                <th>Date Applied</th>
                <th>Job Post URL</th>
              </thead>
              {job_application_trackerData &&
                job_application_trackerData.length > 0 &&
                job_application_trackerData.map((item) => {
                  return (
                    <tbody>
                      <td>{item.id ? item.id : "-"}</td>
                      <td>{item.company_name ? item.company_name : "-"}</td>
                      <td>{item.job_title ? item.job_title : "-"}</td>
                      <td>{item.location ? item.location : "-"}</td>
                      <td></td>
                      <td>{item.applied_date ? item.applied_date : "-"}</td>
                      <td>
                        <a href={item.job_post_url ? item.job_post_url : "-"}>
                          {item.job_post_url ? item.job_post_url : "-"}
                        </a>
                      </td>
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
export default Apply;
