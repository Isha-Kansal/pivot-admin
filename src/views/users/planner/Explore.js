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
const Explore = (props) => {
  const [accordion, setAccordion] = useState(1);
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
                <th className="text-nowrap ">Priority Level</th>

                <th>My Interests</th>
                <th>My Skills</th>

                <th>My Values</th>
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
                <th className="text-nowrap ">My Interests,Skills and Values</th>

                <th>World Needs</th>
                <th>World Pays For</th>
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
            <h5 className="m-0 p-0">Personality Assessment</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 2}>
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
          <CCardBody>
            <thead>
              <th className="text-nowrap ">Career Option</th>
            </thead>
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
                <th className="text-nowrap ">Career Option</th>

                <th>Practical Understanding Via</th>
                <th>Contact Person</th>
                <th>Contact Email</th>
                <th>Notes On</th>
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
                <th className="text-nowrap ">Career Option</th>

                <th>Pros</th>
                <th>Cons</th>
                <th>Net Score</th>
                <th>Decision</th>
              </thead>
            </Table>
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Explore;
