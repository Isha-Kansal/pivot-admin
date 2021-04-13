import React, { useState } from "react";
import Loader from "../../../loader";
import moment from "moment";
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
  let job_application_trackerData =
    apply &&
    apply.job_application_tracker &&
    apply.job_application_tracker.data;

  if (!apply) {
    return (
      <div className="no-records-planner">
        <h5 className="mb-0">
          <i>No Records Found</i>
        </h5>
      </div>
    );
  }

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

              {/* <Search handleSearch={handleSearch} /> */}
            </CCardHeader>
            <Table responsive style={{ minHeight: "110px" }}>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>Company</th>

                <th>Position</th>
                <th>Location</th>

                {/* <th>Application Deadline</th> */}
                <th>Date Applied</th>
                <th>Job Post URL</th>
                <th>Pros</th>
                <th>Cons</th>
                <th>Contact's Name</th>
                <th>Contact's Position</th>
                <th>Contact Information</th>
                <th>Referral (Y/N)</th>
                <th>Compensation</th>
                <th>Company Feedback</th>
                <th>Interview Notes</th>
                <th>Status</th>
                <th>Thank You Note</th>
                <th>Notes</th>
              </thead>
              {job_application_trackerData &&
                job_application_trackerData.length > 0 &&
                job_application_trackerData.map((item) => {
                  let istDate = new Date(item && item.applied_date);

                  let appliedDate = moment(istDate).format(
                    "DD-MM-YYYY, hh:mm a"
                  );

                  return (
                    <tbody>
                      <td>{item.id ? item.id : "-"}</td>
                      <td>{item.company_name ? item.company_name : "-"}</td>
                      <td>{item.job_title ? item.job_title : "-"}</td>
                      <td>{item.location ? item.location : "-"}</td>
                      {/* <td></td> */}
                      <td>
                        {appliedDate !== "Invalid date" ? appliedDate : "-"}
                      </td>
                      <td>
                        <a href={item.job_post_url ? item.job_post_url : "-"}>
                          {item.job_post_url ? item.job_post_url : "-"}
                        </a>
                      </td>
                      <td>{item.pros ? item.pros : "-"}</td>
                      <td>{item.cons ? item.cons : "-"}</td>

                      <td>
                        {item.contact_person_name
                          ? item.contact_person_name
                          : "-"}
                      </td>
                      <td>
                        {item.contact_persons_position
                          ? item.contact_persons_position
                          : "-"}
                      </td>
                      <td>{item.contact_email ? item.contact_email : "-"}</td>
                      <td>{item.referral ? "Y" : "N"}</td>

                      {/* <td>
                        {item.offer_log &&
                        `Bonus: ${item.offer_log.bonus}, Commission: ${item.offer_log.commission}, Equity: ${item.offer_log.equity}, Salary: 
                          ${item.offer_log.salary}, Benefits: ${item.offer_log.benefits}`}
                      </td> */}

                      <td>
                        {item.offer_log &&
                          !item.offer_log.benefits &&
                          !item.offer_log.bonus &&
                          !item.offer_log.commission &&
                          !item.offer_log.equity &&
                          !item.offer_log.salary &&
                          "-"}
                        {item.offer_log &&
                          item.offer_log.bonus &&
                          `Bonus: 
                          ${item.offer_log.bonus}`}
                        <br />
                        {item.offer_log &&
                          item.offer_log.commission &&
                          `Commission: ${item.offer_log.commission}`}
                        <br />
                        {item.offer_log &&
                          item.offer_log.equity &&
                          `Equity: ${item.offer_log.equity}`}
                        <br />
                        {item.offer_log &&
                          item.offer_log.salary &&
                          `Salary: ${item.offer_log.salary}`}
                        <br />
                        {item.offer_log &&
                          item.offer_log.benefits &&
                          `Benefits: ${item.offer_log.benefits}`}
                      </td>
                      <td>
                        {item.interview_log &&
                        item.interview_log.company_feedback
                          ? item.interview_log.company_feedback
                          : "-"}
                      </td>

                      <td>
                        {item.interview_log &&
                        item.interview_log.interview_notes
                          ? item.interview_log.interview_notes
                          : "-"}
                      </td>
                      <td>{item.status ? item.status : "-"}</td>
                      <td>
                        {item.interview_log && item.interview_log.thank_you_note
                          ? item.interview_log.thank_you_note
                          : "-"}
                      </td>
                      <td>{item.notes ? item.notes : "-"}</td>
                    </tbody>
                  );
                })}
              {job_application_trackerData &&
                job_application_trackerData.length === 0 && (
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
};
export default Apply;
