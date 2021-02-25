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
const Learn = (props) => {
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
            <h5 className="m-0 p-0">Skills</h5>
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
                <th className="text-nowrap ">My Hard Skills</th>

                <th>My Soft Skills</th>
                <th>Required Hard Skills</th>

                <th>Required Soft Skills</th>
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
            <h5 className="m-0 p-0">Learning Platforms</h5>
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
              <thead>
                <th className="text-nowrap ">Skills</th>

                <th>Platform Name</th>
                <th>Course Topic</th>
                <th>Course Type</th>
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
            onClick={() => setAccordion(accordion === 2 ? null : 2)}
          >
            <h5 className="m-0 p-0">Experimental Learning</h5>
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
                <th className="text-nowrap ">Skills</th>

                <th>Organization</th>
                <th>Role</th>
                <th>Role Type</th>
              </thead>
            </Table>
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Learn;
