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
const Network = (props) => {
  const { network } = props;
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
  let existing_connectionsData =
    network &&
    network.existing_connections &&
    network.existing_connections.data;
  let new_connectionsData =
    network && network.new_connections && network.new_connections.data;
  let cold_messagesData =
    network && network.cold_messages && network.cold_messages.data;
  let key_takeawaysData =
    network && network.key_takeaways && network.key_takeaways.data;
  if (!network) {
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
              <h5 className="m-0 p-0">Existing Connections</h5>
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
                            network &&
                              network.existing_connections &&
                              network.existing_connections.status
                          )}
                        >
                          {network &&
                            network.existing_connections &&
                            network.existing_connections.status}
                        </CBadge>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <Search handleSearch={handleSearch} /> */}
              </CCardHeader>
              <Table responsive>
                <thead>
                  <th>ID</th>
                  <th className="text-nowrap ">Career Options</th>

                  <th>Family / Relatives</th>
                  <th>Friends</th>

                  <th>Professional Network</th>
                  <th>Other</th>
                </thead>
                {existing_connectionsData &&
                  existing_connectionsData.length > 0 &&
                  existing_connectionsData.map((item) => {
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

                {existing_connectionsData &&
                  existing_connectionsData.length === 0 && (
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
              <h5 className="m-0 p-0">New Connections</h5>
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
                            network &&
                              network.new_connections &&
                              network.new_connections.status
                          )}
                        >
                          {network &&
                            network.new_connections &&
                            network.new_connections.status}
                        </CBadge>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <Search handleSearch={handleSearch} /> */}
              </CCardHeader>

              {new_connectionsData && new_connectionsData.length > 0 && (
                <Table responsive>
                  <thead>
                    <th>Networking Platform</th>
                    {/* <th className="text-nowrap ">ID</th>
                    <th>Pivot</th>

                    <th>Meetup</th>
                    <th>Lunchclub</th>
                    <th>Online Groups</th>
                    <th>Conferences</th> */}
                  </thead>
                  {new_connectionsData &&
                    new_connectionsData.length > 0 &&
                    new_connectionsData.map((item) => {
                      return (
                        <tbody>
                          <td>{item.value}</td>
                        </tbody>
                      );
                    })}
                </Table>
              )}
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
              <h5 className="m-0 p-0">Cold Messages</h5>
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
                            network &&
                              network.cold_messages &&
                              network.cold_messages.status
                          )}
                        >
                          {network &&
                            network.cold_messages &&
                            network.cold_messages.status}
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
                  <th>Title</th>

                  <th>Cold Message</th>
                </thead>
                {cold_messagesData &&
                  cold_messagesData.length > 0 &&
                  cold_messagesData.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id ? item.id : "-"}</td>
                        <td>{item.title ? item.title : "-"}</td>
                        <td>{item.message ? item.message : "-"}</td>
                      </tbody>
                    );
                  })}
                {cold_messagesData && cold_messagesData.length === 0 && (
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
              <h5 className="m-0 p-0">Key Takeaways</h5>
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
                            network &&
                              network.key_takeaways &&
                              network.key_takeaways.status
                          )}
                        >
                          {network &&
                            network.key_takeaways &&
                            network.key_takeaways.status}
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
                  <th>Name</th>

                  <th>Organization</th>
                  <th>Current Role</th>
                  <th>Relationship</th>
                  <th>Role & Industry Insights</th>
                  <th>Company Insights</th>
                  <th>Relevant Connections</th>
                  <th>Relevant Groups</th>
                  <th>Learning & Development</th>
                  <th>Job Search</th>
                  <th>Job Referral</th>
                  <th>Other</th>
                </thead>
                {key_takeawaysData &&
                  key_takeawaysData.length > 0 &&
                  key_takeawaysData.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id ? item.id : "-"}</td>
                        <td>
                          {" "}
                          {item && item.first_name && item.last_name
                            ? item.first_name + " " + item.last_name
                            : "-"}
                        </td>
                        <td>{item.orgnisation ? item.orgnisation : "-"}</td>
                        <td>{item.current_role ? item.current_role : "-"}</td>
                        <td>{item.relationship ? item.relationship : "-"}</td>
                        <td>
                          {item.role_industry_insights
                            ? item.role_industry_insights
                            : "-"}
                        </td>
                        <td>
                          {item.company_insights ? item.company_insights : "-"}
                        </td>

                        <td>
                          {item.relative_connections
                            ? item.relative_connections
                            : "-"}
                        </td>
                        <td>
                          {item.relative_groups ? item.relative_groups : "-"}
                        </td>
                        <td>
                          {item.learning_development
                            ? item.learning_development
                            : "-"}
                        </td>
                        <td>{item.job_search ? item.job_search : "-"}</td>
                        <td>{item.job_referral ? item.job_referral : "-"}</td>
                        <td>{item.other ? item.other : "-"}</td>
                      </tbody>
                    );
                  })}
                {key_takeawaysData && key_takeawaysData.length === 0 && (
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
export default Network;
