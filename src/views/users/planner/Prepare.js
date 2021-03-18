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
  const [accordion, setAccordion] = useState(1);
  const getBadge = (status) => {
    switch (status) {
      case "Done":
        return "success";

      // case "Not Verified":
      //   return "danger";
      // case "Activated":
      //   return "success";

      // case "Blocked":
      //   return "danger";
      default:
        return "primary";
    }
  };
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
                      <CBadge color={getBadge("Done")}>Done</CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                </div>
              </form> */}
              <Search />
            </CCardHeader>
            <table className="table">
              <tbody>
                <tr>
                  <td>Resume</td>
                </tr>
                <tr>
                  <td>Cover Letter Template</td>
                </tr>
                <tr>
                  <td>Portfolio / Work Sample</td>
                </tr>
                <tr>
                  <td>Video Profile</td>
                </tr>
                <tr>
                  <td>LinkedIn Profile</td>
                </tr>
              </tbody>
            </table>
            <PaginationCommon />
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
                      <CBadge color={getBadge("Done")}>Done</CBadge>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <form>
                <div className="text-center search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                </div>
              </form> */}
              <Search />
            </CCardHeader>
            <Table responsive>
              <thead>
                <th className="text-nowrap ">Topic</th>

                <th>Description</th>
                <th>Sample Question</th>
                <th>Talking Points</th>
              </thead>
            </Table>

            <PaginationCommon />
          </CCardBody>
        </CCollapse>
      </CCard>
    </div>
  );
};
export default Prepare;
