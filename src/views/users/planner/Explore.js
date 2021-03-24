import React, { useState } from "react";
import Loader from "../../../loader";
import Search from "../../../common/search";
import PaginationCommon from "../../../common/pagination";
import exploreData from "../planner/exploreData";
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
const Explore = (props) => {
  const { explore } = props;

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
      case "High":
        return "green";
      case "Medium":
        return "yellow";
      case "Low":
        return "pink";
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

  let introspectionData =
    explore && explore.introspection && explore.introspection.data;

  let extrospectionData =
    explore && explore.extrospection && explore.extrospection.data;
  let personality_assessmentData =
    explore &&
    explore.personality_assessment &&
    explore.personality_assessment.data;

  let practical_understandingData =
    explore &&
    explore.practical_understanding &&
    explore.practical_understanding.data;
  let career_optionsData =
    explore && explore.career_options && explore.career_options.data;

  return (
    <div id="accordion">
      <CCard className="mb-0">
        <CCardHeader id="headingOne">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0 d-flex justify-content-between"
            onClick={() => setAccordion(accordion === 0 ? null : 0)}
          >
            <h5 className="m-0 p-0">Introspection</h5>
            {/* <span className="done-txt">Done</span> */}
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
                          explore &&
                            explore.introspection &&
                            explore.introspection.status
                        )}
                      >
                        {explore &&
                          explore.introspection &&
                          explore.introspection.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Priority Level</th>

                <th>My Interests</th>
                <th>My Skills</th>

                <th>My Values</th>
              </thead>
              {introspectionData &&
                introspectionData.length > 0 &&
                introspectionData.map((item) => {
                  return (
                    <tbody>
                      <td>
                        {" "}
                        <CBadge
                          color={getBadge(exploreData.value[0].priorityLevel)}
                        >
                          {exploreData.value[0].priorityLevel}
                        </CBadge>
                      </td>
                      <td>{exploreData.value[0].myInterests}</td>
                      <td>{exploreData.value[0].mySkills}</td>
                      <td>{exploreData.value[0].myValues}</td>
                    </tbody>
                  );
                })}
            </Table>

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
            <h5 className="m-0 p-0">Extrospection</h5>
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
                          explore &&
                            explore.extrospection &&
                            explore.extrospection.status
                        )}
                      >
                        {explore &&
                          explore.extrospection &&
                          explore.extrospection.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">
                  My Interests, Skills and Values
                </th>

                <th>World Needs</th>
                <th>World Pays For</th>
              </thead>
              {extrospectionData &&
                extrospectionData.length > 0 &&
                extrospectionData.map((item) => {
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
      <CCard className="mb-0">
        <CCardHeader id="headingThree">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 2 ? null : 2)}
          >
            <h5 className="m-0 p-0">Personality Assessment</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 2}>
          <CCardHeader>
            <table className="table">
              <tbody>
                <tr>
                  <td>Status</td>
                  <td>
                    {" "}
                    <CBadge
                      color={getBadge(
                        explore &&
                          explore.personality_assessment &&
                          explore.personality_assessment.status
                      )}
                    >
                      {explore &&
                        explore.personality_assessment &&
                        explore.personality_assessment.status}
                    </CBadge>
                  </td>
                </tr>
              </tbody>
            </table>

            <Search handleSearch={handleSearch} />
          </CCardHeader>
          <CCardBody>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Career Option</th>
              </thead>

              {personality_assessmentData &&
                personality_assessmentData.length > 0 &&
                personality_assessmentData.map((item) => {
                  return (
                    <tbody>
                      <td></td>
                    </tbody>
                  );
                })}
            </Table>
            <PaginationCommon pageChange={pageChange} />
          </CCardBody>
        </CCollapse>
      </CCard>

      <CCard className="mb-0">
        <CCardHeader id="headingThree">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 3 ? null : 3)}
          >
            <h5 className="m-0 p-0">Practical Understanding</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 3}>
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
                          explore &&
                            explore.practical_understanding &&
                            explore.practical_understanding.status
                        )}
                      >
                        {explore &&
                          explore.practical_understanding &&
                          explore.practical_understanding.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Career Option</th>

                <th>Practical Understanding Via</th>
                <th>Contact Person</th>
                <th>Contact Email</th>
                <th>Notes On</th>
              </thead>
              {practical_understandingData &&
                practical_understandingData.length > 0 &&
                practical_understandingData.map((item) => {
                  return (
                    <tbody>
                      <td></td>
                    </tbody>
                  );
                })}
            </Table>
            <PaginationCommon pageChange={pageChange} />
          </CCardBody>
        </CCollapse>
      </CCard>

      <CCard className="mb-0">
        <CCardHeader id="headingThree">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 4 ? null : 4)}
          >
            <h5 className="m-0 p-0">Career Options</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 4}>
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
                          explore &&
                            explore.career_options &&
                            explore.career_options.status
                        )}
                      >
                        {explore &&
                          explore.career_options &&
                          explore.career_options.status}
                      </CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Career Option</th>

                <th>Pros</th>
                <th>Cons</th>
                <th>Net Score</th>
                <th>Decision</th>
              </thead>
              {career_optionsData &&
                career_optionsData.length > 0 &&
                career_optionsData.map((item) => {
                  return (
                    <tbody>
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
export default Explore;
