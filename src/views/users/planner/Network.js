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

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
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

              <Search handleSearch={handleSearch} />
            </CCardHeader>

            <Table responsive>
              <thead>
                <th className="text-nowrap ">Pivot</th>

                <th>Meetup</th>
                <th>Lunchclub</th>
                <th>Online Groups</th>
                <th>Conferences</th>
              </thead>
              {new_connectionsData &&
                new_connectionsData.length > 0 &&
                new_connectionsData.map((item) => {
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

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Title</th>

                <th>Cold Message</th>
              </thead>
              {cold_messagesData &&
                cold_messagesData.length > 0 &&
                cold_messagesData.map((item) => {
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

              <Search handleSearch={handleSearch} />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Name</th>

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
export default Network;
