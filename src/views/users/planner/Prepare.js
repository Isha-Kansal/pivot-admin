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
              {job_application_prepData && (
                <tbody>
                  <tr>
                    <td>Resume</td>
                    <td>
                      <a href={job_application_prepData.resume}>
                        {job_application_prepData.resume
                          ? job_application_prepData.resume
                          : "-"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Cover Letter Template</td>
                    <td>
                      <a href={job_application_prepData.cover_letter}>
                        {job_application_prepData.cover_letter
                          ? job_application_prepData.cover_letter
                          : "-"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Portfolio / Work Sample</td>
                    <td>
                      <a href={job_application_prepData.portfolio_work_sample}>
                        {job_application_prepData.portfolio_work_sample
                          ? job_application_prepData.portfolio_work_sample
                          : "-"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Video Profile</td>
                    <td>
                      <a href={job_application_prepData.video_profile}>
                        {job_application_prepData.video_profile
                          ? job_application_prepData.video_profile
                          : "-"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>LinkedIn Profile</td>
                    <td>
                      <a href={job_application_prepData.linkedin_profile}>
                        {job_application_prepData.linkedin_profile
                          ? job_application_prepData.linkedin_profile
                          : "-"}
                      </a>
                    </td>
                  </tr>
                </tbody>
              )}
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
            {interview_prepData && (
              <Table responsive>
                <thead>
                  <th className="text-nowrap ">Topic</th>

                  <th>Description</th>
                  <th>Sample Question</th>
                  <th>Talking Points</th>
                </thead>

                {interview_prepData.personal_background && (
                  <tbody>
                    <td>Personal Background</td>
                    <td>{interview_prepData.personal_background}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.strengths_weaknesses && (
                  <tbody>
                    <td>Strengths & Weaknesses</td>
                    <td>{interview_prepData.strengths_weaknesses}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.work_experience && (
                  <tbody>
                    <td>Work Experience</td>
                    <td>{interview_prepData.work_experience}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.why_career_change && (
                  <tbody>
                    <td>Why Career Change</td>
                    <td>{interview_prepData.why_career_change}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.why_our_organization && (
                  <tbody>
                    <td>Why Our Organization</td>
                    <td>{interview_prepData.why_our_organization}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}

                {interview_prepData.long_term_goals && (
                  <tbody>
                    <td>Long-term Goals</td>
                    <td>{interview_prepData.long_term_goals}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.behavioral && (
                  <tbody>
                    <td>Behavioral</td>
                    <td>{interview_prepData.behavioral}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.competency && (
                  <tbody>
                    <td>Competency</td>
                    <td>{interview_prepData.competency}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}

                {interview_prepData.technical && (
                  <tbody>
                    <td>Technical</td>
                    <td>{interview_prepData.technical}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.case_study && (
                  <tbody>
                    <td>Case Study</td>
                    <td>{interview_prepData.case_study}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.general_knowledge && (
                  <tbody>
                    <td>General Knowledge</td>
                    <td>{interview_prepData.general_knowledge}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}

                {interview_prepData.questions_for_interviewer && (
                  <tbody>
                    <td>Qustions for Interviewer</td>
                    <td>{interview_prepData.questions_for_interviewer}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
                {interview_prepData.other && (
                  <tbody>
                    <td>Other</td>
                    <td>{interview_prepData.other}</td>
                    <td></td>
                    <td></td>
                  </tbody>
                )}
              </Table>
            )}
            <PaginationCommon pageChange={pageChange} />
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Prepare;
