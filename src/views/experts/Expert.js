import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import expertsData from "./ExpertsData";

const Expert = (props) => {
  const expert = expertsData.find(
    (expert) => expert.id === props && props.match.params.id
  );

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>Expert Details</CCardHeader>

          <CCardBody>
            {expert && (
              <table className="table">
                <tbody>
                  <tr>
                    <td>EID</td>
                    <td>
                      <strong>{expert.id}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default Expert;
