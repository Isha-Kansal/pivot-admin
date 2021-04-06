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
  const pageChange = (newPage) => { };
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

              {/* <Search handleSearch={handleSearch} /> */}
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

              {/* <Search handleSearch={handleSearch} /> */}
            </CCardHeader>
            {interview_prepData && (
              <Table responsive>
                <thead>
                  <th className="text-nowrap ">Topic</th>

                  <th>Description</th>
                  {/* <th>Sample Question</th> */}
                  <th>Talking Points</th>
                </thead>
              
                {interview_prepData && interview_prepData.length > 0 && interview_prepData.map((data) => {
                  return (
                    <tbody>
                      <td>{data.label ? data.label : "-"}</td>
                      <td>{data.description ? data.description : "-"}</td>
                      {/* <td></td> */}
                      <td>{data.value ? data.value : "-"}</td>
                    </tbody>
                  )
                })}
                {/* {interview_prepData.personal_background && (
                  <tbody>
                    <td>Personal Background</td>
                    <td>
                      Highlights from your non-work life like your upbringing,
                      education, hobbies, family, etc.
                    </td>
                    <td>Tell me a bit about yourself</td>
                    <td>{interview_prepData.personal_background}</td>
                  </tbody>
                )}
                {interview_prepData.strengths_weaknesses && (
                  <tbody>
                    <td>Strengths & Weaknesses</td>
                    <td>
                      2-3 of your key strengths and 1-2 weaknesses from a
                      professional standpoint along with examples
                    </td>
                    <td>
                      Share your key strengths and weaknesses along with
                      examples
                    </td>
                    <td>{interview_prepData.strengths_weaknesses}</td>
                  </tbody>
                )}
                {interview_prepData.work_experience && (
                  <tbody>
                    <td>Work Experience</td>
                    <td>
                      Key highlights from your resume focusing on your
                      individual contributions, achievements and career
                      trajectory
                    </td>
                    <td>Walk me through your resume</td>
                    <td>{interview_prepData.work_experience}</td>
                  </tbody>
                )}
                {interview_prepData.why_career_change && (
                  <tbody>
                    <td>Why Career Change</td>
                    <td>
                      Primary factors that drove you to consider a career change
                      and key aspects about your desired role/industry that drew
                      you in
                    </td>
                    <td>
                      Why do you want to change your role/industry at this stage
                    </td>
                    <td>{interview_prepData.why_career_change}</td>
                  </tbody>
                )}
                {interview_prepData.why_our_organization && (
                  <tbody>
                    <td>Why Our Organization</td>
                    <td>
                      Things that excite you most about working with the
                      organization - e.g., people, mission, values, exposure,
                      etc.
                    </td>
                    <td>What interests you most about working with us</td>
                    <td>{interview_prepData.why_our_organization}</td>
                  </tbody>
                )}

                {interview_prepData.long_term_goals && (
                  <tbody>
                    <td>Long-term Goals</td>

                    <td>
                      Scope and nature of impact you aspire to make in your
                      industry and community over the next 5 years
                    </td>
                    <td>
                      What kind of impact do you want to make in your career
                      over the next five years
                    </td>
                    <td>{interview_prepData.long_term_goals}</td>
                  </tbody>
                )}
                {interview_prepData.behavioral && (
                  <tbody>
                    <td>Behavioral</td>
                    <td>
                      Impactful anecdotes from prior work or educational
                      experience that demonstrate your expertise, values or
                      other professional qualities to help assess cultural fit.
                      Using the STAR approach here may be helpful
                    </td>
                    <td>
                      Tell me about a time when you resolved stakeholder
                      conflict at work
                    </td>
                    <td>{interview_prepData.behavioral}</td>
                  </tbody>
                )}
                {interview_prepData.competency && (
                  <tbody>
                    <td>Competency</td>
                    <td>
                      Key indicators generally based on prior experience that
                      exhibit your ability to tackle challenging situations and
                      achieve aspirational goals
                    </td>
                    <td>
                      Tell us about the specific steps you took in your previous
                      role to improve your knowledge about advancements in your
                      area of biological science
                    </td>
                    <td>{interview_prepData.competency}</td>
                  </tbody>
                )}

                {interview_prepData.technical && (
                  <tbody>
                    <td>Technical</td>
                    <td>
                      Key indicators that demonstrate a strong understanding of
                      the concepts laid out in the technical question
                    </td>
                    <td>
                      If humans evolved from apes, why are there still apes
                    </td>
                    <td>{interview_prepData.technical}</td>
                  </tbody>
                )}
                {interview_prepData.case_study && (
                  <tbody>
                    <td>Case Study</td>
                    <td>
                      Key indicators that exhibit your thought-process for
                      solving complex problems, achieving work-related goals,
                      and your ability to articulate the same
                    </td>
                    <td>
                      Let's say that Tyrannosaurus Rex got into a fight with
                      Utahraptor, who would win and why
                    </td>
                    <td>{interview_prepData.case_study}</td>
                  </tbody>
                )}
                {interview_prepData.general_knowledge && (
                  <tbody>
                    <td>General Knowledge</td>
                    <td>
                      Awareness and understanding of the trending topics in
                      politics, economy, sports, culture and industry-specific
                      issues in your region or globally
                    </td>
                    <td>
                      What are your thoughts on NASA's recent discovery of water
                      on the sunlit surface of the moon
                    </td>
                    <td>{interview_prepData.general_knowledge}</td>
                  </tbody>
                )}

                {interview_prepData.questions_for_interviewer && (
                  <tbody>
                    <td>Qustions for Interviewer</td>
                    <td>
                      Gather information on (i) the organization’s culture, core
                      values and policies (ii) interviewer’s views on relevant
                      work topics (iii) the job application process
                    </td>
                    <td>
                      What are the core values and behaviors that this
                      organization wants its employees to espouse
                    </td>
                    <td>{interview_prepData.questions_for_interviewer}</td>
                  </tbody>
                )}
                {interview_prepData.other && (
                  <tbody>
                    <td>Other</td>
                    <td>
                      Anything else you would like to discuss during your
                      interview
                    </td>
                    <td>-</td>
                    <td>{interview_prepData.other}</td>
                  </tbody>
                )} */}
              </Table>
            )}
            {interview_prepData && interview_prepData.length === 0 && (
              <div className="no-records">
                <h5 className="mb-0">
                  <i>No Records Found</i>
                </h5>
              </div>
            )}
            {/* <PaginationCommon pageChange={pageChange} /> */}
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Prepare;
