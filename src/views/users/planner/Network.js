import React, { useState } from "react";
import Loader from "../../../loader";
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
  const [accordion, setAccordion] = useState(1);
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
                    <td>Done</td>
                  </tr>
                </tbody>
              </table>
              <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Career Options</th>

                <th>Family / Relatives</th>
                <th>Friends</th>

                <th>Professional Network</th>
                <th>Other</th>
              </thead>
            </Table>
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
                    <td>Done</td>
                  </tr>
                </tbody>
              </table>
              <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </CCardHeader>
            <Table responsive>
              {/* <thead>
                <th className="text-nowrap ">My Interests,Skills and Values</th>

                <th>World Needs</th>
                <th>World Pays For</th>
              </thead> */}
            </Table>
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
                    <td>Done</td>
                  </tr>
                </tbody>
              </table>
              <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Title</th>

                <th>Cold Message</th>
              </thead>
            </Table>
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
                    <td>Done</td>
                  </tr>
                </tbody>
              </table>
              <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
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
            </Table>
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Network;
