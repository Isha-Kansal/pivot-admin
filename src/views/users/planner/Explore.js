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
  const { explore,loading } = props;

  const [accordion, setAccordion] = useState(1);
  const [search, setSearch] = useState("");
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
    setSearch(e.target.value);
  };

  // const pageChange = (newPage) => {};

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
  const filterRecordsIntrospection = () => {
    if (!search) return introspectionData;
    return (
      introspectionData &&
      introspectionData.filter((data) => {
        let isTrue =
          data.fields[0].value.toLowerCase().includes(search) ||
          data.fields[1].value.toLowerCase().includes(search) ||
          data.fields[2].value.toLowerCase().includes(search) ||
          data.fields[3].value.toLowerCase().includes(search);
        return isTrue;
      })
    );
  };
  const filterRecordsExtrospection = () => {
    if (!search) return extrospectionData;
    return (
      extrospectionData &&
      extrospectionData.filter((data) => {
        let isTrue =
          data.fields[0].value.toLowerCase().includes(search) ||
          data.fields[1].value.toLowerCase().includes(search) ||
          data.fields[2].value.toLowerCase().includes(search);
        return isTrue;
      })
    );
  };
  const filterRecordsPersonalityAssessment = () => {
    if (!search) return personality_assessmentData;
    return (
      personality_assessmentData &&
      personality_assessmentData.filter((data) => {
        let isTrue = data.value.toLowerCase().includes(search);
        return isTrue;
      })
    );
  };
  const filterRecordsPracticalUnderstanding = () => {
    if (!search) return practical_understandingData;
    return (
      practical_understandingData &&
      practical_understandingData.filter((data) => {
        let isTrue =
          data.career_option.toLowerCase().includes(search) ||
          data.practical_understanding_via.toLowerCase().includes(search) ||
          data.contact_person.toLowerCase().includes(search) ||
          data.contact_email.toLowerCase().includes(search) ||
          data.notes.toLowerCase().includes(search);
        return isTrue;
      })
    );
  };
  const filterRecordsCareerOptions = () => {
    if (!search) return career_optionsData;
    return (
      career_optionsData &&
      career_optionsData.filter((data) => {
        let isTrue =
          data.fields[0].value.toLowerCase().includes(search) ||
          data.fields[1].value.toLowerCase().includes(search) ||
          data.fields[2].value.toLowerCase().includes(search) ||
          data.fields[3].value.toLowerCase().includes(search) ||
          data.fields[4].value.toLowerCase().includes(search);
        return isTrue;
      })
    );
  };

  let filteredIntrospection = filterRecordsIntrospection() || [];
  let filteredExtrospection = filterRecordsExtrospection() || [];
  let filteredPersonalityAssessment =
    filterRecordsPersonalityAssessment() || [];
  let filteredPracticalUnderstanding =
    filterRecordsPracticalUnderstanding() || [];
  let filteredCareerOptions = filterRecordsCareerOptions() || [];

  if(!explore&&!loading)
  {
    
  return(<div className="no-records-planner">
  <h5 className="mb-0">
    <i>No Records Found</i>
  </h5>
  
  </div>)
    
  }
else{
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

              {/* <Search handleSearch={handleSearch} /> */}
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>Priority Level</th>

                <th>My Interests</th>
                <th>My Skills</th>

                <th>My Values</th>
              </thead>
              {filteredIntrospection &&
                filteredIntrospection.length > 0 &&
                filteredIntrospection.map((item) => {
                  return (
                    <tbody>
                      <td>{item.id ? item.id : "-"}</td>
                      <td>
                        <CBadge color={getBadge(item.fields[0].value)}>
                          {item.fields[0].value}
                        </CBadge>
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
              {filteredIntrospection && filteredIntrospection.length === 0 && (
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

              {/* <Search handleSearch={handleSearch} /> */}
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>My Interests, Skills and Values</th>

                <th>World Needs</th>
                <th>World Pays For</th>
              </thead>
              {filteredExtrospection &&
                filteredExtrospection.length > 0 &&
                filteredExtrospection.map((item) => {
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
                    </tbody>
                  );
                })}
              {filteredExtrospection && filteredExtrospection.length === 0 && (
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

            {/* <Search handleSearch={handleSearch} /> */}
          </CCardHeader>
          <CCardBody>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>Career Option</th>
              </thead>

              {filteredPersonalityAssessment &&
                filteredPersonalityAssessment.length > 0 &&
                filteredPersonalityAssessment.map((item) => {
                  return (
                    <tbody>
                      <td>{item.id ? item.id : "-"}</td>
                      <td>{item.value ? item.value : "-"}</td>
                    </tbody>
                  );
                })}
              {filteredPersonalityAssessment &&
                filteredPersonalityAssessment.length === 0 && (
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

              {/* <Search handleSearch={handleSearch} /> */}
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>Career Option</th>

                <th>Practical Understanding Via</th>
                <th>Contact Person</th>
                <th>Contact Email</th>
                <th>Notes On</th>
              </thead>
              {filteredPracticalUnderstanding &&
                filteredPracticalUnderstanding.length > 0 &&
                filteredPracticalUnderstanding.map((item) => {
                  return (
                    <tbody>
                      <td>{item.id ? item.id : "-"}</td>
                      <td>{item.career_option ? item.career_option : "-"}</td>
                      <td>
                        {item.practical_understanding_via
                          ? item.practical_understanding_via
                          : "-"}
                      </td>
                      <td>{item.contact_person ? item.contact_person : "-"}</td>
                      <td>{item.contact_email ? item.contact_email : "-"}</td>
                      <td>{item.notes ? item.notes : "-"}</td>
                    </tbody>
                  );
                })}
              {filteredPracticalUnderstanding &&
                filteredPracticalUnderstanding.length === 0 && (
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

              {/* <Search handleSearch={handleSearch} /> */}
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">ID</th>
                <th>Career Option</th>

                <th>Pros</th>
                <th>Cons</th>
                <th>Net Score</th>
                <th>Decision</th>
              </thead>
              {filteredCareerOptions &&
                filteredCareerOptions.length > 0 &&
                filteredCareerOptions.map((item) => {
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
                      <td>
                        {item.fields[4].value ? item.fields[4].value : "-"}
                      </td>
                    </tbody>
                  );
                })}
              {filteredCareerOptions && filteredCareerOptions.length === 0 && (
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
export default Explore;
